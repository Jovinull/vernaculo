# Vision

## The problem

Companies deploy the same AI agent to many places. A dealership's sales assistant
in Salvador (BA) and in Recife (PE) should know the same products, follow the
same financing policy and obey the same rules — but people in each place talk
differently, and an agent that sounds like it was written for somewhere else (or,
worse, like a caricature of the place) feels wrong.

Today the options are poor:

- one prompt per company × region (`honda-baiano-prompt.txt`, `honda-pernambucano-prompt.txt`, ...), which forks business rules and does not scale;
- ad-hoc "talk like a local" instructions, which produce stereotypes and invented slang;
- fine-tuning, which is costly, provider-locked and increasingly unavailable.

## What Vernáculo is

> **Vernáculo is an open, self-hosted and provider-agnostic specification, library
> and toolchain for adding sociolinguistic localization — regional language
> layers — to AI agents.**

```text
business agent  +  regional persona layer  =  localized agent
```

It has four assets, in order of importance:

1. **The Vernáculo Persona Specification** — an open, declarative format (YAML + Markdown + JSON Schema) for describing observable features of a language variety, with intensity, provenance and review status. Implementable in any language.
2. **A public library of regional persona packs** — small, researched, human-reviewed, starting with Brazilian Portuguese.
3. **A deterministic compiler and adapters** — turning packs into instructions for OpenAI, Agent Skills, plain system prompts, and later other providers and MCP.
4. **Evals** — local, reproducible checks that a pack is natural, regionally faithful, preserves the agent's task and rules, does not overuse features and does not leak stereotypes.

The product is **not** `@vernaculo/openai`. OpenAI is only the first official
adapter; the specification and the packs are what should remain relevant if the
agent ecosystem changes completely.

## What Vernáculo is not

- Not a service: there is no Vernáculo API, account, database or hosted inference. Everything runs in the user's project with the user's provider or local model ([ADR-0001](../decisions/0001-no-vernaculo-infrastructure-at-runtime.md)).
- Not an "MCP of accents" nor a collection of funny prompts ([ADR-0006](../decisions/0006-mcp-future-adapter-not-canonical.md)).
- Not a universal AI personality format. Generic persona/character formats already exist (Character Cards and several "persona spec" projects); Vernáculo deliberately occupies the narrower, less crowded niche of **sociolinguistic localization**.
- Not a model of what people from a region *are*. It models how a variety is *spoken* — never personality, intelligence, class or behavior ([ADR-0010](../decisions/0010-observable-sociolinguistic-features-only.md)).

## Why it can become a reference

- A persona is **data, not a prompt**: it can be validated, versioned, reviewed, diffed, inherited and evaluated.
- One persona, many runtimes: the same pack compiles to OpenAI instructions, an Agent Skill or a plain prompt.
- **Evals and human review** by speakers of each variety are part of the product, not an afterthought. The feedback they generate ("natural", "exaggerated", "I don't recognize this", "that's from another region") is itself valuable research data.
- Linguistic credibility: granularity follows evidence (e.g. `pt-BR/ba/salvador` rather than a monolithic "baiano"), with sources and licenses tracked per feature.

## Name

**Vernáculo** — the way of speaking proper to a region or community. The
technical name is `vernaculo` (CLI and npm package) and `@vernaculo/*` (library
packages). The name was chosen over alternatives ending in "BR" because the
design is not limited to Brazil (future packs could include `pt-PT`, `es-AR`,
`en-US`...), and over "Sotaque" because a Brazilian open source project named
Sotaque Brasileiro (voice dataset) already exists.

Taglines proposed in the founding conversation (not final branding):
"Vernáculo — Local personas for AI agents" and "Local language. Local identity.
Any AI." When used, "identity" must be read as *linguistic* identity only.

## Current stage

Early bootstrap (September 2026): specification `v1alpha1`, reference
implementation, CLI and adapters exist; **no real regional pack exists yet** —
only synthetic fixtures. See [roadmap](../roadmap/roadmap.md).
