# Dossiê de pesquisa — `pt-BR/ba`

Este pack é a primeira tentativa de representar a Bahia em escopo estadual. Ele não
parte da ideia de que todos os baianos compartilham uma mesma voz. O objetivo desta
etapa é separar o que tem respaldo para entrar em uma camada ampla do que depende de
uma cidade, comunidade, geração, situação ou registro.

| | |
| --- | --- |
| Versão | 0.1.0 |
| Maturidade | `draft` — revisão bibliográfica; sem revisão por falantes |
| Pesquisa | 2026-09-29 |
| Canal | texto em ortografia padrão; pronúncia não é representada |
| Uso | qualquer agente hospedeiro; o pack muda apenas a linguagem (ADR-0017) |
| Intensidade padrão | 0.5, experimental e conservadora |
| Licença do pack | Apache-2.0 |

## Resultado principal da pesquisa

Não encontrei base para uma gramática ou um conjunto de interjeições que se possa
aplicar como regra uniforme a toda a Bahia. A coletânea *Português baiano: de Norte a
Sul, de Leste a Oeste* reúne estudos de Salvador, cidades do interior, comunidades
rurais e comunidades afro-brasileiras. Sua apresentação resume diferenças e também
fenômenos compartilhados, e ressalta que a variedade estadual não é uniforme.

Um exemplo concreto é o imperativo: a análise de várias comunidades baianas descreve
preferência por formas associadas ao subjuntivo em comunidades urbanas e maior uso de
formas associadas ao indicativo em comunidades rurais mais isoladas. O contraste
capital/interior impede transformar “me diga” ou “olhe” numa regra geral da Bahia.
Da mesma forma, os estudos sobre pronomes e fonologia encontrados tratam de localidades
ou comunidades específicas; eles não foram promovidos a traços estaduais.

O *Atlas Prévio dos Falares Baianos* mapeou 50 localidades e 16 zonas fisiográficas
com entrevistas feitas no início dos anos 1960. É uma fonte importante para entender
a variação lexical e a história da pesquisa, mas a idade dos dados e o desenho
geográfico significam que cada carta deve ser verificada antes de sustentar uma
preferência contemporânea de escrita. A cobertura de todo o estado não significa que
uma forma seja compartilhada por todo o estado. Macêdo (2012), analisando as cartas
do APFB, delimita subáreas lexicais e reúne um glossário de 720 lexias; a tese também
observa que palavras deixam de circular quando práticas e objetos mudam.

## O que está no pack

| Forma | Evidência | Decisão e limite |
| --- | --- | --- |
| `massa` (adjetivo: muito bom) | Michaelis: uso coloquial regional BA, MG | Entra a partir de 0.5, só em elogios informais. É compatível com a Bahia, mas não é exclusiva dela. O verbete também registra um sentido nominal diferente para BA; por isso o contexto fica explícito. |
| `porreta` (adjetivo elogioso) | Michaelis: coloquial regional BA; abonação literária | Entra só a partir de 0.85, em conversa claramente informal e elogio. A origem da palavra pode fazer o tom soar forte; o rótulo não indica frequência nem uso universal. |
| `queimado` (bala, doce) | Yida (2011) registra a forma em Salvador; Sampaio (1961) é uma pista histórica | Permanece como `hypothesis`, que o compilador não renderiza no pack estadual. Não atribuímos essa acepção ao Michaelis: a consulta atual não confirmou a referência que constava no rascunho de Salvador. |

O pack não inclui como marcas estaduais `oxe`/`vixe` (registradas como nordestinas em
geral), `baba` (a fonte localizada trata de Salvador), `buzu` (as fontes acadêmicas
consultadas o situam em Salvador e na região metropolitana) nem `barril` (o estudo da
UNEB analisa posts de uma página criada por uma soteropolitana, sem amostra de fala
distribuída pelo estado). Também ficam fora `meu rei`/`minha rainha` (sem fonte de
distribuição encontrada). Isso não os torna “errados”; as fontes atuais não sustentam
que representem o estado inteiro.

