import { BlogPostDoc } from '~~/shared/types/BlogPost'
import { initMongoDb } from './initMongoDb'
import { AuthorDoc } from '~~/shared/types/Author'

export const useDb = () =>
  initMongoDb({
    config: {
      connectionString: useRuntimeConfig().mongoUri,
      dbName: 'dibbler-blog'
    },
    collections: {
      posts: { type: {} as BlogPostDoc },
      authors: { type: {} as AuthorDoc }
    }
  })
