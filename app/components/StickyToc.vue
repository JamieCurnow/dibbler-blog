<template>
  <aside class="hidden lg:block lg:col-span-4">
    <div class="sticky top-24">
      <nav
        class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6"
        role="navigation"
        aria-labelledby="toc-heading"
      >
        <h2 id="toc-heading" class="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Table of Contents
        </h2>
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
</template>

<script setup lang="ts">
interface TocItem {
  id: string
  text: string
  level: number
  link: string
}

const props = defineProps<{ toc: TocItem[] }>()
</script>
