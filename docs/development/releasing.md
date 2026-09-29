# Releasing

Nothing has been published yet. All packages are at `0.0.0`.

## Rules

- Publishing to npm, creating GitHub Releases, pushing tags and any other outward action is a **manual maintainer decision**. Automation and AI assistants never publish without an explicit instruction for that specific release.
- All published packages (`vernaculo`, `@vernaculo/*`) share one version (Changesets `fixed` group). Private workspace packages (examples) are never versioned or published.
- The persona **specification** version (`apiVersion`) and **pack** versions (`metadata.version`) are independent of package versions.

## Flow

1. Every change to public behavior includes a changeset: `pnpm changeset`.
2. Before a release: `pnpm check` must pass; docs updated; `docs/roadmap/roadmap.md` status updated; the `release-quality` project skill checklist completed.
3. `pnpm changeset version` to apply versions and changelogs; review the diff.
4. `pnpm build`, then publish manually (e.g. `pnpm changeset publish`) — maintainer only.
5. Optionally attach build artifacts or pack archives to a GitHub Release.

## Pre-release gates for the first public release

- npm scope `@vernaculo` and package name `vernaculo` claimed by the maintainer (both were unregistered on 2026-09-29 — see open questions).
- Repository URL decided and added to every `package.json` (`repository`, `homepage`, `bugs`).
- Content license for packs decided.
- At least one real pack, or the release clearly labeled as tooling-only with fixtures.
