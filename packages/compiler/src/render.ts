import type { PersonaIR } from "@vernaculo/core";
import type { Maturity } from "@vernaculo/schema";

/**
 * Ground rules rendered at every intensity, for every persona. They implement
 * the normative invariants of docs/linguistic/anti-caricature.md and
 * docs/specification/overview.md; the wording is this compiler's.
 */
export function groundRules(ir: PersonaIR): string[] {
  const { language } = ir.persona;
  const rules = [
    `Keep your role, rules, policies and facts exactly as defined by the instructions you received before this layer. If a regional choice would make your output less clear, less accurate or less appropriate for the situation, use neutral ${language} instead.`,
    "Apply this layer only to language: vocabulary, discourse markers, sentence structure, forms of address and conversational conventions.",
    "Do not attribute or perform personality traits, humor, intelligence, education, income, social class, profession, religion, political views or behavior based on regional origin. Never imitate a stereotype.",
    "Do not claim to be from this region or to have a personal background there.",
    "Use only the regional forms listed in this layer. Never invent regionalisms and never borrow forms from other regions.",
    "Do not force regional features into every sentence; natural speakers do not mark every utterance.",
  ];
  if (ir.phoneticSpelling === "avoid") {
    rules.push(
      "Write every word in standard orthography; do not use phonetic or eye-dialect spelling.",
    );
  }
  return rules;
}

/** Qualitative guidance for an intensity. Provisional wording pending evals (see regional-intensity.md). */
export function describeIntensity(intensity: number, language: string): string {
  if (intensity === 0) {
    return `Intensity 0: write in neutral ${language}. Do not use any regional feature; only the restrictions below apply.`;
  }
  if (intensity <= 0.35) {
    return `Intensity ${intensity} (subtle): use regional features sparingly. Most sentences should contain none; prefer the least marked options.`;
  }
  if (intensity <= 0.7) {
    return `Intensity ${intensity} (moderate): use regional features where they fit naturally, without concentrating them.`;
  }
  return `Intensity ${intensity} (marked): regional features may appear more often, but only where a speaker of this variety would naturally use them. The ground rules still take precedence.`;
}

export function maturityNotice(maturity: Maturity): string | undefined {
  switch (maturity) {
    case "fixture":
      return "FIXTURE: synthetic test data, not linguistic content. Never use it in production.";
    case "draft":
      return "DRAFT: this persona has not been reviewed by speakers of this variety. Its content may be inaccurate.";
    case "reviewed":
      return undefined;
  }
}

/** Escapes characters that would change the meaning of inline Markdown. */
export function inline(text: string): string {
  return text.replace(/[\\`*_[\]<>|]/g, (char) => `\\${char}`);
}

function bullet(head: string, detail: string | undefined): string {
  return detail ? `- **${inline(head)}** — ${inline(detail)}` : `- **${inline(head)}**`;
}

function section(title: string, lines: readonly string[]): string[] {
  return lines.length > 0 ? ["", `## ${title}`, "", ...lines] : [];
}

function contextualBullet(item: { term: string; context: string; meaning?: string | undefined }) {
  return bullet(item.term, [`Context: ${item.context}`, item.meaning].filter(Boolean).join(" "));
}

function patternLine(item: { description: string; example?: string | undefined }): string {
  return item.example
    ? `- ${inline(item.description)} Example: "${inline(item.example)}"`
    : `- ${inline(item.description)}`;
}

/** How the model must treat `corroborated` forms (docs/specification/provenance.md). */
export const UNCONFIRMED_GUIDANCE: string =
  "Independent public sources report these forms for this variety, but they have not been validated in a structured speaker review. This source convergence does not establish how common or region-exclusive they are. Use them rarely: only in clearly informal conversation, at most one of them per reply, and never where a form listed above would do.";

/** Renders a PersonaIR as provider-neutral Markdown instructions. Pure and deterministic. */
export function renderInstructions(ir: PersonaIR): string {
  const { persona, pragmatics } = ir;
  const notice = maturityNotice(persona.maturity);
  const lines: string[] = [`# Regional language layer: ${inline(persona.name)} (${persona.id})`];
  if (notice) lines.push("", `> ${notice}`);
  lines.push(
    "",
    `This layer adjusts only how you write in ${persona.language}. It does not change who you are, what you know, or the rules you follow.`,
    ...section(
      "Ground rules",
      groundRules(ir).map((rule) => `- ${rule}`),
    ),
    ...section("Intensity", [describeIntensity(ir.intensity, persona.language)]),
  );

  const { preferred, contextual } = ir.vocabulary;
  const vocabulary = [
    ...(preferred.length > 0 ? ["Use where it fits naturally:"] : []),
    ...preferred.map((item) => bullet(item.term, item.meaning)),
    ...(contextual.length > 0 ? ["Use only in the stated context:"] : []),
    ...contextual.map(contextualBullet),
  ];
  lines.push(...section("Vocabulary", vocabulary));
  lines.push(
    ...section(
      "Discourse markers",
      ir.discourseMarkers.map((item) => bullet(item.form, item.function)),
    ),
  );
  lines.push(...section("Sentence patterns", ir.morphosyntax.map(patternLine)));

  const conventions: [string, readonly { form: string; usage?: string | undefined }[]][] = [
    ["Forms of address", pragmatics.addressForms],
    ["Greetings", pragmatics.greetings],
    ["Acknowledgements", pragmatics.acknowledgements],
    ["Disagreeing politely", pragmatics.disagreements],
    ["Closings", pragmatics.closings],
  ];
  lines.push(
    ...section(
      "Conversational conventions",
      conventions
        .filter(([, items]) => items.length > 0)
        .flatMap(([label, items]) => [
          `${label}:`,
          ...items.map((item) => bullet(item.form, item.usage)),
        ]),
    ),
  );

  const unconfirmed = ir.corroborated;
  const unconfirmedForms = [
    ...unconfirmed.vocabulary.preferred.map((item) => bullet(item.term, item.meaning)),
    ...unconfirmed.vocabulary.contextual.map(contextualBullet),
    ...unconfirmed.discourseMarkers.map((item) => bullet(item.form, item.function)),
    ...unconfirmed.morphosyntax.map(patternLine),
    ...[
      unconfirmed.pragmatics.addressForms,
      unconfirmed.pragmatics.greetings,
      unconfirmed.pragmatics.acknowledgements,
      unconfirmed.pragmatics.disagreements,
      unconfirmed.pragmatics.closings,
    ]
      .flat()
      .map((item) => bullet(item.form, item.usage)),
  ];
  if (unconfirmedForms.length > 0) {
    lines.push(
      ...section("Forms not yet confirmed by speakers", [
        UNCONFIRMED_GUIDANCE,
        "",
        ...unconfirmedForms,
      ]),
    );
  }

  lines.push(
    ...section(
      "Avoid",
      ir.vocabulary.discouraged.map((item) => bullet(item.term, item.reason)),
    ),
  );
  lines.push(
    ...section(
      "Examples",
      ir.examples.flatMap((example) => [
        `- ${inline(example.situation)}`,
        ...(example.neutral ? [`  - Neutral: "${inline(example.neutral)}"`] : []),
        `  - With this layer: "${inline(example.text)}"`,
      ]),
    ),
  );
  lines.push(
    ...section(
      "Never produce output like this",
      ir.antiPatterns.map(
        (item) => `- "${inline(item.text)}" — ${item.category}: ${inline(item.explanation)}`,
      ),
    ),
  );

  return `${lines.join("\n")}\n`;
}
