---
name: project-context
description: Recupera o contexto de produto, arquitetura e decisões do Vernáculo antes de uma mudança relevante — quais docs e ADRs ler para cada pergunta, sem carregar toda a documentação nem reler ideia.txt. Use ao começar a trabalhar em uma área desconhecida, quando um pedido envolver arquitetura, invariantes, formato de persona, adapters, distribuição ou roadmap, ou quando não souber se algo já foi decidido.
---

# Contexto do projeto

`docs/` é a fonte da verdade. Carregue só o que a tarefa precisa.

## 1. Orientação (sempre, ~2 minutos)

- `docs/README.md` — o mapa.
- `docs/product/principles.md` — os invariantes, cada um ligado ao seu ADR.
- `docs/roadmap/roadmap.md` — o que existe vs. o que está planejado. Nunca assuma que um item planejado já existe.

## 2. Escolha as páginas para a pergunta

| Pergunta | Leia |
| --- | --- |
| O que é o produto / o que está fora de escopo? | `docs/product/vision.md`, `docs/product/scope.md` |
| Como os pacotes se encaixam, quem pode importar quem? | `docs/architecture/overview.md`, `docs/architecture/packages.md` |
| Como uma persona vira instruções? | `docs/architecture/compilation.md` |
| Especificidades de provedores (OpenAI, futuros Claude/Gemini/local/MCP) | `docs/architecture/provider-adapters.md`, `docs/reference/external-facts.md` |
| Instalação, `add`, `eject`, sem lock-in | `docs/architecture/distribution.md`, `docs/reference/cli.md` |
| Restrições de custo / rede / hospedagem | `docs/architecture/zero-infrastructure.md`, ADR-0001 |
| Campos e regras de persona | `docs/specification/persona-format.md`, `overview.md` |
| Herança / merge | `docs/specification/inheritance-and-composition.md` |
| Intensidade | `docs/specification/regional-intensity.md` |
| Evidência, fontes, maturidade, licenças | `docs/specification/provenance.md`, `docs/linguistic/sources.md` |
| Conteúdo regional, riscos de caricatura | `docs/linguistic/anti-caricature.md`, `methodology.md`, `regional-packs.md` |
| Evals, revisão humana | `docs/evals/*`, `docs/linguistic/human-review.md` |
| Ferramentas, versões, testes | `docs/development/stack.md`, `testing.md` |
| Idioma de docs, código e mensagens | `docs/decisions/0016-documentation-in-portuguese.md` |
| X já foi decidido? | índice em `docs/decisions/README.md`, depois o ADR; `docs/roadmap/open-questions.md` |
| De onde veio uma ideia? | `docs/reference/idea-assimilation.md` (liga faixas de linhas de `ideia.txt` aos docs) |

## 3. Confirme no código

A documentação descreve intenção e contratos; verifique o comportamento no código
antes de confiar nele (`packages/*/src`, testes em `packages/*/test`). Se docs e
código discordarem, trate como bug: corrija o que estiver errado na mesma tarefa e
diga isso.

## 4. Sobre `ideia.txt`

É só um registro histórico. Leia uma faixa específica de linhas (tirada da tabela de
assimilação) apenas ao pesquisar a origem ou a intenção de uma decisão. Versões,
exemplos de API e nomes de modelos dele não têm autoridade.

## 5. Antes de agir

Diga quais ADRs/invariantes a mudança toca. Se a tarefa conflitar com um ADR aceito,
proponha um ADR substituto em vez de contorná-lo. Depois carregue a skill
específica: `persona-specification`, `linguistic-research`, `evals`,
`adapter-development`, `documentation-maintenance`, `release-quality`.
