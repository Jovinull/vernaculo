// @vernaculo/core — provider-agnostic, network-free and runtime-agnostic.
// Node-specific helpers (filesystem sources) live in "@vernaculo/core/node".

export { canonicalizeDocument } from "./canonical.ts";
export {
  formatIssue,
  type Issue,
  type IssueCode,
  VernaculoError,
} from "./errors.ts";
export { entryKey, isPersonaId, languageOfId } from "./ids.ts";
export {
  assertIntensity,
  buildIR,
  type CorroboratedFeatures,
  type IROptions,
  type PersonaIR,
} from "./ir.ts";
export { type ParseOptions, parsePersonaYaml } from "./parse.ts";
export {
  createMemorySource,
  type LineageEntry,
  MAX_INHERITANCE_DEPTH,
  type PersonaSource,
  type ResolvedPersona,
  resolvePersona,
  resolvePersonaDocument,
  type SourceEntry,
} from "./resolve.ts";
export { type SerializeOptions, serializePersonaYaml } from "./serialize.ts";
export {
  CORROBORATED_MIN_INTENSITY,
  CORROBORATED_MIN_SOURCES,
  checkDocument,
  type ValidationResult,
  validatePersonaDocument,
} from "./validate.ts";
