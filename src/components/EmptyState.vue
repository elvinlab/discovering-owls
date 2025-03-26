<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  DocumentIcon,
  ArrowPathIcon,
  SparklesIcon
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  type?: 'articles' | 'search' | 'generic'
  title?: string
  description?: string
}>()

const { t } = useI18n()

const defaultContent = computed(() => ({
  articles: {
    icon: DocumentIcon,
    title: t('categories.noArticles'),
    description: t('categories.tryAnother')
  },
  search: {
    icon: SparklesIcon,
    title: t('nav.noResults'),
    description: t('nav.tryDifferentSearch')
  },
  generic: {
    icon: ArrowPathIcon,
    title: t('common.noContent'),
    description: t('common.checkBack')
  }
})[props.type || 'generic'])

const content = computed(() => ({
  icon: defaultContent.value.icon,
  title: props.title || defaultContent.value.title,
  description: props.description || defaultContent.value.description
}))
</script>

<template>
  <div class="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
    <!-- Decorative Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <div class="absolute inset-0 bg-gradient-to-r from-primary-200 to-primary-400 dark:from-primary-900 dark:to-primary-700 transform -skew-y-12" />
    </div>

    <!-- Icon -->
    <div class="relative mb-6">
      <div class="absolute inset-0 bg-primary-100 dark:bg-primary-900/50 rounded-full blur-xl animate-pulse" />
      <div class="relative w-20 h-20 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center">
        <component
          :is="content.icon"
          class="w-10 h-10 text-primary-500 dark:text-primary-400 animate-bounce-sm"
        />
      </div>
    </div>

    <!-- Content -->
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
      {{ content.title }}
    </h3>
    <p class="text-gray-600 dark:text-gray-400 max-w-md">
      {{ content.description }}
    </p>

    <!-- Action Buttons -->
    <div class="mt-8 flex flex-wrap justify-center gap-4">
      <slot name="actions">
        <router-link
          to="/"
          class="inline-flex items-center px-4 py-2 rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
        >
          {{ t('categories.viewAll') }}
        </router-link>
      </slot>
    </div>
  </div>
</template>