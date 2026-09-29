# Linguistic methodology

How regional persona packs are researched, written and checked. This is a
working methodology for a young project; it will be refined with linguists and
reviewers as the first packs are built.

## Goal

Sociolinguistic **naturalness**, not caricature: output that speakers of a
variety recognize as plausible, at a controlled intensity, while the host agent
keeps its role and rules.

## What is modeled

Observable, defensible features of language use:

| Dimension | Persona field |
| --- | --- |
| Lexicon and regionalisms | `vocabulary.preferred`, `vocabulary.contextual` |
| Forms to avoid (wrong region, dated, offensive, caricatural) | `vocabulary.discouraged`, `antiPatterns` |
| Discourse markers | `discourse.markers` |
| Morphosyntactic constructions | `morphosyntax.patterns` |
| Forms of address | `pragmatics.addressForms` |
| Conversational conventions (greeting, acknowledging, disagreeing, closing) | `pragmatics.*` |
| Markedness / frequency | `minIntensity`, intensity bands |
| Spelling policy | `orthography.phoneticSpelling` |
| Illustrations | `examples` (positive), `antiPatterns` (negative) |

Never modeled: personality, humor, intelligence, friendliness, aggressiveness,
education, income, social class, profession, religion, politics or behavior
([anti-caricature.md](anti-caricature.md)).

## Granularity

Administrative labels (*baiano*, *sergipano*, *pernambucano*, *paulista*) are too
coarse to be treated as homogeneous linguistic units. The ALiB atlas treats
variation as geographic **and** multidimensional (informant sex, age, schooling),
covering capitals and interior localities, and research reports continuities that
cross state borders (e.g. between Bahia and Sergipe).

Therefore:

- Start from the most specific unit for which there is evidence — usually a city (`pt-BR/ba/salvador`), not a state.
- Create broader personas (`pt-BR/ba`) only if evidence supports features shared across that area, and share them through explicit `extends`, never through the id path.
- Varieties that do not follow administrative borders (the conversation mentioned the Recôncavo, southern Bahia, Sergipe's interior) are representable with their own slugs **when evidence exists**. No variety is invented in advance.
- Urban vs rural, age, class and register variation within a locality is real; v1alpha1 has no dedicated modeling for it beyond intensity and notes. Register modeling is an open question.

## Evidence

Each feature needs an evidence level ([provenance.md](../specification/provenance.md)):

1. Prefer **attested** evidence from primary linguistic sources (atlases, corpora, peer-reviewed studies, reference works).
2. Use **reported** evidence from structured speaker reviews, cited as `speaker-review` sources.
3. Keep anything else as **hypothesis** (never rendered) until confirmed.
4. Never use generated text, jokes, memes, dubbing/soap-opera stereotypes or "lists of regional slang" as evidence.

Record for each feature, in `notes`, the scope of the evidence (which speakers,
which period, which context) when relevant, and prefer contemporary usage for
agents talking to today's customers.

## Sources and licenses

Separate what you may **consult**, **cite** and **redistribute**
([sources.md](sources.md)). Do not copy corpora, transcriptions or atlas content
into packs unless the license allows redistribution under the pack's license.
Describing a feature in your own words, with a citation, is the normal case.

## Examples and anti-patterns

- Positive examples show a neutral utterance and the same utterance with the layer applied, at a stated intensity, in realistic situations (customer service first).
- Anti-patterns show what must never be produced: stacking markers, eye-dialect spelling, stereotyped attitudes, forms from another region, invented words, wrong register.

## Review and evaluation

- Every pack is reviewed by people familiar with the variety ([human-review.md](human-review.md)).
- Every pack is evaluated with local, reproducible evals ([evals/strategy.md](../evals/strategy.md)).
- Claims about a pack (natural, representative, validated) are made only with that evidence.

## Initial packs

Salvador/BA, Aracaju/SE, Recife/PE and São Paulo/SP — see [regional-packs.md](regional-packs.md).
Research for them has **not started**; the repository contains only synthetic fixtures.
