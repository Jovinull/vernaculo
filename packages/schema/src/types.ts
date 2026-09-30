/**
 * TypeScript view of the Vernáculo Persona Specification v1alpha1.
 *
 * The normative contract is `schemas/v1alpha1/persona.schema.json`. These types
 * and the Zod schemas in `zod.ts` mirror it; conformance tests fail if they drift.
 */

export const API_VERSION = "vernaculo.dev/v1alpha1";
export type ApiVersion = typeof API_VERSION;

export const PERSONA_KIND = "Persona";
export type PersonaKind = typeof PERSONA_KIND;

/** Ordered from least to most mature. */
export const MATURITY_LEVELS: readonly ["fixture", "draft", "reviewed"] = [
  "fixture",
  "draft",
  "reviewed",
];
export type Maturity = (typeof MATURITY_LEVELS)[number];

export const EVIDENCE_LEVELS: readonly [
  "attested",
  "reported",
  "corroborated",
  "hypothesis",
  "synthetic",
] = ["attested", "reported", "corroborated", "hypothesis", "synthetic"];
export type Evidence = (typeof EVIDENCE_LEVELS)[number];

export const ANTI_PATTERN_CATEGORIES: readonly [
  "caricature",
  "stereotype",
  "overuse",
  "phonetic-spelling",
  "invented-regionalism",
  "wrong-region",
  "register-mismatch",
  "other",
] = [
  "caricature",
  "stereotype",
  "overuse",
  "phonetic-spelling",
  "invented-regionalism",
  "wrong-region",
  "register-mismatch",
  "other",
];
export type AntiPatternCategory = (typeof ANTI_PATTERN_CATEGORIES)[number];

export const SOURCE_TYPES: readonly [
  "atlas",
  "corpus",
  "study",
  "reference-work",
  "speaker-review",
  "other",
] = ["atlas", "corpus", "study", "reference-work", "speaker-review", "other"];
export type SourceType = (typeof SOURCE_TYPES)[number];

export const SOURCE_USAGES: readonly ["consulted", "cited", "redistributed"] = [
  "consulted",
  "cited",
  "redistributed",
];
export type SourceUsage = (typeof SOURCE_USAGES)[number];

export const PHONETIC_SPELLING_POLICIES: readonly ["avoid", "allow"] = ["avoid", "allow"];
export type PhoneticSpellingPolicy = (typeof PHONETIC_SPELLING_POLICIES)[number];

/** Fields shared by every rendered linguistic feature. */
export interface FeatureBase {
  readonly evidence: Evidence;
  readonly sources?: readonly string[] | undefined;
  readonly notes?: string | undefined;
  /** The feature is rendered only when the selected intensity is at least this value. */
  readonly minIntensity?: number | undefined;
}

export interface LexicalItem extends FeatureBase {
  readonly term: string;
  readonly meaning?: string | undefined;
}

export interface ContextualItem extends FeatureBase {
  readonly term: string;
  readonly context: string;
  readonly meaning?: string | undefined;
}

export interface DiscouragedItem {
  readonly term: string;
  readonly reason?: string | undefined;
  readonly sources?: readonly string[] | undefined;
  readonly notes?: string | undefined;
}

export interface DiscourseMarker extends FeatureBase {
  readonly form: string;
  readonly function: string;
}

export interface MorphosyntaxPattern extends FeatureBase {
  readonly id: string;
  readonly description: string;
  readonly example?: string | undefined;
}

export interface PragmaticForm extends FeatureBase {
  readonly form: string;
  readonly usage?: string | undefined;
}

export interface Vocabulary {
  readonly preferred?: readonly LexicalItem[] | undefined;
  readonly contextual?: readonly ContextualItem[] | undefined;
  readonly discouraged?: readonly DiscouragedItem[] | undefined;
}

export interface Pragmatics {
  readonly addressForms?: readonly PragmaticForm[] | undefined;
  readonly greetings?: readonly PragmaticForm[] | undefined;
  readonly acknowledgements?: readonly PragmaticForm[] | undefined;
  readonly disagreements?: readonly PragmaticForm[] | undefined;
  readonly closings?: readonly PragmaticForm[] | undefined;
}

export interface Linguistics {
  readonly vocabulary?: Vocabulary | undefined;
  readonly discourse?: { readonly markers?: readonly DiscourseMarker[] | undefined } | undefined;
  readonly morphosyntax?:
    | { readonly patterns?: readonly MorphosyntaxPattern[] | undefined }
    | undefined;
  readonly pragmatics?: Pragmatics | undefined;
  readonly orthography?:
    | { readonly phoneticSpelling?: PhoneticSpellingPolicy | undefined }
    | undefined;
}

export interface Example {
  readonly id: string;
  readonly situation: string;
  readonly neutral?: string | undefined;
  readonly text: string;
  readonly intensity?: number | undefined;
  readonly sources?: readonly string[] | undefined;
  readonly notes?: string | undefined;
}

export interface AntiPattern {
  readonly id: string;
  readonly text: string;
  readonly category: AntiPatternCategory;
  readonly explanation: string;
}

export interface Source {
  readonly id: string;
  readonly type: SourceType;
  readonly title: string;
  readonly url?: string | undefined;
  readonly citation?: string | undefined;
  readonly license?: string | undefined;
  readonly usage: SourceUsage;
  readonly accessed?: string | undefined;
  readonly notes?: string | undefined;
}

export interface Region {
  readonly country?: string | undefined;
  readonly subdivision?: string | undefined;
  readonly locality?: string | undefined;
  readonly note?: string | undefined;
}

export interface PersonaMetadata {
  readonly id: string;
  readonly name: string;
  readonly description?: string | undefined;
  readonly language: string;
  readonly version: string;
  readonly maturity: Maturity;
  readonly license?: string | undefined;
  readonly region?: Region | undefined;
}

/** A persona document exactly as authored (one YAML file). */
export interface PersonaDocument {
  readonly apiVersion: ApiVersion;
  readonly kind: PersonaKind;
  readonly metadata: PersonaMetadata;
  readonly extends?: string | undefined;
  readonly regionality?: { readonly defaultIntensity?: number | undefined } | undefined;
  readonly linguistics?: Linguistics | undefined;
  readonly examples?: readonly Example[] | undefined;
  readonly antiPatterns?: readonly AntiPattern[] | undefined;
  readonly provenance?:
    | { readonly sources?: readonly Source[] | undefined; readonly notes?: string | undefined }
    | undefined;
}
