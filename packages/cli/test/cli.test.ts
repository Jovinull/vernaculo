import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, describe, expect, it } from "vitest";
import { run } from "../src/index.ts";

const fixturesRoot = fileURLToPath(new URL("../../../fixtures/personas", import.meta.url));
const scratch = mkdtempSync(join(tmpdir(), "vernaculo-cli-"));
afterAll(() => rmSync(scratch, { recursive: true, force: true }));

async function cli(...argv: string[]) {
  let stdout = "";
  let stderr = "";
  const code = await run(argv, {
    stdout: (text) => {
      stdout += text;
    },
    stderr: (text) => {
      stderr += text;
    },
    cwd: scratch,
  });
  return { code, stdout, stderr };
}

const ROOT = ["--root", fixturesRoot];

describe("vernaculo list / inspect / validate", () => {
  it("lists personas", async () => {
    const { code, stdout } = await cli("list", ...ROOT);
    expect(code).toBe(0);
    expect(stdout.trim().split("\n")).toEqual([
      "pt-BR/x-fixture",
      "pt-BR/x-fixture/cidade-a",
      "pt-BR/x-fixture/cidade-b",
    ]);
  });

  it("inspects lineage and maturity", async () => {
    const { code, stdout } = await cli("inspect", "pt-BR/x-fixture/cidade-a", ...ROOT);
    expect(code).toBe(0);
    expect(stdout).toContain(
      "lineage            pt-BR/x-fixture@0.1.0 -> pt-BR/x-fixture/cidade-a@0.1.0",
    );
    expect(stdout).toMatch(/maturity\s+fixture/);
  });

  it("validates every persona in the roots", async () => {
    const { code, stdout } = await cli("validate", ...ROOT);
    expect(code).toBe(0);
    expect(stdout).toContain("3/3 valid");
  });

  it("fails validation with the issue code and a non-zero exit", async () => {
    const root = join(scratch, "broken");
    mkdirSync(join(root, "pt-BR", "x-broken"), { recursive: true });
    writeFileSync(
      join(root, "pt-BR", "x-broken", "persona.yaml"),
      "apiVersion: vernaculo.dev/v1alpha1\nkind: Persona\nmetadata:\n  id: pt-BR/x-broken\n  name: B\n  language: pt-PT\n  version: 0.1.0\n  maturity: fixture\nregionality:\n  defaultIntensity: 0.3\n",
    );
    const { code, stdout } = await cli("validate", "--root", root);
    expect(code).toBe(1);
    expect(stdout).toContain("[language-mismatch]");
  });

  it("explains where it looked when a persona is missing", async () => {
    const { code, stderr } = await cli("inspect", "pt-BR/ba/salvador", ...ROOT);
    expect(code).toBe(1);
    expect(stderr).toContain("hint: searched persona roots");
    expect(stderr).toContain("[persona-not-found]");
  });
});

describe("vernaculo compile", () => {
  it("prints Markdown instructions and warns about fixture maturity", async () => {
    const { code, stdout, stderr } = await cli("compile", "pt-BR/x-fixture/cidade-a", ...ROOT);
    expect(code).toBe(0);
    expect(stdout.startsWith("# Regional language layer: Fixture — Cidade A")).toBe(true);
    expect(stderr).toContain("is a FIXTURE");
  });

  it("composes agent instructions for the openai target", async () => {
    const agent = join(scratch, "agent.md");
    writeFileSync(agent, "You are a sales assistant for a fictional dealership.\n");
    const { code, stdout } = await cli(
      "compile",
      "pt-BR/x-fixture/cidade-a",
      ...ROOT,
      "--target",
      "openai",
      "--agent",
      agent,
    );
    expect(code).toBe(0);
    const output = JSON.parse(stdout) as { instructions: string; metadata: { intensity: number } };
    expect(output.instructions).toMatch(
      /^You are a sales assistant[\s\S]+# Regional language layer/,
    );
    expect(output.metadata.intensity).toBe(0.25);
  });

  it.each(["-0.1", "1.5", "abc", ""])("rejects intensity %j", async (value) => {
    const { code, stderr } = await cli(
      "compile",
      "pt-BR/x-fixture/cidade-a",
      ...ROOT,
      "--intensity",
      value,
    );
    expect(code).toBe(1);
    expect(stderr).toContain("expected a number between 0 and 1");
  });
});

describe("vernaculo export --target skill", () => {
  it("writes a skill directory and refuses to overwrite it without --force", async () => {
    const out = join(scratch, "skills");
    const first = await cli(
      "export",
      "pt-BR/x-fixture/cidade-a",
      ...ROOT,
      "--target",
      "skill",
      "--out",
      out,
    );
    expect(first.code).toBe(0);
    const dir = join(out, "vernaculo-pt-br-x-fixture-cidade-a");
    expect(readdirSync(dir).sort()).toEqual(["SKILL.md", "references"]);

    const second = await cli(
      "export",
      "pt-BR/x-fixture/cidade-a",
      ...ROOT,
      "--target",
      "skill",
      "--out",
      out,
    );
    expect(second.code).toBe(1);
    expect(second.stderr).toContain("--force");

    const forced = await cli(
      "export",
      "pt-BR/x-fixture/cidade-a",
      ...ROOT,
      "--target",
      "skill",
      "--out",
      out,
      "--force",
    );
    expect(forced.code).toBe(0);
  });
});

describe("vernaculo eject", () => {
  it("produces a standalone persona that compiles to the same instructions", async () => {
    const out = join(scratch, "ejected");
    const ejected = await cli(
      "eject",
      "pt-BR/x-fixture/cidade-a",
      ...ROOT,
      "--intensity",
      "0.7",
      "--out",
      out,
    );
    expect(ejected.code).toBe(0);
    expect(readdirSync(out).sort()).toEqual(["README.md", "instructions.md", "persona.yaml"]);

    const persona = readFileSync(join(out, "persona.yaml"), "utf8");
    expect(persona).not.toMatch(/^extends:/m);
    expect(persona).toContain("# Maturity: fixture");

    // No persona root at all: the ejected file must not need its ancestors.
    const emptyRoot = join(scratch, "empty-root");
    const recompiled = await cli(
      "compile",
      join(out, "persona.yaml"),
      "--root",
      emptyRoot,
      "--intensity",
      "0.7",
    );
    const original = await cli(
      "compile",
      "pt-BR/x-fixture/cidade-a",
      ...ROOT,
      "--intensity",
      "0.7",
    );
    expect(recompiled.code).toBe(0);
    expect(recompiled.stdout).toBe(original.stdout);
    expect(readFileSync(join(out, "instructions.md"), "utf8")).toBe(original.stdout);
  });
});

describe("usage", () => {
  it("exits 0 for --help and --version", async () => {
    expect((await cli("--help")).code).toBe(0);
    expect((await cli("--version")).code).toBe(0);
  });

  it("exits non-zero for an unknown command", async () => {
    expect((await cli("publish")).code).not.toBe(0);
  });
});
