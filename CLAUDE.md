# Vernáculo — instructions for Claude Code

Vernáculo is an open, self-hosted, provider-agnostic specification + toolchain that
adds **regional language layers** (sociolinguistic localization) to existing AI
agents: `business agent + persona layer = localized agent`. Early bootstrap: spec
`vernaculo.dev/v1alpha1`, packages and CLI work; **no real regional pack exists yet**
(only synthetic fixtures).

## Where knowledge lives

- `docs/` is the **source of truth** (index: `docs/README.md`). ADRs: `docs/decisions/`.
- `ideia.txt` is the historical founding conversation. Do not reread it for routine work; its content is assimilated (`docs/reference/idea-assimilation.md`). Never edit or delete it.
- Status of work: `docs/roadmap/roadmap.md`; unresolved decisions: `docs/roadmap/open-questions.md`.
- Dated external facts (OpenAI, MCP, Agent Skills, Node, licenses): `docs/reference/external-facts.md`.

## Before changing architecture, behavior, format or contracts

1. Read the code you will touch and the related docs/ADRs. Load the matching project skill (below).
2. Respect the invariants (next section). If a change conflicts with an ADR, stop and propose a new ADR instead of eroding the old one.
3. Investigate before inventing: verify library/API facts in official docs or the installed package; do not trust memory or `ideia.txt` for versions and APIs.

## Invariants (never break without a new ADR)

- **Zero Vernáculo infrastructure at runtime**: no API, backend, DB, account, key, proxy, telemetry or maintainer-paid inference. No network calls, `fetch`, network modules or provider SDKs in any package (`packages/core/test/architecture.test.ts` enforces this).
- **Provider independence**: `schema`, `core`, `compiler` never import provider SDKs/types. Dependency direction: `schema ← core ← compiler ← openai, skills ← cli`. OpenAI is only the first adapter; MCP and `SKILL.md` are targets, never the canonical format.
- **Deterministic, LLM-free compilation**: same input ⇒ same bytes. No timestamps/randomness in outputs.
- **The format is language-neutral**: the JSON Schema in `schemas/` is normative; Zod mirrors it. Format meaning must never depend on TypeScript code.
- **Language layer only**: personas never encode personality, humor, intelligence, education, income, profession, religion, politics or behavior; rendered output always carries the ground rules (`docs/linguistic/anti-caricature.md`).
- **Evidence before claims**: never call a pack/output validated, natural, representative, stereotype-free or production-ready without human review + eval evidence. Never invent regionalisms or real regional content; synthetic data only in `fixtures/` with `maturity: fixture`.
- **Review is recommended, never mandatory** (ADR-0015): no review gates or thresholds; always recommend review by speakers for `draft` packs (docs, PRs, CLI hints). `reviewed` only when a review really happened.
- **One open license**: code, docs, schemas and persona content are Apache-2.0 (ADR-0014); library packs declare `metadata.license: Apache-2.0`. Third-party material keeps its own license.
- **No lock-in**: personas are portable files; `eject` must keep producing self-contained output.

## Documentation rule

**No important decision may survive only in the conversation.** In the same task
that changes a decision, invariant, public behavior, persona format, CLI contract,
pack structure, methodology, compatibility, adapter set or roadmap, update the
canonical doc in `docs/` (create one and link it from `docs/README.md` if none
fits) and add/supersede an ADR for structural decisions. Docs describe the
current state; Git keeps history. Details: `.claude/rules/documentation.md`.

## Stack

TypeScript 7 (native `tsc`; strict, `isolatedDeclarations`, `.ts` import
extensions, `erasableSyntaxOnly`), Node 24 LTS for dev / packages support ≥ 22.12,
pnpm 12 workspaces, Zod 4, `yaml`, Vitest 5, Biome 2, tsdown (Oxc declarations),
Commander 15, Changesets, GitHub Actions. ESM only. Versions and rationale:
`docs/development/stack.md`.

## Commands

```bash
pnpm install
pnpm check                 # lint + typecheck + test + build + validate:data (= CI)
pnpm test                  # vitest against sources (no build needed)
pnpm vitest run packages/compiler -u   # update golden files — only for intended wording changes
pnpm typecheck             # tsc --noEmit over the whole repo
pnpm lint / pnpm lint:fix  # biome
pnpm build                 # tsdown for every package
pnpm vernaculo <cmd>       # built CLI, e.g. pnpm vernaculo validate --root fixtures/personas
pnpm changeset             # when a published package's public behavior changes
```

## Layout

- `packages/{schema,core,compiler,openai,skills,cli}` — `src/index.ts` entry; `@vernaculo/core/node` holds filesystem code.
- `schemas/v1alpha1/persona.schema.json` + `schemas/conformance/v1alpha1/` (valid, invalid-schema, invalid-semantic, resolution).
- `fixtures/personas/` synthetic personas (`pt-BR/x-fixture/...`); `personas/` real library (empty); `examples/`.

## Quality conventions

- Small, explicit APIs; no speculative abstractions, placeholder packages or misleading stubs.
- Errors are `VernaculoError` with stable issue codes (documented in `docs/specification/overview.md`); library code never exits the process.
- Tests cover behavior and invariants (see `docs/development/testing.md`); run `pnpm check` before calling work done.
- Never add a dependency without checking its current version, maintenance, engines and license; respect pnpm's minimum-release-age policy (no casual exclusions).
- Git: never push, publish to npm, tag or create releases without explicit instruction.

## Project skills (load when relevant)

- `project-context` — recover product/architecture/decision context efficiently.
- `documentation-maintenance` — keep docs, ADRs and roadmap in sync with a change.
- `persona-specification` — schema, format, parser, resolver, inheritance, intensity semantics.
- `linguistic-research` — creating or reviewing regional packs (evidence, sources, licenses, anti-caricature, human review).
- `evals` — eval dimensions, scenarios, human review labels, cross-provider checks.
- `adapter-development` — adding a provider adapter or export target.
- `release-quality` — checklist before calling a change done or releasable.

Keep this file short (< 200 lines): details belong in `docs/`, `.claude/rules/` or skills.
