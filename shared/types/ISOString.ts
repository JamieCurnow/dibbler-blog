import * as z from 'zod'

/** This is just so we know what kind of date string things are */
export type ISOString = string

export const isoStringSchema = z.string().transform((val, ctx) => {
  const parsed = Date.parse(val)
  if (isNaN(parsed)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid ISO date string' })
    return z.NEVER
  }
  return new Date(parsed).toISOString()
})
