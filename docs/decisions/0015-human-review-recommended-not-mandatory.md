# ADR-0015: Revisão humana sempre recomendada, nunca obrigatória

- Status: Aceito
- Data: 2026-09-29
- Origem: decisão do mantenedor ("sem critério de revisão obrigatório, mas sugerir sempre que seja revisado"), resolvendo a questão em aberto sobre critérios para a maturidade `reviewed`

## Contexto

A metodologia valoriza a revisão por falantes de cada variedade, e o bootstrap
deixou em aberto quais critérios (número de revisores, limiares de concordância,
rótulos bloqueantes) seriam exigidos para marcar um pack como `reviewed`.
Critérios obrigatórios transformariam a revisão em um portão que um projeto open
source pequeno talvez não consiga sustentar, bloqueando packs úteis; nenhum
critério, por outro lado, arriscaria apresentar packs como mais confiáveis do que
são.

## Decisão

- **Nenhum critério de revisão obrigatório.** Não há número mínimo de revisores,
  limiar de concordância nem portão de revisão para fazer merge, publicar ou usar
  um pack. Packs `draft` podem ser publicados e usados.
- **A revisão é sempre recomendada.** A documentação e as ferramentas recomendam
  revisão humana por falantes da variedade sempre que uma persona não está
  `reviewed`:
  - a CLI imprime uma recomendação em `compile`, `export` e `eject` de uma persona
    `draft`, `inspect` mostra uma linha "human review" e `validate` resume quantas
    personas em rascunho se beneficiariam de revisão;
  - a camada compilada mantém o aviso `DRAFT`;
  - a documentação e os guias de contribuição apresentam a revisão como o próximo
    passo recomendado.
- **`reviewed` continua sendo uma afirmação honesta**: significa que uma revisão
  humana por falantes da variedade realmente aconteceu e está documentada
  (recomendado: citar a rodada como fonte `speaker-review` em `provenance.sources`
  e manter o registro junto ao pack). Quão extensa foi a revisão aparece nesse
  registro, não em um limiar.
- Invariantes inalterados: a maturidade é sempre visível nas saídas; nada é chamado
  de validado, natural, representativo ou livre de estereótipos sem evidência
  ([ADR-0010](0010-observable-sociolinguistic-features-only.md)); conteúdo que
  qualquer pessoa (revisora ou não) identifique como caricato ou ofensivo é tratado
  pela política anti-caricatura — removido, desencorajado ou transformado em
  antipadrão — independentemente da maturidade.

## Consequências

- O processo de revisão da metodologia ([human-review.md](../linguistic/human-review.md))
  é orientação: rótulos, perfis de revisores, privacidade e formato de registro são
  recomendações para fazer uma boa revisão.
- Os usuários decidem quanta revisão o produto deles precisa; o nível de maturidade e
  o registro de revisão dão a informação para essa decisão.
- Um nível futuro mais forte (por exemplo, "evaluated", ligado a resultados de evals)
  exigiria um ADR novo e uma mudança na especificação; também seria informativo, não
  um portão.

## Alternativas consideradas

- **Critérios fixos para `reviewed`** (por exemplo, ≥ N revisores, concordância ≥ X) — rejeitado pelo mantenedor: um portão que o projeto talvez não consiga sustentar.
- **Nenhum nível de maturidade** — rejeitado: usuários e modelos precisam ver se o conteúdo foi revisado.
