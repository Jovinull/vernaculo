// Node.js filesystem helpers. Kept out of the main entry so that
// "@vernaculo/core" stays usable in browsers, edge runtimes and bundlers.
import { readdir, readFile } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";
import { isPersonaId } from "./ids.ts";
import { parsePersonaYaml } from "./parse.ts";
import {
  type PersonaSource,
  type ResolvedPersona,
  resolvePersona,
  resolvePersonaDocument,
} from "./resolve.ts";

/** File name of a persona inside a persona root: `<root>/<id>/persona.yaml`. */
export const PERSONA_FILE_NAME = "persona.yaml";

/** Default persona root, relative to the current working directory. */
export const DEFAULT_ROOT = "personas";

/**
 * Reads personas from one or more persona roots. Roots are searched in order;
 * the first root containing an id wins.
 */
export function createDirectorySource(roots: string | readonly string[]): PersonaSource {
  const rootList = typeof roots === "string" ? [roots] : [...roots];
  return {
    async read(id) {
      if (!isPersonaId(id)) return undefined;
      for (const root of rootList) {
        const path = join(root, ...id.split("/"), PERSONA_FILE_NAME);
        const text = await readTextIfExists(path);
        if (text !== undefined) return { text, origin: path };
      }
      return undefined;
    },
  };
}

export interface ListedPersona {
  readonly id: string;
  readonly root: string;
  readonly path: string;
  /** True when an earlier root provides the same id (this entry is never resolved). */
  readonly shadowed: boolean;
}

/** Lists every `persona.yaml` under the roots, sorted by id then root order. */
export async function listPersonas(roots: string | readonly string[]): Promise<ListedPersona[]> {
  const rootList = typeof roots === "string" ? [roots] : [...roots];
  const seen = new Set<string>();
  const listed: ListedPersona[] = [];
  for (const root of rootList) {
    const found = (await findPersonaFiles(root)).sort(compareByCodeUnits);
    for (const path of found) {
      const id = relative(root, path).split(sep).slice(0, -1).join("/");
      listed.push({ id, root, path, shadowed: seen.has(id) });
      seen.add(id);
    }
  }
  return listed.sort((a, b) => compareByCodeUnits(a.id, b.id));
}

export interface LoadOptions {
  /** Persona roots used to resolve ids and `extends`. Defaults to `["personas"]`. */
  readonly roots?: string | readonly string[] | undefined;
}

/**
 * Loads and resolves a persona. `target` is either a persona id
 * (`pt-BR/ba/salvador`) or a path to a YAML file (`./acme-salvador.yaml`)
 * whose `extends` chain is resolved through the roots.
 */
export async function loadPersona(
  target: string,
  options: LoadOptions = {},
): Promise<ResolvedPersona> {
  const source = createDirectorySource(options.roots ?? DEFAULT_ROOT);
  if (/\.ya?ml$/i.test(target)) {
    const path = resolve(target);
    const text = await readFile(path, "utf8");
    return resolvePersonaDocument(parsePersonaYaml(text, { origin: path }), source, path);
  }
  return resolvePersona(target, source);
}

async function readTextIfExists(path: string): Promise<string | undefined> {
  try {
    return await readFile(path, "utf8");
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT" || code === "ENOTDIR") return undefined;
    throw error;
  }
}

async function findPersonaFiles(directory: string): Promise<string[]> {
  let entries: import("node:fs").Dirent[];
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
  const files: string[] = [];
  for (const entry of entries) {
    if (entry.isFile() && entry.name === PERSONA_FILE_NAME) {
      files.push(join(directory, entry.name));
    } else if (
      entry.isDirectory() &&
      !entry.name.startsWith(".") &&
      entry.name !== "node_modules"
    ) {
      files.push(...(await findPersonaFiles(join(directory, entry.name))));
    }
  }
  return files;
}

function compareByCodeUnits(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
