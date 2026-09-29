import { z } from "zod";
import {
  ANTI_PATTERN_CATEGORIES,
  API_VERSION,
  EVIDENCE_LEVELS,
  MATURITY_LEVELS,
  PERSONA_KIND,
  type PersonaDocument,
  PHONETIC_SPELLING_POLICIES,
  SOURCE_TYPES,
  SOURCE_USAGES,
} from "./types.ts";

// Mirrors schemas/v1alpha1/persona.schema.json. Keep patterns and limits
// byte-identical: test/schema-parity.test.ts compares both definitions.

export const PERSONA_ID_PATTERN: RegExp =
  /^[a-z]{2,3}(-[A-Za-z0-9]{1,8})*(\/[a-z0-9]+(-[a-z0-9]+)*)*$/;
const LANGUAGE_TAG_PATTERN = /^[a-z]{2,3}(-[A-Za-z0-9]{1,8})*$/;
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const SEMVER_PATTERN =
  /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(-[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?(\+[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?$/;
const COUNTRY_PATTERN = /^[A-Z]{2}$/;
const SUBDIVISION_PATTERN = /^[A-Z0-9]{1,3}$/;
const URL_PATTERN = /^https?:\/\/[^\s]+$/;
const DATE_PATTERN = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

export const personaIdSchema: z.ZodString = z.string().max(128).regex(PERSONA_ID_PATTERN);
const languageTag = z.string().max(35).regex(LANGUAGE_TAG_PATTERN);
const slug = z.string().max(64).regex(SLUG_PATTERN);
const semver = z.string().max(64).regex(SEMVER_PATTERN);
const shortText = z.string().min(1).max(200);
const longText = z.string().min(1).max(2000);
export const intensitySchema: z.ZodNumber = z.number().min(0).max(1);
const evidence = z.enum(EVIDENCE_LEVELS);
const sourceRefs = z.array(slug).min(1);

const featureFields = {
  evidence,
  sources: sourceRefs.optional(),
  notes: longText.optional(),
  minIntensity: intensitySchema.optional(),
};

const lexicalItem = z.strictObject({
  term: shortText,
  meaning: longText.optional(),
  ...featureFields,
});

const contextualItem = z.strictObject({
  term: shortText,
  context: longText,
  meaning: longText.optional(),
  ...featureFields,
});

const discouragedItem = z.strictObject({
  term: shortText,
  reason: longText.optional(),
  sources: sourceRefs.optional(),
  notes: longText.optional(),
});

const discourseMarker = z.strictObject({
  form: shortText,
  function: longText,
  ...featureFields,
});

const morphosyntaxPattern = z.strictObject({
  id: slug,
  description: longText,
  example: longText.optional(),
  ...featureFields,
});

const pragmaticForm = z.strictObject({
  form: shortText,
  usage: longText.optional(),
  ...featureFields,
});

const linguistics = z.strictObject({
  vocabulary: z
    .strictObject({
      preferred: z.array(lexicalItem).optional(),
      contextual: z.array(contextualItem).optional(),
      discouraged: z.array(discouragedItem).optional(),
    })
    .optional(),
  discourse: z.strictObject({ markers: z.array(discourseMarker).optional() }).optional(),
  morphosyntax: z.strictObject({ patterns: z.array(morphosyntaxPattern).optional() }).optional(),
  pragmatics: z
    .strictObject({
      addressForms: z.array(pragmaticForm).optional(),
      greetings: z.array(pragmaticForm).optional(),
      acknowledgements: z.array(pragmaticForm).optional(),
      disagreements: z.array(pragmaticForm).optional(),
      closings: z.array(pragmaticForm).optional(),
    })
    .optional(),
  orthography: z
    .strictObject({ phoneticSpelling: z.enum(PHONETIC_SPELLING_POLICIES).optional() })
    .optional(),
});

const example = z.strictObject({
  id: slug,
  situation: shortText,
  neutral: longText.optional(),
  text: longText,
  intensity: intensitySchema.optional(),
  sources: sourceRefs.optional(),
  notes: longText.optional(),
});

const antiPattern = z.strictObject({
  id: slug,
  text: longText,
  category: z.enum(ANTI_PATTERN_CATEGORIES),
  explanation: longText,
});

const source = z.strictObject({
  id: slug,
  type: z.enum(SOURCE_TYPES),
  title: shortText,
  url: z.string().max(2000).regex(URL_PATTERN).optional(),
  citation: longText.optional(),
  license: shortText.optional(),
  usage: z.enum(SOURCE_USAGES),
  accessed: z.string().regex(DATE_PATTERN).optional(),
  notes: longText.optional(),
});

const region = z.strictObject({
  country: z.string().regex(COUNTRY_PATTERN).optional(),
  subdivision: z.string().regex(SUBDIVISION_PATTERN).optional(),
  locality: shortText.optional(),
  note: longText.optional(),
});

const metadata = z.strictObject({
  id: personaIdSchema,
  name: shortText,
  description: longText.optional(),
  language: languageTag,
  version: semver,
  maturity: z.enum(MATURITY_LEVELS),
  license: shortText.optional(),
  region: region.optional(),
});

/** Structural validator for a persona document. Semantic rules live in @vernaculo/core. */
export const personaDocumentSchema: z.ZodType<PersonaDocument> = z.strictObject({
  apiVersion: z.literal(API_VERSION),
  kind: z.literal(PERSONA_KIND),
  metadata,
  extends: personaIdSchema.optional(),
  regionality: z.strictObject({ defaultIntensity: intensitySchema.optional() }).optional(),
  linguistics: linguistics.optional(),
  examples: z.array(example).optional(),
  antiPatterns: z.array(antiPattern).optional(),
  provenance: z
    .strictObject({
      sources: z.array(source).optional(),
      notes: longText.optional(),
    })
    .optional(),
});
