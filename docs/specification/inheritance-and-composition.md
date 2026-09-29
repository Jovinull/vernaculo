# Inheritance and composition

Two different things combine in Vernáculo:

- **Inheritance** — a persona extends another persona (`extends`), producing one flattened persona. Normative, specified below.
- **Composition** — a compiled persona layer is placed onto a host agent's own instructions. Specified as a rendering contract below.

## Inheritance

Decision record: [ADR-0013](../decisions/0013-explicit-inheritance.md).

- `extends: <persona id>` names exactly one parent. Absence of `extends` makes a document a lineage root.
- Ids never imply inheritance: `pt-BR/ba/salvador` does **not** inherit from `pt-BR/ba` unless it says so.
- The **lineage** is the chain from the root ancestor to the requested persona. It has a single language, no cycles and at most 32 documents.

### Flattening (normative)

Documents are merged in lineage order, root first. The result is a standalone
document without `extends` (the *flattened persona*).

1. **Identity.** `apiVersion` and `kind` are the current constants. `metadata` is the leaf's own `metadata` — `description`, `license` and `region` are **not inherited** — except `maturity`, which becomes the **effective maturity**: the least mature level in the lineage (`fixture` < `draft` < `reviewed`).
2. **Scalars.** `regionality.defaultIntensity`, `linguistics.orthography.phoneticSpelling` and `provenance.notes` take the value of the last document in the lineage that defines them.
3. **Cancellation of surface forms.** When processing a document `D`:
   - every form `D` discourages is removed from the used-form lists accumulated from its ancestors;
   - every form `D` uses is removed from the discouraged list accumulated from its ancestors.

   (A document cannot both use and discourage a form — `conflicting-forms`.) So a descendant can *discourage* a form its parent uses (a company avoiding a term) or *re-enable* a form its parent discouraged.
4. **Keyed lists.** Then each list of `D` is merged into the accumulated list: an item whose key already exists **replaces that item in place, as a whole** (no deep merge); new items are **appended** in `D`'s order. Keys: `term` (vocabulary), `form` (markers, pragmatics), `id` (patterns, examples, anti-patterns, sources), compared after NFC + lowercasing.
5. **Canonical form.** The flattened document orders keys as the JSON Schema declares them and omits undefined values, empty lists and empty objects. Canonical form makes flattening byte-for-byte reproducible across implementations.

After flattening, the resolved-level rules apply (`unknown-source`,
`synthetic-outside-fixture`, `missing-default-intensity`).

The conformance case `schemas/conformance/v1alpha1/resolution/inheritance-merge/`
exercises every rule above, including key order.

### Why no `override:` block

The conversation sketched a company file with a separate `override:` section.
v1alpha1 uses the same fields in every document instead, with the merge rules
above: replace-by-key, append, and discouraged/used cancellation cover the
described needs ("inherit the Salvador pack, change the intensity, discourage a
term") with a single shape. Removing an inherited *non-surface-form* item (e.g. a
morphosyntax pattern) is not possible yet — an [open question](../roadmap/open-questions.md);
lowering intensity or ejecting and editing are the current workarounds.

### Example: a company persona

```yaml
# acme-salvador.yaml, in the company's repository
apiVersion: vernaculo.dev/v1alpha1
kind: Persona
extends: pt-BR/ba/salvador
metadata:
  id: pt-BR/x-acme/salvador
  name: ACME — Salvador
  language: pt-BR
  version: 1.0.0
  maturity: reviewed        # effective maturity can still be lower if the parent is less mature
regionality:
  defaultIntensity: 0.25
linguistics:
  vocabulary:
    discouraged:
      - term: ...           # removed from the inherited used forms
        reason: Company style guide.
```

Runnable version (with fixtures): [`examples/project-persona`](../../examples/project-persona/).

## Composition with the host agent

```text
host agent instructions (role, rules, knowledge)
+ compiled persona layer (language only)
= localized agent
```

Contract for renderers and adapters ([ADR-0009](../decisions/0009-regional-layer-separate-from-agent-role.md)):

- The persona layer is placed **after** the host agent's instructions and MUST state that the host's role, business rules, policies and facts take precedence.
- The layer MUST NOT redefine the agent's role, and MUST instruct the model not to claim a regional origin or personal background.
- When regional style would reduce clarity, accuracy or appropriateness, neutral language wins.
- Adapters apply the layer on every request where the provider does not persist instructions (e.g. OpenAI `previous_response_id`).

Composition of several personas at once (e.g. two varieties) is not supported.