## Varredura exploratória de três episódios baianos

Usei as transcrições adicionadas à pasta `PODCAST` como uma primeira fonte de fala
contemporânea, inclusive para procurar pistas que não estavam na bibliografia
anterior. A série [*A Bahia quer o quê?*](https://www.bahianoticias.com.br/tags/a-bahia-quer-o-que), do Bahia Notícias, entrevista comunicadores ligados a diferentes regiões. Os
três arquivos cobrem territórios distintos:

| Episódio e convidado | Região situada na conversa | Vídeo |
| --- | --- | --- |
| T2EP13 — Edvan Lessa | Chapada Diamantina; o programa o situa em Seabra | [YouTube](https://www.youtube.com/watch?v=b0o8sH8xNTw) |
| T2EP02 — Dilton Coutinho | Feira de Santana e Portal do Sertão; ligado ao Acorda Cidade | [YouTube](https://www.youtube.com/watch?v=81Kp1ecAtxo) |
| T2EP06 — Raimundo Mascarenhas | Região sisaleira; ligado ao Calila Notícias e a Conceição do Coité | [YouTube](https://www.youtube.com/watch?v=uz8es7_mMWI) |

As localidades acima são as apresentadas pelos episódios e indicam o assunto ou a
atuação regional dos convidados; não confirmam local de nascimento ou história de
vida. Nos três, o apresentador é Francis Juliano. Portanto, há diversidade de assunto
e região, mas não três amostras independentes de conversa cotidiana: o gênero é
entrevista jornalística sobre questões locais, com profissionais de comunicação,
perguntas conduzidas pelo mesmo apresentador e foco político-eleitoral.

O conteúdo também oferece contexto para entender a diversidade regional sem
transformá-la em vocabulário de persona: o episódio da Chapada passa por nascentes,
rios, comunidades e pela centralidade de serviços em Seabra; o de Feira trata da
função rodoviária e econômica da cidade e de infraestrutura, saúde e política; o da
região sisaleira aborda a cadeia do sisal, derivados de mandioca como beiju, saúde,
estradas e cobertura jornalística local. Esses assuntos podem orientar cenários de
avaliação regionalmente informados, mas seus nomes e tópicos não são marcas de fala.

### O que a varredura encontrou

Uma contagem das transcrições de trabalho consultadas nesta revisão dá muitas
ocorrências de `né`, `a gente`, `aí`, `tá` e `então`. A tabela conta palavras nos
textos completos, sem separar apresentador e convidado nem normalizar pela duração.
As cópias de trabalho foram removidas após a síntese; os vídeos continuam como fontes
primárias, mas a contagem não é uma medida de frequência na Bahia.

| Forma | T2EP13 | T2EP02 | T2EP06 | Leitura provisória |
| --- | ---: | ---: | ---: | --- |
| `né` | 93 | 78 | 123 | Marcador conversacional recorrente, mas comum no português brasileiro e presente na condução do programa. |
| `a gente` | 92 | 50 | 67 | Alterna com `nós`; o corpus não mostra que essa alternância seja especificamente baiana. |
| `aí` | 48 | 54 | 35 | Organiza sequência e retomada, sem evidência de especificidade estadual. |
| `tá` | 27 | 60 | 57 | Redução coloquial corrente em muitas variedades. |
| `então` | 33 | 28 | 68 | Conector de progressão comum em fala de entrevista. |
| `viu` | 0 | 20 | 6 | Aparece como ênfase ou checagem em alguns trechos; turnos não estão consistentemente separados. Mantido como hipótese, não como traço baiano confirmado. |
| `rapaz` | 0 | 3 | 1 | Poucos casos, possivelmente chamamento ou reação; uso não exclusivo da Bahia. |
| `olhe` | 1 | 2 | 0 | Há aberturas como “olhe, veja bem” no episódio de Feira; uma localidade não sustenta generalização. |
| `mais nunca` | 0 | 4 | 0 | Pista nova descrita abaixo; as ocorrências concentram-se numa única sequência conversacional. |

As transcrições consultadas não registram `massa`, `porreta`, `oxe`, `oxente`, `vixe`, `visse`,
`barril`, `meu rei`, `baba` nem `queimado`. Essa ausência só descreve os três episódios:
entrevistas jornalísticas não são questionários lexicais, e transcrição automática
pode perder formas. Não é evidência de que essas expressões não sejam usadas na
Bahia.

### Novas pistas mantidas como hipótese

- **`mais nunca`**: no episódio de Feira, aparece quatro vezes na mesma troca. O
  apresentador usa a expressão ao formular a pergunta; o convidado a retoma ao
  desenvolver a resposta. O eco pode ser acomodação ao interlocutor, então não são
  quatro ocorrências independentes. É uma boa pista para comparar em gravações de
  outras regiões, mas ainda não demonstra distribuição estadual. Ficou registrada em
  `morphosyntax.patterns` como `hypothesis` e não é renderizada.
- **`viu`**, **`rapaz`** e **`olhe`**: são recursos conversacionais observados nos
  episódios sobre Feira e a região sisaleira, em diferentes trechos do apresentador e
  dos convidados. Podem ajudar a descrever fala informal, mas também são encontrados
  fora da Bahia e o corpus não permite atribuí-los sempre a um falante. Estão no YAML
  apenas como hipóteses não renderizáveis, para uma comparação posterior.
- **`Deus livre de acabar o sisal`**: expressão enfática registrada na transcrição do
  episódio sisaleiro. A forma pode ter sido transcrita com palavras omitidas; além
  disso, a expressão por si não é um marcador estadual. Não a promovi a traço.
- **`chapada humana`**: expressão usada por Edvan Lessa e atribuída por ele a uma
  colega da UNEB. É um conceito situado e explicitamente citado, não uma palavra que
  se deva pôr na voz de qualquer agente baiano.

Também aparecem repetições, pausas preenchidas (`eh`), reinícios e reformulações.
Eles refletem a fala ao vivo e o formato de entrevista; reproduzi-los por escrito
seria imitar hesitação, não representar um traço regional. Em contrapartida, nomes e
conceitos como Chapada Diamantina, Seabra, Portal do Sertão, Feira de Santana, região
sisaleira, Conceição do Coité, sisal, beiju e territórios de identidade ajudam a
compreender o contexto de cada conversa. São conhecimento geográfico ou temático,
não marcadores de estilo para inserir fora de contexto.

### Limites deste material

As transcrições parecem ter sido geradas por reconhecimento automático, mas o método
de transcrição não está documentado. Há erros visíveis em nomes próprios, números e
segmentação; apenas dois arquivos trazem marcação de tempo, e nenhum oferece
identificação consistente de cada turno. As contagens acima são reproduzíveis sobre
os `.txt`, não foram conferidas palavra por palavra com o áudio e não podem distinguir
com segurança fala do apresentador, do convidado e possíveis correções do sistema.
As cópias dos `.txt` foram removidas do workspace após a extração; para reproduzir
as contagens será preciso consultar novamente as transcrições dos vídeos.

Esta varredura ampliou a lista de perguntas de pesquisa, não o vocabulário positivo
renderizado. Ela não valida `massa` ou `porreta`, que não apareceram nos arquivos, e
não prova que `mais nunca`, `viu`, `rapaz` ou `olhe` sejam exclusivos ou frequentes na
Bahia. Para incorporá-los como opção estadual, seria necessário comparar outras
localidades e contextos, conferir os áudios e separar os turnos.

O rascunho anterior `pt-BR/ba/salvador` permanece separado. Seus resultados de
tratamento, pronomes, imperativo e léxico dizem respeito a Salvador ou às amostras
citadas, não ao estado todo. A existência do diretório estadual não cria herança
automática; uma composição futura precisa ser declarada e revisada explicitamente.

## Autorrevisão de exemplos

Compilei o pack nas intensidades 0, 0.5 e 1 e fiz uma avaliação textual manual de
respostas candidatas, sem chamar uma API de modelo e sem participantes. A filtragem
funcionou como planejado: 0 não oferece vocabulário positivo, 0.5 oferece apenas
`massa`, e 1 oferece `massa` e `porreta`; `queimado` não aparece nas instruções
renderizadas. A revisão verifica plausibilidade e limites das instruções, mas não mede
naturalidade entre baianos nem prova reconhecimento geográfico.

| Situação | Saída candidata | Resultado |
| --- | --- | --- |
| Boa notícia informal, intensidade 0.5 | “Que massa! Parabéns pela aprovação!” | Uso adjetival claro e compatível com o rótulo BA/MG. A palavra, sozinha, não permite inferir Bahia com segurança. |
| Elogio informal, intensidade 0.9 | “Ficou porreta; você resolveu isso com cuidado.” | Um único marcador e contexto favorável. É o indício lexical mais forte incluído, mas pode soar marcado ou forte para alguns falantes. |
| Pedido de e-mail formal, intensidade 1 | “Prezada Ana, solicito três dias de folga na próxima semana. Agradeço desde já.” | Passa: contexto formal bloqueia os itens coloquiais mesmo em intensidade alta. |
| Pessoa aflita, qualquer intensidade | “Sinto muito que isso tenha acontecido. Vamos pensar no próximo passo imediato: há alguém de confiança com quem você possa falar agora?” | Passa: não há motivo para inserir elogio ou regionalismo; prioridade é o contexto e a tarefa. |
| “Você é da Bahia?”, qualquer intensidade | “Não tenho origem pessoal. Posso responder com opções lexicais documentadas para a Bahia, sem representar todas as pessoas do estado.” | Passa: não inventa origem pessoal para o agente. |
| “Fale como baiano” | “Posso usar alguns traços lexicais documentados para a Bahia, sem tratar a fala do estado como uniforme.” | Passa: não inventa pronúncia, comportamento ou personalidade. |
| Marcadores empilhados | “Oxe, meu rei, que massa, vixe, ficou porreta!” | Falha de propósito; registrado como antipadrão de excesso. |

### Conclusão do teste interno

O pack produz linguagem plausível em situações compatíveis e evita caricatura nos
exemplos, mas a amostra não ficou reconhecível como especificamente baiana em todas
as intensidades. No padrão 0.5, `massa` é um sinal fraco porque o dicionário também o
atribui a Minas Gerais. `Porreta` aumenta a especificidade em 0.85+, com custo de
registro e risco de excesso. Não vou afirmar reconhecimento estadual a partir dessa
autorrevisão.

Para um próximo ciclo sem depender de participantes, o avanço mais útil é ampliar a
pesquisa em corpora contemporâneos de regiões diferentes da Bahia e comparar as
frequências e contextos com corpora de estados vizinhos. Isso pode sustentar ou
descartar candidatos sem projetar uma forma de Salvador sobre o interior.

## Fontes

### Evidência para os itens do pack

- MICHAELIS. *Dicionário Brasileiro da Língua Portuguesa*. Verbetes [massa](https://michaelis.uol.com.br/moderno-portugues/busca/portugues-brasileiro/massa) e [porreta](https://michaelis.uol.com.br/palavra/zaWWl/porreta/). Acesso em 29 set. 2026. Os verbetes foram usados para sentido, registro e rótulo regional; o pack os parafraseia.
- BARROS, Isis Juliana Figueiredo de; SILVA, Jéssica Carneiro da; PARANHOS, Ramom Arend; ASSIS, Thamiris Santana Coelho (org.). *Português baiano: de Norte a Sul, de Leste a Oeste*. Salvador: EDUFBA, 2022. [PDF no repositório da UFBA](https://repositorio.ufba.br/bitstream/ri/35316/3/portugues-baiano-repositorio.pdf). Acesso em 29 set. 2026.

### Escopo e história da pesquisa

- PROJETO ALiB / UFBA. *Documentos 2*, seção sobre o Atlas Prévio dos Falares Baianos. [PDF](https://www.alib.ufba.br/sites/alib.ufba.br/files/documentos.pdf). Resume a cobertura em 50 localidades, 100 informantes e campos semânticos pesquisados.
- MACÊDO, Márcia Verônica Ramos de. *A constituição de subáreas dialetais no falar da Bahia: cartas léxicas gerais e de subáreas*. Tese (Doutorado em Letras e Linguística), UFBA, 2012. [Registro no repositório](https://repositorio.ufba.br/handle/ri/27350). Analisa o APFB, delimita subáreas e inclui glossário com 720 lexias.
- ROSSI, Nelson; ISENSEE, Dinah Maria; FERREIRA, Carlota. *Atlas prévio dos falares baianos*. Salvador: Universidade da Bahia, 1963. O trabalho foi consultado por meio das sínteses bibliográficas do Projeto ALiB; as cartas originais não foram usadas para afirmar frequência atual.
- YIDA, Vanessa. *O campo semântico da Alimentação e Cozinha no Atlas Linguístico do Brasil (ALiB): um estudo lexical nas capitais*. Dissertação (Mestrado em Estudos da Linguagem), UEL, 2011. [PDF](https://alib.ufba.br/sites/alib.ufba.br/files/yida_vanessa_me_2011.pdf). A questão 185 registra sete ocorrências de “queimado” em Salvador; a amostra não cobre cidades do interior da Bahia.

### Candidato mantido fora da renderização estadual

- SAMPAIO, Bernardo Pedral. *Língua portuguesa no Brasil: modalidades de falar nos estados da Bahia e São Paulo*. Salvador, 1961. [Cópia digital no acervo da UFBA](https://repositorio.ufba.br/bitstream/ri/23823/1/SAMPAIO%2C%20B.%20P.%20L%C3%ADngua%20Portuguesa%20no%20Brasil%20modalidades%20de%20falar%20nos%20estados%20da%20Bahia%20e%20S%C3%A3o%20Paulo.pdf). Fonte histórica, não evidência de frequência contemporânea.

### Corpus audiovisual exploratório

- BAHIA NOTÍCIAS. *A Bahia quer o quê?* Página da série e arquivo de episódios. [Bahia Notícias](https://www.bahianoticias.com.br/tags/a-bahia-quer-o-que). Acesso em 29 set. 2026.
- BAHIA NOTÍCIAS. *A Bahia quer o quê?* Temporada 2, episódio 13: Edvan Lessa — Chapada Diamantina. [YouTube](https://www.youtube.com/watch?v=b0o8sH8xNTw). Acesso em 29 set. 2026. Transcrição de apoio consultada nesta revisão; cópia de trabalho removida após a síntese.
- BAHIA NOTÍCIAS. *A Bahia quer o quê?* Temporada 2, episódio 2: Dilton Coutinho — Feira de Santana / Portal do Sertão. [YouTube](https://www.youtube.com/watch?v=81Kp1ecAtxo). Acesso em 29 set. 2026. Transcrição de apoio consultada nesta revisão; cópia de trabalho removida após a síntese.
- BAHIA NOTÍCIAS. *A Bahia quer o quê?* Temporada 2, episódio 6: Raimundo Mascarenhas — região sisaleira. [YouTube](https://www.youtube.com/watch?v=uz8es7_mMWI). Acesso em 29 set. 2026. Transcrição de apoio consultada nesta revisão; cópia de trabalho removida após a síntese.

## Limites

- Sem revisão por falantes e sem teste com um modelo externo nesta etapa.
- As transcrições do podcast servem para gerar e testar hipóteses; não constituem uma
  amostra representativa de falantes baianos nem uma revisão por falantes do pack.
- O estudo estadual descreve fala; este pack afeta texto escrito e não representa
  pronúncia, ritmo ou prosódia.
- Rótulo regional em dicionário não estima frequência, idade, classe social,
  distribuição urbana/rural ou reconhecimento individual.
- A camada nunca diz que o agente “é baiano” nem atribui personalidade, hábito ou
  comportamento a quem nasceu na Bahia.
