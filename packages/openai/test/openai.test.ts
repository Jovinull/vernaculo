import { readFileSync } from "node:fs";
import type { CompiledPersona } from "@vernaculo/compiler";
import { describe, expect, it } from "vitest";
import { composeInstructions, developerMessage, withPersona } from "../src/index.ts";

const persona: CompiledPersona = {
  instructions: "# Regional language layer: Test (pt-BR/x-test)\n",
  metadata: {
    persona: "pt-BR/x-test",
    name: "Test",
    version: "0.1.0",
    language: "pt-BR",
    maturity: "fixture",
    intensity: 0.3,
    lineage: ["pt-BR/x-test"],
    format: "vernaculo-instructions/v1alpha1",
  },
};

describe("withPersona", () => {
  it("puts the agent's role first and the persona layer after it", () => {
    const params = withPersona(
      { model: "user-chosen-model", instructions: "You are a sales assistant.\n", input: "Oi" },
      persona,
    );
    expect(params.instructions).toBe(
      "You are a sales assistant.\n\n# Regional language layer: Test (pt-BR/x-test)\n",
    );
    expect(params).toMatchObject({ model: "user-chosen-model", input: "Oi" });
  });

  it("works without agent instructions", () => {
    expect(withPersona({ previous_response_id: "resp_1" }, persona)).toEqual({
      previous_response_id: "resp_1",
      instructions: persona.instructions,
    });
  });

  it("does not mutate the caller's params", () => {
    const params = Object.freeze({ instructions: "Role." });
    withPersona(params, persona);
    expect(params.instructions).toBe("Role.");
  });

  it("is idempotent per request, so it can be applied to every turn", () => {
    const agent = "Role.";
    const first = withPersona({ instructions: agent }, persona);
    const followUp = withPersona({ instructions: agent, previous_response_id: "resp_1" }, persona);
    expect(followUp.instructions).toBe(first.instructions);
  });
});

describe("helpers", () => {
  it("composeInstructions trims the agent part", () => {
    expect(composeInstructions("  Role.  ", persona)).toBe(`Role.\n\n${persona.instructions}`);
  });

  it("developerMessage wraps the persona layer", () => {
    expect(developerMessage(persona)).toEqual({ role: "developer", content: persona.instructions });
  });
});

describe("dependencies", () => {
  it("does not depend on any OpenAI SDK", () => {
    const manifest = JSON.parse(
      readFileSync(new URL("../package.json", import.meta.url), "utf8"),
    ) as Record<string, Record<string, string> | undefined>;
    const all = { ...manifest.dependencies, ...manifest.peerDependencies };
    expect(Object.keys(all).filter((name) => /openai/.test(name))).toEqual([]);
  });
});
