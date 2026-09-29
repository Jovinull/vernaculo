---
name: linguistic-research
description: Create, extend or review a Vernáculo regional persona pack (e.g. pt-BR/ba/salvador, pt-BR/pe/recife) with sourced, license-checked evidence and without caricature. Use when adding linguistic features, examples or anti-patterns, researching a variety, evaluating a source (ALiB, NURC, corpora, datasets), reviewing a pack PR, or answering whether a regional form belongs in a pack.
---

# Linguistic research for regional packs

## Read first

- `docs/linguistic/methodology.md` — what is modeled, granularity, evidence
- `docs/linguistic/anti-caricature.md` — the non-negotiable policy
- `docs/specification/provenance.md` — evidence levels, source usage, maturity
- `docs/linguistic/sources.md` — known sources and their verified licenses
- `docs/development/contributing-personas.md` — steps and review checklist

## Hard rules

1. **Never invent regionalisms.** Do not add a form because it "sounds regional" or because a model suggested it. You (Claude) must not generate regional features from your own knowledge as if they were evidence: find a citable source or record it as `hypothesis` with a note, for humans to confirm.
2. **Evidence per feature.** `attested` needs a published source; `reported` needs a cited speaker-review round; otherwise `hypothesis` (never rendered).
3. **Licenses.** For each source record `license`, `usage` (`consulted` / `cited` / `redistributed`), `accessed` (quoted date). Paraphrase with citation; never copy corpus/atlas content unless the license allows redistribution under the pack's license. MuPe-Diversidades is CC BY-NC-ND 4.0: consult/cite only.
4. **Primary sources first**: universities, institutional pages, peer-reviewed articles, official repositories. Verify with web access; if unavailable, record the point as pending verification — never claim confirmation you don't have.
5. **Granularity follows evidence**: city-level by default; no state-wide or non-administrative variety without evidence; share features via explicit `extends`.
6. **Language only**: no personality, humor, class, education, profession, religion, politics or behavior — in features, examples, notes or anti-pattern explanations.
7. **Maturity honesty**: new work is `draft`. Only maintainers set `reviewed`, after a human review round per `docs/linguistic/human-review.md`. Never describe a pack as validated, natural or representative without that evidence.

## Procedure

1. Scope the variety and the intended use (default: customer service, subtle intensity).
2. Collect candidate features with sources; separate evidence from hypothesis in a research note.
3. Write/extend `personas/<id>/persona.yaml` (see `docs/specification/persona-format.md`): `minIntensity` for marked features, contextual items with explicit contexts, discouraged forms with reasons.
4. Add positive examples (neutral vs. with layer, stated intensity) and anti-patterns (overuse, eye dialect, stereotype, wrong region, invented forms).
5. `pnpm build && pnpm vernaculo validate` then `pnpm vernaculo compile <id> --intensity 0|default|1` and read the output critically: is intensity 1 still not caricature? is 0 neutral?
6. Prepare samples and questions for human reviewers (labels in `human-review.md`).
7. Record new sources in `docs/linguistic/sources.md` if broadly relevant; update `docs/linguistic/regional-packs.md` status.

## Reviewing a pack

Use the checklist in `docs/development/contributing-personas.md`. Block on:
personality/behavior content, missing evidence, license mismatch, unjustified
granularity, caricature at high intensity, maturity overstated.
