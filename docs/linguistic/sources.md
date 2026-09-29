# Fontes de pesquisa

Fontes citadas na conversa de concepção, com o que foi verificado em
**2026-09-29**. "Verificado" significa que o fato foi confirmado na própria fonte ou
em referências confiáveis durante o bootstrap; as licenças precisam ser reconferidas
antes de qualquer uso além da consulta.

Nada destas fontes foi copiado para o repositório.

| Fonte | O que é | Relevância | Licença / termos | Uso permitido (até nova conferência) | Status |
| --- | --- | --- | --- | --- | --- |
| **ALiB — Atlas Linguístico do Brasil** ([alib.ufba.br](https://alib.ufba.br/)) | Atlas geolinguístico do português brasileiro coordenado a partir da UFBA (surgiu em 1996). Trabalho de campo em 250 localidades: 25 capitais + 225 pontos do interior; multidimensional (sexo, idade, escolaridade). Volumes publicados (o vol. 3 foi lançado recentemente). | Principal referência metodológica e descritiva; evidência para traços lexicais e outros por localidade; o argumento contra a homogeneidade por estado. | Não determinada (as publicações têm termos próprios das editoras). | consultar, citar | fatos verificados em referências acadêmicas; site oficial acessível (aviso de certificado TLS) |
| **Projeto NURC** (Norma Urbana Culta) | Corpus/projeto iniciado em 1969 que documenta a fala urbana culta de Recife, Salvador, Rio de Janeiro, São Paulo e Porto Alegre, nas dimensões fonético-fonológica, morfossintática, lexical, semântica e estilística; há iniciativas de digitalização. | Fala urbana em três das quatro cidades iniciais (Recife, Salvador, São Paulo). Atenção: gravações históricas, registro culto — é preciso considerar a atualidade e o registro. | Não determinada; varia por acervo/projeto de digitalização. | consultar, citar | fatos do projeto verificados |
| **MuPe-Diversidades** ([github.com/nilc-nlp/MuPe-Diversidades](https://github.com/nilc-nlp/MuPe-Diversidades)) | Fala espontânea com transcrições revisadas (~2h32m), com diversidade de idade, gênero e sotaque em estados brasileiros, incluindo PE, AL, SE e SP. Citação: Craveiro & Galdino (anais do BRACIS 2024, 2025). | Fala espontânea de estados dos packs iniciais. | **CC BY-NC-ND 4.0** (verificado no LICENSE do repositório). Não comercial, sem derivados. | consultar, citar. **Não redistribuir** conteúdo nem material derivado. | verificado |
| **"Projeto SOTAQUE"** (dataset aberto de vozes brasileiras com região/estado/cidade e sotaque declarado, supostamente sob CDLA-Permissive-2.0) | Como descrito na conversa. | Seria relevante para uma futura fase de voz. | Alegadamente CDLA-Permissive-2.0. | nenhum até ser identificado | **não verificado**: nenhum projeto com essa descrição foi encontrado. Existe um projeto diferente, o **Sotaque Brasileiro** (dataset de vozes, 2021, GitHub `sotaque-brasileiro`), licenciado sob **GPL-3.0** (metadados do PyPI). |

## Projetos relacionados (posicionamento, não fontes)

| Projeto | Observação | Status |
| --- | --- | --- |
| PERSONA.md / Personaxis | Citado na conversa como uma especificação genérica de persona sofisticada. | não verificado (não encontrado) |
| Character Cards, PersonaNexus | Citados como formatos genéricos de persona/personagem. | Character Cards é um formato conhecido da comunidade; PersonaNexus não verificado |
| Soul Spec, stax persona spec, AIEOS | Outras especificações genéricas de persona encontradas durante a verificação. | existem (encontradas em 2026-09-29) |

Isso confirma o posicionamento de [vision.md](../product/vision.md): formatos
genéricos de persona existem; a localização sociolinguística é um nicho mais estreito.

## Regras para acrescentar uma fonte

1. Prefira fontes primárias: universidades, documentação institucional, artigos revisados por pares, repositórios oficiais.
2. Registre a licença encontrada e a data em que a conferiu (`accessed`).
3. Decida o nível de uso (`consulted`, `cited`, `redistributed`) e confira contra a licença.
4. Nunca copie corpora ou datasets para o repositório só porque podem ser baixados publicamente.
5. Acrescente a fonte aqui se ela for relevante para além de um único pack.
