# ADR-0002: Especificação e core independentes de provedor

- Status: Aceito
- Data: 2026-09-29
- Origem: `ideia.txt` ("o core completamente independente da OpenAI", "o produto principal não é `@vernaculo/openai`"); bootstrap

## Contexto

O primeiro alvo de integração é a OpenAI, mas o ecossistema de agentes muda rápido
(APIs são descontinuadas em meses; veja os [fatos externos](../reference/external-facts.md)).
O valor duradouro do projeto está na especificação aberta de personas, na
biblioteca pública de personas, no compilador e nos evals — não em uma integração
específica com um provedor.

## Decisão

1. A **Vernáculo Persona Specification** é independente de OpenAI, Anthropic, Google, MCP, Agent Skills e de qualquer framework de agentes.
2. A implementação é um pipeline em camadas, e o conhecimento sobre provedores existe apenas na última camada:

   ```text
   Arquivos de persona ─► Parser/Validador ─► Resolvedor (herança) ─► IR (intensidade aplicada) ─► Compilador ─► Target / Adapter
   (YAML)                 @vernaculo/core     @vernaculo/core           @vernaculo/core              @vernaculo/compiler   @vernaculo/openai, @vernaculo/skills, ...
   ```

3. `@vernaculo/schema`, `@vernaculo/core` e `@vernaculo/compiler` nunca importam SDKs ou tipos de provedores. Adapters dependem do compilador, nunca o contrário.
4. A OpenAI é o *primeiro adapter oficial*, não a dona do design ([ADR-0005](0005-openai-responses-first-adapter.md)).

## Consequências

- Novos provedores (Anthropic, Gemini, modelos locais via Ollama etc.) entram como novos pacotes de adapter, sem tocar no core.
- Fatos específicos de provedores (formato de requisições, comportamento multi-turno, cache) ficam documentados em [provider-adapters.md](../architecture/provider-adapters.md), não na especificação.
- Verificação automática: o teste de arquitetura proíbe imports e dependências de SDKs de provedores em todos os pacotes e confere a direção de dependências permitida (`schema ← core ← compiler ← adapters ← cli`).

## Alternativas consideradas

- **Construir direto sobre o OpenAI Agents SDK** — rejeitado como fundação: vazaria tipos do framework para o domínio. Um adapter `@vernaculo/openai-agents` continua possível.
- **Uma única string de "prompt universal" como produto** — rejeitado: a especificação é dado; o compilador decide como formular o texto para cada target.
