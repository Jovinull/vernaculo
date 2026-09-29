# Human review

Automated checks can prove structure; only people familiar with a variety can
judge whether output sounds natural, exaggerated or wrong. Review by speakers is
part of the methodology, not an optional extra.

Status: **process defined, not yet run** (no real pack exists). The record format
below is a proposal; it becomes a schema when the first review round happens.

## What reviewers see

Samples generated locally from a pack (by the reviewer coordinator, with their
own provider credentials or local models), covering:

- standard scenarios (customer service first: greeting, product question, price/financing question, complaint, closing);
- several intensities: 0 (control), the pack's default, ~0.7 and 1;
- more than one provider/model when possible (see [cross-provider.md](../evals/cross-provider.md));
- neutral controls mixed in, so reviewers are not primed to find regional features everywhere.

Reviewers also review the pack's own content directly: each form, its meaning,
context and examples.

## Labels

Reviewers tag a whole output or a specific form with one or more labels. The
reviewer-facing wording is in the variety's language; ids are stable.

| Id | Reviewer-facing (pt-BR) | Meaning |
| --- | --- | --- |
| `natural` | parece natural | plausible for a speaker of the variety in this situation |
| `authentic` | isso realmente usamos | the form is genuinely in use here (confirms a feature) |
| `exaggerated` | parece exagerado | too frequent or too marked for the situation/intensity |
| `unrecognized` | não reconheço essa expressão | reviewer does not know the form in this variety |
| `wrong-region` | isso é de outra região | the form belongs to a different variety |
| `caricatural` | parece caricato | sounds like a parody or stereotype |
| `offensive` | é ofensivo | offensive or demeaning |
| `register-mismatch` | formalidade inadequada | wrong formality for the situation |

Plus a free-text comment. How labels map to pack changes:

| Signal | Typical action |
| --- | --- |
| `authentic`, `natural` across reviewers | supports `evidence: reported` (cite the review round) |
| `exaggerated` | raise `minIntensity`, adjust examples, strengthen bands |
| `unrecognized`, `wrong-region` | re-check evidence; narrow scope; demote to `hypothesis` or remove |
| `caricatural`, `offensive` | remove/discourage; add an anti-pattern; treat as blocking |
| `register-mismatch` | add context (`contextual`), adjust examples |

## Reviewers

- People familiar with the variety (e.g. grew up or have long lived there). The profile of each reviewer is recorded coarsely, never identifying them.
- Several reviewers per pack; diversity in age and background within the variety where possible.
- Required numbers and agreement thresholds for `reviewed` maturity: **open question** ([open-questions.md](../roadmap/open-questions.md)).

## Privacy and consent

- Informed consent before participating; reviewers can withdraw.
- Public records use pseudonymous reviewer ids and coarse profile data only (familiarity, locality, optional age band). No names, contacts or free-text personal data in the repository.
- Reviews are contributions to an open project: the license of review records must be agreed with reviewers (tied to the pack content license open question).

## Proposed record shape (not yet normative)

```yaml
persona: pt-BR/ba/salvador
personaVersion: 0.3.0
instructionsFormat: vernaculo-instructions/v1alpha1
round: 2026-11-review-1
reviewer:
  id: r-017                    # pseudonymous
  familiarity: lifelong        # lifelong | long-term-resident | other
  locality: Salvador
items:
  - sample: s-042              # id of a generated sample kept with the round
    intensity: 0.3
    labels: [natural]
  - form: "..."                # a specific form from the pack
    labels: [exaggerated]
    comment: "..."
```

A review round is cited from the pack as a `speaker-review` source.

## Outcome

Maintainers may set `maturity: reviewed` only after a round meets the agreed
criteria and blocking labels (`caricatural`, `offensive`) are resolved. The review
record is merged together with that change.
