/** Stable machine-readable issue codes. Documented in docs/specification/persona-format.md. */
export type IssueCode =
  // Parsing
  | "yaml-syntax"
  | "non-json-value"
  | "schema-violation"
  // Document-level semantic rules
  | "language-mismatch"
  | "duplicate-key"
  | "conflicting-forms"
  | "evidence-without-source"
  // Resolution
  | "invalid-id"
  | "persona-not-found"
  | "parent-not-found"
  | "id-mismatch"
  | "inheritance-cycle"
  | "inheritance-too-deep"
  | "lineage-language-mismatch"
  | "unknown-source"
  | "synthetic-outside-fixture"
  | "missing-default-intensity"
  // Compilation options
  | "invalid-intensity";

export interface Issue {
  readonly code: IssueCode;
  readonly message: string;
  /** JSON Pointer into the document, when the issue concerns a specific value. */
  readonly path?: string | undefined;
  /** Where the document came from (file path, URI or caller-provided label). */
  readonly origin?: string | undefined;
}

/** The single error type thrown by Vernáculo. Always carries at least one issue. */
export class VernaculoError extends Error {
  readonly code: IssueCode;
  readonly issues: readonly Issue[];

  constructor(issues: readonly [Issue, ...Issue[]]) {
    super(formatIssues(issues));
    this.name = "VernaculoError";
    this.code = issues[0].code;
    this.issues = issues;
  }
}

export function formatIssue(issue: Issue): string {
  const where = [issue.origin, issue.path].filter(Boolean).join(" ");
  return `${where ? `${where}: ` : ""}${issue.message} [${issue.code}]`;
}

function formatIssues(issues: readonly Issue[]): string {
  return issues.map(formatIssue).join("\n");
}

/** Builds a VernaculoError from a non-empty issue list. */
export function vernaculoError(issues: readonly Issue[]): VernaculoError {
  const [first, ...rest] = issues;
  if (!first) throw new TypeError("vernaculoError() requires at least one issue");
  return new VernaculoError([first, ...rest]);
}

/** Throws a VernaculoError when `issues` is not empty. */
export function throwIfIssues(issues: readonly Issue[]): void {
  if (issues.length > 0) throw vernaculoError(issues);
}
