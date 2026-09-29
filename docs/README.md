# Vernáculo documentation

This directory is the **source of truth** for the project: product, architecture,
specification, linguistic methodology, evals, development process and decisions.
Code, specification, evals and documentation evolve together — when one changes a
decision, behavior, format or contract, the corresponding document changes in the
same commit. Git keeps the history; these pages describe the current state.

`ideia.txt` (repository root) is the founding conversation, kept as a historical
record. Its content has been assimilated here; see
[reference/idea-assimilation.md](reference/idea-assimilation.md).

## Start here

| If you want to... | Read |
| --- | --- |
| understand what Vernáculo is and is not | [product/vision.md](product/vision.md) |
| know the rules that are never broken | [product/principles.md](product/principles.md) |
| see how the pieces fit | [architecture/overview.md](architecture/overview.md) |
| write or read a persona file | [specification/persona-format.md](specification/persona-format.md) |
| contribute a regional pack | [development/contributing-personas.md](development/contributing-personas.md) |
| know why something was decided | [decisions/](decisions/README.md) |
| know what is done and what is next | [roadmap/roadmap.md](roadmap/roadmap.md), [roadmap/open-questions.md](roadmap/open-questions.md) |

## Map

**Product** — [vision](product/vision.md) · [principles](product/principles.md) ·
[use cases](product/use-cases.md) · [scope](product/scope.md)

**Architecture** — [overview](architecture/overview.md) ·
[packages](architecture/packages.md) · [compilation (IR, compiler, targets)](architecture/compilation.md) ·
[provider adapters](architecture/provider-adapters.md) ·
[distribution and eject](architecture/distribution.md) ·
[zero infrastructure](architecture/zero-infrastructure.md) ·
[persona lifecycle](architecture/persona-lifecycle.md)

**Specification** (`vernaculo.dev/v1alpha1`) — [overview, ids, conformance](specification/overview.md) ·
[persona format and semantic rules](specification/persona-format.md) ·
[inheritance and composition](specification/inheritance-and-composition.md) ·
[regional intensity](specification/regional-intensity.md) ·
[provenance, evidence, maturity](specification/provenance.md)

**Linguistics** — [methodology](linguistic/methodology.md) ·
[regional packs](linguistic/regional-packs.md) ·
[anti-caricature policy](linguistic/anti-caricature.md) ·
[human review](linguistic/human-review.md) · [research sources](linguistic/sources.md)

**Evals** — [strategy](evals/strategy.md) · [dimensions](evals/dimensions.md)
(naturalness, regional fidelity, task and rule preservation, overuse, caricature,
stereotype leakage, invented regionalisms, intensity) ·
[cross-provider](evals/cross-provider.md)

**Development** — [stack](development/stack.md) ·
[repository structure](development/repository-structure.md) ·
[testing](development/testing.md) ·
[contributing personas](development/contributing-personas.md) ·
[releasing](development/releasing.md)

**Decisions** — [ADR index](decisions/README.md)

**Roadmap** — [roadmap](roadmap/roadmap.md) · [open questions](roadmap/open-questions.md)

**Reference** — [CLI](reference/cli.md) · [glossary](reference/glossary.md) ·
[external facts (dated)](reference/external-facts.md) ·
[assimilation of ideia.txt](reference/idea-assimilation.md)

## Conventions

- Documentation is in English; reviewer-facing material for a variety uses its language.
- One topic per page; link instead of duplicating. The eval dimensions share one page instead of one file each, to avoid fragmentation.
- Mark status honestly: *done*, *planned*, *idea*, *open question*. Never present planned work as existing, or a pack as validated without evidence.
- Time-sensitive external facts go to [reference/external-facts.md](reference/external-facts.md) with a verification date.
- Structural decisions get an ADR ([decisions/README.md](decisions/README.md)).
