# Provider adapters

An adapter shapes compiled persona output for one destination. Rules for every
adapter ([ADR-0002](../decisions/0002-provider-agnostic-specification-and-core.md)):

- depends on `@vernaculo/compiler` (and core types), never the reverse;
- consumes the IR/compiled output and never re-selects features;
- performs no network request itself and never ships credentials; the user's client, key and model do the work;
- avoids depending on provider SDKs when structural types suffice;
- documents provider behavior with a verification date ([external-facts.md](../reference/external-facts.md)).

## OpenAI Responses API — `@vernaculo/openai` (done)

```ts
import OpenAI from "openai";                          // the user's own dependency
import { compilePersona } from "@vernaculo/compiler";
import { loadPersona } from "@vernaculo/core/node";
import { withPersona } from "@vernaculo/openai";

const persona = compilePersona(await loadPersona("pt-BR/ba/salvador"), { intensity: 0.25 });

const response = await new OpenAI().responses.create(
  withPersona({ model, instructions: dealershipAgentInstructions, input: customerMessage }, persona),
);
```

(`pt-BR/ba/salvador` does not exist yet; see [`examples/openai`](../../examples/openai/)
for a runnable version with fixtures.)

Facts the adapter relies on (verified 2026-09-29):

- `instructions` is "a system (or developer) message inserted into the model's context". Behavior and style belong there.
- **When using `previous_response_id`, the instructions from a previous response are not carried over.** The persona (and the agent's own instructions) must be sent on every request. `withPersona` is designed to be applied per request; it is pure and idempotent.
- OpenAI now recommends keeping production prompts in application code, versioned and tested in Git (reusable prompt objects are deprecated; shutdown 2026-11-30). Vernáculo's persona-as-files design matches this.
- Prompt caching depends on exact prefix matches; keep static content (agent instructions, then persona layer) first and dynamic content later.

Design choices:

- **No SDK dependency**: `withPersona` is typed structurally (`{ instructions?: string | null }` plus the caller's own params type).
- **Ordering**: agent instructions first, persona layer second. The persona text states that the agent's rules take precedence.
- **Model**: never chosen by Vernáculo. Examples read `OPENAI_MODEL`; the conversation's sample model name was illustrative and is not used.
- `developerMessage(persona)` supports flows that pass instructions as input items.

## OpenAI Agents SDK — `@vernaculo/openai-agents` (idea)

The Agents SDK runs inside the developer's application and accepts plain
`instructions`, so compiled output already works:
`new Agent({ name, instructions: composeInstructions(agentInstructions, persona) })`.
A dedicated package would only add convenience. `@openai/agents` must never be a
dependency of the core. (The SDK's `Model`/`ModelProvider` abstraction, which lets
it use non-OpenAI providers, was cited in the conversation; not re-verified.)

## Agent Skills — `@vernaculo/skills` (done)

See [ADR-0007](../decisions/0007-agent-skills-early-export-target.md) and
[compilation.md](compilation.md). The conversation noted that OpenAI supports
Agent Skills compatible with the open standard (not re-verified in this
bootstrap); the exporter targets the open specification, not a vendor variant.

## Plain Markdown / system prompt (done)

`vernaculo compile <persona>` prints provider-neutral Markdown usable with any
provider or local model.

## Planned adapters

| Adapter | Notes |
| --- | --- |
| Anthropic (Claude) | system prompt composition; same rules |
| Google (Gemini) | system instruction composition |
| Local models (e.g. Ollama with Qwen, Llama, Gemma) | plain text; air-gapped deployments are a first-class use case |
| MCP (`@vernaculo/mcp`) | local stdio server exposing `vernaculo://<persona id>` resources; MCP TypeScript SDK v2 (`@modelcontextprotocol/server`, spec 2026-07-28); see [ADR-0006](../decisions/0006-mcp-future-adapter-not-canonical.md). Would serve MCP-capable clients (the conversation listed Claude, Gemini, Codex, Cursor and the OpenAI Agents SDK, which can use local stdio MCP servers — not re-verified) |

Adding one: follow the `adapter-development` project skill
(`.claude/skills/adapter-development/SKILL.md`) and update this page.
