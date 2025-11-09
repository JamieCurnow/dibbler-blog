<template>
  <div class="bg-white dark:bg-gray-900 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-16">
        <!-- Main Content -->
        <article class="lg:col-span-8">
          <!-- Post Header -->
          <header class="mb-10">
            <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
              {{ post.title }}
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-400">{{ post.subtitle }}</p>
            <p class="text-xs mt-1">
              Published on
              <time :datetime="post.datePublished">{{
                new Date(post.datePublished).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              }}</time>
            </p>
          </header>

          <!-- Cover Image -->
          <div class="mb-10">
            <img
              :src="post.coverImage.url"
              :alt="post.coverImage.alt || post.title"
              class="w-full h-auto rounded-lg object-cover"
            />
            <!-- Cover Image Caption -->
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {{ post.coverImage.caption }}
            </p>
          </div>

          <!-- Author & Meta -->
          <div
            class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700"
          >
            <NuxtLink :to="`/author/${post.author.uid}`" class="shrink-0">
              <img
                v-if="post.author.image"
                :src="post.author.image"
                :alt="post.author.name"
                class="w-12 h-12 rounded-full object-cover"
              />
            </NuxtLink>
            <div class="grow">
              <NuxtLink
                :to="`/author/${post.author.uid}`"
                rel="author"
                class="font-bold text-base text-gray-800 dark:text-gray-200 hover:underline"
              >
                {{ post.author.name }}
              </NuxtLink>
              <!-- Author Bio -->
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ post.author.bio }}
              </p>
            </div>
          </div>

          <!-- Post Content -->
          <div class="prose prose-lg dark:prose-invert max-w-none markdown" v-html="html"></div>
        </article>

        <!-- Sticky Table of Contents -->
        <aside class="hidden lg:block lg:col-span-4">
          <div class="sticky top-24">
            <nav
              class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6"
            >
              <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Table of Contents</h2>
              <ul class="space-y-2">
                <li v-for="item in toc" :key="item.id" :style="{ paddingLeft: (item.level - 1) * 16 + 'px' }">
                  <a
                    :href="item.link"
                    class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm"
                  >
                    {{ item.text }}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { carrots } from '~~/shared/mockData/how-to-grow-carrots'
const post = carrots

// head
useBlogMeta(post)

// markdown rendering
const { html } = useMarkdown(post.content)

// toc
const { toc } = useTocFromMarkdown(post.content)
</script>
