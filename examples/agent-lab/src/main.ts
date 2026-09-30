// Agent lab: runs scenarios under several host AIs (general assistant, tutor,
// store...) against a real model, with and without a regional layer, at several
// intensities, and writes a report plus a blind review sheet for speakers of the
// variety. No host or use case is the default (ADR-0017).
//
// Local only: your key, your model, your bill. Without OPENAI_API_KEY and
// OPENAI_MODEL (or with --dry-run) it only prints the plan.
import { createHash, randomInt } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { type CompiledPersona, compile } from "@vernaculo/compiler";
import { buildIR } from "@vernaculo/core";
import { loadPersona } from "@vernaculo/core/node";
import { withPersona } from "@vernaculo/openai";
import OpenAI from "openai";
import { parse } from "yaml";
import { checkReply, enabledForms, packForms } from "./checks.ts";
import {
  type BlindSample,
  type ConversationResult,
  orderForRecognition,
  type RunInfo,
  renderBlindSheet,
  renderReport,
  type Scenario,
  type Turn,
  type VariantInfo,
} from "./report.ts";

const labDir = fileURLToPath(new URL("..", import.meta.url));
const repoRoot = resolve(labDir, "../..");

const envFile = join(labDir, ".env");
if (existsSync(envFile)) process.loadEnvFile(envFile);

const { values: args } = parseArgs({
  options: {
    persona: { type: "string", default: "pt-BR/ba" },
    root: { type: "string", multiple: true },
    variants: { type: "string", default: "none,0,default,0.7,1" },
    scenario: { type: "string", multiple: true },
    model: { type: "string" },
    "dry-run": { type: "boolean", default: false },
    "max-calls": { type: "string", default: "120" },
    concurrency: { type: "string", default: "4" },
    out: { type: "string", default: join(labDir, "reports") },
  },
});

const REASONING_EFFORTS = ["none", "minimal", "low", "medium", "high", "xhigh", "max"] as const;
type ReasoningEffort = (typeof REASONING_EFFORTS)[number];

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function positiveInteger(name: string, value: string | undefined): number {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) fail(`--${name} must be a positive integer`);
  return parsed;
}

// --- persona and variants -------------------------------------------------

const roots = (args.root ?? [join(repoRoot, "personas")]).map((root) => resolve(root));
const resolved = await loadPersona(args.persona, { roots });
const metadata = resolved.document.metadata;
const defaultIntensity = resolved.document.regionality?.defaultIntensity ?? 0;
const forms = packForms(resolved.document);

interface Variant extends VariantInfo {
  readonly compiled: CompiledPersona | undefined;
  readonly enabled: readonly string[];
}

function variantOf(token: string): Variant {
  if (token === "none") {
    return {
      id: "none",
      label: "sem camada",
      intensity: undefined,
      compiled: undefined,
      enabled: [],
    };
  }
  const intensity = token === "default" ? defaultIntensity : Number(token);
  const ir = buildIR(resolved, { intensity });
  const label =
    intensity === defaultIntensity
      ? `intensidade ${intensity} (padrão)`
      : `intensidade ${intensity}`;
  return {
    id: `i${intensity}`,
    label,
    intensity,
    compiled: compile(ir),
    enabled: enabledForms(ir),
  };
}

const variants = [
  ...new Map(
    args.variants.split(",").map((token) => {
      const variant = variantOf(token.trim());
      return [variant.id, variant] as const;
    }),
  ).values(),
];

// --- scenarios ------------------------------------------------------------

// Trusted local config written by the lab user; not validated beyond its shape.
const scenarioFile = parse(await readFile(join(labDir, "scenarios.yaml"), "utf8")) as {
  scenarios: Scenario[];
  regionTerms?: Record<string, string[]>;
};
const locality = metadata.region?.locality;
const regionTerms =
  scenarioFile.regionTerms?.[metadata.id] ?? (locality === undefined ? [] : [locality]);
const wanted = new Set(args.scenario ?? []);
const scenarios = scenarioFile.scenarios.filter(
  (scenario) => wanted.size === 0 || wanted.has(scenario.id),
);
if (scenarios.length === 0) fail("no scenario selected");

// Host AIs (agents/<id>.md): each scenario runs under its own host, so no single use is the default.
const agentIds = [...new Set(scenarios.map((scenario) => scenario.agent))];
const agents: Record<string, string> = {};
for (const id of agentIds) {
  const file = join(labDir, "agents", `${id}.md`);
  if (!existsSync(file)) fail(`scenario agent "${id}" not found: ${file}`);
  agents[id] = (await readFile(file, "utf8")).trim();
}

const totalCalls =
  scenarios.reduce((acc, scenario) => acc + scenario.turns.length, 0) * variants.length;
const maxCalls = positiveInteger("max-calls", args["max-calls"]);
const model = args.model ?? process.env.OPENAI_MODEL;
const effort = process.env.OPENAI_REASONING_EFFORT;
if (effort && !REASONING_EFFORTS.includes(effort as ReasoningEffort)) {
  fail(`OPENAI_REASONING_EFFORT must be one of: ${REASONING_EFFORTS.join(", ")}`);
}

