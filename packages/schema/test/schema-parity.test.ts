import { describe, expect, it } from "vitest";
import { z } from "zod";
import { personaDocumentSchema, personaJsonSchema } from "../src/index.ts";

// Structural parity: every node of the canonical JSON Schema and of the JSON
// Schema generated from the Zod mirror must carry the same constraints
// (properties, required, closed objects, enums, consts, patterns, bounds).
// Fixture-based conformance catches behavioral drift; this catches drift the
// fixtures do not exercise.

type Node = { readonly [key: string]: unknown };

const FINGERPRINT_KEYS = [
  "type",
  "const",
  "enum",
  "pattern",
  "minLength",
  "maxLength",
  "minimum",
  "maximum",
  "minItems",
  "additionalProperties",
] as const;

function deref(node: Node, root: Node): Node {
  const ref = node.$ref;
  if (typeof ref !== "string") return node;
  const name = ref.replace("#/$defs/", "");
  const defs = root.$defs as Record<string, Node>;
  const target = defs[name];
  if (!target) throw new Error(`Unresolvable $ref ${ref}`);
  const { $ref: _ignored, ...siblings } = node;
  return deref({ ...target, ...siblings }, root);
}

function fingerprint(node: Node): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const key of FINGERPRINT_KEYS) {
    if (node[key] !== undefined) out[key] = node[key];
  }
  // The canonical schema omits the redundant `type` next to const/enum.
  if ("const" in out || "enum" in out) delete out.type;
  // RegExp#source escapes "/"; JSON patterns do not need to.
  if (typeof out.pattern === "string") out.pattern = out.pattern.replaceAll("\\/", "/");
  return out;
}

function collect(node: Node, root: Node, path: string, out: Map<string, unknown>): void {
  const resolved = deref(node, root);
  out.set(path, fingerprint(resolved));
  const properties = resolved.properties as Record<string, Node> | undefined;
  if (properties) {
    const required = [...((resolved.required as string[] | undefined) ?? [])].sort();
    out.set(`${path}#required`, required);
    out.set(`${path}#properties`, Object.keys(properties).sort());
    for (const [key, child] of Object.entries(properties)) {
      collect(child, root, `${path}/${key}`, out);
    }
  }
  const items = resolved.items as Node | undefined;
  if (items) collect(items, root, `${path}[]`, out);
}

function shape(schema: Node): Map<string, unknown> {
  const out = new Map<string, unknown>();
  collect(schema, schema, "", out);
  return out;
}

describe("schema parity", () => {
  const canonical = shape(personaJsonSchema);
  const fromZod = shape(z.toJSONSchema(personaDocumentSchema) as Node);

  it("covers the same set of paths", () => {
    expect([...fromZod.keys()].sort()).toEqual([...canonical.keys()].sort());
  });

  it.each([...canonical.keys()])("constraints at %s match", (path) => {
    expect(fromZod.get(path)).toEqual(canonical.get(path));
  });
});
