import type { BaseDocument } from './BaseDocument'
import type { ToMongoDoc } from './MongoDocument'

export interface Author extends BaseDocument {
  uid: string
  slug: string
  name: string
  image?: string
  bio?: string
  title?: string
  yearsExperience?: number
  focusRegion?: string
  credentials?: string[]
  social?: {
    twitter?: string
    github?: string
    website?: string
  }
  content: string // markdown
  meta: {
    title: string
    description: string
    canonical: string
  }
}

export type AuthorMeta = Pick<Author, 'uid' | 'slug' | 'name' | 'image' | 'bio'>

export type AuthorDoc = ToMongoDoc<Author>
