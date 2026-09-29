import type {
  AntiPattern,
  ContextualItem,
  DiscouragedItem,
  DiscourseMarker,
  Example,
  LexicalItem,
  MorphosyntaxPattern,
  PersonaDocument,
  PragmaticForm,
  Source,
} from "@vernaculo/schema";
import { entryKey } from "./ids.ts";

/** Every keyed list of a persona document, flattened out of its nesting. */
export interface PersonaLists {
  preferred: LexicalItem[];
  contextual: ContextualItem[];
  discouraged: DiscouragedItem[];
  markers: DiscourseMarker[];
  patterns: MorphosyntaxPattern[];
  addressForms: PragmaticForm[];
  greetings: PragmaticForm[];
  acknowledgements: PragmaticForm[];
  disagreements: PragmaticForm[];
  closings: PragmaticForm[];
  examples: Example[];
  antiPatterns: AntiPattern[];
  sources: Source[];
}

export type ListName = keyof PersonaLists;

/**
 * positive: surface forms the persona uses. discouraged: surface forms it avoids.
 * The two cancel each other across a lineage (see resolve.ts).
 */
type Role = "positive" | "discouraged" | "other";

interface ListSpec {
  readonly pointer: string;
  readonly role: Role;
  readonly keyField: "term" | "form" | "id";
}

export const LIST_SPECS: { readonly [K in ListName]: ListSpec } = {
  preferred: { pointer: "/linguistics/vocabulary/preferred", role: "positive", keyField: "term" },
  contextual: { pointer: "/linguistics/vocabulary/contextual", role: "positive", keyField: "term" },
  discouraged: {
    pointer: "/linguistics/vocabulary/discouraged",
    role: "discouraged",
    keyField: "term",
  },
  markers: { pointer: "/linguistics/discourse/markers", role: "positive", keyField: "form" },
  patterns: { pointer: "/linguistics/morphosyntax/patterns", role: "other", keyField: "id" },
  addressForms: {
    pointer: "/linguistics/pragmatics/addressForms",
    role: "positive",
    keyField: "form",
  },
  greetings: { pointer: "/linguistics/pragmatics/greetings", role: "positive", keyField: "form" },
  acknowledgements: {
    pointer: "/linguistics/pragmatics/acknowledgements",
    role: "positive",
    keyField: "form",
  },
  disagreements: {
    pointer: "/linguistics/pragmatics/disagreements",
    role: "positive",
    keyField: "form",
  },
  closings: { pointer: "/linguistics/pragmatics/closings", role: "positive", keyField: "form" },
  examples: { pointer: "/examples", role: "other", keyField: "id" },
  antiPatterns: { pointer: "/antiPatterns", role: "other", keyField: "id" },
  sources: { pointer: "/provenance/sources", role: "other", keyField: "id" },
};

export const LIST_NAMES: readonly ListName[] = Object.keys(LIST_SPECS) as ListName[];

export const POSITIVE_LISTS: readonly ListName[] = LIST_NAMES.filter(
  (name) => LIST_SPECS[name].role === "positive",
);

type AnyItem = PersonaLists[ListName][number];

/** The comparison key of a list item (NFC + lowercase of its term/form/id). */
export function itemKey(name: ListName, item: AnyItem): string {
  const field = LIST_SPECS[name].keyField;
  return entryKey(String((item as unknown as Record<string, unknown>)[field]));
}

export function extractLists(document: PersonaDocument): PersonaLists {
  const linguistics = document.linguistics;
  const vocabulary = linguistics?.vocabulary;
  const pragmatics = linguistics?.pragmatics;
  return {
    preferred: [...(vocabulary?.preferred ?? [])],
    contextual: [...(vocabulary?.contextual ?? [])],
    discouraged: [...(vocabulary?.discouraged ?? [])],
    markers: [...(linguistics?.discourse?.markers ?? [])],
    patterns: [...(linguistics?.morphosyntax?.patterns ?? [])],
    addressForms: [...(pragmatics?.addressForms ?? [])],
    greetings: [...(pragmatics?.greetings ?? [])],
    acknowledgements: [...(pragmatics?.acknowledgements ?? [])],
    disagreements: [...(pragmatics?.disagreements ?? [])],
    closings: [...(pragmatics?.closings ?? [])],
    examples: [...(document.examples ?? [])],
    antiPatterns: [...(document.antiPatterns ?? [])],
    sources: [...(document.provenance?.sources ?? [])],
  };
}

export function emptyLists(): PersonaLists {
  const lists = {} as Record<ListName, AnyItem[]>;
  for (const name of LIST_NAMES) lists[name] = [];
  return lists as PersonaLists;
}

/** Items of a list as a loosely typed array, for generic algorithms. */
export function listItems(lists: PersonaLists, name: ListName): AnyItem[] {
  return lists[name];
}

export function setListItems(lists: PersonaLists, name: ListName, items: AnyItem[]): void {
  (lists as Record<ListName, AnyItem[]>)[name] = items;
}

export type { AnyItem };
