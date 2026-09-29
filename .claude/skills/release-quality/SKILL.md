---
name: release-quality
description: Checklist to decide whether a Vernáculo change is done and releasable — lint, typecheck, tests, build, persona/schema validation, golden-file review, docs and ADR sync, changesets, versioning and honesty of claims. Use before reporting a task as complete, before opening or approving a PR, and before any version bump or release preparation.
---

# Release quality checklist

Run from the repository root.

## 1. Automated gates (all must pass)

```bash
pnpm check        # biome lint, tsc typecheck, vitest, tsdown build, vernaculo validate on fixtures/personas/examples
```

If anything fails, fix the cause; don't weaken tests, add lint ignores or loosen
the architecture test to get green. Report real failures with their output.

## 2. Change-specific checks

- [ ] **Golden files** (`packages/compiler/test/__golden__/`): any diff is intended and explained.
- [ ] **Specification**: JSON Schema, Zod mirror, conformance fixtures and spec docs changed together (see `.claude/rules/schema.md`).
- [ ] **Invariants**: no network, no provider SDKs, dependency direction, determinism, non-mutation — covered by tests, not just by review.
- [ ] **CLI**: behavior, help text and exit codes match `docs/reference/cli.md`.
- [ ] **Dependencies**: new ones checked for current version, maintenance, engines, license; lockfile regenerated through pnpm's policies (no casual `minimumReleaseAgeExclude`).
- [ ] **Windows/Linux**: paths joined with `node:path`, ids with `/`, LF endings.

## 3. Documentation (use `documentation-maintenance`)

- [ ] Canonical docs updated for every changed decision/behavior/contract.
- [ ] ADR added or superseded for structural decisions; index updated.
- [ ] Roadmap, scope and README status tables accurate; open questions updated.

## 4. Honesty of claims

- [ ] Nothing planned presented as done.
- [ ] No pack/output called validated, natural, representative, stereotype-free or production-ready without human review and eval evidence.
- [ ] Fixture/draft maturity visible where relevant.

## 5. Versioning (published packages only)

- [ ] `pnpm changeset` added for public behavior changes (all published packages share one version).
- [ ] Persona pack versions (`metadata.version`) bumped per `docs/architecture/persona-lifecycle.md` when pack content changes.
- [ ] Spec changes: `apiVersion` policy respected.

## 6. Outward actions

Publishing to npm, pushing, tagging, creating GitHub Releases: **only with an
explicit instruction for that action.** Otherwise stop after local verification
and report what is ready. See `docs/development/releasing.md`.
