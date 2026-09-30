# Dimensões de avaliação

Em que todo pack (e todo adapter) é avaliado. Para cada dimensão: a pergunta, como
pode ser medida e o que já existe. A tabela original da conversa é o núcleo desta
lista (fidelidade regional, naturalidade, fidelidade à tarefa, vazamento de
estereótipos, excesso, estabilidade entre modelos); o restante torna os invariantes
do projeto testáveis.

## Reconhecimento

- **Pergunta:** quem é da variedade reconhece de onde a IA "fala", **sem** achar caricato? É o objetivo do produto: soar local para quem é de lá.
- **Medida por:** pergunta cega "de onde você diria que é quem escreveu?" (resposta livre) na revisão de amostras, feita antes dos rótulos e só em conversas que não citam o lugar; o gabarito diz qual variante gerou cada amostra, e a taxa de acerto é comparada entre o controle sem camada e as intensidades. Sempre lida junto com `caricatural` e `exaggerated`.
- **Falha se parece com:** ninguém reconhece nem em intensidade alta (pack apagado demais); reconhecem só pelo estereótipo (caricatura); reconhecem como "nordestino genérico" em vez da cidade.
- **Uso:** a intensidade em que o reconhecimento aparece sem caricatura ajuda a calibrar `minIntensity` e a intensidade padrão ([questão em aberto](../roadmap/open-questions.md) OQ-11).
- **Parte existente:** o [laboratório](../../examples/agent-lab/) gera a folha cega com essa pergunta e o gabarito separado.

Em um pack de escopo estadual, o alvo é reconhecer o estado. Responder apenas “Nordeste”
indica uma localização ampla, não reconhecimento específico da Bahia; identificar uma
cidade também não deve ser exigido quando o pack não tem esse escopo.

## Naturalidade

- **Pergunta:** parece alguém falando normalmente naquela variedade, ou uma caricatura?
- **Medida por:** rótulos humanos `natural` / `exaggerated` / `caricatural`; juízes com modelo apenas como triagem.
- **Falha se parece com:** toda frase com um marcador; formas usadas em contextos errados; tom teatral.

## Fidelidade regional

- **Pergunta:** os traços usados são compatíveis com aquela variedade?
- **Medida por:** rótulos humanos `authentic` / `unrecognized` / `wrong-region`; verificações por regra de que só formas listadas aparecem entre as formas regionalmente marcadas.
- **Falha se parece com:** formas de outras regiões; gíria "nordestina" genérica em um pack de Salvador.

## Preservação da tarefa

- **Pergunta:** a regionalização prejudicou a tarefa da IA hospedeira (precisão, completude, clareza)?
- **Medida por:** o mesmo cenário com e sem a camada; asserções específicas da tarefa (a resposta contém a informação exigida); rubricas de juiz.
- **Falha se parece com:** respostas mais vagas, fatos faltando, frases difíceis de entender.

## Preservação das regras do agente pai

- **Pergunta:** a IA continua obedecendo ao papel, às políticas e às regras do hospedeiro?
- **Medida por:** cenários em que as regras importam (por exemplo: um tutor que não entrega a resposta pronta; um atendente que não oferece descontos fora da tabela); asserções sobre as saídas.
- **Falha se parece com:** o tom de "gente boa local" passando por cima da política.

## Excesso

- **Pergunta:** o regionalismo está sendo enfiado em toda frase?
- **Medida por:** densidade de formas do pack por resposta vs. intensidade; rótulos humanos `exaggerated`.
- **Falha se parece com:** o "enfiando regionalismo em toda frase" da conversa.

## Caricatura

- **Pergunta:** soa como paródia?
- **Medida por:** rótulos humanos `caricatural` / `offensive` (sempre tratados, conforme a política anti-caricatura); verificações de similaridade com antipadrões.

## Vazamento de estereótipos

- **Pergunta:** o modelo começou a inventar traços culturais, comportamentais ou psicológicos — ou a afirmar que é da região?
- **Medida por:** cenários adversariais ("conta uma piada sobre...", "de onde você é?", "o pessoal de lá é preguiçoso?"); verificações por regra de afirmações de origem; rubricas de juiz; revisão humana.
- **Parte determinística (feito):** o formato não tem campo para traços; toda renderização carrega as regras de base 3–4 ([anti-caricature.md](../linguistic/anti-caricature.md)); os testes garantem que as regras estão presentes em toda intensidade.

## Regionalismos inventados

- **Pergunta:** o modelo produz formas "regionais" que não estão no pack e não são reais?
- **Medida por:** extrair as formas marcadas das saídas e comparar com o pack; rótulos humanos `unrecognized`.
- **Parte determinística (feito):** hipóteses nunca são renderizadas; só as formas listadas entram nas instruções.

## Comportamento por intensidade

- **Pergunta:** a marcação da saída cresce de forma monotônica e sensata com a intensidade, e a intensidade 0 é neutra?
- **Medida por:** os mesmos cenários em 0 / padrão / ~0.7 / 1; densidade de formas; rótulos humanos por nível (`exaggerated` em intensidade alta continua sendo defeito).
- **Parte determinística (feito):** as regras de filtragem, a neutralidade na intensidade 0 e os limites têm testes unitários; golden files por intensidade.

## Consistência entre provedores

Veja [cross-provider.md](cross-provider.md).

## Resumo

| Dimensão | Determinística (agora) | Com modelo (planejado) | Humana (planejado) |
| --- | --- | --- | --- |
| Naturalidade | — | triagem | principal |
| Fidelidade regional | só formas listadas | extração de formas | principal |
| Preservação da tarefa | regra de base presente | principal | verificações pontuais |
| Preservação das regras do pai | regra de base presente | principal | verificações pontuais |
| Excesso | faixas de intensidade renderizadas | densidade | `exaggerated` |
| Caricatura | antipadrões renderizados | similaridade | principal; achados sempre corrigidos |
| Vazamento de estereótipos | sem campos de traços; regras de base | adversarial | principal |
| Regionalismos inventados | hipóteses nunca renderizadas | extração de formas | `unrecognized` |
| Comportamento por intensidade | testes de filtragem, golden files | curvas de densidade | rótulos por nível |
| Entre provedores | saída neutra de provedor | principal | comparação |
