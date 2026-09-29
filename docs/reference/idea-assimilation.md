# Assimilação de `ideia.txt`

`ideia.txt` (raiz do repositório) é a conversa bruta de concepção do projeto. Ele é
mantido sem alterações como **registro histórico**. Desde o bootstrap (2026-09-29),
[`docs/`](../README.md) é a fonte da verdade; ninguém deveria precisar reler
`ideia.txt` para trabalhar no projeto.

Esta página mostra que todo ponto relevante da conversa foi levado para a
documentação canônica, e como. Ela é um **retrato do bootstrap**: quando decisões
mudam depois, atualize os documentos canônicos (e os ADRs), não esta tabela — exceto
para corrigir um erro de mapeamento. A tradução para o português
([ADR-0016](../decisions/0016-documentation-in-portuguese.md)) não alterou o
mapeamento.

Valores de status: **Decisão** (tomada), **Requisito**, **Princípio**, **Futuro**
(ideia ou planejado para depois), **Substituído** (trocado mais tarde na conversa ou
no bootstrap), **Ilustrativo** (exemplo, não requisito), **Fato externo** (afirmação
sobre o mundo; status de verificação indicado), **Em aberto** (não resolvido).

Os números de linha se referem a `ideia.txt`.

## 1. Enquadramento do produto e posicionamento

