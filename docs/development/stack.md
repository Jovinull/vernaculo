# Technical stack

Versions were checked against the npm registry and official sources on
**2026-09-29**. Do not copy versions from `ideia.txt`; re-check before upgrading.

## Runtime and language

| Choice | Version | Notes |
| --- | --- | --- |
| Node.js (development) | 24 LTS "Krypton" (`.node-version`) | Node 22 "Jod" is maintenance LTS; Node 26 is "Current" until it becomes LTS |
| Node.js (published packages) | ≥ 22.12 (`engines`) | Commander 15 requires ≥ 22.12; tsdown needs ≥ 22.18 for *building* only |
| TypeScript | 7.0.2 | the native (Go) compiler. Strict by default; no programmatic compiler API until 7.1 — see below |
| Module format | ESM only, `.mjs` + `.d.mts` outputs | `"type": "module"` everywhere |

TypeScript settings (`tsconfig.base.json`): `strict`, `noUncheckedIndexedAccess`,
`isolatedDeclarations`, `verbatimModuleSyntax`, `erasableSyntaxOnly`,
`module: preserve` + `moduleResolution: bundler`, `allowImportingTsExtensions`
(imports use `.ts` extensions), `customConditions: ["@vernaculo/source"]`.

Why `isolatedDeclarations`: TS 7 has no JS compiler API, so declaration bundling
uses Oxc (fast, stable) instead of the experimental tsgo path; it also forces
explicit types on every export, which keeps public APIs deliberate.

Why `erasableSyntaxOnly` + `.ts` imports: source files stay directly runnable by
Node's type stripping (e.g. `examples/openai`).

## Tooling

| Tool | Version | Role |
| --- | --- | --- |
| pnpm | 12.8.1 (`packageManager`) | workspaces; its default supply-chain policy rejects releases younger than its minimum release age — do not add exclusions casually |
| tsdown | 0.23.0 | builds each package (Rolldown + Oxc declarations); shared config in `tsdown.base.ts` |
| Vitest | 5.0.2 (+ Vite 8.3.1 peer) | tests, run against sources via the `@vernaculo/source` condition |
| Biome | 2.5.14 | lint + format (`biome.json`) |
| Changesets | CLI 3.0.3 | versioning; `fixed` group for all published packages |
| Ajv | 8.20.0 (dev only) | validates conformance fixtures against the canonical JSON Schema (draft 2020-12) |
| GitHub Actions | checkout v7, setup-node v7, pnpm/action-setup v6 | CI (`.github/workflows/ci.yml`) |

## Runtime dependencies of published packages

| Package | Dependency | Why |
| --- | --- | --- |
| `@vernaculo/schema` | `zod` ^4.6.5 | typed runtime validation mirroring the JSON Schema |
| `@vernaculo/core`, `@vernaculo/skills` | `yaml` ^2.9.1 | YAML 1.2 parsing with duplicate-key detection; YAML 1.1-safe serialization |
| `vernaculo` (CLI) | `commander` ^15.0.0 | command parsing |

Deliberately **not** used (yet):

- `@clack/prompts` (1.8.1 available): part of the intended stack for interactive CLI flows; no current command is interactive, so it is not installed. Add it with the first interactive command (e.g. `add`).
- `openai` SDK: only the example depends on it (pinned 7.23.0); `@vernaculo/openai` uses structural types.
- `@openai/agents` (0.18.0), `@modelcontextprotocol/server` (MCP SDK v2): future adapters only.
- Any web framework (Next.js etc.), database or Rust toolchain ([ADR-0004](../decisions/0004-typescript-reference-implementation.md), [ADR-0008](../decisions/0008-git-and-filesystem-no-database.md)).

## Stack as decided in the conversation vs. now

| Conversation | Now |
| --- | --- |
| TypeScript, Node LTS, pnpm workspaces | same |
| YAML + Markdown personas, JSON Schema | same; JSON Schema is hand-written and normative |
| Zod 4 | same (mirror of the JSON Schema) |
| TypeScript + Commander + @clack/prompts CLI | Commander now; Clack when interactive commands arrive |
| Vitest, Biome, tsdown | same |
| GitHub Actions; Changesets + npm + GitHub Releases | CI configured; Changesets configured; publishing manual and not yet done |
| OpenAI Responses API / Agents SDK first | Responses adapter done; Agents SDK adapter is an idea |
| Agent Skills (`SKILL.md`) | exporter done |
| MCP TypeScript SDK v2, later | later |
| No infrastructure, no database, no backend | same (enforced by tests) |
