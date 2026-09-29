# Persona format (`vernaculo.dev/v1alpha1`)

Normative structure: [`schemas/v1alpha1/persona.schema.json`](../../schemas/v1alpha1/persona.schema.json).
This page explains the fields and specifies the semantic rules the schema cannot
express. Every object is closed: **unknown fields are errors** (this is what keeps
personality traits out of the format — see the `personality-traits-rejected`
conformance fixture).

## Example (synthetic)

```yaml
apiVersion: vernaculo.dev/v1alpha1
kind: Persona
extends: pt-BR/x-fixture              # optional, explicit parent
metadata:
  id: pt-BR/x-fixture/cidade-a
  name: Fixture — Cidade A
  description: Synthetic locality A.
  language: pt-BR                     # = first segment of id
  version: 0.1.0                      # semver of this persona
  maturity: fixture                   # fixture | draft | reviewed
  license: Apache-2.0                 # license of this persona's content
  region: { country: BR, subdivision: BA, locality: Synthetic locality }
regionality:
  defaultIntensity: 0.25
linguistics:
  vocabulary:
    preferred:   [{ term: termo-sintético-a, meaning: ..., evidence: synthetic }]
    contextual:  [{ term: ..., context: Only in informal closings., evidence: synthetic, minIntensity: 0.5 }]
    discouraged: [{ term: ..., reason: ... }]
  discourse:
    markers:     [{ form: ..., function: ..., evidence: synthetic }]
  morphosyntax:
    patterns:    [{ id: padrao-a, description: ..., example: ..., evidence: synthetic, minIntensity: 0.4 }]
  pragmatics:
    addressForms: [{ form: ..., usage: ..., evidence: synthetic }]
    greetings: [...]
    acknowledgements: [...]
    disagreements: [...]
    closings: [...]
  orthography:
    phoneticSpelling: avoid           # avoid (default) | allow
examples:
  - { id: saudacao, situation: ..., neutral: "Olá! Como posso ajudar?", text: ..., intensity: 0.25 }
antiPatterns:
  - { id: excesso, text: ..., category: overuse, explanation: ... }
provenance:
  sources:
    - { id: some-atlas, type: atlas, title: ..., url: https://..., license: ..., usage: consulted, accessed: "2026-09-29" }
  notes: ...
```

Real examples live in [`fixtures/personas`](../../fixtures/personas) (synthetic) and
[`schemas/conformance/v1alpha1/valid/complete.yaml`](../../schemas/conformance/v1alpha1/valid/complete.yaml).

## Fields

### Top level

| Field | Req. | Meaning |
| --- | --- | --- |
| `apiVersion` | yes | `vernaculo.dev/v1alpha1` |
| `kind` | yes | `Persona` |
| `metadata` | yes | identity, version, maturity |
| `extends` | no | parent persona id ([inheritance](inheritance-and-composition.md)) |
| `regionality.defaultIntensity` | lineage | intensity used when the caller does not choose one; required somewhere in the lineage |
| `linguistics` | no | the features |
| `examples` | no | positive examples |
| `antiPatterns` | no | negative examples |
| `provenance` | no | sources and notes |

### `metadata`

`id`, `name` (≤ 200), `language`, `version` (semver), `maturity` are required.
`description` (≤ 2000), `license` and `region` are optional and **not inherited**.
`region` (`country` ISO 3166-1 alpha-2, `subdivision` ISO 3166-2 code without
country prefix, `locality`, `note`) is informational only: it never drives
inheritance or selection.

### Features

Every rendered feature has `evidence` (required), and optionally `sources`
(≥ 1 source id), `notes` (for researchers; not sent to models) and `minIntensity`.

| List | Key | Specific fields | What it describes |
| --- | --- | --- | --- |
| `linguistics.vocabulary.preferred` | `term` | `meaning` | lexical items used where they fit |
| `linguistics.vocabulary.contextual` | `term` | `context` (req.), `meaning` | items used only in a stated context |
| `linguistics.vocabulary.discouraged` | `term` | `reason` (no `evidence`/`minIntensity`) | forms to avoid; always rendered |
| `linguistics.discourse.markers` | `form` | `function` (req.) | discourse markers and their function |
| `linguistics.morphosyntax.patterns` | `id` | `description` (req.), `example` | morphosyntactic constructions |
| `linguistics.pragmatics.addressForms` / `greetings` / `acknowledgements` / `disagreements` / `closings` | `form` | `usage` | forms of address and conversational conventions |
| `examples` | `id` | `situation`, `neutral`, `text` (req.), `intensity` | positive examples |
| `antiPatterns` | `id` | `text`, `category`, `explanation` (all req.) | outputs that must never be produced |
| `provenance.sources` | `id` | `type`, `title`, `usage` (req.); `url`, `citation`, `license`, `accessed` | where evidence comes from |

