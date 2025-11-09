<template>
  <li
    class="month-badge px-2.5 py-1 rounded-md bg-white/90 dark:bg-emerald-800/60 text-emerald-800 dark:text-emerald-100 text-xs font-medium ring-1 ring-emerald-200/70 dark:ring-emerald-700/50 shadow-sm"
  >
    <slot />
  </li>
</template>

<script setup lang="ts">
// Simple presentational component for month pills
</script>

<style scoped>
.month-badge {
  backdrop-filter: saturate(180%) blur(4px);
}
</style>
