# ADR-0003: YAML + Markdown with a normative JSON Schema

- Status: Accepted
- Date: 2026-09-29
- Origin: `ideia.txt` ("o formato das personas não pertence ao TypeScript nem a nenhum provedor. Ele será composto de YAML + Markdown + JSON Schema"); bootstrap

## Context

Personas must be readable and reviewable by linguists and speakers (not only
programmers), diffable in Git, and implementable by third parties in Python,
Rust, Go, Java, C# or anything else. The meaning of a persona must not depend on
reading TypeScript code.

## Decision

- Persona documents are **YAML 1.2 files restricted to the JSON data model** (no `.nan`, `.inf`, binary or custom tags; duplicate keys are errors).
- Long-form human text (documentation, research notes, generated skills) is **Markdown**.
- The structural contract is a **hand-written JSON Schema (draft 2020-12)** at `schemas/<version>/persona.schema.json`. It is normative.
- Semantic rules that JSON Schema cannot express (language consistency, unique keys, source references, inheritance) are specified in prose in [persona-format.md](../specification/persona-format.md) with stable issue codes.
- A **language-neutral conformance suite** (`schemas/conformance/`) contains valid documents, structurally invalid documents, semantically invalid documents (with the expected issue code) and multi-file resolution cases (with the expected flattened output). Any implementation can run it.
- The TypeScript implementation mirrors the JSON Schema with Zod 4 for typed runtime validation. Drift is caught by a differential test (Ajv on the JSON Schema vs Zod on every conformance file) and a structural parity test (the JSON Schema generated from Zod must carry the same constraints as the canonical one).
- The first published version is `vernaculo.dev/v1alpha1`: alpha, may change incompatibly. `vernaculo.dev` is a namespace identifier and is never fetched.

## Consequences

- Changing the format means changing, in the same change: the JSON Schema, the Zod mirror, conformance fixtures, the specification docs and, if needed, the `apiVersion`.
- Strings that YAML 1.1 parsers misread (dates, `yes`/`no`) are quoted when Vernáculo writes YAML, so files stay portable across YAML libraries.
- `SKILL.md`, MCP resources or provider prompts are *outputs*, never the source of truth ([ADR-0006](0006-mcp-future-adapter-not-canonical.md), [ADR-0007](0007-agent-skills-early-export-target.md)).

## Alternatives considered

- **Zod as the source, JSON Schema generated from it** — rejected: it would make TypeScript the de facto definition of the format. Zod is kept as a checked mirror.
- **`SKILL.md` or Markdown-only personas** — rejected: not machine-validatable, hard to compose and to gate by intensity.
- **JSON files** — rejected for authoring ergonomics (comments, multi-line text); YAML maps 1:1 to JSON anyway.
