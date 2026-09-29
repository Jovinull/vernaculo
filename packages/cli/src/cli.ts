import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { compile, INSTRUCTIONS_FORMAT } from "@vernaculo/compiler";
import {
  assertIntensity,
  buildIR,
  formatIssue,
  type PersonaIR,
  type ResolvedPersona,
  serializePersonaYaml,
  VernaculoError,
} from "@vernaculo/core";
import { DEFAULT_ROOT, listPersonas, loadPersona } from "@vernaculo/core/node";
import { composeInstructions } from "@vernaculo/openai";
import { exportSkill } from "@vernaculo/skills";
import { Command, CommanderError, InvalidArgumentError, Option } from "commander";
import packageJson from "../package.json" with { type: "json" };

export interface CliIO {
  readonly stdout: (text: string) => void;
  readonly stderr: (text: string) => void;
  /** Base directory for relative paths. */
  readonly cwd: string;
}

const defaultIO: CliIO = {
  stdout: (text) => process.stdout.write(text),
  stderr: (text) => process.stderr.write(text),
  cwd: process.cwd(),
};

/** Runs the CLI and returns the process exit code. Never calls process.exit. */
export async function run(argv: readonly string[], io: CliIO = defaultIO): Promise<number> {
  const program = buildProgram(io);
  try {
    await program.parseAsync([...argv], { from: "user" });
    return 0;
  } catch (error) {
    if (error instanceof CommanderError) return error.exitCode;
    if (error instanceof VernaculoError) {
      io.stderr(`${error.issues.map((issue) => `error: ${formatIssue(issue)}`).join("\n")}\n`);
      return 1;
    }
    if (error instanceof CliError) {
      io.stderr(`error: ${error.message}\n`);
      return 1;
    }
    io.stderr(
      `internal error: ${error instanceof Error ? (error.stack ?? error.message) : String(error)}\n`,
    );
    return 2;
  }
}

class CliError extends Error {}

interface CommonOptions {
  readonly root: string[];
}

function collect(value: string, previous: string[]): string[] {
  return [...previous, value];
}

function parseIntensity(value: string): number {
  const number = value.trim() === "" ? Number.NaN : Number(value);
  try {
    return assertIntensity(number);
  } catch {
    throw new InvalidArgumentError("expected a number between 0 and 1");
  }
}

function rootOption(): Option {
  return new Option("--root <dir>", "persona root to search (repeatable; first match wins)")
    .argParser(collect)
    .default([], DEFAULT_ROOT);
}

