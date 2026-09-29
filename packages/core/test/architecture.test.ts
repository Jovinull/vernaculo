import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { repoRoot } from "./helpers.ts";

// Executable architecture invariants (docs/architecture/overview.md, ADR-0001,
// ADR-0002, ADR-0011). They scan every package's source and manifest.

const packagesDir = join(repoRoot, "packages");
const packages = readdirSync(packagesDir).sort();

function sourceFiles(pkg: string): { file: string; text: string }[] {
  const dir = join(packagesDir, pkg, "src");
  return readdirSync(dir, { recursive: true, encoding: "utf8" })
    .filter((file) => file.endsWith(".ts"))
    .map((file) => ({ file, text: readFileSync(join(dir, file), "utf8") }));
}

function imports(text: string): string[] {
  const specifiers = [...text.matchAll(/(?:from|import)\s*\(?\s*["']([^"']+)["']/g)];
  return specifiers.map((match) => match[1] ?? "");
}

function manifest(pkg: string): Record<string, Record<string, string> | undefined> {
  return JSON.parse(readFileSync(join(packagesDir, pkg, "package.json"), "utf8"));
}

/** Provider SDKs and network clients never belong to Vernáculo packages. */
const FORBIDDEN = [
  /^openai$/,
  /^@openai\//,
  /^@anthropic-ai\//,
  /^@google\//,
  /^@google-cloud\//,
  /^@modelcontextprotocol\//,
  /^(node:)?(http|https|http2|net|tls|dgram)$/,
  /^undici$/,
  /^axios$/,
  /^node-fetch$/,
];

/** Allowed internal dependency direction: schema <- core <- compiler <- adapters <- cli. */
const ALLOWED_INTERNAL: Record<string, string[]> = {
  schema: [],
  core: ["@vernaculo/schema"],
  compiler: ["@vernaculo/core", "@vernaculo/schema"],
  openai: ["@vernaculo/compiler"],
  skills: ["@vernaculo/compiler", "@vernaculo/core"],
  cli: [
    "@vernaculo/compiler",
    "@vernaculo/core",
    "@vernaculo/core/node",
    "@vernaculo/openai",
    "@vernaculo/skills",
  ],
};

describe("architecture invariants", () => {
  it("knows every package", () => {
    expect(packages).toEqual(Object.keys(ALLOWED_INTERNAL).sort());
  });

  it.each(packages)("%s imports no provider SDK or network module", (pkg) => {
    for (const { file, text } of sourceFiles(pkg)) {
      for (const specifier of imports(text)) {
        const forbidden = FORBIDDEN.some((pattern) => pattern.test(specifier));
        expect(forbidden, `${pkg}/src/${file} imports ${specifier}`).toBe(false);
      }
      expect(/\bfetch\s*\(/.test(text), `${pkg}/src/${file} calls fetch()`).toBe(false);
    }
  });

  it.each(packages)("%s declares no provider SDK dependency", (pkg) => {
    const { dependencies, peerDependencies, optionalDependencies } = manifest(pkg);
    const names = Object.keys({ ...dependencies, ...peerDependencies, ...optionalDependencies });
    for (const name of names) {
      expect(
        FORBIDDEN.some((pattern) => pattern.test(name)),
        `${pkg} depends on ${name}`,
      ).toBe(false);
    }
  });

  it.each(packages)("%s only imports allowed @vernaculo packages", (pkg) => {
    const allowed = ALLOWED_INTERNAL[pkg] ?? [];
    for (const { file, text } of sourceFiles(pkg)) {
      for (const specifier of imports(text).filter((s) => s.startsWith("@vernaculo/"))) {
        expect(allowed, `${pkg}/src/${file} imports ${specifier}`).toContain(specifier);
      }
    }
  });

  it.each(["schema", "compiler", "openai", "skills"])(
    "%s is runtime-agnostic (no node: imports)",
    (pkg) => {
      for (const { file, text } of sourceFiles(pkg)) {
        const nodeImports = imports(text).filter((s) => s.startsWith("node:"));
        expect(nodeImports, `${pkg}/src/${file}`).toEqual([]);
      }
    },
  );

  it("keeps Node-specific code of @vernaculo/core in src/node.ts only", () => {
    for (const { file, text } of sourceFiles("core")) {
      if (file === "node.ts") continue;
      expect(
        imports(text).filter((s) => s.startsWith("node:")),
        `core/src/${file}`,
      ).toEqual([]);
    }
  });
});
