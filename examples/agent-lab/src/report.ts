// Renders lab results as Markdown for the maintainer (full report) and for
// speakers of the variety (blind review sheet). The text is in Portuguese
// because its readers are pt-BR reviewers.
import type { ReplyChecks } from "./checks.ts";

export interface Scenario {
  readonly id: string;
  /** Host AI: a file in agents/ (for example assistente, tutor, loja). */
  readonly agent: string;
  readonly situation: string;
  readonly purpose: string;
  readonly turns: readonly string[];
  /** The messages name the region, so they cannot be used to test recognition. */
  readonly revealsRegion?: boolean;
}

export interface VariantInfo {
  readonly id: string;
  readonly label: string;
  /** undefined for the no-layer control. */
  readonly intensity: number | undefined;
}

export interface Turn {
  /** What the person wrote. */
  readonly message: string;
  readonly reply: string;
  readonly checks: ReplyChecks;
  readonly usage: { readonly input: number; readonly output: number };
}

export interface ConversationResult {
  readonly scenario: string;
  readonly variant: string;
  readonly turns: readonly Turn[];
  readonly error?: string | undefined;
}

export interface RunInfo {
  readonly persona: string;
  readonly personaName: string;
  readonly personaVersion: string;
  readonly maturity: string;
  readonly model: string;
  readonly startedAt: string;
  readonly variants: readonly VariantInfo[];
  readonly scenarios: readonly Scenario[];
}

/** The reviewer-facing labels of docs/linguistic/human-review.md. */
export const REVIEW_LABELS: readonly string[] = [
  "parece natural",
  "isso realmente usamos",
  "parece exagerado",
  "não reconheço essa expressão",
  "isso é de outra região",
  "parece caricato",
  "é ofensivo",
  "formalidade inadequada",
];

function quote(text: string): string {
  return text
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n");
}

function list(values: readonly string[]): string {
  return values.length > 0 ? values.join(", ") : "—";
}

function signals(checks: ReplyChecks): string {
  const parts: string[] = [];
  if (checks.enabledFormsUsed.length > 0)
    parts.push(`formas da camada: ${list(checks.enabledFormsUsed)}`);
  if (checks.formsOutsideLayer.length > 0)
    parts.push(`⚠️ formas do pack fora da faixa: ${list(checks.formsOutsideLayer)}`);
  if (checks.hypothesisFormsUsed.length > 0)
    parts.push(`⚠️ hipóteses: ${list(checks.hypothesisFormsUsed)}`);
  if (checks.discouragedUsed.length > 0)
    parts.push(`❌ desencorajadas: ${list(checks.discouragedUsed)}`);
  if (checks.originClaim) parts.push("❌ afirma origem regional");
  if (checks.regionMentions.length > 0)
    parts.push(`menciona a região: ${list(checks.regionMentions)}`);
  const a = checks.address;
  parts.push(
    `tratamento: você ${a.voce} · lhe ${a.lhe} · te ${a.te} · tu ${a.tu} · senhor(a) ${a.senhor}`,
  );
  return parts.join(" · ");
}

function sum(results: readonly ConversationResult[], pick: (turn: Turn) => number): number {
  return results.reduce(
    (total, result) => total + result.turns.reduce((inner, turn) => inner + pick(turn), 0),
    0,
  );
}

