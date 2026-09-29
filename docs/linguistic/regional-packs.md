# Packs de persona regional

Um **pack de persona regional** (a conversa também usou "Regional Style Pack") é uma
persona que descreve uma variedade linguística, publicada na biblioteca em
[`personas/`](../../personas/). O nome "persona" é mantido por continuidade; um pack
nunca descreve uma personalidade ([ADR-0010](../decisions/0010-observable-sociolinguistic-features-only.md)).

## Conjunto inicial (direção para a v0.1)

Qualidade acima de cobertura: quatro packs excelentes em vez de 27 estados.

| Id | Variedade | Status |
| --- | --- | --- |
| `pt-BR/ba/salvador` | Salvador (BA) | não iniciado — pesquisa pendente |
| `pt-BR/se/aracaju` | Aracaju (SE) | não iniciado — pesquisa pendente |
| `pt-BR/pe/recife` | Recife (PE) | não iniciado — pesquisa pendente |
| `pt-BR/sp/sao-paulo` | São Paulo (SP) | não iniciado — pesquisa pendente |

Cada um virá com intensidade configurável, fontes, exemplos positivos e negativos,
verificações automáticas e evals, sob Apache-2.0
([ADR-0014](../decisions/0014-apache-2-0-persona-content.md)). A revisão humana por
falantes é recomendada para cada um deles (nunca obrigatória,
[ADR-0015](../decisions/0015-human-review-recommended-not-mandatory.md)); um pack só é
marcado `reviewed` quando uma revisão realmente aconteceu.

Se esses quatro vão compartilhar uma persona base `pt-BR`, e o que essa base poderia
conter de forma legítima, é uma [questão em aberto](../roadmap/open-questions.md) (a
estrutura da conversa tinha um diretório `personas/pt-BR/base/`).

## Estrutura

Fonte de um pack na v1alpha1:

```text
personas/pt-BR/ba/salvador/
└── persona.yaml          # o pack inteiro: traços, exemplos, antipadrões, proveniência
```

Proposto na conversa e **ainda não adotado** (questão em aberto: packs com vários arquivos):

```text
pt-BR/ba/salvador/
├── persona.yaml
├── SKILL.md                          # gerado na v1alpha1 (vernaculo export), não escrito à mão
├── knowledge/{vocabulary,discourse,pragmatics,grammar}.yaml
├── examples/{customer-service,casual,professional}.yaml
├── evals/{naturalness,regionality,stereotypes}.yaml
└── SOURCES.md
```

Quando existirem evals e registros de revisão por pack, eles ficarão ao lado do
`persona.yaml`; a especificação será estendida antes.

## Granularidade e variedades futuras

Os ids permitem granularidade progressiva (`pt-BR` → `pt-BR/ba` → `pt-BR/ba/salvador`)
e variedades não administrativas, mas só com evidência
([methodology.md](methodology.md#granularidade)). Ideias citadas na conversa, nenhuma
delas trabalho planejado ainda:

- Brasil: `pt-BR/ba/reconcavo`, `pt-BR/ba/sul`, `pt-BR/se/interior`;
- outros idiomas: `pt-PT/lisboa`, `es-AR/buenos-aires`, `es-MX/cdmx`, `en-US/ny/new-york`, `en-US/tx`, `en-GB/london`;
- registros como subpersonas: `pt-BR/ba/salvador/customer-service`, `.../casual`, `.../formal` (questão em aberto).

## Fixtures não são packs

[`fixtures/personas`](../../fixtures/personas) contém personas sintéticas
(`maturity: fixture`, `evidence: synthetic`) em `pt-BR/x-fixture/...`. As formas
"regionais" delas são marcadores inventados como `termo-sintético-a`. Elas existem
para testar e demonstrar as ferramentas e nunca devem ser apresentadas ou copiadas
como conteúdo linguístico.

## Contribuindo com um pack

Veja [development/contributing-personas.md](../development/contributing-personas.md)
e a skill de projeto `linguistic-research`.
