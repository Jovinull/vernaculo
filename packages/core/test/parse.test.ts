import { describe, expect, it } from "vitest";
import { parsePersonaYaml, VernaculoError, validatePersonaDocument } from "../src/index.ts";
import { issueCodes } from "./helpers.ts";

const minimal = `apiVersion: vernaculo.dev/v1alpha1
kind: Persona
metadata:
  id: pt-BR/x-test/minimal
  name: Test
  language: pt-BR
  version: 0.1.0
  maturity: fixture
`;

describe("parsePersonaYaml", () => {
  it("returns a typed document for valid YAML", () => {
    const document = parsePersonaYaml(minimal);
    expect(document.metadata.id).toBe("pt-BR/x-test/minimal");
  });

  it("reports YAML syntax errors with the origin", () => {
    try {
      parsePersonaYaml("metadata: [unclosed", { origin: "broken.yaml" });
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(VernaculoError);
      expect((error as VernaculoError).code).toBe("yaml-syntax");
      expect((error as VernaculoError).message).toContain("broken.yaml");
    }
  });

  it("rejects duplicate keys instead of silently keeping the last one", async () => {
    const codes = await issueCodes(() => parsePersonaYaml(`${minimal}kind: Persona\n`));
    expect(codes).toEqual(["yaml-syntax"]);
  });

  it("rejects values outside the JSON data model (.nan, .inf)", async () => {
    const withNan = `${minimal}regionality:\n  defaultIntensity: .nan\n`;
    const withInf = `${minimal}regionality:\n  defaultIntensity: .inf\n`;
    expect(await issueCodes(() => parsePersonaYaml(withNan))).toEqual(["non-json-value"]);
    expect(await issueCodes(() => parsePersonaYaml(withInf))).toEqual(["non-json-value"]);
  });

  it("points schema violations at the offending value", () => {
    const result = validatePersonaDocument({
      apiVersion: "vernaculo.dev/v1alpha1",
      kind: "Persona",
      metadata: { id: "pt-BR/x", name: "X", language: "pt-BR", version: "0.1.0", maturity: "gold" },
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues).toEqual([
        expect.objectContaining({ code: "schema-violation", path: "/metadata/maturity" }),
      ]);
    }
  });

  it("reports every document-level violation at once", () => {
    const result = validatePersonaDocument({
      apiVersion: "vernaculo.dev/v1alpha1",
      kind: "Persona",
      metadata: {
        id: "pt-BR/x",
        name: "X",
        language: "es-AR",
        version: "0.1.0",
        maturity: "draft",
      },
      linguistics: {
        vocabulary: {
          preferred: [{ term: "a", evidence: "attested" }],
          discouraged: [{ term: "A" }],
        },
      },
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues.map((issue) => issue.code).sort()).toEqual([
        "conflicting-forms",
        "evidence-without-source",
        "language-mismatch",
      ]);
    }
  });
});
