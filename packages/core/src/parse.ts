import { type PersonaDocument, personaDocumentSchema } from "@vernaculo/schema";
import { parseDocument } from "yaml";
import { type Issue, throwIfIssues, vernaculoError } from "./errors.ts";

export interface ParseOptions {
  /** Label used in error messages, typically a file path. */
  readonly origin?: string | undefined;
}

/**
 * Parses and structurally validates one persona document (YAML 1.2, restricted
 * to the JSON data model). Semantic rules are applied by `validatePersonaDocument`
 * and during resolution.
 */
export function parsePersonaYaml(text: string, options: ParseOptions = {}): PersonaDocument {
  const { origin } = options;
  const yamlDocument = parseDocument(text, { uniqueKeys: true, prettyErrors: false });
  const syntaxIssues: Issue[] = yamlDocument.errors.map((error) => ({
    code: "yaml-syntax",
    message: error.message.split("\n")[0] ?? error.message,
    origin,
  }));
  throwIfIssues(syntaxIssues);

  const data: unknown = yamlDocument.toJS({ maxAliasCount: 100 });
  throwIfIssues(findNonJsonValues(data, "", origin));
  return validateStructure(data, origin);
}

/** Validates an already-parsed value against the persona schema. */
export function validateStructure(data: unknown, origin?: string): PersonaDocument {
  const result = personaDocumentSchema.safeParse(data);
  if (result.success) return result.data;
  throw vernaculoError(
    result.error.issues.map((issue) => ({
      code: "schema-violation",
      message: issue.message,
      path: toPointer(issue.path),
      origin,
    })),
  );
}

function toPointer(path: readonly PropertyKey[]): string {
  return path.map((segment) => `/${String(segment)}`).join("");
}

/** Rejects YAML values the JSON data model cannot represent (.nan, .inf, binary, ...). */
function findNonJsonValues(value: unknown, path: string, origin: string | undefined): Issue[] {
  if (value === null || typeof value === "string" || typeof value === "boolean") return [];
  if (typeof value === "number") {
    return Number.isFinite(value)
      ? []
      : [{ code: "non-json-value", message: `Non-finite number ${value}`, path, origin }];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => findNonJsonValues(item, `${path}/${index}`, origin));
  }
  if (typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.entries(value).flatMap(([key, item]) =>
      findNonJsonValues(item, `${path}/${key}`, origin),
    );
  }
  return [{ code: "non-json-value", message: "Value is not representable in JSON", path, origin }];
}
