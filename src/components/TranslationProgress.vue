<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation'

const { isTranslating, translationProgress, translationError } = useTranslation()
</script>

<template>
  <transition
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isTranslating || translationError"
      class="fixed bottom-4 right-4 max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50"
    >
      <div v-if="isTranslating" class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium">Translating content...</span>
          <span class="text-sm text-gray-500">{{ Math.round(translationProgress) }}%</span>
        </div>
        <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-primary-500 transition-all duration-300"
            :style="{ width: `${translationProgress}%` }"
          />
        </div>
      </div>

      <div v-else-if="translationError" class="text-red-500 dark:text-red-400">
        {{ translationError }}
      </div>
    </div>
  </transition>
</template>