// @vernaculo/compiler — turns a PersonaIR into provider-neutral instructions.
// Deterministic string transformation: it never calls a model or the network.
import { buildIR, type IROptions, type PersonaIR, type ResolvedPersona } from "@vernaculo/core";
import type { Maturity } from "@vernaculo/schema";
import { renderInstructions } from "./render.ts";

export {
  describeIntensity,
  groundRules,
  inline as escapeMarkdownInline,
  maturityNotice,
  renderInstructions,
} from "./render.ts";

/** Identifies the layout of the rendered instructions. Bumped when it changes incompatibly. */
export const INSTRUCTIONS_FORMAT = "vernaculo-instructions/v1alpha1";

export interface CompiledPersona {
  /** Markdown instructions, meant to be placed after the parent agent's own instructions. */
  readonly instructions: string;
  readonly metadata: {
    readonly persona: string;
    readonly name: string;
    readonly version: string;
    readonly language: string;
    readonly maturity: Maturity;
    readonly intensity: number;
    readonly lineage: readonly string[];
    readonly format: typeof INSTRUCTIONS_FORMAT;
  };
}

/** Compiles an IR. */
export function compile(ir: PersonaIR): CompiledPersona {
  return {
    instructions: renderInstructions(ir),
    metadata: {
      persona: ir.persona.id,
      name: ir.persona.name,
      version: ir.persona.version,
      language: ir.persona.language,
      maturity: ir.persona.maturity,
      intensity: ir.intensity,
      lineage: ir.persona.lineage,
      format: INSTRUCTIONS_FORMAT,
    },
  };
}

/** Applies an intensity to a resolved persona and compiles it. */
export function compilePersona(
  resolved: ResolvedPersona,
  options: IROptions = {},
): CompiledPersona {
  return compile(buildIR(resolved, options));
}
