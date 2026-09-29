import type {
  AntiPattern,
  ContextualItem,
  DiscouragedItem,
  DiscourseMarker,
  Example,
  FeatureBase,
  LexicalItem,
  Maturity,
  MorphosyntaxPattern,
  PhoneticSpellingPolicy,
  PragmaticForm,
  Source,
} from "@vernaculo/schema";
import { vernaculoError } from "./errors.ts";
import { extractLists } from "./lists.ts";
import type { ResolvedPersona } from "./resolve.ts";

/**
 * Intermediate Representation: a resolved persona with an intensity applied.
 * Provider-neutral and final: compilers and targets only format it, they never
 * re-select features. Deeply frozen.
 */
export interface PersonaIR {
  readonly persona: {
    readonly id: string;
    readonly name: string;
    readonly description?: string | undefined;
    readonly language: string;
    readonly version: string;
    /** Effective maturity (least mature in the lineage). */
    readonly maturity: Maturity;
    readonly license?: string | undefined;
    /** Lineage ids, root ancestor first. */
    readonly lineage: readonly string[];
  };
  readonly intensity: number;
  readonly phoneticSpelling: PhoneticSpellingPolicy;
  readonly vocabulary: {
    readonly preferred: readonly LexicalItem[];
    readonly contextual: readonly ContextualItem[];
    /** Always included, at every intensity: restrictions are never gated. */
    readonly discouraged: readonly DiscouragedItem[];
  };
  readonly discourseMarkers: readonly DiscourseMarker[];
  readonly morphosyntax: readonly MorphosyntaxPattern[];
  readonly pragmatics: {
    readonly addressForms: readonly PragmaticForm[];
    readonly greetings: readonly PragmaticForm[];
    readonly acknowledgements: readonly PragmaticForm[];
    readonly disagreements: readonly PragmaticForm[];
    readonly closings: readonly PragmaticForm[];
  };
  readonly examples: readonly Example[];
  /** Always included, at every intensity. */
  readonly antiPatterns: readonly AntiPattern[];
  readonly sources: readonly Source[];
  /** How many features were left out, for transparency (e.g. `vernaculo inspect`). */
  readonly omitted: {
    readonly belowIntensity: number;
    readonly hypotheses: number;
  };
}

export interface IROptions {
  /** Regional intensity in [0, 1]. Defaults to the persona's `regionality.defaultIntensity`. */
  readonly intensity?: number | undefined;
}

/** Returns `value` when it is a finite number in [0, 1]; throws `invalid-intensity` otherwise. */
export function assertIntensity(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 1) {
    return value;
  }
  throw vernaculoError([
    {
      code: "invalid-intensity",
      message: `Intensity must be a number between 0 and 1 (received ${String(value)})`,
    },
  ]);
}

/**
 * Applies an intensity to a resolved persona. Selection rules (normative, see
 * docs/specification/regional-intensity.md):
 * - intensity 0 renders no regional feature (neutral language);
 * - `hypothesis` features are never rendered;
 * - a feature is rendered when intensity > 0 and `minIntensity` (default 0) <= intensity;
 * - an example is rendered when intensity > 0 and its `intensity` (default 0) <= intensity;
 * - discouraged forms and anti-patterns are always rendered.
 */
export function buildIR(resolved: ResolvedPersona, options: IROptions = {}): PersonaIR {
  const { document, lineage } = resolved;
  const intensity = assertIntensity(options.intensity ?? document.regionality?.defaultIntensity);
  const lists = extractLists(document);
  const omitted = { belowIntensity: 0, hypotheses: 0 };

  function select<T extends FeatureBase>(items: readonly T[]): T[] {
    return items.filter((item) => {
      if (item.evidence === "hypothesis") {
        omitted.hypotheses++;
        return false;
      }
      const included = intensity > 0 && (item.minIntensity ?? 0) <= intensity;
      if (!included) omitted.belowIntensity++;
      return included;
    });
  }

  const ir: PersonaIR = {
    persona: {
      id: document.metadata.id,
      name: document.metadata.name,
      description: document.metadata.description,
      language: document.metadata.language,
      version: document.metadata.version,
      maturity: document.metadata.maturity,
      license: document.metadata.license,
      lineage: lineage.map((entry) => entry.id),
    },
    intensity,
    phoneticSpelling: document.linguistics?.orthography?.phoneticSpelling ?? "avoid",
    vocabulary: {
      preferred: select(lists.preferred),
      contextual: select(lists.contextual),
      discouraged: lists.discouraged,
    },
    discourseMarkers: select(lists.markers),
    morphosyntax: select(lists.patterns),
    pragmatics: {
      addressForms: select(lists.addressForms),
      greetings: select(lists.greetings),
      acknowledgements: select(lists.acknowledgements),
      disagreements: select(lists.disagreements),
      closings: select(lists.closings),
    },
    examples: lists.examples.filter(
      (example) => intensity > 0 && (example.intensity ?? 0) <= intensity,
    ),
    antiPatterns: lists.antiPatterns,
    sources: lists.sources,
    omitted,
  };
  return deepFreeze(structuredClone(ir));
}

function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null) {
    for (const child of Object.values(value)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}
