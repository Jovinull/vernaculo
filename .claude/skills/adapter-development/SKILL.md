---
name: adapter-development
description: Adiciona ou altera um adapter de provedor ou target de exportação do Vernáculo (OpenAI, OpenAI Agents SDK, Anthropic/Claude, Gemini, modelos locais via Ollama, servidor MCP, Agent Skills, prompts simples) sem acoplar o core a nenhum provedor. Use ao criar packages/<adapter>, adicionar um target de compile/export na CLI ou mudar como as instruções compiladas são compostas com um agente hospedeiro.
---

# Desenvolvimento de adapters e targets

## Leia antes

- `docs/architecture/provider-adapters.md` — regras e observações por provedor
- `docs/architecture/compilation.md` — IR, saída do compilador, tabela de targets
- ADR-0002 (independente de provedor), ADR-0005 (adapter fino da OpenAI), ADR-0006 (MCP), ADR-0007 (Skills), ADR-0009 (composição)
- `docs/reference/external-facts.md` — fatos verificados sobre provedores

## Regras

1. Adapters dependem de `@vernaculo/compiler` (e dos tipos do core). Nunca faça core/compiler/schema importarem um adapter ou tipo de provedor.
2. **Sem rede e sem credenciais no adapter.** Ele molda dados para o cliente do próprio usuário. Prefira tipos estruturais a dependências de SDKs de provedores; se um tipo de SDK for inevitável, faça dele uma peer dependency opcional e justifique em um ADR. Atualize de propósito a lista de permitidos do teste de arquitetura.
3. **Consuma só a IR/saída compilada.** Nunca selecione traços de novo nem reinterprete dados da persona; a seleção acontece em `buildIR`.
4. **Contrato de composição**: instruções do agente hospedeiro primeiro, camada de persona depois; a persona é aplicada em toda requisição quando o provedor não mantém as instruções.
5. **Verifique os fatos do provedor** na documentação oficial antes de codificá-los; registre-os com URL e data em `external-facts.md`. Nunca fixe nomes de modelos.
6. **Determinismo**: mesma persona compilada ⇒ mesma saída do adapter.
7. Diferenças de renderização específicas de um provedor só são permitidas com evidência de evals, e ficam no adapter.
8. Código, testes e mensagens em inglês; documentação em português (ADR-0016).

## Procedimento

1. Confirme que o item está no roadmap; se for um novo tipo de target ou canal, escreva um ADR.
2. Crie `packages/<nome>/` como `packages/openai`: `package.json` (ESM, condição de export `@vernaculo/source`, `engines`, `publishConfig`, `repository`/`homepage`/`bugs`, descrição em português), `tsconfig.json`, `tsdown.config.ts` (`packageConfig([...])`), `src/index.ts`, `test/`.
3. Acrescente-o a `ALLOWED_INTERNAL` em `packages/core/test/architecture.test.ts`.
4. Testes: ordem da composição, imutabilidade das entradas, determinismo, nenhuma dependência de SDK, restrições da especificação do target (como `packages/skills/test` faz para Agent Skills).
5. Ligue à CLI só se fizer sentido (opção de `--target`) e atualize `docs/reference/cli.md`.
6. Acrescente um exemplo em `examples/` se isso deixar o uso mais claro (só fixtures; simulação sem credenciais).
7. Atualize `provider-adapters.md`, a tabela de targets de `compilation.md`, `packages.md` e o roadmap; acrescente um changeset. Rode `pnpm check`.
