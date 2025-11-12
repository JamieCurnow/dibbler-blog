export default defineCachedEventHandler(
  async (event) => {
    const db = await useDb()
    const slug = getSafeRouterParam(event, 'slug')
    const postDoc = await db.posts.findOne({ slug })
    if (!postDoc) throw createError({ statusCode: 404, statusMessage: 'Blog post not found' })

    const authorDoc = await db.authors.findOne({ slug: postDoc.author })
    if (!authorDoc) throw createError({ statusCode: 404, statusMessage: 'Author data missing' })

    const author = getDocData(authorDoc)

    const post: BlogPost = {
      ...getDocData(postDoc),
      author,
      schema: {
        ...postDoc.schema,
        author
      }
    }

    return post
  },
  { maxAge: 3600 }
)
