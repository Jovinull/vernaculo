# Anti-caricature policy

This is the project's most important content rule. Decision record:
[ADR-0010](../decisions/0010-observable-sociolinguistic-features-only.md).

## The rule

A regional persona changes **how things are said**, never **who someone is**.

Regionality must never imply, suggest or perform:

- personality (relaxed, lazy, hard-working, warm, cold...);
- humor or being "funny";
- intelligence or competence;
- aggressiveness or friendliness;
- education or literacy;
- income or social class;
- profession;
- religion;
- political views;
- any behavior or attitude.

If personality ever becomes a concern of the project, it belongs to a separate
layer, designed separately — never to regional packs.

## What the counter-example teaches

The founding conversation named the mistake to avoid from the first commit:

```yaml
baiano:
  relaxed: true
  humorous: true
  likes_to_talk: true
  uses_oxe: true
  uses_meu_rei: true
```

Three problems at once: psychological traits attributed to a population; a whole
state treated as one speech community; and a couple of salient words standing in
for a variety — which, stuffed into every sentence, is precisely what caricature
sounds like. The format makes the first impossible (no such fields exist; unknown
fields are rejected), the id scheme and methodology address the second, and
evidence + intensity + anti-patterns address the third.

## Ground rules every rendering carries

Every compiled output, at every intensity, instructs the model to
(see [compilation.md](../architecture/compilation.md)):

1. keep the host agent's role, rules, policies and facts; prefer neutral language when regional style would harm clarity, accuracy or appropriateness;
2. apply the layer only to language (vocabulary, discourse markers, sentence structure, forms of address, conversational conventions);
3. never attribute or perform personality, humor, intelligence, education, income, social class, profession, religion, political views or behavior based on regional origin; never imitate a stereotype;
4. never claim to be from the region or to have a personal background there;
5. use only listed forms; never invent regionalisms or borrow forms from other regions;
6. not force features into every sentence;
7. use standard orthography unless the persona explicitly allows phonetic spelling.

These rules are normative for any renderer ([specification overview](../specification/overview.md)).
The SKILL.md draft in the conversation ("Do not impersonate a stereotypical
'Bahian person'... They do not imply personality, intelligence, profession,
socioeconomic status, political views, behavior. Preserve the parent agent's role
and business rules.") is the origin of this list.

## Specific risks and how the design responds

| Risk | Response |
| --- | --- |
| Overuse (a marker in every clause) | intensity bands; "do not force features"; `overuse` anti-patterns; eval dimension |
| Eye dialect / phonetic spelling ("mock spelling") | `phoneticSpelling: avoid` by default; `phonetic-spelling` anti-patterns |
| Invented regionalisms | only listed forms are rendered; `hypothesis` never rendered; eval dimension |
| Forms from another region | `wrong-region` anti-patterns; reviewer label "belongs to another region" |
| Stereotyped attitudes leaking into content | ground rule 3; `stereotype` anti-patterns; stereotype-leakage evals |
| The agent claiming to be local | ground rule 4 |
| High intensity as license to exaggerate | intensity never relaxes the rules; "exaggerated" at intensity 1 is a defect |
| Offensive or dated forms | `discouraged` with reasons; reviewer label "offensive" |

## Claims

Do not describe any pack, output or feature as linguistically validated,
representative of a region, natural, stereotype-free or production-ready without
evidence from human review and evals. Fixture and draft maturity must stay visible.
