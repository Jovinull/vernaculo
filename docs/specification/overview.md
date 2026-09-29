# Vernáculo Persona Specification — overview

- Current version: **`vernaculo.dev/v1alpha1`** (alpha: may change incompatibly)
- Normative artifacts: [`schemas/v1alpha1/persona.schema.json`](../../schemas/v1alpha1/persona.schema.json) and the rules in this directory
- Conformance suite: [`schemas/conformance/v1alpha1/`](../../schemas/conformance/v1alpha1/)

The key words MUST, MUST NOT, SHOULD and MAY are to be interpreted as in RFC 2119.

## Purpose

A persona is a **declarative description of observable features of a language
variety**, designed to be layered onto an existing AI agent. It is data, not a
prompt: implementations compile it into instructions for a target
([compilation](../architecture/compilation.md)). The specification is independent
of any programming language, provider or agent framework
([ADR-0002](../decisions/0002-provider-agnostic-specification-and-core.md),
[ADR-0003](../decisions/0003-yaml-markdown-json-schema-format.md)).

## Documents

1. A persona document is a YAML 1.2 file restricted to the **JSON data model**: implementations MUST reject non-finite numbers (`.nan`, `.inf`), binary or custom-tagged values, and duplicate mapping keys. A file MUST contain exactly one document.
2. Writers SHOULD quote strings that YAML 1.1 parsers would misread (dates, `yes`/`no`/`on`/`off`), so files stay portable across parsers.
3. A document MUST validate against the JSON Schema of its `apiVersion` and MUST satisfy the semantic rules in [persona-format.md](persona-format.md).

## Identifiers

`metadata.id` = `<language tag>/<slug>/<slug>...`

- The first segment is a BCP 47 language tag (simplified syntax), e.g. `pt-BR`, `es-419`.
- Following segments are slugs: lowercase ASCII letters and digits separated by single hyphens (e.g. `sao-paulo`, `reconcavo`). Display names with diacritics belong in `metadata.name`.
- Segments name progressively narrower varieties, which MAY follow administrative divisions (`pt-BR/ba/salvador`) or not (a future `pt-BR/<variety>` supported by evidence).
- Ids carry **no inheritance**; only `extends` does ([ADR-0013](../decisions/0013-explicit-inheritance.md)).
- Segments starting with `x-` are, by convention, private or synthetic (`pt-BR/x-fixture`, `pt-BR/x-acme/...`).
- The id syntax excludes `.`, `\` and empty segments, so ids are safe to map to paths.

## Persona roots

A persona root is a directory in which the persona with id `I` is stored at
`<root>/I/persona.yaml` (segments as nested directories). A document found at
that location MUST declare `metadata.id` equal to `I` (`id-mismatch` otherwise).
Implementations resolving ids against several roots MUST search them in order
and use the first match.

## Processing model

1. **Parse** each document (JSON data model restrictions).
2. **Validate** its structure (JSON Schema) and document-level semantic rules.
3. **Resolve** the lineage through `extends`, check lineage rules, and **flatten** it ([inheritance-and-composition.md](inheritance-and-composition.md)).
4. Check resolved-level semantic rules.
5. **Select** features for an intensity ([regional-intensity.md](regional-intensity.md)).
6. **Render** for a target. Rendering is implementation-defined, but every rendering MUST convey the ground rules listed in [anti-caricature.md](../linguistic/anti-caricature.md) and the effective maturity when it is not `reviewed`.

Implementations MUST NOT require network access for any of these steps.

## Versioning

- `apiVersion` identifies the specification version. `vernaculo.dev` is a namespace identifier; implementations MUST NOT dereference it.
- Alpha versions (`v1alpha1`, `v1alpha2`, ...) may change incompatibly. A stable `v1` will be declared only after real packs, human review and evals have exercised the format.
- Each version has its own schema directory and conformance suite.

## Conformance

An implementation conforms to `v1alpha1` when, on the suite in
`schemas/conformance/v1alpha1/`:

| Directory | Expected behavior |
| --- | --- |
| `valid/` | parses, validates and resolves (each file as a lone persona) |
| `invalid-schema/` | rejected by structural validation |
| `invalid-semantic/` | structurally valid; rejected with the issue code in the file's `# expect:` header |
| `resolution/<case>/` | resolving `case.yaml` `resolve` against the case's `personas/` root yields `expect.lineage` and `expect.document` (the flattened document, including key order), or fails with `expect.error` |

The TypeScript reference implementation runs this suite in
`packages/schema/test/conformance.test.ts` and `packages/core/test/conformance.test.ts`.

## Issue codes

Stable, machine-readable codes shared by implementations:

| Stage | Codes |
| --- | --- |
| Parsing | `yaml-syntax`, `non-json-value`, `schema-violation` |
| Document rules | `language-mismatch`, `duplicate-key`, `conflicting-forms`, `evidence-without-source` |
| Resolution | `invalid-id`, `persona-not-found`, `parent-not-found`, `id-mismatch`, `inheritance-cycle`, `inheritance-too-deep`, `lineage-language-mismatch`, `unknown-source`, `synthetic-outside-fixture`, `missing-default-intensity` |
| Options | `invalid-intensity` |

## Related

- Field reference and semantic rules: [persona-format.md](persona-format.md)
- Inheritance and composition: [inheritance-and-composition.md](inheritance-and-composition.md)
- Intensity: [regional-intensity.md](regional-intensity.md)
- Evidence, sources, maturity, licensing: [provenance.md](provenance.md)
