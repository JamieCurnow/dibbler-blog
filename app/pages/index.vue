<template>
  <main class="">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header class="text-center mb-12">
        <h1 class="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">Dibbler Blog</h1>
        <p class="mt-4 text-xl text-gray-600 dark:text-gray-400">
          Your go-to source for gardening tips and tricks.
        </p>
      </header>

      <form class="max-w-2xl w-full mx-auto mb-10" @submit.prevent>
        <div class="flex gap-4 w-full">
          <div class="flex-grow">
            <UInput
              v-model="search"
              placeholder="Search articles..."
              size="xl"
              class="w-full"
              variant="subtle"
              icon="i-heroicons-magnifying-glass-20-solid"
              clearable
              color="neutral"
              aria-label="Search blog posts"
              @keyup.enter="refresh"
            />
          </div>
          <div>
            <UButton :loading="pending" size="xl" color="neutral">Search</UButton>
          </div>
        </div>
      </form>

      <div class="grid gap-10 lg:grid-cols-2" v-if="posts.length">
        <article
          v-for="post in posts"
          :key="post.id"
          class="group relative bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden"
        >
          <NuxtLink :to="`/post/${post.slug}`" class="block">
            <div class="overflow-hidden">
              <img
                :src="post.coverImage.url"
                :alt="post.coverImage.alt || post.title"
                class="w-full h-64 object-cover"
                width="1600"
                height="900"
                fetchpriority="high"
                decoding="async"
              />
            </div>
            <div class="p-8">
              <h2
                class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors duration-100"
              >
                {{ post.title }}
              </h2>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                {{ post.excerpt }}
              </p>
              <div class="flex items-center">
                <img
                  v-if="post.author.image"
                  :src="post.author.image"
                  :alt="post.author.name"
                  class="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p class="font-semibold text-gray-800 dark:text-gray-200">
                    {{ post.author.name }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    <time :datetime="post.datePublished">{{
                      new Date(post.datePublished).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    }}</time>
                  </p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>

      <!-- no posts found -->
      <div v-else class="text-center py-20">
        <h2 class="text-3xl font-bold text-gray-500 dark:text-white mb-4">No articles found</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'

const toNumber = (val: string | number | null | undefined, defaultValue = 0): number => {
  const num = Number(val)
  return isNaN(num) ? defaultValue : num
}

// Local input state with debounce to avoid refetching on every keystroke
const page = useRouteQuery<number>('page', 1, { transform: toNumber })
const size = useRouteQuery<number>('size', 10, { transform: toNumber })

const search = useRouteQuery<string>('search')

const { data, refresh, pending } = await useAsyncData(
  'posts',
  () => {
    const urlParams = new URLSearchParams()
    urlParams.append('page', page.value.toString())
    urlParams.append('size', size.value.toString())
    if (search.value) urlParams.append('search', search.value)
    const stringParams = urlParams.toString()
    return $fetch<{ data: BlogPost[]; nextPage: string | undefined }>(`/api/post?${stringParams}`)
  },
  {
    watch: [page]
  }
)

const posts = computed(() => data.value?.data || [])

// SEO Optimization
const title = 'Dibbler Blog - Gardening Tips & Tricks'
const description = 'Your go-to source for gardening tips and tricks. Explore our latest articles on planting, growing, and maintaining your garden.'
const baseUrl = 'https://dibbler.com/blog' // Placeholder base URL

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: 'https://dibbler.com/og-image.jpg', // Placeholder OG Image
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: 'https://dibbler.com/og-image.jpg', // Placeholder Twitter Image
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: baseUrl
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Dibbler Blog',
        url: baseUrl,
        description: description,
        publisher: {
          '@type': 'Organization',
          name: 'Dibbler',
          logo: {
            '@type': 'ImageObject',
            url: 'https://dibbler.com/logo.png' // Placeholder logo
          }
        },
        blogPost: posts.value.map(post => ({
          '@type': 'BlogPosting',
          headline: post.title,
          image: post.coverImage.url,
          datePublished: post.datePublished,
          author: {
            '@type': 'Person',
            name: post.author.name
          },
          url: `${baseUrl}/post/${post.slug}`
        }))
      })
    }
  ]
})
</script>

