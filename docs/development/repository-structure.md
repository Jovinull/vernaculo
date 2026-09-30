# Estrutura do repositório

```text
vernaculo/
├── CLAUDE.md                  # instruções sempre carregadas pelo Claude Code (curtas)
├── .claude/
│   ├── rules/                 # regras de engenharia por caminho, para o Claude Code
│   └── skills/                # skills do projeto (procedimentos, carregados quando relevantes)
├── .changeset/                # configuração do Changesets
├── .github/workflows/ci.yml   # CI: pnpm check no Node 22/24, Linux + Windows
├── docs/                      # documentação canônica (fonte da verdade)
├── schemas/
│   ├── v1alpha1/persona.schema.json   # JSON Schema normativo
│   └── conformance/v1alpha1/          # suíte de conformidade neutra de linguagem
├── packages/
│   ├── schema/                # @vernaculo/schema
│   ├── core/                  # @vernaculo/core (+ /node)
│   ├── compiler/              # @vernaculo/compiler
│   ├── openai/                # @vernaculo/openai
│   ├── skills/                # @vernaculo/skills
│   └── cli/                   # vernaculo (CLI)
├── personas/                  # biblioteca pública; packs reais com pesquisa ficam aqui
├── fixtures/personas/         # personas SINTÉTICAS para testes e exemplos
├── examples/                  # exemplos executáveis (usam fixtures)
├── ideia.txt                  # conversa de concepção (registro histórico; não é fonte da verdade)
├── LICENSE                    # Apache-2.0
└── package.json, pnpm-workspace.yaml, tsconfig*.json, tsdown.base.ts, vitest.config.ts, biome.json
```

Cada pacote tem: `src/` (com `index.ts`), `test/`, `package.json`, `tsconfig.json` e
`tsdown.config.ts`. A saída do build vai para `dist/` (ignorado pelo Git).

## Diferenças em relação à estrutura esboçada na conversa

| Esboço | Agora | Motivo |
| --- | --- | --- |
| `schemas/persona.schema.json` (antes: `spec/persona.schema.json`) | `schemas/v1alpha1/persona.schema.json` | um diretório por versão da especificação, com a sua suíte de conformidade |
| `personas/pt-BR/{base,ba/salvador,se/aracaju,pe/recife,sp/sao-paulo}` | `personas/pt-BR/ba/` (Bahia estadual) e `personas/pt-BR/ba/salvador/` (recorte) | só existem os escopos pesquisados; nada de packs placeholder nem de base `pt-BR` |
| `packages/mcp` "posteriormente" | não criado | trabalho futuro; documentado em vez de criado como esqueleto |
| `packages/eval` (esboço inicial) | não criado | ainda não há executor de evals; a estratégia está documentada |
| `evals/` | não criado | será criado com a primeira suíte de evals real |
| `examples/{openai, openai-agents, raw-prompt, skill}` | `examples/openai`, `examples/project-persona`, `examples/agent-lab` e comandos em `examples/README.md` | só exemplos executáveis; prompt simples e skill são um único comando da CLI |
| — | `fixtures/personas` | dados sintéticos compartilhados, separados da biblioteca para nunca serem confundidos com packs reais |
| — | `schemas/conformance/` | torna a especificação implementável em outras linguagens |

## Idioma

A documentação e os metadados do projeto são escritos em **português brasileiro**
([ADR-0016](../decisions/0016-documentation-in-portuguese.md)). Continuam em inglês:
identificadores, comentários de código e nomes de testes; mensagens da CLI; o texto
de enquadramento das instruções compiladas (lido pelo modelo); códigos estáveis
(issue codes, valores de enums, `apiVersion`); os nomes dos campos do formato de
persona; e os nomes de arquivos e diretórios. O conteúdo de cada persona fica no
idioma da variedade que ela descreve.
