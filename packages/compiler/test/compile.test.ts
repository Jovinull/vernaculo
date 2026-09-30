import { fileURLToPath } from "node:url";
import { buildIR, createMemorySource, resolvePersona } from "@vernaculo/core";
import { createDirectorySource } from "@vernaculo/core/node";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  compile,
  compilePersona,
  groundRules,
  INSTRUCTIONS_FORMAT,
  UNCONFIRMED_GUIDANCE,
} from "../src/index.ts";

const fixturesRoot = fileURLToPath(new URL("../../../fixtures/personas", import.meta.url));
const resolved = await resolvePersona(
  "pt-BR/x-fixture/cidade-a",
  createDirectorySource(fixturesRoot),
);

describe("compilePersona", () => {
  // Reviewable golden files: a wording change must be a deliberate, reviewed diff.
  it.each([0, 0.25, 0.7])("matches the golden instructions at intensity %s", async (intensity) => {
    const { instructions } = compilePersona(resolved, { intensity });
    await expect(instructions).toMatchFileSnapshot(`./__golden__/cidade-a-${intensity}.md`);
  });

  it.each([0, 0.3, 1])("always includes every ground rule (intensity %s)", (intensity) => {
    const ir = buildIR(resolved, { intensity });
    const { instructions } = compile(ir);
    for (const rule of groundRules(ir)) expect(instructions).toContain(rule);
    expect(instructions).toContain("Never imitate a stereotype.");
  });

  it("renders only restrictions at intensity 0", () => {
    const { instructions } = compilePersona(resolved, { intensity: 0 });
    expect(instructions).not.toContain("## Vocabulary");
    expect(instructions).not.toContain("## Examples");
    expect(instructions).toContain("## Avoid");
    expect(instructions).toContain("## Never produce output like this");
  });

  it("presents corroborated forms apart, as not yet confirmed by speakers", async () => {
    const id = "pt-BR/x-fixture/corroborated";
    const text = `apiVersion: vernaculo.dev/v1alpha1
kind: Persona
metadata: { id: ${id}, name: Corroborated, language: pt-BR, version: 0.1.0, maturity: fixture }
regionality: { defaultIntensity: 0.3 }
linguistics:
  vocabulary:
    preferred:
      - { term: termo-sintético-confirmado, evidence: synthetic }
      - term: termo-sintético-corroborado
        evidence: corroborated
        sources: [fonte-a, fonte-b]
        minIntensity: 0.6
provenance:
  sources:
    - { id: fonte-a, type: other, title: Synthetic source A, usage: consulted }
    - { id: fonte-b, type: other, title: Synthetic source B, usage: consulted }
`;
    const persona = await resolvePersona(id, createMemorySource({ [id]: text }));
    const high = compilePersona(persona, { intensity: 0.7 }).instructions;
    const heading = high.indexOf("## Forms not yet confirmed by speakers");
    expect(heading).toBeGreaterThan(high.indexOf("## Vocabulary"));
    expect(high).toContain(UNCONFIRMED_GUIDANCE);
    expect(high.indexOf("termo-sintético-corroborado")).toBeGreaterThan(heading);
    expect(high.indexOf("termo-sintético-confirmado")).toBeLessThan(heading);

    const low = compilePersona(persona, { intensity: 0.5 }).instructions;
    expect(low).not.toContain("## Forms not yet confirmed by speakers");
    expect(low).not.toContain("termo-sintético-corroborado");
  });

  it("flags non-reviewed maturity in the output itself", () => {
    expect(compilePersona(resolved).instructions).toContain("> FIXTURE: synthetic test data");
  });

  it("returns metadata alongside the instructions", () => {
    expect(compilePersona(resolved, { intensity: 0.4 }).metadata).toEqual({
      persona: "pt-BR/x-fixture/cidade-a",
      name: "Fixture — Cidade A",
      version: "0.1.0",
      language: "pt-BR",
      maturity: "fixture",
      intensity: 0.4,
      lineage: ["pt-BR/x-fixture", "pt-BR/x-fixture/cidade-a"],
      format: INSTRUCTIONS_FORMAT,
    });
  });

  it("is deterministic and does not modify the canonical representation", () => {
    const before = JSON.stringify(resolved);
    const first = compilePersona(resolved, { intensity: 0.7 });
    const second = compilePersona(resolved, { intensity: 0.7 });
    expect(second).toEqual(first);
    expect(JSON.stringify(resolved)).toBe(before);
  });

  it("escapes Markdown in persona content", async () => {
    const id = "pt-BR/x-escape";
    const text = `apiVersion: vernaculo.dev/v1alpha1
kind: Persona
metadata: { id: ${id}, name: "a *b*", language: pt-BR, version: 0.1.0, maturity: fixture }
regionality: { defaultIntensity: 0.5 }
linguistics:
  vocabulary:
    preferred:
      - { term: "x_y*z", meaning: "[link](http://x)", evidence: synthetic }
`;
    const persona = await resolvePersona(id, createMemorySource({ [id]: text }));
    const { instructions } = compilePersona(persona);
    expect(instructions).toContain("**x\\_y\\*z** — \\[link\\](http://x)");
    expect(instructions).toContain("# Regional language layer: a \\*b\\*");
  });
});

describe("no network", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("loads, resolves and compiles with network access disabled", async () => {
    const fetchSpy = vi.fn(() => {
      throw new Error("network access is not allowed");
    });
    vi.stubGlobal("fetch", fetchSpy);
    const persona = await resolvePersona(
      "pt-BR/x-fixture/cidade-b",
      createDirectorySource(fixturesRoot),
    );
    expect(compilePersona(persona).instructions).toContain("Fixture — Cidade B");
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
