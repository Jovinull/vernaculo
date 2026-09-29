# Changesets

Toda mudança no comportamento público de um pacote publicado precisa de um changeset:

```bash
pnpm changeset
```

Todos os pacotes publicados (`vernaculo` e `@vernaculo/*`) compartilham uma única
versão (grupo `fixed`). Publicar é uma ação manual, exclusiva do mantenedor, e nunca
é executada por automação ou por assistente de IA sem instrução explícita. Veja
[`docs/development/releasing.md`](../docs/development/releasing.md).
