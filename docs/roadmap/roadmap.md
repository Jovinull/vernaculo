# Roadmap

Status as of 2026-09-29. Update this page whenever status changes.
Legend: ✅ done · 🔜 next · 📋 planned · 💡 idea (not a commitment).

## v0.1 — prove the thesis

| Item | Status |
| --- | --- |
| Specification `v1alpha1`: JSON Schema, semantic rules, inheritance, intensity, provenance, conformance suite | ✅ |
| `@vernaculo/schema`, `@vernaculo/core`, `@vernaculo/compiler` | ✅ |
| `@vernaculo/openai` (Responses API) | ✅ |
| `@vernaculo/skills` (Agent Skill exporter) | ✅ |
| CLI: `list`, `inspect`, `validate`, `compile` (markdown, openai), `export --target skill`, `eject` | ✅ |
| CI, Changesets, Apache-2.0 | ✅ |
| Documentation, ADRs, Claude Code project setup | ✅ |
| Pack content license: Apache-2.0, one license for the whole repository (ADR-0014) | ✅ |
| Review policy: human review always recommended, never mandatory; CLI recommends it for drafts (ADR-0015) | ✅ |
| Settle remaining open questions: eval runner, catalog distribution | 🔜 |
| Research + draft `pt-BR/ba/salvador`, `pt-BR/se/aracaju`, `pt-BR/pe/recife`, `pt-BR/sp/sao-paulo` | 🔜 |
| Shared scenario set and model-based eval runner (local, user credentials) | 📋 |
| First human review rounds (recommended, not a gate); review record schema | 📋 |
| CLI `add`, `search`, `update` (after the catalog decision); `@clack/prompts` for interactive flows | 📋 |
| First npm / GitHub Releases publication (manual) | 📋 |
| Library releases include pre-built artifacts per pack (exported skill + compiled `instructions.md`), so consumers need no Node/Python | 📋 |

## v0.2 – v0.3

| Item | Status |
| --- | --- |
| `@vernaculo/mcp`: local stdio server exposing personas (MCP TS SDK v2) | 📋 |
| Adapters: Anthropic, Gemini, local models (Ollama) | 📋 |
| Cross-provider eval reports per pack | 📋 |
| Register modeling (customer service / casual / formal) | 💡 (open question) |
| Multi-file packs, per-pack eval files | 💡 (open question) |
| `@vernaculo/openai-agents` convenience adapter | 💡 |
| Runtime-selectable intensity in exported skills | 💡 (open question) |

## Later

| Item | Status |
| --- | --- |
| More Brazilian varieties, evidence permitting (e.g. Recôncavo, southern Bahia, Sergipe interior) | 💡 |
| Other languages (`pt-PT`, `es-AR`, `es-MX`, `en-US`, `en-GB`) | 💡 |
| Static docs/catalog site (e.g. Astro + Starlight, free hosting) | 💡 |
| Python implementation (PyPI) using the conformance suite | 💡 |
| Voice/speech regionalization (e.g. datasets of regional voices) | 💡 |
| Rust core or standalone binary — only with a concrete need | 💡 |
| Public dataset of reviewer feedback | 💡 |
| Stable `vernaculo.dev/v1` specification | 📋 after real packs, reviews and evals |
