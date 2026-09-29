import {
  API_VERSION,
  MATURITY_LEVELS,
  type Maturity,
  PERSONA_KIND,
  type PersonaDocument,
  type PhoneticSpellingPolicy,
} from "@vernaculo/schema";
import { canonicalizeDocument } from "./canonical.ts";
import { type Issue, throwIfIssues, vernaculoError } from "./errors.ts";
import { isPersonaId } from "./ids.ts";
import {
  type AnyItem,
  emptyLists,
  extractLists,
  itemKey,
  LIST_NAMES,
  LIST_SPECS,
  type ListName,
  listItems,
  POSITIVE_LISTS,
  setListItems,
} from "./lists.ts";
import { parsePersonaYaml } from "./parse.ts";
import { checkDocument } from "./validate.ts";

/** Where persona documents come from. Implementations must not require network access. */
export interface PersonaSource {
  /** Returns the YAML text of the persona with this id, or `undefined` if it does not exist. */
  read(id: string): Promise<SourceEntry | undefined>;
}

export interface SourceEntry {
  readonly text: string;
  /** Human-readable location used in error messages (file path, label, ...). */
  readonly origin: string;
}

export interface LineageEntry {
  readonly id: string;
  readonly version: string;
  readonly maturity: Maturity;
  readonly license?: string | undefined;
  readonly origin: string;
}

export interface ResolvedPersona {
  /**
   * The flattened persona: a standalone, canonical document without `extends`.
   * `metadata` is the leaf's own metadata, except `maturity`, which is the least
   * mature level found in the lineage.
   */
  readonly document: PersonaDocument;
  /** Every document that contributed, from the root ancestor to the requested persona. */
  readonly lineage: readonly LineageEntry[];
}

export const MAX_INHERITANCE_DEPTH = 32;

interface LoadedDocument {
  readonly document: PersonaDocument;
  readonly origin: string;
}

/** Loads a persona by id from `source` and resolves its whole `extends` lineage. */
export async function resolvePersona(id: string, source: PersonaSource): Promise<ResolvedPersona> {
  const leaf = await loadById(id, source, undefined);
  return resolveLoaded(leaf, source);
}

/**
 * Resolves an already-parsed document (for example a project file such as
 * `acme-salvador.yaml` that is not stored in a persona root). Its ancestors are
 * read from `source`.
 */
export async function resolvePersonaDocument(
  document: PersonaDocument,
  source: PersonaSource,
  origin = "<document>",
): Promise<ResolvedPersona> {
  return resolveLoaded({ document, origin }, source);
}

/** A source backed by an in-memory map of id → YAML text. Useful for tests and bundlers. */
export function createMemorySource(documents: Readonly<Record<string, string>>): PersonaSource {
  return {
    read(id) {
      const text = Object.hasOwn(documents, id) ? documents[id] : undefined;
      return Promise.resolve(text === undefined ? undefined : { text, origin: `memory:${id}` });
    },
  };
}

async function loadById(
  id: string,
  source: PersonaSource,
  requiredBy: LoadedDocument | undefined,
): Promise<LoadedDocument> {
  const origin = requiredBy?.origin;
  if (!isPersonaId(id)) {
    throw vernaculoError([
      { code: "invalid-id", message: `"${id}" is not a valid persona id`, origin },
    ]);
  }
  const entry = await source.read(id);
  if (!entry) {
    throw vernaculoError([
      requiredBy
        ? {
            code: "parent-not-found",
            message: `Parent persona "${id}" (extended by "${requiredBy.document.metadata.id}") was not found`,
            path: "/extends",
            origin,
          }
        : { code: "persona-not-found", message: `Persona "${id}" was not found` },
    ]);
  }
  const document = parsePersonaYaml(entry.text, { origin: entry.origin });
  if (document.metadata.id !== id) {
    throw vernaculoError([
      {
        code: "id-mismatch",
        message: `Expected a document with metadata.id "${id}" but found "${document.metadata.id}"`,
        path: "/metadata/id",
        origin: entry.origin,
      },
    ]);
  }
  return { document, origin: entry.origin };
}

async function collectLineage(leaf: LoadedDocument, source: PersonaSource) {
  const chain: LoadedDocument[] = [leaf];
  const seen = new Set([leaf.document.metadata.id]);
  let current = leaf;
  while (current.document.extends !== undefined) {
    const parentId = current.document.extends;
    if (seen.has(parentId)) {
      throw vernaculoError([
        {
          code: "inheritance-cycle",
          message: `Inheritance cycle: ${[...seen, parentId].join(" -> ")}`,
          path: "/extends",
          origin: current.origin,
        },
      ]);
    }
    if (chain.length >= MAX_INHERITANCE_DEPTH) {
      throw vernaculoError([
        {
          code: "inheritance-too-deep",
          message: `Lineage exceeds ${MAX_INHERITANCE_DEPTH} levels`,
          origin: current.origin,
        },
      ]);
    }
    current = await loadById(parentId, source, current);
    seen.add(parentId);
    chain.push(current);
  }
  return chain.reverse();
}

