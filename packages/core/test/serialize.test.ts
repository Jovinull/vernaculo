import { describe, expect, it } from "vitest";
import { parse } from "yaml";
import { parsePersonaYaml, resolvePersona, serializePersonaYaml } from "../src/index.ts";
import { createDirectorySource } from "../src/node.ts";
import { fixturesRoot } from "./helpers.ts";

describe("serializePersonaYaml", () => {
  it("round-trips a flattened persona", async () => {
    const { document } = await resolvePersona(
      "pt-BR/x-fixture/cidade-a",
      createDirectorySource(fixturesRoot),
    );
    const text = serializePersonaYaml(document, { header: ["Generated", ""] });
    expect(text.startsWith("# Generated\n#\napiVersion:")).toBe(true);
    expect(parsePersonaYaml(text)).toEqual(document);
    expect(serializePersonaYaml(parsePersonaYaml(text))).toBe(serializePersonaYaml(document));
  });

  it("quotes strings that YAML 1.1 parsers would misread", () => {
    const text = serializePersonaYaml({
      apiVersion: "vernaculo.dev/v1alpha1",
      kind: "Persona",
      metadata: {
        id: "pt-BR/x",
        name: "no",
        language: "pt-BR",
        version: "0.1.0",
        maturity: "draft",
      },
      provenance: {
        sources: [{ id: "s", type: "other", title: "yes", usage: "cited", accessed: "2026-09-29" }],
      },
    });
    const asYaml11 = parse(text, { version: "1.1" }) as {
      metadata: { name: unknown };
      provenance: { sources: [{ title: unknown; accessed: unknown }] };
    };
    expect(asYaml11.metadata.name).toBe("no");
    expect(asYaml11.provenance.sources[0].title).toBe("yes");
    expect(asYaml11.provenance.sources[0].accessed).toBe("2026-09-29");
  });
});
