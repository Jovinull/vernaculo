# ADR-0006: MCP é um adapter futuro, não a representação canônica

- Status: Aceito
- Data: 2026-09-29
- Origem: `ideia.txt` ("Por que eu não usaria MCP como núcleo", "MCP eu deixaria para v0.2/v0.3")

## Contexto

O MCP separa *prompts* (templates controlados pelo usuário), *resources* (contexto
controlado pela aplicação) e *tools* (capacidades que o modelo pode chamar). Uma
persona regional é configuração que a **aplicação** aplica de forma determinística:
uma concessionária em Salvador sempre usa sua camada de Salvador; o modelo não
deve decidir se vai ou não "usar Bahia". Personas são conhecimento/configuração,
não uma capacidade externa que exija um servidor.

## Decisão

- **O MCP não é o formato canônico das personas**, e o projeto não é um "MCP de sotaques".
- Um pacote `@vernaculo/mcp` poderá expor personas localmente (por exemplo, recursos como `vernaculo://pt-BR/ba/salvador` e operações de listagem/renderização) via `stdio`, executado pelo usuário (`npx @vernaculo/mcp`). Ele continua 100% local — nunca um servidor mantido pelo projeto ([ADR-0001](0001-no-vernaculo-infrastructure-at-runtime.md)).
- Planejado para não antes da v0.2/v0.3; não é necessário para provar a tese.

## Consequências

- Quando implementado, terá como alvo o MCP TypeScript SDK v2 (`@modelcontextprotocol/server`), a linha estável que implementa a especificação MCP de 2026-07-28 (verificado em 2026-09-29), e consumirá a saída do compilador como qualquer outro adapter.
- O esboço de URI da conversa inicial, `persona://br/ba/salvador`, foi substituído pela forma `vernaculo://<id da persona>` e pelo esquema de ids `pt-BR/...`.

## Alternativas consideradas

- **Servidor MCP como produto central** — rejeitado: exige rodar um servidor para algo que é configuração estática, e transfere para o modelo a decisão de aplicar uma persona, que é da aplicação.
