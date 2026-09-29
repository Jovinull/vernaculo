import { fileURLToPath } from "node:url";
import { buildIR, resolvePersona } from "@vernaculo/core";
import { createDirectorySource } from "@vernaculo/core/node";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";
import { exportSkill, skillName } from "../src/index.ts";

const fixturesRoot = fileURLToPath(new URL("../../../fixtures/personas", import.meta.url));
const resolved = await resolvePersona(
  "pt-BR/x-fixture/cidade-a",
  createDirectorySource(fixturesRoot),
);

// Constraints from https://agentskills.io/specification (verified 2026-09-29).
const ALLOWED_FRONTMATTER = [
  "name",
  "description",
  "license",
  "compatibility",
  "metadata",
  "allowed-tools",
];

function frontmatter(skillMd: string): Record<string, unknown> {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(skillMd);
  if (!match?.[1]) throw new Error("SKILL.md has no frontmatter");
  return parse(match[1]) as Record<string, unknown>;
}

function file(files: readonly { path: string; content: string }[], path: string): string {
  const found = files.find((f) => f.path === path);
  if (!found) throw new Error(`missing ${path}`);
  return found.content;
}

describe("skillName", () => {
  it("derives a valid Agent Skills name", () => {
    expect(skillName("pt-BR/ba/salvador")).toBe("vernaculo-pt-br-ba-salvador");
    expect(skillName("pt-BR/x-fixture/cidade-a")).toBe("vernaculo-pt-br-x-fixture-cidade-a");
  });

  it("never exceeds 64 characters or ends with a hyphen", () => {
    const name = skillName(`pt-BR/${"a".repeat(55)}-${"b".repeat(20)}`);
    expect(name.length).toBeLessThanOrEqual(64);
    expect(name).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });
});

describe("exportSkill", () => {
  const skill = exportSkill(buildIR(resolved, { intensity: 0.3 }));
  const skillMd = file(skill.files, "SKILL.md");

  it("produces the expected layout", () => {
    expect(skill.name).toBe("vernaculo-pt-br-x-fixture-cidade-a");
    expect(skill.files.map((f) => f.path)).toEqual([
      "SKILL.md",
      "references/vocabulary.md",
      "references/discourse.md",
      "references/pragmatics.md",
      "references/examples.md",
      "references/sources.md",
    ]);
  });

  it("has frontmatter that satisfies the Agent Skills specification", () => {
    const fm = frontmatter(skillMd);
    expect(Object.keys(fm).every((key) => ALLOWED_FRONTMATTER.includes(key))).toBe(true);
    expect(fm.name).toBe(skill.name);
    expect(typeof fm.description).toBe("string");
    expect((fm.description as string).length).toBeGreaterThan(0);
    expect((fm.description as string).length).toBeLessThanOrEqual(1024);
    const metadata = fm.metadata as Record<string, unknown>;
    expect(Object.values(metadata).every((value) => typeof value === "string")).toBe(true);
    expect(metadata["vernaculo-maturity"]).toBe("fixture");
  });

  it("keeps SKILL.md under the recommended 500 lines", () => {
    expect(skillMd.split("\n").length).toBeLessThan(500);
  });

  it("links every reference file from SKILL.md", () => {
    for (const { path } of skill.files.slice(1)) expect(skillMd).toContain(`(${path})`);
  });

  it("respects intensity gating in every file", () => {
    const everything = skill.files.map((f) => f.content).join("\n");
    expect(everything).not.toContain("termo-sintético-marcado"); // minIntensity 0.6
    expect(everything).not.toContain("discordância-sintética-hipotética"); // hypothesis
    const high = exportSkill(buildIR(resolved, { intensity: 0.8 }));
    expect(high.files.map((f) => f.content).join("\n")).toContain("termo-sintético-marcado");
  });

  it("is deterministic", () => {
    expect(exportSkill(buildIR(resolved, { intensity: 0.3 }))).toEqual(skill);
  });

  it("rejects an invalid name override", () => {
    expect(() => exportSkill(buildIR(resolved), { name: "Not Valid" })).toThrow(TypeError);
  });
});