console.log(
  `persona:   ${metadata.id} ${metadata.version} (${resolved.document.metadata.maturity})`,
);
console.log(`variants:  ${variants.map((variant) => variant.label).join(" | ")}`);
console.log(`agents:    ${agentIds.join(", ")}`);
console.log(`scenarios: ${scenarios.map((scenario) => scenario.id).join(", ")}`);
console.log(`calls:     ${totalCalls} (limit ${maxCalls})`);
console.log(`model:     ${model ?? "(OPENAI_MODEL not set)"}`);

if (args["dry-run"] || !process.env.OPENAI_API_KEY || !model) {
  console.log(
    "\nDry run: nothing was sent. Create examples/agent-lab/.env from .env.example" +
      " (OPENAI_API_KEY and OPENAI_MODEL) to call the model.",
  );
  console.log(
    `To read what the model receives: pnpm vernaculo compile ${metadata.id} --intensity 0.7`,
  );
  process.exit(0);
}
if (totalCalls > maxCalls) {
  fail(`${totalCalls} calls exceed --max-calls ${maxCalls}; select scenarios or raise the limit`);
}
const modelId: string = model;

// --- run ------------------------------------------------------------------

const client = new OpenAI();
const startedAt = new Date().toISOString();
let done = 0;
let fatal: string | undefined;

async function converse(scenario: Scenario, variant: Variant): Promise<ConversationResult> {
  const history: { role: "user" | "assistant"; content: string }[] = [];
  const turns: Turn[] = [];
  for (const message of scenario.turns) {
    if (fatal) break;
    history.push({ role: "user", content: message });
    const params = {
      model: modelId,
      instructions: agents[scenario.agent] ?? "",
      input: [...history],
      // The lab keeps the history itself, so nothing needs to be stored by the provider.
      store: false,
      ...(effort ? { reasoning: { effort: effort as ReasoningEffort } } : {}),
    };
    try {
      const response = await client.responses.create(
        variant.compiled ? withPersona(params, variant.compiled) : params,
      );
      const reply = response.output_text.trim() || "(sem texto)";
      history.push({ role: "assistant", content: reply });
      turns.push({
        message,
        reply,
        checks: checkReply(reply, forms, variant.enabled, regionTerms),
        usage: {
          input: response.usage?.input_tokens ?? 0,
          output: response.usage?.output_tokens ?? 0,
        },
      });
      done++;
      console.log(`[${done}/${totalCalls}] ${scenario.id} · ${variant.label}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      // Authentication, permission and unknown-model errors will fail every call: stop early.
      if (error instanceof OpenAI.APIError && [401, 403, 404].includes(error.status ?? 0)) {
        fatal = message;
      }
      return { scenario: scenario.id, variant: variant.id, turns, error: message };
    }
  }
  return { scenario: scenario.id, variant: variant.id, turns };
}

const tasks = scenarios.flatMap((scenario) =>
  variants.map((variant) => () => converse(scenario, variant)),
);
const results: ConversationResult[] = [];
let next = 0;
async function worker(): Promise<void> {
  while (!fatal) {
    const task = tasks[next++];
    if (!task) return;
    results.push(await task());
  }
}
const concurrency = positiveInteger("concurrency", args.concurrency);
await Promise.all(Array.from({ length: Math.min(concurrency, tasks.length) }, worker));
if (fatal) fail(`the provider rejected the request: ${fatal}`);

// --- write ----------------------------------------------------------------

const run: RunInfo = {
  persona: metadata.id,
  personaName: metadata.name,
  personaVersion: metadata.version,
  maturity: metadata.maturity,
  model: modelId,
  startedAt,
  variants: variants.map(({ id, label, intensity }) => ({ id, label, intensity })),
  scenarios,
};

// Blind order: shuffle every conversation and give it an opaque id.
const shuffled = results.filter((result) => result.turns.length > 0);
for (let index = shuffled.length - 1; index > 0; index--) {
  const other = randomInt(index + 1);
  [shuffled[index], shuffled[other]] = [
    shuffled[other] as ConversationResult,
    shuffled[index] as ConversationResult,
  ];
}
const samples: BlindSample[] = orderForRecognition(shuffled, scenarios).map((result, index) => ({
  id: `s-${String(index + 1).padStart(3, "0")}`,
  scenario: result.scenario,
  variant: result.variant,
}));

const stamp = startedAt.replace(/[-:]/g, "").replace(/\..*$/, "").replace("T", "-");
const outDir = join(resolve(args.out), `${stamp}-${metadata.id.replaceAll("/", "_")}`);
await mkdir(outDir, { recursive: true });
const instructionHashes = Object.fromEntries(
  variants.map((variant) => [
    variant.id,
    variant.compiled
      ? createHash("sha256").update(variant.compiled.instructions).digest("hex").slice(0, 16)
      : null,
  ]),
);
await writeFile(join(outDir, "relatorio.md"), renderReport(run, results));
await writeFile(join(outDir, "revisao-cega.md"), renderBlindSheet(run, samples, results));
await writeFile(join(outDir, "gabarito.json"), `${JSON.stringify(samples, null, 2)}\n`);
await writeFile(
  join(outDir, "resultados.json"),
  `${JSON.stringify({ run, instructionHashes, agents, results }, null, 2)}\n`,
);

const failed = results.filter((result) => result.error);
console.log(`\nReport: ${join(outDir, "relatorio.md")}`);
console.log(`Blind review sheet: ${join(outDir, "revisao-cega.md")} (key: gabarito.json)`);
if (failed.length > 0) console.log(`${failed.length} conversation(s) failed; see the report.`);
