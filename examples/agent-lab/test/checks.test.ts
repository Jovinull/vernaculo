import { describe, expect, it } from "vitest";
import { checkReply, findForms, normalize, type PackForms, splitForms } from "../src/checks.ts";

// Synthetic forms and places: these tests exercise the matching logic, not any variety.
const forms: PackForms = {
  positive: ["termo-a", "marca", "o senhor", "a senhora"],
  hypotheses: ["forma hipotetica"],
  discouraged: ["proibido"],
};
const regionTerms = ["Cidade A", "cidadense"];

describe("findForms", () => {
  it("matches whole words, ignoring case and diacritics", () => {
    expect(findForms("MÁRCA! E termo-a.", forms.positive)).toEqual(["termo-a", "marca"]);
    expect(findForms("marcante", forms.positive)).toEqual([]);
  });
});

describe("splitForms", () => {
  it("splits alternatives written with a slash", () => {
    expect(splitForms("o senhor / a senhora")).toEqual(["o senhor", "a senhora"]);
  });
});

describe("checkReply", () => {
  it("separates forms enabled by the layer from forms used outside it", () => {
    const checks = checkReply("Marca, termo-a!", forms, ["marca"], regionTerms);
    expect(checks.enabledFormsUsed).toEqual(["marca"]);
    expect(checks.formsOutsideLayer).toEqual(["termo-a"]);
  });

  it("flags hypotheses, discouraged forms and origin claims", () => {
    const text = "Forma hipotética: proibido. Eu sou cidadense, nasci na Cidade A!";
    const checks = checkReply(text, forms, [], regionTerms);
    expect(checks.hypothesisFormsUsed).toEqual(["forma hipotetica"]);
    expect(checks.discouragedUsed).toEqual(["proibido"]);
    expect(checks.originClaim).toBe(true);
    expect(checks.regionMentions).toEqual(["Cidade A", "cidadense"]);
  });

  it("does not treat a plain mention of the region as an origin claim", () => {
    const checks = checkReply("Temos lojas na Cidade A.", forms, [], regionTerms);
    expect(checks.originClaim).toBe(false);
    expect(checks.regionMentions).toEqual(["Cidade A"]);
  });

  it("counts second-person address forms", () => {
    const text = "Você quer? Posso lhe mostrar, te explico. O senhor prefere?";
    const checks = checkReply(text, forms, [], regionTerms);
    expect(checks.address).toEqual({ voce: 1, lhe: 1, te: 1, tu: 0, senhor: 1 });
  });
});

describe("normalize", () => {
  it("lowercases and strips diacritics", () => {
    expect(normalize("Ôxe, VOCÊ")).toBe("oxe, voce");
  });
});
