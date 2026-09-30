# Vernáculo

**Camadas de linguagem regional para qualquer IA — abertas, self-hosted e independentes de provedor.**

> **Status: bootstrap inicial (setembro de 2026).** A especificação (`v1alpha1`),
> a implementação de referência e a CLI funcionam e estão testadas. Os packs da Bahia
> são rascunhos bibliográficos, ainda sem revisão por falantes: há um pack estadual
> conservador e um recorte específico de Salvador. Nada foi publicado no npm ainda.
> Não use em produção.

## O problema

A mesma IA — um assistente, um tutor, um personagem, uma ferramenta de escrita, um
atendente — conversa com gente de muitos lugares, e as pessoas falam de um jeito
diferente em cada cidade. Escrever um prompt por IA × região cria versões
divergentes das regras; pedir a um modelo que "fale como alguém daqui" produz
estereótipos e gírias inventadas.

## O que é o Vernáculo

O Vernáculo descreve como uma variedade da língua é falada — vocabulário,
marcadores discursivos, formas de tratamento, convenções de conversa, padrões de
frase — como **dados portáveis e versionados**, e compila isso em uma **camada de
linguagem** que você coloca sobre a IA que já tem — um assistente, um tutor, um
personagem, uma ferramenta de escrita, um atendente:

```text
sua IA (qualquer papel, regras, conhecimento)  +  camada de persona regional  =  a mesma IA, com o jeito local
```

Nenhum modelo é alterado nem passa por fine-tuning: a camada é um texto de
instruções que roda com o seu próprio provedor ou com um modelo local.

Ela muda **como** as coisas são ditas, nunca **quem** o agente é: personas não
conseguem descrever personalidade, humor, inteligência, classe ou comportamento, e
toda camada compilada diz ao modelo para manter o papel e as regras do seu agente,
nunca imitar um estereótipo, nunca inventar regionalismos e nunca afirmar ser da
região. [Por quê e como →](docs/linguistic/anti-caricature.md)

## Como funciona

1. **Uma persona por lugar.** Um arquivo `persona.yaml` descreve, com pesquisa e fontes, como se fala ali: palavras e expressões, formas de tratamento, jeito de cumprimentar e de se despedir, o que evitar e exemplos.
2. **Você escolhe a intensidade**, de 0 (português neutro) a 1 (bem marcado). Em torno de 0,3 é um toque leve, um bom ponto de partida para qualquer uso.
3. **O Vernáculo gera, na sua máquina, um bloco de instruções** a partir do arquivo — sem chamar nenhuma IA e sem internet.
4. **Esse bloco vai depois do prompt da sua IA**, seja ela um assistente, um tutor, um personagem ou um atendente. O modelo que você já usa (OpenAI, Claude, um modelo local...) passa a escrever com o jeito local, mantendo o papel e as regras que você definiu. Os packs não pressupõem nenhum uso ([ADR-0017](docs/decisions/0017-any-ai-use-case-neutral-packs.md)).

Três formas de usar:

| Forma | Para quem | Como |
| --- | --- | --- |
| **Pacote npm** | quem programa em Node/TypeScript | `compilePersona(...)` + `withPersona(...)` no código (planejado no npm; hoje, pelo repositório) |
| **CLI** | quem quer só o texto pronto | `vernaculo compile <persona> --intensity 0.3 > jeito-de-falar.md` e colar depois do prompt |
| **Skill** | agentes que aceitam Agent Skills | `vernaculo export <persona> --target skill` e copiar a pasta |

Nada passa por servidor do Vernáculo — ele não existe. E, se quiser se livrar de
qualquer dependência, `vernaculo eject` copia para o seu projeto uma persona
autocontida e as instruções já compiladas.

## Exemplo

```bash
pnpm install && pnpm build
pnpm vernaculo compile pt-BR/x-fixture/cidade-a --root fixtures/personas --intensity 0.3
```

```ts
import { compilePersona } from "@vernaculo/compiler";
import { loadPersona } from "@vernaculo/core/node";
import { withPersona } from "@vernaculo/openai";

const persona = compilePersona(await loadPersona("pt-BR/x-fixture/cidade-a", { roots: "fixtures/personas" }), {
  intensity: 0.25, // 0 = neutro … 1 = fortemente marcado; nunca caricatura
});

// O seu cliente OpenAI, a sua chave, o seu modelo. Aplique em toda requisição.
const params = withPersona({ model, instructions: instrucoesDoSeuAgente, input }, persona);
```

(`pt-BR/x-fixture/...` são fixtures sintéticos com palavras inventadas. O pack amplo
da Bahia (`pt-BR/ba`) e o recorte de Salvador (`pt-BR/ba/salvador`) são rascunhos
bibliográficos ainda sem revisão por falantes. Outros estados e cidades estão
planejados.)

