import type { H3Event } from 'h3'

/**
 * Safely retrieves a router parameter from the H3 event.
 * @param event The H3 event object.
 * @param paramName The name of the parameter to retrieve.
 * @returns The value of the parameter or throws an error if not found.
 * @throws An error with status code 400 if the parameter is missing.
 *
 * @example
 * ```ts
 * export default defineEventHandler((event) => {
 *   const userId = getSafeRouterParam(event, 'uid')
 *   // use userId safely here
 * })
 * ```
 */
export const getSafeRouterParam = (event: H3Event, paramName: string): string => {
  const paramValue = getRouterParam(event, paramName)
  if (!paramValue) throw serverError(400)
  return paramValue
}
