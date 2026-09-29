---
paths:
  - "schemas/**"
  - "packages/schema/**"
---

# Regras para mudanças na especificação

O JSON Schema em `schemas/<versão>/` é normativo; o espelho Zod o segue.

Uma mudança de formato só está completa quando, na mesma mudança:

1. `schemas/<versão>/persona.schema.json` foi atualizado (a fonte da verdade);
2. `packages/schema/src/types.ts` e `packages/schema/src/zod.ts` o espelham com padrões e limites idênticos (o teste de paridade compara cada nó);
3. fixtures de conformidade a cobrem: pelo menos um caso em `valid/` e um em `invalid-schema/` ou `invalid-semantic/` (`# expect: <código>`), mais um caso em `resolution/` se a semântica de merge for afetada;
4. regras semânticas/códigos de issue estão implementados em `packages/core` e documentados em `docs/specification/persona-format.md` e `overview.md`;
5. `docs/specification/*` descrevem o novo estado; acrescente uma nota de "histórico" se uma ideia de rascunho foi adotada ou rejeitada;
6. mudanças incompatíveis vão para um novo diretório de `apiVersion` (`v1alpha2`, ...) — versões alfa podem quebrar, mas nunca em silêncio.

As descrições (`description`/`title`) do JSON Schema são escritas em português;
nomes de campos, valores de enums e padrões não mudam de idioma. Nunca faça o
significado do formato depender de comportamento do TypeScript. Carregue a skill
`persona-specification` para esse trabalho.
