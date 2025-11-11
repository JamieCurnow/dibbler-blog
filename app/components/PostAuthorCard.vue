<template>
  <div
    class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700"
  >
    <NuxtLink :to="authorLink" class="shrink-0">
      <NuxtImg
        v-if="author.image"
        :src="author.image"
        :alt="author.name"
        format="webp"
        height="96"
        width="96"
        loading="lazy"
        class="w-12 h-12 rounded-full object-cover"
      />
    </NuxtLink>
    <div class="grow">
      <NuxtLink
        :to="authorLink"
        rel="author"
        class="font-bold text-base text-gray-800 dark:text-gray-200 hover:underline"
      >
        {{ author.name }}
      </NuxtLink>
      <p v-if="author.bio" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {{ author.bio }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Author {
  uid?: string
  slug?: string
  name: string
  image?: string
  bio?: string
  url?: string
}

const props = defineProps<{ author: Author }>()

const authorLink = computed(() => {
  if (props.author.url) return props.author.url
  if (props.author.slug) return `/author/${props.author.slug}`
  if (props.author.uid) return `/author/${props.author.uid}`
  return '#'
})
</script>
