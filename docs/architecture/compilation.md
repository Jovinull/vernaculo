# Compilation: IR, compiler and targets

## Stages

1. **Resolve** (`@vernaculo/core`): load the lineage, validate every document, flatten it into one canonical document ([inheritance-and-composition.md](../specification/inheritance-and-composition.md)).
2. **Select** (`buildIR`, `@vernaculo/core`): apply the intensity and evidence rules and produce the **Intermediate Representation** (IR).
3. **Render** (`@vernaculo/compiler`): turn the IR into provider-neutral Markdown instructions.
4. **Target** (adapters): shape the rendered output for a destination.

```text
ResolvedPersona ──buildIR({ intensity })──► PersonaIR ──compile()──► CompiledPersona ──► withPersona() / exportSkill() / stdout
```

## The IR

`PersonaIR` is the only representation targets consume. It contains:

- persona identity (id, name, language, version, **effective maturity**, license, lineage);
- the selected `intensity` and the orthography policy (`phoneticSpelling`, default `avoid`);
- the selected features: vocabulary (preferred, contextual), discourse markers, sentence patterns, conventions (address forms, greetings, acknowledgements, disagreements, closings), examples;
- restrictions that are always present: discouraged forms and anti-patterns;
- all declared sources;
- counts of what was omitted (below intensity, hypotheses), for transparency.

Selection rules are normative ([regional-intensity.md](../specification/regional-intensity.md));
the IR is deep-frozen and built from a clone, so compilation can never mutate the
canonical representation.

**Why an IR:** feature selection lives in exactly one place. A new target cannot
accidentally render a hypothesis or an above-intensity feature, and third parties
can write their own renderer over the same selection semantics.

## The compiler's output

`renderInstructions(ir)` emits Markdown, in this order:

1. Title with persona name and id; a **maturity notice** for `fixture` and `draft`.
2. A framing sentence: the layer adjusts only phrasing, not identity, knowledge or rules.
3. **Ground rules** — always, at every intensity (they implement the invariants in [anti-caricature.md](../linguistic/anti-caricature.md)):
   - keep the parent agent's role, rules, policies and facts; prefer neutral language when regional style would hurt clarity or accuracy;
   - apply the layer only to language;
   - no personality/humor/intelligence/education/income/social class/profession/religion/politics/behavior attribution; never imitate a stereotype;
   - never claim a regional origin or background;
   - use only listed forms; never invent regionalisms or borrow from other regions;
   - do not force features into every sentence;
   - standard orthography unless the persona allows phonetic spelling.
4. **Intensity** guidance (see below).
5. Selected features (sections omitted when empty), then **Avoid** and **Never produce output like this**.

Framing text is English (models follow it reliably across languages); persona
content (forms, examples) stays in the persona's language. Localizing the framing
is an [open question](../roadmap/open-questions.md). Research notes (`notes`) and
sources are not sent to the model — they appear in skill references.

### Intensity wording (non-normative, provisional)

| Intensity | Band | Guidance given to the model |
| --- | --- | --- |
| 0 | neutral | use no regional feature; only restrictions apply |
| (0, 0.35] | subtle | use features sparingly; most sentences unmarked |
| (0.35, 0.7] | moderate | use features where they fit naturally, without concentrating them |
| (0.7, 1] | marked | features may appear more often, only where natural; ground rules take precedence |

Band limits come from the conversation's use-case ranges and must be revisited
with eval evidence. They are compiler wording, not part of the specification.

## Determinism and change control

- Output is byte-identical for identical inputs; no timestamps or randomness.
- Golden files in `packages/compiler/test/__golden__/` make every wording change a reviewed diff. Update them deliberately (`pnpm vitest run packages/compiler -u`) and explain why in the change.
- Incompatible layout changes bump `INSTRUCTIONS_FORMAT`.

## Targets

| Target | Where | Output |
| --- | --- | --- |
| `markdown` (plain system prompt) | compiler / `vernaculo compile` | Markdown text |
| `openai` | `@vernaculo/openai` / `vernaculo compile --target openai` | Responses API params fragment (`instructions`), optionally composed with agent instructions |
| `skill` | `@vernaculo/skills` / `vernaculo export --target skill` | Agent Skill directory |
| eject | `vernaculo eject` | flattened `persona.yaml` + `instructions.md` + `README.md` |
| MCP resource, Claude, Gemini, local models | — | planned ([provider-adapters.md](provider-adapters.md)) |

Placement matters: compiled instructions go **after** the host agent's own
instructions, and both are stable text — good for provider prompt caching, which
rewards identical static prefixes.
