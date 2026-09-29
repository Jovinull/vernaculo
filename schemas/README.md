# Schemas and conformance suite

Normative, language-neutral artifacts of the Vernáculo Persona Specification.

| Path | Content |
| --- | --- |
| `v1alpha1/persona.schema.json` | JSON Schema (draft 2020-12) for `apiVersion: vernaculo.dev/v1alpha1` persona documents |
| `conformance/v1alpha1/valid/` | documents that must parse, validate and resolve |
| `conformance/v1alpha1/invalid-schema/` | documents that must fail structural validation (`# reason:` explains why) |
| `conformance/v1alpha1/invalid-semantic/` | structurally valid documents that must fail with the issue code in `# expect:` |
| `conformance/v1alpha1/resolution/<case>/` | a persona root (`personas/`) and `case.yaml` with the id to resolve and the expected lineage + flattened document, or the expected error code |

The JSON Schema covers structure only; semantic rules and resolution semantics are
specified in [`docs/specification/`](../docs/specification/overview.md). An
implementation in any language conforms when it passes this suite
([conformance rules](../docs/specification/overview.md#conformance)).

Editor support (optional): add `# yaml-language-server: $schema=<relative path to persona.schema.json>`
at the top of a persona file.

Changing the format: update the JSON Schema, the Zod mirror in
`packages/schema/src/zod.ts`, fixtures here and the specification docs in the same
change; see the `persona-specification` project skill.
