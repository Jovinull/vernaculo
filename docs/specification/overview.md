# Vernáculo Persona Specification — visão geral

- Versão atual: **`vernaculo.dev/v1alpha1`** (alfa: pode mudar de forma incompatível)
- Artefatos normativos: [`schemas/v1alpha1/persona.schema.json`](../../schemas/v1alpha1/persona.schema.json) e as regras deste diretório
- Suíte de conformidade: [`schemas/conformance/v1alpha1/`](../../schemas/conformance/v1alpha1/)

As palavras DEVE, NÃO DEVE, DEVERIA e PODE devem ser interpretadas como MUST, MUST
NOT, SHOULD e MAY da RFC 2119.

## Propósito

Uma persona é uma **descrição declarativa de traços observáveis de uma variedade
linguística**, feita para ser aplicada em camada sobre um agente de IA existente. É
dado, não prompt: as implementações a compilam em instruções para um target
([compilação](../architecture/compilation.md)). A especificação é independente de
qualquer linguagem de programação, provedor ou framework de agentes
([ADR-0002](../decisions/0002-provider-agnostic-specification-and-core.md),
[ADR-0003](../decisions/0003-yaml-markdown-json-schema-format.md)).

## Documentos

1. Um documento de persona é um arquivo YAML 1.2 restrito ao **modelo de dados JSON**: as implementações DEVEM rejeitar números não finitos (`.nan`, `.inf`), valores binários ou com tags customizadas e chaves de mapeamento duplicadas. Um arquivo DEVE conter exatamente um documento.
2. Quem escreve arquivos DEVERIA colocar entre aspas as strings que parsers YAML 1.1 interpretam errado (datas, `yes`/`no`/`on`/`off`), para que os arquivos continuem portáveis entre parsers.
3. Um documento DEVE ser válido segundo o JSON Schema do seu `apiVersion` e DEVE satisfazer as regras semânticas de [persona-format.md](persona-format.md).

## Identificadores

`metadata.id` = `<tag de idioma>/<slug>/<slug>...`

- O primeiro segmento é uma tag de idioma BCP 47 (sintaxe simplificada), por exemplo `pt-BR`, `es-419`.
- Os segmentos seguintes são slugs: letras ASCII minúsculas e dígitos separados por hífens simples (por exemplo `sao-paulo`, `reconcavo`). Nomes de exibição com diacríticos ficam em `metadata.name`.
- Os segmentos nomeiam variedades progressivamente mais estreitas, que PODEM seguir divisões administrativas (`pt-BR/ba/salvador`) ou não (um futuro `pt-BR/<variedade>` sustentado por evidência).
- Ids **não** carregam herança; só `extends` carrega ([ADR-0013](../decisions/0013-explicit-inheritance.md)).
- Segmentos que começam com `x-` são, por convenção, privados ou sintéticos (`pt-BR/x-fixture`, `pt-BR/x-acme/...`).
- A sintaxe de id exclui `.`, `\` e segmentos vazios, então ids podem ser mapeados para caminhos com segurança.

## Raízes de personas

Uma raiz de personas é um diretório em que a persona com id `I` fica em
`<raiz>/I/persona.yaml` (segmentos como diretórios aninhados). Um documento
encontrado nesse local DEVE declarar `metadata.id` igual a `I` (senão, `id-mismatch`).
Implementações que resolvem ids em várias raízes DEVEM buscá-las em ordem e usar a
primeira correspondência.

## Modelo de processamento

1. **Parse** de cada documento (restrições do modelo de dados JSON).
2. **Validação** da estrutura (JSON Schema) e das regras semânticas do documento.
3. **Resolução** da linhagem via `extends`, verificação das regras de linhagem e **achatamento** ([inheritance-and-composition.md](inheritance-and-composition.md)).
4. Verificação das regras semânticas sobre a persona resolvida.
5. **Seleção** dos traços para uma intensidade ([regional-intensity.md](regional-intensity.md)).
6. **Renderização** para um target. A renderização é definida pela implementação, mas toda renderização DEVE transmitir as regras de base listadas em [anti-caricature.md](../linguistic/anti-caricature.md) e a maturidade efetiva quando ela não for `reviewed`.

As implementações NÃO DEVEM exigir acesso à rede em nenhuma dessas etapas.

## Versionamento

- `apiVersion` identifica a versão da especificação. `vernaculo.dev` é um identificador de namespace; as implementações NÃO DEVEM tentar acessá-lo.
- Versões alfa (`v1alpha1`, `v1alpha2`, ...) podem mudar de forma incompatível. Uma `v1` estável só será declarada depois que packs reais, revisão humana e evals tiverem exercitado o formato.
- Cada versão tem o próprio diretório de schema e a própria suíte de conformidade.

## Conformidade

Uma implementação está em conformidade com a `v1alpha1` quando, na suíte em
`schemas/conformance/v1alpha1/`:

| Diretório | Comportamento esperado |
| --- | --- |
| `valid/` | faz parse, valida e resolve (cada arquivo como persona isolada) |
| `invalid-schema/` | é rejeitado pela validação estrutural |
| `invalid-semantic/` | é estruturalmente válido; é rejeitado com o código de issue do cabeçalho `# expect:` do arquivo |
| `resolution/<caso>/` | resolver o `resolve` de `case.yaml` na raiz `personas/` do caso produz `expect.lineage` e `expect.document` (o documento achatado, incluindo a ordem das chaves), ou falha com `expect.error` |

A implementação de referência em TypeScript executa essa suíte em
`packages/schema/test/conformance.test.ts` e `packages/core/test/conformance.test.ts`.

## Códigos de issue

Códigos estáveis, legíveis por máquina, compartilhados entre implementações:

| Etapa | Códigos |
| --- | --- |
| Parse | `yaml-syntax`, `non-json-value`, `schema-violation` |
| Regras do documento | `language-mismatch`, `duplicate-key`, `conflicting-forms`, `evidence-without-source` |
| Resolução | `invalid-id`, `persona-not-found`, `parent-not-found`, `id-mismatch`, `inheritance-cycle`, `inheritance-too-deep`, `lineage-language-mismatch`, `unknown-source`, `synthetic-outside-fixture`, `missing-default-intensity` |
| Opções | `invalid-intensity` |

## Relacionados

- Referência de campos e regras semânticas: [persona-format.md](persona-format.md)
- Herança e composição: [inheritance-and-composition.md](inheritance-and-composition.md)
- Intensidade: [regional-intensity.md](regional-intensity.md)
- Evidência, fontes, maturidade e licenciamento: [provenance.md](provenance.md)
