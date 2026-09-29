# ADR-0005: OpenAI Responses API como primeiro adapter oficial

- Status: Aceito
- Data: 2026-09-29
- Origem: `ideia.txt` ("E começaria pela OpenAI? Sim."); bootstrap

## Contexto

É preciso uma primeira integração real para provar a tese de ponta a ponta. A
Responses API da OpenAI coloca comportamento e estilo em `instructions` (ou em
mensagens de developer), o que se encaixa diretamente em uma camada de persona
compilada. O adapter não pode virar um ponto de acoplamento
([ADR-0002](0002-provider-agnostic-specification-and-core.md)).

## Decisão

- `@vernaculo/openai` tem como alvo a **Responses API** e é deliberadamente fino:
  - **não depende de nenhum SDK da OpenAI** (só tipos estruturais) e **não faz nenhuma requisição**;
  - `withPersona(params, persona)` devolve uma cópia dos parâmetros da requisição com as instruções do agente primeiro e a camada de persona depois;
  - `composeInstructions()` e `developerMessage()` cobrem outros formatos de chamada.
- O adapter documenta e trata um comportamento verificado da API: com `previous_response_id`, **as `instructions` da resposta anterior não são reaplicadas** — a persona precisa ser enviada em toda requisição (por isso `withPersona` é idempotente por requisição).
- Sempre são usados o cliente, a API key (`OPENAI_API_KEY`) e o modelo do próprio usuário. O Vernáculo nunca escolhe modelo; os exemplos leem o modelo de `OPENAI_MODEL`.
- Um adapter para o **Agents SDK** da OpenAI (`@vernaculo/openai-agents`) é um pacote separado e futuro. `@openai/agents` nunca entra no core.

## Consequências

- Outros provedores seguem o mesmo formato: um adapter é uma camada de formatação e composição sobre a saída do compilador.
- Fatos sobre provedores ficam registrados com a data de verificação em [external-facts.md](../reference/external-facts.md).

## Alternativas consideradas

- **Encapsular o cliente do SDK da OpenAI** — rejeitado: força uma dependência e acoplamento de versões, e esconde a requisição do usuário.
- **Começar pelo Agents SDK** — adiado: a Responses API é a superfície mais baixa e mais estável; o Agents SDK aceita instruções em texto de qualquer forma.
