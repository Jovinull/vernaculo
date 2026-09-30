# Laboratório de agente

Testa um pack regional com um modelo de verdade, **na sua máquina, com a sua chave**.
Ele roda os cenários de [`scenarios.yaml`](scenarios.yaml) com **várias IAs
hospedeiras** ([`agents/`](agents/)), porque a camada serve a qualquer IA e nenhum uso
é o padrão ([ADR-0017](../../docs/decisions/0017-any-ai-use-case-neutral-packs.md)):

| IA hospedeira | Cenários |
| --- | --- |
| [`assistente`](agents/assistente.md) — assistente geral | pedir ajuda, conversa descontraída, boa notícia, pessoa mais velha, e-mail formal, pessoa aflita, "de onde você é?", "fala igual baiano" |
| [`tutor`](agents/tutor.md) — tutor de matemática com regra pedagógica | dúvida escolar |
| [`loja`](agents/loja.md) — atendimento de uma loja de motos fictícia | primeiro contato, reclamação |

Cada cenário roda em várias variantes:

- **sem camada** (controle: só a IA hospedeira);
- **intensidade 0** (a camada neutra: só regras de base e restrições);
- **intensidade padrão** do pack, **0.7** e **1**.

Para cada rodada ele grava, em `reports/<data>-<persona>/` (ignorado pelo Git):

| Arquivo | Para quem | O que tem |
| --- | --- | --- |
| `relatorio.md` | quem mantém o pack | todas as conversas lado a lado por cenário, com sinais automáticos e um resumo por variante |
| `revisao-cega.md` | falantes da variedade | as mesmas conversas embaralhadas, sem dizer qual variante gerou cada uma nem qual é a variedade; primeiro a pergunta "de onde você diria que é quem escreveu?" ([reconhecimento](../../docs/evals/dimensions.md#reconhecimento)), depois os [rótulos de revisão](../../docs/linguistic/human-review.md#rótulos). Conversas em que a pessoa cita o lugar (`revealsRegion: true`) ficam numa parte 2, sem a pergunta |
| `gabarito.json` | quem mantém o pack | qual variante gerou cada amostra da revisão cega |
| `resultados.json` | análise posterior | tudo em formato bruto: instruções das IAs hospedeiras, hash das instruções de cada variante, respostas, sinais e tokens |

Os **sinais automáticos** são heurísticos: formas do pack usadas dentro e fora da faixa
de intensidade, hipóteses e formas desencorajadas que o modelo usou por conta própria,
menções à região, afirmação de origem ("sou de...") e contagem de formas de tratamento
(você, lhe, te, tu, o senhor/a senhora). Eles ajudam a achar problemas; **não provam
naturalidade**. Quem julga se soa natural são falantes da variedade.

Isto é um laboratório manual, não o executor de evals do projeto (que continua em
aberto, veja [evals/strategy.md](../../docs/evals/strategy.md)).

## Como usar

```bash
pnpm install
pnpm build
cp examples/agent-lab/.env.example examples/agent-lab/.env   # depois edite o .env
pnpm --filter @vernaculo/example-agent-lab start
```

No `.env` (nunca versionado), preencha `OPENAI_API_KEY` e `OPENAI_MODEL`. Sem eles,
ou com `--dry-run`, o laboratório só mostra o plano (variantes, cenários, número de
chamadas) e não envia nada.

Opções (depois de `start --`):

| Opção | Padrão | O que faz |
| --- | --- | --- |
| `--persona <id>` | `pt-BR/ba` | pack a testar |
| `--root <dir>` | `personas/` | raiz de personas (repetível) |
| `--variants <lista>` | `none,0,default,0.7,1` | `none` = sem camada; `default` = intensidade padrão do pack; ou números de 0 a 1 |
| `--scenario <id>` | todos | roda só esse cenário (repetível) |
| `--model <nome>` | `OPENAI_MODEL` | modelo |
| `--max-calls <n>` | `120` | não roda se o plano passar disso (proteção de custo) |
| `--concurrency <n>` | `4` | conversas em paralelo |
| `--out <dir>` | `examples/agent-lab/reports` | onde gravar |
| `--dry-run` | — | só mostra o plano |

Exemplo barato, só dois cenários e duas variantes:

```bash
pnpm --filter @vernaculo/example-agent-lab start -- --scenario pedido-de-ajuda --scenario de-onde-voce-e --variants none,default
```

Variáveis opcionais: `OPENAI_REASONING_EFFORT` (para modelos de raciocínio) e
`OPENAI_BASE_URL` (qualquer endpoint compatível com a Responses API, inclusive um
modelo local).

## Privacidade e custo

- A chave fica só no seu `.env`; o laboratório nunca a imprime nem a grava.
- As requisições vão com `store: false`: o laboratório guarda o histórico da conversa
  ele mesmo, então nada precisa ficar armazenado no provedor para a conversa continuar.
- Os cenários padrão fazem 70 chamadas curtas por rodada (11 cenários × 5 variantes,
  alguns com duas mensagens). Use `--scenario` e `--variants` para rodadas menores.
- Os relatórios contêm respostas do modelo, não dados pessoais; mesmo assim ficam
  fora do Git por padrão. Compartilhe `revisao-cega.md` com revisores de propósito.

## Mudando o teste

- **Outra IA hospedeira:** crie `agents/<id>.md` (um personagem, uma ferramenta de
  escrita...) e aponte cenários para ela com `agent: <id>`. A camada regional vai
  depois das instruções da IA hospedeira, como em produção.
- **Outros cenários:** edite `scenarios.yaml`. Mantenha as mensagens neutras, sem
  formas regionais, para ver o que a camada (e só ela) introduz.
- **Outro pack:** `--persona <id>`, e acrescente os nomes de lugar e gentílicos dele em
  `regionTerms` no `scenarios.yaml`.
