---
paths:
  - "packages/**/src/**"
  - "packages/*/package.json"
---

# Regras de arquitetura para o código dos pacotes

- A direção de dependências é única: `schema ← core ← compiler ← openai, skills ← cli`. Os imports internos permitidos estão listados em `packages/core/test/architecture.test.ts`; só atualize essa lista (e `docs/architecture/packages.md`) com um motivo documentado.
- Sem rede: nada de `fetch`, `http`/`https`/`net`/`tls`/`dgram`, `undici`, `axios`, `node-fetch`. Nenhum SDK de provedor (`openai`, `@openai/*`, `@anthropic-ai/*`, `@google/*`, `@modelcontextprotocol/*`) como import ou dependência de qualquer pacote. Adapters usam tipos estruturais.
- O ponto de entrada principal de `@vernaculo/core`, `schema`, `compiler`, `openai` e `skills` não podem importar módulos `node:`. Código de sistema de arquivos fica em `packages/core/src/node.ts` ou na CLI.
- A seleção de traços (intensidade, evidência) acontece só em `buildIR` (core). Renderizadores e targets formatam a IR; nunca selecionam nem reinterpretam dados da persona.
- A compilação é pura e determinística: nada de `Date`, aleatoriedade, leitura de ambiente ou formatação dependente de locale nas saídas; finais de linha LF.
- A camada compilada sempre contém as regras de base e o aviso de maturidade; mudá-los é uma decisão documentada (`docs/linguistic/anti-caricature.md`). O texto que vai para o modelo fica em inglês (ADR-0016).
- Código de biblioteca lança `VernaculoError` (códigos de issue estáveis) e nunca chama `process.exit`; só `packages/cli/src/bin.ts` define o código de saída.
- Não crie pacotes para trabalho futuro; documente-o no roadmap.
