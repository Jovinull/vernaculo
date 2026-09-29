import { fileURLToPath } from "node:url";
import { VernaculoError } from "../src/index.ts";

export const repoRoot: string = fileURLToPath(new URL("../../../", import.meta.url));
export const fixturesRoot: string = `${repoRoot}fixtures/personas`;
export const conformanceDir: string = `${repoRoot}schemas/conformance/v1alpha1`;

/** Runs `action` and returns the codes of the VernaculoError it throws. */
export async function issueCodes(action: () => unknown): Promise<string[]> {
  try {
    await action();
  } catch (error) {
    if (error instanceof VernaculoError) return error.issues.map((issue) => issue.code);
    throw error;
  }
  throw new Error("Expected a VernaculoError, but the action succeeded");
}