function buildProgram(io: CliIO): Command {
  const program = new Command("vernaculo")
    .description(
      "Local, provider-agnostic regional personas for AI agents. Runs entirely on your machine.",
    )
    .version(packageJson.version)
    .exitOverride()
    .configureOutput({ writeOut: io.stdout, writeErr: io.stderr })
    .showHelpAfterError();

  const roots = (options: CommonOptions) =>
    (options.root.length > 0 ? options.root : [DEFAULT_ROOT]).map((dir) => resolve(io.cwd, dir));

  const load = async (target: string, options: CommonOptions) => {
    try {
      return await loadPersona(/\.ya?ml$/i.test(target) ? resolve(io.cwd, target) : target, {
        roots: roots(options),
      });
    } catch (error) {
      if (error instanceof VernaculoError && /not-found$/.test(error.code)) {
        io.stderr(`hint: searched persona roots: ${roots(options).join(", ")}\n`);
      }
      throw error;
    }
  };

  const warnMaturity = (ir: PersonaIR) => {
    const { id, maturity } = ir.persona;
    if (maturity === "fixture") {
      io.stderr(`warning: ${id} is a FIXTURE (synthetic test data, not linguistic content)\n`);
    } else if (maturity === "draft") {
      io.stderr(`warning: ${id} is a DRAFT (not reviewed by speakers of the variety)\n`);
    }
  };

  program
    .command("list")
    .description("List the personas found in the persona roots")
    .addOption(rootOption())
    .option("--json", "print JSON")
    .action(async (options: CommonOptions & { json?: boolean }) => {
      const listed = await listPersonas(roots(options));
      if (options.json) {
        io.stdout(`${JSON.stringify(listed, null, 2)}\n`);
        return;
      }
      if (listed.length === 0) {
        io.stderr(`No personas found in: ${roots(options).join(", ")}\n`);
        return;
      }
      for (const entry of listed) {
        io.stdout(`${entry.id}${entry.shadowed ? `  (shadowed: ${entry.path})` : ""}\n`);
      }
    });

  program
    .command("inspect")
    .description("Show a resolved persona: lineage, maturity and what a given intensity renders")
    .argument("<persona>", "persona id (pt-BR/ba/salvador) or path to a .yaml file")
    .addOption(rootOption())
    .option("--intensity <value>", "intensity to preview (default: the persona's)", parseIntensity)
    .option("--json", "print the flattened persona and lineage as JSON")
    .action(
      async (target: string, options: CommonOptions & { intensity?: number; json?: boolean }) => {
        const resolved = await load(target, options);
        if (options.json) {
          io.stdout(`${JSON.stringify(resolved, null, 2)}\n`);
          return;
        }
        io.stdout(summarize(resolved, buildIR(resolved, { intensity: options.intensity })));
      },
    );

  program
    .command("validate")
    .description("Validate personas (all personas in the roots when no argument is given)")
    .argument("[personas...]", "persona ids or .yaml paths")
    .addOption(rootOption())
    .action(async (targets: string[], options: CommonOptions) => {
      const selected =
        targets.length > 0
          ? targets
          : (await listPersonas(roots(options))).filter((e) => !e.shadowed).map((e) => e.id);
      let failures = 0;
      for (const target of selected) {
        try {
          const resolved = await load(target, options);
          io.stdout(`ok    ${target} (${resolved.document.metadata.maturity})\n`);
        } catch (error) {
          if (!(error instanceof VernaculoError)) throw error;
          failures++;
          io.stdout(`FAIL  ${target}\n`);
          for (const issue of error.issues) io.stdout(`      ${formatIssue(issue)}\n`);
        }
      }
      io.stdout(`${selected.length - failures}/${selected.length} valid\n`);
      if (failures > 0) throw new CommanderError(1, "vernaculo.invalid", "validation failed");
    });

  program
    .command("compile")
    .description("Compile a persona to instructions and print them")
    .argument("<persona>", "persona id or path to a .yaml file")
    .addOption(rootOption())
    .addOption(
      new Option("--target <target>", "output target")
        .choices(["markdown", "openai"])
        .default("markdown"),
    )
    .option("--intensity <value>", "regional intensity between 0 and 1", parseIntensity)
    .option(
      "--agent <file>",
      "agent instructions to place before the persona layer (openai target)",
    )
    .option("--out <file>", "write to a file instead of stdout")
    .action(
      async (
        target: string,
        options: CommonOptions & {
          target: "markdown" | "openai";
          intensity?: number;
          agent?: string;
          out?: string;
        },
      ) => {
        const ir = buildIR(await load(target, options), { intensity: options.intensity });
        warnMaturity(ir);
        const compiled = compile(ir);
        let output: string;
        if (options.target === "openai") {
          const agent = options.agent
            ? readFileSync(resolve(io.cwd, options.agent), "utf8")
            : undefined;
          output = `${JSON.stringify(
            { instructions: composeInstructions(agent, compiled), metadata: compiled.metadata },
            null,
            2,
          )}\n`;
        } else {
          if (options.agent) throw new CliError("--agent is only supported with --target openai");
          output = compiled.instructions;
        }
        if (options.out) {
          writeFiles(resolve(io.cwd, options.out), [{ path: "", content: output }], true);
          io.stderr(`wrote ${options.out}\n`);
        } else {
          io.stdout(output);
        }
      },
    );

  program
    .command("export")
    .description("Export a persona as portable files (an Agent Skill directory)")
    .argument("<persona>", "persona id or path to a .yaml file")
    .addOption(rootOption())
    .addOption(
      new Option("--target <target>", "export target").choices(["skill"]).makeOptionMandatory(),
    )
    .option("--intensity <value>", "regional intensity baked into the export", parseIntensity)
    .option("--out <dir>", "parent directory for the skill directory", ".")
    .option("--force", "overwrite an existing non-empty directory")
    .action(
      async (
        target: string,
        options: CommonOptions & { intensity?: number; out: string; force?: boolean },
      ) => {
        const ir = buildIR(await load(target, options), { intensity: options.intensity });
        warnMaturity(ir);
        const skill = exportSkill(ir);
        const directory = resolve(io.cwd, options.out, skill.name);
        writeFiles(directory, skill.files, options.force ?? false);
        io.stdout(`${directory}\n`);
      },
    );

  program
    .command("eject")
    .description(
      "Copy a self-contained persona (flattened source + compiled instructions) into your project",
    )
    .argument("<persona>", "persona id or path to a .yaml file")
    .addOption(rootOption())
    .option("--intensity <value>", "intensity for the compiled instructions", parseIntensity)
    .option("--out <dir>", "destination directory (default: vernaculo/<persona id>)")
    .option("--force", "overwrite an existing non-empty directory")
    .action(
      async (
        target: string,
        options: CommonOptions & { intensity?: number; out?: string; force?: boolean },
      ) => {
        const resolved = await load(target, options);
        const ir = buildIR(resolved, { intensity: options.intensity });
        warnMaturity(ir);
        const directory = resolve(
          io.cwd,
          options.out ?? join("vernaculo", ...ir.persona.id.split("/")),
        );
        writeFiles(directory, ejectFiles(resolved, ir), options.force ?? false);
        io.stdout(`${directory}\n`);
      },
    );

  return program;
}

