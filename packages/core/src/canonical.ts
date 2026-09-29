import { type PersonaDocument, personaJsonSchema } from "@vernaculo/schema";

type SchemaNode = { readonly [key: string]: unknown };

const root = personaJsonSchema as SchemaNode;
const defs = root.$defs as Record<string, SchemaNode>;

function deref(node: SchemaNode): SchemaNode {
  const ref = node.$ref;
  if (typeof ref !== "string") return node;
  const target = defs[ref.replace("#/$defs/", "")];
  return target ? deref(target) : node;
}

function isEmptyContainer(value: unknown): boolean {
  if (Array.isArray(value)) return value.length === 0;
  return typeof value === "object" && value !== null && Object.keys(value).length === 0;
}

function canonicalize(value: unknown, node: SchemaNode): unknown {
  const schema = deref(node);
  if (Array.isArray(value)) {
    const items = schema.items as SchemaNode | undefined;
    return value.map((item) => (items ? canonicalize(item, items) : item));
  }
  if (typeof value !== "object" || value === null) return value;

  const record = value as Record<string, unknown>;
  const properties = (schema.properties ?? {}) as Record<string, SchemaNode>;
  const ordered: Record<string, unknown> = {};
  const known = Object.keys(properties).filter((key) => key in record);
  const unknown = Object.keys(record)
    .filter((key) => !(key in properties))
    .sort();
  for (const key of known) {
    const property = properties[key];
    const child = property ? canonicalize(record[key], property) : record[key];
    if (child !== undefined && !isEmptyContainer(child)) ordered[key] = child;
  }
  for (const key of unknown) ordered[key] = record[key];
  return ordered;
}

/**
 * Returns the canonical form of a document: keys in the order the normative
 * JSON Schema declares them, `undefined` values and empty containers removed.
 * Canonical form makes resolution output and serialization deterministic.
 */
export function canonicalizeDocument(document: PersonaDocument): PersonaDocument {
  return canonicalize(document, root) as PersonaDocument;
}
