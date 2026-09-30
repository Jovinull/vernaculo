# Pacotes

Todos os pacotes são apenas ESM, têm como alvo Node.js ≥ 22.12, distribuem tipos
`.d.mts` empacotados, compartilham uma única versão (grupo `fixed` do Changesets) e
estão hoje em `0.0.0` (não publicados). O código-fonte de cada pacote fica exposto
ao workspace pela condição de export `@vernaculo/source`, então testes e
typecheck rodam sem build.

| Pacote | Caminho | Depende de | Status |
| --- | --- | --- | --- |
| `@vernaculo/schema` | `packages/schema` | `zod` | feito |
| `@vernaculo/core` | `packages/core` | schema, `yaml` | feito |
| `@vernaculo/compiler` | `packages/compiler` | core, schema | feito |
| `@vernaculo/openai` | `packages/openai` | compiler (tipos) | feito |
| `@vernaculo/skills` | `packages/skills` | compiler, core, `yaml` | feito |
| `vernaculo` (CLI) | `packages/cli` | todos os anteriores, `commander` | feito |
| `@vernaculo/mcp` | — | — | planejado, não criado |
| `@vernaculo/openai-agents`, adapters Anthropic, Gemini e de modelos locais | — | — | planejado/ideia, não criados |

Pacotes que ainda não existem não são criados como esqueleto, de propósito.

## `@vernaculo/schema`

A face TypeScript da especificação.

- `personaJsonSchema` — o JSON Schema canônico (embutido; sem rede).
- `personaDocumentSchema` — espelho em Zod 4, tipado como `z.ZodType<PersonaDocument>`.
- Tipos: `PersonaDocument`, `PersonaMetadata`, `LexicalItem`, `ContextualItem`, `DiscouragedItem`, `DiscourseMarker`, `MorphosyntaxPattern`, `PragmaticForm`, `Example`, `AntiPattern`, `Source`, ...
- Constantes: `API_VERSION`, `MATURITY_LEVELS` (ordenado), `EVIDENCE_LEVELS`, `ANTI_PATTERN_CATEGORIES`, `SOURCE_TYPES`, `SOURCE_USAGES`, `PERSONA_ID_PATTERN`.

## `@vernaculo/core`

Implementa a especificação. Sem provedores e sem rede.

Ponto de entrada principal (independente de runtime):

- `parsePersonaYaml(text, { origin })` → `PersonaDocument` (lança `VernaculoError`).
- `validatePersonaDocument(data)` → `{ ok, document } | { ok: false, issues }` (estrutura + regras do documento).
- `resolvePersona(id, source)` / `resolvePersonaDocument(document, source, origin)` → `ResolvedPersona { document (achatado, canônico), lineage }`.
- `createMemorySource(record)` — uma `PersonaSource` para testes, bundlers e edge runtimes.
- `buildIR(resolved, { intensity })` → `PersonaIR` congelada (com o grupo `corroborated`, tipo `CorroboratedFeatures`); `assertIntensity(value)`.
- `CORROBORATED_MIN_SOURCES` (2) e `CORROBORATED_MIN_INTENSITY` (0.5): os limites normativos do nível `corroborated`.
- `serializePersonaYaml(document, { header })`, `canonicalizeDocument(document)`.
- `VernaculoError` (com `code` e `issues[]`), `IssueCode`, `formatIssue`.

`@vernaculo/core/node`:

- `createDirectorySource(roots)`, `listPersonas(roots)`, `loadPersona(idOuCaminhoYaml, { roots })`, `PERSONA_FILE_NAME`, `DEFAULT_ROOT` (`personas`).

Relação com a API esboçada na conversa: `loadPersona` ✓ (entrada Node),
`resolvePersona` ✓ (a intensidade foi para `buildIR`), `validatePersona` →
`validatePersonaDocument`. A conversa atribuía ao core "herança, composição,
intensidade, validação e resolução dos arquivos": composição entre personas é
herança (core); a composição com as instruções do agente hospedeiro depende do
target e fica nos adapters (`composeInstructions`, `withPersona`), sob o contrato
em [inheritance-and-composition.md](../specification/inheritance-and-composition.md#composição-com-o-agente-hospedeiro).

## `@vernaculo/compiler`

- `compilePersona(resolved, { intensity })` → `CompiledPersona { instructions, metadata }`.
- `compile(ir)`, `renderInstructions(ir)` (Markdown puro), `groundRules(ir)`, `describeIntensity()`, `maturityNotice()`, `UNCONFIRMED_GUIDANCE` (a orientação da seção de formas não confirmadas).
- `INSTRUCTIONS_FORMAT = "vernaculo-instructions/v1alpha1"` — incrementado quando o layout das instruções muda de forma incompatível.

## `@vernaculo/openai`

Adapter fino da Responses API; sem dependência do SDK da OpenAI; sem requisições.

- `withPersona(params, persona)` — cópia dos parâmetros com `instructions` = instruções do agente + camada de persona. Use em toda requisição (veja [provider-adapters.md](provider-adapters.md)).
- `composeInstructions(agentInstructions, persona)`, `developerMessage(persona)`.

## `@vernaculo/skills`

- `exportSkill(ir, { name })` → `{ name, files: [{ path, content }] }` — puro; a CLI grava os arquivos.
- `skillName(personaId)` → `vernaculo-pt-br-ba-salvador`.

## `vernaculo` (CLI)

Comandos e contrato: [reference/cli.md](../reference/cli.md). Entrada de biblioteca:
`run(argv, io)` devolve um código de saída e nunca chama `process.exit` (testável).