`evidence`: `attested` | `reported` | `hypothesis` | `synthetic` — see [provenance.md](provenance.md).
Anti-pattern `category`: `caricature`, `stereotype`, `overuse`, `phonetic-spelling`,
`invented-regionalism`, `wrong-region`, `register-mismatch`, `other`.

**Surface forms.** Items of `preferred`, `contextual`, `markers` and the five
pragmatics lists are *used* surface forms; `discouraged` items are *avoided*
surface forms. Keys compare after Unicode NFC normalization and lowercasing
(`Termo` = `termo`).

## Semantic rules

Document-level (checked on each document):

| Code | Rule |
| --- | --- |
| `language-mismatch` | `metadata.language` MUST equal the first segment of `metadata.id`. |
| `duplicate-key` | Keys MUST be unique within each list. |
| `conflicting-forms` | Within one document, a form MUST NOT be both used (any used-form list) and discouraged. |
| `evidence-without-source` | `attested` and `reported` features MUST cite at least one source. |

Lineage and resolved-level (checked during resolution):

| Code | Rule |
| --- | --- |
| `invalid-id` | Every id used (requested or in `extends`) MUST match the id syntax. |
| `persona-not-found` / `parent-not-found` | The requested persona and every parent MUST exist in the roots. |
| `id-mismatch` | A document stored for id `I` MUST declare `metadata.id: I`. |
| `inheritance-cycle` | A lineage MUST NOT contain a cycle (including self-extension). |
| `inheritance-too-deep` | A lineage MUST NOT exceed 32 documents. |
| `lineage-language-mismatch` | All documents of a lineage MUST share `metadata.language`. |
| `unknown-source` | Every source reference MUST resolve to a source of the flattened persona. |
| `synthetic-outside-fixture` | `synthetic` evidence is allowed only when the effective maturity is `fixture`. |
| `missing-default-intensity` | The flattened persona MUST define `regionality.defaultIntensity`. |

## History of the format (from the founding conversation)

Two drafts preceded `v1alpha1`:

1. `apiVersion: regionalpersona.dev/v1`, `kind: RegionalPersona`, id `br.ba.salvador`, snake_case (`default_intensity`, `discourse_markers`, `phonetic_spelling`), with `scope.register`, a `style` block (`rhythm`, `verbosity`, `regional_marker_frequency`), boolean `constraints` and `review.native_review_required`.
2. `apiVersion: vernaculo.dev/v1`, `kind: Persona`, id `pt-BR/ba/salvador`, camelCase, `regionality.defaultIntensity`, `linguistics.{vocabulary, discourse.markers, morphosyntax.patterns, pragmatics}`, boolean `constraints` (`avoidCaricature`, `avoidStereotypes`, `preserveParentRole`, `preserveTaskAccuracy`) and `provenance.sources`.

`v1alpha1` is based on draft 2, with these bootstrap decisions:

| Draft element | In v1alpha1 | Reason |
| --- | --- | --- |
| `vernaculo.dev/v1` | `vernaculo.dev/v1alpha1` | honest maturity; no real pack has exercised the format |
| `country`/`state`/`locality` in metadata | `metadata.region.{country, subdivision, locality, note}` | informational, not identity |
| boolean `constraints` | removed; the invariants are normative and always rendered | a pack must not be able to switch off anti-caricature rules |
| `override:` block | removed; same fields merge by normative rules | one shape for all documents ([inheritance](inheritance-and-composition.md)) |
| `review.native_review_required` | `metadata.maturity` + human-review process | review status must be visible and ordered |
| `examples` with `neutral`/`regionalized` (draft 1) | `examples` with `neutral`/`text`, plus `antiPatterns` | positive and negative examples |
| `orthography.phonetic_spelling: avoid` (draft 1) | `linguistics.orthography.phoneticSpelling` | kept |
| draft 1 `disagreement_patterns` | `pragmatics.disagreements` | kept |
| draft 1 `style` (rhythm, verbosity, marker frequency) | not adopted | marker frequency is intensity; rhythm/verbosity need evidence-based modeling ([open questions](../roadmap/open-questions.md)) |
| draft 1 `scope.register` | not adopted | register modeling is an open question |
| per-feature `evidence`, `sources`, `minIntensity` | new | evidence vs hypothesis separation; intensity gating |
