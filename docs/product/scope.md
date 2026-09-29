# Scope

Status legend: **done** (implemented and tested), **planned** (committed
direction, not implemented), **idea** (possible future, not a requirement),
**rejected** (explicitly out).

## In scope for the first release (v0.1)

| Item | Status |
| --- | --- |
| Persona Specification `v1alpha1` (JSON Schema, semantic rules, conformance suite) | done |
| `@vernaculo/schema`, `@vernaculo/core`, `@vernaculo/compiler` | done |
| `@vernaculo/openai` (Responses API adapter) | done |
| `@vernaculo/skills` (Agent Skill exporter) | done |
| CLI: `list`, `inspect`, `validate`, `compile`, `export --target skill`, `eject` | done |
| CLI: `add`, `search`, `update` | planned (depends on catalog distribution, see open questions) |
| Four researched packs, human review recommended: `pt-BR/ba/salvador`, `pt-BR/se/aracaju`, `pt-BR/pe/recife`, `pt-BR/sp/sao-paulo` | planned (research not started) |
| Content license (Apache-2.0) and review policy (recommended, not mandatory) | done (ADR-0014, ADR-0015) |
| Eval methodology, dimensions and human-review labels | done (documented) |
| Eval runner and per-pack eval suites | planned |
| CI (GitHub Actions), Changesets | done |
| npm / GitHub Releases publication | planned (manual, maintainer decision) |

## Later

| Item | Status |
| --- | --- |
| `@vernaculo/mcp` (local stdio server exposing personas) | planned for v0.2/v0.3 |
| `@vernaculo/openai-agents` adapter | idea |
| Anthropic / Gemini / local-model (Ollama) adapters | planned (design supports them) |
| Documentation/catalog site (static, e.g. Astro + Starlight on free hosting) | idea |
| Other languages and varieties (`pt-PT`, `es-AR`, `es-MX`, `en-US`, `en-GB`...) | idea |
| Register sub-personas (`.../customer-service`, `.../casual`, `.../formal`) | idea (open question) |
| Python implementation (PyPI) | idea |
| Rust core / standalone binary | idea (only with a concrete need, ADR-0004) |
| Voice / speech regionalization | idea |

## Non-goals and rejected directions

| Item | Why |
| --- | --- |
| Hosted API, SaaS, backend, proxy, accounts, keys | [ADR-0001](../decisions/0001-no-vernaculo-infrastructure-at-runtime.md) |
| Mandatory telemetry | ADR-0001 |
| Database, proprietary registry or marketplace | [ADR-0008](../decisions/0008-git-and-filesystem-no-database.md) |
| MCP as the core/canonical format | [ADR-0006](../decisions/0006-mcp-future-adapter-not-canonical.md) |
| `SKILL.md` as the canonical format | [ADR-0007](../decisions/0007-agent-skills-early-export-target.md) |
| Regional personality/psychology traits | [ADR-0010](../decisions/0010-observable-sociolinguistic-features-only.md) |
| Designing around fine-tuning | [ADR-0011](../decisions/0011-deterministic-llm-free-compilation.md) |
| Calling an LLM to build or render personas in the core | ADR-0011 |
| A general-purpose AI personality format | [vision.md](vision.md) |
| Next.js or any web framework in the core | a future docs site is static and outside the runtime |
| Covering all 27 Brazilian states at once | quality over coverage: four excellent packs first |
