# CLI reference (`vernaculo`)

The CLI runs entirely locally. It never contacts a Vernáculo service (there is
none). Exit codes: `0` success, `1` usage or validation error, `2` internal error.

Common options:

- `--root <dir>` — persona root to search; repeatable; first match wins. Default: `personas` (relative to the working directory).
- A `<persona>` argument is a persona id (`pt-BR/ba/salvador`) **or** a path ending in `.yaml`/`.yml` (a project persona whose `extends` is resolved through the roots).
- `--intensity <0..1>` — rejected when out of range or not a number.

Maturity warnings (`FIXTURE`, `DRAFT`) are printed to stderr by `compile`,
`export` and `eject`.

## Implemented

| Command | Purpose |
| --- | --- |
| `vernaculo list [--root ...] [--json]` | list personas in the roots (shadowed duplicates are marked) |
| `vernaculo inspect <persona> [--intensity x] [--json]` | lineage, maturity, license, default intensity, what a given intensity renders and omits; `--json` prints the flattened persona and lineage |
| `vernaculo validate [personas...]` | validate the given personas, or every persona in the roots; exit 1 on any failure |
| `vernaculo compile <persona> [--target markdown\|openai] [--intensity x] [--agent file] [--out file]` | print instructions; `openai` prints `{ instructions, metadata }` JSON and can compose agent instructions from `--agent` |
| `vernaculo export <persona> --target skill [--intensity x] [--out dir] [--force]` | write an Agent Skill directory `<out>/vernaculo-<id-slug>/`; refuses to overwrite a non-empty directory without `--force` |
| `vernaculo eject <persona> [--intensity x] [--out dir] [--force]` | write `persona.yaml` (flattened, self-contained), `instructions.md` and `README.md` to `vernaculo/<id>/` or `--out` |

## Planned (contract draft)

| Command | Intended behavior | Depends on |
| --- | --- | --- |
| `vernaculo search <query>` | search the catalog (e.g. `search brasil` → `pt-BR/...` ids) | catalog distribution ([OQ-04](../roadmap/open-questions.md)) |
| `vernaculo add <persona>` | copy a pack's files into the project (e.g. `vernaculo/personas/<id>/`); works with `npx vernaculo add ...`; no runtime dependency afterwards | OQ-04 |
| `vernaculo update [persona]` | refresh added packs to newer versions, showing the diff | OQ-04 |
| `vernaculo export --target mcp` / other targets | additional export targets | future adapters |

## Changes from the conversation's sketches

| Sketch | Now | Why |
| --- | --- | --- |
| `personabr export ...` | `vernaculo export ...` | project renamed Vernáculo |
| `--target openai-skill` / `claude-skill` | `--target skill` | one open Agent Skills standard; vendor variants only if they diverge |
| `--target system-prompt` | `vernaculo compile` (Markdown) | printing instructions is compilation, not a file export |
| `vernaculo install <persona>` | `vernaculo add` (planned) | the conversation's v0.1 command list settled on `add` |
| `vernaculo compile ... --provider openai` | `vernaculo compile ... --target openai` | one option name (`--target`) across compile and export |
