# Architecture overview

## Pipeline

```text
                         (user's machine / CI / server — never Vernáculo's)

persona.yaml files ──► parse + validate ──► resolve lineage ──► IR ──► compile ──► target / adapter ──► user's provider
(persona roots,         YAML 1.2 (JSON      explicit extends,    intensity   Markdown     OpenAI params,       or local model
 project files)         data model) +       flatten, semantic    applied,    instructions Agent Skill dir,
                        schema + rules      rules                frozen                   plain prompt, ...
└────────────── @vernaculo/core ────────────────────────────────┘ └─ compiler ┘ └─ @vernaculo/openai, @vernaculo/skills ─┘
```

Every arrow is a local, deterministic function call. No stage calls a model or
the network ([ADR-0011](../decisions/0011-deterministic-llm-free-compilation.md)).

## Layers and responsibilities

| Layer | Owns | Must not know about |
| --- | --- | --- |
| **Specification** (`schemas/`, `docs/specification/`) | the format, semantic rules, conformance suite | any implementation language, any provider |
| **`@vernaculo/schema`** | JSON Schema bundle, TS types, Zod mirror | behavior, filesystem, providers |
| **`@vernaculo/core`** | parsing, structural + semantic validation, lineage resolution, flattening, intensity selection (IR), canonical serialization; filesystem sources in `@vernaculo/core/node` | wording of instructions, providers |
| **`@vernaculo/compiler`** | wording: turning the IR into provider-neutral Markdown instructions, ground rules, maturity notices | providers, filesystem |
| **Adapters / targets** (`@vernaculo/openai`, `@vernaculo/skills`) | shaping compiled output for a destination (request params, skill directory) | persona semantics (they never re-select features) |
| **CLI** (`vernaculo`) | user workflows: list, inspect, validate, compile, export, eject; writing files | — |

Dependency direction is one-way and enforced by
`packages/core/test/architecture.test.ts`:

```text
schema ◄── core ◄── compiler ◄── openai, skills ◄── cli
```

## Conceptual layers of a localized agent

From the founding conversation, a deployed agent combines independent concerns:

| Concern | Example | Owned by |
| --- | --- | --- |
| Language | `pt-BR` | Vernáculo persona (id, `metadata.language`) |
| Variety granularity | Nordeste → Bahia → Salvador (or a non-administrative variety) | Vernáculo persona id + `extends` |
| Register | conversational, customer service | open question (not modeled in v1alpha1) |
| Regional intensity | 0.0–1.0 | Vernáculo (option at compile/export time) |
| Role | sales assistant | host agent |
| Domain | automotive | host agent |
| Brand | the dealership | host agent |
| Company rules | financing, store policies | host agent |

Vernáculo owns only language-related concerns
([ADR-0009](../decisions/0009-regional-layer-separate-from-agent-role.md)).

## Key design properties

- **Data, not prompts.** A persona is structured data; wording is a compiler concern and can improve without touching packs.
- **Intermediate Representation.** The IR is the single place where intensity and evidence rules select features. Targets only format it ([compilation.md](compilation.md)).
- **Runtime-agnostic core.** `@vernaculo/core`'s main entry has no `node:` imports; bundlers, browsers and edge runtimes can use `createMemorySource` with bundled YAML.
- **Explicit inheritance.** Ids are names; `extends` is the only inheritance mechanism ([ADR-0013](../decisions/0013-explicit-inheritance.md)).
- **Honest maturity.** Effective maturity (least mature in the lineage) travels into every output as a visible notice.

## Where to go next

- Packages and public APIs: [packages.md](packages.md)
- IR, compiler and targets: [compilation.md](compilation.md)
- Provider specifics: [provider-adapters.md](provider-adapters.md)
- Getting personas into projects: [distribution.md](distribution.md)
- From research to release: [persona-lifecycle.md](persona-lifecycle.md)
- The zero-infrastructure invariant: [zero-infrastructure.md](zero-infrastructure.md)
