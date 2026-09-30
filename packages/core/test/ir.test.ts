import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  assertIntensity,
  buildIR,
  createMemorySource,
  type PersonaIR,
  resolvePersona,
} from "../src/index.ts";
import { createDirectorySource } from "../src/node.ts";
import { conformanceDir, fixturesRoot, issueCodes } from "./helpers.ts";

const resolved = await resolvePersona(
  "pt-BR/x-fixture/cidade-a",
  createDirectorySource(fixturesRoot),
);

const corroboratedId = "pt-BR/x-conformance/corroborated";
const withCorroborated = await resolvePersona(
  corroboratedId,
  createMemorySource({
    [corroboratedId]: readFileSync(`${conformanceDir}/valid/corroborated.yaml`, "utf8"),
  }),
);

function positiveForms(ir: PersonaIR): string[] {
  return [
    ...ir.vocabulary.preferred.map((item) => item.term),
    ...ir.vocabulary.contextual.map((item) => item.term),
    ...ir.discourseMarkers.map((item) => item.form),
    ...ir.morphosyntax.map((item) => item.id),
    ...Object.values(ir.pragmatics).flatMap((items) => items.map((item) => item.form)),
  ];
}

describe("intensity contract", () => {
  it.each([0, 0.25, 1])("accepts %s", (value) => {
    expect(assertIntensity(value)).toBe(value);
  });

  it.each([-0.01, 1.01, Number.NaN, Number.POSITIVE_INFINITY, "0.3", null])(
    "rejects %s",
    async (value) => {
      expect(await issueCodes(() => assertIntensity(value))).toEqual(["invalid-intensity"]);
    },
  );

  it("defaults to the persona's defaultIntensity", () => {
    expect(buildIR(resolved).intensity).toBe(0.25);
  });
});

describe("buildIR", () => {
  it("renders no regional feature at intensity 0, but keeps every restriction", () => {
    const ir = buildIR(resolved, { intensity: 0 });
    expect(positiveForms(ir)).toEqual([]);
    expect(ir.examples).toEqual([]);
    expect(ir.vocabulary.discouraged.length).toBeGreaterThan(0);
    expect(ir.antiPatterns.length).toBeGreaterThan(0);
  });

  it("gates features by minIntensity", () => {
    const low = positiveForms(buildIR(resolved, { intensity: 0.3 }));
    const high = positiveForms(buildIR(resolved, { intensity: 0.7 }));
    expect(low).not.toContain("termo-sintético-marcado"); // minIntensity 0.6
    expect(high).toContain("termo-sintético-marcado");
    expect(high).toEqual(expect.arrayContaining(low));
  });

  it("keeps corroborated forms apart from confirmed ones", () => {
    const ir = buildIR(withCorroborated, { intensity: 1 });
    expect(ir.corroborated.vocabulary.preferred.map((item) => item.term)).toEqual([
      "termo-sintético-corroborado",
    ]);
    expect(positiveForms(ir)).not.toContain("termo-sintético-corroborado");
  });

  it("gates corroborated forms by minIntensity like any other feature", () => {
    const ir = buildIR(withCorroborated, { intensity: 0.4 });
    expect(ir.corroborated.vocabulary.preferred).toEqual([]);
    expect(ir.omitted.belowIntensity).toBe(1);
  });

  it("never renders hypotheses, at any intensity", () => {
    const ir = buildIR(resolved, { intensity: 1 });
    expect(positiveForms(ir)).not.toContain("discordância-sintética-hipotética");
    expect(ir.omitted.hypotheses).toBe(1);
  });

  it("only renders examples at or below the selected intensity", () => {
    const ids = (intensity: number) => buildIR(resolved, { intensity }).examples.map((e) => e.id);
    expect(ids(0.3)).toEqual(["saudacao-cliente"]);
    expect(ids(0.8)).toEqual(["saudacao-cliente", "saudacao-marcada"]);
  });

  it("returns a frozen IR and leaves the resolved persona untouched", () => {
    const before = JSON.stringify(resolved);
    const ir = buildIR(resolved, { intensity: 1 });
    expect(Object.isFrozen(ir)).toBe(true);
    expect(Object.isFrozen(ir.vocabulary.preferred[0])).toBe(true);
    expect(Object.isFrozen(resolved.document)).toBe(false);
    expect(JSON.stringify(resolved)).toBe(before);
  });
});
