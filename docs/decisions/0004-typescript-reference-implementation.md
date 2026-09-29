# ADR-0004: TypeScript as the first reference implementation

- Status: Accepted
- Date: 2026-09-29
- Origin: `ideia.txt` ("Eu faria o Vernáculo praticamente inteiro em TypeScript", "E Rust?"); bootstrap

## Context

The hard problems are specification quality, linguistic data quality,
portability, tooling and evals — not CPU. The agent ecosystem's official SDKs
(OpenAI Agents SDK, MCP TypeScript SDK) have first-class TypeScript
implementations, and npm is a natural distribution channel for a CLI.

## Decision

- The reference implementation is **TypeScript on Node.js**, in a **pnpm workspaces monorepo**.
- Development targets the current Node.js LTS line (24 "Krypton" as of 2026-09-29); published packages support Node.js ≥ 22.12 (the oldest maintained LTS line compatible with the dependencies).
- The core entry point stays runtime-agnostic (no `node:` imports) so it can run in browsers, edge runtimes and bundlers; filesystem helpers live in `@vernaculo/core/node`.
- Rust (or any other language) is **not** introduced now. A Rust core with bindings, or a standalone binary without Node, may be reconsidered only when a concrete need appears (performance, single-binary distribution) — through a new ADR.

## Consequences

- Other-language implementations are welcome and rely on the JSON Schema and conformance suite, not on this code ([ADR-0003](0003-yaml-markdown-json-schema-format.md)).
- Tooling choices and verified versions are recorded in [stack.md](../development/stack.md).

## Alternatives considered

- **Rust core from day one** — rejected for now: raises the contribution barrier and complicates distribution without solving the actual bottleneck.
- **Python first** — not chosen: TypeScript aligns with the first adapters and the CLI distribution; a Python implementation (PyPI) remains a roadmap idea.
