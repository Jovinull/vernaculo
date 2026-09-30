# Metodologia linguística

Como os packs de persona regional são pesquisados, escritos e verificados. É uma
metodologia de trabalho para um projeto jovem; ela será refinada com linguistas e
revisores à medida que os primeiros packs forem construídos.

## Objetivo

**Naturalidade** sociolinguística, não caricatura: saída que falantes de uma
variedade reconhecem como plausível, em uma intensidade controlada, enquanto o
agente hospedeiro mantém seu papel e suas regras.

## O que é modelado

Traços de uso da língua observáveis e defensáveis:

| Dimensão | Campo da persona |
| --- | --- |
| Léxico e regionalismos | `vocabulary.preferred`, `vocabulary.contextual` |
| Formas a evitar (de outra região, antiquadas, ofensivas, caricatas) | `vocabulary.discouraged`, `antiPatterns` |
| Marcadores discursivos | `discourse.markers` |
| Construções morfossintáticas | `morphosyntax.patterns` |
| Formas de tratamento | `pragmatics.addressForms` |
| Convenções conversacionais (cumprimentar, confirmar, discordar, se despedir) | `pragmatics.*` |
| Marcação / frequência | `minIntensity`, faixas de intensidade |
| Política de ortografia | `orthography.phoneticSpelling` |
| Ilustrações | `examples` (positivos), `antiPatterns` (negativos) |

Nunca modelado: personalidade, humor, inteligência, simpatia, agressividade,
escolaridade, renda, classe social, profissão, religião, política ou comportamento
([anti-caricature.md](anti-caricature.md)).

## Granularidade

Rótulos administrativos (*baiano*, *sergipano*, *pernambucano*, *paulista*) são
grossos demais para serem tratados como unidades linguísticas homogêneas. O atlas
ALiB trata a variação como geográfica **e** multidimensional (sexo, faixa etária e
escolaridade dos informantes), cobrindo capitais e localidades do interior, e há
pesquisas que mostram continuidades que atravessam fronteiras estaduais (por
exemplo, entre Bahia e Sergipe).

Por isso:

- Escolha o escopo que a pesquisa consegue sustentar. Se o produto começar por um estado, limite a camada a formas explicitamente associadas a esse estado; não a apresente como voz uniforme nem copie automaticamente traços da capital.
- Um rótulo lexicográfico como `Reg (BA)` pode sustentar a disponibilidade contextual de uma forma no pack estadual, mas não mede frequência, distribuição por cidade ou uso por todos. Regras gramaticais e padrões de frequência estaduais precisam de dados de várias localidades.
- Um pack de escopo mais amplo pode ser uma seleção curta de opções bem documentadas, em vez de um retrato completo. Registre o que ficou de fora e por quê.
- Componha níveis (`pt-BR/ba` → `pt-BR/ba/salvador`) apenas com `extends` explícito e revisão da sobreposição; o caminho do id nunca cria herança.
- Variedades que não seguem fronteiras administrativas (a conversa citou o Recôncavo, o sul da Bahia, o interior de Sergipe) podem ser representadas com slugs próprios **quando houver evidência**. Nenhuma variedade é inventada antecipadamente.
- A variação urbana vs. rural, de idade, de classe e de registro dentro de uma localidade é real; a v1alpha1 não tem modelagem dedicada para ela além da intensidade e das notas. A modelagem de registro é uma questão em aberto.

## Evidência

Cada traço precisa de um nível de evidência ([provenance.md](../specification/provenance.md)):

