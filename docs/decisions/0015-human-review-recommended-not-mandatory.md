# ADR-0015: Human review is always recommended, never mandatory

- Status: Accepted
- Date: 2026-09-29
- Origin: maintainer decision ("sem critério de revisão obrigatório, mas sugerir sempre que seja revisado"), resolving the open question on criteria for `reviewed` maturity

## Context

The methodology values review by speakers of each variety, and the bootstrap left
open which criteria (number of reviewers, agreement thresholds, blocking labels)
would be required before a pack could be marked `reviewed`. Mandatory criteria
would turn review into a gate that a small open source project may not be able to
staff, blocking useful packs; no criteria at all would risk packs being presented
as more trustworthy than they are.

## Decision

- **No mandatory review criteria.** There is no minimum number of reviewers, no
  agreement threshold and no review gate for merging, publishing or using a pack.
  Packs may be published and used as `draft`.
- **Review is always recommended.** Documentation and tooling recommend human
  review by speakers of the variety whenever a persona is not `reviewed`:
  - the CLI prints a recommendation with `compile`, `export` and `eject` of a
    `draft` persona, `inspect` shows a "human review" line, and `validate`
    summarizes how many draft personas would benefit from review;
  - the compiled layer keeps its `DRAFT` notice;
  - docs and contribution guides present review as the recommended next step.
- **`reviewed` stays an honest statement**: it means a human review by speakers of
  the variety actually took place and is documented (recommended: cite the round as
  a `speaker-review` source in `provenance.sources` and keep its record next to the
  pack). How extensive the review was is visible in that record, not encoded in a
  threshold.
- Unchanged invariants: maturity is always visible in outputs; nothing is called
  validated, natural, representative or stereotype-free without evidence
  ([ADR-0010](0010-observable-sociolinguistic-features-only.md)); content that
  anyone (reviewer or not) identifies as caricatural or offensive is handled under
  the anti-caricature policy — removed, discouraged or turned into an anti-pattern
  — regardless of maturity.

## Consequences

- The methodology's review process ([human-review.md](../linguistic/human-review.md))
  is guidance: labels, reviewer profiles, privacy and record shape are
  recommendations for doing review well.
- Users choose how much review they need for their product; the maturity level and
  the review record give them the information to decide.
- A future, stronger level (e.g. "evaluated", tied to eval results) would need a new
  ADR and specification change; it would also be informative, not a gate.

## Alternatives considered

- **Fixed criteria for `reviewed`** (e.g. ≥ N reviewers, agreement ≥ X) — rejected by the maintainer: a gate the project may not be able to staff.
- **No maturity levels at all** — rejected: users and models must see whether content was reviewed.
