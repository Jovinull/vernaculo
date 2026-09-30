import { describe, expect, it } from "vitest";
import {
  orderForRecognition,
  type RunInfo,
  renderBlindSheet,
  type Scenario,
} from "../src/report.ts";

// Synthetic scenarios and replies: these tests exercise the sheet layout only.
const scenarios: Scenario[] = [
  { id: "a", agent: "x", situation: "A", purpose: "", turns: ["oi"] },
  { id: "b", agent: "x", situation: "B", purpose: "", turns: ["oi"], revealsRegion: true },
  { id: "c", agent: "x", situation: "C", purpose: "", turns: ["oi"] },
];
const run: RunInfo = {
  persona: "pt-BR/x-fixture/cidade-a",
  personaName: "Cidade A",
  personaVersion: "0.0.0",
  maturity: "fixture",
  model: "m",
  startedAt: "",
  variants: [{ id: "none", label: "sem camada", intensity: undefined }],
  scenarios,
};
const checks = {
  enabledFormsUsed: [],
  formsOutsideLayer: [],
  hypothesisFormsUsed: [],
  discouragedUsed: [],
  regionMentions: [],
  originClaim: false,
  address: { voce: 0, lhe: 0, te: 0, tu: 0, senhor: 0 },
};
const results = scenarios.map((scenario) => ({
  scenario: scenario.id,
  variant: "none",
  turns: [{ message: "oi", reply: "olá", checks, usage: { input: 0, output: 0 } }],
}));

describe("orderForRecognition", () => {
  it("puts conversations that name the region last, keeping the shuffled order", () => {
    const items = [{ scenario: "b" }, { scenario: "c" }, { scenario: "a" }];
    expect(orderForRecognition(items, scenarios)).toEqual([
      { scenario: "c" },
      { scenario: "a" },
      { scenario: "b" },
    ]);
  });
});

describe("renderBlindSheet", () => {
  const samples = orderForRecognition(
    results.map((result, index) => ({ id: `s-${index}`, ...result })),
    scenarios,
  ).map(({ id, scenario, variant }) => ({ id, scenario, variant }));
  const sheet = renderBlindSheet(run, samples, results);

  it("never names the variety before the recognition question", () => {
    expect(sheet).not.toContain("Cidade A");
  });

  it("asks where the writer seems to be from only when the conversation does not name a place", () => {
    const question = "De onde você diria que é quem escreveu?";
    const part2 = sheet.slice(sheet.indexOf("## Parte 2"));
    expect(sheet.split(question)).toHaveLength(3);
    expect(part2).not.toContain(question);
    expect(part2).toContain("### s-1");
  });
});
