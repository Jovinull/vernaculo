# Fatos externos

Fatos que mudam com o tempo e dos quais o projeto depende, com data de verificação
e fonte. Verifique de novo antes de usá-los em decisões novas e atualize a data
quando fizer isso. Fatos que não puderam ser verificados aparecem como tal.

## Verificados em 2026-09-29

| Fato | Fonte | Usado em |
| --- | --- | --- |
| OpenAI Responses API: `instructions` é uma mensagem de sistema/developer; **com `previous_response_id`, as instructions da resposta anterior não são reaplicadas** | [Referência da API: responses.create](https://developers.openai.com/api/reference/python/resources/responses/methods/create) | [provider-adapters.md](../architecture/provider-adapters.md), `@vernaculo/openai` |
| Reusable prompt objects / `v1/prompts` da OpenAI: descontinuação anunciada em 2026-06-03, desligamento em **2026-11-30**; levar os prompts para o código da aplicação, versionados no Git com testes/evals | [Deprecations](https://developers.openai.com/api/docs/deprecations), [Migrate from prompt objects](https://developers.openai.com/api/docs/guides/prompting/migrate-from-prompt-object) | [persona-lifecycle.md](../architecture/persona-lifecycle.md) |
| O cache de prompt depende de prefixos idênticos: conteúdo estático primeiro | Migrate from prompt objects (mesmo guia) | [compilation.md](../architecture/compilation.md) |
| Plataforma de Evals da OpenAI: anúncio em 2026-06-03; somente leitura em **2026-10-31**; painel e API desligados em **2026-11-30**; a orientação de migração aponta para o Promptfoo | Deprecations | [evals/strategy.md](../evals/strategy.md) |
| Fine-tuning da OpenAI: desde 2026-05-07 indisponível para organizações sem histórico de fine-tuning; novas restrições em 2026-07-02; clientes existentes perdem a criação de novos jobs em **2027-01-06** | Deprecations | [ADR-0011](../decisions/0011-deterministic-llm-free-compilation.md) |
| Assistants API da OpenAI desligada em 2026-08-26 (substitutas: Responses + Conversations APIs) | Deprecations | contexto |
| Desligamento do Agent Builder em 2026-11-30 (alternativas: Agents SDK, Workspace Agents) | Deprecations | contexto |
| O MCP TypeScript SDK v2 é a linha estável, lançada com a especificação MCP de **2026-07-28**; pacotes separados `@modelcontextprotocol/server` e `/client`; roda em Node, Bun e Deno; a v1.x recebe correções por ≥ 6 meses | [Documentação do MCP TS SDK v2](https://ts.sdk.modelcontextprotocol.io/v2/) | [ADR-0006](../decisions/0006-mcp-future-adapter-not-canonical.md) |
| Especificação Agent Skills: frontmatter do `SKILL.md` com `name` (1–64, `a-z0-9-`, sem hífen no início/fim nem duplo, igual ao diretório), `description` (1–1024), opcionais `license`, `compatibility` (≤ 500), `metadata` (string→string), `allowed-tools` (experimental); `scripts/`, `references/`, `assets/`; `SKILL.md` < 500 linhas; referências a um nível de profundidade | [agentskills.io/specification](https://agentskills.io/specification) | `@vernaculo/skills` |
| Claude Code: skills de projeto em `.claude/skills/<nome>/SKILL.md` (`description` + `when_to_use` cortados em 1.536 caracteres na listagem; `paths` limita a ativação automática); regras em `.claude/rules/*.md` com globs `paths` opcionais; CLAUDE.md com menos de 200 linhas | [Skills](https://code.claude.com/docs/en/skills), [Memory](https://code.claude.com/docs/en/memory) | `.claude/`, `CLAUDE.md` |
| Node.js: 24 "Krypton" é o LTS ativo; 22 "Jod" é LTS de manutenção; 26 é current | [nodejs.org/dist/index.json](https://nodejs.org/dist/index.json) | [stack.md](../development/stack.md) |
| TypeScript 7.0 (compilador nativo) lançado em 2026-07-08; strict por padrão; sem API programática do compilador até a 7.1 | registry do npm; cobertura do lançamento | [stack.md](../development/stack.md) |
| npm: `vernaculo` e o escopo `@vernaculo` não estão registrados | registry do npm (404 / "Scope not found") | [questões em aberto](../roadmap/open-questions.md) |
| GitHub topics: só letras minúsculas, números e hífens; até 50 caracteres; no máximo 20 por repositório | [Classifying your repository with topics](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics) | metadados do repositório ([ADR-0016](../decisions/0016-documentation-in-portuguese.md)) |
| Fontes linguísticas (ALiB, NURC, licença CC BY-NC-ND 4.0 do MuPe-Diversidades, Sotaque Brasileiro GPL-3.0) | veja [sources.md](../linguistic/sources.md) | metodologia |

## Afirmados na conversa, não verificados

| Afirmação | Status |
| --- | --- |
| A OpenAI suporta Agent Skills, compatíveis com o padrão aberto | não verificado de novo; o exportador segue a especificação aberta |
| O OpenAI Agents SDK tem abstrações `Model`/`ModelProvider` que suportam provedores externos | não verificado de novo |
| O OpenAI Agents SDK roda dentro da aplicação do desenvolvedor e consegue usar servidores MCP locais via stdio | não verificado de novo |
| Dataset aberto de vozes "Projeto SOTAQUE" sob CDLA-Permissive-2.0 | não encontrado (veja [sources.md](../linguistic/sources.md)) |
| PERSONA.md / Personaxis; PersonaNexus | não encontrados |
| Nome de modelo `gpt-5.6-luna` | não verificado; nunca usado em código ou exemplos (o modelo vem da configuração) |
