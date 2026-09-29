import type { PersonaDocument } from "@vernaculo/schema";
import { stringify } from "yaml";
import { canonicalizeDocument } from "./canonical.ts";

export interface SerializeOptions {
  /** Comment lines written at the top of the file (without the leading "#"). */
  readonly header?: readonly string[] | undefined;
}

/**
 * Serializes a persona document deterministically: canonical key order, no line
 * folding, LF line endings. Strings that YAML 1.1 parsers would misread (dates,
 * yes/no, ...) are quoted so the file stays portable across YAML libraries.
 */
export function serializePersonaYaml(
  document: PersonaDocument,
  options: SerializeOptions = {},
): string {
  const body = stringify(canonicalizeDocument(document), { lineWidth: 0, version: "1.1" });
  const header = (options.header ?? []).map((line) => (line ? `# ${line}` : "#")).join("\n");
  return header ? `${header}\n${body}` : body;
}
