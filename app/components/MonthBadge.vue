<template>
  <li
    class="month-badge px-2.5 py-1 rounded-md text-xs font-medium ring-1 shadow-sm transition-colors"
    :class="[
      // base light/dark
      'bg-white/90 text-emerald-800 ring-emerald-200/70 dark:bg-emerald-800/60 dark:text-emerald-100 dark:ring-emerald-700/50',
      // subtle highlight for current month
      isCurrent
        ? 'bg-emerald-50 text-emerald-900 ring-emerald-500/70 ring-2 dark:bg-emerald-700/70 dark:text-emerald-50 dark:ring-emerald-500/60'
        : ''
    ]"
    :aria-current="isCurrent ? 'date' : undefined"
    :title="isCurrent ? 'This month' : undefined"
  >
    <slot />
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    month?: string
    highlightCurrent?: boolean
  }>(),
  { highlightCurrent: true }
)

const currentShort = new Date().toLocaleString('en-GB', { month: 'short' })
const norm = (s?: string) => (s ? s.slice(0, 3).toLowerCase() : '')
const isCurrent = computed(() => !!props.highlightCurrent && norm(props.month) === norm(currentShort))
</script>

<style scoped>
.month-badge {
  backdrop-filter: saturate(180%) blur(4px);
}
</style>
