import type { H3Event } from 'h3'
import z from 'zod'
import type { ZodObjectFromType } from '~~/shared/types/ZodObjectFromType'

type InferTypeFromZod<T> = T extends z.ZodObject
  ? z.infer<T>
  : T extends ZodObjectFromType<infer V>
    ? V
    : never

/**
 * Reads and validates the request body from an H3 event against a Zod schema.
 * @param event The H3 event object.
 * @param schema The Zod schema to validate the body against.
 * @param opts Optional configuration.
 * @param opts.strict If true, performs strict validation on the schema (no unknown keys).
 * @param opts.exposeErrors If true, exposes detailed validation errors in the response on failure.
 * @returns A promise that resolves to the validated request body.
 * @throws An error if the request body is invalid.
 *
 * @example
 * ```ts
 * import { z } from 'zod'
 * import { readZodBody } from '~~/server/utils/readZodBody'
 *
 * const mySchema = z.object({
 *   name: z.string(),
 *   age: z.number().optional()
 * })
 *
 * export default defineEventHandler(async (event) => {
 *   const body = await readZodBody(event, mySchema, { strict: true, exposeErrors: true })
 *   // body is now validated and typed
 *   return body
 * })
 * ```
 */
export const readZodBody = async <T extends ZodObjectFromType<never> | z.ZodObject<never>>(
  event: H3Event,
  schema: T,
  opts: { strict?: boolean; exposeErrors?: boolean } = {
    strict: false,
    exposeErrors: false
  }
): Promise<InferTypeFromZod<T>> => {
  // grab options with defaults
  const { strict, exposeErrors } = opts

  // read the request body
  const body = await readBody(event)

  // create a strict schema if needed
  const _schema = strict ? schema.strict() : schema

  // validate the body against the schema
  const { success, data, error } = _schema.safeParse(body)

  // handle validation failure
  if (!success) {
    console.error('Invalid body:', error.message)
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body',
      data: exposeErrors ? z.treeifyError(error) : undefined
    })
  }

  // return the validated data
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return data as InferTypeFromZod<T>
}
