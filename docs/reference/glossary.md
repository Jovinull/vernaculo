# Glossary

| Term | Meaning |
| --- | --- |
| **Persona** | A document describing observable language features of a variety, layered onto an AI agent. Never a personality. |
| **Regional persona pack** (also "Regional Style Pack") | A persona published in the library under `personas/` for one variety (e.g. `pt-BR/ba/salvador`). |
| **Variety** | A way of speaking associated with a place or community. May or may not match administrative borders. |
| **Persona id** | `<BCP 47 language tag>/<slug>/...`; a name, not an inheritance chain. |
| **Persona root** | A directory holding personas at `<root>/<id>/persona.yaml`. |
| **Lineage** | The chain of personas from a root ancestor to a persona through `extends`. |
| **Flattened persona** | The standalone document produced by resolving a lineage; no `extends`. |
| **Effective maturity** | The least mature `maturity` in a lineage. |
| **Maturity** | `fixture` (synthetic), `draft` (unreviewed), `reviewed` (human review completed). |
| **Evidence** | Per-feature support level: `attested`, `reported`, `hypothesis` (never rendered), `synthetic` (fixtures only). |
| **Surface form** | A term or form a persona uses (preferred, contextual, markers, pragmatics) or avoids (discouraged). |
| **Regional intensity** | Number in [0, 1] controlling how strongly the layer marks output; 0 = neutral. |
| **`minIntensity`** | Per-feature threshold: the feature is rendered only at or above it. |
| **IR** (Intermediate Representation) | The resolved persona with intensity and evidence rules applied; the only input of renderers and targets. |
| **Compiler** | Deterministic renderer of the IR into provider-neutral instructions. |
| **Ground rules** | Anti-caricature and role-preservation rules every rendering carries. |
| **Target / adapter** | Code that shapes compiled output for a destination (OpenAI params, Agent Skill, MCP...). |
| **Host agent / parent agent** | The user's agent (role, rules, knowledge) onto which the persona layer is composed. |
| **Composition** | Placing the compiled persona layer after the host agent's instructions. |
| **Eject** | Materializing a flattened persona and compiled instructions in a project so it no longer needs Vernáculo. |
| **Fixture** | Synthetic persona data for tests (`fixtures/personas`, ids under `x-fixture`). Not linguistic content. |
| **Conformance suite** | Language-neutral test files in `schemas/conformance/` that any implementation can run. |
| **Anti-pattern** | A negative example: output that must never be produced, with its category. |
| **Language layer** | Preferred name for what the conversation once called "middleware comportamental": it changes language, not behavior. |
