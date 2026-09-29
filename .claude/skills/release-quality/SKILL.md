---
name: release-quality
description: Checklist para decidir se uma mudança do Vernáculo está pronta e publicável — lint, typecheck, testes, build, validação de personas/schemas, revisão dos golden files, sincronia de docs e ADRs, changesets, versionamento, convenção de commits e honestidade das afirmações. Use antes de dar uma tarefa por concluída, antes de abrir ou aprovar um PR e antes de qualquer bump de versão ou preparação de release.
---

# Checklist de qualidade para release

Rode a partir da raiz do repositório.

## 1. Portões automáticos (todos precisam passar)

```bash
pnpm check        # lint do biome, typecheck com tsc, vitest, build com tsdown, vernaculo validate em fixtures/personas/examples
```

Se algo falhar, corrija a causa; não enfraqueça testes, não acrescente ignores de
lint nem afrouxe o teste de arquitetura para ficar verde. Reporte falhas reais com a
saída delas.

## 2. Verificações específicas da mudança

- [ ] **Golden files** (`packages/compiler/test/__golden__/`): todo diff é intencional e explicado.
- [ ] **Especificação**: JSON Schema, espelho Zod, fixtures de conformidade e docs da especificação mudaram juntos (veja `.claude/rules/schema.md`).
- [ ] **Invariantes**: sem rede, sem SDKs de provedores, direção de dependências, determinismo, sem mutação — cobertos por testes, não só por revisão.
- [ ] **CLI**: comportamento, texto de ajuda e códigos de saída batem com `docs/reference/cli.md`.
- [ ] **Dependências**: as novas foram conferidas quanto a versão atual, manutenção, engines e licença; lockfile regenerado respeitando as políticas do pnpm (sem `minimumReleaseAgeExclude` à toa).
- [ ] **Windows/Linux**: caminhos com `node:path`, ids com `/`, finais de linha LF.

## 3. Documentação (use `documentation-maintenance`)

- [ ] Docs canônicos atualizados para toda decisão/comportamento/contrato alterado, em português.
- [ ] ADR acrescentado ou substituído para decisões estruturais; índice atualizado.
- [ ] Tabelas de status do roadmap, do escopo e do README corretas; questões em aberto atualizadas.

## 4. Honestidade das afirmações

- [ ] Nada planejado apresentado como feito.
- [ ] Nenhum pack/saída chamado de validado, natural, representativo, livre de estereótipos ou pronto para produção sem revisão humana e evidência de evals.
- [ ] Maturidade fixture/draft visível onde for relevante; revisão humana recomendada para rascunhos.

## 5. Versionamento e commits

- [ ] `pnpm changeset` acrescentado para mudanças de comportamento público (todos os pacotes publicados compartilham uma versão).
- [ ] Versões dos packs (`metadata.version`) incrementadas conforme `docs/architecture/persona-lifecycle.md` quando o conteúdo de um pack mudar.
- [ ] Mudanças na especificação: política de `apiVersion` respeitada.
- [ ] Commits em Conventional Commits, em português, só com a linha de assunto e sem `Co-Authored-By`, separados por assunto.

## 6. Ações externas

Publicar no npm, fazer push, criar tags e GitHub Releases: **só com instrução
explícita para aquela ação.** Sem ela, pare depois da verificação local e diga o que
está pronto. Veja `docs/development/releasing.md`.
