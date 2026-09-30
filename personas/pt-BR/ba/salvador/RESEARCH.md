# Dossiê de pesquisa — `pt-BR/ba/salvador`

Este dossiê registra de onde veio cada decisão do pack
[`persona.yaml`](persona.yaml): o que cada fonte diz, o que entrou no pack, o que
ficou como hipótese, o que foi descartado e o que ainda precisa ser perguntado a
falantes de Salvador.

| | |
| --- | --- |
| Versão do pack | 0.1.0 |
| Maturidade | `draft` — pesquisa bibliográfica; **nenhuma revisão por falantes ainda** |
| Pesquisa feita em | 2026-09-29 |
| Escopo de uso | qualquer IA que escreva em pt-BR; o pack descreve a variedade, não pressupõe uma aplicação ([ADR-0017](../../../../docs/decisions/0017-any-ai-use-case-neutral-packs.md)). Intensidade padrão 0.25 |
| Licença do pack | Apache-2.0 |

Nada aqui permite dizer que o pack é natural, representativo ou validado. A revisão
por falantes de Salvador é recomendada antes de uso em produção
([human-review.md](../../../../docs/linguistic/human-review.md)); ela não é
obrigatória ([ADR-0015](../../../../docs/decisions/0015-human-review-recommended-not-mandatory.md)).

## Escopo

- **Variedade:** fala urbana de Salvador. Não é "o baiano": a bibliografia registra
  diferenças dentro da Bahia. Em Salvador, "você" predomina amplamente sobre "tu",
  embora haja ocorrências minoritárias de "tu"; em Santo Antônio de Jesus, as duas
  formas são usuais.
- **Canal:** texto. Sotaque e pronúncia ficam fora (a grafia fonética é proibida
  pela [política anticaricatura](../../../../docs/linguistic/anti-caricature.md)).
- **Uso:** nenhum pressuposto. Quando a adequação de uma forma depende da situação,
  o pack a descreve pelo registro e pela relação (formal/informal, interlocutor
  desconhecido, mais velho ou próximo), não por papel ("cliente", "venda"). Ajustes
  para um uso específico ficam na IA hospedeira ou numa persona de projeto com
  `extends`.
- **O que a camada nunca introduz:** palavrões, gírias de grupo sem evidência e
  formas familiares dirigidas ao interlocutor (como "mainha"), mesmo quando
  documentadas na fala da cidade.

## Critério de evidência usado

| Tipo de fonte | Nível no pack |
| --- | --- |
| Estudo acadêmico com corpus ou fonte primária identificável sobre Salvador (dissertação, tese, TCC ou artigo revisado) | `attested` para o tipo de ocorrência que a fonte documenta; delimitar amostra, meio e população |
| Dicionário de referência com rótulo regional (Reg (BA), Reg (N.E.)) | `attested` para o rótulo e o sentido |
| A mesma descrição ou uso inequívoco em ≥ 2 fontes públicas independentes (≥ 1 local), sem fonte acadêmica/referencial que sustente `attested` | `corroborated` ([ADR-0018](../../../../docs/decisions/0018-corroborated-evidence-level.md)): vai para a IA só a partir de 0.5, numa seção marcada como não validada por revisão estruturada de falantes |
| Fonte única, sentidos divergentes, humor, meme, música, dicionário colaborativo, "ímã de caricatura" | `hypothesis` (nunca renderizada) ou só pista neste dossiê |
| Revisão por falantes (ainda não houve) | seria `reported` |

## O que entrou no pack (renderizado)

