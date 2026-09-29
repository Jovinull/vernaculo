// @vernaculo/openai — thin adapter for the OpenAI Responses API.
//
// It depends on no OpenAI SDK and performs no request: it only shapes compiled
// persona instructions for the user's own client, key and model.
import type { CompiledPersona } from "@vernaculo/compiler";

/** The subset of Responses API create params this adapter reads and writes. */
export interface ResponsesParamsLike {
  readonly instructions?: string | null | undefined;
}

/**
 * Places the persona layer after the agent's own instructions. The agent's role
 * comes first; the persona is a subordinate language layer. Both parts are
 * stable, which keeps the prompt prefix cacheable.
 */
export function composeInstructions(
  agentInstructions: string | null | undefined,
  persona: CompiledPersona,
): string {
  const agent = agentInstructions?.trim();
  return agent ? `${agent}\n\n${persona.instructions}` : persona.instructions;
}

/**
 * Returns a copy of `params` whose `instructions` contain the agent instructions
 * followed by the persona layer.
 *
 * Call it on EVERY request, including follow-ups that use
 * `previous_response_id`: the Responses API does not carry `instructions` over
 * from the previous response.
 */
export function withPersona<P extends object>(
  params: P & ResponsesParamsLike,
  persona: CompiledPersona,
): Omit<P, "instructions"> & { instructions: string } {
  return { ...params, instructions: composeInstructions(params.instructions, persona) };
}

export interface DeveloperMessage {
  readonly role: "developer";
  readonly content: string;
}

/** The persona layer as a developer message, for flows that pass instructions as input items. */
export function developerMessage(persona: CompiledPersona): DeveloperMessage {
  return { role: "developer", content: persona.instructions };
}
