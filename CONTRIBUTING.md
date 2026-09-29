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
Evidence, sources, licenses and human review are required; synthetic data belongs
only in `fixtures/`.

## License

By contributing you agree that your contribution is licensed under Apache-2.0
(contribution terms such as DCO/CLA are still an open question).
