# ADR-0010: Model observable sociolinguistic features only; no regional personality

- Status: Accepted
- Date: 2026-09-29
- Origin: `ideia.txt` ("O erro que eu evitaria desde o primeiro commit"; the `baiano: relaxed/humorous/likes_to_talk` counter-example)

## Context

A naive design encodes stereotypes as data:

```yaml
baiano:          # ← what Vernáculo must never do
  relaxed: true
  humorous: true
  likes_to_talk: true
```

That quickly becomes caricature and attributes psychological or social traits to
people because of where they are from. Labels such as *baiano*, *sergipano*,
*pernambucano* or *paulista* are also too coarse to be treated as homogeneous
linguistic units: dialectology (e.g. the ALiB atlas) documents multidimensional
variation within states and continuities across state borders.

## Decision

- Personas describe **observable, defensible language phenomena** only: lexicon and regionalisms, forms of address, discourse markers, pragmatic conventions, morphosyntactic constructions, register, frequency/markedness (via intensity), orthography policy, and positive/negative examples.
- Personas never encode **personality, humor, intelligence, aggressiveness, friendliness, education, income, profession, religion, political views or behavior**. The format has no field for them (unknown fields are rejected; see the `personality-traits-rejected` conformance fixture).
- Every compiled output carries ground rules forbidding stereotype performance, regional-origin claims, invented regionalisms and (by default) phonetic/eye-dialect spelling ([anti-caricature.md](../linguistic/anti-caricature.md)).
- Granularity is progressive and evidence-driven (`pt-BR` → `pt-BR/ba` → `pt-BR/ba/salvador`, or varieties that do not follow administrative borders). No region is invented without evidence.
- Every feature declares its **evidence** level; `hypothesis` is never rendered and `synthetic` is allowed only in fixtures.
- Nothing is called "validated", "representative", "natural" or "stereotype-free" without evidence from human review and evals.

## Consequences

- If personality ever becomes a concern, it belongs to a different layer and a new ADR — not to regional packs.
- Human review by speakers of each variety is part of the methodology ([human-review.md](../linguistic/human-review.md)).

## Alternatives considered

- **Free-form "style" traits per region** — rejected: indistinguishable from stereotypes.
- **State-level packs only** — rejected: too coarse; the id scheme supports finer, evidence-based varieties.
