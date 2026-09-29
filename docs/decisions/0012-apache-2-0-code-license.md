# ADR-0012: Apache-2.0 for code; third-party linguistic material licensed separately

- Status: Accepted (pack content license decided by [ADR-0014](0014-apache-2-0-persona-content.md))
- Date: 2026-09-29
- Origin: `ideia.txt` ("Apache-2.0 para código seria minha preferência; permissiva e adequada para adoção empresarial"; "cada fonte precisaria ter sua licença verificada")

## Context

The goal is adoption, including by companies that ship localized agents. The
project also depends on linguistic research whose licenses vary widely — for
example the MuPe-Diversidades corpus is CC BY-NC-ND 4.0 (non-commercial, no
derivatives), which forbids redistributing derived material in a permissive
project.

## Decision

- **Code** in this repository is licensed under **Apache-2.0** (permissive, explicit patent grant, common in enterprise). The full text is in `LICENSE`.
- The code license **does not** grant rights over third-party material. Each external source is recorded with its license and one of three usage levels:
  - `consulted` — read to inform research; nothing copied;
  - `cited` — referenced/quoted briefly with attribution;
  - `redistributed` — material copied into a pack; only allowed when the source license permits it for this project's distribution terms.
- Corpora and datasets are **never** copied into the repository merely because they are publicly accessible.
- Each persona declares the license of its own content in `metadata.license`. Which license the official packs will use (Apache-2.0, CC-BY-4.0, CC0, ...) is an open question → resolved: Apache-2.0 ([ADR-0014](0014-apache-2-0-persona-content.md)).

## Consequences

- Pack reviews must check `provenance.sources[].usage` against each source's license ([provenance.md](../specification/provenance.md), [sources.md](../linguistic/sources.md)).
- Contribution terms (DCO, NOTICE file, copyright line) are open questions; Apache-2.0 section 5 already makes contributions inbound = outbound.

## Alternatives considered

- **MIT** — acceptable but lacks Apache-2.0's explicit patent grant.
- **Copyleft (GPL/AGPL)** — rejected: conflicts with the goal of embedding packs in commercial agents.
