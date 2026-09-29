# Testing

```bash
pnpm test            # all tests (sources, no build needed)
pnpm test:watch
pnpm check           # lint + typecheck + tests + build + data validation (what CI runs)
```

Tests import package sources through the `@vernaculo/source` export condition
(`vitest.config.ts`), so they never test stale builds.

## What is tested, and where

| Area | File | Guarantees |
| --- | --- | --- |
| Specification conformance (structure) | `packages/schema/test/conformance.test.ts` | every conformance file gets the same verdict from Ajv (canonical JSON Schema) and Zod |
| Schema parity | `packages/schema/test/schema-parity.test.ts` | the JSON Schema generated from Zod carries exactly the canonical constraints, node by node |
| Specification conformance (semantics, resolution) | `packages/core/test/conformance.test.ts` | semantic fixtures fail with their expected code; resolution cases produce the expected lineage and flattened document (including key order) |
| Parsing | `packages/core/test/parse.test.ts` | YAML errors, duplicate keys, non-JSON values, issue paths, all document issues reported at once |
| Resolution | `packages/core/test/resolve.test.ts` | lineage, cancellation, scalar inheritance, determinism, root shadowing, project files, path-safe ids, depth bound, listing order |
| Intensity / IR | `packages/core/test/ir.test.ts` | bounds, neutral at 0, gating, hypotheses never rendered, examples gating, frozen IR, no mutation |
| Serialization | `packages/core/test/serialize.test.ts` | round trip; YAML 1.1-safe quoting |
| Architecture invariants | `packages/core/test/architecture.test.ts` | no provider SDK/network imports or deps; dependency direction; runtime-agnostic entries; every library persona is Apache-2.0 (ADR-0014) |
| Compiler | `packages/compiler/test/compile.test.ts` | golden outputs per intensity; ground rules at every intensity; maturity notice; determinism; escaping; works with network disabled |
| OpenAI adapter | `packages/openai/test/openai.test.ts` | composition order, immutability, per-request idempotence, no SDK dependency |
| Skill exporter | `packages/skills/test/skills.test.ts` | Agent Skills spec constraints, layout, gating, determinism |
| CLI | `packages/cli/test/cli.test.ts` | every command, exit codes, overwrite protection, eject round trip (ejected persona compiles to identical instructions), review recommendations for drafts and license notes in ejected files (ADR-0015) |

## Conventions

- Test behavior and invariants, not implementation details; no tests written just for coverage.
- Use `fixtures/personas` (synthetic) or inline synthetic YAML. Never put real regional claims in tests.
- Temporary files go to `os.tmpdir()` and are removed in `afterAll`.
- Golden files (`__golden__/*.md`) change only on purpose: run `pnpm vitest run <path> -u`, review the diff, and explain the wording change.
- When the specification changes, add conformance fixtures first (valid and invalid), then update both validators.
- A mutation check is a good habit for invariant tests: break the rule on purpose once and confirm the test fails.
