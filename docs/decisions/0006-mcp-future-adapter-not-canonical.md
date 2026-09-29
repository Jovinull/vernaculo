# ADR-0006: MCP is a future adapter, not the canonical representation

- Status: Accepted
- Date: 2026-09-29
- Origin: `ideia.txt` ("Por que eu não usaria MCP como núcleo", "MCP eu deixaria para v0.2/v0.3")

## Context

MCP separates *prompts* (user-controlled templates), *resources*
(application-controlled context) and *tools* (capabilities the model may call).
A regional persona is configuration the **application** applies deterministically:
a dealership in Salvador always uses its Salvador layer; the model should not
decide whether to "use Bahia". Personas are knowledge/configuration, not an
external capability that requires a server.

## Decision

- **MCP is not the canonical persona format** and the project is not an "MCP of accents".
- An `@vernaculo/mcp` package may later expose personas locally (e.g. resources such as `vernaculo://pt-BR/ba/salvador`, listing/rendering operations) over `stdio`, run by the user (`npx @vernaculo/mcp`). It stays 100% local — never a server run by the project ([ADR-0001](0001-no-vernaculo-infrastructure-at-runtime.md)).
- Planned no earlier than v0.2/v0.3; it is not needed to prove the thesis.

## Consequences

- When implemented, it will target the MCP TypeScript SDK v2 (`@modelcontextprotocol/server`), the stable line implementing the 2026-07-28 MCP specification (verified 2026-09-29), and will consume the compiler output like any other adapter.
- The early conversation's URI sketch `persona://br/ba/salvador` is superseded by the `vernaculo://<persona id>` form and the `pt-BR/...` id scheme.

## Alternatives considered

- **MCP server as the core product** — rejected: requires running a server for what is static configuration, and moves the decision to apply a persona from the application to the model.
