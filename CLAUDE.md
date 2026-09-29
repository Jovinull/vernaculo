# Vernáculo — instruções para o Claude Code

O Vernáculo é uma especificação + conjunto de ferramentas abertos, self-hosted e
independentes de provedor que adiciona **camadas de linguagem regional** (localização
sociolinguística) a agentes de IA existentes: `agente de negócio + camada de persona
= agente localizado`. Bootstrap inicial: especificação `vernaculo.dev/v1alpha1`,
pacotes e CLI funcionando; **ainda não existe nenhum pack regional real** (só
fixtures sintéticos). Repositório: https://github.com/Jovinull/vernaculo.

## Onde o conhecimento fica

- `docs/` é a **fonte da verdade** (índice: `docs/README.md`). ADRs: `docs/decisions/`.
- `ideia.txt` é a conversa histórica de concepção. Não o releia em tarefas rotineiras; o conteúdo dele foi assimilado (`docs/reference/idea-assimilation.md`). Nunca o edite nem o apague.
- Status do trabalho: `docs/roadmap/roadmap.md`; decisões não resolvidas: `docs/roadmap/open-questions.md`.
- Fatos externos datados (OpenAI, MCP, Agent Skills, Node, licenças): `docs/reference/external-facts.md`.

## Antes de mudar arquitetura, comportamento, formato ou contratos

1. Leia o código que vai mexer e a documentação/ADRs relacionados. Carregue a skill de projeto correspondente (abaixo).
2. Respeite os invariantes (próxima seção). Se uma mudança conflitar com um ADR, pare e proponha um ADR novo em vez de corroer o antigo.
3. Investigue antes de inventar: confira fatos de bibliotecas/APIs na documentação oficial ou no pacote instalado; não confie na memória nem em `ideia.txt` para versões e APIs.

## Invariantes (nunca quebrar sem um ADR novo)

- **Nenhuma infraestrutura do Vernáculo em runtime**: nada de API, backend, banco, conta, chave, proxy, telemetria ou inferência paga pelo mantenedor. Nenhuma chamada de rede, `fetch`, módulo de rede ou SDK de provedor em nenhum pacote (`packages/core/test/architecture.test.ts` verifica isso).
- **Independência de provedor**: `schema`, `core` e `compiler` nunca importam SDKs/tipos de provedores. Direção de dependências: `schema ← core ← compiler ← openai, skills ← cli`. A OpenAI é só o primeiro adapter; MCP e `SKILL.md` são targets, nunca o formato canônico.
- **Compilação determinística, sem LLM**: mesma entrada ⇒ mesmos bytes. Nada de timestamps ou aleatoriedade nas saídas.
- **O formato é neutro de linguagem**: o JSON Schema em `schemas/` é normativo; o Zod o espelha. O significado do formato nunca pode depender de código TypeScript.
- **Só camada de linguagem**: personas nunca descrevem personalidade, humor, inteligência, escolaridade, renda, classe social, profissão, religião, política ou comportamento; a saída renderizada sempre carrega as regras de base (`docs/linguistic/anti-caricature.md`).
- **Evidência antes de afirmações**: nunca chame um pack/saída de validado, natural, representativo, livre de estereótipos ou pronto para produção sem evidência de revisão humana + evals. Nunca invente regionalismos nem conteúdo regional real; dados sintéticos só em `fixtures/`, com `maturity: fixture`.
- **Revisão recomendada, nunca obrigatória** (ADR-0015): sem portões nem limiares de revisão; sempre recomende revisão por falantes para packs `draft` (docs, PRs, dicas da CLI). `reviewed` só quando uma revisão realmente aconteceu.
- **Uma única licença aberta**: código, docs, schemas e conteúdo das personas são Apache-2.0 (ADR-0014); packs da biblioteca declaram `metadata.license: Apache-2.0`. Material de terceiros mantém a própria licença.
- **Sem lock-in**: personas são arquivos portáveis; o `eject` precisa continuar gerando saída autocontida.

## Regra de documentação

