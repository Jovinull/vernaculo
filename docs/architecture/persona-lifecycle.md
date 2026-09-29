# Persona lifecycle

From research to a user's agent. Everything is files in Git, reviewed through
pull requests and checked in CI — the same discipline OpenAI now recommends for
production prompts (see [external facts](../reference/external-facts.md)).

```text
research ─► persona.yaml (draft) ─► PR ─► CI (schema, semantics, tests) ─► human review ─► evals ─► release x.y.z
                                                                                                       │
             user: add / copy / npm ─► extends in own repo (optional) ─► compile / export / eject ◄───┘
```

## 1. Research

Collect evidence for each feature from sources whose license allows the intended
use ([methodology.md](../linguistic/methodology.md), [sources.md](../linguistic/sources.md)).
Unconfirmed ideas are recorded as `evidence: hypothesis` — kept for research,
never rendered.

## 2. Authoring (`maturity: draft`)

Write `personas/<id>/persona.yaml` following the
[format](../specification/persona-format.md) and the
[contributing guide](../development/contributing-personas.md): features with
evidence and sources, positive examples, anti-patterns, provenance with usage
levels, a sensible `defaultIntensity`.

## 3. Automated checks (CI)

`pnpm check` runs lint, typecheck, tests, build, and `vernaculo validate` over all
persona roots: structure, semantic rules, lineage resolution.

## 4. Human review (recommended, not mandatory)

Speakers of the variety review compiled outputs at several intensities using the
label set in [human-review.md](../linguistic/human-review.md). Findings change the
pack (remove, re-scope, lower `minIntensity`, add anti-patterns). There is no
mandatory criterion ([ADR-0015](../decisions/0015-human-review-recommended-not-mandatory.md)):
a pack may be released as `draft`, and becomes `reviewed` once a review has actually
taken place and is documented. Tooling keeps recommending review for drafts.

## 5. Evals

Local, reproducible evals run with the evaluator's own provider credentials or
local models ([evals/strategy.md](../evals/strategy.md)). Results are recorded
with the pack version.

## 6. Release

Semantic versioning in `metadata.version`:

- **patch** — corrections that do not change which features render (typos, notes, sources);
- **minor** — new features, examples, anti-patterns, or evidence changes that alter rendering;
- **major** — removals, re-scoping, id changes or changes that alter the character of the output.

Package releases (npm, GitHub Releases) are manual ([releasing.md](../development/releasing.md)).

## 7. Consumption

Users copy or install packs, optionally derive their own persona with `extends`,
then compile, export or eject ([distribution.md](distribution.md)). They pick
the intensity for their product.

## 8. Feedback loop

Feedback from users and reviewers ("exaggerated", "not from here", "we really say
this") flows back as issues and review records — the dataset the conversation
identified as one of the project's most valuable outcomes.
