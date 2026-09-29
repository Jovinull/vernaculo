# External facts

Time-sensitive facts the project relies on, with their verification date and
source. Re-verify before relying on them in new decisions; update the date when
you do. Facts that could not be verified are listed as such.

## Verified on 2026-09-29

| Fact | Source | Used in |
| --- | --- | --- |
| OpenAI Responses API: `instructions` is a system/developer message; **with `previous_response_id`, instructions from the previous response are not carried over** | [API reference: responses.create](https://developers.openai.com/api/reference/python/resources/responses/methods/create) | [provider-adapters.md](../architecture/provider-adapters.md), `@vernaculo/openai` |
| OpenAI reusable prompt objects / `v1/prompts`: deprecation announced 2026-06-03, shutdown **2026-11-30**; move prompts into application code, versioned in Git with tests/evals | [Deprecations](https://developers.openai.com/api/docs/deprecations), [Migrate from prompt objects](https://developers.openai.com/api/docs/guides/prompting/migrate-from-prompt-object) | [persona-lifecycle.md](../architecture/persona-lifecycle.md) |
| Prompt caching depends on exact prefix matches: keep static content first | Migrate from prompt objects (same guide) | [compilation.md](../architecture/compilation.md) |
| OpenAI Evals platform: announced 2026-06-03; read-only **2026-10-31**; dashboard and API shut down **2026-11-30**; migration guidance points to Promptfoo | Deprecations | [evals/strategy.md](../evals/strategy.md) |
| OpenAI fine-tuning: from 2026-05-07 unavailable to organizations without prior fine-tuning history; further restrictions 2026-07-02; existing customers lose new-job creation on **2027-01-06** | Deprecations | [ADR-0011](../decisions/0011-deterministic-llm-free-compilation.md) |
| OpenAI Assistants API shut down 2026-08-26 (replacement: Responses + Conversations APIs) | Deprecations | context |
| Agent Builder shutdown 2026-11-30 (alternatives: Agents SDK, Workspace Agents) | Deprecations | context |
| MCP TypeScript SDK v2 is the stable line, released with the **2026-07-28** MCP specification; split packages `@modelcontextprotocol/server` and `/client`; runs on Node, Bun and Deno; v1.x gets fixes for ≥ 6 months | [MCP TS SDK v2 docs](https://ts.sdk.modelcontextprotocol.io/v2/) | [ADR-0006](../decisions/0006-mcp-future-adapter-not-canonical.md) |
| Agent Skills spec: `SKILL.md` frontmatter `name` (1–64, `a-z0-9-`, no leading/trailing/double hyphen, matches directory), `description` (1–1024), optional `license`, `compatibility` (≤ 500), `metadata` (string→string), `allowed-tools` (experimental); `scripts/`, `references/`, `assets/`; `SKILL.md` < 500 lines; references one level deep | [agentskills.io/specification](https://agentskills.io/specification) | `@vernaculo/skills` |
| Claude Code: project skills at `.claude/skills/<name>/SKILL.md` (`description` + `when_to_use` truncated at 1,536 chars in listings; `paths` limits auto-activation); rules in `.claude/rules/*.md` with optional `paths` globs; CLAUDE.md target < 200 lines | [Skills](https://code.claude.com/docs/en/skills), [Memory](https://code.claude.com/docs/en/memory) | `.claude/`, `CLAUDE.md` |
| Node.js: 24 "Krypton" active LTS; 22 "Jod" maintenance LTS; 26 current | [nodejs.org/dist/index.json](https://nodejs.org/dist/index.json) | [stack.md](../development/stack.md) |
| TypeScript 7.0 (native compiler) released 2026-07-08; strict by default; no programmatic compiler API until 7.1 | npm registry; release coverage | [stack.md](../development/stack.md) |
| npm: `vernaculo` and the `@vernaculo` scope are unregistered | npm registry (404 / "Scope not found") | [open questions](../roadmap/open-questions.md) |
| Linguistic sources (ALiB, NURC, MuPe-Diversidades license CC BY-NC-ND 4.0, Sotaque Brasileiro GPL-3.0) | see [sources.md](../linguistic/sources.md) | methodology |

## Stated in the conversation, not verified

| Claim | Status |
| --- | --- |
| OpenAI supports Agent Skills, compatible with the open standard | not re-verified; the exporter targets the open spec |
| OpenAI Agents SDK has `Model`/`ModelProvider` abstractions supporting external providers | not re-verified |
| OpenAI Agents SDK runs inside the developer's application and can use local stdio MCP servers | not re-verified |
| "Projeto SOTAQUE" open voice dataset under CDLA-Permissive-2.0 | not found (see [sources.md](../linguistic/sources.md)) |
| PERSONA.md / Personaxis; PersonaNexus | not found |
| Model name `gpt-5.6-luna` | not verified; never used in code or examples (model comes from configuration) |
