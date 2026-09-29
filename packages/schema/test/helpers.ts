import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

export const repoRoot: string = fileURLToPath(new URL("../../../", import.meta.url));
export const conformanceDir: string = `${repoRoot}schemas/conformance/v1alpha1`;

export interface ConformanceFile {
  readonly name: string;
  readonly data: unknown;
  readonly expect: string | undefined;
}

/** Reads every YAML file of a conformance directory, exposing its `# expect:` header. */
export function readConformanceDir(subdir: string): ConformanceFile[] {
  const dir = `${conformanceDir}/${subdir}`;
  return readdirSync(dir)
    .filter((name) => name.endsWith(".yaml"))
    .sort()
    .map((name) => {
      const text = readFileSync(`${dir}/${name}`, "utf8");
      const expect = /^# expect: (\S+)$/m.exec(text)?.[1];
      return { name, data: parse(text), expect };
    });
}
