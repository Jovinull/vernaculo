import personaSchema from "../../../schemas/v1alpha1/persona.schema.json" with { type: "json" };

/** A JSON Schema document (draft 2020-12). */
export type JsonSchemaDocument = { readonly [key: string]: unknown };

/**
 * The canonical, normative JSON Schema for persona documents
 * (`schemas/v1alpha1/persona.schema.json`), bundled into this package so that
 * consumers never need network access to validate.
 */
export const personaJsonSchema: JsonSchemaDocument = personaSchema;
