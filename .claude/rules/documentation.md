# Regras de documentação

Nenhuma decisão importante pode sobreviver só na conversa. Código, especificação,
evals e documentação mudam na mesma tarefa. A documentação é escrita em português
brasileiro (ADR-0016).

## Qual documento atualizar

| Mudança | Atualize |
| --- | --- |
| Decisão arquitetural ou invariante novo/alterado | ADR novo em `docs/decisions/` (substitua, não reescreva, ADRs aceitos) + índice em `docs/decisions/README.md` + a página de arquitetura afetada |
| Formato de persona, regra semântica, código de issue, regra de id | `docs/specification/*` + `schemas/` + fixtures de conformidade (veja `.claude/rules/schema.md`) |
| Semântica de intensidade ou redação/faixas do compilador | `docs/specification/regional-intensity.md`, `docs/architecture/compilation.md`, golden files |
| Herança / comportamento de merge | `docs/specification/inheritance-and-composition.md` + caso de conformidade de resolução |
| API pública de um pacote | `docs/architecture/packages.md` (+ changeset) |
| Comando/opção/código de saída da CLI | `docs/reference/cli.md` |
| Adapter ou target novo | `docs/architecture/provider-adapters.md`, `compilation.md` (tabela de targets), ADR se for estrutural |
| Distribuição, comportamento de `add`/`eject` | `docs/architecture/distribution.md` |
| Estrutura de packs ou metodologia | `docs/linguistic/*`, `docs/development/contributing-personas.md` |
| Método ou dimensão de eval | `docs/evals/*` |
| Conclusão de pesquisa, fonte nova, achado sobre licença | `docs/linguistic/sources.md` (+ `docs/reference/external-facts.md` se mudar com o tempo) |
| Mudança de dependência/stack/ferramentas | `docs/development/stack.md` |
| Limitação importante descoberta | a página relevante + `docs/roadmap/open-questions.md` se ficar sem solução |
| Mudança de status de qualquer item planejado | `docs/roadmap/roadmap.md` (+ tabelas de `docs/product/scope.md` e `README.md`) |
| Questão em aberto resolvida | remova de `docs/roadmap/open-questions.md`; registre a resposta (ADR ou doc) |

Se nenhum documento servir, crie um na seção certa de `docs/` e ligue-o em
`docs/README.md`. Não despeje conhecimento duradouro em notas de progresso ou no chat.

## Regras de escrita

- Descreva o estado atual; o Git guarda o histórico. Marque o status com honestidade (feito / planejado / ideia / em aberto).
- Nunca apresente trabalho planejado como existente, nem um pack como validado sem evidência.
- Fatos externos levam URL da fonte e data de verificação.
- Um assunto por página; faça links em vez de duplicar. Mantenha o `CLAUDE.md` curto.
- `docs/reference/idea-assimilation.md` é um retrato do bootstrap: só corrija erros de mapeamento nele.
