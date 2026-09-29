# Regional intensity

Intensity is a first-class concept: how strongly the regional layer marks the
output, from neutral language to strongly marked.

```text
0.0 ──────────────────────────────── 1.0
neutral language                 strongly marked variety
```

## Contract (normative)

- Intensity is a JSON number in **[0, 1]**. Values outside the range, non-numbers, `NaN` and infinities are errors (`invalid-intensity`). Implementations MUST NOT clamp silently.
- The intensity used for a compilation is the caller's choice, or else the flattened persona's `regionality.defaultIntensity`.
- **Selection rules** (applied once, in the IR):
  1. At intensity **0**, no used-form feature and no example is rendered: the output is neutral language plus restrictions.
  2. Features with `evidence: hypothesis` are **never** rendered, at any intensity.
  3. A feature is rendered when intensity > 0 and its `minIntensity` (default 0) ≤ intensity.
  4. An example is rendered when intensity > 0 and its `intensity` (default 0) ≤ intensity.
  5. Discouraged forms and anti-patterns are **always** rendered.
- Every rendering MUST convey the selected intensity to the model and MUST keep the anti-caricature ground rules at every intensity. **High intensity never relaxes naturalness or anti-caricature rules.**

## What intensity is not

Intensity is **not a multiplier of slang** ("more *oxente*"). The conversation was
explicit: raising intensity should adjust, in a linguistically grounded way, the
frequency and markedness of:

- lexicon and regionalisms,
- discourse markers,
- forms of address,
- pragmatic conventions,
- syntactic constructions,
- register choices and textual rhythm.

In v1alpha1 this is expressed through two mechanisms only:

1. **Gating by markedness** — authors set `minIntensity` on more marked features, based on evidence, so they appear only at higher intensities.
2. **Qualitative guidance** — the compiler tells the model how sparingly to use the selected features (see the provisional bands in [compilation.md](../architecture/compilation.md#intensity-wording-non-normative-provisional)).

No mathematical formula (e.g. "features per sentence = k × intensity") is part of
the specification. Such calibration must come from eval evidence first — see
[open questions](../roadmap/open-questions.md).

## Guidance for choosing an intensity

From the founding conversation (provisional, to be checked by evals):

| Use | Range |
| --- | --- |
| Commercial customer service | 0.15–0.35 |
| Game characters | 0.40–0.70 |
| Linguistic experiments | 0.80+ |

The conversation's first sketch used labels (*leve / moderada / forte*); the
numeric scale superseded them. Labels survive only as non-normative wording
bands in the compiler.

## Guidance for pack authors

- Set `defaultIntensity` for the most common intended use of the pack (usually subtle).
- Leave `minIntensity` unset (0) for features that are unmarked or broadly shared in the variety; raise it for features speakers perceive as strongly marked. Record the evidence for that perception.
- Give examples an `intensity` so each one illustrates the level it belongs to.
- Review outputs at several intensities (e.g. 0, default, 0.7, 1) with speakers; "exaggerated" at 1 is still a defect.
