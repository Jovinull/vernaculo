---
name: adapter-development
description: Add or change a Vernáculo provider adapter or export target (OpenAI, OpenAI Agents SDK, Anthropic/Claude, Gemini, local models via Ollama, MCP server, Agent Skills, plain prompts) without coupling the core to any provider. Use when creating packages/<adapter>, adding a compile/export target to the CLI, or changing how compiled instructions are composed with a host agent.
---

# Adapter and target development

## Read first

- `docs/architecture/provider-adapters.md` — rules and per-provider notes
- `docs/architecture/compilation.md` — IR, compiler output, targets table
- ADR-0002 (provider-agnostic), ADR-0005 (OpenAI thin adapter), ADR-0006 (MCP), ADR-0007 (Skills), ADR-0009 (composition)
- `docs/reference/external-facts.md` — verified provider facts

## Rules

1. Adapters depend on `@vernaculo/compiler` (and core types). Never make core/compiler/schema import an adapter or provider type.
2. **No network and no credentials in the adapter.** It shapes data for the user's own client. Prefer structural types over provider SDK dependencies; if an SDK type is unavoidable, make it an optional peer dependency and justify it in an ADR. Update the architecture test's allowed list deliberately.
3. **Consume the IR/compiled output only.** Never re-select features or reinterpret persona data; selection happens in `buildIR`.
4. **Composition contract**: host agent instructions first, persona layer after; the persona is applied on every request where the provider does not persist instructions.
5. **Verify provider facts** in official docs before encoding them; record them with URL and date in `external-facts.md`. Never hardcode model names.
6. **Determinism**: same compiled persona ⇒ same adapter output.
7. Provider-specific rendering differences are allowed only with eval evidence, and live in the adapter.

## Procedure

1. Confirm the item is on the roadmap; if it is a new kind of target or channel, write an ADR.
2. Create `packages/<name>/` like `packages/openai`: `package.json` (ESM, `@vernaculo/source` export condition, `engines`, `publishConfig`), `tsconfig.json`, `tsdown.config.ts` (`packageConfig([...])`), `src/index.ts`, `test/`.
3. Add it to `ALLOWED_INTERNAL` in `packages/core/test/architecture.test.ts`.
4. Tests: composition order, immutability of inputs, determinism, no SDK dependency, target-spec constraints (as `packages/skills/test` does for Agent Skills).
5. Wire into the CLI only if useful (`--target` choice), and update `docs/reference/cli.md`.
6. Add an example under `examples/` if it clarifies usage (fixtures only; dry run without credentials).
7. Update `provider-adapters.md`, `compilation.md` targets table, `packages.md`, roadmap; add a changeset. Run `pnpm check`.
