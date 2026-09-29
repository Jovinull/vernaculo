# ADR-0004: TypeScript como primeira implementação de referência

- Status: Aceito
- Data: 2026-09-29
- Origem: `ideia.txt` ("Eu faria o Vernáculo praticamente inteiro em TypeScript", "E Rust?"); bootstrap

## Contexto

Os problemas difíceis são a qualidade da especificação, a qualidade dos dados
linguísticos, a portabilidade, as ferramentas e os evals — não CPU. Os SDKs
oficiais do ecossistema de agentes (OpenAI Agents SDK, MCP TypeScript SDK) têm
implementações TypeScript de primeira linha, e o npm é um canal natural de
distribuição para uma CLI.

## Decisão

- A implementação de referência é **TypeScript sobre Node.js**, em um **monorepo com pnpm workspaces**.
- O desenvolvimento usa a linha LTS atual do Node.js (24 "Krypton" em 2026-09-29); os pacotes publicados suportam Node.js ≥ 22.12 (a linha LTS mantida mais antiga compatível com as dependências).
- O ponto de entrada do core continua independente de runtime (sem imports `node:`), para rodar em navegadores, edge runtimes e bundlers; os helpers de sistema de arquivos ficam em `@vernaculo/core/node`.
- Rust (ou qualquer outra linguagem) **não** entra agora. Um core em Rust com bindings, ou um binário standalone sem Node, só será reconsiderado quando surgir uma necessidade concreta (desempenho, distribuição em binário único) — por meio de um ADR novo.

## Consequências

- Implementações em outras linguagens são bem-vindas e se apoiam no JSON Schema e na suíte de conformidade, não neste código ([ADR-0003](0003-yaml-markdown-json-schema-format.md)).
- As ferramentas escolhidas e as versões verificadas estão em [stack.md](../development/stack.md).

## Alternativas consideradas

- **Core em Rust desde o início** — rejeitado por ora: eleva a barreira de contribuição e complica a distribuição sem resolver o gargalo real.
- **Python primeiro** — não escolhido: TypeScript se alinha aos primeiros adapters e à distribuição da CLI; uma implementação em Python (PyPI) continua como ideia do roadmap.