| Traço | Nível | Fontes | A partir de | Observação |
| --- | --- | --- | --- | --- |
| Preferência por "você" como forma de sujeito; "tu" não é tratado como impossível | attested | Oliveira e Mota (2020), com síntese de dados do ALiB e outros estudos | 0 < intensidade | "Você" é amplamente predominante; as amostras também registram uma parcela pequena de "tu" |
| "lhe" e "te" como objetos de 2ª pessoa, escolhidos conforme relação e registro | attested | Almeida (2009, 2016); Almeida e Antonino (2020) | 0 < intensidade | Ver números e limites das amostras abaixo; os dois pronomes são usados em Salvador |
| "o senhor" / "a senhora" como tratamento de deferência ou convenção familiar | attested | Oliveira, S. C. (2014); Oliveira e Mota (2020) | 0 < intensidade | "Você" predomina no trato geral; "senhor/senhora" aparece sobretudo no trato de filhos com os pais |
| Imperativo na forma do subjuntivo ("me diga", "deixe eu ver", "olhe", "venha") | attested | Scherre (2007); Santos, Muniz e Barros (2024) | 0 < intensidade | Cerca de três quartos dos imperativos em Salvador; no Sul, Sudeste e Centro-Oeste predomina a outra forma. Ver abaixo |
| "queimado" (bala) | attested | Yida (2011), dados do ALiB | 0.5 | A tabela registra sete ocorrências em Salvador; dado de fala da capital, não de todo o estado |
| "baba" (pelada, futebol informal) | attested | Caldas e Abrahão (2023) | 0.5 | Só quando o assunto for futebol; uma fonte só, a confirmar |
| "buzu" (ônibus) | **attested** | Pimentel (2012); Santos (2013); Alma Preta (2024) | 0.5 | Fala citada em estudos etnográficos de Salvador; usar só com contexto de transporte claro |
| "barril" (situação difícil, complicada ou arriscada) | **attested** | Santos (2023); A Tarde (2025); Correio (2018) | 0.7 | O TCC analisa posts de uma criadora soteropolitana, não fala espontânea; só o sentido negativo entra |
| "massa" (adjetivo: ótimo) | attested | Michaelis | 0.5 | Só sobre coisas/situações; nunca sobre pessoas (outra acepção: pessoa atraente) nem como substantivo (acepção Reg (BA): maconha) |
| "vixe" (surpresa) | attested | Michaelis | 0.7 | Regionalismo do Nordeste, não exclusivo de Salvador |
| "oxe" (espanto, surpresa) | attested | Michaelis | 0.75 | Nordeste em geral; um dos traços mais estereotipados, por isso a intensidade mínima alta e o limite de uma vez por conversa |
| "porreta" (muito bom) | attested | Michaelis (abonação de Jorge Amado) | 0.85 | Deriva de "porra"; pode soar grosseiro |

Na intensidade padrão (0.25) aparecem os traços gramaticais (tratamento, "lhe/te" e
imperativo); o vocabulário e as interjeições entram a partir de 0.5. O pack é marcado
sobretudo pela gramática, que é discreta mas real; o reconhecimento pelo vocabulário
depende de formas que ainda são hipóteses (veja "Reconhecimento" abaixo).

### Dados pronominais: amostras diferentes

O estudo de Almeida (2009), cujo PDF integral foi consultado nesta revisão, analisou
36 entrevistas e 682 ocorrências de objeto direto de segunda pessoa: "lhe" 37%, "te"
36%, objeto nulo 21% e "você" 6%. A autora descreve concorrência entre "lhe" e
"te", com variação relacionada à idade, ao monitoramento da fala e à relação entre
os interlocutores. São dados de fala coletados para uma dissertação, não uma
frequência esperada em toda conversa ou em texto escrito.

Almeida e Antonino (2020) também apresentam dados de uma amostra distinta de
Almeida (2016):

- Objeto direto de 2ª pessoa: "lhe" 42%, "te" 38%, objeto nulo 12%, "você" 6,5%,
  "o(a) senhor(a)" 1,4%.
- Teste de avaliação com 24 informantes de Salvador — escolha de "lhe" em cenários
  propostos:
  interlocutor desconhecido 56,2%; autoridade política 70,8%; professor 67%;
  amigo 41,7%; criança 29,2%; interlocutor mais velho 56%; mesma idade 44%;
  mais novo 36%.
- Os falantes atribuem a "lhe" cortesia, formalidade e deferência, e a "te"
  solidariedade, informalidade e intimidade. Em Salvador, "lhe" tende à
  neutralidade e o uso de "te" com desconhecidos **não** é julgado inadequado
  (diferente de Santo Antônio de Jesus).
- Almeida (2009) encontrou maior manutenção de "lhe" entre falantes mais velhos e
  maior avanço de "te" entre os mais jovens naquela amostra.

Esses números vêm de amostras, tarefas e datas diferentes; não devem ser combinados
como se fossem uma única distribuição. Para o pack, a consequência é oferecer as
duas formas e orientar a escolha pelo contexto, sem transformar tendências em regras
categóricas nem tratar "te" como erro.

### "Você", "tu" e "cê" na posição de sujeito

Oliveira e Mota (2020) resumem resultados de estudos de tratamento em Salvador. Nos
dados do ALiB ali citados, a distribuição é "tu" 2%, "você" 42% e sujeito nulo 56%.
O mesmo artigo resume outra amostra com 99% de "você" e 1% de "tu". As fontes e
amostras não são idênticas, mas ambas sustentam a predominância de "você" sem
justificar dizer que "tu" inexiste.

