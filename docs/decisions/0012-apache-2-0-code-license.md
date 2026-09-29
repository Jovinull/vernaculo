# ADR-0012: Apache-2.0 para o código; material linguístico de terceiros licenciado à parte

- Status: Aceito (licença do conteúdo dos packs decidida pelo [ADR-0014](0014-apache-2-0-persona-content.md))
- Data: 2026-09-29
- Origem: `ideia.txt` ("Apache-2.0 para código seria minha preferência; permissiva e adequada para adoção empresarial"; "cada fonte precisaria ter sua licença verificada")

## Contexto

O objetivo é adoção, inclusive por empresas que colocam agentes localizados em
produção. O projeto também depende de pesquisa linguística com licenças muito
variadas — por exemplo, o corpus MuPe-Diversidades é CC BY-NC-ND 4.0 (não
comercial, sem derivados), o que proíbe redistribuir material derivado em um
projeto permissivo.

## Decisão

- O **código** deste repositório é licenciado sob **Apache-2.0** (permissiva, com concessão explícita de patentes, comum em empresas). O texto completo está em `LICENSE`.
- A licença do código **não** concede direitos sobre material de terceiros. Cada fonte externa é registrada com sua licença e um de três níveis de uso:
  - `consulted` — lida para embasar a pesquisa; nada é copiado;
  - `cited` — referenciada ou citada brevemente, com atribuição;
  - `redistributed` — material copiado para dentro de um pack; só permitido quando a licença da fonte autoriza isso nos termos de distribuição deste projeto.
- Corpora e datasets **nunca** são copiados para o repositório só porque estão publicamente acessíveis.
- Cada persona declara a licença do próprio conteúdo em `metadata.license`. Qual licença os packs oficiais usariam (Apache-2.0, CC-BY-4.0, CC0, ...) era uma questão em aberto → resolvida: Apache-2.0 ([ADR-0014](0014-apache-2-0-persona-content.md)).

## Consequências

- Revisões de packs precisam conferir `provenance.sources[].usage` contra a licença de cada fonte ([provenance.md](../specification/provenance.md), [sources.md](../linguistic/sources.md)).
- Termos de contribuição (DCO, arquivo NOTICE, linha de copyright) são questões em aberto; a seção 5 da Apache-2.0 já faz com que as contribuições entrem sob a mesma licença (inbound = outbound).

## Alternativas consideradas

- **MIT** — aceitável, mas não tem a concessão explícita de patentes da Apache-2.0.
- **Copyleft (GPL/AGPL)** — rejeitado: conflita com o objetivo de embutir packs em agentes comerciais.