**Nenhuma decisão importante pode sobreviver só na conversa.** Na mesma tarefa que
mudar uma decisão, invariante, comportamento público, formato de persona, contrato
da CLI, estrutura de packs, metodologia, compatibilidade, conjunto de adapters ou
roadmap, atualize o documento canônico em `docs/` (crie um e ligue-o em
`docs/README.md` se nenhum servir) e acrescente/substitua um ADR para decisões
estruturais. A documentação descreve o estado atual; o Git guarda o histórico.
Detalhes: `.claude/rules/documentation.md`.

## Idioma (ADR-0016)

- Documentação, ADRs, READMEs, regras, skills, descrições de schema/pacotes e metadados do GitHub: **português brasileiro**.
- Em inglês: identificadores, comentários de código, nomes de testes, mensagens da CLI, o texto de enquadramento das instruções compiladas (lido pelo modelo), códigos estáveis e nomes de arquivos/diretórios.

## Stack

TypeScript 7 (`tsc` nativo; strict, `isolatedDeclarations`, imports com extensão
`.ts`, `erasableSyntaxOnly`), Node 24 LTS no desenvolvimento / pacotes suportam
≥ 22.12, monorepo com pnpm 12 workspaces, Zod 4, `yaml`, Vitest 5, Biome 2, tsdown
(declarações via Oxc), Commander 15, Changesets, GitHub Actions. Só ESM. Versões e
justificativas: `docs/development/stack.md`.

## Comandos

```bash
pnpm install
pnpm check                 # lint + typecheck + testes + build + validate:data (= CI)
pnpm test                  # vitest sobre os fontes (sem build)
pnpm vitest run packages/compiler -u   # atualiza golden files — só para mudanças de redação intencionais
pnpm typecheck             # tsc --noEmit no repositório inteiro
pnpm lint / pnpm lint:fix  # biome
pnpm build                 # tsdown em todos os pacotes
pnpm vernaculo <cmd>       # CLI construída, por exemplo pnpm vernaculo validate --root fixtures/personas
pnpm changeset             # quando o comportamento público de um pacote publicado mudar
```

## Estrutura

- `packages/{schema,core,compiler,openai,skills,cli}` — entrada em `src/index.ts`; `@vernaculo/core/node` concentra o código de sistema de arquivos.
- `schemas/v1alpha1/persona.schema.json` + `schemas/conformance/v1alpha1/` (valid, invalid-schema, invalid-semantic, resolution).
- `fixtures/personas/` personas sintéticas (`pt-BR/x-fixture/...`); `personas/` biblioteca real (vazia); `examples/`.

## Convenções de qualidade

- APIs pequenas e explícitas; nada de abstrações especulativas, pacotes placeholder ou stubs enganosos.
- Erros são `VernaculoError` com códigos de issue estáveis (documentados em `docs/specification/overview.md`); código de biblioteca nunca encerra o processo.
- Os testes cobrem comportamento e invariantes (veja `docs/development/testing.md`); rode `pnpm check` antes de dar o trabalho por concluído.
- Nunca adicione uma dependência sem conferir versão atual, manutenção, engines e licença; respeite a política de idade mínima de release do pnpm (sem exceções à toa).
- Git: nunca faça push, publicação no npm, tag ou release sem instrução explícita.
- Commits: Conventional Commits **em português**, só a linha de assunto (sem corpo), **sem `Co-Authored-By`** nem outros trailers; commits pequenos e separados por assunto (por exemplo `feat(cli): ...`, `docs(spec): ...`).

## Skills do projeto (carregue quando forem relevantes)

- `project-context` — recuperar contexto de produto, arquitetura e decisões com eficiência.
- `documentation-maintenance` — manter docs, ADRs e roadmap em sincronia com uma mudança.
- `persona-specification` — schema, formato, parser, resolvedor, herança, semântica de intensidade.
- `linguistic-research` — criar ou revisar packs regionais (evidência, fontes, licenças, anti-caricatura, revisão humana).
- `evals` — dimensões de avaliação, cenários, rótulos de revisão humana, verificações entre provedores.
- `adapter-development` — adicionar um adapter de provedor ou target de exportação.
- `release-quality` — checklist antes de dar uma mudança por pronta ou publicável.

Mantenha este arquivo curto (< 200 linhas): detalhes ficam em `docs/`, `.claude/rules/` ou nas skills.
