# ADR-0011: Deterministic, LLM-free compilation

- Status: Accepted
- Date: 2026-09-29
- Origin: `ideia.txt` ("o compiler não chama IA. Portanto custa R$ 0. É basicamente transformação determinística de dados.")

## Context

Generating or rewriting personas with a model at runtime would cost tokens (for
someone), break reproducibility, leak data to a provider and make tests flaky.

## Decision

- `persona.yaml → resolve → IR → instructions` is a **pure, local, deterministic transformation**. Same inputs (persona files, intensity, compiler version) ⇒ byte-identical output.
- No package in the pipeline calls a model or the network. Providers are used only by the *user's* application, afterwards, with the user's credentials.
- Determinism details: canonical key order (the JSON Schema's property order), stable list order (inheritance merge rules), code-unit ordering of listings, LF line endings, no timestamps or random values in outputs.
- Fine-tuning is not part of the design (portability; OpenAI's fine-tuning is also closed to new organizations as of 2026 — see [external facts](../reference/external-facts.md)).

## Consequences

- Wording changes to compiled instructions show up as reviewable diffs in golden files (`packages/compiler/test/__golden__/`).
- Model-based evaluation exists only in evals, run locally or in the user's CI ([evals/strategy.md](../evals/strategy.md)).
- Tests verify: determinism, non-mutation of the canonical representation, and that the pipeline works with `fetch` disabled.

## Alternatives considered

- **LLM-assisted "persona rendering"** — rejected for the core; could only ever be an optional, offline authoring aid proposed through a new ADR.
