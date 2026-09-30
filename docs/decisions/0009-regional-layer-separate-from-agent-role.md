# ADR-0009: A camada regional é separada do papel e das regras de negócio do agente

- Status: Aceito (complementado pelo [ADR-0017](0017-any-ai-use-case-neutral-packs.md): "agente de negócio" vale para qualquer IA hospedeira)
- Data: 2026-09-29
- Origem: `ideia.txt` (tabela de camadas; "A inteligência comercial continua sendo exatamente a mesma. Só muda a camada sociolinguística"; "Honda Agent + Vernáculo Salvador = Honda Salvador Agent")

## Contexto

O caso motivador: o agente de vendas de uma concessionária atuando em Salvador (BA)
e em Recife (PE) — mesmos produtos, políticas, regras de financiamento e
conhecimento; linguagem regional diferente. Manter `honda-baiano-prompt.txt`,
`honda-pernambucano-prompt.txt`, `banco-baiano`, `suporte-baiano`... multiplica os
prompts pelas regiões e cria, sem ninguém perceber, versões divergentes das
regras de negócio.

## Decisão

```text
agente de negócio   +   camada de persona regional   =   agente localizado
(papel, regras,         (apenas linguagem)
 conhecimento)
```

- Uma persona é uma **camada de linguagem composta sobre um agente existente**, nunca um substituto do papel do agente.
- As camadas são preocupações distintas: idioma/variedade (`pt-BR`, localidade), registro, intensidade regional, papel (por exemplo, vendas), domínio (por exemplo, automotivo), marca e regras da empresa. O Vernáculo cuida apenas das três primeiras; o resto pertence ao agente hospedeiro.
- As instruções compiladas da persona são feitas para ficar **depois** das instruções do próprio agente e dizem que o papel, as regras, as políticas e os fatos do agente têm precedência; quando o estilo regional conflita com clareza ou precisão, a linguagem neutra vence.
- O agente não "vira" uma pessoa da região: não deve afirmar origem nem história pessoal na região.

## Consequências

- Os adapters oferecem helpers de composição (`withPersona`, `composeInstructions`).
- Ajustes específicos de uma empresa são expressos como uma persona derivada (`extends`) no repositório da empresa, não editando os packs da biblioteca ([inheritance-and-composition.md](../specification/inheritance-and-composition.md)).
- Os evals precisam verificar a **preservação da tarefa** e a **preservação das regras do agente pai** ([dimensions.md](../evals/dimensions.md)).
- Nota de vocabulário: a conversa chamou a persona de "middleware comportamental"; o projeto usa **camada de linguagem**, para não sugerir que o comportamento muda.

## Alternativas consideradas

- **Um prompt monolítico por empresa × região** — rejeitado: combinatório e sujeito a erros.
- **Persona com templates de papel** — rejeitado: mistura sociolinguística com lógica de negócio.
