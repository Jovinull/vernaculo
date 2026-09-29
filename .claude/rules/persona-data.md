---
paths:
  - "personas/**"
  - "fixtures/**"
  - "examples/**/*.yaml"
  - "schemas/conformance/**"
---

# Persona data rules

- Only observable language features. Never personality, humor, intelligence, friendliness, aggressiveness, education, income, profession, religion, politics or behavior — not even in notes or examples.
- Never invent regional forms. Real features need `evidence` (`attested`/`reported` with `sources`); unconfirmed forms stay `hypothesis` (never rendered).
- `synthetic` evidence and invented placeholder words are allowed only in `fixtures/` and conformance files, always with `maturity: fixture`, clearly marked as not linguistic content, under `x-` id segments.
- `personas/` (the real library) gets content only from actual research, as `maturity: draft` until human review criteria are met. Never set `reviewed` without a merged review record.
- Every source records `license`, `usage` (`consulted` / `cited` / `redistributed`) and `accessed` (quoted date). Never copy corpus or dataset content unless its license allows redistribution under the pack's license.
- The directory path under a persona root must equal `metadata.id`; slugs are lowercase ASCII.
- Quote dates and YAML-1.1-ambiguous strings (`"yes"`, `"no"`, `"on"`).
- Validate with `pnpm build && pnpm vernaculo validate --root <root>` and look at `compile` output at intensities 0, default and 1.
- For pack work, load the `linguistic-research` skill.
