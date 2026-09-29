---
paths:
  - "packages/*/test/**"
  - "vitest.config.ts"
---

# Testing rules

- Vitest runs against sources through the `@vernaculo/source` export condition; don't import from `dist/`.
- Test behavior and invariants, not implementation details. No tests written only for coverage.
- Use synthetic data only: `fixtures/personas` or inline YAML with `maturity: fixture` and `evidence: synthetic`. Never put real regional claims in tests.
- Specification changes start with conformance fixtures in `schemas/conformance/` (both valid and invalid cases); those are run by `packages/schema/test` and `packages/core/test`.
- Golden files in `packages/compiler/test/__golden__/` change only on purpose (`pnpm vitest run packages/compiler -u`), with the reason stated in the change.
- Temporary files: `mkdtempSync(join(tmpdir(), ...))`, removed in `afterAll`.
- Invariant tests (architecture, determinism, no network, non-mutation) must stay meaningful: when adding one, break the rule once on purpose to see it fail.
- Tests must pass on Linux and Windows (CI runs both): use `node:path` joins, compare ids with `/`, rely on LF (`.gitattributes`).
