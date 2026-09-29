# Vernáculo

**Regional language layers for AI agents — open, self-hosted and provider-agnostic.**

> **Status: early bootstrap (September 2026).** The specification (`v1alpha1`),
> the reference implementation and the CLI work and are tested, but **no real
> regional pack exists yet** — only synthetic fixtures. Nothing is published to
> npm yet. Do not use this in production.

## The problem

The same AI agent is often deployed in many places. A dealership's sales assistant
in Salvador and in Recife should share products, policies and rules, but people
in each city talk differently. Writing one prompt per company × region forks your
business rules; asking a model to "talk like a local" produces stereotypes and
invented slang.

## What Vernáculo is

Vernáculo describes how a language variety is spoken — vocabulary, discourse
markers, forms of address, conversational conventions, sentence patterns — as
**portable, versioned data**, and compiles it into a **language layer** that you
place on top of your existing agent:

```text
your agent (role, rules, knowledge)  +  regional persona layer  =  localized agent
```

No model is changed or fine-tuned: the layer is plain instructions that run with
your own provider or a local model.

It changes how things are said, never who the agent is: personas cannot encode
personality, humor, intelligence, class or behavior, and every compiled layer
tells the model to keep your agent's role and rules, never to imitate a
stereotype, never to invent regionalisms and never to claim to be from the region.
[Why and how →](docs/linguistic/anti-caricature.md)

## Example

```bash
pnpm install && pnpm build
pnpm vernaculo compile pt-BR/x-fixture/cidade-a --root fixtures/personas --intensity 0.3
```

```ts
import { compilePersona } from "@vernaculo/compiler";
import { loadPersona } from "@vernaculo/core/node";
import { withPersona } from "@vernaculo/openai";

const persona = compilePersona(await loadPersona("pt-BR/x-fixture/cidade-a", { roots: "fixtures/personas" }), {
  intensity: 0.25, // 0 = neutral … 1 = strongly marked; never caricature
});

// Your OpenAI client, your key, your model. Apply on every request.
const params = withPersona({ model, instructions: yourAgentInstructions, input }, persona);
```

(`pt-BR/x-fixture/...` are synthetic fixtures with placeholder words. The first
real packs — Salvador/BA, Aracaju/SE, Recife/PE, São Paulo/SP — are planned.)

## Principles

- **No Vernáculo infrastructure at runtime.** No API, account, key, database, proxy or telemetry. Everything runs in your project with your own provider or a local model. If this repository disappeared, your installed or ejected personas would keep working. [ADR-0001](docs/decisions/0001-no-vernaculo-infrastructure-at-runtime.md)
- **Provider-agnostic.** The specification and core know nothing about any provider. OpenAI is the first adapter; Agent Skills export is built in; other providers, local models and MCP are planned. [ADR-0002](docs/decisions/0002-provider-agnostic-specification-and-core.md)
- **Open format.** YAML + Markdown with a normative JSON Schema and a language-neutral conformance suite, implementable in any language. [Specification](docs/specification/overview.md)
- **Deterministic.** Compiling a persona never calls a model. [ADR-0011](docs/decisions/0011-deterministic-llm-free-compilation.md)
- **Evidence before claims.** Every feature declares its evidence and sources; hypotheses are never rendered; maturity (`fixture` / `draft` / `reviewed`) is visible in every output. Evals and review by speakers of each variety are part of the product.
- **No lock-in.** `vernaculo eject` writes a self-contained persona and compiled instructions into your project.

## What exists today

| Piece | Status |
| --- | --- |
| Persona Specification `vernaculo.dev/v1alpha1` + conformance suite | done (alpha) |
| `@vernaculo/schema`, `@vernaculo/core`, `@vernaculo/compiler` | done |
| `@vernaculo/openai` (Responses API, no SDK dependency) | done |
| `@vernaculo/skills` (Agent Skills exporter) | done |
| `vernaculo` CLI: `list`, `inspect`, `validate`, `compile`, `export --target skill`, `eject` | done |
| CLI `add` / `search` / `update` | planned |
| Regional packs (Salvador, Aracaju, Recife, São Paulo) | planned — research not started |
| Model-based eval runner, human review rounds | planned (methodology documented) |
| MCP, Anthropic, Gemini, local-model adapters | planned |

See the [roadmap](docs/roadmap/roadmap.md) and [open questions](docs/roadmap/open-questions.md).

## Repository

```text
docs/               documentation — the source of truth
schemas/            normative JSON Schema + conformance suite
packages/           schema, core, compiler, openai, skills, cli
personas/           the public pack library (empty for now)
fixtures/personas/  synthetic personas for tests and examples
examples/           runnable examples
```

Stack: TypeScript 7, Node.js (24 LTS for development; packages support ≥ 22.12),
pnpm workspaces, Zod 4, YAML, Vitest, Biome, tsdown, Commander, Changesets, GitHub
Actions. Details: [docs/development/stack.md](docs/development/stack.md).

## Development

```bash
pnpm install
pnpm check        # lint + typecheck + tests + build + persona data validation (CI runs this)
pnpm test         # tests only, against sources
pnpm build        # build all packages
pnpm vernaculo --help
```

See [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/](docs/README.md).

## License

Code: [Apache-2.0](LICENSE). Third-party linguistic material keeps its own license
and is only consulted, cited or redistributed as that license allows; the license
of the future persona packs' content is still an [open question](docs/roadmap/open-questions.md).
