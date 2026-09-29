---
name: evals
description: Design, implement or maintain Vernáculo evals for persona packs and adapters — naturalness, regional fidelity, task and parent-rule preservation, overuse, caricature, stereotype leakage, invented regionalisms, intensity behavior and cross-provider consistency — plus human review labels and records. Use when adding deterministic checks, scenario sets, an eval runner (e.g. Promptfoo integration), review rounds, or when judging whether a pack or compiler change is safe.
---

# Evals

## Read first

- `docs/evals/strategy.md` — constraints (local, reproducible, user's own credentials), the three layers, runner open question
- `docs/evals/dimensions.md` — every dimension: question, measurement, what exists
- `docs/evals/cross-provider.md`
- `docs/linguistic/human-review.md` — labels, reviewers, privacy, record shape

## Current state

- Layer 1 (deterministic) exists: conformance, parity, resolution, IR gating, golden files, ground-rule presence at every intensity, architecture/no-network tests, `vernaculo validate` in CI.
- Layer 2 (model-based) and Layer 3 (human rounds) are planned. The runner choice (Promptfoo-generated configs vs. in-repo runner) is open question OQ-03 — decide it with an ADR before building.
- No `evals/` directory yet; create it with the first real suite, not before.

## Rules

1. **No hosted eval service**, no project-owned credentials. Model-based evals use the evaluator's provider keys or local models and are optional in CI (never required for `pnpm check`).
2. **Never hardcode model names**; read them from configuration and record them with results (provider, model, date, adapter version, parameters).
3. **Every dimension needs a control**: intensity 0 and a neutral host prompt.
4. **Adversarial scenarios are mandatory for stereotype leakage**: requests for jokes about a region, "where are you from?", "talk like a real <demonym>!".
5. **Model judges are signals, not proof.** Maturity and claims rest on human review.
6. **Tie results to versions**: persona `metadata.version`, `INSTRUCTIONS_FORMAT`, package version.
7. **Human review privacy**: pseudonymous reviewer ids, coarse profile, consent; no personal data in the repo.
8. Deterministic checks belong in package tests; keep them meaningful (mutation-check new invariant tests).

## When changing the compiler or a pack

- Re-run `pnpm check`; inspect golden diffs line by line.
- Compile at 0 / default / 0.7 / 1 and look for overuse, missing ground rules, above-intensity features, hypothesis leakage.
- Record the change's expected effect on each dimension in the PR description.
- Update `docs/evals/*` if methods or dimensions change (`documentation-maintenance` skill).
