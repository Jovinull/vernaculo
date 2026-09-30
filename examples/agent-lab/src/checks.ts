// Heuristic, rule-based signals over a model reply. They help spot problems
// (forms outside the layer, discouraged forms, origin claims); they never prove
// that a reply is natural. Naturalness is judged by speakers of the variety.
import type { PersonaIR } from "@vernaculo/core";
import type { PersonaDocument } from "@vernaculo/schema";

/** Surface forms of a persona, grouped by how the layer treats them. */
export interface PackForms {
  /** Every non-hypothesis positive form of the pack, at any intensity. */
  readonly positive: readonly string[];
  /** Forms recorded as `hypothesis` (never rendered). */
  readonly hypotheses: readonly string[];
  /** Forms the pack tells the model to avoid. */
  readonly discouraged: readonly string[];
}

export interface AddressCounts {
  readonly voce: number;
  readonly lhe: number;
  readonly te: number;
  readonly tu: number;
  readonly senhor: number;
}

export interface ReplyChecks {
  /** Pack forms enabled for this variant and used in the reply. */
  readonly enabledFormsUsed: readonly string[];
  /** Pack forms NOT enabled for this variant (below their minIntensity, or no layer) but used. */
  readonly formsOutsideLayer: readonly string[];
  /** Hypothesis forms used even though the layer never renders them. */
  readonly hypothesisFormsUsed: readonly string[];
  readonly discouragedUsed: readonly string[];
  /** Mentions of the region or its demonyms (worth a human look). */
  readonly regionMentions: readonly string[];
  /** A first-person claim of regional origin, which the ground rules forbid. */
  readonly originClaim: boolean;
  readonly address: AddressCounts;
}

type FormItem = { readonly term?: string; readonly form?: string; readonly evidence?: string };

/** Splits "o senhor / a senhora" into its alternatives. */
export function splitForms(value: string): string[] {
  return value
    .split("/")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}

function formsOf(items: readonly FormItem[] | undefined, keep: (item: FormItem) => boolean) {
  return (items ?? []).filter(keep).flatMap((item) => splitForms(item.term ?? item.form ?? ""));
}

/** Collects the surface forms of a resolved persona. */
export function packForms(document: PersonaDocument): PackForms {
  const linguistics = document.linguistics;
  const pragmatics = linguistics?.pragmatics;
  const positiveLists: (readonly FormItem[] | undefined)[] = [
    linguistics?.vocabulary?.preferred,
    linguistics?.vocabulary?.contextual,
    linguistics?.discourse?.markers,
    pragmatics?.addressForms,
    pragmatics?.greetings,
    pragmatics?.acknowledgements,
    pragmatics?.disagreements,
    pragmatics?.closings,
  ];
  const isHypothesis = (item: FormItem) => item.evidence === "hypothesis";
  return {
    positive: positiveLists.flatMap((list) => formsOf(list, (item) => !isHypothesis(item))),
    hypotheses: positiveLists.flatMap((list) => formsOf(list, isHypothesis)),
    discouraged: formsOf(linguistics?.vocabulary?.discouraged, () => true),
  };
}

/** The positive forms an IR actually hands to the model. */
export function enabledForms(ir: PersonaIR): string[] {
  const lists: readonly (readonly FormItem[])[] = [
    ir.vocabulary.preferred,
    ir.vocabulary.contextual,
    ir.discourseMarkers,
    ir.pragmatics.addressForms,
    ir.pragmatics.greetings,
    ir.pragmatics.acknowledgements,
    ir.pragmatics.disagreements,
    ir.pragmatics.closings,
  ];
  return lists.flatMap((list) => formsOf(list, () => true));
}

/** Lowercases and strips diacritics, so "Ôxe" matches "oxe". */
export function normalize(text: string): string {
  return text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function wordPattern(form: string, flags = "u"): RegExp {
  return new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(normalize(form))}(?![\\p{L}\\p{N}])`, flags);
}

/** Forms (from `forms`) that occur as whole words in `text`, accent- and case-insensitively. */
export function findForms(text: string, forms: readonly string[]): string[] {
  const normalized = normalize(text);
  return [...new Set(forms)].filter((form) => wordPattern(form).test(normalized));
}

function count(normalizedText: string, form: string): number {
  return normalizedText.match(wordPattern(form, "gu"))?.length ?? 0;
}

const FIRST_PERSON_ORIGIN = "(?<![\\p{L}])(sou|nasci|moro|cresci|me criei)(?![\\p{L}])";

/** True when a first-person origin verb is followed, within the clause, by a region term. */
function claimsOrigin(normalizedText: string, regionTerms: readonly string[]): boolean {
  if (regionTerms.length === 0) return false;
  const terms = regionTerms.map((term) => escapeRegExp(normalize(term))).join("|");
  const pattern = `${FIRST_PERSON_ORIGIN}[^.!?\\n]{0,30}(?<![\\p{L}])(${terms})(?![\\p{L}])`;
  return new RegExp(pattern, "u").test(normalizedText);
}

/**
 * Runs every check on one reply. `enabled` is empty for the no-layer control;
 * `regionTerms` are the place names and demonyms of the variety (lab config).
 */
export function checkReply(
  text: string,
  forms: PackForms,
  enabled: readonly string[],
  regionTerms: readonly string[],
): ReplyChecks {
  const normalized = normalize(text);
  const enabledSet = new Set(enabled.map(normalize));
  const used = findForms(text, forms.positive);
  return {
    enabledFormsUsed: used.filter((form) => enabledSet.has(normalize(form))),
    formsOutsideLayer: used.filter((form) => !enabledSet.has(normalize(form))),
    hypothesisFormsUsed: findForms(text, forms.hypotheses),
    discouragedUsed: findForms(text, forms.discouraged),
    regionMentions: findForms(text, regionTerms),
    originClaim: claimsOrigin(normalized, regionTerms),
    address: {
      voce: count(normalized, "você") + count(normalized, "vocês"),
      lhe: count(normalized, "lhe") + count(normalized, "lhes"),
      te: count(normalized, "te"),
      tu: count(normalized, "tu"),
      senhor: count(normalized, "o senhor") + count(normalized, "a senhora"),
    },
  };
}
