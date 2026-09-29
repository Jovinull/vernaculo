# Fixtures

**Synthetic data. Not linguistic content.**

`personas/` is a persona root with invented personas used by tests, examples and
CI (`pnpm validate:data`):

| Id | Role |
| --- | --- |
| `pt-BR/x-fixture` | base persona |
| `pt-BR/x-fixture/cidade-a` | locality A, extends the base, adds features and examples |
| `pt-BR/x-fixture/cidade-b` | locality B, extends the base, discourages a base form |

Every "regional" form here (`termo-sintético-a`, `marcador-sintético-base`, ...) is
a placeholder. Every persona is `maturity: fixture` and every feature is
`evidence: synthetic`, which the specification only allows in fixtures. The
`x-` segment marks the ids as private/synthetic.

Do not copy these files into a real pack, and do not add real regional claims
here: tests must never depend on unreviewed linguistic content.
