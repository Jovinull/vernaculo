# Proveniência, evidência, maturidade e licenciamento do conteúdo

Credibilidade é um requisito central: toda afirmação que um pack faz sobre uma
variedade precisa ser rastreável, e o status geral do pack precisa ser visível para
usuários e modelos.

## Evidência (por traço)

| Valor | Significado | Renderizado? | Requisito |
| --- | --- | --- | --- |
| `attested` | documentado em fontes citadas (atlas, corpora, estudos, obras de referência) | sim | ≥ 1 fonte |
| `reported` | relatado por falantes ou revisores (rodadas de revisão são citadas como fontes `speaker-review`) | sim | ≥ 1 fonte |
| `corroborated` | usado só quando não há fonte para `attested`; duas fontes públicas independentes, com origens de evidência distintas e pelo menos uma local, concordam no sentido; sem revisão estruturada por falantes | sim, **à parte**, identificado como não validado por revisão de falantes | ≥ 2 fontes distintas; `minIntensity` ≥ 0.5 |
| `hypothesis` | plausível, mas não confirmado; mantido para pesquisa | **nunca** | — |
| `synthetic` | dado de teste inventado | sim, mas só em personas `fixture` | maturidade efetiva `fixture` |

É com essa separação que o projeto mantém evidência e hipótese distintas e aplica o
"nunca inventar regionalismos": uma forma não confirmada pode ser registrada sem
jamais chegar a um modelo.

`corroborated` ([ADR-0018](../decisions/0018-corroborated-evidence-level.md)) cobre o
meio-termo: formas que várias fontes públicas descrevem do mesmo jeito, mas que
falantes ainda não validaram por uma rodada de revisão (tipicamente gírias e
expressões correntes, que a literatura acadêmica quase não documenta). O rótulo
indica convergência documental; não prova frequência, exclusividade regional,
distribuição por geração ou naturalidade para todo falante. Elas chegam ao modelo
com três travas:
só a partir da intensidade 0.5, numa seção separada que as identifica como não
confirmadas e com a instrução de usá-las raramente. Os critérios para aceitar as
fontes (veículos diferentes, pelo menos uma local, mesmo sentido; humor, memes,
música e dicionários colaborativos não contam; "ímãs de caricatura" continuam
hipótese) estão na [metodologia](../linguistic/methodology.md#evidência). A revisão
por falantes promove essas formas a `reported` ou as rebaixa.

## Fontes

As entradas de `provenance.sources[]` têm um `id` referenciado por traços, exemplos e
itens desencorajados, mais:

- `type`: `atlas`, `corpus`, `study`, `reference-work`, `speaker-review`, `other`;
- `title` e, opcionalmente, `citation`, `url`, `accessed` (AAAA-MM-DD, entre aspas);
- `license`: a licença da fonte, como entendida no momento da consulta;
- `usage`: o que o pack faz com a fonte:

| `usage` | Significado | Exigência de licença |
| --- | --- | --- |
| `consulted` | lida para embasar a pesquisa; nada copiado | respeitar os termos de acesso |
| `cited` | referenciada ou citada brevemente, com atribuição | citação permitida |
| `redistributed` | material copiado para o pack | a licença DEVE permitir redistribuição sob a licença do pack |

As fontes são herdadas pela linhagem (mescladas por `id`). Uma referência a uma
fonte que não existe na persona achatada é erro (`unknown-source`).

Fontes de pesquisa conhecidas e suas licenças verificadas: [linguistic/sources.md](../linguistic/sources.md).

## Maturidade (por persona)

| Nível | Significado | Quem pode definir |
| --- | --- | --- |
| `fixture` | dado sintético para testes e demonstrações; **não é conteúdo linguístico** | qualquer pessoa, para testes |
| `draft` | em pesquisa; não revisado por falantes | autores do pack |
| `reviewed` | uma revisão humana por falantes da variedade realmente aconteceu e está documentada ([human-review.md](../linguistic/human-review.md)) | autores/mantenedores do pack, quando isso for verdade; cite a rodada como fonte `speaker-review` (recomendado) |

- A **maturidade efetiva** de uma persona é o nível menos maduro da linhagem; uma persona `reviewed` que estende uma `draft` é, na prática, `draft`.
- Os renderizadores DEVEM mostrar na saída a maturidade quando ela não for `reviewed` (o compilador de referência adiciona um aviso; a CLI também avisa no stderr).
- Não existe, de propósito, **nenhum nível `validated`**: o projeto não tem um processo de validação que justifique a palavra. Adicionar um nível (por exemplo, "evaluated", ligado a resultados de evals) exige mudanças na especificação e na metodologia.
- **A revisão humana é sempre recomendada e nunca obrigatória** ([ADR-0015](../decisions/0015-human-review-recommended-not-mandatory.md)): não há número mínimo de revisores nem limiar de concordância, e packs `draft` podem ser publicados e usados. As ferramentas recomendam revisão para toda persona `draft`. `reviewed` é a afirmação honesta de que uma revisão aconteceu, não um limiar de qualidade.

## Licenciamento do conteúdo das personas

- `metadata.license` declara a licença do *conteúdo desta persona* (expressão SPDX recomendada). Ela não é herdada: uma persona derivada declara a sua, e as licenças da linhagem continuam visíveis (metadados da linhagem, cabeçalhos dos arquivos ejetados, `sources.md` da skill).
- A licença do código do repositório (Apache-2.0) não licencia, por si só, material de terceiros ([ADR-0012](../decisions/0012-apache-2-0-code-license.md)).
- O conteúdo da biblioteca oficial é licenciado sob **Apache-2.0**, como o código: toda persona em `personas/` declara `metadata.license: Apache-2.0` (verificado por um teste). Veja o [ADR-0014](../decisions/0014-apache-2-0-persona-content.md).
