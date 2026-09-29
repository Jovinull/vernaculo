---
name: persona-specification
description: Trabalha na Vernáculo Persona Specification e na sua implementação de referência — JSON Schema, espelho Zod, suíte de conformidade, parser, regras semânticas, códigos de issue, herança/achatamento, forma canônica, seleção por intensidade (IR) e serialização. Use ao adicionar ou mudar campos de persona, regras de validação, semântica de extends/merge, comportamento de intensidade, ids, apiVersion, ou internals de @vernaculo/schema / @vernaculo/core.
---

# Trabalho na especificação de personas

## Leia antes

- `docs/specification/overview.md` — documentos, ids, raízes de personas, modelo de processamento, conformidade, códigos de issue
- `docs/specification/persona-format.md` — campos, regras semânticas, histórico do formato
- `docs/specification/inheritance-and-composition.md` — regras de achatamento
- `docs/specification/regional-intensity.md` — regras de seleção
- `docs/specification/provenance.md` — evidência, fontes, maturidade
- ADR-0003 (formato), ADR-0013 (herança explícita), ADR-0010 (nenhum campo de personalidade)

## Onde cada coisa fica

| Assunto | Arquivo |
| --- | --- |
| Estrutura normativa | `schemas/v1alpha1/persona.schema.json` |
| Tipos TS / espelho Zod | `packages/schema/src/types.ts`, `packages/schema/src/zod.ts` |
| Parse (modelo de dados JSON, chaves duplicadas) | `packages/core/src/parse.ts` |
| Regras do documento | `packages/core/src/validate.ts` |
| Listas com chave (chaves, usadas vs. desencorajadas) | `packages/core/src/lists.ts` |
| Linhagem, achatamento, regras da persona resolvida | `packages/core/src/resolve.ts` |
| Ordem canônica das chaves (vinda do JSON Schema) | `packages/core/src/canonical.ts` |
| Seleção por intensidade/evidência | `packages/core/src/ir.ts` |
| Códigos de issue | `packages/core/src/errors.ts` |
| Suíte de conformidade | `schemas/conformance/v1alpha1/{valid,invalid-schema,invalid-semantic,resolution}` |

## Procedimento para uma mudança de formato

1. Decida se ela é compatível. A versão alfa pode quebrar, mas mudanças incompatíveis precisam de um novo diretório de `apiVersion` e de uma nota na documentação; mudanças no modelo estrutural precisam de um ADR.
2. Escreva primeiro os fixtures de conformidade: um caso em `valid/` e um caso `invalid-*` (`# expect: <código>` nos semânticos); um caso em `resolution/` com o documento achatado exato se o merge for afetado (a ordem das chaves faz parte do contrato).
3. Atualize o JSON Schema. Mantenha os objetos fechados (`additionalProperties: false`). Padrões seguros para aspas; limites idênticos aos do Zod. Descrições em português.
4. Espelhe em `types.ts` e `zod.ts` (tipos explícitos; `z.strictObject`; mesmas fontes de regex e mesmos limites).
5. Implemente as regras semânticas no core com um código de issue estável; acrescente o código em `IssueCode`, `docs/specification/overview.md` e `persona-format.md`.
6. Se a renderização for afetada, atualize o compilador, os golden files e `docs/architecture/compilation.md`.
7. Rode `pnpm check`. O teste de paridade (`packages/schema/test/schema-parity.test.ts`) precisa passar.
8. Atualize a documentação (skill `documentation-maintenance`).

## Invariantes a proteger

- Nenhum campo pode expressar personalidade, atitudes ou outros traços não linguísticos.
- Ids nunca implicam herança; só `extends` implica. Ids continuam seguros para caminhos (sem `.`/`\`).
- Hipóteses nunca são renderizadas; evidência sintética só com maturidade efetiva `fixture`.
- Formas desencorajadas e antipadrões são renderizados em toda intensidade; a intensidade 0 é neutra.
- A resolução é determinística e estável byte a byte (ordem canônica, sem iteração de Map/Set vazando para a ordem da saída).
- O `vernaculo.dev` do `apiVersion` nunca é buscado na rede.