Santos e Carvalho (2020) analisam 16 entrevistas do PEPP e encontram "você" mais
frequente que a variante oral reduzida "cê"; descrevem ainda usos de "cê vê" e
"cê sabe" como construções discursivas. É uma opção documentada na fala popular,
mas o estudo não estabelece sua frequência na escrita digital contemporânea. Como
esta persona escreve em ortografia padrão e evita grafia fonética, "cê" não entra
como forma renderizada. A revisão humana pode avaliar se há contexto de escrita
informal em que a forma seja natural e desejável.

### Tratamento "você" e "o senhor/a senhora"

Oliveira e Mota (2020) estudam 49 soteropolitanos de 11 a 88 anos, em 16 famílias.
O resumo do artigo relata preferência por "você" no trato geral e pelo tratamento
"o senhor/a senhora" dos filhos para os pais. Os participantes associam "senhor/a"
a respeito, hierarquia e distância. Isso não sustenta usar o honorífico
automaticamente com qualquer pessoa mais velha: o pack o reserva para deferência ou
convenção já estabelecida.

### Imperativo: "me diga", "deixe eu ver"

É o traço gramatical mais nítido encontrado para distinguir Salvador de São Paulo,
Rio ou Brasília:

- Scherre (2007), lido na íntegra, reúne estudos de fala espontânea: em Salvador,
  só **28%** dos imperativos estão na forma associada ao indicativo ("deixa", "diz",
  "vai"); os outros ~72% estão na forma associada ao subjuntivo ("deixe", "diga",
  "vá"). Dados do NURC e do PEPP dos anos 1990 (Sampaio, 2001; Alves e Alves, 2005).
  No Rio de Janeiro, Brasília, Goiânia, Campo Grande e Florianópolis predomina a
  forma do indicativo; Recife fica em equilíbrio (51%).
- Santos, Muniz e Barros (2024) resumem estudos posteriores: **76%** de forma
  subjuntiva em Salvador (Oliveira, 2017) e **74,3%** na capital contra 21,1% em
  comunidades rurais da Bahia (Santos, 2016) — de novo, "o baiano" não é um só.
- Tendências gerais (Scherre, 2007): negação antes do verbo ("não deixe") favorece a
  forma do subjuntivo; eventos mais informais e frases afirmativas favorecem
  relativamente a do indicativo. Por isso o pack descreve uma preferência, não uma
  regra.
- Em texto formal escrito, a forma do subjuntivo é a norma padrão em todo o país. A
  marca de Salvador está em usá-la também na conversa informal ("Me diga uma coisa",
  "Olhe, ..."), onde um paulista diria "Me diz", "Olha".

## Reconhecimento: o que a pesquisa cobre e o que falta

