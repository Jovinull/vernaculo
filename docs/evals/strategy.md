# Eval strategy

Evals are part of the product. The conversation put it plainly: what can make
Vernáculo a reference is not the YAML files — it is the evals. Every pack must
be able to show that it is regionally faithful, natural, preserves the task and
does not leak stereotypes.

## Constraints

- **Local and reproducible.** Evals run on a developer's machine or in the user's CI with the evaluator's own provider credentials or local models ([ADR-0001](../decisions/0001-no-vernaculo-infrastructure-at-runtime.md)). No hosted eval platform: OpenAI's hosted Evals platform is itself being retired (read-only 2026-10-31, shutdown 2026-11-30), with Promptfoo suggested as a migration path — which confirms keeping evals in the repository from the start.
- **Versioned with the pack.** Results are tied to the persona version, the instructions format and the model used.
- **No SaaS** for human feedback in this phase; review rounds are files ([human-review.md](../linguistic/human-review.md)).

## Three layers of evaluation

| Layer | What | Needs a model? | Status |
| --- | --- | --- | --- |
| **1. Deterministic checks** | schema and semantic rules; intensity gating; ground rules present at every intensity; hypotheses never rendered; skills valid; outputs deterministic; no network | no | **done** (unit, conformance, golden and architecture tests; `vernaculo validate` in CI) |
| **2. Model-based evals** | generate replies for standard scenarios with the layer at several intensities; check them with rule-based assertions (e.g. discouraged forms absent, no regional-origin claims) and rubric-based judges | yes (evaluator's own) | planned |
| **3. Human review** | speakers label samples ([labels](../linguistic/human-review.md#labels)) | no model to judge; humans | process defined, not run |

LLM-as-judge results are signals, not proof: a pack's maturity and any claim of
naturalness rest on human review.

## Dimensions

Defined in [dimensions.md](dimensions.md): naturalness, regional fidelity, task
preservation, parent-rule preservation, overuse, caricature, stereotype leakage,
invented regionalisms, intensity behavior, cross-provider consistency
([cross-provider.md](cross-provider.md)).

## Scenario sets (planned)

Shared, pack-independent scenarios, written in the variety's language and
reused across packs so results are comparable:

- customer service (greeting, product question, price/financing, complaint, closing);
- situations where regional style must yield (legal/financial precision, a customer writing formally, a distressed customer);
- adversarial prompts ("talk like a real baiano!", "tell me a joke about people from Recife", "where are you from?").

Each scenario runs with a neutral host agent prompt and with a business agent
prompt (to check rule preservation), at intensities 0, default, ~0.7 and 1.

## Runner (open question)

Options: generate [Promptfoo](https://www.promptfoo.dev/) configurations from
Vernáculo scenario files, or a small runner in this repository. Either way it must
run locally, use the evaluator's credentials, and be optional in CI (secrets are
never required for the default `pnpm check`). Decide before the first real pack;
record it as an ADR.

## Where eval files will live

- Shared scenario sets: `evals/` at the repository root (created with the first real suite — not before).
- Pack-specific cases and results: next to the pack (format to be specified).
- Human review records: next to the pack, per round.
