# Schemas e suíte de conformidade

Artefatos normativos e neutros de linguagem da Vernáculo Persona Specification.

| Caminho | Conteúdo |
| --- | --- |
| `v1alpha1/persona.schema.json` | JSON Schema (draft 2020-12) para documentos de persona com `apiVersion: vernaculo.dev/v1alpha1` |
| `conformance/v1alpha1/valid/` | documentos que devem fazer parse, validar e resolver |
| `conformance/v1alpha1/invalid-schema/` | documentos que devem falhar na validação estrutural (`# reason:` explica o motivo) |
| `conformance/v1alpha1/invalid-semantic/` | documentos estruturalmente válidos que devem falhar com o código de issue de `# expect:` |
| `conformance/v1alpha1/resolution/<caso>/` | uma raiz de personas (`personas/`) e um `case.yaml` com o id a resolver e a linhagem + documento achatado esperados, ou o código de erro esperado |

O JSON Schema cobre apenas a estrutura; as regras semânticas e a semântica de
resolução estão especificadas em [`docs/specification/`](../docs/specification/overview.md).
Uma implementação em qualquer linguagem está em conformidade quando passa nesta
suíte ([regras de conformidade](../docs/specification/overview.md#conformidade)).

Suporte no editor (opcional): adicione
`# yaml-language-server: $schema=<caminho relativo para persona.schema.json>` no
topo de um arquivo de persona.

Para mudar o formato: atualize na mesma mudança o JSON Schema, o espelho Zod em
`packages/schema/src/zod.ts`, os fixtures daqui e a documentação da especificação;
veja a skill de projeto `persona-specification`.

Os comentários dos arquivos de conformidade (`# reason:`, `# expect:`) ficam em
inglês por serem dados de teste lidos por implementações de qualquer lugar.
