---
paths:
  - "**/*.ts"
---

# Convenções de TypeScript

- TypeScript 7 (compilador nativo), só ESM. Imports relativos usam a extensão `.ts` (`import { x } from "./x.ts"`).
- `isolatedDeclarations` está ligado: toda função, constante e membro de classe exportado precisa de tipo explícito. Prefira declarar interfaces a exportar tipos inferidos.
- `erasableSyntaxOnly`: nada de `enum`, `namespace`, parameter properties ou outra sintaxe não apagável. Use tuplas `as const` + tipos união derivados (veja `packages/schema/src/types.ts`).
- `strict` + `noUncheckedIndexedAccess`: trate o `undefined` vindo de indexação; evite asserções não nulas `!`.
- Nada de `any`; use `unknown` e estreite o tipo. Casts só em fronteiras bem entendidas, com comentário quando não for óbvio.
- Tipos de dados públicos são `readonly`. Nunca altere entradas; devolva valores novos.
- Só exports nomeados em código de biblioteca (arquivos de configuração são a exceção, com anotação de tipo explícita).
- Mantenha as APIs públicas pequenas; exporte de `src/index.ts` de forma deliberada.
- Formate e faça lint com o Biome (`pnpm lint:fix`); não formate à mão contra ele.
- Identificadores, comentários e nomes de testes ficam em inglês (ADR-0016). Siga a densidade de comentários do código ao redor: explique o *porquê*, não o *quê*.
