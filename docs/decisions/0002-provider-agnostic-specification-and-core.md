# ADR-0002: Provider-agnostic specification and core

- Status: Accepted
- Date: 2026-09-29
- Origin: `ideia.txt` ("o core completamente independente da OpenAI", "o produto principal não é `@vernaculo/openai`"); bootstrap

## Context

The first integration target is OpenAI, but the agent ecosystem changes fast
(APIs are deprecated within months; see [external facts](../reference/external-facts.md)).
The project's lasting value is the open persona specification, the public persona
library, the compiler and the evals — not any single provider integration.

## Decision

1. The **Vernáculo Persona Specification** is independent of OpenAI, Anthropic, Google, MCP, Agent Skills and any agent framework.
2. The implementation is a layered pipeline, and provider knowledge exists only at the last layer:

   ```text
   Persona files ─► Parser/Validator ─► Resolver (inheritance) ─► IR (intensity applied) ─► Compiler ─► Target / Adapter
   (YAML)            @vernaculo/core     @vernaculo/core           @vernaculo/core            @vernaculo/compiler   @vernaculo/openai, @vernaculo/skills, ...
   ```

3. `@vernaculo/schema`, `@vernaculo/core` and `@vernaculo/compiler` never import provider SDKs or provider types. Adapters depend on the compiler, never the reverse.
4. OpenAI is the *first official adapter*, not the owner of the design ([ADR-0005](0005-openai-responses-first-adapter.md)).

## Consequences

- New providers (Anthropic, Gemini, local models via Ollama, etc.) are added as new adapter packages without touching the core.
- Provider-specific facts (request shapes, multi-turn behavior, caching) are documented in [provider-adapters.md](../architecture/provider-adapters.md), not in the specification.
- Enforcement: the architecture test forbids provider SDK imports and dependencies in every package and checks the allowed dependency direction (`schema ← core ← compiler ← adapters ← cli`).

## Alternatives considered

- **Build directly on the OpenAI Agents SDK** — rejected as the foundation: it would leak framework types into the domain. An `@vernaculo/openai-agents` adapter remains possible.
- **One "universal prompt" string as the product** — rejected: the specification is data; the compiler decides how to phrase it per target.
