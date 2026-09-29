# ADR-0003: YAML + Markdown com JSON Schema normativo

- Status: Aceito
- Data: 2026-09-29
- Origem: `ideia.txt` ("o formato das personas não pertence ao TypeScript nem a nenhum provedor. Ele será composto de YAML + Markdown + JSON Schema"); bootstrap

## Contexto

Personas precisam ser legíveis e revisáveis por linguistas e falantes (não só por
programadores), comparáveis em diffs do Git e implementáveis por terceiros em
Python, Rust, Go, Java, C# ou qualquer outra linguagem. O significado de uma
persona não pode depender da leitura de código TypeScript.

## Decisão

- Documentos de persona são **arquivos YAML 1.2 restritos ao modelo de dados JSON** (sem `.nan`, `.inf`, binários ou tags customizadas; chaves duplicadas são erro).
- Texto longo para pessoas (documentação, notas de pesquisa, skills geradas) é **Markdown**.
- O contrato estrutural é um **JSON Schema (draft 2020-12) escrito à mão**, em `schemas/<versão>/persona.schema.json`. Ele é normativo.
- Regras semânticas que o JSON Schema não expressa (consistência de idioma, chaves únicas, referências a fontes, herança) são especificadas em prosa em [persona-format.md](../specification/persona-format.md), com códigos de issue estáveis.
- Uma **suíte de conformidade neutra de linguagem** (`schemas/conformance/`) contém documentos válidos, estruturalmente inválidos, semanticamente inválidos (com o código de issue esperado) e casos de resolução com vários arquivos (com a saída achatada esperada). Qualquer implementação pode executá-la.
- A implementação em TypeScript espelha o JSON Schema com Zod 4 para validação tipada em runtime. Divergências são detectadas por um teste diferencial (Ajv sobre o JSON Schema versus Zod em cada arquivo de conformidade) e por um teste de paridade estrutural (o JSON Schema gerado a partir do Zod precisa ter exatamente as mesmas restrições do canônico).
- A primeira versão publicada é `vernaculo.dev/v1alpha1`: alfa, pode mudar de forma incompatível. `vernaculo.dev` é um identificador de namespace e nunca é buscado na rede.

## Consequências

- Mudar o formato significa mudar, na mesma alteração: o JSON Schema, o espelho Zod, os fixtures de conformidade, a documentação da especificação e, se necessário, o `apiVersion`.
- Strings que parsers YAML 1.1 interpretam errado (datas, `yes`/`no`) são colocadas entre aspas quando o Vernáculo escreve YAML, para que os arquivos continuem portáveis entre bibliotecas.
- `SKILL.md`, recursos MCP ou prompts de provedores são *saídas*, nunca a fonte da verdade ([ADR-0006](0006-mcp-future-adapter-not-canonical.md), [ADR-0007](0007-agent-skills-early-export-target.md)).

## Alternativas consideradas

- **Zod como fonte, com JSON Schema gerado a partir dele** — rejeitado: faria do TypeScript a definição de fato do formato. O Zod fica como espelho verificado.
- **Personas em `SKILL.md` ou só em Markdown** — rejeitado: não são validáveis por máquina e são difíceis de compor e de filtrar por intensidade.
- **Arquivos JSON** — rejeitado pela ergonomia de autoria (comentários, texto em várias linhas); YAML mapeia 1:1 para JSON de qualquer forma.