function summarize(resolved: ResolvedPersona, ir: PersonaIR): string {
  const { metadata } = resolved.document;
  const count = (items: readonly unknown[]) => String(items.length);
  const rows: [string, string][] = [
    ["id", metadata.id],
    ["name", metadata.name],
    ["version", metadata.version],
    ["language", metadata.language],
    ["maturity", metadata.maturity],
    ["license", metadata.license ?? "(not declared)"],
    ["lineage", resolved.lineage.map((entry) => `${entry.id}@${entry.version}`).join(" -> ")],
    ["default intensity", String(resolved.document.regionality?.defaultIntensity)],
    ["preview intensity", String(ir.intensity)],
    [
      "vocabulary",
      `${count(ir.vocabulary.preferred)} preferred, ${count(ir.vocabulary.contextual)} contextual, ${count(ir.vocabulary.discouraged)} discouraged`,
    ],
    ["discourse markers", count(ir.discourseMarkers)],
    ["sentence patterns", count(ir.morphosyntax)],
    ["conventions", count(Object.values(ir.pragmatics).flat())],
    ["examples", count(ir.examples)],
    ["anti-patterns", count(ir.antiPatterns)],
    ["sources", count(ir.sources)],
    [
      "omitted",
      `${ir.omitted.belowIntensity} below intensity, ${ir.omitted.hypotheses} hypotheses`,
    ],
  ];
  const width = Math.max(...rows.map(([label]) => label.length));
  return `${rows.map(([label, value]) => `${label.padEnd(width)}  ${value}`).join("\n")}\n`;
}

function ejectFiles(resolved: ResolvedPersona, ir: PersonaIR): { path: string; content: string }[] {
  const { id } = ir.persona;
  const lineage = resolved.lineage.map(
    (entry) =>
      `  - ${entry.id}@${entry.version} (${entry.maturity}${entry.license ? `, license ${entry.license}` : ""})`,
  );
  const header = [
    `Ejected by vernaculo ${packageJson.version}. Self-contained: no "extends", no Vernáculo package needed.`,
    "Flattened from (root first):",
    ...lineage,
    ...(ir.persona.maturity === "reviewed"
      ? []
      : [
          `Maturity: ${ir.persona.maturity}. This persona is NOT reviewed by speakers of the variety.`,
        ]),
  ];
  const readme = [
    `# ${ir.persona.name} (${id})`,
    "",
    "Ejected with `vernaculo eject`. These files no longer depend on Vernáculo:",
    "",
    "- `persona.yaml` — the flattened persona source (all inheritance resolved). Edit it freely.",
    `- \`instructions.md\` — instructions compiled at intensity ${ir.intensity} (${INSTRUCTIONS_FORMAT}). Place them after your agent's own instructions, on every request.`,
    "",
    "To recompile after editing `persona.yaml` (optional):",
    "",
    "```bash",
    `npx vernaculo compile ./persona.yaml --intensity ${ir.intensity} --out instructions.md`,
    "```",
    "",
    "Flattened from (root first):",
    "",
    ...lineage.map((line) => line.replace(/^ {2}/, "")),
    "",
  ];
  return [
    { path: "persona.yaml", content: serializePersonaYaml(resolved.document, { header }) },
    { path: "instructions.md", content: compile(ir).instructions },
    { path: "README.md", content: readme.join("\n") },
  ];
}

/** Writes files under `base` (a file path when a single entry has an empty path). */
function writeFiles(
  base: string,
  files: readonly { path: string; content: string }[],
  force: boolean,
): void {
  const single = files.length === 1 && files[0]?.path === "";
  if (!single && !force && existsSync(base) && readdirSync(base).length > 0) {
    throw new CliError(`${base} already exists and is not empty (use --force to overwrite)`);
  }
  for (const file of files) {
    const path = single ? base : join(base, ...file.path.split("/"));
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, file.content);
  }
}
