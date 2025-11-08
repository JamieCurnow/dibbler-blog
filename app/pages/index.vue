<template>
  <div class="bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header class="text-center mb-12">
        <h1 class="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">Dibbler Blog</h1>
        <p class="mt-4 text-xl text-gray-600 dark:text-gray-400">
          Your go-to source for gardening tips and tricks.
        </p>
      </header>

      <div class="grid gap-10 lg:grid-cols-2">
        <article
          v-for="post in posts"
          :key="post.id"
          class="group relative bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden"
        >
          <NuxtLink :to="`/blog/${post.slug}`" class="block">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { carrots } from '~~/shared/mockData/how-to-grow-carrots'

const posts = [carrots]
</script>
