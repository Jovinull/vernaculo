# Contributing

Thanks for your interest in Vernáculo. The project is at an early stage; the
documentation in [`docs/`](docs/README.md) is the source of truth.

## Before you change anything important

1. Read the relevant docs and ADRs ([docs/decisions](docs/decisions/README.md)).
2. Respect the invariants in [docs/product/principles.md](docs/product/principles.md) — in particular: no Vernáculo infrastructure at runtime, no provider coupling in the core, deterministic compilation, and the anti-caricature policy.
3. For structural changes, propose an ADR first.

## Workflow

```bash
pnpm install
pnpm check          # must pass before a PR
pnpm changeset      # when a published package's public behavior changes
```

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/) written in Portuguese, subject line only (no body, no trailers such as `Co-Authored-By`), one concern per commit — e.g. `feat(cli): adiciona comando add`, `docs(spec): documenta regra de herança`.
- Code, specification, evals and documentation change together: if your change alters a decision, behavior, format or contract, update the corresponding page in `docs/` in the same PR.
- Tests accompany behavior changes; see [docs/development/testing.md](docs/development/testing.md).
- Format changes go through the JSON Schema, the Zod mirror, conformance fixtures and the specification docs together.

## Code conventions

- TypeScript, ESM, strict; explicit types on exports (`isolatedDeclarations`); imports with `.ts` extensions; no enums/namespaces (`erasableSyntaxOnly`).
- Biome formats and lints (`pnpm lint:fix`).
- Errors: throw `VernaculoError` with stable issue codes; never exit the process from library code.
- No network access, provider SDKs or `node:` imports where the architecture forbids them (enforced by tests).

## Persona packs

See [docs/development/contributing-personas.md](docs/development/contributing-personas.md).
Evidence, sources and license checks are required; review by speakers of the
variety is always recommended (never mandatory). Synthetic data belongs only in
`fixtures/`.

## License

Everything in the repository (code, docs, schemas and persona content) is
Apache-2.0. By contributing you license your contribution under Apache-2.0
(its section 5); no CLA is required. Whether to require a DCO sign-off is still an
open question.
