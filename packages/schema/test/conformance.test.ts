import { Ajv2020 } from "ajv/dist/2020.js";
import { describe, expect, it } from "vitest";
import { personaDocumentSchema, personaJsonSchema } from "../src/index.ts";
import { readConformanceDir } from "./helpers.ts";

// Differential test: the canonical JSON Schema (via Ajv) and the Zod mirror must
// reach the same verdict on every conformance fixture.

const ajv = new Ajv2020({ strict: true, allErrors: true });
const validateWithJsonSchema = ajv.compile(personaJsonSchema);

function verdicts(data: unknown): { jsonSchema: boolean; zod: boolean } {
  return {
    jsonSchema: validateWithJsonSchema(data) === true,
    zod: personaDocumentSchema.safeParse(data).success,
  };
}

describe("conformance: valid documents", () => {
  const files = readConformanceDir("valid");

  it("has fixtures", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)("$name is accepted by the JSON Schema and by Zod", ({ data }) => {
    expect(verdicts(data)).toEqual({ jsonSchema: true, zod: true });
  });
});

describe("conformance: structurally invalid documents", () => {
  const files = readConformanceDir("invalid-schema");

  it("has fixtures", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)("$name is rejected by the JSON Schema and by Zod", ({ data }) => {
    expect(verdicts(data)).toEqual({ jsonSchema: false, zod: false });
  });
});

describe("conformance: semantically invalid documents", () => {
  // Structure is fine; semantic rules (enforced by @vernaculo/core) reject them.
  it.each(readConformanceDir("invalid-semantic"))(
    "$name is structurally valid for both validators",
    ({ data, expect: code }) => {
      expect(code).toBeDefined();
      expect(verdicts(data)).toEqual({ jsonSchema: true, zod: true });
    },
  );
});
