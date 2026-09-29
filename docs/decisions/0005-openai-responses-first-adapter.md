# ADR-0005: OpenAI Responses API as the first official adapter

- Status: Accepted
- Date: 2026-09-29
- Origin: `ideia.txt` ("E começaria pela OpenAI? Sim."); bootstrap

## Context

A first real integration is needed to prove the thesis end to end. OpenAI's
Responses API places behavior and style in `instructions` (or developer
messages), which maps directly onto a compiled persona layer. The adapter must
not become a coupling point ([ADR-0002](0002-provider-agnostic-specification-and-core.md)).

## Decision

- `@vernaculo/openai` targets the **Responses API** and is deliberately thin:
  - it has **no dependency on any OpenAI SDK** (structural types only) and performs **no request**;
  - `withPersona(params, persona)` returns a copy of the request params with the agent's instructions first and the persona layer after them;
  - `composeInstructions()` and `developerMessage()` cover other call shapes.
- The adapter documents and handles a verified API behavior: with `previous_response_id`, **`instructions` from the previous response are not carried over** — the persona must be applied on every request (`withPersona` is idempotent per request for this reason).
- The user's own client, API key (`OPENAI_API_KEY`) and model are always used. Vernáculo never chooses a model; examples read it from `OPENAI_MODEL`.
- An adapter for the OpenAI **Agents SDK** (`@vernaculo/openai-agents`) is a separate, future package. `@openai/agents` never enters the core.

## Consequences

- Other providers follow the same shape: an adapter is a formatting/composition layer over the compiler output.
- Provider facts are recorded with their verification date in [external-facts.md](../reference/external-facts.md).

## Alternatives considered

- **Wrap the OpenAI SDK client** — rejected: forces a dependency and version coupling, and hides the request from the user.
- **Start with the Agents SDK** — deferred: the Responses API is the lower-level, more stable surface; the Agents SDK accepts plain instructions anyway.
