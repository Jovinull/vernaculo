---
name: documentation-maintenance
description: Keep Vernáculo's docs, ADRs, roadmap and open questions in sync with a change in the same task. Use whenever a change alters a decision, invariant, public API, persona format, CLI contract, pack structure, methodology, adapter set, compatibility or roadmap status, when a limitation or research result is discovered, or before finishing any non-trivial task.
---

# Documentation maintenance

Rule: **no important decision survives only in the conversation.** Docs describe
the current state; Git holds history.

## Procedure

1. **List what changed** in behavior, contracts, decisions or status (not just files touched).
2. **Map each item to its canonical page** using the table in `.claude/rules/documentation.md`. Typical hits:
   - public API → `docs/architecture/packages.md`
   - CLI → `docs/reference/cli.md`
   - format/semantics → `docs/specification/*` (+ schema/conformance, see `persona-specification` skill)
   - adapters/targets → `docs/architecture/provider-adapters.md`, `compilation.md`
   - status → `docs/roadmap/roadmap.md`, `docs/product/scope.md`, `README.md` status tables
3. **Decide whether an ADR is needed** (see `docs/decisions/README.md`): new/changed invariant, format model or versioning, new kind of target or distribution channel, licensing, methodology core rules, reversal of an ADR. If yes:
   - copy the template from `docs/decisions/README.md`, next number, status `Accepted` (or `Proposed` if awaiting the maintainer);
   - never rewrite an accepted ADR's decision: supersede it and change only the old one's status line;
   - add it to the index table.
4. **Open questions**: add new unresolved questions to `docs/roadmap/open-questions.md` (next `OQ-NN`); when one is resolved, remove it and record the answer in an ADR or doc.
5. **External facts**: anything time-sensitive (API behavior, deprecations, versions, licenses) goes to `docs/reference/external-facts.md` with URL and verification date.
6. **New page?** Only if no existing page fits; place it in the right section and link it from `docs/README.md`.
7. **Check honesty**: nothing planned described as done; no pack or output described as validated, natural or representative without evidence; fixture/draft maturity visible.
8. **Check links** you added point to existing files.

## Don'ts

- Don't write progress logs or session notes into `docs/`.
- Don't duplicate the same explanation in several pages; link to the canonical one.
- Don't grow `CLAUDE.md` with details — it stays under 200 lines.
- Don't edit `ideia.txt`, and only correct mapping errors in `docs/reference/idea-assimilation.md`.
