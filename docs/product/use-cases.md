# Casos de uso

Os exemplos vêm da conversa de concepção. Nomes de marcas (Honda) descrevem apenas
o cenário motivador; os exemplos do repositório usam empresas fictícias.

## 1. O mesmo agente de vendas em várias cidades (caso motivador)

Um grupo de concessionárias de motos mantém um único assistente de vendas, com
conhecimento compartilhado (`motos.md`, `financiamento.md`, `concessionarias.md`) e
uma única política comercial. As lojas de Salvador (BA), Recife (PE) e Aracaju (SE)
querem respostas com jeito local — sem ninguém mantendo três versões do prompt.

```text
pt-BR + BA + Salvador + intensidade 0.35 + atendimento comercial + agente da concessionária
pt-BR + PE + Recife   + intensidade 0.35 + atendimento comercial + agente da concessionária
```

A inteligência comercial é idêntica; só a camada de linguagem muda. O agente não
"vira um baiano": continua sendo o agente da concessionária, seguindo a mesma
política, com uma camada de linguagem regional. Veja o
[ADR-0009](../decisions/0009-regional-layer-separate-from-agent-role.md).

API ilustrativa da conversa (não é a API implementada):

```ts
createAgent({ role: hondaSalesAgent, persona: regional("br/ba/salvador", { intensity: 0.25 }) });
createAgent({ role: hondaSalesAgent, persona: regional("br/pe/recife", { intensity: 0.25 }) });
```

O equivalente implementado é `withPersona(params, compilePersona(...))` — veja
[provider-adapters.md](../architecture/provider-adapters.md).

## 2. Qualquer agente de negócio × qualquer localidade

```text
Agente bancário + Vernáculo Recife = Agente bancário de Recife
Agente de suporte + Vernáculo Salvador = Agente de suporte de Salvador
```

Nada de arquivos `pizzaria-baiano`, `banco-baiano`, `suporte-baiano`: cada
combinação agente × localidade é uma composição.

## 3. Ajustes da empresa sobre um pack da biblioteca

Uma empresa mantém `vernaculo/honda-salvador.yaml` no próprio repositório:

```yaml
extends: pt-BR/ba/salvador
regionality:
  defaultIntensity: 0.25
linguistics:
  vocabulary:
    discouraged:
      - term: ...        # uma forma que o guia de estilo da empresa evita
```

Veja [inheritance-and-composition.md](../specification/inheritance-and-composition.md)
e o exemplo executável [`examples/project-persona`](../../examples/project-persona/).

## 4. Intensidades diferentes para produtos diferentes

| Uso | Faixa de intensidade (da conversa, provisória) |
| --- | --- |
| Atendimento comercial | 0.15–0.35 |
| Personagem de jogo | 0.40–0.70 |
| Experimento linguístico | 0.80+ |

A intensidade muda quanta marcação regional é renderizada, nunca as regras
anti-caricatura. Veja [regional-intensity.md](../specification/regional-intensity.md).

## 5. Três formas de consumir uma persona

| Modo | O que o usuário leva | Precisa de código do Vernáculo em runtime? |
| --- | --- | --- |
| **Pack** | arquivos portáveis (`persona.yaml`, ou uma cópia ejetada e achatada + `instructions.md` compilado) | não |
| **Skill** | um diretório de Agent Skill exportado (`SKILL.md` + `references/`) | não |
| **SDK** | `@vernaculo/core` + `@vernaculo/compiler` + um adapter, compilando em build ou em runtime | apenas os pacotes que o próprio usuário instalou |

## 6. Implantações totalmente locais / isoladas da internet

```text
Vernáculo + Ollama + Qwen / Llama / Gemma  — tudo dentro da empresa
Internet ✗   OpenAI API ✗   API do Vernáculo ✗ (não existe)
```

As instruções compiladas são texto simples, utilizável por qualquer modelo local.
Um adapter dedicado a modelos locais está no roadmap; o design já permite isso
porque nada no pipeline precisa de rede.

## 7. Agentes que carregam skills

Uma equipe coloca `vernaculo-pt-br-ba-salvador/` (skill exportada) em um agente que
suporta Agent Skills e a referencia nas instruções do agente, por exemplo:

```text
Role: Dealership sales assistant.
Use: skills/vernaculo/pt-BR/ba/salvador
```

(A conversa também esboçou `Regional intensity: 0.30` dentro do arquivo do agente;
intensidade escolhida em runtime para skills é uma
[questão em aberto](../roadmap/open-questions.md) — hoje a intensidade é escolhida no
momento da exportação.)

## 8. Futuro: além do Brasil e além do texto

O esquema de ids já cobre outros idiomas e variedades (`pt-PT/lisboa`,
`es-AR/buenos-aires`, `en-US/tx`...) e, mais adiante, voz (síntese de fala
regional). As duas coisas são ideias do roadmap, não escopo atual.
