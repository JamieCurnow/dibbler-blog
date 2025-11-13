import { authorifyPost } from '~~/server/utils/authorifyPost'

export default defineCachedEventHandler(
  async (event) => {
    const db = await useDb()
    const slug = getSafeRouterParam(event, 'slug')
    const postDoc = await db.posts.findOne({ slug })
    if (!postDoc) throw createError({ statusCode: 404, statusMessage: 'Blog post not found' })

    const post = await authorifyPost(postDoc)

    return post
  },
  { maxAge: 3600, shouldBypassCache }
)
