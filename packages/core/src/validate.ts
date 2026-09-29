import type { PersonaDocument } from "@vernaculo/schema";
import { type Issue, VernaculoError } from "./errors.ts";
import { languageOfId } from "./ids.ts";
import {
  extractLists,
  itemKey,
  LIST_NAMES,
  LIST_SPECS,
  listItems,
  POSITIVE_LISTS,
} from "./lists.ts";
import { validateStructure } from "./parse.ts";

export type ValidationResult =
  | { readonly ok: true; readonly document: PersonaDocument }
  | { readonly ok: false; readonly issues: readonly Issue[] };

/**
 * Validates one document in isolation: structure plus the document-level
 * semantic rules. Rules that need the whole lineage (source references,
 * synthetic content, default intensity) are checked by `resolvePersona`.
 */
export function validatePersonaDocument(data: unknown, origin?: string): ValidationResult {
  let document: PersonaDocument;
  try {
    document = validateStructure(data, origin);
  } catch (error) {
    if (error instanceof VernaculoError) return { ok: false, issues: error.issues };
    throw error;
  }
  const issues = checkDocument(document, origin);
  return issues.length === 0 ? { ok: true, document } : { ok: false, issues };
}

/** Document-level semantic rules. Returns every violation found. */
export function checkDocument(document: PersonaDocument, origin?: string): Issue[] {
  const issues: Issue[] = [];
  const { id, language } = document.metadata;

  if (languageOfId(id) !== language) {
    issues.push({
      code: "language-mismatch",
      message: `metadata.language "${language}" does not match the language segment of id "${id}"`,
      path: "/metadata/language",
      origin,
    });
  }

  const lists = extractLists(document);

  for (const name of LIST_NAMES) {
    const seen = new Set<string>();
    listItems(lists, name).forEach((item, index) => {
      const key = itemKey(name, item);
      if (seen.has(key)) {
        issues.push({
          code: "duplicate-key",
          message: `Duplicate entry "${key}" (keys compare after NFC normalization and lowercasing)`,
          path: `${LIST_SPECS[name].pointer}/${index}`,
          origin,
        });
      }
      seen.add(key);
    });
  }

  const discouraged = new Set(lists.discouraged.map((item) => itemKey("discouraged", item)));
  for (const name of POSITIVE_LISTS) {
    listItems(lists, name).forEach((item, index) => {
      const key = itemKey(name, item);
      if (discouraged.has(key)) {
        issues.push({
          code: "conflicting-forms",
          message: `"${key}" is both used and discouraged in the same document`,
          path: `${LIST_SPECS[name].pointer}/${index}`,
          origin,
        });
      }
    });
  }

  for (const name of LIST_NAMES) {
    listItems(lists, name).forEach((item, index) => {
      if (!("evidence" in item)) return;
      const needsSource = item.evidence === "attested" || item.evidence === "reported";
      if (needsSource && !item.sources?.length) {
        issues.push({
          code: "evidence-without-source",
          message: `Evidence "${item.evidence}" requires at least one source`,
          path: `${LIST_SPECS[name].pointer}/${index}`,
          origin,
        });
      }
    });
  }

  return issues;
}
