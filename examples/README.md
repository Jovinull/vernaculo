# Examples

All examples use the **synthetic fixtures** in [`../fixtures/personas`](../fixtures/personas).
They demonstrate mechanics only: the fixture "regional" forms are invented
placeholders, not real language. No reviewed regional pack exists yet.

Build the packages once before running anything here:

```bash
pnpm install
pnpm build
```

## [`openai/`](openai/) — business agent + persona layer on the Responses API

```bash
pnpm --filter @vernaculo/example-openai start          # dry run: prints request params
OPENAI_API_KEY=... OPENAI_MODEL=... pnpm --filter @vernaculo/example-openai start
```

Your key, your model, your bill: Vernáculo never sees the request. The example
also shows why the persona must be applied on every turn (`previous_response_id`
does not carry `instructions` over).

## [`project-persona/`](project-persona/) — a company's own persona file

`acme-cidade-a.yaml` extends a persona from a persona root, lowers the intensity
and discourages one form. The same agent code works with any locality.

```bash
pnpm vernaculo inspect examples/project-persona/acme-cidade-a.yaml --root fixtures/personas
pnpm vernaculo compile examples/project-persona/acme-cidade-a.yaml --root fixtures/personas
pnpm vernaculo eject examples/project-persona/acme-cidade-a.yaml --root fixtures/personas --out .vernaculo-tmp/acme
```

`eject` writes a flattened, self-contained `persona.yaml` plus compiled
`instructions.md`: after that the project needs no Vernáculo package at all.

## Agent Skill export

```bash
pnpm vernaculo export pt-BR/x-fixture/cidade-a --root fixtures/personas --target skill --out .vernaculo-tmp/skills
```

Produces `vernaculo-pt-br-x-fixture-cidade-a/` with `SKILL.md` and `references/`,
following the [Agent Skills specification](https://agentskills.io/specification).
Copy the directory into any agent that supports skills.

## Plain system prompt

```bash
pnpm vernaculo compile pt-BR/x-fixture/cidade-a --root fixtures/personas --intensity 0.3
```

Paste the Markdown after your agent's own instructions, in any provider or local model.
