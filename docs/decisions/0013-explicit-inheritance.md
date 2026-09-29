# ADR-0013: Herança explícita com `extends`; ids nunca implicam herança

- Status: Aceito
- Data: 2026-09-29
- Origem: bootstrap (derivado de `ideia.txt`: `extends: pt-BR/ba/salvador`, a discussão de granularidade e o argumento do ALiB)

## Contexto

Os ids de persona são hierárquicos (`pt-BR/ba/salvador`). Um atalho tentador seria
fazer `pt-BR/ba/salvador` herdar automaticamente de `pt-BR/ba` e de `pt-BR`. Mas
contenção administrativa não é herança linguística: a variedade de uma cidade pode
compartilhar traços com a de um estado vizinho e não com o interior do próprio
estado; um "pack estadual" pode nem existir, porque o estado não é uma unidade
linguística.

## Decisão

- Ids são **nomes**: `<tag de idioma BCP 47>/<slug>/<slug>...`, com slugs em ASCII minúsculo (`a-z0-9` e hífens simples). Eles não carregam significado de herança.
- A herança é **explícita** e de **pai único**: `extends: <id da persona>`. Herança múltipla não é suportada na v1alpha1.
- Uma linhagem tem um único idioma; ciclos e linhagens com mais de 32 níveis são erro.
- A semântica de merge é normativa e está documentada em [inheritance-and-composition.md](../specification/inheritance-and-composition.md), incluindo o cancelamento, na ordem da linhagem, entre formas desencorajadas e formas usadas.
- Slugs são ASCII para portabilidade em sistemas de arquivos e URLs (a conversa já usava `sao-paulo`); nomes de exibição com diacríticos ficam em `metadata.name` (por exemplo, `reconcavo` / "Recôncavo").

## Consequências

- O arquivo de persona de uma empresa (`acme-salvador.yaml`) estende uma persona da biblioteca sem precisar estar dentro da biblioteca.
- Segmentos privados ou não geográficos começam, por convenção, com `x-` (por exemplo, `pt-BR/x-fixture`, `pt-BR/x-acme/...`), espelhando a convenção de uso privado do BCP 47.

## Alternativas consideradas

- **Herança implícita pelo caminho** — rejeitado (veja o contexto).
- **Vários `extends`** — adiado: conflitos de merge entre pais não relacionados precisam de um caso de uso claro primeiro.
