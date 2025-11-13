export const getCachedAuthor = defineCachedFunction(
  async (slug: string) => {
    const db = await useDb()
    const author = await db.authors.findOne({ slug })
    if (!author) return null
    return getDocData(author)
  },
  { maxAge: 3600, shouldBypassCache }
)
