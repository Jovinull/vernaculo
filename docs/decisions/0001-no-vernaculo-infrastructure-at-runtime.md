# ADR-0001: No Vernáculo infrastructure at runtime

- Status: Accepted
- Date: 2026-09-29
- Origin: `ideia.txt`, "Zero custo para você de verdade" and the distribution model; bootstrap

## Context

Vernáculo is maintained as an open source project with an explicit constraint:
the maintainer's operating cost must stay essentially zero even with massive
adoption ("se amanhã houver 1 milhão de instalações, seu custo de inferência
continua R$ 0"). A hosted API, proxy or inference service would make cost grow
with usage, create a single point of failure and put the maintainer in the path
of users' data.

## Decision

> **An application that uses Vernáculo must not depend on Vernáculo infrastructure at runtime.**
>
> *Uma aplicação que utiliza Vernáculo nunca deve depender da infraestrutura do Vernáculo em runtime.*

Concretely, the core and every official package must work without:

- a Vernáculo API, backend, proxy or database;
- a Vernáculo account, key or authentication;
- tokens or inference paid or executed by the maintainer;
- mandatory telemetry;
- a proprietary registry or marketplace required at runtime.

Users run Vernáculo inside their own project or servers, with their own provider
account, API key, or local model. Personas are files the user owns: if the
Vernáculo repository disappeared, applications that already installed or ejected
a pack keep working unchanged.

Allowed maintainer-side services are those that cost nothing per use and are not
on the runtime path: GitHub (repository, Actions for CI, Releases), npm (and
possibly PyPI) for optional distribution, and optionally a static documentation
site on free hosting.

## Consequences

- Distribution is by copying files: npm, GitHub Releases and Git are optional channels, never runtime dependencies ([ADR-0008](0008-git-and-filesystem-no-database.md)).
- `vernaculo eject` must always be able to materialize a self-contained persona.
- The compiler must be local and deterministic ([ADR-0011](0011-deterministic-llm-free-compilation.md)).
- Evals run locally or in the user's CI with the user's credentials; there is no hosted eval service.
- Any future feature that needs a network service must be optional, off by default, and replaceable by a local alternative. Such a feature requires a new ADR.
- Enforcement: `packages/core/test/architecture.test.ts` fails if any package imports a network module, calls `fetch`, or depends on a provider SDK; `packages/compiler/test/compile.test.ts` runs the full pipeline with `fetch` disabled.

## Alternatives considered

- **Hosted "persona API" or MCP server run by the project** — rejected: cost scales with adoption, adds lock-in and privacy exposure.
- **Optional telemetry on by default** — rejected: violates the invariant and user trust.
- **Proprietary registry for packs** — rejected: Git, npm and GitHub Releases already provide free, mirrorable distribution.
