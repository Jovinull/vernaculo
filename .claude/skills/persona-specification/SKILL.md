---
name: persona-specification
description: Work on the Vernáculo Persona Specification and its reference implementation — the JSON Schema, Zod mirror, conformance suite, parser, semantic rules, issue codes, inheritance/flattening, canonical form, intensity selection (IR) and serialization. Use when adding or changing persona fields, validation rules, extends/merge semantics, intensity behavior, ids, apiVersion, or @vernaculo/schema / @vernaculo/core internals.
---

# Persona specification work

## Read first

- `docs/specification/overview.md` — documents, ids, persona roots, processing model, conformance, issue codes
- `docs/specification/persona-format.md` — fields, semantic rules, format history
- `docs/specification/inheritance-and-composition.md` — flattening rules
- `docs/specification/regional-intensity.md` — selection rules
- `docs/specification/provenance.md` — evidence, sources, maturity
- ADR-0003 (format), ADR-0013 (explicit inheritance), ADR-0010 (no personality fields)

## Where things live

| Concern | File |
| --- | --- |
| Normative structure | `schemas/v1alpha1/persona.schema.json` |
| TS types / Zod mirror | `packages/schema/src/types.ts`, `packages/schema/src/zod.ts` |
| Parsing (JSON data model, duplicate keys) | `packages/core/src/parse.ts` |
| Document-level rules | `packages/core/src/validate.ts` |
| Keyed lists (keys, used vs discouraged) | `packages/core/src/lists.ts` |
| Lineage, flattening, resolved-level rules | `packages/core/src/resolve.ts` |
| Canonical key order (from the JSON Schema) | `packages/core/src/canonical.ts` |
| Intensity/evidence selection | `packages/core/src/ir.ts` |
| Issue codes | `packages/core/src/errors.ts` |
| Conformance suite | `schemas/conformance/v1alpha1/{valid,invalid-schema,invalid-semantic,resolution}` |

## Procedure for a format change

1. Decide whether it is compatible. Alpha may break, but breaking changes need a new `apiVersion` directory and a note in the docs; structural model changes need an ADR.
2. Write conformance fixtures first: a `valid/` case and an `invalid-*` case (`# expect: <code>` for semantic ones); a `resolution/` case with the exact expected flattened document if merging is affected (key order is part of the contract).
3. Update the JSON Schema. Keep objects closed (`additionalProperties: false`). Quote-safe patterns; limits identical in Zod.
4. Mirror in `types.ts` and `zod.ts` (explicit types; `z.strictObject`; same regex sources and limits).
5. Implement semantic rules in core with a stable issue code; add the code to `IssueCode`, `docs/specification/overview.md` and `persona-format.md`.
6. If rendering is affected, update the compiler, golden files and `docs/architecture/compilation.md`.
7. Run `pnpm check`. The parity test (`packages/schema/test/schema-parity.test.ts`) must pass.
8. Update docs (`documentation-maintenance` skill).

## Invariants to protect

- No field may express personality, attitudes or other non-linguistic traits.
- Ids never imply inheritance; only `extends` does. Ids stay path-safe (no `.`/`\`).
- Hypotheses are never rendered; synthetic evidence only with effective maturity `fixture`.
- Discouraged forms and anti-patterns are rendered at every intensity; intensity 0 is neutral.
- Resolution is deterministic and byte-stable (canonical order, no Map/Set iteration leaking into output order).
- `apiVersion`'s `vernaculo.dev` is never fetched.
