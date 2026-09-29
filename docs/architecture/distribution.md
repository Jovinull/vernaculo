# Distribution and zero lock-in

Distribution channels are conveniences. None of them is needed at runtime
([ADR-0001](../decisions/0001-no-vernaculo-infrastructure-at-runtime.md),
[ADR-0008](../decisions/0008-git-and-filesystem-no-database.md)).

```text
                  GitHub (source of truth: specification + packs + code)
                         │
          ┌──────────────┼───────────────────┐
     git clone     GitHub Releases          npm            (plain copy / curl also works)
          └──────────────┼───────────────────┘
                         ▼
                 the user's project ──► the user's provider or local model
```

## Three consumption modes

| Mode | How | Runtime dependency on Vernáculo |
| --- | --- | --- |
| **Pack** | copy a persona (or an ejected, flattened copy) into the project | none |
| **Skill** | `vernaculo export <persona> --target skill`, copy the directory into the agent | none |
| **SDK** | `@vernaculo/core` + `@vernaculo/compiler` + adapter installed from npm | only packages the user installed and controls |

The conversation's requirement is that consuming a persona should not require
Node, Python or any library. Today the Pack and Skill modes meet it once the
files exist, but *producing* them (`export`, `eject`, `compile`) needs the
Node CLI. **Planned:** releases of the persona library will ship pre-built
artifacts per pack (an exported skill and compiled `instructions.md` at the
default intensity), so consumers can download plain files and never run
Vernáculo tooling.

## Persona roots

A persona root is a directory laid out as `<root>/<persona id>/persona.yaml`:

```text
personas/
└── pt-BR/
    └── ba/
        └── salvador/
            └── persona.yaml
```

Tools accept several roots (`--root a --root b`); the first root containing an id
wins, which lets a project shadow a library persona locally. A project may also
keep standalone files (`acme-salvador.yaml`) whose `extends` chain is resolved
through the roots.

In the conversation, a pack directory also held `SKILL.md`, `examples.yaml`,
`evals.yaml`, `SOURCES.md`, `knowledge/*.yaml`... In v1alpha1 a pack's source is a
single `persona.yaml`; `SKILL.md` is generated; splitting a pack into several
files and bundling per-pack evals are [open questions](../roadmap/open-questions.md).

## `eject` — leaving Vernáculo behind

```bash
vernaculo eject pt-BR/ba/salvador --intensity 0.3
# → vernaculo/pt-BR/ba/salvador/{persona.yaml, instructions.md, README.md}
```

- `persona.yaml` is **flattened**: the whole lineage resolved, `extends` removed, the lineage (ids, versions, maturity, licenses) recorded in a header comment. It is a valid standalone persona.
- `instructions.md` is the compiled layer; the application can read it as plain text with no Vernáculo package installed.
- Re-compiling the ejected `persona.yaml` produces byte-identical instructions (tested).
- The ejected `README.md` lists the content licenses of the lineage (library packs are Apache-2.0: keep the notice and mark changes if you redistribute the files) and, for drafts, recommends human review.
- The CLI does not edit the user's `package.json`; removing `@vernaculo/*` dependencies after ejecting is the user's decision.

## Planned: `add`, `search`, `update`

The conversation described `vernaculo search brasil`, `vernaculo add
pt-BR/ba/salvador` (also `npx vernaculo add ...`) copying files into the project,
and `vernaculo update` / `pnpm update @vernaculo/personas`. These depend on how
the public catalog is delivered (bundled in the CLI, an `@vernaculo/personas` npm
package, GitHub Releases tarballs, or Git) — an [open question](../roadmap/open-questions.md).
Whatever the choice: files are copied into the project, and nothing is fetched at
application runtime.

## Publication

npm and GitHub Releases publication are manual maintainer actions
([releasing.md](../development/releasing.md)); nothing is published automatically.
A static documentation/catalog site (e.g. Astro + Starlight on GitHub Pages or
Cloudflare Pages) is an idea; it would never be on the runtime path.
