# ADR-0008: Git and the filesystem instead of a database, registry or marketplace

- Status: Accepted
- Date: 2026-09-29
- Origin: `ideia.txt` ("Eu não colocaria banco de dados", "Não precisa de marketplace. Não precisa de registry próprio.")

## Context

Personas are small, human-reviewed, versioned documents. Their history, review
and release process map naturally onto Git (commits, pull requests, CI, tags).
A database or a proprietary registry would add infrastructure, cost and lock-in
([ADR-0001](0001-no-vernaculo-infrastructure-at-runtime.md)).

## Decision

- **No database** (PostgreSQL, SQLite, Redis, MongoDB, ...) anywhere in Vernáculo. The "database" is **Git + filesystem**.
- A **persona root** is a directory where each persona lives at `<root>/<persona id>/persona.yaml`. Tools search one or more roots in order; the first root that contains an id wins.
- **Distribution channels are optional conveniences**, all mirrorable and free: GitHub (clone), GitHub Releases, npm (and possibly PyPI later), or plain copy (`curl`, file copy). None is required at runtime.
- `vernaculo eject` materializes a self-contained persona (flattened `persona.yaml` + compiled `instructions.md`) inside the user's project, removing any dependency on Vernáculo packages.
- There is no proprietary marketplace. A community catalog, if it ever exists, is data in a Git repository.

## Consequences

- Versioning of packs uses semver in `metadata.version` plus Git history; releases go through PR → CI → evals → tag.
- How the public catalog is delivered to `vernaculo add/search/update` (bundled data, an npm package such as `@vernaculo/personas`, release tarballs or Git) is an [open question](../roadmap/open-questions.md).

## Alternatives considered

- **SQLite catalog** — rejected: binary, hard to review, unnecessary at this scale.
- **Hosted registry API** — rejected: runtime/infrastructure cost and lock-in.
