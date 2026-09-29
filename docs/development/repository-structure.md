# Repository structure

```text
vernaculo/
├── CLAUDE.md                  # always-loaded instructions for Claude Code (short)
├── .claude/
│   ├── rules/                 # path-scoped engineering rules for Claude Code
│   └── skills/                # project skills (procedures, loaded when relevant)
├── .changeset/                # Changesets config
├── .github/workflows/ci.yml   # CI: pnpm check on Node 22/24, Linux + Windows
├── docs/                      # canonical documentation (source of truth)
├── schemas/
│   ├── v1alpha1/persona.schema.json   # normative JSON Schema
│   └── conformance/v1alpha1/          # language-neutral conformance suite
├── packages/
│   ├── schema/                # @vernaculo/schema
│   ├── core/                  # @vernaculo/core (+ /node)
│   ├── compiler/              # @vernaculo/compiler
│   ├── openai/                # @vernaculo/openai
│   ├── skills/                # @vernaculo/skills
│   └── cli/                   # vernaculo (CLI)
├── personas/                  # the public persona library (empty: no real pack yet)
├── fixtures/personas/         # SYNTHETIC personas for tests and examples
├── examples/                  # runnable examples (use fixtures)
├── ideia.txt                  # founding conversation (historical record; not a source of truth)
├── LICENSE                    # Apache-2.0
└── package.json, pnpm-workspace.yaml, tsconfig*.json, tsdown.base.ts, vitest.config.ts, biome.json
```

Each package: `src/` (with `index.ts`), `test/`, `package.json`, `tsconfig.json`,
`tsdown.config.ts`. Built output goes to `dist/` (git-ignored).

## Deviations from the layout sketched in the conversation

| Sketch | Now | Reason |
| --- | --- | --- |
| `schemas/persona.schema.json` (early: `spec/persona.schema.json`) | `schemas/v1alpha1/persona.schema.json` | one directory per spec version, with its conformance suite |
| `personas/pt-BR/{base,ba/salvador,se/aracaju,pe/recife,sp/sao-paulo}` | `personas/README.md` only | no pack is researched yet; no placeholder packs |
| `packages/mcp` "posteriormente" | not created | future work; documented instead of scaffolded |
| `packages/eval` (early sketch) | not created | no eval runner yet; strategy documented |
| `evals/` | not created | created with the first real eval suite |
| `examples/{openai, openai-agents, raw-prompt, skill}` | `examples/openai`, `examples/project-persona`, commands in `examples/README.md` | only runnable examples; raw prompt and skill are single CLI commands |
| — | `fixtures/personas` | shared synthetic data, kept apart from the library so it can never be mistaken for real packs |
| — | `schemas/conformance/` | makes the specification implementable in other languages |

## Documentation language

Repository documentation and code are in **English** (international open source
audience; the conversation's proposed README definition was in English).
Reviewer-facing material for a variety (e.g. review labels) uses that variety's
language. This is a bootstrap convention; changing it is a maintainer decision.
