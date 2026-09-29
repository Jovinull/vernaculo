# ADR-0009: The regional layer is separate from the agent's role and business rules

- Status: Accepted
- Date: 2026-09-29
- Origin: `ideia.txt` (layer table; "A inteligência comercial continua sendo exatamente a mesma. Só muda a camada sociolinguística"; "Honda Agent + Vernáculo Salvador = Honda Salvador Agent")

## Context

The motivating case: a dealership's sales agent operating in Salvador (BA) and in
Recife (PE) — same products, policies, financing rules and knowledge; different
regional language. Maintaining `honda-baiano-prompt.txt`,
`honda-pernambucano-prompt.txt`, `banco-baiano`, `suporte-baiano`... multiplies
prompts by regions and quietly forks business rules.

## Decision

```text
business agent  +  regional persona layer  =  localized agent
(role, rules,      (language only)
 knowledge)
```

- A persona is a **language layer composed onto an existing agent**, never a replacement for the agent's role.
- Layers are distinct concerns: language/variety (`pt-BR`, locality), register, regional intensity, role (e.g. sales), domain (e.g. automotive), brand, company rules. Vernáculo owns only the first three; the rest belong to the host agent.
- Compiled persona instructions are designed to be placed **after** the agent's own instructions and state that the agent's role, rules, policies and facts take precedence; when regional style conflicts with clarity or accuracy, neutral language wins.
- The agent does not "become" a person from the region: it must not claim a regional origin or background.

## Consequences

- Adapters provide composition helpers (`withPersona`, `composeInstructions`).
- Company-specific adjustments are expressed as a derived persona (`extends`) in the company's repository, not by editing library packs ([inheritance-and-composition.md](../specification/inheritance-and-composition.md)).
- Evals must check **task preservation** and **parent-rule preservation** ([dimensions.md](../evals/dimensions.md)).
- Wording note: the conversation called the persona a "middleware comportamental"; the project says **language layer** to avoid implying that behavior changes.

## Alternatives considered

- **One monolithic prompt per company × region** — rejected: combinatorial and error-prone.
- **Persona includes role templates** — rejected: mixes sociolinguistics with business logic.
