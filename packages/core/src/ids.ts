import { PERSONA_ID_PATTERN } from "@vernaculo/schema";

/** True when `id` is a syntactically valid persona id (and therefore safe to map to a path). */
export function isPersonaId(id: string): boolean {
  return id.length <= 128 && PERSONA_ID_PATTERN.test(id);
}

/** The BCP 47 language tag that starts every persona id. */
export function languageOfId(id: string): string {
  return id.split("/")[0] ?? "";
}

/**
 * Comparison key for list entries (terms, forms, ids): Unicode NFC, then
 * locale-independent lowercasing. "Termo" and "termo" are the same entry.
 */
export function entryKey(value: string): string {
  return value.normalize("NFC").toLowerCase();
}
