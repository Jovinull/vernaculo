# Documentação do Vernáculo

Este diretório é a **fonte da verdade** do projeto: produto, arquitetura,
especificação, metodologia linguística, evals, processo de desenvolvimento e
decisões. Código, especificação, evals e documentação evoluem juntos — quando um
deles muda uma decisão, um comportamento, um formato ou um contrato, o documento
correspondente muda no mesmo commit. O Git guarda o histórico; estas páginas
descrevem o estado atual.

`ideia.txt` (raiz do repositório) é a conversa de concepção, mantida como registro
histórico. O conteúdo dele foi assimilado aqui; veja
[reference/idea-assimilation.md](reference/idea-assimilation.md).

## Por onde começar

| Se você quer... | Leia |
| --- | --- |
| entender o que o Vernáculo é e o que não é | [product/vision.md](product/vision.md) |
| conhecer as regras que nunca são quebradas | [product/principles.md](product/principles.md) |
| ver como as peças se encaixam | [architecture/overview.md](architecture/overview.md) |
| escrever ou ler um arquivo de persona | [specification/persona-format.md](specification/persona-format.md) |
| contribuir com um pack regional | [development/contributing-personas.md](development/contributing-personas.md) |
| saber por que algo foi decidido | [decisions/](decisions/README.md) |
| saber o que está feito e o que vem depois | [roadmap/roadmap.md](roadmap/roadmap.md), [roadmap/open-questions.md](roadmap/open-questions.md) |

## Mapa

**Produto** — [visão](product/vision.md) · [princípios](product/principles.md) ·
[casos de uso](product/use-cases.md) · [escopo](product/scope.md)

**Arquitetura** — [visão geral](architecture/overview.md) ·
[pacotes](architecture/packages.md) · [compilação (IR, compilador, targets)](architecture/compilation.md) ·
[adapters de provedores](architecture/provider-adapters.md) ·
[distribuição e eject](architecture/distribution.md) ·
[infraestrutura zero](architecture/zero-infrastructure.md) ·
[ciclo de vida de uma persona](architecture/persona-lifecycle.md)

**Especificação** (`vernaculo.dev/v1alpha1`) — [visão geral, ids, conformidade](specification/overview.md) ·
[formato de persona e regras semânticas](specification/persona-format.md) ·
[herança e composição](specification/inheritance-and-composition.md) ·
[intensidade regional](specification/regional-intensity.md) ·
[proveniência, evidência, maturidade](specification/provenance.md)

**Linguística** — [metodologia](linguistic/methodology.md) ·
[packs regionais](linguistic/regional-packs.md) ·
[política anti-caricatura](linguistic/anti-caricature.md) ·
[revisão humana](linguistic/human-review.md) · [fontes de pesquisa](linguistic/sources.md)

**Evals** — [estratégia](evals/strategy.md) · [dimensões](evals/dimensions.md)
(naturalidade, fidelidade regional, preservação da tarefa e das regras, excesso,
caricatura, vazamento de estereótipos, regionalismos inventados, intensidade) ·
[entre provedores](evals/cross-provider.md)

**Desenvolvimento** — [stack](development/stack.md) ·
[estrutura do repositório](development/repository-structure.md) ·
[testes](development/testing.md) ·
[contribuindo com personas](development/contributing-personas.md) ·
[releases](development/releasing.md)

**Decisões** — [índice de ADRs](decisions/README.md)

**Roadmap** — [roadmap](roadmap/roadmap.md) · [questões em aberto](roadmap/open-questions.md)

**Referência** — [CLI](reference/cli.md) · [glossário](reference/glossary.md) ·
[fatos externos (datados)](reference/external-facts.md) ·
[assimilação de ideia.txt](reference/idea-assimilation.md)

## Convenções

- A documentação é escrita em português brasileiro ([ADR-0016](decisions/0016-documentation-in-portuguese.md)); o material voltado a revisores de uma variedade usa o idioma dela. Código, mensagens da CLI e o texto lido pelos modelos ficam em inglês.
- Nomes de arquivos e diretórios ficam como estão, para manter os links estáveis.
- Um assunto por página; faça links em vez de duplicar. As dimensões de eval compartilham uma única página, para evitar fragmentação.
- Marque o status com honestidade: *feito*, *planejado*, *ideia*, *questão em aberto*. Nunca apresente trabalho planejado como existente, nem um pack como validado sem evidência.
- Fatos externos que mudam com o tempo vão para [reference/external-facts.md](reference/external-facts.md), com data de verificação.
- Decisões estruturais ganham um ADR ([decisions/README.md](decisions/README.md)).
