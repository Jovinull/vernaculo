# Visão

## O problema

Empresas colocam o mesmo agente de IA em muitos lugares. O assistente de vendas de
uma concessionária em Salvador (BA) e em Recife (PE) deve conhecer os mesmos
produtos, seguir a mesma política de financiamento e obedecer às mesmas regras —
mas as pessoas falam de um jeito diferente em cada lugar, e um agente que soa como
se tivesse sido escrito para outro lugar (ou, pior, como uma caricatura do lugar)
passa uma impressão errada.

Hoje as opções são ruins:

- um prompt por empresa × região (`honda-baiano-prompt.txt`, `honda-pernambucano-prompt.txt`, ...), o que cria versões divergentes das regras de negócio e não escala;
- instruções improvisadas do tipo "fale como alguém daqui", que produzem estereótipos e gírias inventadas;
- fine-tuning, que é caro, preso a um provedor e cada vez menos disponível.

## O que é o Vernáculo

> **O Vernáculo é uma especificação, uma biblioteca e um conjunto de ferramentas
> abertos, self-hosted e independentes de provedor para adicionar localização
> sociolinguística — camadas de linguagem regional — a agentes de IA.**

```text
agente de negócio  +  camada de persona regional  =  agente localizado
```

Ele tem quatro ativos, em ordem de importância:

1. **A Vernáculo Persona Specification** — um formato aberto e declarativo (YAML + Markdown + JSON Schema) para descrever traços observáveis de uma variedade linguística, com intensidade, proveniência e status de revisão. Implementável em qualquer linguagem.
2. **Uma biblioteca pública de packs de persona regional** — pequena, pesquisada, com licença aberta (Apache-2.0), com revisão por falantes sempre recomendada, começando pelo português brasileiro.
3. **Um compilador determinístico e adapters** — que transformam packs em instruções para a OpenAI, Agent Skills, system prompts simples e, depois, outros provedores e MCP.
4. **Evals** — verificações locais e reproduzíveis de que um pack é natural, fiel à variedade, preserva a tarefa e as regras do agente, não abusa dos traços e não deixa vazar estereótipos.

O produto **não** é o `@vernaculo/openai`. A OpenAI é só o primeiro adapter
oficial; a especificação e os packs são o que deve continuar relevante mesmo que o
ecossistema de agentes mude completamente.

## O que o Vernáculo não é

- Não é um serviço: não existe API, conta, banco de dados ou inferência hospedada do Vernáculo. Tudo roda no projeto do usuário, com o provedor ou o modelo local do usuário ([ADR-0001](../decisions/0001-no-vernaculo-infrastructure-at-runtime.md)).
- Não é um "MCP de sotaques" nem uma coleção de prompts engraçados ([ADR-0006](../decisions/0006-mcp-future-adapter-not-canonical.md)).
- Não é um formato universal de personalidade de IA. Formatos genéricos de persona/personagem já existem (Character Cards e vários projetos de "persona spec"); o Vernáculo ocupa de propósito o nicho mais estreito e menos disputado da **localização sociolinguística**.
- Não é um modelo do que as pessoas de uma região *são*. Ele modela como uma variedade é *falada* — nunca personalidade, inteligência, classe ou comportamento ([ADR-0010](../decisions/0010-observable-sociolinguistic-features-only.md)).

## Por que pode virar referência

- Uma persona é **dado, não prompt**: pode ser validada, versionada, revisada, comparada, herdada e avaliada.
- Uma persona, vários runtimes: o mesmo pack compila para instruções da OpenAI, uma Agent Skill ou um prompt simples.
- **Evals e revisão humana** por falantes de cada variedade fazem parte do produto, não são um detalhe posterior. O feedback que geram ("natural", "exagerado", "não reconheço isso", "isso é de outra região") é, por si só, dado de pesquisa valioso.
- Credibilidade linguística: a granularidade segue a evidência (por exemplo, `pt-BR/ba/salvador` em vez de um "baiano" monolítico), com fontes e licenças registradas por traço.

## Nome

**Vernáculo** — a forma de falar própria de uma região ou comunidade. O nome
técnico é `vernaculo` (CLI e pacote npm) e `@vernaculo/*` (pacotes de biblioteca).
O nome foi escolhido em vez de alternativas terminadas em "BR" porque o design não
se limita ao Brasil (packs futuros podem incluir `pt-PT`, `es-AR`, `en-US`...), e em
vez de "Sotaque" porque já existe um projeto open source brasileiro chamado Sotaque
Brasileiro (dataset de vozes).

Slogans propostos na conversa de concepção (não são a marca final):
"Vernáculo — Local personas for AI agents" e "Local language. Local identity.
Any AI." Quando usados, "identity" deve ser lido apenas como identidade
*linguística*.

## Estágio atual

Bootstrap inicial (setembro de 2026): a especificação `v1alpha1`, a implementação de
referência, a CLI e os adapters existem; **ainda não existe nenhum pack regional
real** — apenas fixtures sintéticos. Veja o [roadmap](../roadmap/roadmap.md).
