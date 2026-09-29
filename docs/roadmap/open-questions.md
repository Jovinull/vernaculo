# Open questions

Decisions not yet taken. Each should end as an ADR, a specification change or a
documented convention. Remove an entry when it is resolved (Git keeps history);
ids are never reused.

Resolved so far: OQ-01 pack content license → Apache-2.0
([ADR-0014](../decisions/0014-apache-2-0-persona-content.md)); OQ-02 criteria for
`reviewed` → none mandatory, review always recommended
([ADR-0015](../decisions/0015-human-review-recommended-not-mandatory.md)).

| ID | Question | Context / options | Blocking |
| --- | --- | --- | --- |
| OQ-03 | **Eval runner** | Generate Promptfoo configs from Vernáculo scenario files vs. a small in-repo runner; scenario file format; how results are stored. | model-based evals |
| OQ-04 | **Catalog distribution for `add` / `search` / `update`** | Bundle packs in the CLI package; publish an `@vernaculo/personas` npm package (the conversation mentioned `pnpm update @vernaculo/personas`); GitHub Releases tarballs; or Git sparse checkout. Must remain install-time only. | `add` command |
| OQ-05 | **Register modeling** | Compile option, per-feature applicability, or sub-personas (`pt-BR/ba/salvador/customer-service`, as sketched in the conversation). The conversation's compile API also had `register: "customer-service"`. | — |
| OQ-06 | **Multi-file packs** | Keep one `persona.yaml`, or allow `knowledge/*.yaml`, `examples/*.yaml`, `evals/*.yaml`, `SOURCES.md` (conversation layout) with defined include semantics. | — |
| OQ-07 | **Runtime-selectable intensity in skills** | Today intensity is baked at export. The conversation's `AGENT.md` sketch set "Regional intensity: 0.30" in the host agent; a skill could carry gated sections and let the host choose, at the cost of relying on the model for gating. | — |
| OQ-08 | **Localized instruction framing** | Framing text is English with persona content in the target language. Should framing be localized per language? Should renderings differ per provider (only with eval evidence)? | — |
| OQ-09 | **A `pt-BR` base persona?** | The conversation's layout had `personas/pt-BR/base/`. What could a base legitimately contain without over-generalizing (maybe only discouraged forms and anti-patterns)? Or should each locality stand alone? | first real packs |
| OQ-10 | **Removing inherited non-surface-form items** | v1alpha1 can cancel surface forms (discourage/re-enable) but cannot remove an inherited morphosyntax pattern, example or anti-pattern. Options: an explicit `exclude` list; per-item `remove: true`. | — |
| OQ-11 | **Intensity calibration** | Per-feature frequency hints? Evidence-based band limits? Keep gating-only? Needs eval data ("não congelar fórmula prematuramente"). | after evals |
| OQ-12 | **Rhythm, verbosity and other stylistic dimensions** | Draft 1 had a `style` block (rhythm, verbosity). Modeling them needs linguistic evidence and must not become personality. | — |
| OQ-13 | **Names and namespaces** | npm scope `@vernaculo` and package `vernaculo` were unregistered on 2026-09-29; the `vernaculo.dev` domain status is unknown (it is only an identifier in `apiVersion`). Claiming them is a maintainer action. | first publication |
| OQ-14 | **Repository hosting** | GitHub organization/URL; `repository`/`homepage` fields in `package.json`. | first publication |
| OQ-15 | **Contribution terms** | Apache-2.0 section 5 already makes contributions inbound = outbound (no CLA needed). Still open: DCO sign-off or not; NOTICE file and copyright line; code of conduct; security policy. | first external contributions |
| OQ-16 | **Other-language implementations** | Priority of a Python implementation (the conversation mentioned PyPI); conformance suite is ready for it. | — |
| OQ-17 | **Non-administrative variety names** | Naming conventions for varieties that do not follow administrative borders (e.g. `reconcavo`) and how to document their extent. | when evidence supports one |
| OQ-18 | **Voice** | Scope and timing of speech/voice regionalization; which datasets (licenses) could support it. | — |
