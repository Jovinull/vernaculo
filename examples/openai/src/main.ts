// A business agent (role, rules, knowledge) + a regional persona layer.
// The persona used here is a SYNTHETIC FIXTURE: it demonstrates the plumbing,
// not real regional language.
//
// Dry run (default): prints the request parameters; no network access.
// Real call: set OPENAI_API_KEY and OPENAI_MODEL (your key, your model, your bill).
import { compilePersona } from "@vernaculo/compiler";
import { loadPersona } from "@vernaculo/core/node";
import { withPersona } from "@vernaculo/openai";
import OpenAI from "openai";

const fixturesRoot = new URL("../../../fixtures/personas", import.meta.url).pathname.replace(
  /^\/([A-Za-z]:)/,
  "$1",
);

// The business agent is written once and never changes per region.
const agentInstructions = `Você é o assistente de vendas da Concessionária Exemplo (empresa fictícia).
Siga a política comercial: nunca prometa descontos que não estejam na tabela vigente e
encaminhe pedidos de financiamento para um consultor humano.`;

// The regional layer is chosen per deployment (e.g. per store), not hand-written per region.
const persona = compilePersona(
  await loadPersona("pt-BR/x-fixture/cidade-a", { roots: fixturesRoot }),
  { intensity: 0.25 },
);

const model = process.env.OPENAI_MODEL;
const firstTurn = withPersona(
  {
    model: model ?? "<set OPENAI_MODEL>",
    instructions: agentInstructions,
    input: "Estou procurando uma moto para trabalhar.",
  },
  persona,
);

if (!process.env.OPENAI_API_KEY || !model) {
  console.log("Dry run (set OPENAI_API_KEY and OPENAI_MODEL to call the API).\n");
  console.log(JSON.stringify(firstTurn, null, 2));
} else {
  const client = new OpenAI();
  const response = await client.responses.create(firstTurn);
  console.log(response.output_text);

  // The Responses API does not carry `instructions` over with previous_response_id:
  // apply the persona again on every turn.
  const followUp = await client.responses.create(
    withPersona(
      {
        model,
        instructions: agentInstructions,
        input: "E tem opção com parcelas menores?",
        previous_response_id: response.id,
      },
      persona,
    ),
  );
  console.log(followUp.output_text);
}
