# Packs de persona regional

Um **pack de persona regional** (a conversa também usou “Regional Style Pack”) é uma
persona que descreve uma variedade linguística, publicada na biblioteca em
[personas/](../../personas/). O nome “persona” é mantido por continuidade; um pack
nunca descreve uma personalidade ([ADR-0010](../decisions/0010-observable-sociolinguistic-features-only.md)).

## Escopo atual

O foco é começar pela Bahia em escopo estadual e só depois decidir como especializar
os dados por cidade ou comunidade. Isso não significa presumir uma voz baiana única:
os estudos consultados documentam diferenças entre capital, interior e comunidades
específicas.

| Id | Variedade | Status |
| --- | --- | --- |
| [pt-BR/ba](../../personas/pt-BR/ba/) | Bahia, escopo estadual | rascunho `draft` 0.1.0 — pesquisa bibliográfica, sem revisão por falantes ([dossiê](../../personas/pt-BR/ba/RESEARCH.md)) |
| [pt-BR/ba/salvador](../../personas/pt-BR/ba/salvador/) | Salvador (BA) | rascunho `draft` 0.1.0 — recorte separado, sem revisão por falantes ([dossiê](../../personas/pt-BR/ba/salvador/RESEARCH.md)) |

O pack estadual inclui poucas opções lexicais com rótulo de referência para a Bahia e
explicita os limites de cada uma. Não generaliza para todo o estado traços documentados
apenas em Salvador ou em uma comunidade. A camada estadual não herda automaticamente
para Salvador: ids hierárquicos só compõem packs quando `extends` declara a relação
([especificação](../specification/inheritance-and-composition.md)).

Cada pack tem intensidade configurável, fontes, exemplos positivos e negativos e
proveniência sob Apache-2.0 ([ADR-0014](../decisions/0014-apache-2-0-persona-content.md)).
A revisão humana por falantes é recomendada, nunca obrigatória
([ADR-0015](../decisions/0015-human-review-recommended-not-mandatory.md)); `reviewed`
só pode ser usado quando essa revisão realmente acontecer. Os packs atuais seguem
como `draft`.

## O que sustenta a camada estadual

O dossiê de [pt-BR/ba](../../personas/pt-BR/ba/RESEARCH.md) usa estudos da UFBA e o
Michaelis para delimitar o que se pode afirmar:

- “massa”, como elogio informal, tem rótulo regional BA e MG; é compatível com a Bahia,
  mas não é sinal exclusivo dela;
- “porreta” tem rótulo coloquial BA e fica reservado a intensidade alta e contextos
  informais;
- “queimado” (bala/doce) tem pistas históricas, mas ainda não evidência suficiente de
  uso atual em diferentes regiões; por isso permanece como hipótese não renderizada;
- “oxe” e “vixe” são registrados como nordestinos em geral, “baba” foi pesquisado em
  Salvador, e “meu rei”, “barril” e outras expressões populares ainda não têm evidência
  suficiente para representar a Bahia inteira;
- não há regra estadual para pronomes ou imperativo no pack atual. A coletânea
  *Português baiano* relata diferenças entre áreas urbanas e comunidades rurais.

O objetivo imediato é um conjunto curto, verificável e sem caricatura. O dossiê tem
uma autorrevisão textual com cenários formais, informais, neutros e adversariais. Ela
ajuda a achar exageros, mas não mede reconhecimento por falantes e não valida a
naturalidade do pack.

## Estrutura

Fonte de cada pack na v1alpha1:

```text
personas/pt-BR/ba/
├── persona.yaml
└── RESEARCH.md

personas/pt-BR/ba/salvador/
├── persona.yaml
└── RESEARCH.md
```

O `RESEARCH.md` explica de onde veio cada decisão, o que ficou de fora, as licenças e
as limitações. É documentação para pessoas; as ferramentas ignoram esse arquivo e o
`persona.yaml` é a fonte do comportamento. As ferramentas também ignoram outros
artefatos de pesquisa que não fazem parte do formato.

Uma estrutura futura com `SKILL.md`, vocabulários separados e evals por pack ainda
não foi adotada; a especificação será estendida antes de virar contrato.

## Granularidade e variedades futuras

Os ids permitem granularidade progressiva (`pt-BR` → `pt-BR/ba` →
`pt-BR/ba/salvador`) e variedades não administrativas, mas cada camada precisa de
evidência própria ([methodology.md](methodology.md#granularidade)). Uma cidade não é
um exemplo intercambiável de todo o estado, e a existência de um pack-base não implica
herança automática.

Outras ideias citadas na conversa, ainda sem pesquisa iniciada: Aracaju/SE, Recife/PE,
São Paulo/SP; Recôncavo, sul da Bahia e outras regiões internas da Bahia; `pt-PT/lisboa`,
`es-AR/buenos-aires`, `es-MX/cdmx`, `en-US/ny/new-york`, `en-US/tx` e `en-GB/london`.
Variantes por caso de uso não entram na biblioteca: são personas de projeto
([ADR-0017](../decisions/0017-any-ai-use-case-neutral-packs.md)).

## Fixtures não são packs

[fixtures/personas](../../fixtures/personas) contém personas sintéticas
(`maturity: fixture`, `evidence: synthetic`) em `pt-BR/x-fixture/...`. As formas
“regionais” delas são marcadores inventados, como `termo-sintético-a`. Elas existem
para testar e demonstrar as ferramentas e nunca devem ser apresentadas ou copiadas
como conteúdo linguístico.

## Contribuindo com um pack

Veja [development/contributing-personas.md](../development/contributing-personas.md)
e a skill de projeto `linguistic-research`.
