import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";
import { createMemorySource, resolvePersona } from "../src/index.ts";
import { createDirectorySource } from "../src/node.ts";
import { conformanceDir, issueCodes } from "./helpers.ts";

// Runs the language-neutral conformance suite (schemas/conformance/v1alpha1)
// against this implementation. Other implementations should run the same files.

function yamlFiles(subdir: string) {
  const dir = `${conformanceDir}/${subdir}`;
  return readdirSync(dir)
    .filter((name) => name.endsWith(".yaml"))
    .sort()
    .map((name) => {
      const text = readFileSync(`${dir}/${name}`, "utf8");
      const data = parse(text) as { metadata: { id: string } };
      return { name, text, id: data.metadata.id, expect: /^# expect: (\S+)$/m.exec(text)?.[1] };
    });
}

describe("conformance: valid documents resolve", () => {
  it.each(yamlFiles("valid"))("$name", async ({ text, id }) => {
    const resolved = await resolvePersona(id, createMemorySource({ [id]: text }));
    expect(resolved.lineage.map((entry) => entry.id)).toEqual([id]);
  });
});

describe("conformance: semantic rules", () => {
  it.each(yamlFiles("invalid-semantic"))(
    "$name fails with $expect",
    async ({ text, id, expect: code }) => {
      const codes = await issueCodes(() => resolvePersona(id, createMemorySource({ [id]: text })));
      expect(codes).toContain(code);
    },
  );
});

describe("conformance: resolution", () => {
  const casesDir = `${conformanceDir}/resolution`;
  const cases = readdirSync(casesDir).sort();

  it.each(cases)("%s", async (name) => {
    const spec = parse(readFileSync(`${casesDir}/${name}/case.yaml`, "utf8")) as {
      resolve: string;
      expect: { error?: string; lineage?: string[]; document?: unknown };
    };
    const source = createDirectorySource(`${casesDir}/${name}/personas`);

    if (spec.expect.error) {
      expect(await issueCodes(() => resolvePersona(spec.resolve, source))).toContain(
        spec.expect.error,
      );
      return;
    }
    const resolved = await resolvePersona(spec.resolve, source);
    expect(resolved.lineage.map((entry) => entry.id)).toEqual(spec.expect.lineage);
    expect(resolved.document).toEqual(spec.expect.document);
    // Canonical key order is part of the contract, not just the values.
    expect(JSON.stringify(resolved.document)).toBe(JSON.stringify(spec.expect.document));
  });
});
