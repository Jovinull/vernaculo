# Decision records

Structural decisions live here as short, numbered records (ADRs). Narrative
documents explain *how things work*; ADRs record *what was decided, why, and what
was rejected*, so a decision can be revisited deliberately instead of eroded
accidentally.

## When to write one

Write an ADR when a change:

- introduces or alters an architectural invariant (runtime dependencies, network, determinism, provider coupling);
- changes the persona format's model (not a typo-level field tweak), its versioning or its inheritance semantics;
- adds a new kind of target/adapter or distribution channel;
- changes licensing, the linguistic methodology's core rules, or the anti-caricature policy;
- reverses or supersedes an existing ADR.

Do **not** write ADRs for routine choices (a helper's name, a dependency patch bump).

## Rules

- Files are `NNNN-kebab-title.md`, numbered sequentially, never renumbered.
- Status is one of `Proposed`, `Accepted`, `Superseded by ADR-NNNN`, `Deprecated`.
- An accepted ADR is not rewritten to change the decision: write a new ADR that supersedes it and update the old one's status line only.
- Update this index and any affected canonical documents in the same change.

## Template

```markdown
# ADR-NNNN: Title

- Status: Proposed | Accepted | Superseded by ADR-NNNN
- Date: YYYY-MM-DD
- Origin: where the decision came from (conversation, issue, research)

## Context
## Decision
## Consequences
## Alternatives considered
```

## Index

| ADR | Decision | Status |
| --- | --- | --- |
| [0001](0001-no-vernaculo-infrastructure-at-runtime.md) | No Vernáculo infrastructure at runtime (self-hosted, zero maintainer cost) | Accepted |
| [0002](0002-provider-agnostic-specification-and-core.md) | Provider-agnostic specification and core; layered pipeline | Accepted |
| [0003](0003-yaml-markdown-json-schema-format.md) | YAML + Markdown with a normative JSON Schema; conformance suite | Accepted |
| [0004](0004-typescript-reference-implementation.md) | TypeScript as the first reference implementation (not Rust, for now) | Accepted |
| [0005](0005-openai-responses-first-adapter.md) | OpenAI Responses API as the first official adapter, kept thin | Accepted |
| [0006](0006-mcp-future-adapter-not-canonical.md) | MCP is a future adapter, not the canonical representation | Accepted |
| [0007](0007-agent-skills-early-export-target.md) | Agent Skills is an early export target, not the canonical representation | Accepted |
| [0008](0008-git-and-filesystem-no-database.md) | Git and the filesystem instead of a database, registry or marketplace | Accepted |
| [0009](0009-regional-layer-separate-from-agent-role.md) | The regional layer is separate from the agent's role and business rules | Accepted |
| [0010](0010-observable-sociolinguistic-features-only.md) | Model observable sociolinguistic features only; no regional personality | Accepted |
| [0011](0011-deterministic-llm-free-compilation.md) | Deterministic, LLM-free compilation | Accepted |
| [0012](0012-apache-2-0-code-license.md) | Apache-2.0 for code; third-party linguistic material licensed separately | Accepted |
| [0013](0013-explicit-inheritance.md) | Explicit `extends` inheritance; ids never imply inheritance | Accepted |
