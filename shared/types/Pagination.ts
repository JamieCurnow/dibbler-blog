import { z } from 'zod'
import type { ZodObjectFromType } from './ZodObjectFromType'

export interface PaginationParams {
  page: number
  size: number
}

export const paginationSchema: ZodObjectFromType<PaginationParams> = z.object({
  page: z.coerce.number().min(1).default(1),
  size: z.coerce.number().min(1).default(10)
})
