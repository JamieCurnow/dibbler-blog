import { z } from 'zod'

export const zodStringOrArrayToStringArray = z
  // accept either a string or an array of strings
  .union([z.string(), z.array(z.string())])
  // transform to array of strings
  .transform((val) => {
    if (!val) return undefined
    return Array.isArray(val) ? val : [val]
  })
