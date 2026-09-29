# Zero infrastructure

> **An application that uses Vernáculo must not depend on Vernáculo infrastructure at runtime.**
>
> *Uma aplicação que utiliza Vernáculo não deve depender da infraestrutura do Vernáculo em runtime.*

Decision record: [ADR-0001](../decisions/0001-no-vernaculo-infrastructure-at-runtime.md).

## What this means

```text
Company
 ├── its system
 ├── its model (hosted provider with its own key, or local)
 └── the persona (files it owns)

Vernáculo API: does not exist.
```

- No request passes through the maintainer. No Vernáculo API, database, server, authentication, account or key.
- No inference or tokens paid by the maintainer; with a million installs, the maintainer's inference cost is still zero.
- No mandatory telemetry.
- GitHub and npm absorb normal open source distribution; whoever runs the software pays for their own infrastructure.
- If the repository disappeared tomorrow, installed or ejected packs would keep working.

## Checklist for any change

Before merging, a change must not:

- [ ] add a network call (HTTP, sockets, `fetch`) to any package;
- [ ] add a provider SDK or network client dependency to any package;
- [ ] require an account, key or remote configuration to validate, resolve, compile or export;
- [ ] fetch schemas, packs or "updates" implicitly (the `vernaculo.dev/...` `apiVersion` is an identifier, never a URL to load);
- [ ] introduce telemetry;
- [ ] make any hosted service (docs site, catalog) necessary for the software to work.

Allowed: optional, explicit, user-initiated downloads through third-party free
channels (npm, GitHub) at *install* time, never at application runtime.

## Automated enforcement

- `packages/core/test/architecture.test.ts`: forbids `http`, `https`, `http2`, `net`, `tls`, `dgram`, `undici`, `axios`, `node-fetch`, provider SDKs (`openai`, `@openai/*`, `@anthropic-ai/*`, `@google/*`, `@modelcontextprotocol/*`) and `fetch(` in every package's source and manifest.
- `packages/compiler/test/compile.test.ts`: runs load → resolve → compile with `fetch` stubbed to throw.
- `packages/openai/test/openai.test.ts`: the OpenAI adapter must not depend on an OpenAI SDK.

## Local-first by design

Local LLMs (e.g. Ollama running Qwen, Llama or Gemma) are part of the design from
the start: compiled instructions are plain text, so an air-gapped company can run
the whole stack internally.
