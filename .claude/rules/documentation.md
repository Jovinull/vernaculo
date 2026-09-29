# Documentation rules

No important decision may survive only in the conversation. Code, specification,
evals and docs change in the same task.

## Which document to update

| Change | Update |
| --- | --- |
| New/changed architectural decision or invariant | new ADR in `docs/decisions/` (supersede, don't rewrite, accepted ADRs) + `docs/decisions/README.md` index + affected architecture page |
| Persona format, semantic rule, issue code, id rule | `docs/specification/*` + `schemas/` + conformance fixtures (see `.claude/rules/schema.md`) |
| Intensity semantics or compiler wording/bands | `docs/specification/regional-intensity.md`, `docs/architecture/compilation.md`, golden files |
| Inheritance / merge behavior | `docs/specification/inheritance-and-composition.md` + resolution conformance case |
| Package public API | `docs/architecture/packages.md` (+ changeset) |
| CLI command/option/exit code | `docs/reference/cli.md` |
| New adapter or target | `docs/architecture/provider-adapters.md`, `compilation.md` (targets table), ADR if structural |
| Distribution, `add`/`eject` behavior | `docs/architecture/distribution.md` |
| Pack structure or methodology | `docs/linguistic/*`, `docs/development/contributing-personas.md` |
| Eval method or dimension | `docs/evals/*` |
| Research conclusion, new source, license finding | `docs/linguistic/sources.md` (+ `docs/reference/external-facts.md` if time-sensitive) |
| Dependency/stack/tooling change | `docs/development/stack.md` |
| Important limitation discovered | the relevant page + `docs/roadmap/open-questions.md` if unresolved |
| Status change of any planned item | `docs/roadmap/roadmap.md` (+ `docs/product/scope.md`, `README.md` tables) |
| Open question resolved | remove from `docs/roadmap/open-questions.md`; record the answer (ADR or doc) |

If no document fits, create one in the right `docs/` section and link it from
`docs/README.md`. Do not dump durable knowledge into progress notes or chat.

## Writing rules

- Describe the current state; Git holds history. Mark status honestly (done / planned / idea / open).
- Never present planned work as existing, or a pack as validated without evidence.
- External facts get a source URL and verification date.
- One topic per page; link instead of duplicating. Keep `CLAUDE.md` short.
- `docs/reference/idea-assimilation.md` is a bootstrap snapshot: only correct mapping errors there.
