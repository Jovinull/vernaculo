# Stack técnica

As versões foram conferidas no registry do npm e em fontes oficiais em
**2026-09-29**. Não copie versões de `ideia.txt`; confira de novo antes de atualizar.

## Runtime e linguagem

| Escolha | Versão | Observações |
| --- | --- | --- |
| Node.js (desenvolvimento) | 24 LTS "Krypton" (`.node-version`) | o Node 22 "Jod" é LTS de manutenção; o Node 26 é "Current" até virar LTS |
| Node.js (pacotes publicados) | ≥ 22.12 (`engines`) | o Commander 15 exige ≥ 22.12; o tsdown precisa de ≥ 22.18 só para o *build* |
| TypeScript | 7.0.2 | o compilador nativo (em Go). Strict por padrão; sem API programática do compilador até a 7.1 — veja abaixo |
| Formato de módulos | apenas ESM, saídas `.mjs` + `.d.mts` | `"type": "module"` em todo lugar |

Configurações do TypeScript (`tsconfig.base.json`): `strict`, `noUncheckedIndexedAccess`,
`isolatedDeclarations`, `verbatimModuleSyntax`, `erasableSyntaxOnly`,
`module: preserve` + `moduleResolution: bundler`, `allowImportingTsExtensions`
(os imports usam extensão `.ts`), `customConditions: ["@vernaculo/source"]`.

Por que `isolatedDeclarations`: o TS 7 não tem API do compilador em JS, então o
empacotamento das declarações usa o Oxc (rápido e estável) em vez do caminho
experimental do tsgo; além disso, ele obriga tipos explícitos em todo export, o que
mantém as APIs públicas deliberadas.

Por que `erasableSyntaxOnly` + imports `.ts`: os arquivos-fonte continuam executáveis
diretamente pela remoção de tipos do Node (por exemplo, `examples/openai`).

## Ferramentas

| Ferramenta | Versão | Papel |
| --- | --- | --- |
| pnpm | 12.8.1 (`packageManager`) | workspaces; a política padrão de supply chain rejeita releases mais novos que a idade mínima configurada — não adicione exceções sem motivo |
| tsdown | 0.23.0 | build de cada pacote (Rolldown + declarações via Oxc); configuração compartilhada em `tsdown.base.ts` |
| Vitest | 5.0.2 (+ Vite 8.3.1 como peer) | testes, executados sobre os fontes pela condição `@vernaculo/source` |
| Biome | 2.5.14 | lint + formatação (`biome.json`) |
| Changesets | CLI 3.0.3 | versionamento; grupo `fixed` para todos os pacotes publicados |
| Ajv | 8.20.0 (só em dev) | valida os fixtures de conformidade contra o JSON Schema canônico (draft 2020-12) |
| GitHub Actions | checkout v7, setup-node v7, pnpm/action-setup v6 | CI (`.github/workflows/ci.yml`) |

## Dependências de runtime dos pacotes publicados

| Pacote | Dependência | Por quê |
| --- | --- | --- |
| `@vernaculo/schema` | `zod` ^4.6.5 | validação tipada em runtime espelhando o JSON Schema |
| `@vernaculo/core`, `@vernaculo/skills` | `yaml` ^2.9.1 | parse de YAML 1.2 com detecção de chaves duplicadas; serialização segura para YAML 1.1 |
| `vernaculo` (CLI) | `commander` ^15.0.0 | parse de comandos |

Deliberadamente **não** usados (ainda):

- `@clack/prompts` (1.8.1 disponível): faz parte da stack pretendida para fluxos interativos na CLI; nenhum comando atual é interativo, então não está instalado. Entra com o primeiro comando interativo (por exemplo, `add`).
- SDK `openai`: só o exemplo depende dele (fixado na 7.23.0); `@vernaculo/openai` usa tipos estruturais.
- `@openai/agents` (0.18.0), `@modelcontextprotocol/server` (MCP SDK v2): apenas para adapters futuros.
- Qualquer framework web (Next.js etc.), banco de dados ou toolchain de Rust ([ADR-0004](../decisions/0004-typescript-reference-implementation.md), [ADR-0008](../decisions/0008-git-and-filesystem-no-database.md)).

## A stack decidida na conversa vs. agora

| Conversa | Agora |
| --- | --- |
| TypeScript, Node LTS, pnpm workspaces | igual |
| Personas em YAML + Markdown, JSON Schema | igual; o JSON Schema é escrito à mão e normativo |
| Zod 4 | igual (espelho do JSON Schema) |
| CLI com TypeScript + Commander + @clack/prompts | Commander agora; Clack quando surgirem comandos interativos |
| Vitest, Biome, tsdown | igual |
| GitHub Actions; Changesets + npm + GitHub Releases | CI configurado; Changesets configurado; publicação manual e ainda não feita |
| OpenAI Responses API / Agents SDK primeiro | adapter da Responses feito; adapter do Agents SDK é uma ideia |
| Agent Skills (`SKILL.md`) | exportador feito |
| MCP TypeScript SDK v2, depois | depois |
| Sem infraestrutura, sem banco, sem backend | igual (verificado por testes) |
