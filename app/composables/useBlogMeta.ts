import { useHead } from '#imports'

export function useBlogMeta(post: BlogPost) {
  if (!post) return

  const { meta, social, schema } = post
  const canonical = meta.canonical

  const jsonLd: any[] = []

  // ─── BlogPosting Schema ──────────────────────────────
  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': schema.type,
    '@id': schema.id || `${canonical}#blogpost`,
    mainEntityOfPage: schema.mainEntityOfPage || canonical,
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
        url: schema.publisher.logo.url,
        ...(schema.publisher.logo.width ? { width: schema.publisher.logo.width } : {}),
        ...(schema.publisher.logo.height ? { height: schema.publisher.logo.height } : {})
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
      '@id': schema.howToId || `${canonical}#howto`,
      name: schema.howTo.name,
      ...(schema.howTo.totalTime ? { totalTime: schema.howTo.totalTime } : {}),
      ...(schema.howTo.supply
        ? {
            supply: schema.howTo.supply.map((s) =>
              typeof s === 'string' ? { '@type': 'HowToSupply', name: s } : s
            )
          }
        : {}),
      ...(schema.howTo.tool
        ? {
            tool: schema.howTo.tool.map((t) =>
              typeof t === 'string' ? { '@type': 'HowToTool', name: t } : t
            )
          }
        : {}),
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
      '@id': schema.faqId || `${canonical}#faq`,
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
    link: [
      { rel: 'canonical', href: meta.canonical },
      ...(post.author?.slug ? [{ rel: 'author', href: `/author/${post.author.slug}` }] : [])
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd, null, 2)
      }
    ]
  })
}
