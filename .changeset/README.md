# Changesets

Every change to a published package's public behavior needs a changeset:

```bash
pnpm changeset
```

All published packages (`vernaculo` and `@vernaculo/*`) share one version
(`fixed` group). Publishing is a manual, maintainer-only action and is never run
by automation or by an AI assistant without explicit instruction. See
[`docs/development/releasing.md`](../docs/development/releasing.md).
