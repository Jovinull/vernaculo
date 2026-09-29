---
paths:
  - "packages/**/src/**"
  - "packages/*/package.json"
---

# Architecture rules for package sources

- Dependency direction is one-way: `schema ← core ← compiler ← openai, skills ← cli`. Allowed internal imports are listed in `packages/core/test/architecture.test.ts`; update that list (and `docs/architecture/packages.md`) only with a documented reason.
- No network: no `fetch`, `http`/`https`/`net`/`tls`/`dgram`, `undici`, `axios`, `node-fetch`. No provider SDKs (`openai`, `@openai/*`, `@anthropic-ai/*`, `@google/*`, `@modelcontextprotocol/*`) as imports or dependencies of any package. Adapters use structural types.
- `@vernaculo/core`'s main entry, `schema`, `compiler`, `openai` and `skills` must not import `node:` modules. Filesystem code belongs in `packages/core/src/node.ts` or the CLI.
- Feature selection (intensity, evidence) happens only in `buildIR` (core). Renderers and targets format the IR; they never re-select or re-interpret persona data.
- Compilation is pure and deterministic: no `Date`, randomness, environment reads or locale-dependent formatting in outputs; LF line endings.
- The compiled layer always contains the ground rules and the maturity notice; changing them is a documented decision (`docs/linguistic/anti-caricature.md`).
- Library code throws `VernaculoError` (stable issue codes) and never calls `process.exit`; only `packages/cli/src/bin.ts` sets the exit code.
- Don't create packages for future work; document it in the roadmap instead.
