---
name: project-context
description: Recover Vernáculo's product, architecture and decision context before a non-trivial change — which docs and ADRs to read for a given question, without loading all documentation or rereading ideia.txt. Use when starting work on an unfamiliar area, when a request touches architecture, invariants, the persona format, adapters, distribution or roadmap, or when unsure whether something was already decided.
---

# Project context

`docs/` is the source of truth. Load only what the task needs.

## 1. Orient (always, ~2 minutes)

- `docs/README.md` — the map.
- `docs/product/principles.md` — the invariants, each linked to its ADR.
- `docs/roadmap/roadmap.md` — what exists vs. what is planned. Never assume a planned item exists.

## 2. Pick the pages for the question

| Question | Read |
| --- | --- |
| What is the product / what is out of scope? | `docs/product/vision.md`, `docs/product/scope.md` |
| How do packages fit, who may import whom? | `docs/architecture/overview.md`, `docs/architecture/packages.md` |
| How is a persona turned into instructions? | `docs/architecture/compilation.md` |
| Provider specifics (OpenAI, future Claude/Gemini/local/MCP) | `docs/architecture/provider-adapters.md`, `docs/reference/external-facts.md` |
| Install, `add`, `eject`, no lock-in | `docs/architecture/distribution.md`, `docs/reference/cli.md` |
| Cost / network / hosting constraints | `docs/architecture/zero-infrastructure.md`, ADR-0001 |
| Persona fields and rules | `docs/specification/persona-format.md`, `overview.md` |
| Inheritance / merging | `docs/specification/inheritance-and-composition.md` |
| Intensity | `docs/specification/regional-intensity.md` |
| Evidence, sources, maturity, licenses | `docs/specification/provenance.md`, `docs/linguistic/sources.md` |
| Regional content, caricature risks | `docs/linguistic/anti-caricature.md`, `methodology.md`, `regional-packs.md` |
| Evals, human review | `docs/evals/*`, `docs/linguistic/human-review.md` |
| Tooling, versions, tests | `docs/development/stack.md`, `testing.md` |
| Was X already decided? | `docs/decisions/README.md` index, then the ADR; `docs/roadmap/open-questions.md` |
| Where did an idea originally come from? | `docs/reference/idea-assimilation.md` (maps `ideia.txt` line ranges to docs) |

## 3. Confirm against the code

Docs describe intent and contracts; verify behavior in the source before relying
on it (`packages/*/src`, tests in `packages/*/test`). If docs and code disagree,
treat it as a bug: fix whichever is wrong in the same task and say so.

## 4. About `ideia.txt`

Historical record only. Read a specific line range (from the assimilation table)
only when researching the origin or intent of a decision. Its versions, API
examples and model names are not authoritative.

## 5. Before acting

State which ADRs/invariants the change touches. If the task conflicts with an
accepted ADR, propose a superseding ADR instead of working around it. Then load
the specific skill: `persona-specification`, `linguistic-research`, `evals`,
`adapter-development`, `documentation-maintenance`, `release-quality`.
