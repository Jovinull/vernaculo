# Biblioteca de personas

Este diretório é a biblioteca pública de **packs de persona regional**. Ele é uma
raiz de personas: cada pack fica em `personas/<id da persona>/persona.yaml`.

O foco atual é construir uma camada estadual da Bahia antes de promover traços de
cidades específicas a camadas próprias:

| Id | Status |
| --- | --- |
| [`pt-BR/ba`](pt-BR/ba/) | rascunho (`draft`) — camada estadual conservadora, sem revisão por falantes ([dossiê](pt-BR/ba/RESEARCH.md)) |
| [`pt-BR/ba/salvador`](pt-BR/ba/salvador/) | rascunho (`draft`) — recorte bibliográfico da capital, mantido separado ([dossiê](pt-BR/ba/salvador/RESEARCH.md)) |
| `pt-BR/se/aracaju` | não iniciado |
| `pt-BR/pe/recife` | não iniciado |
| `pt-BR/sp/sao-paulo` | não iniciado |

Um pack só entra aqui com pesquisa de verdade: evidência e fontes para cada traço,
licenças das fontes conferidas, exemplos positivos e negativos, e um `RESEARCH.md`
ao lado do `persona.yaml` explicando de onde veio cada decisão. Os packs começam
como `maturity: draft`; a revisão humana por falantes da variedade é sempre
recomendada (nunca obrigatória), e um pack passa a `reviewed` quando essa revisão
realmente aconteceu.

Licença: todo pack aqui é **Apache-2.0** (`metadata.license: Apache-2.0`), como o
resto do repositório.

- Como os packs são construídos: [docs/linguistic/methodology.md](../docs/linguistic/methodology.md)
- O que nunca pode estar em um pack: [docs/linguistic/anti-caricature.md](../docs/linguistic/anti-caricature.md)
- Como contribuir: [docs/development/contributing-personas.md](../docs/development/contributing-personas.md)

Personas sintéticas de teste ficam em [`../fixtures/personas`](../fixtures/personas), nunca aqui.
