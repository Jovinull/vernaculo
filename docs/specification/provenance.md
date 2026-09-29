# Provenance, evidence, maturity and content licensing

Credibility is a core requirement: every claim a pack makes about a variety must
be traceable, and the pack's overall status must be visible to users and models.

## Evidence (per feature)

| Value | Meaning | Rendered? | Requirement |
| --- | --- | --- | --- |
| `attested` | documented in cited sources (atlases, corpora, studies, reference works) | yes | ≥ 1 source |
| `reported` | reported by speakers or reviewers (review rounds are cited as `speaker-review` sources) | yes | ≥ 1 source |
| `hypothesis` | plausible but unconfirmed; kept for research | **never** | — |
| `synthetic` | invented test data | yes, but only in `fixture` personas | effective maturity `fixture` |

This separation is how the project keeps evidence and hypothesis apart and
enforces "never invent regionalisms": an unconfirmed form can be recorded without
ever reaching a model.

## Sources

`provenance.sources[]` entries have an `id` referenced by features, examples and
discouraged items, plus:

- `type`: `atlas`, `corpus`, `study`, `reference-work`, `speaker-review`, `other`;
- `title`, optional `citation`, `url`, `accessed` (YYYY-MM-DD, quoted);
- `license`: the source's license as understood when consulted;
- `usage`: what the pack does with the source:

| `usage` | Meaning | License requirement |
| --- | --- | --- |
| `consulted` | read to inform research; nothing copied | access terms respected |
| `cited` | referenced or briefly quoted with attribution | citation/quotation allowed |
| `redistributed` | material copied into the pack | license MUST permit redistribution under the pack's license |

Sources are inherited through the lineage (merged by `id`). A reference to a
source that does not exist in the flattened persona is an error (`unknown-source`).

Known research sources and their verified licenses: [linguistic/sources.md](../linguistic/sources.md).

## Maturity (per persona)

| Level | Meaning | Who may set it |
| --- | --- | --- |
| `fixture` | synthetic data for tests and demos; **not linguistic content** | anyone, for tests |
| `draft` | under research; not reviewed by speakers | pack authors |
| `reviewed` | a human review by speakers of the variety actually took place and is documented ([human-review.md](../linguistic/human-review.md)) | pack authors/maintainers, when that is true; cite the round as a `speaker-review` source (recommended) |

- The **effective maturity** of a persona is the least mature level in its lineage; a `reviewed` persona extending a `draft` one is effectively `draft`.
- Renderers MUST surface non-`reviewed` maturity in their output (the reference compiler adds a notice; the CLI also warns on stderr).
- There is intentionally **no `validated` level**: the project has no validation process that would justify the word. Adding a level (e.g. "evaluated", tied to eval results) requires specification and methodology changes.
- **Human review is always recommended, never mandatory** ([ADR-0015](../decisions/0015-human-review-recommended-not-mandatory.md)): there is no minimum number of reviewers or agreement threshold, and `draft` packs may be published and used. Tooling recommends review for every `draft` persona. `reviewed` is an honest statement that a review happened, not a quality threshold.

## Licensing of persona content

- `metadata.license` declares the license of *this persona's own content* (SPDX expression recommended). It is not inherited: a derived persona declares its own, and the lineage's licenses remain visible (lineage metadata, ejected file headers, skill `sources.md`).
- The repository's code license (Apache-2.0) does not by itself license third-party material ([ADR-0012](../decisions/0012-apache-2-0-code-license.md)).
- The official library's content is licensed under **Apache-2.0**, like the code: every persona in `personas/` declares `metadata.license: Apache-2.0` (enforced by a test). See [ADR-0014](../decisions/0014-apache-2-0-persona-content.md).
