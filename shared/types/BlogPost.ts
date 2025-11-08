export interface BlogPost {
  // ─── Core content ────────────────────────────────
  id: string
  slug: string
  title: string
  subtitle?: string
  content: string // Markdown or HTML
  excerpt: string
  coverImage: {
    url: string
    alt?: string
    caption?: string
  }
  author: Author
  datePublished: string // ISO 8601
  dateModified?: string
  category: string
  tags: string[]

  // ─── SEO Meta ────────────────────────────────────
  meta: {
    title: string
    description: string
    canonical: string
    robots?: string // e.g. "index, follow"
  }

  // ─── Open Graph & Twitter ────────────────────────
  social: {
    ogTitle?: string
    ogDescription?: string
    ogImage?: string
    ogType?: 'article' | 'website'
    twitterCard?: 'summary' | 'summary_large_image'
    twitterCreator?: string // @handle
  }

  // ─── Structured Data (JSON-LD) ───────────────────
  schema: {
    type: 'BlogPosting'
    headline: string
    description: string
    image: string
    author: Author
    publisher: {
      name: string
      logo: string
    }
    howTo?: HowToSchema
    faq?: FaqSchema[]
  }
}

export interface Author {
  name: string
  url?: string
  image?: string
  bio?: string
}

export interface HowToSchema {
  name: string
  steps: HowToStep[]
}

export interface HowToStep {
  name: string
  text: string
  image?: string
  url?: string
}

export interface FaqSchema {
  question: string
  answer: string
}
