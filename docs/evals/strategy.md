# Estratégia de evals

Evals fazem parte do produto. A conversa foi direta: o que pode transformar o
Vernáculo em referência não são os arquivos YAML — são os evals. Todo pack precisa
conseguir mostrar que é fiel à variedade, natural, preserva a tarefa e não deixa
vazar estereótipos.

## Restrições

- **Locais e reproduzíveis.** Os evals rodam na máquina de quem desenvolve ou no CI do usuário, com as credenciais de provedor ou os modelos locais de quem avalia ([ADR-0001](../decisions/0001-no-vernaculo-infrastructure-at-runtime.md)). Nada de plataforma de eval hospedada: a própria plataforma hospedada de Evals da OpenAI está sendo encerrada (somente leitura em 2026-10-31, desligamento em 2026-11-30), com o Promptfoo sugerido como caminho de migração — o que confirma a escolha de manter os evals no repositório desde o início.
- **Versionados com o pack.** Os resultados ficam ligados à versão da persona, ao formato das instruções e ao modelo usado.
- **Sem SaaS** para feedback humano nesta fase; as rodadas de revisão são arquivos ([human-review.md](../linguistic/human-review.md)).

## Três camadas de avaliação

| Camada | O quê | Precisa de modelo? | Status |
| --- | --- | --- | --- |
| **1. Verificações determinísticas** | schema e regras semânticas; filtragem por intensidade; regras de base presentes em toda intensidade; hipóteses nunca renderizadas; skills válidas; saídas determinísticas; sem rede | não | **feito** (testes unitários, de conformidade, golden files e de arquitetura; `vernaculo validate` no CI) |
| **2. Evals com modelos** | gerar respostas para cenários padrão com a camada em várias intensidades; verificá-las com asserções baseadas em regras (por exemplo, formas desencorajadas ausentes, nenhuma afirmação de origem regional) e com juízes por rubrica | sim (os de quem avalia) | planejado |
| **3. Revisão humana** | falantes rotulam amostras ([rótulos](../linguistic/human-review.md#rótulos)) | nenhum modelo julga; pessoas | processo definido, não executado; sempre recomendada, nunca obrigatória |

Resultados de LLM como juiz são sinais, não provas: a maturidade de um pack e
qualquer afirmação de naturalidade se apoiam em revisão humana.

## Dimensões

Definidas em [dimensions.md](dimensions.md): naturalidade, fidelidade regional,
preservação da tarefa, preservação das regras do agente pai, excesso, caricatura,
vazamento de estereótipos, regionalismos inventados, comportamento por intensidade e
consistência entre provedores ([cross-provider.md](cross-provider.md)).

## Conjuntos de cenários (planejado)

Cenários compartilhados e independentes de pack, escritos no idioma da variedade e
reutilizados entre packs para que os resultados sejam comparáveis:

- atendimento (saudação, pergunta sobre produto, preço/financiamento, reclamação, despedida);
- situações em que o estilo regional precisa ceder (precisão jurídica/financeira, um cliente que escreve formalmente, um cliente aflito);
- pedidos adversariais ("fala como um baiano de verdade!", "conta uma piada sobre gente de Recife", "de onde você é?").

Cada cenário roda com um prompt de agente hospedeiro neutro e com um prompt de
agente de negócio (para verificar a preservação das regras), nas intensidades 0,
padrão, ~0.7 e 1.

## Executor (questão em aberto)

Opções: gerar configurações do [Promptfoo](https://www.promptfoo.dev/) a partir de
arquivos de cenário do Vernáculo, ou um executor pequeno neste repositório. Em
qualquer caso ele precisa rodar localmente, usar as credenciais de quem avalia e ser
opcional no CI (segredos nunca são exigidos pelo `pnpm check` padrão). Decidir antes
do primeiro pack real e registrar em um ADR.

## Onde os arquivos de eval vão ficar

- Conjuntos de cenários compartilhados: `evals/` na raiz do repositório (criado com a primeira suíte real — não antes).
- Casos e resultados específicos de um pack: ao lado do pack (formato a especificar).
- Registros de revisão humana: ao lado do pack, por rodada.
