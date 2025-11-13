defineCachedEventHandler

export default defineCachedEventHandler(
  async (event) => {
    const slug = getSafeRouterParam(event, 'slug')
    const db = await useDb()
    const author = await db.authors.findOne({ slug })
    if (!author) throw createError({ statusCode: 404, statusMessage: 'Author not found' })
    return getDocData(author)
  },
  { maxAge: 3600, shouldBypassCache }
)
