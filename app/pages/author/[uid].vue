<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen py-12">
    <div v-if="!author" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Author not found</h1>
      <NuxtLink to="/" class="text-primary-600 hover:underline">← Back to blog</NuxtLink>
    </div>

    <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Author Header -->
      <header class="text-center mb-12">
        <img
          v-if="author.image"
          :src="author.image"
          :alt="author.name"
          class="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
        />
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2">
          {{ author.name }}
        </h1>
        <p v-if="author.title" class="text-xl text-gray-600 dark:text-gray-400 mb-4">
          {{ author.title }}
        </p>

        <!-- Experience & Location -->
        <div class="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <span v-if="author.yearsExperience" class="flex items-center gap-1">
            📅 {{ author.yearsExperience }}+ years experience
          </span>
          <span v-if="author.focusRegion" class="flex items-center gap-1"> 🌍 {{ author.focusRegion }} </span>
        </div>

        <!-- Credentials -->
        <div v-if="author.credentials?.length" class="mb-6">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Credentials</h3>
          <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li v-for="credential in author.credentials" :key="credential">✓ {{ credential }}</li>
          </ul>
        </div>

        <!-- Social Links -->
        <!-- <div v-if="author.social" class="flex justify-center gap-4">
          <a
            v-if="author.social.website"
            :href="author.social.website"
            class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
          >
            Website
          </a>
          <a
            v-if="author.social.twitter"
            :href="author.social.twitter"
            class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
          >
            Twitter
          </a>
          <a
            v-if="author.social.github"
            :href="author.social.github"
            class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
          >
            GitHub
          </a>
        </div> -->
      </header>

      <!-- Author Bio Content -->
      <article class="prose prose-lg dark:prose-invert mx-auto markdown" v-html="html"></article>

      <!-- Navigation -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <NuxtLink
          to="/"
          class="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          ← Back to blog
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const uid = route.params.uid as string

const { data } = await useFetch<Author>(`/api/author/${uid}`)
const author = data.value
if (!author) {
  throw createError({ statusCode: 404, statusMessage: 'Author not found' })
}

// Set head meta
watchEffect(() => {
  if (author?.meta) {
    useHead({
      title: author.meta.title,
      meta: [
        { name: 'description', content: author.meta.description },
        { name: 'robots', content: 'index, follow' }
      ],
      link: [{ rel: 'canonical', href: author.meta.canonical }]
    })
  }
})

// Render markdown content
const { html } = useMarkdown(author?.content || '')
</script>
