<template>
  <figure class="mb-10">
    <NuxtImg
      :src="image.url"
      :alt="image.alt || title"
      height="500"
      width="700"
      format="webp"
      class="w-full h-auto rounded-lg object-cover"
      preload
      fetchpriority="high"
    />
    <figcaption v-if="image.caption" class="text-sm text-gray-500 dark:text-gray-400 mt-2">
      {{ image.caption }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
const props = defineProps<{
  image: { url: string; alt?: string; caption?: string }
  title: string
}>()
</script>
