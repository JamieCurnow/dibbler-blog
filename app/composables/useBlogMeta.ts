import { useHead } from '#imports'

export function useBlogMeta(post: BlogPost) {
  if (!post) return

  const { meta, social, schema } = post

  const jsonLd: any[] = []

  // ─── BlogPosting Schema ──────────────────────────────
  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': schema.type,
    headline: schema.headline,
    description: schema.description,
    image: schema.image,
    author: {
      '@type': 'Person',
      name: schema.author.name
    },
    publisher: {
      '@type': 'Organization',
      name: schema.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: schema.publisher.logo
      }
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished
  }

  jsonLd.push(blogPosting)

  // ─── Optional HowTo Schema ───────────────────────────
  if (schema.howTo) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: schema.howTo.name,
      step: schema.howTo.steps.map((step) => ({
        '@type': 'HowToStep',
        name: step.name,
        text: step.text,
        image: step.image,
        url: step.url
      }))
    })
  }

  // ─── Optional FAQ Schema ─────────────────────────────
  if (schema.faq?.length) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: schema.faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer
        }
      }))
    })
  }

  // ─── Inject into Head ─────────────────────────────────
  useHead({
    title: meta.title,
    meta: [
      { name: 'description', content: meta.description },
      { name: 'robots', content: meta.robots || 'index, follow' },

      // OpenGraph
      { property: 'og:title', content: social.ogTitle || meta.title },
      {
        property: 'og:description',
        content: social.ogDescription || meta.description
      },
      { property: 'og:image', content: social.ogImage },
      { property: 'og:type', content: social.ogType || 'article' },
      { property: 'og:url', content: meta.canonical },
      { property: 'article:published_time', content: post.datePublished },
      { property: 'article:modified_time', content: post.dateModified || '' },
      { property: 'og:image:width', content: '1600' },
      { property: 'og:image:height', content: '900' },

      // Twitter
      {
        name: 'twitter:card',
        content: social.twitterCard || 'summary_large_image'
      },
      { name: 'twitter:creator', content: social.twitterCreator }
      // twitter:site TODO:
      // { name: 'twitter:site', content: '@dibbler' },
    ],
    link: [{ rel: 'canonical', href: meta.canonical }],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd, null, 2)
      }
    ]
  })
}
