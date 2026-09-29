# Assimilation of `ideia.txt`

`ideia.txt` (repository root) is the raw founding conversation that conceived the
project. It is kept unchanged as a **historical record**. Since the bootstrap
(2026-09-29), [`docs/`](../README.md) is the source of truth; nobody should need to
reread `ideia.txt` to work on the project.

This page shows that every material point of the conversation was carried into
canonical documentation, and how. It is a **snapshot of the bootstrap**: when
decisions change later, update the canonical documents (and ADRs), not this
table — except to correct a mapping error.

Status values: **Decision** (taken), **Requirement**, **Principle**, **Future**
(idea or planned later), **Superseded** (replaced later in the conversation or at
bootstrap), **Illustrative** (example, not a requirement), **External fact**
(claim about the world; verification status noted), **Open** (unresolved).

Line numbers refer to `ideia.txt`.

## 1. Product framing and positioning

| Topic | Lines | Status | Canonical document |
| --- | --- | --- | --- |
| Not an "MCP of accents" nor a prompt collection: a standard + runtime for sociolinguistic personas, starting with pt-BR | 1–5 | Decision | [vision.md](../product/vision.md), [ADR-0006](../decisions/0006-mcp-future-adapter-not-canonical.md) |
| "Regional Persona Packs" / "Regional Style Packs", not personalities | 7–11 | Decision (terminology) | [regional-packs.md](../linguistic/regional-packs.md), [glossary.md](glossary.md) |
| Layer table: language, region, state, locality, register, intensity, role, domain, brand, company rules | 13–24 | Principle | [architecture/overview.md](../architecture/overview.md#conceptual-layers-of-a-localized-agent) |
| Salvador vs Recife composition at 0.35 with the same commercial agent | 26–48 | Illustrative | [use-cases.md](../product/use-cases.md) |
| Avoid per-combination prompt files (`honda-baiano-prompt.txt`...) | 50 | Decision | [ADR-0009](../decisions/0009-regional-layer-separate-from-agent-role.md) |
| Competition: generic persona formats (PERSONA.md/Personaxis, Character Cards, PersonaNexus); don't compete as a universal personality format; niche = sociolinguistic localization | 249–265 | Decision (positioning); External fact (not verified) | [vision.md](../product/vision.md), [sources.md](../linguistic/sources.md#related-projects-positioning-not-sources) |
| Final recommendation: open source framework for sociolinguistic localization of agents | 423–427 | Decision | [vision.md](../product/vision.md) |
| Infrastructure companies can put in production (not "a cool prompt collection") | 474 | Principle | [vision.md](../product/vision.md) |
| Main product = Persona Specification + public persona library; OpenAI only the first adapter | 1643–1645 | Decision | [vision.md](../product/vision.md), [ADR-0002](../decisions/0002-provider-agnostic-specification-and-core.md) |
| Patrimony: open spec, regional packs, compiler, evals | 1089 | Principle | [vision.md](../product/vision.md) |

## 2. Name and identity

| Topic | Lines | Status | Canonical document |
| --- | --- | --- | --- |
| Name **Vernáculo**; `vernaculo` for packages/CLI; not limited to Brazil | 478, 1070 | Decision | [vision.md](../product/vision.md#name) |
| Avoid "Sotaque" (existing Brazilian OSS project) | 478 | Decision; External fact (a "Sotaque Brasileiro" project exists) | [vision.md](../product/vision.md#name), [sources.md](../linguistic/sources.md) |
| Taglines "Local personas for AI agents", "Local language. Local identity. Any AI." | 480, 1082–1087 | Illustrative (proposal) | [vision.md](../product/vision.md#name) |
| README definition ("open-source, self-hosted persona layer...", without changing or fine-tuning models, bring your own provider or run locally) | 1074–1080 | Decision (adapted with anti-caricature wording) | [README.md](../../README.md) |
| Earlier names `personabr`, `regional-personas`, `@regional-personas/*`, `regionalpersona.dev` | 103–106, 274, 333–352, 122 | Superseded | [cli.md](cli.md#changes-from-the-conversations-sketches), [persona-format.md](../specification/persona-format.md#history-of-the-format-from-the-founding-conversation) |

## 3. Zero infrastructure, distribution and lock-in

| Topic | Lines | Status | Canonical document |
| --- | --- | --- | --- |
| Pivot: no service; distribute personas as code/data; user installs and connects own provider | 476 | Decision | [ADR-0001](../decisions/0001-no-vernaculo-infrastructure-at-runtime.md) |
| No request through the maintainer; no API, DB, server, auth, account, token cost | 506–518, 554 | Decision | [zero-infrastructure.md](../architecture/zero-infrastructure.md) |
| Principle "Vernáculo must not require Vernáculo infrastructure at runtime" (EN/PT) | 924–930 | Decision | [ADR-0001](../decisions/0001-no-vernaculo-infrastructure-at-runtime.md), [principles.md](../product/principles.md) |
| No hosted API, telemetry, key, DB, SaaS, backend, AI run by maintainer; GitHub + Actions for CI; optional GH Pages; npm/PyPI for distribution only | 932–945 | Decision | ADR-0001, [distribution.md](../architecture/distribution.md) |
| 1M installs → R$ 0 inference cost; GitHub/npm absorb distribution | 947–951 | Principle | [zero-infrastructure.md](../architecture/zero-infrastructure.md) |
| User's own API key (`OPENAI_API_KEY`), never the project's | 540–554, 1340–1346 | Decision | [ADR-0005](../decisions/0005-openai-responses-first-adapter.md) |
| Works without SDK — "não deveria exigir Node, Python ou sequer instalar biblioteca": download a pack folder into the project | 558–580 | Requirement (partially met: exported skills and ejected files need no runtime; pre-built artifacts in library releases are planned) | [distribution.md](../architecture/distribution.md#three-consumption-modes), [roadmap.md](../roadmap/roadmap.md) |
| Three usage forms: Pack, Skill, SDK | 582–595 | Decision | [distribution.md](../architecture/distribution.md#three-consumption-modes), [use-cases.md](../product/use-cases.md) |
| If the project disappears, applications keep working | 685–689 | Requirement | ADR-0001 |
| Install via `git clone`, `npx`, `curl`; no marketplace or registry; GitHub, Releases, npm | 693–725 | Decision | [ADR-0008](../decisions/0008-git-and-filesystem-no-database.md) |
| No database; Git + filesystem | 1478–1521 | Decision | ADR-0008 |
| Updates via `pnpm update @vernaculo/personas` or `vernaculo update` | 1509–1519 | Future / Open | [open-questions.md](../roadmap/open-questions.md) (OQ-04) |
| `eject`: materialize everything in the project, remove the dependency; zero lock-in | 1025–1036 | Requirement (implemented) | [distribution.md](../architecture/distribution.md#eject--leaving-vernáculo-behind), [cli.md](cli.md) |
| Local LLMs (Ollama + Qwen/Llama/Gemma), air-gapped, in the design from the start | 955–989 | Requirement (design); adapter Future | [zero-infrastructure.md](../architecture/zero-infrastructure.md#local-first-by-design), [provider-adapters.md](../architecture/provider-adapters.md) |

## 4. Architecture and providers

| Topic | Lines | Status | Canonical document |
| --- | --- | --- | --- |
| Model must not decide whether to "use Bahia"; application applies persona deterministically | 56–58 | Decision (rationale) | [ADR-0006](../decisions/0006-mcp-future-adapter-not-canonical.md) |
| Pipeline Persona Spec → Compiler → Provider Adapter → providers | 62–70 | Decision (refined: parser/resolver → IR → compiler → target) | [architecture/overview.md](../architecture/overview.md), [ADR-0002](../decisions/0002-provider-agnostic-specification-and-core.md) |
| MCP optional later: `persona://br/ba/salvador`, `persona.list/get/render` | 72–90 | Future; URI form Superseded by `vernaculo://pt-BR/...` | ADR-0006 |
| MCP in v0.2/v0.3: `@vernaculo/mcp`, `vernaculo://` resources, `npx @vernaculo/mcp` over stdio, 100% local | 1424–1474 | Future | ADR-0006, [roadmap.md](../roadmap/roadmap.md) |
| MCP SDK v2 supports Node/Bun/Deno, tools/resources/prompts; spec 2026-07-28 | 1116, 1428 | External fact (verified) | [external-facts.md](external-facts.md) |
| TypeScript, core fully independent of OpenAI | 271 | Decision | [ADR-0004](../decisions/0004-typescript-reference-implementation.md), ADR-0002 |
| Start with OpenAI | 326–344 | Decision | [ADR-0005](../decisions/0005-openai-responses-first-adapter.md) |
| Future adapters: anthropic, google, mcp, skills | 346–353 | Future (skills moved earlier) | [provider-adapters.md](../architecture/provider-adapters.md) |
| OpenAI Agents SDK has `Model`/`ModelProvider` for external providers | 355 | External fact (not re-verified) | [external-facts.md](external-facts.md) |
| First adapter snippet (`loadPersona`, `compilePersona`, `responses.create`, model `gpt-5.6-luna`) | 303–318 | Illustrative (model name not verified, not used) | [provider-adapters.md](../architecture/provider-adapters.md) |
| `instructions`/developer messages hold behavior and style | 320 | External fact (verified) | external-facts.md |
| With `previous_response_id`, `instructions` are not reapplied; adapter must ensure persona each call | 322 | Requirement; External fact (verified) | ADR-0005, `withPersona` |
| `@vernaculo/openai` thin: `vernaculo(id, {intensity})` → `persona.instructions` | 1305–1346 | Decision (API shape adapted: `withPersona`, `composeInstructions`) | [packages.md](../architecture/packages.md#vernaculoopenai) |
| Separate `@vernaculo/openai-agents`; never `@openai/agents` in core | 1350–1384 | Decision / Future | [provider-adapters.md](../architecture/provider-adapters.md) |
| `@vernaculo/core`: `loadPersona`, `resolvePersona`, `validatePersona`; only inheritance, composition, intensity, validation, file resolution; knows no provider | 1164–1184 | Decision (composition with the host agent moved to adapters, documented) | [packages.md](../architecture/packages.md#vernaculocore) |
| Compiler: persona → IR → OpenAI / SKILL.md / Markdown / Claude / Gemini / MCP resource; `compile(persona, {target, intensity, register})` → `{instructions, metadata}` | 1252–1291 | Decision (register deferred) | [compilation.md](../architecture/compilation.md) |
| The compiler never calls AI; deterministic; R$ 0 | 1293–1301 | Decision | [ADR-0011](../decisions/0011-deterministic-llm-free-compilation.md) |
| Flow: pack (profile, examples, anti-patterns, provenance, evals) → compiler → OpenAI / Agent Skill / MCP → Claude/Gemini | 433–448 | Decision | [architecture/overview.md](../architecture/overview.md) |
| Agents SDK runs in the developer app and can use local stdio MCP servers; future MCP consumers Claude/Gemini/Codex/Cursor | 1372, 1474, 1619–1620 | External fact (not re-verified) / Future | [provider-adapters.md](../architecture/provider-adapters.md), [external-facts.md](external-facts.md) |
| Final stack diagram | 1593–1621 | Decision | [architecture/overview.md](../architecture/overview.md), [stack.md](../development/stack.md) |

## 5. Skills

| Topic | Lines | Status | Canonical document |
| --- | --- | --- | --- |
| Skills make sense as an export format; OpenAI supports Agent Skills (open standard) | 94–98 | Decision; External fact (OpenAI support not re-verified) | [ADR-0007](../decisions/0007-agent-skills-early-export-target.md) |
| "Uma persona, vários runtimes" | 111 | Principle | [vision.md](../product/vision.md) |
| Self-contained skill with `SKILL.md`; SKILL.md draft text (no stereotypical "Bahian person"; what regionality affects and does not imply — personality, intelligence, profession, socioeconomic status, political views, behavior; preserve parent role) | 729–787 | Decision (text became the compiler's ground rules, incl. "social class"; "conversational rhythm" not modeled yet, OQ-12) | [anti-caricature.md](../linguistic/anti-caricature.md), [compilation.md](../architecture/compilation.md) |
| **Agent Skills in the MVP** ("isso eu mudaria") — exporter output `SKILL.md`, `references/{vocabulary,discourse,pragmatics,sources}.md`, `assets/examples.yaml`; no need to install core | 1388–1420 | Decision (supersedes "skills later"); implemented with `references/examples.md` instead of `assets/examples.yaml` | ADR-0007, [packages.md](../architecture/packages.md#vernaculoskills) |
| Skill used from an `AGENT.md` with "Regional intensity: 0.30" | 635–646 | Illustrative / Open (runtime intensity in skills) | [use-cases.md](../product/use-cases.md), OQ-07 |

## 6. Specification and format

| Topic | Lines | Status | Canonical document |
| --- | --- | --- | --- |
| Declarative format; draft 1 (`regionalpersona.dev/v1`, `RegionalPersona`, `br.ba.salvador`, scope/register, style, constraints, examples, provenance, review) | 115–181 | Superseded (by draft 2 and v1alpha1) | [persona-format.md](../specification/persona-format.md#history-of-the-format-from-the-founding-conversation) |
| The format is not the prompt; the compiler writes the best instructions per model | 183–189 | Decision | [specification/overview.md](../specification/overview.md), ADR-0003 |
| Draft 2 (`vernaculo.dev/v1`, `Persona`, `pt-BR/ba/salvador`, camelCase, constraints, provenance) | 1188–1232 | Decision (basis of v1alpha1, with documented changes) | persona-format.md |
| Format = YAML + Markdown + JSON Schema, not owned by TypeScript or a provider; usable without SDK | 1091 | Decision | [ADR-0003](../decisions/0003-yaml-markdown-json-schema-format.md) |
| JSON Schema defines what is a persona; parsers in Python, Rust, Go, Java, C# | 1234–1248 | Requirement (implemented: normative schema + conformance suite) | [specification/overview.md](../specification/overview.md#conformance) |
| User override: `extends`, intensity, `override.vocabulary.discouraged`; `honda-salvador.yaml` inheriting and adding rules | 889–918 | Requirement; `override:` block Superseded by merge rules | [inheritance-and-composition.md](../specification/inheritance-and-composition.md) |
| Id schemes `br.ba.salvador` → `br/ba/salvador` → `pt-BR/ba/salvador` (and one inconsistent `pt-BR/br/ba/salvador` path) | 126, 77, 1197, 570 | Superseded → `pt-BR/ba/salvador` | [specification/overview.md](../specification/overview.md#identifiers) |
| Constraints `avoidCaricature`, `avoidStereotypes`, `preserveParentRole`, `preserveTaskAccuracy`, `never_invent_regionalisms` | 163–167, 1224–1228 | Decision, reshaped: normative ground rules instead of switchable flags | [anti-caricature.md](../linguistic/anti-caricature.md), persona-format.md |

## 7. Sociolinguistics and anti-caricature

| Topic | Lines | Status | Canonical document |
| --- | --- | --- | --- |
| Never model `relaxed`, `humorous`, `likes_to_talk`... (caricature) | 193–206 | Decision | [ADR-0010](../decisions/0010-observable-sociolinguistic-features-only.md), [anti-caricature.md](../linguistic/anti-caricature.md) |
| Describe observable linguistic phenomena, not psychological traits | 208 | Principle | ADR-0010 |
| "baiano" too broad: ALiB geographic/multidimensional variation; BA–SE continuities | 210 | External fact (ALiB verified) / Principle | [methodology.md](../linguistic/methodology.md#granularity) |
| Possible varieties `br/ba/salvador`, `br/ba/recôncavo`, `br/ba/sul`, `br/se/aracaju`, `br/se/interior` | 212–227 | Illustrative (not invented as packs; ASCII slugs decided) | [regional-packs.md](../linguistic/regional-packs.md), [ADR-0013](../decisions/0013-explicit-inheritance.md) |
| Academic and technical credibility | 229 | Principle | [methodology.md](../linguistic/methodology.md) |
| "O agente não vira um baiano": still the business agent, with a language layer | 472 | Decision | [ADR-0009](../decisions/0009-regional-layer-separate-from-agent-role.md), ground rule 4 |
| Persona as "middleware comportamental" | 824 | Superseded wording → "language layer" | ADR-0009, [glossary.md](glossary.md) |
| Composition: no `pizzaria-baiano`, `banco-baiano`...; Honda Agent + Salvador; Banking + Recife | 791–826 | Decision | ADR-0009, [use-cases.md](../product/use-cases.md) |

## 8. Research sources and licensing

| Topic | Lines | Status | Canonical document |
| --- | --- | --- | --- |
| ALiB: 25 capitals + 225 interior localities | 237 | External fact (verified) | [sources.md](../linguistic/sources.md) |
| NURC: urban speech in Recife, Salvador, Rio, São Paulo, Porto Alegre; multiple dimensions | 239 | External fact (verified) | sources.md |
| MuPe-Diversidades: speech samples incl. PE, AL, SE, SP | 241 | External fact (verified; license **CC BY-NC-ND 4.0**) | sources.md |
| "Projeto SOTAQUE", CDLA-Permissive-2.0; voice as a later evolution | 243 | External fact **not verified** (a different "Sotaque Brasileiro", GPL-3.0, exists); voice = Future | sources.md, [roadmap.md](../roadmap/roadmap.md) |
| Not all academic material is redistributable; verify each license; use as methodological basis | 245 | Requirement | [ADR-0012](../decisions/0012-apache-2-0-code-license.md), [provenance.md](../specification/provenance.md) |
| Apache-2.0 for code | 934 | Decision | ADR-0012, `LICENSE` |

## 9. Intensity

| Topic | Lines | Status | Canonical document |
| --- | --- | --- | --- |
| Intensity levels leve/moderada/forte | 20 | Superseded by numeric scale | [regional-intensity.md](../specification/regional-intensity.md) |
| Intensity first-class, 0.0–1.0, neutral → strongly marked | 830–851 | Requirement (implemented) | regional-intensity.md |
| Ranges: commercial 0.15–0.35, game 0.40–0.70, experiment 0.80+ | 853–869 | Illustrative guidance (provisional) | regional-intensity.md, [compilation.md](../architecture/compilation.md) |
| Not "more *oxente*": adjust frequency of lexicon, syntax, markers, forms of address, pragmatics, rhythm, regionalisms | 871–885 | Requirement (partially implemented: gating + guidance; calibration Open) | regional-intensity.md, OQ-11 |
| `regional_marker_frequency: low` (draft 1 style) | 161 | Superseded by intensity | persona-format.md |

## 10. Evals and human review

| Topic | Lines | Status | Canonical document |
| --- | --- | --- | --- |
| Evals are what can make the project a reference | 389–393 | Principle | [evals/strategy.md](../evals/strategy.md) |
| Dimensions: regional fidelity, naturalness, task fidelity, stereotype leakage, overuse, cross-model stability | 395–404 | Requirement | [evals/dimensions.md](../evals/dimensions.md), [cross-provider.md](../evals/cross-provider.md) |
| Native-speaker labels: natural, exaggerated, unrecognized, other region, offensive/caricatural, "we really use this" | 406–415 | Requirement | [human-review.md](../linguistic/human-review.md#labels) |
| A valuable dataset emerges from feedback | 417 | Future | [roadmap.md](../roadmap/roadmap.md) |
| OpenAI hosted Evals ending → Promptfoo; keep evals local/CI from the start | 419 | External fact (verified) + Decision | evals/strategy.md, OQ-03 |
| Each pack: configurable intensity, sources, positive and negative examples, automatic tests, human review | 429 | Requirement | [regional-packs.md](../linguistic/regional-packs.md) |

## 11. OpenAI ecosystem facts that shaped the design

| Topic | Lines | Status | Canonical document |
| --- | --- | --- | --- |
| Production prompts versioned in code with tests/fixtures/Git review; prompt objects shut down 2026-11-30 | 361–363 | External fact (verified) | [external-facts.md](external-facts.md), [persona-lifecycle.md](../architecture/persona-lifecycle.md) |
| `persona.yaml → Git → PR → CI → evals → release` | 365–381 | Decision | persona-lifecycle.md |
| Stable persona prefix helps prompt caching | 383 | External fact (verified guidance) / Design | [compilation.md](../architecture/compilation.md) |
| Not designed around fine-tuning (portability; fine-tuning closed to new users) | 385 | Decision; External fact (verified) | [ADR-0011](../decisions/0011-deterministic-llm-free-compilation.md), [scope.md](../product/scope.md) |

## 12. Scope, packs, CLI and stack

| Topic | Lines | Status | Canonical document |
| --- | --- | --- | --- |
| v0.1 packs: Salvador/BA, Aracaju/SE, Recife/PE, São Paulo/SP; not 27 states | 429, 993–1002 | Decision (direction; research not started) | [regional-packs.md](../linguistic/regional-packs.md), [roadmap.md](../roadmap/roadmap.md) |
| v0.1 software: `@vernaculo/core`, `@vernaculo/openai`, `vernaculo` CLI (+ skills exporter, per lines 1388–1420) | 1004–1010 | Decision (implemented, plus schema/compiler packages) | [packages.md](../architecture/packages.md) |
| CLI `list`, `add`, `inspect`, `compile --provider openai --intensity`, `eject` | 1012–1026 | Decision (`add` planned; `--provider` → `--target`) | [cli.md](cli.md) |
| CLI `search brasil`, `add`, `npx vernaculo add`; copies files | 656–683 | Future | cli.md, OQ-04 |
| `vernaculo install` into `skills/vernaculo/...` | 616–633 | Superseded by `add` | cli.md |
| Export targets `openai-skill`, `claude-skill`, `system-prompt`, `mcp` | 102–107 | Superseded / Future | cli.md |
| Self-contained pack layout (`knowledge/`, `examples/`, `evals/`, `SOURCES.md`, `SKILL.md`) | 564–578, 733–758 | Open (v1alpha1 uses one `persona.yaml`; `SKILL.md` generated) | [regional-packs.md](../linguistic/regional-packs.md#layout), OQ-06 |
| Future languages and varieties (`en-US/ny/new-york`, `en-US/tx`, `en-GB/london`, `es-AR/buenos-aires`, `es-MX/cdmx`, `pt-PT/lisboa`) | 1046–1060 | Future | regional-packs.md |
| Registers as sub-paths (`.../customer-service`, `casual`, `formal`) | 1062–1068 | Future / Open | OQ-05 |
| Stack: TypeScript, Node LTS, pnpm, YAML+Markdown, JSON Schema, Zod 4, Commander + @clack/prompts, Vitest, Biome, tsdown, GH Actions, Changesets + npm + GH Releases, OpenAI first, Agent Skills, MCP SDK v2 later, no infra/DB/backend | 1093–1114, 1623–1641 | Decision (versions re-verified; Clack deferred until an interactive command) | [stack.md](../development/stack.md) |
| Monorepo layout (packages core/schema/compiler/cli/openai/skills/mcp-later; personas; schemas; evals; docs; examples) | 1118–1162 | Decision (adjusted, deviations documented) | [repository-structure.md](../development/repository-structure.md) |
| Early layout with `packages/eval` and `spec/` | 273–301 | Superseded | repository-structure.md |
| No Next.js; future static docs site (Astro + Starlight, GitHub/Cloudflare Pages) | 1525–1549 | Decision / Future | [scope.md](../product/scope.md), roadmap.md |
| Rust: not now; maybe a Rust core or single binary if a real need appears; the problem is data, spec, compatibility, evals | 1553–1589 | Decision | [ADR-0004](../decisions/0004-typescript-reference-implementation.md) |
| npm/PyPI for distribution (Python implementation possible) | 938 | Future | OQ-16 |
| Illustrative APIs `createAgent({ role, persona: regional(...) })`, `persona(...)`, `openaiPersona(...)` | 452–470, 529–537 | Illustrative | [use-cases.md](../product/use-cases.md), packages.md |

## Decisions superseded during the conversation or at bootstrap

| Earlier | Later | Where decided |
| --- | --- | --- |
| Names `personabr`, `regional-personas`, `regionalpersona.dev` | Vernáculo / `vernaculo` / `@vernaculo/*` / `vernaculo.dev` | conversation (478) |
| Ids `br.ba.salvador`, `br/ba/salvador` | `pt-BR/ba/salvador` (BCP 47 first segment, ASCII slugs) | conversation (1197); slugs at bootstrap (ADR-0013) |
| Format draft 1 (snake_case, `RegionalPersona`) | draft 2 (camelCase, `Persona`) → `v1alpha1` | conversation (1188); bootstrap |
| `vernaculo.dev/v1` | `vernaculo.dev/v1alpha1` (honest maturity) | bootstrap |
| Skills among later adapters | Skill exporter in v0.1 | conversation (1390) |
| `vernaculo install` | `vernaculo add` | conversation (1017) |
| `compile --provider openai` | `compile --target openai` | bootstrap (consistency with `export`) |
| Intensity labels leve/moderada/forte | numeric 0–1 | conversation (840–851) |
| Switchable `constraints` flags | normative ground rules always rendered | bootstrap |
| `override:` block | same fields + normative merge rules | bootstrap |
| `review.native_review_required` | `metadata.maturity` + human-review process | bootstrap |
| `packages/eval`, `spec/` directory | no eval package yet; `schemas/<version>/` | conversation (1118); bootstrap |
| MCP URIs `persona://br/...` | `vernaculo://pt-BR/...` | conversation (1459) |
| "Middleware comportamental" | "language layer" | bootstrap (wording) |
| Exporter `assets/examples.yaml` | `references/examples.md` | bootstrap |

## Open questions originating in the conversation

Tracked in [open-questions.md](../roadmap/open-questions.md) (OQ-01 and OQ-02 were
resolved right after the bootstrap by the maintainer: Apache-2.0 for pack content,
[ADR-0014](../decisions/0014-apache-2-0-persona-content.md); review recommended, not
mandatory, [ADR-0015](../decisions/0015-human-review-recommended-not-mandatory.md)): pack content
license (OQ-01), `reviewed` criteria (OQ-02), eval runner/Promptfoo (OQ-03),
catalog distribution and `@vernaculo/personas` (OQ-04), register modeling (OQ-05),
multi-file packs (OQ-06), runtime intensity in skills (OQ-07), a `pt-BR` base
persona (OQ-09), intensity calibration (OQ-11), rhythm/verbosity (OQ-12), names
and domain (OQ-13), Python/PyPI (OQ-16), non-administrative varieties (OQ-17),
voice (OQ-18).

## Deliberately deferred

MCP adapter; OpenAI Agents SDK adapter; Anthropic, Gemini and local-model
adapters; CLI `add`/`search`/`update`; interactive CLI (`@clack/prompts`); eval
runner and scenario sets; review record schema; the four real packs (research);
npm/GitHub Releases publication; docs site; Python implementation; Rust; voice;
other languages.

## Ideas that are not current requirements

- Illustrative code (`createAgent`, `regional()`, `persona()`, `openaiPersona()`, `vernaculo()` helper) and model names (`gpt-5.6-luna`).
- Specific future varieties (`reconcavo`, `sul`, `interior`, other languages): allowed by the design, not planned work.
- Taglines.
- Intensity ranges per use case: guidance, not rules.
- Explicitly rejected, not merely deferred: hosted API/SaaS/backend, telemetry, database, marketplace/registry, fine-tuning, MCP or `SKILL.md` as canonical format, Next.js in the core, regional personality traits.

## Review against `ideia.txt`

After writing the documentation, `ideia.txt` was re-read section by section
against this table (checking requirements, superseded decisions, examples vs
requirements, future ideas, cost constraints, anti-caricature, OpenAI vs provider
independence, MCP, Skills, local distribution, eject, evals, research, licenses,
intensity, pack structure and stack). Gaps found were fixed in the canonical
documents before the bootstrap was considered complete.
