---
paths:
  - "**/*.ts"
---

# TypeScript conventions

- TypeScript 7 (native compiler), ESM only. Relative imports use the `.ts` extension (`import { x } from "./x.ts"`).
- `isolatedDeclarations` is on: every exported function, const and class member needs an explicit type. Prefer declaring interfaces over exporting inferred types.
- `erasableSyntaxOnly`: no `enum`, `namespace`, parameter properties or other non-erasable syntax. Use `as const` tuples + derived union types (see `packages/schema/src/types.ts`).
- `strict` + `noUncheckedIndexedAccess`: handle `undefined` from indexing; avoid `!` non-null assertions.
- No `any`; use `unknown` and narrow. Casts only at well-understood boundaries, with a comment when not obvious.
- Public data types are `readonly`. Never mutate inputs; return new values.
- Named exports only in library code (config files are the exception, with an explicit type annotation).
- Keep public APIs small; export from `src/index.ts` deliberately.
- Format/lint with Biome (`pnpm lint:fix`); don't hand-format against it.
- Match the surrounding code's comment density: explain *why*, not *what*.
