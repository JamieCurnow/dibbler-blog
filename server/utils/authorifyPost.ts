import { BlogPost, BlogPostDoc } from '~~/shared/types/BlogPost'
import { getCachedAuthor } from './getCachedAuthor'

type PostOptions = BlogPostDoc | BlogPost | ReturnType<typeof getDocData<BlogPostDoc>>

const postIsDoc = (post: PostOptions): post is BlogPostDoc => {
  // if it has an _id field, it's a doc
  return '_id' in post
}

export const authorifyPost = async (post: PostOptions) => {
  if (typeof post.author !== 'string') {
    // Already authorified
    return post as BlogPost
  }

  const author = await getCachedAuthor(post.author)
  if (!author) throw new Error('Author data missing')

  const postData = postIsDoc(post) ? getDocData(post) : post

  const blogPost: BlogPost = {
    ...postData,
    author,
    schema: {
      ...postData.schema,
      author
    }
  }

  return blogPost
}
