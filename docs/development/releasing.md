# Releases

Nada foi publicado ainda. Todos os pacotes estão em `0.0.0`.

## Regras

- Publicar no npm, criar GitHub Releases, enviar tags e qualquer outra ação externa é **decisão manual do mantenedor**. Automações e assistentes de IA nunca publicam sem uma instrução explícita para aquele release específico.
- Todos os pacotes publicados (`vernaculo`, `@vernaculo/*`) compartilham uma única versão (grupo `fixed` do Changesets). Pacotes privados do workspace (exemplos) nunca são versionados nem publicados.
- A versão da **especificação** de persona (`apiVersion`) e as versões dos **packs** (`metadata.version`) são independentes das versões dos pacotes.
- Commits seguem Conventional Commits em português, só com a linha de assunto (veja o [guia de contribuição](../../CONTRIBUTING.md)).

## Fluxo

1. Toda mudança de comportamento público inclui um changeset: `pnpm changeset`.
2. Antes de um release: `pnpm check` precisa passar; a documentação precisa estar atualizada; o status em `docs/roadmap/roadmap.md` precisa estar atualizado; o checklist da skill de projeto `release-quality` precisa estar completo.
3. `pnpm changeset version` para aplicar versões e changelogs; revise o diff.
4. `pnpm build` e depois publique manualmente (por exemplo, `pnpm changeset publish`) — só o mantenedor.
5. Opcionalmente, anexe artefatos de build ou arquivos de packs a um GitHub Release.

## Pré-requisitos do primeiro release público

- Escopo `@vernaculo` e nome de pacote `vernaculo` registrados pelo mantenedor no npm (os dois estavam livres em 2026-09-29 — veja as questões em aberto).
- URL do repositório (https://github.com/Jovinull/vernaculo) adicionada a todo `package.json` (`repository`, `homepage`, `bugs`).
- Pelo menos um pack real, ou o release claramente identificado como só de ferramentas, com fixtures.
