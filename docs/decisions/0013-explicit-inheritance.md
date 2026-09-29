# ADR-0013: Explicit `extends` inheritance; ids never imply inheritance

- Status: Accepted
- Date: 2026-09-29
- Origin: bootstrap (derived from `ideia.txt`: `extends: pt-BR/ba/salvador`, the granularity discussion and the ALiB argument)

## Context

Persona ids are hierarchical (`pt-BR/ba/salvador`). A tempting shortcut is to make
`pt-BR/ba/salvador` automatically inherit from `pt-BR/ba` and `pt-BR`. But
administrative containment is not linguistic inheritance: a city variety may
share features with a neighboring state's variety and not with its own state's
interior; a "state pack" may not exist at all because the state is not a
linguistic unit.

## Decision

- Ids are **names**: `<BCP 47 language tag>/<slug>/<slug>...`, slugs being lowercase ASCII (`a-z0-9` and single hyphens). They carry no inheritance meaning.
- Inheritance is **explicit** and **single-parent**: `extends: <persona id>`. Multiple inheritance is not supported in v1alpha1.
- A lineage has a single language; cycles and lineages deeper than 32 are errors.
- Merge semantics are normative and documented in [inheritance-and-composition.md](../specification/inheritance-and-composition.md), including lineage-ordered cancellation between discouraged and used forms.
- Slugs are ASCII for filesystem and URL portability (the conversation already used `sao-paulo`); display names with diacritics go in `metadata.name` (e.g. `reconcavo` / "Recôncavo").

## Consequences

- A company persona file (`acme-salvador.yaml`) extends a library persona without living inside the library.
- Private or non-geographic segments conventionally start with `x-` (e.g. `pt-BR/x-fixture`, `pt-BR/x-acme/...`), mirroring BCP 47's private-use convention.

## Alternatives considered

- **Implicit path inheritance** — rejected (see context).
- **Multiple `extends`** — deferred: merge conflicts between unrelated parents need a clear use case first.
