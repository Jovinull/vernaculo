# Use cases

Examples come from the founding conversation. Brand names (Honda) describe the
motivating scenario only; repository examples use fictional companies.

## 1. The same sales agent in several cities (motivating case)

A motorcycle dealership group runs one sales assistant with shared knowledge
(`motos.md`, `financiamento.md`, `concessionarias.md`) and one commercial policy.
Stores in Salvador (BA), Recife (PE) and Aracaju (SE) each want replies that sound
local — without anyone maintaining three forks of the prompt.

```text
pt-BR + BA + Salvador + intensity 0.35 + customer service + dealership agent
pt-BR + PE + Recife   + intensity 0.35 + customer service + dealership agent
```

The commercial intelligence is identical; only the language layer changes. The
agent does not "become a baiano": it is still the dealership's agent, following
the same policy, with a regional language layer. See
[ADR-0009](../decisions/0009-regional-layer-separate-from-agent-role.md).

Illustrative API from the conversation (not the implemented API):

```ts
createAgent({ role: hondaSalesAgent, persona: regional("br/ba/salvador", { intensity: 0.25 }) });
createAgent({ role: hondaSalesAgent, persona: regional("br/pe/recife", { intensity: 0.25 }) });
```

The implemented equivalent is `withPersona(params, compilePersona(...))` —
see [provider-adapters.md](../architecture/provider-adapters.md).

## 2. Any business agent × any locality

```text
Banking agent + Vernáculo Recife = Bank Recife agent
Support agent + Vernáculo Salvador = Support Salvador agent
```

No `pizzaria-baiano`, `banco-baiano`, `suporte-baiano` prompt files: every agent
× locality combination is a composition.

## 3. Company adjustments on top of a library pack

A company keeps `vernaculo/honda-salvador.yaml` in its own repository:

```yaml
extends: pt-BR/ba/salvador
regionality:
  defaultIntensity: 0.25
linguistics:
  vocabulary:
    discouraged:
      - term: ...        # a form the company's style guide avoids
```

See [inheritance-and-composition.md](../specification/inheritance-and-composition.md)
and the runnable [`examples/project-persona`](../../examples/project-persona/).

## 4. Different intensities for different products

| Use | Intensity guidance (from the conversation, provisional) |
| --- | --- |
| Commercial customer service | 0.15–0.35 |
| Game character | 0.40–0.70 |
| Linguistic experiment | 0.80+ |

Intensity changes how much regional marking is rendered, never the
anti-caricature rules. See [regional-intensity.md](../specification/regional-intensity.md).

## 5. Three ways to consume a persona

| Mode | What the user takes | Needs Vernáculo code at runtime? |
| --- | --- | --- |
| **Pack** | portable files (`persona.yaml`, or an ejected flattened copy + compiled `instructions.md`) | no |
| **Skill** | an exported Agent Skill directory (`SKILL.md` + `references/`) | no |
| **SDK** | `@vernaculo/core` + `@vernaculo/compiler` + an adapter, compiling at build or run time | only the user's own installed packages |

## 6. Fully local / air-gapped deployments

```text
Vernáculo + Ollama + Qwen / Llama / Gemma  — all inside the company
Internet ✗   OpenAI API ✗   Vernáculo API ✗ (there is none)
```

The compiled instructions are plain text usable by any local model. A dedicated
local-model adapter is on the roadmap; the design already supports it because
nothing in the pipeline needs a network.

## 7. Agents that load skills

A team drops `vernaculo-pt-br-ba-salvador/` (exported skill) into an agent that
supports Agent Skills and references it from the agent's instructions, e.g.:

```text
Role: Dealership sales assistant.
Use: skills/vernaculo/pt-BR/ba/salvador
```

(The conversation also sketched `Regional intensity: 0.30` inside the agent file;
runtime-selectable intensity for skills is an [open question](../roadmap/open-questions.md) —
today the intensity is chosen at export time.)

## 8. Future: beyond Brazil and beyond text

The id scheme already covers other languages and varieties (`pt-PT/lisboa`,
`es-AR/buenos-aires`, `en-US/tx`...) and, later, voice (regional speech
synthesis). Both are roadmap ideas, not current scope.