O objetivo do pack é que quem é de Salvador reconheça o jeito de falar **sem achar
caricato** ([dimensão de reconhecimento](../../../../docs/evals/dimensions.md#reconhecimento)).
O balanço desta pesquisa:

- **Gramática: bem documentada.** Tratamento, pronomes e imperativo têm estudos
  acadêmicos sólidos sobre Salvador e já estão no pack.
- **Vocabulário típico: pouco documentado.** O Michaelis marca "massa" e "porreta"
  como regionais para BA; "queimado" aparece em sete registros da amostra de fala de
  Salvador no estudo de Yida (2011). Para "buzu", há fala de moradores em estudos
  etnográficos de Salvador (Pimentel, 2012; Santos, 2013), embora não um levantamento
  de frequência. Para "barril", o TCC de Santos (2023) analisa 13 posts de uma página
  criada por uma soteropolitana; isso documenta usos escritos e estilizados, mas não
  frequência em conversa espontânea. Outras formas bem conhecidas ("brocado",
  "pirangueiro") não aparecem com rótulo regional no Michaelis. Não localizamos
  estudo acadêmico ou dicionário de referência sobre "meu rei" nem sobre o marcador
  "viu?" em Salvador.
- **Consequência:** as expressões que mais geram reconhecimento estão como hipótese
  ou pista. O caminho para confirmá-las é o
  [questionário para falantes](SPEAKER-SURVEY.md): as respostas viram evidência
  `reported`, e as formas confirmadas entram no pack com a intensidade que os
  próprios falantes indicarem.
- **Medição:** o [laboratório](../../../../examples/agent-lab/) gera amostras cegas
  com a pergunta "de onde você diria que é quem escreveu?"; comparar o acerto no
  controle sem camada e nas intensidades mostra a partir de onde o pack fica
  reconhecível.

## Busca de corroboração (ADR-0018)

Critério: use `corroborated` apenas quando não houver fonte de pesquisa ou referência
que sustente `attested`. Exige a mesma descrição ou uso inequívoco em pelo menos duas
fontes públicas independentes, uma local; grupos de mídia diferentes contam como
independentes apenas se a base da evidência também for independente (Correio e iBahia
são ambos da Rede Bahia; republicações ou cópias da mesma entrevista/glossário contam
como uma origem). Humor, memes, música, blogs de empresas, sites anônimos de listas e
dicionários colaborativos não contam. Se a única base for retrato midiático que uma
fonte identifica como clichê ou estereótipo, fica `hypothesis`. Corroboração documental
não mede frequência, exclusividade regional ou naturalidade geral.

| Forma | Fontes independentes | Veredito |
| --- | --- | --- |
| barril | Santos (2023), TCC de Letras na UNEB, analisa 13 posts de Baianês Oficial; A Tarde (2025) e Correio (2018) descrevem o sentido negativo. A pesquisa da UNEB registra sentidos negativos e positivos, mas sua base é uma página de entretenimento criada por uma soteropolitana; dez dos 13 posts vêm de uma única publicação | `attested` pela regra atual do projeto para estudos acadêmicos; manter a limitação explícita. Não é evidência de frequência espontânea ou de uso uniforme. Só o sentido negativo entra no pack |
| buzu | Pimentel (2012) cita um jovem de Cosme de Farias dizendo "pegar o buzu de novo" e define o sentido em nota; Santos (2013) registra "buzu" em falas de entrevistados de Salvador e da região metropolitana. Alma Preta (2024) traz uso contemporâneo | `attested`; há exemplos de fala publicados, mas são amostras etnográficas localizadas, não confirmação estruturada por falantes nem medida de frequência |
| vumbora / bó | Só A Tarde entre veículos estabelecidos; o restante são blogs e listas | `hypothesis` |
| é bala | Correio e iBahia (mesmo grupo); o restante são blogs de empresas e páginas de meme | `hypothesis` |
| me respeite | Correio diz "não, recusa"; outras fontes dizem "pedir respeito" | `hypothesis` (sentidos divergentes) |
| é nenhuma / não é o quê? | Correio ("é isso mesmo"); uma lista atribui "é ninhuma" a Feira de Santana como "tudo bem" | `hypothesis` (sentidos e lugares divergentes) |
| abusado / abusar | "Zoar" (Correio), "perturbar", "irritado" (listas; esta última de Alagoas) | `hypothesis` (sentidos divergentes) |
| à vera | "De verdade" (A Tarde) e um sentido ligado a futebol em outra fonte | `hypothesis` (sentidos divergentes) |
| retado | Michaelis: Reg (BA), remete a "arretado 2", cujo sentido não foi localizado; fontes populares dão dois sentidos ("é retado" = ótimo; "tô retado" = zangado) | `hypothesis` até ler o verbete |
| lá ele | Bahia Notícias, BNews, iBahia e Terra concordam: resposta para se afastar de um duplo sentido, em tom de brincadeira | fora: função humorística, de duplo sentido; inadequada para uma IA |
| se pique / se plante | iBahia (2022, 2024) e KondZilla: "vá embora" / "fique na sua" | fora: pedidos ríspidos, que uma IA não deve dirigir a ninguém |
| pirangueiro | Sentidos divergentes (pão-duro, malvestido, sem dinheiro); uma definição tem conotação de classe social | fora |
| meu rei / minha rainha | Muitas fontes populares, mas uma aponta difusão pela TV | `hypothesis` ("ímã de caricatura") |

## Hipóteses registradas no pack (não renderizadas)

| Forma | Onde apareceu | Por que não é `attested` |
| --- | --- | --- |
| "meu rei" / "minha rainha" (vocativo afetivo) | Associação popular (música, jornalismo, glossários colaborativos) | Nenhum estudo acadêmico ou dicionário encontrado; muito estereotipado |
| Negação pós-verbal ("sei não", "tem não") | Literatura sobre o português do Nordeste | Nenhum estudo específico de Salvador encontrado; o estudo baiano localizado trata de comunidades rurais afro-brasileiras (Lucchesi, Baxter e Ribeiro, 2009) |

## Pistas que ficaram só neste dossiê

Expressões citadas por jornais como "de Salvador". **Não são evidência** e não
entram no pack: servem para montar perguntas aos revisores. Várias são gírias de
grupo ou de geração, que uma IA dificilmente usaria bem sem confirmação.

| Forma | Sentido segundo a matéria | Matéria |
| --- | --- | --- |
| à vera | de verdade | A Tarde (2025) |
| lá ele | interjeição de conversa | A Tarde (2025) |
| na telha | na cabeça, nos pensamentos | A Tarde (2025) |
| na pala | bem vestido | A Tarde (2025) |
| bateno | deslumbrante | A Tarde (2025) |
| bó (de "vumbora") | vamos embora | A Tarde (2025) |
| muxoxo | som de desaprovação | A Tarde (2025) |
| tá ligado?, brother | gírias dos anos 1990 | iBahia (2022) |
| sacou?, cria, cipá, paia, suave | gírias apontadas como novas em 2022 | iBahia (2022) |
| retado | Michaelis: Reg (BA), remete a "arretado" (acepção 2, não conferida) | Michaelis |
| me respeite | "não", recusa (não literal) | Correio (2018) |
| é nenhuma; não é o quê? | "é isso mesmo", concordância | Correio (2018) |
| aonde? | "de jeito nenhum" | Correio (2018) |
| é bala | muito bom | Correio (2018) |
| é lenha | inaceitável, injusto | Correio (2018) |
| abusar | zoar, provocar | Correio (2018) |

"De lenhar" (muito bom, segundo o Correio) ficou fora até da lista de perguntas: o
Michaelis registra "lenhar" com sentido vulgar em outro regionalismo, Reg (N.).

## Formas desencorajadas (sempre renderizadas como "evite")

| Forma | Motivo | Fonte |
| --- | --- | --- |
| painho / mainha | Tratamento que filhos dirigem aos próprios pais em Salvador; familiar, nunca para se dirigir ao interlocutor | Oliveira, S. C. (2014) |
| abestado | Reg (N.E.): quem "se abestou, bestificou ou embruteceu"; ofensivo dito a alguém | Michaelis |
| porra (e "da porra") | Palavrão analisado na fala de Salvador, inclusive como intensificador positivo; a camada nunca introduz palavrões | Oliveira, J. M. (2018) |
| bah | Reg (RS); forma de outra região | Michaelis |

## Fontes consultadas que não viraram traço

- **ALiB — Atlas Linguístico do Brasil** (Cardoso et al., 2014, v. 1 e 2) e o TCC de
  Costa (UFPA) sobre variação lexical nas capitais a partir do ALiB: registram nomes
  de coisas (frutas, brinquedos, alimentos) por capital. São úteis para outras
  finalidades, mas raramente mudam o jeito de uma IA escrever; nenhum item lexical
  do ALiB foi incluído. Os dados do atlas não são redistribuídos.
- **Deus (2009)** e **Nascimento e Paim (2016)**: citados de segunda mão, pela
  síntese de Almeida e Antonino (2020); não foram lidos diretamente.
- **Nogueira** (dissertação UFBA, "Como os falantes de Feira de Santana e Salvador
  tratam o seu interlocutor?", [repositório](https://repositorio.ufba.br/handle/ri/24473)):
  só o resumo foi visto; o ano não foi confirmado. Fica como leitura pendente.
- **Lucchesi, Baxter e Ribeiro (orgs., 2009), _O português afro-brasileiro_**
  (EDUFBA), conhecido por uma resenha: descreve comunidades rurais, não Salvador.
- **Glossários colaborativos** (Dicionário Informal, Dicionário Popular e
  semelhantes): aparecem nas buscas, mas não são fonte.
- **Aratu On (2026), "Diva do Buzu"**: a ocorrência encontrada é parte de um apelido
  próprio, não uma descrição independente do uso comum de `buzu` = ônibus; não foi
  usada para classificar a forma.
- **"Meu rei" / "minha rainha":** um blog afirma que "minha rainha" teria sido
  difundida por produções de TV, e não pela fala local. Não é fonte, mas reforça
  que a forma precisa de confirmação por falantes antes de qualquer uso.
- **Marcador "viu?"**: nenhum estudo sobre Salvador localizado (o trabalho da UNEB
  que apareceu na busca tratava de outro marcador).

## Acesso e licenças

- O PDF integral de Almeida (2009) foi consultado nesta revisão pelo link direto do
  repositório da UFBA. A tese de Oliveira, S. C. (2014) continua consultada pelo
  resumo; ler seu texto integral segue pendente.
- Os artigos de _Estudos Linguísticos e Literários_ (periódico de acesso aberto da
  UFBA) e o artigo de Oliveira e Mota (2020) foram lidos na íntegra; a licença de cada
  artigo não foi conferida, então só citamos e parafraseamos. Almeida (2016) e Santos
  e Carvalho (2020) foram consultados pela página, resumo e/ou PDF publicado; as
  licenças específicas dos artigos não foram verificadas.
- O Michaelis é conteúdo com todos os direitos reservados (Editora Melhoramentos):
  usamos apenas rótulos regionais e sentidos, parafraseados, com citação.
- Nenhum texto de fonte foi copiado para o repositório além de citações curtas de
  rótulos e definições.

## Perguntas para revisores de Salvador

O [questionário para falantes](SPEAKER-SURVEY.md) é a versão pronta para enviar,
com as formas do pack e as pistas. As perguntas abaixo são o roteiro de uma revisão
mais detalhada; use os rótulos de [human-review.md](../../../../docs/linguistic/human-review.md).

0. "Me diga", "deixe eu ver", "olhe" soam como o seu jeito de falar numa conversa
   informal escrita? E "me diz", "deixa eu ver", "olha"?

1. Em texto dirigido a alguém desconhecido, como soam "Posso lhe ajudar?" /
   "Vou lhe explicar?" e "Posso te ajudar?"? Em quais situações "te" é natural
   mesmo entre pessoas sem intimidade?
2. Em que relações "o senhor" / "a senhora" soa natural hoje? A idade, por si só,
   justifica esse tratamento, ou é preciso uma convenção/deferência estabelecida?
3. "Que massa!" diante de uma boa notícia: natural, forçado ou caricato vindo de uma
   IA? E numa conversa formal?
4. "Vixe" e "oxe" escritos: em alguma situação soam naturais, ou sempre parecem
   imitação?
5. "Porreta": aceitável em conversa descontraída ou sempre grosseiro?
6. "Meu rei" / "minha rainha": em que situações e entre quem se usa? Soa caricato
   vindo de uma IA?
7. "Barril": em que sentido você usa hoje? Em que situações?
8. "Sei não" / "tem não" em respostas curtas: natural em Salvador? Em que registros?
9. Alguma das pistas da tabela acima é comum hoje e soaria natural numa conversa
   escrita?
10. "Tu" aparece na sua fala ou na de pessoas próximas em Salvador? Em que
    situações soa natural, marcado ou vindo de outra variedade?
11. "Cê" e formas como "cê vê" / "cê sabe" soariam naturais em mensagens informais
    escritas? A grafia parece cotidiana ou imita a fala de forma caricata?
12. Algo nas amostras soa como "nordestino genérico" em vez de Salvador?

## Próximos passos

1. Aplicar o [questionário](SPEAKER-SURVEY.md) a falantes de Salvador (idades e
   bairros variados) e registrar as respostas como fonte `speaker-review`; mover para
   `reported` o que for confirmado e para "evitar" o que for marcado como caricato.
   Junto, enviar a folha cega do laboratório para medir o reconhecimento.
2. Rodar o [laboratório](../../../../examples/agent-lab/) em um modelo real, com
   várias IAs hospedeiras (assistente geral, tutor, atendimento), e comparar com e
   sem a camada (dimensões em [docs/evals](../../../../docs/evals/)).
3. Ler o texto integral de Almeida (2016), a tese de Oliveira, S. C. (2014), Deus
   (2009), Nascimento e Paim (2016) e Nogueira; conferir diretamente as fontes
   citadas sobre "tu/você" quando forem localizadas.
4. Consultar corpora de fala de Salvador — PEPP (Programa de Estudos sobre o
   Português Popular Falado de Salvador) e NURC-Salvador — respeitando as licenças.

## Referências

- ALMEIDA, Gilce de Souza. _Quem te viu quem lhe vê: a expressão do objeto acusativo
  de referência à segunda pessoa na fala de Salvador_. 2009. 193 f. Dissertação
  (Mestrado em Letras) — Instituto de Letras, Universidade Federal da Bahia,
  Salvador, 2009. <https://repositorio.ufba.br/ri/bitstream/ri/10995/1/Dissertacao%20Gilce%20Almeida.pdf>.
  Acesso em: 29 set. 2026.
- ALMEIDA, Gilce de Souza; ANTONINO, Vívian. Percepção e avaliação social das
  estratégias de representação do acusativo de segunda pessoa em duas cidades
  baianas. _Estudos Linguísticos e Literários_, Salvador, n. 68, núm. esp.,
  p. 164-191, 2020. <https://periodicos.ufba.br/index.php/estudos/article/view/39138>.
  Acesso em: 29 set. 2026.
- ALMEIDA, Gilce de Souza. Uso dos pronomes-objeto de segunda pessoa na fala de
  Salvador e de Santo Antônio de Jesus. _Veredas_, Juiz de Fora, v. 20, n. 2,
  p. 122-135, 2016.
  <https://periodicos.ufjf.br/index.php/veredas/article/view/28149>.
  Acesso em: 29 set. 2026.
- CALDAS, Francisco Demetrius Luciano; ABRAHÃO, Bruno Otávio de Lacerda. Quando a
  maré baixar: os significados socioculturais do "Baba do Vinho" dos "Amigos do
  Acupe" em Piatã, Salvador, Bahia. _Cenas Educacionais_, v. 6, 2023.
  <https://revistas.uneb.br/index.php/cenaseducacionais/article/view/17034>.
  Acesso em: 29 set. 2026.
- PIMENTEL, Adriana Miranda. Sentidos e significados de práticas juvenis em um bairro
  da cidade de Salvador, Bahia, Brasil. _Etnográfica_, v. 16, n. 1, p. 31–51, 2012.
  <https://journals.openedition.org/etnografica/1373>. Acesso em: 29 set. 2026.
- SANTOS, João Diogenes Ferreira dos. Desvelando o mercado do sexo: trajetória de vida
  dos "garotos de programas" da cidade de Salvador. In: _Seminário Internacional
  Fazendo Gênero 10_, Florianópolis, 2013. Anais eletrônicos.
  <https://www.fg2013.wwc2017.eventos.dype.com.br/resources/anais/20/1373286043_ARQUIVO_DESVELANDOOMERCADODOSEXO-artigofazendogenero2013.pdf>.
  Acesso em: 29 set. 2026.
- SANTOS, Liliane Silva dos. _Variação linguística em rede digital: um estudo diatópico
  do léxico barril no dialeto baiano_. 2023. Trabalho de Conclusão de Curso
  (Licenciatura em Letras) — Universidade do Estado da Bahia, Campus XIII, Itaberaba,
  2023. <https://saberaberto.uneb.br/server/api/core/bitstreams/9cd6c6e9-0c53-4d1b-932c-71f6dda3d18d/content>.
  Acesso em: 29 set. 2026.
- CARDOSO, Suzana Alice Marcelino et al. _Atlas Linguístico do Brasil_. Londrina:
  EDUEL, 2014. v. 1 e 2. <https://alib.ufba.br/>.
- YIDA, Vanessa. _O campo semântico da Alimentação e Cozinha no Atlas Linguístico do
  Brasil (ALiB): um estudo lexical nas capitais_. 2011. 191 p. Dissertação (Mestrado
  em Estudos da Linguagem) — Universidade Estadual de Londrina, Londrina, 2011.
  <https://alib.ufba.br/sites/alib.ufba.br/files/yida_vanessa_me_2011.pdf>.
- CORREIO. Barril linguístico: Salvador tem dialeto que quase nunca se leva ao pé
  da letra. _Correio_, Salvador, 29 mar. 2018.
  <https://www.correio24horas.com.br/salvador/barril-linguistico-salvador-tem-dialeto-que-quase-nunca-se-leva-ao-pe-da-letra-0318>.
  Acesso em: 29 set. 2026. (Jornalismo local; descreve o sentido negativo de `barril`.)
- DOWLING, Victoria. Conheça gírias do "baianês", vocabulário queridinho de Salvador.
  _iBahia_, Salvador, 29 mar. 2024.
  <https://www.ibahia.com/diversao/bora-ali/salvador-conheca-girias-do-baianes-vocabulario-dos-soteropolitanos-316585>.
  Acesso em: 29 set. 2026. (Jornalismo, Rede Bahia.)
- PAZ, Dindara. 'Cadê meu buzu?': Salvador extingue mais de 350 linhas de ônibus e
  prejudica moradores. _Alma Preta_, 14 set. 2024.
  <https://almapreta.com.br/sessao/cotidiano/cade-meu-buzu-salvador-extingue-mais-de-350-linhas-de-onibus-e-prejudica-moradores/>.
  Acesso em: 29 set. 2026.
- ROCHA, Taís. Diva do Buzu: como a rotina nos ônibus de Salvador fez Paulinha virar
  febre na internet. _Aratu On_, Salvador, 2 set. 2026.
  <https://aratuon.com.br/entretenimento/de-pedinte-a-fenomeno-das-redes-em-salvador-conheca-a-historia-da-diva-do-buzu/>.
  Acesso em: 29 set. 2026. (A ocorrência está num apelido próprio; não conta como descrição
  independente do uso comum da palavra.)
- MELO, Carla. O ôxe e seus pariceiros: entenda como surgiu o "idioma" soteropolitano.
  _A Tarde_, Salvador, 29 mar. 2025.
  <https://atarde.com.br/aniversario-de-salvador/o-oxe-e-seus-pariceiros-entenda-como-surgiu-o-idioma-soteropolitano-1312337>.
  Acesso em: 29 set. 2026. (Jornalismo local; descreve sentidos negativos e positivos de `barril`.)
- OLIVEIRA, Sandra Carneiro de; MOTA, Jacyra Andrade. Atitudes linguísticas aos
  tratamentos o senhor/a senhora e você em Salvador, Bahia, Brasil. _Estudos
  Linguísticos e Literários_, Salvador, n. 68, núm. esp., p. 192-218, 2020.
  <https://periodicos.ufba.br/index.php/estudos/article/view/39024>. Acesso em: 29 set. 2026.
- MICHAELIS. _Dicionário Brasileiro da Língua Portuguesa_. São Paulo: Melhoramentos.
  Verbetes: oxente, oxe, vixe, vige, massa, porreta, abestado, bah, retado,
  lenhar, buzu, brocado, pirangueiro, abusado, arretado, abadá, sinaleira, baba.
  <https://michaelis.uol.com.br/moderno-portugues/>. Acesso em: 29 set. 2026.
- OLIVEIRA, Josane Moreira de. Os palavrões no português baiano: uma análise
  sociolinguística com base em dois filmes. _Estudos Linguísticos e Literários_,
  Salvador, n. 60, núm. esp., p. 163-181, 2018.
  <https://periodicos.ufba.br/index.php/estudos/article/view/27635>. Acesso em: 29 set. 2026.
- OLIVEIRA, Sandra Carneiro de. _"Se eu falar você, painho me mata!": tratamento
  entre pais e filhos em Salvador_. 2014. Tese (Doutorado) — Universidade Federal da
  Bahia, Salvador, 2014. <https://repositorio.ufba.br/handle/ri/27740>.
  Acesso em: 29 set. 2026.
- REDAÇÃO iBAHIA. Gírias soteropolitanas: como o dicionário do baiano evoluiu.
  _iBahia_, Salvador, 29 mar. 2022.
  <https://www.ibahia.com/aniversario-de-salvador/girias-soteropolitanas-como-o-dicionario-do-baiano-evoluiu>.
  Acesso em: 29 set. 2026. (Jornalismo: pista, não evidência.)
- SANTOS, Lanuza Lima; MUNIZ, Caroline Santos; BARROS, Isis Juliana Figueiredo de.
  Os verbos no imperativo na comunidade quilombola de Montevidinha, oeste da Bahia.
  _Travessias Interativas_, São Cristóvão, n. 31, v. 14, p. 119-137, 2024.
  <https://periodicos.ufs.br/Travessias/article/download/n31p119/p119/69384>.
  Acesso em: 29 set. 2026.
- SANTOS, Rosane Bispo dos; CARVALHO, Cristina dos Santos. Os usos de "você" e
  "cê" na fala popular de Salvador. _Revista Philologus_, v. 26, n. 78, suplemento,
  p. 2685-2703, 2020.
  <https://www.revistaphilologus.org.br/index.php/rph/article/view/217>.
  Acesso em: 29 set. 2026.

- SCHERRE, Maria Marta Pereira. Aspectos sincrônicos e diacrônicos do imperativo
  gramatical no português brasileiro. _Alfa_, São Paulo, v. 51, n. 1, p. 189-222,
  2007. <https://periodicos.fclar.unesp.br/alfa/article/download/1432/1133/0>.
  Acesso em: 29 set. 2026.

Citadas de segunda mão (via Almeida e Antonino, 2020, Scherre, 2007, e Santos, Muniz
e Barros, 2024): SAMPAIO (2001), ALVES e ALVES (2005), OLIVEIRA (2017) e SANTOS
(2016), sobre o imperativo em Salvador; e as duas abaixo, sobre "tu/você":

- DEUS, Viviane Gomes de. _Você ou tu? Nordeste versus Sul: o tratamento do
  interlocutor no português do Brasil a partir de dados do Projeto ALiB_. 2009.
  Dissertação (Mestrado em Letras) — Universidade Federal da Bahia, Salvador, 2009.
- NASCIMENTO, Lorena Cristina Ribeiro; PAIM, Marcela Moura Torres. A variação tu/você
  no português popular falado de Salvador e Amargosa, na Bahia. In: LOPES, Norma;
  PARCERO, Lúcia Maria; CARVALHO, Cristina (orgs.). _Anais do VI Encontro de
  Sociolinguística_, 2016, p. 31-45.
