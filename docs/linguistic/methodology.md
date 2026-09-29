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

- Comece pela unidade mais específica para a qual há evidência — geralmente uma cidade (`pt-BR/ba/salvador`), não um estado.
- Crie personas mais amplas (`pt-BR/ba`) só se houver evidência de traços compartilhados em toda aquela área, e compartilhe-os com `extends` explícito, nunca pelo caminho do id.
- Variedades que não seguem fronteiras administrativas (a conversa citou o Recôncavo, o sul da Bahia, o interior de Sergipe) podem ser representadas com slugs próprios **quando houver evidência**. Nenhuma variedade é inventada antecipadamente.
- A variação urbana vs. rural, de idade, de classe e de registro dentro de uma localidade é real; a v1alpha1 não tem modelagem dedicada para ela além da intensidade e das notas. A modelagem de registro é uma questão em aberto.

## Evidência

Cada traço precisa de um nível de evidência ([provenance.md](../specification/provenance.md)):

1. Prefira evidência **attested** vinda de fontes linguísticas primárias (atlas, corpora, estudos revisados por pares, obras de referência).
2. Use evidência **reported** vinda de revisões estruturadas por falantes, citadas como fontes `speaker-review`.
3. Mantenha todo o resto como **hypothesis** (nunca renderizada) até ser confirmado.
4. Nunca use como evidência texto gerado por IA, piadas, memes, estereótipos de dublagem/novela ou "listas de gírias regionais".

Registre em `notes`, para cada traço, o alcance da evidência (quais falantes, qual
período, qual contexto) quando for relevante, e prefira o uso contemporâneo para
agentes que conversam com os clientes de hoje.

## Fontes e licenças

Separe o que você pode **consultar**, **citar** e **redistribuir**
([sources.md](sources.md)). Não copie corpora, transcrições ou conteúdo de atlas
para os packs, a menos que a licença permita redistribuição sob a licença do pack.
Descrever um traço com suas próprias palavras, com citação, é o caso normal.

## Exemplos e antipadrões

- Exemplos positivos mostram uma frase neutra e a mesma frase com a camada aplicada, em uma intensidade declarada, em situações realistas (atendimento primeiro).
- Antipadrões mostram o que nunca deve ser produzido: empilhar marcadores, grafia fonética, atitudes estereotipadas, formas de outra região, palavras inventadas, registro errado.

## Revisão e avaliação

- A revisão por pessoas familiarizadas com a variedade é sempre recomendada, nunca obrigatória ([human-review.md](human-review.md), [ADR-0015](../decisions/0015-human-review-recommended-not-mandatory.md)).
- Todo pack é avaliado com evals locais e reproduzíveis ([evals/strategy.md](../evals/strategy.md)).
- Afirmações sobre um pack (natural, representativo, validado) só são feitas com evidência de revisão e evals.

## Packs iniciais

Salvador/BA, Aracaju/SE, Recife/PE e São Paulo/SP — veja [regional-packs.md](regional-packs.md).
A pesquisa para eles **não começou**; o repositório contém apenas fixtures sintéticos.
