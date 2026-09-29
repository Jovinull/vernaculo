# Contributing a persona pack

Read first: [methodology](../linguistic/methodology.md),
[anti-caricature policy](../linguistic/anti-caricature.md),
[format](../specification/persona-format.md),
[provenance](../specification/provenance.md).

## Before you start

- Check [regional-packs.md](../linguistic/regional-packs.md) and open issues: someone may already be researching the variety.
- Confirm you can cite sources whose licenses allow the intended use ([sources.md](../linguistic/sources.md)).
- Plan who will review: people familiar with the variety ([human-review.md](../linguistic/human-review.md)).

## Steps

1. Create `personas/<language>/<slug>/.../persona.yaml` with `maturity: draft`. The directory path must equal `metadata.id`.
2. Add sources to `provenance.sources` with `license`, `usage` and `accessed`.
3. Add features. Each one needs `evidence`; `attested`/`reported` need `sources`. Keep unconfirmed forms as `hypothesis` (never rendered).
4. Set `minIntensity` on marked features; set `regionality.defaultIntensity` for the pack's typical use (usually subtle).
5. Add positive `examples` (with `neutral`, `text`, `intensity`) for realistic situations, starting with customer service.
6. Add `antiPatterns`: overuse, eye dialect, stereotyped attitudes, forms from other regions.
7. Validate and look at the output:

   ```bash
   pnpm build
   pnpm vernaculo validate
   pnpm vernaculo inspect pt-BR/<...> --intensity 0.7
   pnpm vernaculo compile pt-BR/<...> --intensity 0.3
   pnpm vernaculo compile pt-BR/<...> --intensity 1
   ```

8. Open a pull request describing sources, evidence gaps and known risks.

## Review checklist

- [ ] No personality, attitude, humor, class, education, profession, religion, politics or behavior — anywhere, including examples and notes.
- [ ] Every rendered feature has evidence; `attested`/`reported` cite sources; no `synthetic` content.
- [ ] Source usage matches each license; nothing copied that may not be redistributed.
- [ ] Granularity is justified by evidence (not "the whole state" by default).
- [ ] Output at intensity 1 is still not caricature; intensity 0 is neutral.
- [ ] Examples are realistic and at the stated intensity; anti-patterns cover the main risks.
- [ ] `maturity` is `draft` unless the human-review criteria are met and the review record is included.
- [ ] Documentation updated if the pack required new conventions.

## Company or project personas

Do not modify library packs for company preferences. Keep a derived persona in
your own repository with `extends` ([inheritance-and-composition.md](../specification/inheritance-and-composition.md)).
