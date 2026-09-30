# Exemplos

Os exemplos de mecanismo usam os **fixtures sintéticos** de
[`../fixtures/personas`](../fixtures/personas): as formas "regionais" dos fixtures são
marcadores inventados, não linguagem real. O laboratório (`agent-lab/`) usa o
rascunho real de Salvador. Ainda não existe nenhum pack regional revisado.

Faça o build dos pacotes uma vez antes de rodar qualquer coisa aqui:

```bash
pnpm install
pnpm build
```

## [`openai/`](openai/) — uma IA hospedeira (um assistente de vendas fictício) + camada de persona na Responses API

```bash
pnpm --filter @vernaculo/example-openai start          # simulação: imprime os parâmetros da requisição
OPENAI_API_KEY=... OPENAI_MODEL=... pnpm --filter @vernaculo/example-openai start
```

A sua chave, o seu modelo, a sua conta: o Vernáculo nunca vê a requisição. O
exemplo também mostra por que a persona precisa ser aplicada em toda rodada da
conversa (`previous_response_id` não reaplica as `instructions`).

## [`agent-lab/`](agent-lab/) — testar um pack com um modelo real

Roda cenários com várias IAs hospedeiras (assistente geral, tutor, loja), com e sem
a camada, em várias intensidades, e gera um relatório com sinais automáticos e uma
folha de revisão cega para falantes da variedade. Precisa de um `.env` com a sua chave e o seu modelo (veja o
[README](agent-lab/README.md)); sem ele, só mostra o plano.

```bash
pnpm --filter @vernaculo/example-agent-lab start
```

## [`project-persona/`](project-persona/) — o arquivo de persona da própria empresa

`acme-cidade-a.yaml` estende uma persona de uma raiz de personas, baixa a
intensidade e desencoraja uma forma. O mesmo código de agente funciona com qualquer
localidade.

```bash
pnpm vernaculo inspect examples/project-persona/acme-cidade-a.yaml --root fixtures/personas
pnpm vernaculo compile examples/project-persona/acme-cidade-a.yaml --root fixtures/personas
pnpm vernaculo eject examples/project-persona/acme-cidade-a.yaml --root fixtures/personas --out .vernaculo-tmp/acme
```

O `eject` grava um `persona.yaml` achatado e autocontido, mais o `instructions.md`
compilado: a partir daí o projeto não precisa mais de nenhum pacote do Vernáculo.

## Exportar como Agent Skill

```bash
pnpm vernaculo export pt-BR/x-fixture/cidade-a --root fixtures/personas --target skill --out .vernaculo-tmp/skills
```

Gera `vernaculo-pt-br-x-fixture-cidade-a/` com `SKILL.md` e `references/`, seguindo a
[especificação Agent Skills](https://agentskills.io/specification). Copie o diretório
para qualquer agente que suporte skills.

## System prompt simples

```bash
pnpm vernaculo compile pt-BR/x-fixture/cidade-a --root fixtures/personas --intensity 0.3
```

Cole o Markdown depois das instruções do seu agente, em qualquer provedor ou modelo local.
