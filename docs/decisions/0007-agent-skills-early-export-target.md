# ADR-0007: Agent Skills is an early export target, not the canonical representation

- Status: Accepted
- Date: 2026-09-29
- Origin: `ideia.txt` ("Skills fazem bem mais sentido como formato de exportação"; later: "Agent Skills deve entrar já no MVP — isso eu mudaria em relação ao que falamos anteriormente")

## Context

The Agent Skills open standard defines a skill as a directory with a `SKILL.md`
(YAML frontmatter + Markdown) and optional `scripts/`, `references/` and
`assets/`. Many agents load skills. A persona exported as a skill can be dropped
into an agent without installing any Vernáculo package. The conversation first
placed skills among later adapters, then explicitly moved the skill exporter into
the first release.

## Decision

- The **Agent Skill exporter is part of the first release** (`@vernaculo/skills`, `vernaculo export <persona> --target skill`).
- `SKILL.md` is an **output**, never the source of truth. Persona packs are authored as `persona.yaml` ([ADR-0003](0003-yaml-markdown-json-schema-format.md)); skills are regenerated from them.
- Exported skills follow the Agent Skills specification (verified 2026-09-29): `name` ≤ 64 chars of `a-z0-9-`, matching the directory; `description` ≤ 1024 chars; `metadata` as string→string map; `SKILL.md` under 500 lines; reference files one level deep.
- In v1alpha1 the intensity is **baked in at export time** (recorded in `metadata.vernaculo-intensity`). Letting the host agent pick the intensity at runtime is an [open question](../roadmap/open-questions.md).

## Consequences

- A skill contains only features selected for its intensity (the IR); hypotheses and above-intensity features never leak into it.
- Output layout: `SKILL.md` plus `references/{vocabulary,discourse,pragmatics,examples,sources}.md` (empty references are omitted; `sources.md` is always present).

## Alternatives considered

- **Author packs directly as `SKILL.md`** — rejected: not validatable, cannot be gated by intensity, ties the format to one ecosystem.
- **Postpone skills with MCP** — rejected by the later decision in the conversation: skills are the cheapest zero-install distribution path.
