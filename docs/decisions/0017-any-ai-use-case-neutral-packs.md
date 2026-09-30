# ADR-0017: A camada serve a qualquer IA; packs não pressupõem caso de uso

- Status: Aceito
- Data: 2026-09-29
- Origem: decisão do mantenedor ("não quero que isso fique viciado ou voltado a agentes de IA para atendimento; quero que seja para qualquer IA"), depois de o primeiro rascunho de pack (Salvador) e parte da metodologia terem sido escritos com o atendimento como padrão

## Contexto

O caso motivador da concepção foi o assistente de vendas de uma concessionária
([ADR-0009](0009-regional-layer-separate-from-agent-role.md)). Esse exemplo foi, aos
poucos, virando padrão implícito: a metodologia pedia exemplos "com atendimento
primeiro", o texto de enquadramento do compilador falava em "business rules" e
"replies", os cenários de eval e o laboratório eram de loja, e o primeiro pack
descrevia a fala de Salvador "em situações de atendimento", com motivos como "nunca
use com clientes".

Isso limita o produto e distorce a pesquisa. O Vernáculo deve servir a qualquer
sistema de IA que escreva em uma língua — assistentes gerais, tutores, personagens
de jogos e ficção, ferramentas de escrita, assistentes de voz (em texto), agentes de
suporte e de vendas — e a evidência linguística (estudos sobre a fala de uma cidade)
quase nunca é sobre atendimento.

## Decisão

- **Qualquer IA.** O Vernáculo é uma camada de linguagem para qualquer IA hospedeira,
  qualquer que seja o papel. Atendimento é um caso de uso entre outros, nunca o
  padrão.
- **Packs descrevem a variedade, não um uso.** Traços, contextos, motivos, exemplos e
  antipadrões de um pack da biblioteca não pressupõem papel, domínio nem público
  (nada de "cliente", "venda", "loja" como moldura). Quando a adequação de uma forma
  depende da situação, o pack a descreve em termos de **registro e relação**:
  formal/informal, interlocutor desconhecido, mais velho ou próximo, situação de
  problema ou de celebração.
- **O uso fica com quem usa.** Papel, domínio, marca, público e restrições próprias
  pertencem à IA hospedeira ([ADR-0009](0009-regional-layer-separate-from-agent-role.md))
  ou a uma persona de projeto com `extends`
  ([ADR-0013](0013-explicit-inheritance.md)); por exemplo, uma empresa que não quer
  uma forma no atendimento a desencoraja no próprio arquivo.
- **Enquadramento neutro de papel.** O texto que o compilador e os exportadores
  mandam ao modelo fala do papel, das regras e das políticas da IA hospedeira, sem
  supor um agente de negócio nem um formato de conversa.
- **Intensidade padrão sutil por prudência, não por uso.** A `defaultIntensity` de um
  pack é baixa porque a camada deve ser discreta quando o uso é desconhecido; cada
  IA hospedeira escolhe a sua.
- **Exemplos, cenários e evals variados.** Exemplos de packs, cenários de eval e o
  laboratório cobrem situações diversas (ajuda geral, explicação, conversa
  descontraída, texto formal, aflição, pedidos adversariais, atendimento), com mais
  de um tipo de IA hospedeira.

Esta decisão complementa o ADR-0009: onde ele diz "agente de negócio", leia-se
"IA hospedeira", de qualquer tipo. Continua valendo o
[ADR-0010](0010-observable-sociolinguistic-features-only.md): a camada é só de
linguagem, nunca personalidade.

## Consequências

- O compilador passa a dizer "how you write" e "your role, rules, policies and facts"
  (sem "business"); a descrição das skills exportadas passa a falar em escrever na
  variedade. Golden files atualizados de propósito.
- O rascunho `pt-BR/ba/salvador` foi reescrito sem moldura de atendimento; a regra de
  "lhe" ficou mais fiel ao estudo que a sustenta (formal, desconhecido, mais velho →
  "lhe"; próximo e informal → "te").
- Metodologia, guia de contribuição, revisão humana, estratégia de evals e o
  laboratório (`examples/agent-lab`, agora com várias IAs hospedeiras) foram
  ajustados.
- A modelagem de registro ([questão em aberto](../roadmap/open-questions.md) OQ-05)
  continua aberta, mas em termos de registro (formal/informal), não de subpersonas
  por caso de uso como `.../customer-service`: variantes por uso são personas de
  projeto, fora da biblioteca.
- Exemplos de uso específico (como a concessionária de `examples/openai` e
  `examples/project-persona`) continuam existindo como exemplos, rotulados como tal.

## Alternativas consideradas

- **Manter o atendimento como padrão e acrescentar outros usos depois** — rejeitado:
  o padrão implícito contamina a pesquisa (o que se aceita ou evita num pack) e o
  texto enviado a todos os modelos.
- **Packs por caso de uso na biblioteca** (`.../atendimento`, `.../jogos`) —
  rejeitado: multiplica packs pela quantidade de usos, e o uso é responsabilidade de
  quem integra, não da descrição da variedade.
