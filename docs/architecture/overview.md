# Visão geral da arquitetura

## Pipeline

```text
                    (máquina / CI / servidor do usuário — nunca do Vernáculo)

arquivos persona.yaml ──► parse + validação ──► resolução da linhagem ──► IR ──► compilação ──► target / adapter ──► provedor do usuário
(raízes de personas,      YAML 1.2 (modelo      extends explícito,        intensidade  instruções      parâmetros OpenAI,     ou modelo local
 arquivos do projeto)     de dados JSON) +      achatamento, regras       aplicada,    em Markdown     diretório de skill,
                          schema + regras       semânticas                congelada                    prompt simples, ...
└───────────────── @vernaculo/core ───────────────────────────────────┘ └─ compiler ─┘ └─ @vernaculo/openai, @vernaculo/skills ─┘
```

Cada seta é uma chamada de função local e determinística. Nenhuma etapa chama um
modelo ou a rede ([ADR-0011](../decisions/0011-deterministic-llm-free-compilation.md)).

## Camadas e responsabilidades

| Camada | É dona de | Não deve saber sobre |
| --- | --- | --- |
| **Especificação** (`schemas/`, `docs/specification/`) | o formato, as regras semânticas, a suíte de conformidade | qualquer linguagem de implementação, qualquer provedor |
| **`@vernaculo/schema`** | pacote do JSON Schema, tipos TS, espelho Zod | comportamento, sistema de arquivos, provedores |
| **`@vernaculo/core`** | parse, validação estrutural e semântica, resolução da linhagem, achatamento, seleção por intensidade (IR), serialização canônica; fontes em sistema de arquivos em `@vernaculo/core/node` | redação das instruções, provedores |
| **`@vernaculo/compiler`** | redação: transformar a IR em instruções Markdown neutras de provedor, regras de base, avisos de maturidade | provedores, sistema de arquivos |
| **Adapters / targets** (`@vernaculo/openai`, `@vernaculo/skills`) | moldar a saída compilada para um destino (parâmetros de requisição, diretório de skill) | semântica de persona (nunca selecionam traços de novo) |
| **CLI** (`vernaculo`) | fluxos do usuário: list, inspect, validate, compile, export, eject; escrita de arquivos | — |

A direção de dependências é única e verificada por
`packages/core/test/architecture.test.ts`:

```text
schema ◄── core ◄── compiler ◄── openai, skills ◄── cli
```

## Camadas conceituais de um agente localizado

Da conversa de concepção, um agente em produção combina preocupações independentes:

| Preocupação | Exemplo | Responsável |
| --- | --- | --- |
| Idioma | `pt-BR` | persona do Vernáculo (id, `metadata.language`) |
| Granularidade da variedade | Nordeste → Bahia → Salvador (ou uma variedade não administrativa) | id da persona + `extends` |
| Registro | conversacional, atendimento | questão em aberto (não modelado na v1alpha1) |
| Intensidade regional | 0.0–1.0 | Vernáculo (opção no momento de compilar/exportar) |
| Papel | assistente de vendas | agente hospedeiro |
| Domínio | automotivo | agente hospedeiro |
| Marca | a concessionária | agente hospedeiro |
| Regras da empresa | financiamento, políticas da loja | agente hospedeiro |

O Vernáculo cuida apenas das preocupações de linguagem
([ADR-0009](../decisions/0009-regional-layer-separate-from-agent-role.md)).

## Propriedades-chave do design

- **Dado, não prompt.** Uma persona é dado estruturado; a redação é responsabilidade do compilador e pode melhorar sem mexer nos packs.
- **Representação intermediária.** A IR é o único lugar onde as regras de intensidade e evidência selecionam traços. Os targets só a formatam ([compilation.md](compilation.md)).
- **Core independente de runtime.** O ponto de entrada principal de `@vernaculo/core` não tem imports `node:`; bundlers, navegadores e edge runtimes podem usar `createMemorySource` com YAML embutido.
- **Herança explícita.** Ids são nomes; `extends` é o único mecanismo de herança ([ADR-0013](../decisions/0013-explicit-inheritance.md)).
- **Maturidade honesta.** A maturidade efetiva (a menos madura da linhagem) aparece como aviso visível em toda saída.

## Para onde ir depois

- Pacotes e APIs públicas: [packages.md](packages.md)
- IR, compilador e targets: [compilation.md](compilation.md)
- Especificidades de provedores: [provider-adapters.md](provider-adapters.md)
- Como as personas chegam aos projetos: [distribution.md](distribution.md)
- Da pesquisa ao release: [persona-lifecycle.md](persona-lifecycle.md)
- O invariante de infraestrutura zero: [zero-infrastructure.md](zero-infrastructure.md)