## Princípios

- **Nenhuma infraestrutura do Vernáculo em runtime.** Nenhuma API, conta, chave, banco de dados, proxy ou telemetria. Tudo roda no seu projeto, com o seu provedor ou um modelo local. Se este repositório desaparecesse, as personas que você instalou ou ejetou continuariam funcionando. [ADR-0001](docs/decisions/0001-no-vernaculo-infrastructure-at-runtime.md)
- **Independente de provedor.** A especificação e o core não sabem nada sobre nenhum provedor. A OpenAI é o primeiro adapter; a exportação para Agent Skills já vem pronta; outros provedores, modelos locais e MCP estão planejados. [ADR-0002](docs/decisions/0002-provider-agnostic-specification-and-core.md)
- **Formato aberto.** YAML + Markdown com um JSON Schema normativo e uma suíte de conformidade neutra de linguagem, implementável em qualquer linguagem. [Especificação](docs/specification/overview.md)
- **Determinístico.** Compilar uma persona nunca chama um modelo. [ADR-0011](docs/decisions/0011-deterministic-llm-free-compilation.md)
- **Evidência antes de afirmações.** Todo traço declara sua evidência e suas fontes; hipóteses nunca são renderizadas; a maturidade (`fixture` / `draft` / `reviewed`) aparece em toda saída. Evals fazem parte do produto; a revisão por falantes de cada variedade é sempre recomendada (nunca obrigatória), e a CLI avisa isso para todo rascunho.
- **Sem lock-in.** `vernaculo eject` grava no seu projeto uma persona autocontida e as instruções compiladas.

## O que existe hoje

| Parte | Status |
| --- | --- |
| Persona Specification `vernaculo.dev/v1alpha1` + suíte de conformidade | feito (alfa) |
| `@vernaculo/schema`, `@vernaculo/core`, `@vernaculo/compiler` | feito |
| `@vernaculo/openai` (Responses API, sem dependência de SDK) | feito |
| `@vernaculo/skills` (exportador de Agent Skills) | feito |
| CLI `vernaculo`: `list`, `inspect`, `validate`, `compile`, `export --target skill`, `eject` | feito |
| CLI `add` / `search` / `update` | planejado |
| Pack estadual da Bahia (`pt-BR/ba`) | rascunho — pesquisa bibliográfica, escopo conservador e sem revisão por falantes ([dossiê](personas/pt-BR/ba/RESEARCH.md)) |
| Recorte de Salvador (`pt-BR/ba/salvador`) | rascunho — pesquisa bibliográfica específica da capital ([dossiê](personas/pt-BR/ba/salvador/RESEARCH.md)) |
| Packs regionais de Aracaju, Recife e São Paulo | planejado — pesquisa não iniciada |
| Laboratório local para testar packs com um modelo real ([`examples/agent-lab`](examples/agent-lab/)) | feito |
| Executor de evals com modelos, rodadas de revisão humana | planejado (metodologia documentada) |
| Adapters MCP, Anthropic, Gemini e de modelos locais | planejado |

Veja o [roadmap](docs/roadmap/roadmap.md) e as [questões em aberto](docs/roadmap/open-questions.md).

## Repositório

```text
docs/               documentação — a fonte da verdade
schemas/            JSON Schema normativo + suíte de conformidade
packages/           schema, core, compiler, openai, skills, cli
personas/           a biblioteca pública de packs (vazia por enquanto)
fixtures/personas/  personas sintéticas para testes e exemplos
examples/           exemplos executáveis
```

Stack: TypeScript 7, Node.js (24 LTS no desenvolvimento; os pacotes suportam ≥ 22.12),
monorepo com pnpm workspaces, Zod 4, YAML, Vitest, Biome, tsdown, Commander,
Changesets e GitHub Actions. Detalhes: [docs/development/stack.md](docs/development/stack.md).

## Desenvolvimento

```bash
pnpm install
pnpm check        # lint + typecheck + testes + build + validação dos dados de persona (o CI roda isto)
pnpm test         # só os testes, sobre os fontes
pnpm build        # build de todos os pacotes
pnpm vernaculo --help
```

Veja o [CONTRIBUTING.md](CONTRIBUTING.md) e a [documentação](docs/README.md).

## Licença

Tudo neste repositório — código, especificação, documentação e packs de persona — é
open source sob a [Apache-2.0](LICENSE): livre para usar, modificar e embutir,
inclusive comercialmente ([ADR-0014](docs/decisions/0014-apache-2-0-persona-content.md)).
Material linguístico de terceiros mantém a própria licença e só é consultado, citado
ou redistribuído como essa licença permite.
