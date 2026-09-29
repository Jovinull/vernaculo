import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { createMemorySource, MAX_INHERITANCE_DEPTH, resolvePersona } from "../src/index.ts";
import { createDirectorySource, listPersonas, loadPersona } from "../src/node.ts";
import { fixturesRoot, issueCodes } from "./helpers.ts";

const source = createDirectorySource(fixturesRoot);
const scratch = mkdtempSync(join(tmpdir(), "vernaculo-core-"));
afterAll(() => rmSync(scratch, { recursive: true, force: true }));

function persona(id: string, extra = "", parent?: string): string {
  return [
    "apiVersion: vernaculo.dev/v1alpha1",
    "kind: Persona",
    parent ? `extends: ${parent}` : "",
    "metadata:",
    `  id: ${id}`,
    "  name: Test",
    `  language: ${id.split("/")[0]}`,
    "  version: 0.1.0",
    "  maturity: fixture",
    "regionality:",
    "  defaultIntensity: 0.3",
    extra,
  ].join("\n");
}

describe("resolvePersona", () => {
  it("records the lineage from root ancestor to leaf", async () => {
    const resolved = await resolvePersona("pt-BR/x-fixture/cidade-b", source);
    expect(resolved.lineage.map((entry) => entry.id)).toEqual([
      "pt-BR/x-fixture",
      "pt-BR/x-fixture/cidade-b",
    ]);
    expect(resolved.document.extends).toBeUndefined();
  });

  it("lets a descendant discourage a form the ancestor uses", async () => {
    const { document } = await resolvePersona("pt-BR/x-fixture/cidade-b", source);
    const preferred = document.linguistics?.vocabulary?.preferred?.map((item) => item.term);
    const discouraged = document.linguistics?.vocabulary?.discouraged?.map((item) => item.term);
    expect(preferred).not.toContain("termo-sintético-comum");
    expect(discouraged).toEqual(["termo-sintético-evitado", "termo-sintético-comum"]);
  });

  it("inherits scalars that the descendant does not override", async () => {
    const a = await resolvePersona("pt-BR/x-fixture/cidade-a", source);
    const b = await resolvePersona("pt-BR/x-fixture/cidade-b", source);
    expect(a.document.regionality?.defaultIntensity).toBe(0.25);
    expect(b.document.regionality?.defaultIntensity).toBe(0.3);
  });

  it("is deterministic", async () => {
    const first = await resolvePersona("pt-BR/x-fixture/cidade-a", source);
    const second = await resolvePersona(
      "pt-BR/x-fixture/cidade-a",
      createDirectorySource(fixturesRoot),
    );
    expect(JSON.stringify(second)).toBe(JSON.stringify(first));
  });

  it("searches roots in order, so an earlier root can shadow a persona", async () => {
    const override = join(scratch, "override");
    mkdirSync(join(override, "pt-BR", "x-fixture"), { recursive: true });
    writeFileSync(
      join(override, "pt-BR", "x-fixture", "persona.yaml"),
      persona("pt-BR/x-fixture").replace("0.3", "0.9"),
    );
    // cidade-b does not set defaultIntensity, so it inherits the shadowing parent's value.
    const resolved = await resolvePersona(
      "pt-BR/x-fixture/cidade-b",
      createDirectorySource([override, fixturesRoot]),
    );
    expect(resolved.document.regionality?.defaultIntensity).toBe(0.9);
    expect(resolved.lineage[0]?.origin).toContain("override");
  });

  it("resolves a project file that extends a persona from a root", async () => {
    const file = join(scratch, "acme-cidade-a.yaml");
    writeFileSync(
      file,
      persona(
        "pt-BR/x-acme/cidade-a",
        "linguistics:\n  vocabulary:\n    discouraged:\n      - term: termo-sintético-a\n",
        "pt-BR/x-fixture/cidade-a",
      ),
    );
    const resolved = await loadPersona(file, { roots: fixturesRoot });
    expect(resolved.lineage.map((entry) => entry.id)).toEqual([
      "pt-BR/x-fixture",
      "pt-BR/x-fixture/cidade-a",
      "pt-BR/x-acme/cidade-a",
    ]);
    const preferred = resolved.document.linguistics?.vocabulary?.preferred?.map((i) => i.term);
    expect(preferred).not.toContain("termo-sintético-a");
  });

  it("rejects ids that could escape a persona root", async () => {
    expect(await issueCodes(() => resolvePersona("../../etc", source))).toEqual(["invalid-id"]);
    const memory = createMemorySource({ "pt-BR/x": persona("pt-BR/x", "", "pt-BR/../x") });
    expect(await issueCodes(() => resolvePersona("pt-BR/x", memory))).toContain("schema-violation");
  });

  it("reports a missing persona", async () => {
    expect(await issueCodes(() => resolvePersona("pt-BR/x-fixture/nowhere", source))).toEqual([
      "persona-not-found",
    ]);
  });

  it("bounds the lineage depth", async () => {
    const documents: Record<string, string> = {};
    for (let level = 0; level <= MAX_INHERITANCE_DEPTH; level++) {
      const id = `pt-BR/x-deep/l${level}`;
      documents[id] = persona(id, "", level > 0 ? `pt-BR/x-deep/l${level - 1}` : undefined);
    }
    const leaf = `pt-BR/x-deep/l${MAX_INHERITANCE_DEPTH}`;
    expect(await issueCodes(() => resolvePersona(leaf, createMemorySource(documents)))).toEqual([
      "inheritance-too-deep",
    ]);
  });
});

describe("listPersonas", () => {
  it("lists ids in a stable order, with forward slashes on every platform", async () => {
    const listed = await listPersonas(fixturesRoot);
    expect(listed.map((entry) => entry.id)).toEqual([
      "pt-BR/x-fixture",
      "pt-BR/x-fixture/cidade-a",
      "pt-BR/x-fixture/cidade-b",
    ]);
  });

  it("returns nothing for a missing root", async () => {
    expect(await listPersonas(join(scratch, "does-not-exist"))).toEqual([]);
  });
});
