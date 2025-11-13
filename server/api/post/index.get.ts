import { Filter, FindOptions } from 'mongodb'
import zod from 'zod'
import { authorifyPost } from '~~/server/utils/authorifyPost'

const params = zod.object({
  ...paginationSchema.shape,
  search: zod.string().optional(),
  sort: zod.string().optional().default('created'),
  order: zod.enum(['asc', 'desc']).optional().default('desc')
})

export default defineCachedEventHandler(
  async (event) => {
    const { search, sort, order } = await getZodQuery(event, params)
    // do something with search params...
    console.log({ search })

    const db = await useDb()
    const collection = db.posts

    // Return paginated list of posts
    const query: Filter<BlogPostDoc> = {}

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { 'meta.description': { $regex: search, $options: 'i' } }
      ]
    }

    const queryOptions: FindOptions = {
      sort: { [sort]: order === 'asc' ? 1 : -1 }
    }

    const { data, nextPage } = await paginatedMongoQuery<BlogPostDoc>(event, {
      collection,
      query,
      queryOptions
    })

    const authorifiedData = await Promise.all(data.map(authorifyPost))

    return { data: authorifiedData, nextPage }
  },
  { maxAge: 300, shouldBypassCache }
)
