---
paths:
  - "schemas/**"
  - "packages/schema/**"
---

# Specification change rules

The JSON Schema in `schemas/<version>/` is normative; the Zod mirror follows it.

A format change is complete only when, in the same change:

1. `schemas/<version>/persona.schema.json` is updated (the source of truth);
2. `packages/schema/src/types.ts` and `packages/schema/src/zod.ts` mirror it byte-for-byte in patterns and limits (the parity test compares every node);
3. conformance fixtures cover it: at least one `valid/` case and one `invalid-schema/` or `invalid-semantic/` case (`# expect: <code>`), plus a `resolution/` case if merge semantics are affected;
4. semantic rules/issue codes are implemented in `packages/core` and documented in `docs/specification/persona-format.md` and `overview.md`;
5. `docs/specification/*` describe the new state; add a "history" note if a drafted idea was adopted or rejected;
6. incompatible changes move to a new `apiVersion` directory (`v1alpha2`, ...) — alpha versions may break, but never silently.

Never make the format's meaning depend on TypeScript behavior. Load the
`persona-specification` skill for this work.
