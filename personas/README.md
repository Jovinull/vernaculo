# Persona library

This directory is the public library of **regional persona packs**. It is a
persona root: each pack lives at `personas/<persona id>/persona.yaml`.

**There are no packs yet.** The first four are planned and their research has not
started:

| Id | Status |
| --- | --- |
| `pt-BR/ba/salvador` | not started |
| `pt-BR/se/aracaju` | not started |
| `pt-BR/pe/recife` | not started |
| `pt-BR/sp/sao-paulo` | not started |

A pack is added here only with real research: evidence and sources for every
feature, source licenses checked, positive and negative examples. Packs start as
`maturity: draft`; human review by speakers of the variety is always recommended
(never mandatory) and a pack becomes `reviewed` once such a review has actually
taken place.

License: every pack here is **Apache-2.0** (`metadata.license: Apache-2.0`), like
the rest of the repository.

- How packs are built: [docs/linguistic/methodology.md](../docs/linguistic/methodology.md)
- What must never be in a pack: [docs/linguistic/anti-caricature.md](../docs/linguistic/anti-caricature.md)
- How to contribute: [docs/development/contributing-personas.md](../docs/development/contributing-personas.md)

Synthetic test personas live in [`../fixtures/personas`](../fixtures/personas), never here.
