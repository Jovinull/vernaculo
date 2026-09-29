# ADR-0014: Apache-2.0 for persona content — one open license for the whole repository

- Status: Accepted
- Date: 2026-09-29
- Origin: maintainer decision ("a licença do projeto é para ser open"), resolving the pack-content license open question left by [ADR-0012](0012-apache-2-0-code-license.md)

## Context

ADR-0012 licensed the code under Apache-2.0 and left open which license the
persona packs' own content would use. The maintainer asked for an open license
and for the best option to be applied now. Packs are YAML data plus short texts
(meanings, examples, anti-patterns) that users copy, extend, eject and compile
into prompts of commercial agents; exported skills are copied into other
repositories.

## Decision

- The content of every persona in the official library (`personas/`), and every
  other non-code file of this repository (documentation, schemas, conformance
  fixtures, review records), is licensed under **Apache-2.0**, the same license as
  the code. The repository has a single license: `LICENSE`.
- Every library persona declares `metadata.license: Apache-2.0` (enforced by
  `packages/core/test/architecture.test.ts`).
- Contributions are accepted under Apache-2.0 (its section 5: contributions are
  submitted under the license's terms unless stated otherwise).
- Third-party material is unaffected ([ADR-0012](0012-apache-2-0-code-license.md)):
  it keeps its own license and is consulted or cited; it is redistributed in a
  pack only when its license allows redistribution under Apache-2.0-compatible
  terms.
- Personas outside the library (a company's own derived persona) may use any
  license; `metadata.license` is not inherited and the lineage keeps each
  ancestor's license visible (lineage metadata, ejected file headers and README,
  skill `sources.md`).

## Consequences

- Users can use, modify, eject and embed packs commercially without asking
  permission. If they redistribute the files (e.g. publish an ejected persona or an
  exported skill), they keep the license notice and mark their changes — the usual
  Apache-2.0 obligations. Using compiled instructions inside one's own agent
  requires nothing extra.
- One license means no compatibility analysis between code and data inside the
  repository, one SPDX id everywhere, and the same terms for contributors.
- Human review records are contributed under Apache-2.0 too; reviewers are told so
  when they consent ([human-review.md](../linguistic/human-review.md)).

## Alternatives considered

| License | Why not chosen |
| --- | --- |
| **CC-BY-4.0** (common for research data) | attribution duties on "sharing" are ambiguous for text compiled into prompts and exported skills; a second license to reason about next to Apache-2.0 code |
| **CC0-1.0** (public domain dedication) | maximal freedom, but loses the notice/attribution chain that keeps provenance visible, and moral-rights waivers are limited in some jurisdictions (e.g. Brazil), so CC0 falls back to a license anyway |
| **CDLA-Permissive-2.0** (data license) | permissive and data-oriented, but little known; adds a second license for no practical gain over Apache-2.0 |
| **Copyleft (CC-BY-SA, GPL, ODbL)** | share-alike conflicts with embedding packs in commercial agents ([ADR-0012](0012-apache-2-0-code-license.md)) |
