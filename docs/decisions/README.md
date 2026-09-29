# Registros de decisão (ADRs)

Decisões estruturais ficam aqui, como registros curtos e numerados (ADRs). Os
documentos narrativos explicam *como as coisas funcionam*; os ADRs registram *o que
foi decidido, por quê e o que foi rejeitado*, para que uma decisão seja revista de
propósito, e não corroída por acidente.

## Quando escrever um ADR

Escreva um ADR quando uma mudança:

- introduz ou altera um invariante arquitetural (dependências em runtime, rede, determinismo, acoplamento a provedores);
- muda o modelo do formato de persona (não um ajuste pontual de campo), seu versionamento ou sua semântica de herança;
- adiciona um novo tipo de target/adapter ou canal de distribuição;
- muda licenciamento, regras centrais da metodologia linguística ou a política anti-caricatura;
- reverte ou substitui um ADR existente.

**Não** escreva ADRs para escolhas rotineiras (nome de um helper, atualização de patch de dependência).

## Regras

- Os arquivos seguem `NNNN-titulo-em-kebab.md`, numerados em sequência e nunca renumerados.
- O status é um de: `Proposto`, `Aceito`, `Substituído pelo ADR-NNNN`, `Obsoleto`.
- Um ADR aceito não é reescrito para mudar a decisão: escreva um ADR novo que o substitua e altere apenas a linha de status do antigo.
- Atualize este índice e os documentos canônicos afetados na mesma mudança.

## Modelo

```markdown
# ADR-NNNN: Título

- Status: Proposto | Aceito | Substituído pelo ADR-NNNN
- Data: AAAA-MM-DD
- Origem: de onde veio a decisão (conversa, issue, pesquisa)

## Contexto
## Decisão
## Consequências
## Alternativas consideradas
```

## Índice

| ADR | Decisão | Status |
| --- | --- | --- |
| [0001](0001-no-vernaculo-infrastructure-at-runtime.md) | Nenhuma infraestrutura do Vernáculo em runtime (self-hosted, custo zero para o mantenedor) | Aceito |
| [0002](0002-provider-agnostic-specification-and-core.md) | Especificação e core independentes de provedor; pipeline em camadas | Aceito |
| [0003](0003-yaml-markdown-json-schema-format.md) | YAML + Markdown com JSON Schema normativo; suíte de conformidade | Aceito |
| [0004](0004-typescript-reference-implementation.md) | TypeScript como primeira implementação de referência (não Rust, por ora) | Aceito |
| [0005](0005-openai-responses-first-adapter.md) | OpenAI Responses API como primeiro adapter oficial, mantido fino | Aceito |
| [0006](0006-mcp-future-adapter-not-canonical.md) | MCP é um adapter futuro, não a representação canônica | Aceito |
| [0007](0007-agent-skills-early-export-target.md) | Agent Skills é um target de exportação inicial, não a representação canônica | Aceito |
| [0008](0008-git-and-filesystem-no-database.md) | Git e sistema de arquivos em vez de banco de dados, registry ou marketplace | Aceito |
| [0009](0009-regional-layer-separate-from-agent-role.md) | A camada regional é separada do papel e das regras de negócio do agente | Aceito |
| [0010](0010-observable-sociolinguistic-features-only.md) | Modelar apenas traços sociolinguísticos observáveis; nenhuma personalidade regional | Aceito |
| [0011](0011-deterministic-llm-free-compilation.md) | Compilação determinística, sem LLM | Aceito |
| [0012](0012-apache-2-0-code-license.md) | Apache-2.0 para o código; material linguístico de terceiros licenciado à parte | Aceito |
| [0013](0013-explicit-inheritance.md) | Herança explícita com `extends`; ids nunca implicam herança | Aceito |
| [0014](0014-apache-2-0-persona-content.md) | Apache-2.0 também para o conteúdo das personas: uma única licença aberta para todo o repositório | Aceito |
| [0015](0015-human-review-recommended-not-mandatory.md) | Revisão humana sempre recomendada, nunca obrigatória | Aceito |
| [0016](0016-documentation-in-portuguese.md) | Documentação e metadados do projeto em português | Aceito |
