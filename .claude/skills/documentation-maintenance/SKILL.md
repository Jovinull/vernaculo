---
name: documentation-maintenance
description: Mantém a documentação, os ADRs, o roadmap e as questões em aberto do Vernáculo sincronizados com uma mudança, na mesma tarefa. Use sempre que uma mudança alterar decisão, invariante, API pública, formato de persona, contrato da CLI, estrutura de packs, metodologia, conjunto de adapters, compatibilidade ou status do roadmap, quando uma limitação ou resultado de pesquisa for descoberto, ou antes de terminar qualquer tarefa não trivial.
---

# Manutenção da documentação

Regra: **nenhuma decisão importante sobrevive só na conversa.** A documentação
descreve o estado atual; o Git guarda o histórico. Escreva em português brasileiro
(ADR-0016).

## Procedimento

1. **Liste o que mudou** em comportamento, contratos, decisões ou status (não só os arquivos tocados).
2. **Associe cada item à sua página canônica** usando a tabela de `.claude/rules/documentation.md`. Os casos mais comuns:
   - API pública → `docs/architecture/packages.md`
   - CLI → `docs/reference/cli.md`
   - formato/semântica → `docs/specification/*` (+ schema/conformidade, veja a skill `persona-specification`)
   - adapters/targets → `docs/architecture/provider-adapters.md`, `compilation.md`
   - status → `docs/roadmap/roadmap.md`, `docs/product/scope.md`, tabelas de status do `README.md`
3. **Decida se é preciso um ADR** (veja `docs/decisions/README.md`): invariante novo/alterado, modelo ou versionamento do formato, novo tipo de target ou canal de distribuição, licenciamento, regras centrais da metodologia, reversão de um ADR. Se sim:
   - copie o modelo de `docs/decisions/README.md`, use o próximo número e o status `Aceito` (ou `Proposto`, se depender do mantenedor);
   - nunca reescreva a decisão de um ADR aceito: substitua-o e mude só a linha de status do antigo;
   - acrescente-o à tabela do índice.
4. **Questões em aberto**: acrescente as novas em `docs/roadmap/open-questions.md` (próximo `OQ-NN`); quando uma for resolvida, remova-a e registre a resposta em um ADR ou doc.
5. **Fatos externos**: tudo que muda com o tempo (comportamento de API, descontinuações, versões, licenças) vai para `docs/reference/external-facts.md`, com URL e data de verificação.
6. **Página nova?** Só se nenhuma existente servir; coloque-a na seção certa e ligue-a em `docs/README.md`.
7. **Confira a honestidade**: nada planejado descrito como feito; nenhum pack ou saída descrito como validado, natural ou representativo sem evidência; maturidade fixture/draft visível.
8. **Confira os links** que você acrescentou: precisam apontar para arquivos (e âncoras) que existem.

## O que não fazer

- Não escreva logs de progresso nem notas de sessão em `docs/`.
- Não repita a mesma explicação em várias páginas; faça link para a canônica.
- Não aumente o `CLAUDE.md` com detalhes — ele fica abaixo de 200 linhas.
- Não edite `ideia.txt`, e só corrija erros de mapeamento em `docs/reference/idea-assimilation.md`.