1. Prefira evidência **attested** vinda de fontes linguísticas primárias (atlas, corpora, estudos revisados por pares, obras de referência).
2. Use evidência **reported** vinda de revisões estruturadas por falantes, citadas como fontes `speaker-review`.
3. Use **corroborated** ([ADR-0018](../decisions/0018-corroborated-evidence-level.md)) só quando não houver uma fonte de pesquisa ou referência que sustente `attested`, mas houver convergência pública independente e todos os critérios abaixo valerem:
   - pelo menos **duas fontes de veículos ou autores diferentes**; publicações do mesmo grupo de mídia contam como uma só;
   - a independência vale para a base da evidência, não só para o domínio: matérias que republicam a mesma nota, citam o mesmo glossário ou reciclam a mesma entrevista contam como uma origem, ainda que saiam em veículos diferentes;
   - só contam veículos de imprensa, emissoras, podcasts ou canais com falantes identificáveis e obras publicadas com autoria identificável; blogs de empresas e sites anônimos de listas de gírias não contam;
   - pelo menos **uma fonte local** (produzida na região: jornal, portal, rádio, podcast ou canal com falantes de lá);
   - **o mesmo sentido** em todas as fontes; uma ocorrência em fala ou texto publicado também pode contar se o contexto deixa inequívoco o sentido e se a ocorrência veio de um evento independente;
   - nenhuma das fontes é página de humor, meme, esquete, personagem, letra de música ou dicionário colaborativo;
   - se a única base forem retratos de mídia e uma fonte disser que a forma é um clichê difundido pela mídia ou um estereótipo, não promover por repetição: manter `hypothesis`. Evidência acadêmica direta ou revisão por falantes é avaliada nos níveis próprios (`attested`/`reported`), não apagada por esse filtro;
   - `minIntensity` ≥ 0.5 (mais alto para formas fortes ou de uma geração específica).
4. Mantenha todo o resto como **hypothesis** (nunca renderizada) até ser confirmado.
5. Nunca use como evidência texto gerado por IA, piadas, memes, estereótipos de dublagem/novela ou "listas de gírias regionais". Episódios de podcast e entrevistas jornalísticas servem para achar pistas; sozinhos, não constituem revisão estruturada (`reported`) nem estudo linguístico (`attested`). Já um estudo acadêmico que analise e contextualize fala registrada pode sustentar `attested`.

`corroborated` atesta convergência entre fontes, não frequência, exclusividade regional,
distribuição entre gerações nem naturalidade para qualquer falante. Registre esses
limites em `notes`; a revisão por falantes continua recomendada.

Registre em `notes`, para cada traço, o alcance da evidência (quais falantes, qual
período, qual contexto) quando for relevante, e prefira o uso contemporâneo, que é
o que uma IA escrevendo hoje precisa.

## Nenhum caso de uso pressuposto

Um pack descreve a variedade, não um uso: ele serve a assistentes, tutores,
personagens, ferramentas de escrita, atendimento ou qualquer outra IA que escreva na
língua ([ADR-0017](../decisions/0017-any-ai-use-case-neutral-packs.md)). Quando a
adequação de uma forma depende da situação, descreva-a pelo **registro e pela
relação** — formal/informal, interlocutor desconhecido, mais velho ou próximo,
situação de problema ou de celebração —, nunca por papel ("cliente", "venda").
Restrições próprias de um uso (o guia de estilo de uma empresa, por exemplo) ficam
na IA hospedeira ou numa persona de projeto com `extends`.

## Fontes e licenças

Separe o que você pode **consultar**, **citar** e **redistribuir**
([sources.md](sources.md)). Não copie corpora, transcrições ou conteúdo de atlas
para os packs, a menos que a licença permita redistribuição sob a licença do pack.
Descrever um traço com suas próprias palavras, com citação, é o caso normal.

## Exemplos e antipadrões

- Exemplos positivos mostram uma frase neutra e a mesma frase com a camada aplicada, em uma intensidade declarada, em situações realistas e variadas (pedir ajuda, explicar algo, conversa descontraída, situação formal), sem pressupor um caso de uso.
- Antipadrões mostram o que nunca deve ser produzido: empilhar marcadores, grafia fonética, atitudes estereotipadas, formas de outra região, palavras inventadas, registro errado.

## Revisão e avaliação

- A revisão por pessoas familiarizadas com a variedade é sempre recomendada, nunca obrigatória ([human-review.md](human-review.md), [ADR-0015](../decisions/0015-human-review-recommended-not-mandatory.md)).
- Todo pack é avaliado com evals locais e reproduzíveis ([evals/strategy.md](../evals/strategy.md)).
- Afirmações sobre um pack (natural, representativo, validado) só são feitas com evidência de revisão e evals.

## Packs iniciais

Salvador/BA, Aracaju/SE, Recife/PE e São Paulo/SP — veja [regional-packs.md](regional-packs.md).
Salvador tem um rascunho baseado em pesquisa bibliográfica, ainda sem revisão por
falantes; a pesquisa dos outros três **não começou**.