| Tema | Linhas | Status | Documento canônico |
| --- | --- | --- | --- |
| Não é um "MCP de sotaques" nem uma coleção de prompts: um padrão + runtime para personas sociolinguísticas, começando pelo pt-BR | 1–5 | Decisão | [vision.md](../product/vision.md), [ADR-0006](../decisions/0006-mcp-future-adapter-not-canonical.md) |
| "Regional Persona Packs" / "Regional Style Packs", não personalidades | 7–11 | Decisão (terminologia) | [regional-packs.md](../linguistic/regional-packs.md), [glossary.md](glossary.md) |
| Tabela de camadas: idioma, região, estado, localidade, registro, intensidade, papel, domínio, marca, regras da empresa | 13–24 | Princípio | [architecture/overview.md](../architecture/overview.md#camadas-conceituais-de-um-agente-localizado) |
| Composição Salvador vs. Recife a 0.35 com o mesmo agente comercial | 26–48 | Ilustrativo | [use-cases.md](../product/use-cases.md) |
| Evitar arquivos de prompt por combinação (`honda-baiano-prompt.txt`...) | 50 | Decisão | [ADR-0009](../decisions/0009-regional-layer-separate-from-agent-role.md) |
| Concorrência: formatos genéricos de persona (PERSONA.md/Personaxis, Character Cards, PersonaNexus); não competir como formato universal de personalidade; nicho = localização sociolinguística | 249–265 | Decisão (posicionamento); Fato externo (não verificado) | [vision.md](../product/vision.md), [sources.md](../linguistic/sources.md#projetos-relacionados-posicionamento-não-fontes) |
| Recomendação final: framework open source de localização sociolinguística para agentes | 423–427 | Decisão | [vision.md](../product/vision.md) |
| Infraestrutura que empresas conseguem colocar em produção (não "uma coleção legal de prompts") | 474 | Princípio | [vision.md](../product/vision.md) |
| Produto principal = Persona Specification + biblioteca pública de personas; a OpenAI é só o primeiro adapter | 1643–1645 | Decisão | [vision.md](../product/vision.md), [ADR-0002](../decisions/0002-provider-agnostic-specification-and-core.md) |
| Patrimônio: especificação aberta, packs regionais, compilador, evals | 1089 | Princípio | [vision.md](../product/vision.md) |

## 2. Nome e identidade

| Tema | Linhas | Status | Documento canônico |
| --- | --- | --- | --- |
| Nome **Vernáculo**; `vernaculo` para pacotes/CLI; não limitado ao Brasil | 478, 1070 | Decisão | [vision.md](../product/vision.md#nome) |
| Evitar "Sotaque" (projeto open source brasileiro existente) | 478 | Decisão; Fato externo (existe um projeto "Sotaque Brasileiro") | [vision.md](../product/vision.md#nome), [sources.md](../linguistic/sources.md) |
| Slogans "Local personas for AI agents", "Local language. Local identity. Any AI." | 480, 1082–1087 | Ilustrativo (proposta) | [vision.md](../product/vision.md#nome) |
| Definição do README ("open-source, self-hosted persona layer...", sem alterar nem fazer fine-tuning de modelos, com o próprio provedor ou rodando localmente) | 1074–1080 | Decisão (adaptada com redação anti-caricatura) | [README.md](../../README.md) |
| Nomes anteriores `personabr`, `regional-personas`, `@regional-personas/*`, `regionalpersona.dev` | 103–106, 274, 333–352, 122 | Substituído | [cli.md](cli.md#mudanças-em-relação-aos-esboços-da-conversa), [persona-format.md](../specification/persona-format.md#histórico-do-formato-da-conversa-de-concepção) |

## 3. Infraestrutura zero, distribuição e lock-in

| Tema | Linhas | Status | Documento canônico |
| --- | --- | --- | --- |
| Mudança de rumo: nenhum serviço; distribuir personas como código/dados; o usuário instala e conecta o próprio provedor | 476 | Decisão | [ADR-0001](../decisions/0001-no-vernaculo-infrastructure-at-runtime.md) |
| Nenhuma requisição passa pelo mantenedor; nenhuma API, banco, servidor, autenticação, conta ou custo de tokens | 506–518, 554 | Decisão | [zero-infrastructure.md](../architecture/zero-infrastructure.md) |
| Princípio "Vernáculo must not require Vernáculo infrastructure at runtime" (EN/PT) | 924–930 | Decisão | [ADR-0001](../decisions/0001-no-vernaculo-infrastructure-at-runtime.md), [principles.md](../product/principles.md) |
| Nenhuma API hospedada, telemetria, chave, banco, SaaS, backend ou IA executada pelo mantenedor; GitHub + Actions para CI; GH Pages opcional; npm/PyPI só para distribuição | 932–945 | Decisão | ADR-0001, [distribution.md](../architecture/distribution.md) |
| 1 milhão de instalações → R$ 0 de custo de inferência; GitHub/npm absorvem a distribuição | 947–951 | Princípio | [zero-infrastructure.md](../architecture/zero-infrastructure.md) |
| API key do próprio usuário (`OPENAI_API_KEY`), nunca do projeto | 540–554, 1340–1346 | Decisão | [ADR-0005](../decisions/0005-openai-responses-first-adapter.md) |
| Funcionar sem SDK — "não deveria exigir Node, Python ou sequer instalar biblioteca": baixar a pasta de um pack para o projeto | 558–580 | Requisito (parcialmente atendido: skills exportadas e arquivos ejetados não precisam de runtime; artefatos prontos nos releases da biblioteca estão planejados) | [distribution.md](../architecture/distribution.md#três-modos-de-consumo), [roadmap.md](../roadmap/roadmap.md) |
| Três formas de uso: Pack, Skill, SDK | 582–595 | Decisão | [distribution.md](../architecture/distribution.md#três-modos-de-consumo), [use-cases.md](../product/use-cases.md) |
| Se o projeto desaparecer, as aplicações continuam funcionando | 685–689 | Requisito | ADR-0001 |
| Instalação via `git clone`, `npx`, `curl`; sem marketplace nem registry; GitHub, Releases, npm | 693–725 | Decisão | [ADR-0008](../decisions/0008-git-and-filesystem-no-database.md) |
| Sem banco de dados; Git + sistema de arquivos | 1478–1521 | Decisão | ADR-0008 |
| Atualizações via `pnpm update @vernaculo/personas` ou `vernaculo update` | 1509–1519 | Futuro / Em aberto | [open-questions.md](../roadmap/open-questions.md) (OQ-04) |
| `eject`: materializar tudo no projeto, removendo a dependência; zero lock-in | 1025–1036 | Requisito (implementado) | [distribution.md](../architecture/distribution.md#eject--deixando-o-vernáculo-para-trás), [cli.md](cli.md) |
| LLMs locais (Ollama + Qwen/Llama/Gemma), sem internet, no design desde o início | 955–989 | Requisito (design); adapter Futuro | [zero-infrastructure.md](../architecture/zero-infrastructure.md#local-por-design), [provider-adapters.md](../architecture/provider-adapters.md) |

## 4. Arquitetura e provedores

| Tema | Linhas | Status | Documento canônico |
| --- | --- | --- | --- |
| O modelo não deve decidir se vai "usar Bahia"; a aplicação aplica a persona de forma determinística | 56–58 | Decisão (justificativa) | [ADR-0006](../decisions/0006-mcp-future-adapter-not-canonical.md) |
| Pipeline Persona Spec → Compiler → Provider Adapter → provedores | 62–70 | Decisão (refinada: parser/resolvedor → IR → compilador → target) | [architecture/overview.md](../architecture/overview.md), [ADR-0002](../decisions/0002-provider-agnostic-specification-and-core.md) |
| MCP opcional depois: `persona://br/ba/salvador`, `persona.list/get/render` | 72–90 | Futuro; forma de URI Substituída por `vernaculo://pt-BR/...` | ADR-0006 |
| MCP na v0.2/v0.3: `@vernaculo/mcp`, recursos `vernaculo://`, `npx @vernaculo/mcp` via stdio, 100% local | 1424–1474 | Futuro | ADR-0006, [roadmap.md](../roadmap/roadmap.md) |
| MCP SDK v2 suporta Node/Bun/Deno, tools/resources/prompts; especificação 2026-07-28 | 1116, 1428 | Fato externo (verificado) | [external-facts.md](external-facts.md) |
| TypeScript, core totalmente independente da OpenAI | 271 | Decisão | [ADR-0004](../decisions/0004-typescript-reference-implementation.md), ADR-0002 |
| Começar pela OpenAI | 326–344 | Decisão | [ADR-0005](../decisions/0005-openai-responses-first-adapter.md) |
| Adapters futuros: anthropic, google, mcp, skills | 346–353 | Futuro (skills antecipadas) | [provider-adapters.md](../architecture/provider-adapters.md) |
| OpenAI Agents SDK tem `Model`/`ModelProvider` para provedores externos | 355 | Fato externo (não verificado de novo) | [external-facts.md](external-facts.md) |
| Trecho do primeiro adapter (`loadPersona`, `compilePersona`, `responses.create`, modelo `gpt-5.6-luna`) | 303–318 | Ilustrativo (nome de modelo não verificado, não usado) | [provider-adapters.md](../architecture/provider-adapters.md) |
| `instructions`/mensagens de developer guardam comportamento e estilo | 320 | Fato externo (verificado) | external-facts.md |
| Com `previous_response_id`, as `instructions` não são reaplicadas; o adapter precisa garantir a persona em cada chamada | 322 | Requisito; Fato externo (verificado) | ADR-0005, `withPersona` |
| `@vernaculo/openai` fino: `vernaculo(id, {intensity})` → `persona.instructions` | 1305–1346 | Decisão (formato da API adaptado: `withPersona`, `composeInstructions`) | [packages.md](../architecture/packages.md#vernaculoopenai) |
| `@vernaculo/openai-agents` separado; nunca `@openai/agents` no core | 1350–1384 | Decisão / Futuro | [provider-adapters.md](../architecture/provider-adapters.md) |
| `@vernaculo/core`: `loadPersona`, `resolvePersona`, `validatePersona`; só herança, composição, intensidade, validação e resolução de arquivos; não conhece provedores | 1164–1184 | Decisão (composição com o agente hospedeiro foi para os adapters, documentado) | [packages.md](../architecture/packages.md#vernaculocore) |
| Compilador: persona → IR → OpenAI / SKILL.md / Markdown / Claude / Gemini / recurso MCP; `compile(persona, {target, intensity, register})` → `{instructions, metadata}` | 1252–1291 | Decisão (registro adiado) | [compilation.md](../architecture/compilation.md) |
| O compilador nunca chama IA; determinístico; R$ 0 | 1293–1301 | Decisão | [ADR-0011](../decisions/0011-deterministic-llm-free-compilation.md) |
| Fluxo: pack (perfil, exemplos, antipadrões, proveniência, evals) → compilador → OpenAI / Agent Skill / MCP → Claude/Gemini | 433–448 | Decisão | [architecture/overview.md](../architecture/overview.md) |
| O Agents SDK roda na aplicação do desenvolvedor e consegue usar servidores MCP locais via stdio; futuros consumidores MCP Claude/Gemini/Codex/Cursor | 1372, 1474, 1619–1620 | Fato externo (não verificado de novo) / Futuro | [provider-adapters.md](../architecture/provider-adapters.md), [external-facts.md](external-facts.md) |
| Diagrama final da stack | 1593–1621 | Decisão | [architecture/overview.md](../architecture/overview.md), [stack.md](../development/stack.md) |

## 5. Skills

| Tema | Linhas | Status | Documento canônico |
| --- | --- | --- | --- |
| Skills fazem sentido como formato de exportação; a OpenAI suporta Agent Skills (padrão aberto) | 94–98 | Decisão; Fato externo (suporte da OpenAI não verificado de novo) | [ADR-0007](../decisions/0007-agent-skills-early-export-target.md) |
| "Uma persona, vários runtimes" | 111 | Princípio | [vision.md](../product/vision.md) |
| Skill autocontida com `SKILL.md`; rascunho de texto do SKILL.md (sem "Bahian person" estereotipado; o que a regionalidade afeta e o que não implica — personalidade, inteligência, profissão, status socioeconômico, visão política, comportamento; preservar o papel do pai) | 729–787 | Decisão (o texto virou as regras de base do compilador, incluindo "classe social"; "ritmo conversacional" ainda não modelado, OQ-12) | [anti-caricature.md](../linguistic/anti-caricature.md), [compilation.md](../architecture/compilation.md) |
| **Agent Skills no MVP** ("isso eu mudaria") — saída do exportador `SKILL.md`, `references/{vocabulary,discourse,pragmatics,sources}.md`, `assets/examples.yaml`; sem precisar instalar o core | 1388–1420 | Decisão (substitui "skills depois"); implementado com `references/examples.md` em vez de `assets/examples.yaml` | ADR-0007, [packages.md](../architecture/packages.md#vernaculoskills) |
| Skill usada a partir de um `AGENT.md` com "Regional intensity: 0.30" | 635–646 | Ilustrativo / Em aberto (intensidade em runtime nas skills) | [use-cases.md](../product/use-cases.md), OQ-07 |

## 6. Especificação e formato

| Tema | Linhas | Status | Documento canônico |
| --- | --- | --- | --- |
| Formato declarativo; rascunho 1 (`regionalpersona.dev/v1`, `RegionalPersona`, `br.ba.salvador`, scope/register, style, constraints, examples, provenance, review) | 115–181 | Substituído (pelo rascunho 2 e pela v1alpha1) | [persona-format.md](../specification/persona-format.md#histórico-do-formato-da-conversa-de-concepção) |
| O formato não é o prompt; o compilador escreve as melhores instruções para cada modelo | 183–189 | Decisão | [specification/overview.md](../specification/overview.md), ADR-0003 |
| Rascunho 2 (`vernaculo.dev/v1`, `Persona`, `pt-BR/ba/salvador`, camelCase, constraints, provenance) | 1188–1232 | Decisão (base da v1alpha1, com mudanças documentadas) | persona-format.md |
| Formato = YAML + Markdown + JSON Schema, sem dono em TypeScript nem em provedor; utilizável sem SDK | 1091 | Decisão | [ADR-0003](../decisions/0003-yaml-markdown-json-schema-format.md) |
| O JSON Schema define o que é uma persona; parsers em Python, Rust, Go, Java, C# | 1234–1248 | Requisito (implementado: schema normativo + suíte de conformidade) | [specification/overview.md](../specification/overview.md#conformidade) |
| Sobrescrita pelo usuário: `extends`, intensidade, `override.vocabulary.discouraged`; `honda-salvador.yaml` herdando e acrescentando regras | 889–918 | Requisito; bloco `override:` Substituído por regras de merge | [inheritance-and-composition.md](../specification/inheritance-and-composition.md) |
| Esquemas de id `br.ba.salvador` → `br/ba/salvador` → `pt-BR/ba/salvador` (e um caminho inconsistente `pt-BR/br/ba/salvador`) | 126, 77, 1197, 570 | Substituído → `pt-BR/ba/salvador` | [specification/overview.md](../specification/overview.md#identificadores) |
| Constraints `avoidCaricature`, `avoidStereotypes`, `preserveParentRole`, `preserveTaskAccuracy`, `never_invent_regionalisms` | 163–167, 1224–1228 | Decisão, remodelada: regras de base normativas em vez de flags desligáveis | [anti-caricature.md](../linguistic/anti-caricature.md), persona-format.md |

## 7. Sociolinguística e anti-caricatura

| Tema | Linhas | Status | Documento canônico |
| --- | --- | --- | --- |
| Nunca modelar `relaxed`, `humorous`, `likes_to_talk`... (caricatura) | 193–206 | Decisão | [ADR-0010](../decisions/0010-observable-sociolinguistic-features-only.md), [anti-caricature.md](../linguistic/anti-caricature.md) |
| Descrever fenômenos linguísticos observáveis, não traços psicológicos | 208 | Princípio | ADR-0010 |
| "baiano" é amplo demais: variação geográfica/multidimensional do ALiB; continuidades BA–SE | 210 | Fato externo (ALiB verificado) / Princípio | [methodology.md](../linguistic/methodology.md#granularidade) |
| Variedades possíveis `br/ba/salvador`, `br/ba/recôncavo`, `br/ba/sul`, `br/se/aracaju`, `br/se/interior` | 212–227 | Ilustrativo (não inventadas como packs; slugs ASCII decididos) | [regional-packs.md](../linguistic/regional-packs.md), [ADR-0013](../decisions/0013-explicit-inheritance.md) |
| Credibilidade acadêmica e técnica | 229 | Princípio | [methodology.md](../linguistic/methodology.md) |
| "O agente não vira um baiano": continua sendo o agente de negócio, com uma camada de linguagem | 472 | Decisão | [ADR-0009](../decisions/0009-regional-layer-separate-from-agent-role.md), regra de base 4 |
| Persona como "middleware comportamental" | 824 | Termo Substituído → "camada de linguagem" | ADR-0009, [glossary.md](glossary.md) |
| Composição: nada de `pizzaria-baiano`, `banco-baiano`...; Honda Agent + Salvador; Banking + Recife | 791–826 | Decisão | ADR-0009, [use-cases.md](../product/use-cases.md) |

## 8. Fontes de pesquisa e licenciamento

| Tema | Linhas | Status | Documento canônico |
| --- | --- | --- | --- |
| ALiB: 25 capitais + 225 localidades do interior | 237 | Fato externo (verificado) | [sources.md](../linguistic/sources.md) |
| NURC: fala urbana de Recife, Salvador, Rio, São Paulo, Porto Alegre; várias dimensões | 239 | Fato externo (verificado) | sources.md |
| MuPe-Diversidades: amostras de fala, incluindo PE, AL, SE, SP | 241 | Fato externo (verificado; licença **CC BY-NC-ND 4.0**) | sources.md |
| "Projeto SOTAQUE", CDLA-Permissive-2.0; voz como evolução posterior | 243 | Fato externo **não verificado** (existe outro projeto, "Sotaque Brasileiro", GPL-3.0); voz = Futuro | sources.md, [roadmap.md](../roadmap/roadmap.md) |
| Nem todo material acadêmico é redistribuível; conferir cada licença; usar como base metodológica | 245 | Requisito | [ADR-0012](../decisions/0012-apache-2-0-code-license.md), [provenance.md](../specification/provenance.md) |
| Apache-2.0 para o código | 934 | Decisão | ADR-0012, `LICENSE` |

## 9. Intensidade

| Tema | Linhas | Status | Documento canônico |
| --- | --- | --- | --- |
| Níveis de intensidade leve/moderada/forte | 20 | Substituído pela escala numérica | [regional-intensity.md](../specification/regional-intensity.md) |
| Intensidade como conceito de primeira classe, 0.0–1.0, neutro → muito marcado | 830–851 | Requisito (implementado) | regional-intensity.md |
| Faixas: comercial 0.15–0.35, jogo 0.40–0.70, experimento 0.80+ | 853–869 | Orientação ilustrativa (provisória) | regional-intensity.md, [compilation.md](../architecture/compilation.md) |
| Não é "mais *oxente*": ajustar frequência de léxico, sintaxe, marcadores, formas de tratamento, pragmática, ritmo, regionalismos | 871–885 | Requisito (parcialmente implementado: filtragem + orientação; calibração Em aberto) | regional-intensity.md, OQ-11 |
| `regional_marker_frequency: low` (style do rascunho 1) | 161 | Substituído pela intensidade | persona-format.md |

## 10. Evals e revisão humana

| Tema | Linhas | Status | Documento canônico |
| --- | --- | --- | --- |
| Os evals são o que pode tornar o projeto uma referência | 389–393 | Princípio | [evals/strategy.md](../evals/strategy.md) |
| Dimensões: fidelidade regional, naturalidade, fidelidade à tarefa, vazamento de estereótipos, excesso, estabilidade entre modelos | 395–404 | Requisito | [evals/dimensions.md](../evals/dimensions.md), [cross-provider.md](../evals/cross-provider.md) |
| Rótulos de falantes nativos: natural, exagerado, não reconheço, outra região, ofensivo/caricato, "isso realmente usamos" | 406–415 | Requisito | [human-review.md](../linguistic/human-review.md#rótulos) |
| Um dataset valioso nasce do feedback | 417 | Futuro | [roadmap.md](../roadmap/roadmap.md) |
| Fim do Evals hospedado da OpenAI → Promptfoo; manter os evals locais/no CI desde o início | 419 | Fato externo (verificado) + Decisão | evals/strategy.md, OQ-03 |
| Cada pack: intensidade configurável, fontes, exemplos positivos e negativos, testes automáticos, revisão humana | 429 | Requisito (a revisão ficou recomendada, não obrigatória — ADR-0015) | [regional-packs.md](../linguistic/regional-packs.md) |

## 11. Fatos do ecossistema da OpenAI que moldaram o design

| Tema | Linhas | Status | Documento canônico |
| --- | --- | --- | --- |
| Prompts de produção versionados no código, com testes/fixtures/revisão no Git; prompt objects desligados em 2026-11-30 | 361–363 | Fato externo (verificado) | [external-facts.md](external-facts.md), [persona-lifecycle.md](../architecture/persona-lifecycle.md) |
| `persona.yaml → Git → PR → CI → evals → release` | 365–381 | Decisão | persona-lifecycle.md |
| Prefixo estável da persona ajuda o cache de prompt | 383 | Fato externo (orientação verificada) / Design | [compilation.md](../architecture/compilation.md) |
| Não projetar em torno de fine-tuning (portabilidade; fine-tuning fechado para novos usuários) | 385 | Decisão; Fato externo (verificado) | [ADR-0011](../decisions/0011-deterministic-llm-free-compilation.md), [scope.md](../product/scope.md) |

## 12. Escopo, packs, CLI e stack

| Tema | Linhas | Status | Documento canônico |
| --- | --- | --- | --- |
| Packs da v0.1: Salvador/BA, Aracaju/SE, Recife/PE, São Paulo/SP; não os 27 estados | 429, 993–1002 | Decisão (direção; pesquisa não iniciada) | [regional-packs.md](../linguistic/regional-packs.md), [roadmap.md](../roadmap/roadmap.md) |
| Software da v0.1: `@vernaculo/core`, `@vernaculo/openai`, CLI `vernaculo` (+ exportador de skills, pelas linhas 1388–1420) | 1004–1010 | Decisão (implementado, mais os pacotes schema/compiler) | [packages.md](../architecture/packages.md) |
| CLI `list`, `add`, `inspect`, `compile --provider openai --intensity`, `eject` | 1012–1026 | Decisão (`add` planejado; `--provider` → `--target`) | [cli.md](cli.md) |
| CLI `search brasil`, `add`, `npx vernaculo add`; copia arquivos | 656–683 | Futuro | cli.md, OQ-04 |
| `vernaculo install` em `skills/vernaculo/...` | 616–633 | Substituído por `add` | cli.md |
| Targets de exportação `openai-skill`, `claude-skill`, `system-prompt`, `mcp` | 102–107 | Substituído / Futuro | cli.md |
| Estrutura de pack autocontido (`knowledge/`, `examples/`, `evals/`, `SOURCES.md`, `SKILL.md`) | 564–578, 733–758 | Em aberto (a v1alpha1 usa um único `persona.yaml`; `SKILL.md` gerado) | [regional-packs.md](../linguistic/regional-packs.md#estrutura), OQ-06 |
| Idiomas e variedades futuras (`en-US/ny/new-york`, `en-US/tx`, `en-GB/london`, `es-AR/buenos-aires`, `es-MX/cdmx`, `pt-PT/lisboa`) | 1046–1060 | Futuro | regional-packs.md |
| Registros como subcaminhos (`.../customer-service`, `casual`, `formal`) | 1062–1068 | Futuro / Em aberto | OQ-05 |
| Stack: TypeScript, Node LTS, pnpm, YAML+Markdown, JSON Schema, Zod 4, Commander + @clack/prompts, Vitest, Biome, tsdown, GH Actions, Changesets + npm + GH Releases, OpenAI primeiro, Agent Skills, MCP SDK v2 depois, sem infra/banco/backend | 1093–1114, 1623–1641 | Decisão (versões verificadas de novo; Clack adiado até haver comando interativo) | [stack.md](../development/stack.md) |
| Estrutura do monorepo (pacotes core/schema/compiler/cli/openai/skills/mcp-depois; personas; schemas; evals; docs; examples) | 1118–1162 | Decisão (ajustada, diferenças documentadas) | [repository-structure.md](../development/repository-structure.md) |
| Estrutura inicial com `packages/eval` e `spec/` | 273–301 | Substituído | repository-structure.md |
| Sem Next.js; futuro site estático de documentação (Astro + Starlight, GitHub/Cloudflare Pages) | 1525–1549 | Decisão / Futuro | [scope.md](../product/scope.md), roadmap.md |
| Rust: não agora; talvez um core em Rust ou binário único se surgir necessidade real; o problema é dado, especificação, compatibilidade e evals | 1553–1589 | Decisão | [ADR-0004](../decisions/0004-typescript-reference-implementation.md) |
| npm/PyPI para distribuição (implementação em Python possível) | 938 | Futuro | OQ-16 |
| APIs ilustrativas `createAgent({ role, persona: regional(...) })`, `persona(...)`, `openaiPersona(...)` | 452–470, 529–537 | Ilustrativo | [use-cases.md](../product/use-cases.md), packages.md |

## Decisões substituídas durante a conversa ou no bootstrap

| Antes | Depois | Onde foi decidido |
| --- | --- | --- |
| Nomes `personabr`, `regional-personas`, `regionalpersona.dev` | Vernáculo / `vernaculo` / `@vernaculo/*` / `vernaculo.dev` | conversa (478) |
| Ids `br.ba.salvador`, `br/ba/salvador` | `pt-BR/ba/salvador` (primeiro segmento BCP 47, slugs ASCII) | conversa (1197); slugs no bootstrap (ADR-0013) |
| Rascunho 1 do formato (snake_case, `RegionalPersona`) | rascunho 2 (camelCase, `Persona`) → `v1alpha1` | conversa (1188); bootstrap |
| `vernaculo.dev/v1` | `vernaculo.dev/v1alpha1` (maturidade honesta) | bootstrap |
| Skills entre os adapters futuros | exportador de skills na v0.1 | conversa (1390) |
| `vernaculo install` | `vernaculo add` | conversa (1017) |
| `compile --provider openai` | `compile --target openai` | bootstrap (consistência com `export`) |
| Rótulos de intensidade leve/moderada/forte | numérica 0–1 | conversa (840–851) |
| Flags `constraints` desligáveis | regras de base normativas sempre renderizadas | bootstrap |
| Bloco `override:` | mesmos campos + regras normativas de merge | bootstrap |
| `review.native_review_required` | `metadata.maturity` + processo de revisão humana | bootstrap |
| Diretórios `packages/eval`, `spec/` | ainda sem pacote de eval; `schemas/<versão>/` | conversa (1118); bootstrap |
| URIs MCP `persona://br/...` | `vernaculo://pt-BR/...` | conversa (1459) |
| "Middleware comportamental" | "camada de linguagem" | bootstrap (termo) |
| `assets/examples.yaml` no exportador | `references/examples.md` | bootstrap |

## Questões em aberto que vieram da conversa

Acompanhadas em [open-questions.md](../roadmap/open-questions.md). A OQ-01 e a OQ-02
foram resolvidas pelo mantenedor logo depois do bootstrap: Apache-2.0 para o
conteúdo dos packs ([ADR-0014](../decisions/0014-apache-2-0-persona-content.md)) e
revisão recomendada, não obrigatória
([ADR-0015](../decisions/0015-human-review-recommended-not-mandatory.md)). Lista:
licença do conteúdo dos packs (OQ-01), critérios de `reviewed` (OQ-02), executor de
evals/Promptfoo (OQ-03), distribuição do catálogo e `@vernaculo/personas` (OQ-04),
modelagem de registro (OQ-05), packs com vários arquivos (OQ-06), intensidade em
runtime nas skills (OQ-07), uma persona base `pt-BR` (OQ-09), calibração da
intensidade (OQ-11), ritmo/verbosidade (OQ-12), nomes e domínio (OQ-13),
Python/PyPI (OQ-16), variedades não administrativas (OQ-17), voz (OQ-18).

## Deliberadamente adiado

Adapter MCP; adapter do OpenAI Agents SDK; adapters Anthropic, Gemini e de modelos
locais; CLI `add`/`search`/`update`; CLI interativa (`@clack/prompts`); executor de
evals e conjuntos de cenários; schema dos registros de revisão; os quatro packs
reais (pesquisa); publicação no npm/GitHub Releases; site de documentação;
implementação em Python; Rust; voz; outros idiomas.

## Ideias que não são requisitos atuais

- Código ilustrativo (`createAgent`, `regional()`, `persona()`, `openaiPersona()`, helper `vernaculo()`) e nomes de modelos (`gpt-5.6-luna`).
- Variedades futuras específicas (`reconcavo`, `sul`, `interior`, outros idiomas): permitidas pelo design, mas não são trabalho planejado.
- Slogans.
- Faixas de intensidade por caso de uso: orientação, não regras.
- Explicitamente rejeitados, e não só adiados: API hospedada/SaaS/backend, telemetria, banco de dados, marketplace/registry, fine-tuning, MCP ou `SKILL.md` como formato canônico, Next.js no core, traços de personalidade regional.

## Revisão contra `ideia.txt`

Depois de escrever a documentação, `ideia.txt` foi relido seção por seção contra
esta tabela (verificando requisitos, decisões substituídas, exemplos vs.
requisitos, ideias futuras, restrições de custo, anti-caricatura, OpenAI vs.
independência de provedor, MCP, Skills, distribuição local, eject, evals, pesquisa,
licenças, intensidade, estrutura dos packs e stack). As lacunas encontradas foram
corrigidas nos documentos canônicos antes de o bootstrap ser considerado completo.
