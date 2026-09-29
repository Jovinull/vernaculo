---
paths:
  - "packages/*/test/**"
  - "vitest.config.ts"
---

# Regras de testes

- O Vitest roda sobre os fontes pela condição de export `@vernaculo/source`; não importe de `dist/`.
- Teste comportamento e invariantes, não detalhes de implementação. Nada de testes escritos só para aumentar cobertura.
- Use só dados sintéticos: `fixtures/personas` ou YAML inline com `maturity: fixture` e `evidence: synthetic`. Nunca coloque afirmações regionais reais nos testes.
- Mudanças na especificação começam pelos fixtures de conformidade em `schemas/conformance/` (casos válidos e inválidos); eles são executados por `packages/schema/test` e `packages/core/test`.
- Golden files em `packages/compiler/test/__golden__/` só mudam de propósito (`pnpm vitest run packages/compiler -u`), com o motivo informado na mudança.
- Arquivos temporários: `mkdtempSync(join(tmpdir(), ...))`, removidos em `afterAll`.
- Testes de invariantes (arquitetura, determinismo, sem rede, sem mutação) precisam continuar significativos: ao acrescentar um, quebre a regra de propósito uma vez para vê-lo falhar.
- Os testes precisam passar no Linux e no Windows (o CI roda os dois): use `node:path` para juntar caminhos, compare ids com `/`, confie no LF (`.gitattributes`).
- Nomes de testes e mensagens de asserção ficam em inglês (ADR-0016).