async function resolveLoaded(
  leaf: LoadedDocument,
  source: PersonaSource,
): Promise<ResolvedPersona> {
  const chain = await collectLineage(leaf, source);

  const issues: Issue[] = chain.flatMap(({ document, origin }) => checkDocument(document, origin));
  for (let index = 1; index < chain.length; index++) {
    const parent = chain[index - 1];
    const child = chain[index];
    if (parent && child && parent.document.metadata.language !== child.document.metadata.language) {
      issues.push({
        code: "lineage-language-mismatch",
        message: `"${child.document.metadata.id}" (${child.document.metadata.language}) extends "${parent.document.metadata.id}" (${parent.document.metadata.language}); a lineage has a single language`,
        path: "/extends",
        origin: child.origin,
      });
    }
  }
  throwIfIssues(issues);

  const document = flatten(chain.map((entry) => entry.document));
  throwIfIssues(checkResolved(document, leaf.origin));

  return {
    document,
    lineage: chain.map(({ document: { metadata }, origin }) => ({
      id: metadata.id,
      version: metadata.version,
      maturity: metadata.maturity,
      license: metadata.license,
      origin,
    })),
  };
}

/** Merges a lineage (root first) into one canonical document. See inheritance-and-composition.md. */
function flatten(chain: readonly PersonaDocument[]): PersonaDocument {
  const lists = emptyLists();
  let defaultIntensity: number | undefined;
  let phoneticSpelling: PhoneticSpellingPolicy | undefined;
  let provenanceNotes: string | undefined;

  for (const document of chain) {
    const own = extractLists(document);

    // Lineage-ordered cancellation: a descendant that discourages a form removes
    // the inherited positive entries, and a descendant that uses a form removes
    // the inherited discouragement.
    const ownDiscouraged = keySet("discouraged", own.discouraged);
    const ownPositive = new Set(POSITIVE_LISTS.flatMap((name) => [...keySet(name, own[name])]));
    for (const name of POSITIVE_LISTS) {
      setListItems(
        lists,
        name,
        listItems(lists, name).filter((item) => !ownDiscouraged.has(itemKey(name, item))),
      );
    }
    lists.discouraged = lists.discouraged.filter(
      (item) => !ownPositive.has(itemKey("discouraged", item)),
    );

    for (const name of LIST_NAMES) {
      setListItems(lists, name, mergeKeyed(name, listItems(lists, name), listItems(own, name)));
    }

    defaultIntensity = document.regionality?.defaultIntensity ?? defaultIntensity;
    phoneticSpelling = document.linguistics?.orthography?.phoneticSpelling ?? phoneticSpelling;
    provenanceNotes = document.provenance?.notes ?? provenanceNotes;
  }

  const leaf = chain.at(-1);
  if (!leaf) throw new TypeError("flatten() requires a non-empty lineage");

  return canonicalizeDocument({
    apiVersion: API_VERSION,
    kind: PERSONA_KIND,
    metadata: { ...leaf.metadata, maturity: leastMature(chain.map((d) => d.metadata.maturity)) },
    regionality: { defaultIntensity },
    linguistics: {
      vocabulary: {
        preferred: lists.preferred,
        contextual: lists.contextual,
        discouraged: lists.discouraged,
      },
      discourse: { markers: lists.markers },
      morphosyntax: { patterns: lists.patterns },
      pragmatics: {
        addressForms: lists.addressForms,
        greetings: lists.greetings,
        acknowledgements: lists.acknowledgements,
        disagreements: lists.disagreements,
        closings: lists.closings,
      },
      orthography: { phoneticSpelling },
    },
    examples: lists.examples,
    antiPatterns: lists.antiPatterns,
    provenance: { sources: lists.sources, notes: provenanceNotes },
  });
}

function keySet(name: ListName, items: readonly AnyItem[]): Set<string> {
  return new Set(items.map((item) => itemKey(name, item)));
}

/** Entries with an existing key replace it in place; new entries are appended. */
function mergeKeyed(name: ListName, base: readonly AnyItem[], own: readonly AnyItem[]): AnyItem[] {
  const result = [...base];
  const positions = new Map(result.map((item, index) => [itemKey(name, item), index]));
  for (const item of own) {
    const key = itemKey(name, item);
    const position = positions.get(key);
    if (position === undefined) {
      positions.set(key, result.length);
      result.push(item);
    } else {
      result[position] = item;
    }
  }
  return result;
}

function leastMature(levels: readonly Maturity[]): Maturity {
  const rank = Math.min(...levels.map((level) => MATURITY_LEVELS.indexOf(level)));
  return MATURITY_LEVELS[rank] ?? "fixture";
}

/** Semantic rules that need the whole lineage. */
function checkResolved(document: PersonaDocument, origin: string): Issue[] {
  const issues: Issue[] = [];
  if (document.regionality?.defaultIntensity === undefined) {
    issues.push({
      code: "missing-default-intensity",
      message: "No persona in the lineage defines regionality.defaultIntensity",
      path: "/regionality/defaultIntensity",
      origin,
    });
  }

  const lists = extractLists(document);
  const sourceIds = new Set(lists.sources.map((source) => source.id));
  const isFixture = document.metadata.maturity === "fixture";

  for (const name of LIST_NAMES) {
    listItems(lists, name).forEach((item, index) => {
      const path = `${LIST_SPECS[name].pointer}/${index}`;
      if ("sources" in item) {
        for (const ref of item.sources ?? []) {
          if (!sourceIds.has(ref)) {
            issues.push({
              code: "unknown-source",
              message: `Source "${ref}" is not defined in provenance.sources of the lineage`,
              path,
              origin,
            });
          }
        }
      }
      if ("evidence" in item && item.evidence === "synthetic" && !isFixture) {
        issues.push({
          code: "synthetic-outside-fixture",
          message: `Synthetic evidence is only allowed when the effective maturity is "fixture" (found "${document.metadata.maturity}")`,
          path,
          origin,
        });
      }
    });
  }
  return issues;
}
