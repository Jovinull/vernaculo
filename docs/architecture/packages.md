# Packages

All packages are ESM-only, target Node.js ≥ 22.12, ship bundled `.d.mts` types,
share one version (Changesets `fixed` group) and are currently `0.0.0`
(unpublished). Each package's source is exposed to the workspace through the
`@vernaculo/source` export condition, so tests and typechecking run without a
build.

| Package | Path | Depends on | Status |
| --- | --- | --- | --- |
| `@vernaculo/schema` | `packages/schema` | `zod` | done |
| `@vernaculo/core` | `packages/core` | schema, `yaml` | done |
| `@vernaculo/compiler` | `packages/compiler` | core, schema | done |
| `@vernaculo/openai` | `packages/openai` | compiler (types) | done |
| `@vernaculo/skills` | `packages/skills` | compiler, core, `yaml` | done |
| `vernaculo` (CLI) | `packages/cli` | all of the above, `commander` | done |
| `@vernaculo/mcp` | — | — | planned, not created |
| `@vernaculo/openai-agents`, Anthropic, Gemini, local-model adapters | — | — | planned/idea, not created |

Packages that do not exist yet are deliberately not scaffolded.

## `@vernaculo/schema`

The TypeScript face of the specification.

- `personaJsonSchema` — the canonical JSON Schema (bundled; no network).
- `personaDocumentSchema` — Zod 4 mirror, typed as `z.ZodType<PersonaDocument>`.
- Types: `PersonaDocument`, `PersonaMetadata`, `LexicalItem`, `ContextualItem`, `DiscouragedItem`, `DiscourseMarker`, `MorphosyntaxPattern`, `PragmaticForm`, `Example`, `AntiPattern`, `Source`, ...
- Constants: `API_VERSION`, `MATURITY_LEVELS` (ordered), `EVIDENCE_LEVELS`, `ANTI_PATTERN_CATEGORIES`, `SOURCE_TYPES`, `SOURCE_USAGES`, `PERSONA_ID_PATTERN`.

## `@vernaculo/core`

Implements the specification. Provider-free and network-free.

Main entry (runtime-agnostic):

- `parsePersonaYaml(text, { origin })` → `PersonaDocument` (throws `VernaculoError`).
- `validatePersonaDocument(data)` → `{ ok, document } | { ok: false, issues }` (structure + document-level rules).
- `resolvePersona(id, source)` / `resolvePersonaDocument(document, source, origin)` → `ResolvedPersona { document (flattened, canonical), lineage }`.
- `createMemorySource(record)` — a `PersonaSource` for tests, bundlers, edge runtimes.
- `buildIR(resolved, { intensity })` → frozen `PersonaIR`; `assertIntensity(value)`.
- `serializePersonaYaml(document, { header })`, `canonicalizeDocument(document)`.
- `VernaculoError` (with `code` and `issues[]`), `IssueCode`, `formatIssue`.

`@vernaculo/core/node`:

- `createDirectorySource(roots)`, `listPersonas(roots)`, `loadPersona(idOrYamlPath, { roots })`, `PERSONA_FILE_NAME`, `DEFAULT_ROOT` (`personas`).

Mapping to the API sketched in the conversation: `loadPersona` ✓ (Node entry),
`resolvePersona` ✓ (intensity moved to `buildIR`), `validatePersona` →
`validatePersonaDocument`. The conversation gave the core "inheritance,
composition, intensity, validation and file resolution": persona-to-persona
composition is inheritance (core); composition with the host agent's
instructions is target-specific and lives in adapters (`composeInstructions`,
`withPersona`) under the contract in
[inheritance-and-composition.md](../specification/inheritance-and-composition.md#composition-with-the-host-agent).

## `@vernaculo/compiler`

- `compilePersona(resolved, { intensity })` → `CompiledPersona { instructions, metadata }`.
- `compile(ir)`, `renderInstructions(ir)` (pure Markdown), `groundRules(ir)`, `describeIntensity()`, `maturityNotice()`.
- `INSTRUCTIONS_FORMAT = "vernaculo-instructions/v1alpha1"` — bumped when the layout of instructions changes incompatibly.

## `@vernaculo/openai`

Thin Responses API adapter; no OpenAI SDK dependency; no requests.

- `withPersona(params, persona)` — copy of params with `instructions` = agent instructions + persona layer. Use on every request (see [provider-adapters.md](provider-adapters.md)).
- `composeInstructions(agentInstructions, persona)`, `developerMessage(persona)`.

## `@vernaculo/skills`

- `exportSkill(ir, { name })` → `{ name, files: [{ path, content }] }` — pure; the CLI writes it.
- `skillName(personaId)` → `vernaculo-pt-br-ba-salvador`.

## `vernaculo` (CLI)

Commands and contract: [reference/cli.md](../reference/cli.md). Library entry:
`run(argv, io)` returns an exit code and never calls `process.exit` (testable).
