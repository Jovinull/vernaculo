# Regional persona packs

A **regional persona pack** (the conversation also used "Regional Style Pack") is
a persona describing one language variety, published in the library under
[`personas/`](../../personas/). The name "persona" is kept for continuity; a pack
never describes a personality ([ADR-0010](../decisions/0010-observable-sociolinguistic-features-only.md)).

## Initial set (direction for v0.1)

Quality over coverage: four excellent packs rather than 27 states.

| Id | Variety | Status |
| --- | --- | --- |
| `pt-BR/ba/salvador` | Salvador (BA) | not started — research pending |
| `pt-BR/se/aracaju` | Aracaju (SE) | not started — research pending |
| `pt-BR/pe/recife` | Recife (PE) | not started — research pending |
| `pt-BR/sp/sao-paulo` | São Paulo (SP) | not started — research pending |

Each will ship with configurable intensity, sources, positive and negative
examples, automated checks and evals, under Apache-2.0
([ADR-0014](../decisions/0014-apache-2-0-persona-content.md)). Human review by
speakers is recommended for each of them (never mandatory,
[ADR-0015](../decisions/0015-human-review-recommended-not-mandatory.md)); a pack is
marked `reviewed` only once a review has actually taken place.

Whether these four share a `pt-BR` base persona, and what such a base could
legitimately contain, is an [open question](../roadmap/open-questions.md) (the
conversation's layout had a `personas/pt-BR/base/` directory).

## Layout

v1alpha1 pack source:

```text
personas/pt-BR/ba/salvador/
└── persona.yaml          # the whole pack: features, examples, anti-patterns, provenance
```

Proposed in the conversation and **not adopted yet** (open question: multi-file packs):

```text
pt-BR/ba/salvador/
├── persona.yaml
├── SKILL.md                          # generated in v1alpha1 (vernaculo export), not authored
├── knowledge/{vocabulary,discourse,pragmatics,grammar}.yaml
├── examples/{customer-service,casual,professional}.yaml
├── evals/{naturalness,regionality,stereotypes}.yaml
└── SOURCES.md
```

When per-pack evals and review records exist, they will live next to
`persona.yaml`; the specification will be extended first.

## Granularity and future varieties

Ids allow progressive granularity (`pt-BR` → `pt-BR/ba` → `pt-BR/ba/salvador`)
and non-administrative varieties, but only with evidence
([methodology.md](methodology.md#granularity)). Ideas mentioned in the conversation,
none of which is planned work yet:

- Brazil: `pt-BR/ba/reconcavo`, `pt-BR/ba/sul`, `pt-BR/se/interior`;
- other languages: `pt-PT/lisboa`, `es-AR/buenos-aires`, `es-MX/cdmx`, `en-US/ny/new-york`, `en-US/tx`, `en-GB/london`;
- registers as sub-personas: `pt-BR/ba/salvador/customer-service`, `.../casual`, `.../formal` (open question).

## Fixtures are not packs

[`fixtures/personas`](../../fixtures/personas) holds synthetic personas
(`maturity: fixture`, `evidence: synthetic`) under `pt-BR/x-fixture/...`. Their
"regional" forms are invented placeholders such as `termo-sintético-a`. They exist
to test and demonstrate tooling and must never be presented or copied as
linguistic content.

## Contributing a pack

See [development/contributing-personas.md](../development/contributing-personas.md)
and the `linguistic-research` project skill.