/** The full report: every conversation, grouped by scenario, with automatic signals. */
export function renderReport(run: RunInfo, results: readonly ConversationResult[]): string {
  const lines: string[] = [];
  lines.push(`# Laboratório de agente — ${run.persona}`, "");
  lines.push(`- Persona: ${run.personaName} ${run.personaVersion} (maturidade: ${run.maturity})`);
  lines.push(`- Modelo: ${run.model}`);
  lines.push(`- Início: ${run.startedAt}`);
  lines.push(`- Variantes: ${run.variants.map((variant) => variant.label).join(" · ")}`);
  lines.push(
    `- Tokens: ${sum(results, (turn) => turn.usage.input)} de entrada, ${sum(results, (turn) => turn.usage.output)} de saída`,
  );
  lines.push("");
  if (run.maturity !== "reviewed") {
    lines.push(
      "> Pack em rascunho, ainda não revisado por falantes da variedade. A revisão por falantes é recomendada antes de uso em produção.",
      "",
    );
  }
  lines.push(
    "> Os sinais automáticos são heurísticos: ajudam a achar problemas, não provam naturalidade. Quem julga naturalidade são falantes da variedade (use `revisao-cega.md`).",
    "",
  );

  lines.push("## Resumo por variante", "");
  lines.push(
    "| Variante | Respostas | Formas da camada | Fora da faixa | Hipóteses | Desencorajadas | Afirma origem | você | lhe | te | tu | senhor(a) |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
  );
  for (const variant of run.variants) {
    const turns = results
      .filter((result) => result.variant === variant.id)
      .flatMap((result) => result.turns);
    const total = (pick: (checks: ReplyChecks) => number) =>
      turns.reduce((acc, turn) => acc + pick(turn.checks), 0);
    lines.push(
      `| ${variant.label} | ${turns.length} | ${total((c) => c.enabledFormsUsed.length)} | ${total((c) => c.formsOutsideLayer.length)} | ${total((c) => c.hypothesisFormsUsed.length)} | ${total((c) => c.discouragedUsed.length)} | ${total((c) => (c.originClaim ? 1 : 0))} | ${total((c) => c.address.voce)} | ${total((c) => c.address.lhe)} | ${total((c) => c.address.te)} | ${total((c) => c.address.tu)} | ${total((c) => c.address.senhor)} |`,
    );
  }
  lines.push("");

  for (const scenario of run.scenarios) {
    lines.push(`## ${scenario.id} — ${scenario.situation}`, "");
    lines.push(`IA hospedeira: \`agents/${scenario.agent}.md\``, "");
    lines.push(`O que observar: ${scenario.purpose}`, "");
    for (const variant of run.variants) {
      const result = results.find(
        (entry) => entry.scenario === scenario.id && entry.variant === variant.id,
      );
      if (!result) continue;
      lines.push(`### ${variant.label}`, "");
      for (const turn of result.turns) {
        lines.push(`**Pessoa:** ${turn.message}`, "");
        lines.push(quote(turn.reply), "");
        lines.push(`<sub>${signals(turn.checks)}</sub>`, "");
      }
      if (result.error) lines.push(`**Erro:** ${result.error}`, "");
    }
  }
  return `${lines.join("\n").trimEnd()}\n`;
}

export interface BlindSample {
  readonly id: string;
  readonly scenario: string;
  readonly variant: string;
}

/**
 * Orders samples for the blind sheet: conversations that never name the region
 * come first, because only they can test whether readers recognize the variety
 * (docs/evals/dimensions.md, "Reconhecimento").
 */
export function orderForRecognition<T extends { readonly scenario: string }>(
  items: readonly T[],
  scenarios: readonly Scenario[],
): T[] {
  const reveals = (item: T) =>
    scenarios.find((scenario) => scenario.id === item.scenario)?.revealsRegion === true;
  return [...items.filter((item) => !reveals(item)), ...items.filter(reveals)];
}

/**
 * The blind review sheet: every conversation as an anonymous sample, in shuffled
 * order, without saying which variant produced it (the key is saved apart). It
 * never names the variety up front, so the recognition question stays blind.
 */
export function renderBlindSheet(
  run: RunInfo,
  samples: readonly BlindSample[],
  results: readonly ConversationResult[],
): string {
  const lines: string[] = [];
  lines.push("# Revisão de amostras", "");
  lines.push(
    "Estas são conversas de uma IA em situações variadas (assistente, tutor, loja fictícia). Algumas usam uma camada de linguagem regional; outras não. A ordem é aleatória e nada indica qual é qual.",
    "",
    "Para cada amostra, leia só as respostas da IA. Na primeira parte, diga primeiro de onde parece ser quem escreveu; depois marque os rótulos que se aplicam (pode marcar mais de um). Se uma palavra ou expressão específica chamar a atenção, cite-a no comentário. Não há resposta certa: queremos a sua percepção como falante.",
    "",
    "Sua revisão é uma contribuição para um projeto aberto (licença Apache-2.0). Não escreva nomes nem dados pessoais nos comentários.",
    "",
  );
  let part = 0;
  for (const sample of samples) {
    const result = results.find(
      (entry) => entry.scenario === sample.scenario && entry.variant === sample.variant,
    );
    const scenario = run.scenarios.find((entry) => entry.id === sample.scenario);
    if (!result || !scenario || result.turns.length === 0) continue;
    const blind = scenario.revealsRegion !== true;
    if (part === 0 && blind) {
      lines.push("## Parte 1", "");
      part = 1;
    } else if (part < 2 && !blind) {
      lines.push(
        "## Parte 2",
        "",
        "Nestas conversas a própria pessoa menciona um lugar: só marque os rótulos.",
        "",
      );
      part = 2;
    }
    lines.push(`### ${sample.id}`, "");
    lines.push(`Situação: ${scenario.situation}`, "");
    for (const turn of result.turns) {
      lines.push(`**Pessoa:** ${turn.message}`, "");
      lines.push(`**IA:** ${turn.reply.replace(/\n+/g, " ")}`, "");
    }
    if (blind) {
      lines.push("De onde você diria que é quem escreveu? (ou “não dá para saber”):", "");
    }
    lines.push(...REVIEW_LABELS.map((label) => `- [ ] ${label}`), "");
    lines.push("Comentário:", "", "---", "");
  }
  return `${lines.join("\n").trimEnd()}\n`;
}
