# Cross-provider consistency

**Question:** do GPT, Claude, Gemini and local models produce similar behavior
from the same compiled persona at the same intensity?

The persona is provider-neutral by design ([ADR-0002](../decisions/0002-provider-agnostic-specification-and-core.md));
this dimension checks that the *behavior* is too.

## Method (planned)

1. Compile the pack once (same persona version, `INSTRUCTIONS_FORMAT`, intensity).
2. Run the shared scenario set on each provider/model available to the evaluator, using the corresponding adapter (or plain Markdown for providers without one), with the evaluator's own credentials or local models.
3. Compare per dimension ([dimensions.md](dimensions.md)): density of forms, rule violations, task assertions, judge scores, and human labels on a sample.
4. Record, with the results: provider, model identifier, date, adapter version, parameters (temperature etc.).

## Interpreting differences

- Differences in *style strength* across models are expected; the question is whether every model stays within the pack's features, the intensity band and the ground rules.
- A model that systematically overuses or invents forms may need provider-specific rendering. That would be implemented in its adapter (never in the persona or the core), documented in [provider-adapters.md](../architecture/provider-adapters.md), and justified by eval results.
- Local models are first-class: air-gapped deployments must know how a pack behaves on them.

## Reproducibility notes

- Model identifiers change and models are retired; results are snapshots, dated.
- Never hardcode a model name in examples or tooling defaults; take it from configuration.
