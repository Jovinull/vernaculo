# Principles and invariants

These are the non-negotiable rules of the project. Each links to the decision
that establishes it. Changing one requires a new ADR.

## 1. Zero Vernáculo infrastructure at runtime

> An application that uses Vernáculo must not depend on Vernáculo infrastructure at runtime.

No API, backend, database, account, proxy, telemetry, paid tokens or inference on
the maintainer's side. Maintainer cost stays ≈ zero at any adoption level.
[ADR-0001](../decisions/0001-no-vernaculo-infrastructure-at-runtime.md) ·
[zero-infrastructure.md](../architecture/zero-infrastructure.md)

## 2. Provider independence

The specification and core know nothing about OpenAI, Anthropic, Google, MCP,
Agent Skills or any framework. Providers are adapters at the edge.
[ADR-0002](../decisions/0002-provider-agnostic-specification-and-core.md)

## 3. The format is the product, and it is open

Personas are YAML + Markdown with a normative JSON Schema and a language-neutral
conformance suite. Their meaning never depends on TypeScript code.
[ADR-0003](../decisions/0003-yaml-markdown-json-schema-format.md)

## 4. Deterministic, local compilation

No model is called to build instructions. Same input ⇒ same bytes.
[ADR-0011](../decisions/0011-deterministic-llm-free-compilation.md)

## 5. Language layer, not a new agent

The persona adjusts language only; the host agent's role, rules, policies and
facts always win. The agent never claims a regional origin.
[ADR-0009](../decisions/0009-regional-layer-separate-from-agent-role.md)

## 6. Sociolinguistics, not caricature

Only observable language features. No personality, humor, intelligence,
education, income, social class, profession, religion, politics or behavior attached to a
region. No invented regionalisms. High intensity never relaxes these rules.
[ADR-0010](../decisions/0010-observable-sociolinguistic-features-only.md) ·
[anti-caricature.md](../linguistic/anti-caricature.md)

## 7. Evidence before claims

Every feature declares its evidence; hypotheses are never rendered; synthetic
data only exists in fixtures. Nothing is called validated, natural,
representative, stereotype-free or production-ready without evidence from human
review and evals. Maturity (`fixture` / `draft` / `reviewed`) is visible in every
output. [provenance.md](../specification/provenance.md)

## 8. Evals are part of the product

Packs ship with — and are judged by — local, reproducible evals. Human review by
speakers of the variety is always recommended and never mandatory; tooling
recommends it for every draft. [evals/strategy.md](../evals/strategy.md) ·
[ADR-0015](../decisions/0015-human-review-recommended-not-mandatory.md)

## 9. No lock-in

Personas are portable files. Users can copy, fork, override (`extends`) or eject
them; if the project disappeared, installed packs keep working.
[distribution.md](../architecture/distribution.md)

## 10. Open license, respect for others' licenses

Everything in the repository (code, specification, documentation and persona
content) is Apache-2.0. Third-party linguistic material keeps its own license and
is consulted, cited or redistributed only as that license allows.
[ADR-0012](../decisions/0012-apache-2-0-code-license.md) ·
[ADR-0014](../decisions/0014-apache-2-0-persona-content.md)

## 11. Small, correct, extensible

Prefer a small, well-tested foundation over speculative abstractions; no
placeholder packages or misleading stubs. Documentation, specification, code and
evals evolve together — no important decision lives only in a conversation.
