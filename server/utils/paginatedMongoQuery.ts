import type { Collection, Filter, Document, FindOptions } from 'mongodb'
import type { H3Event } from 'h3'
import type { PaginationParams } from '~~/shared/types/Pagination'

interface QueryOpts<T extends Document> {
  collection: Collection<T>
  pagination?: PaginationParams
  query?: Filter<T>
  queryOptions?: FindOptions
}

/**
 * Helper to build a MongoDB query with optional skip/limit for pagination.
 * Accepts any collection from useMongoDb().
 * Use any normal MongoDB query as needed.
 * If no pagination params provided, will attempt to read from query params.
 * If pagination params are provided or found, applies skip/limit and builds nextPage URL.
 * If no pagination params, returns full query without skip/limit.
 *
 * @param event H3Event to read query params from
 * @param opts Query options including collection, optional pagination, and optional query filter
 * @returns An object containing the MongoDB data and nextPage URL (if applicable)
 *
 * @example
 * const { data, nextPage } = paginatedMongoQuery({
 *   collection: db.hires,
 *   query: { pioneer, company },
 *   pagination: { page: 2, size: 20 } // page 2, size 20
 * })
 */
export const paginatedMongoQuery = async <T extends Document>(event: H3Event, opts: QueryOpts<T>) => {
  const { collection, pagination, query = {}, queryOptions = {} } = opts

  const queryParams = getQuery(event)
  let page = pagination?.page || Number(queryParams.page) || undefined
  let size = pagination?.size || Number(queryParams.size) || undefined

  // If no page/size provided, return full query
  if (!page && !size) {
    const data = await collection.find(query).toArray()
    return { data: data.map(getDocData), nextPage: undefined }
  }

  // else, make next page url...
  // default page/size - 0 is not valid
  page = page || 1
  size = size || 10

  // build mongo query with skip/limit
  const skip = (page - 1) * size
  const limit = size + 1 // fetch one extra to check for next page
  const data = await collection.find(query, queryOptions).skip(skip).limit(limit).toArray()

  // build next page url if there are data
  const hasNextPage = data.length > limit
  const nextPage = hasNextPage ? createNextPageUrl(event, { page: page + 1, size }) : undefined

  // return the data and next page url
  return { data: data.map(getDocData), nextPage }
}

const createNextPageUrl = (event: H3Event, opts: PaginationParams) => {
  const { page = 1, size = 10 } = opts
  // get the path
  const [path, paramsString] = event.path.split('?')

  // make a new URLSearchParams with existing query params
  const urlquery = new URLSearchParams(paramsString)

  // set the new page/size params
  urlquery.delete('page')
  urlquery.delete('size')
  urlquery.append('page', String(page))
  urlquery.append('size', String(size))

  // build next page relative url
  const nextPage = `${path}?${urlquery.toString()}`
  return nextPage
}
