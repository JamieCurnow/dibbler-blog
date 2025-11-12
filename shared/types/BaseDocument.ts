import type { ISOString } from './ISOString'
import { z } from 'zod'
import type { ZodObjectFromType } from './ZodObjectFromType'

/**
 * Common fields shared by all persisted entities
 * (those stored in MongoDB and exposed via API)
 */
export interface BaseDocument {
  /** String representation of MongoDB ObjectId */
  id: string
  /** created timestamp in ISO 8601 format. */
  created: ISOString
  /** updated timestamp in ISO 8601 format. */
  updated: ISOString
}

export const baseDocumentSchema: ZodObjectFromType<BaseDocument> = z.object({
  id: z.string().min(1),
  created: z.string().min(1),
  updated: z.string().min(1)
})
