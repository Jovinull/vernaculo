# ADR-0018: Nível de evidência `corroborated`, renderizado à parte e só em intensidade moderada

- Status: Aceito
- Data: 2026-09-29
- Origem: decisão do mantenedor ("criar uma categoria inferior a reported e attested, mas maior que hypothesis, para formas que parecem óbvias, e enviá-las para a IA"), depois de a pesquisa de Salvador mostrar que quase todas as expressões que tornam a fala reconhecível só aparecem em fontes populares

## Contexto

Até aqui havia dois níveis renderizados (`attested`: estudo ou obra de referência;
`reported`: confirmação por falantes) e um não renderizado (`hypothesis`). A pesquisa
do pack de Salvador mostrou um buraco entre eles: a literatura acadêmica documenta
bem a gramática, mas quase nada das gírias e expressões correntes ("barril",
"me respeite", "lá ele"), que são justamente o que faz alguém reconhecer a
variedade. Essas formas aparecem, com o mesmo sentido, em vários jornais locais,
mas continuavam como hipóteses, invisíveis para o modelo, até uma rodada de revisão
por falantes, que é recomendada e nunca obrigatória
([ADR-0015](0015-human-review-recommended-not-mandatory.md)).

"Parece óbvio" não serve como critério: para quem não é da região, o que parece
óbvio é o que a mídia repete, e é aí que mora o estereótipo. Mas "várias fontes
públicas independentes, entre elas locais, descrevem a forma do mesmo jeito" é um
critério verificável por qualquer pessoa.

## Decisão

- Novo valor de `evidence`: **`corroborated`**, entre `hypothesis` e
  `attested`/`reported`. Significa: descrito da mesma forma por pelo menos duas
  fontes públicas independentes, ainda sem confirmação por falantes.
- **Regras normativas (verificadas pelo validador):**
  - pelo menos **2 fontes distintas** em `sources` (`insufficient-corroboration`);
  - **`minIntensity` ≥ 0.5** (`corroborated-below-min-intensity`): fica excluído de
    qualquer compilação abaixo de 0.5. O padrão recomendado dos packs é 0.15–0.35,
    então a forma fica ausente quando esse padrão é seguido; o validador não impede
    um pack de escolher `defaultIntensity` ≥ 0.5.
- **Renderização:** a IR separa essas formas em `corroborated`; os renderizadores as
  apresentam numa seção própria, identificadas como ainda não confirmadas por
  falantes, com a instrução de usá-las raramente, só em conversa claramente
  informal, no máximo uma por resposta e nunca quando houver forma confirmada que
  sirva.
- **Critérios de método (não verificáveis por máquina; revisados no PR):**
  - as fontes são de veículos ou autores diferentes — publicações do mesmo grupo de
    mídia contam como uma só — e pelo menos uma é local (produzida na região); a
    independência também vale para a origem da evidência: republicações da mesma nota,
    cópias do mesmo glossário ou reportagens baseadas na mesma entrevista contam como
    uma origem;
  - todas descrevem o mesmo sentido;
  - não contam: páginas de humor, memes, esquetes, personagens, letras de música e
    dicionários colaborativos;
  - se a única base forem retratos de mídia e uma fonte disser que a forma é um clichê
    difundido pela mídia ou um estereótipo ("ímã de caricatura"), não promovê-la por
    repetição; manter `hypothesis`. Evidência acadêmica direta e revisão por falantes
    são avaliadas em seus níveis próprios (`attested`/`reported`);
  - se uma fonte de pesquisa ou obra de referência já sustenta `attested`, não usar
    `corroborated` para a mesma alegação.
- **Alcance da afirmação:** `corroborated` indica convergência de fontes, não comprova
  frequência, exclusividade regional, distribuição por geração ou naturalidade para
  todo falante. As notas do traço DEVEM dizer o alcance que as fontes realmente dão.
- **É provisório por natureza:** a revisão por falantes promove a forma a `reported`
  ou a rebaixa para `hypothesis`/"evitar".

## Consequências

- `hypothesis` continua nunca renderizada; o invariante de não inventar
  regionalismos não muda: `corroborated` exige fontes reais e citadas.
- O formato ganha um valor de enum (mudança compatível na `v1alpha1`) e dois códigos
  de issue; a IR ganha o grupo `corroborated`; o compilador ganha a seção "Forms not
  yet confirmed by speakers"; a CLI mostra a contagem no `inspect`.
- Um pack pode incluir uma forma sustentada por convergência pública sem esperar a
  revisão, deixando visível que isso não equivale a frequência medida ou confirmação
  de falantes.
- A maturidade continua `draft`: `corroborated` não é revisão.

## Alternativas consideradas

- **Promover direto a `reported` o que "parece óbvio"** — rejeitado: registraria uma
  confirmação por falantes que não aconteceu.
- **Renderizar hipóteses em intensidade alta** — rejeitado: apagaria a diferença
  entre "várias fontes concordam" e "alguém mencionou uma vez".
- **Uma opção de compilação para incluir `corroborated`** — adiada: a trava de
  intensidade já dá o controle; pode ser acrescentada se evals mostrarem necessidade.
