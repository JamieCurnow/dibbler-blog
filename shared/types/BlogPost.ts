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

  // ─── At a Glance (UI helpers) ───────────────────
  atAGlance?: {
    summary?: string
    sowingMonths?: string[]
    harvestMonths?: string[]
    spacing?: {
      inRow?: string
      betweenRows?: string
      depth?: string
    }
  }

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
      logo: {
        url: string
        width?: number
        height?: number
      }
    }
    howTo?: HowToSchema
    faq?: FaqSchema[]
    // Optional identifiers for linking structured data blocks
    id?: string // @id for BlogPosting
    howToId?: string // @id for HowTo block
    faqId?: string // @id for FAQPage block
    mainEntityOfPage?: string
  }
}

export interface Author {
  uid: string
  slug: string
  name: string
  image?: string
  bio?: string
}

export interface HowToSchema {
  name: string
  steps: HowToStep[]
  totalTime?: string // ISO 8601 duration e.g. PT16W
  supply?: string[] // list of supplies
  tool?: string[] // list of tools
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
