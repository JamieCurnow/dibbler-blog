<template>
  <header class="mb-10">
    <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
      {{ title }}
    </h1>
    <p v-if="subtitle" class="text-xl text-gray-600 dark:text-gray-400">{{ subtitle }}</p>
    <p v-if="datePublished" class="text-xs mt-1">
      Published on
      <time :datetime="datePublished">{{ formattedDate }}</time>
    </p>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  subtitle?: string
  datePublished?: string
}>()

const formattedDate = computed(() => {
  if (!props.datePublished) return ''
  try {
    return new Date(props.datePublished).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return props.datePublished
  }
})
</script>
