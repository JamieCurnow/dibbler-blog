<template>
  <section v-if="data" aria-labelledby="glance-heading" class="mb-12">
    <div
      class="relative overflow-hidden rounded-xl border border-emerald-200/70 dark:border-emerald-700/40 bg-linear-to-br from-emerald-50 via-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:via-emerald-900/30 dark:to-teal-900/30 shadow-sm"
    >
      <div class="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none" aria-hidden="true"></div>
      <div class="p-6 md:p-8">
        <h2
          id="glance-heading"
          class="text-xl md:text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-4 flex items-center gap-2"
        >
          <span>At a Glance</span>
          <span
            class="inline-flex items-center rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-800/60 dark:text-emerald-200 px-2 py-0.5 text-xs font-medium tracking-wide uppercase"
            >Quick Ref</span
          >
        </h2>
        <p
          v-if="data.summary"
          class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
        >
          {{ data.summary }}
        </p>
        <div class="grid gap-8 md:grid-cols-3">
          <div v-if="data.sowingMonths?.length">
            <h3 class="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200 uppercase mb-3">
              Sowing
            </h3>
            <ul class="flex flex-wrap gap-2">
              <MonthBadge v-for="m in data.sowingMonths" :key="m">{{ m }}</MonthBadge>
            </ul>
          </div>
          <div v-if="data.harvestMonths?.length">
            <h3 class="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200 uppercase mb-3">
              Harvest
            </h3>
            <ul class="flex flex-wrap gap-2">
              <MonthBadge v-for="m in data.harvestMonths" :key="m">{{ m }}</MonthBadge>
            </ul>
          </div>
          <div v-if="data.spacing">
            <h3 class="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200 uppercase mb-3">
              Spacing
            </h3>
            <div class="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <p v-if="data.spacing.inRow">
                <span class="font-medium text-gray-900 dark:text-gray-100">In-row:</span>
                {{ data.spacing.inRow }}
              </p>
              <p v-if="data.spacing.betweenRows">
                <span class="font-medium text-gray-900 dark:text-gray-100">Between rows:</span>
                {{ data.spacing.betweenRows }}
              </p>
              <p v-if="data.spacing.depth">
                <span class="font-medium text-gray-900 dark:text-gray-100">Depth:</span>
                {{ data.spacing.depth }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import MonthBadge from './MonthBadge.vue'
interface SpacingInfo {
  inRow?: string
  betweenRows?: string
  depth?: string
}

interface AtAGlanceData {
  summary?: string
  sowingMonths?: string[]
  harvestMonths?: string[]
  spacing?: SpacingInfo
}

const props = defineProps<{ data?: AtAGlanceData }>()
</script>
