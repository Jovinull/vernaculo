# Eval dimensions

What every pack (and every adapter) is evaluated on. For each dimension: the
question, how it can be measured, and what already exists. The conversation's
original table is the core of this list (regional fidelity, naturalness, task
fidelity, stereotype leakage, overuse, cross-model stability); the rest make the
project's invariants testable.

## Naturalness

- **Question:** does it read like someone speaking normally in that variety, or like a caricature?
- **Measured by:** human labels `natural` / `exaggerated` / `caricatural`; model judges only as a pre-screen.
- **Failure looks like:** every sentence carries a marker; forms used in wrong contexts; theatrical tone.

## Regional fidelity

- **Question:** are the features used compatible with that variety?
- **Measured by:** human labels `authentic` / `unrecognized` / `wrong-region`; rule checks that only listed forms appear among regionally marked forms.
- **Failure looks like:** forms from other regions; generic "Northeastern" slang in a Salvador pack.

## Task preservation

- **Question:** did regionalization harm the service (accuracy, completeness, clarity)?
- **Measured by:** the same scenario with and without the layer; task-specific assertions (the answer contains the required information); judge rubrics.
- **Failure looks like:** vaguer answers, missing facts, misunderstandable phrasing.

## Parent-rule preservation

- **Question:** does the agent still obey the host's role, policies and business rules?
- **Measured by:** scenarios where rules matter (no unauthorized discounts, escalation rules); assertions on outputs.
- **Failure looks like:** the "friendly local" tone overriding policy.

## Overuse

- **Question:** is regionalism stuffed into every sentence?
- **Measured by:** density of pack forms per reply vs. intensity; human `exaggerated` labels.
- **Failure looks like:** the conversation's "enfiando regionalismo em toda frase".

## Caricature

- **Question:** does it sound like a parody?
- **Measured by:** human `caricatural` / `offensive` labels (blocking); anti-pattern similarity checks.

## Stereotype leakage

- **Question:** did the model start inventing cultural, behavioral or psychological traits — or claim to be from the region?
- **Measured by:** adversarial scenarios ("tell me a joke about...", "where are you from?", "are people there lazy?"); rule checks for origin claims; judge rubrics; human review.
- **Deterministic part (done):** the format has no field for traits; every rendering carries ground rules 3–4 ([anti-caricature.md](../linguistic/anti-caricature.md)); tests assert the rules are present at every intensity.

## Invented regionalisms

- **Question:** does the model produce "regional" forms that are not in the pack and not real?
- **Measured by:** extract marked forms from outputs, compare with the pack; human `unrecognized` labels.
- **Deterministic part (done):** hypotheses are never rendered; only listed forms are instructed.

## Intensity behavior

- **Question:** does output marking grow monotonically and sensibly with intensity, and is intensity 0 neutral?
- **Measured by:** the same scenarios at 0 / default / ~0.7 / 1; density of forms; human labels per level (`exaggerated` at high intensity is still a defect).
- **Deterministic part (done):** gating rules, intensity-0 neutrality and bounds are unit-tested; golden files per intensity.

## Cross-provider consistency

See [cross-provider.md](cross-provider.md).

## Summary

| Dimension | Deterministic (now) | Model-based (planned) | Human (planned) |
| --- | --- | --- | --- |
| Naturalness | — | pre-screen | primary |
| Regional fidelity | listed forms only | form extraction | primary |
| Task preservation | ground rule present | primary | spot checks |
| Parent-rule preservation | ground rule present | primary | spot checks |
| Overuse | intensity bands rendered | density | `exaggerated` |
| Caricature | anti-patterns rendered | similarity | primary, blocking |
| Stereotype leakage | no trait fields; ground rules | adversarial | primary |
| Invented regionalisms | hypotheses never rendered | form extraction | `unrecognized` |
| Intensity behavior | gating tests, golden files | density curves | per-level labels |
| Cross-provider | provider-neutral output | primary | comparison |
