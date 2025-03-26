```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'
import { useRouter } from 'vue-router'
import { articles } from '@/lib/data'
import { useLanguage } from '@/composables/useLanguage'
import {
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
  LanguageIcon
} from '@heroicons/vue/24/outline'

const { t, locale } = useI18n<{ en: string; es: string; pt: string }>()
const router = useRouter()
const { isDark, toggleTheme } = useTheme()
const { changeLanguage } = useLanguage()

const searchQuery = ref('')
const isSearchFocused = ref(false)
const isLanguageMenuOpen = ref(false)

const languages = [
  { code: 'en', name: 'EN', label: 'US English' },
  { code: 'es', name: 'ES', label: 'Spanish' },
  { code: 'pt', name: 'PT', label: 'Brazilian Portuguese' }
]

const currentLanguage = computed(() =>
  languages.find(lang => lang.code === locale.value) || languages[0]
)

const setLanguage = (lang: string) => {
  if (lang === locale.value) return
  isLanguageMenuOpen.value = false
  changeLanguage(lang)
}

const filteredArticles = computed(() => {
  if (!searchQuery.value.trim()) return []

  const query = searchQuery.value.toLowerCase()
  return articles.filter(article =>
    article.title[locale.value as 'en' | 'es' | 'pt'].toLowerCase().includes(query) ||
    article.excerpt[locale.value as 'en' | 'es' | 'pt'].toLowerCase().includes(query)
  ).slice(0, 5)
})

const navigateToArticle = (slug: string) => {
  searchQuery.value = ''
  isSearchFocused.value = false
  router.push(`/article/${slug}`)
}

const handleSearchBlur = () => {
  setTimeout(() => {
    isSearchFocused.value = false
  }, 200)
}
</script>

<template>
  <header
    class="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/"
          class="text-gray-900 text-2xl dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <!-- Mostrar texto en dispositivos móviles -->
          <span class="block sm:hidden">
            {{ t('nav.brand') }}
          </span>
          <!-- Mostrar ícono o texto en resoluciones más grandes -->
          <span class="hidden sm:block">
            🦉🤖 Buo AI Challenge
          </span>
        </router-link>

        <!-- Search -->
        <div class="flex-1 max-w-xl mx-2">
          <div class="relative">
            <input v-model="searchQuery" type="search" :placeholder="t('nav.searchPlaceholder')"
              @focus="isSearchFocused = true" @blur="handleSearchBlur"
              class="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all" />
            <MagnifyingGlassIcon class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />

            <!-- Search Results Dropdown -->
            <div v-if="isSearchFocused && searchQuery && filteredArticles.length > 0"
              class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50 min-w-[320px] sm:min-w-[400px]">
              <ul class="py-2">
                <li v-for="article in filteredArticles" :key="article.id" @mousedown="navigateToArticle(article.slug)"
                  class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  <div class="flex items-center">
                    <img :src="article.featuredImage" :alt="article.title[locale as 'en' | 'es' | 'pt']"
                      class="w-12 h-12 object-cover rounded" />
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ article.title[locale as 'en' | 'es' | 'pt'] }}
                      </h3>
                      <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-1">
                        {{ article.excerpt[locale as 'en' | 'es' | 'pt'] }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>


            <!-- No Results Message -->
            <div v-if="isSearchFocused && searchQuery && filteredArticles.length === 0"
              class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 text-center text-gray-600 dark:text-gray-400 z-50">
              {{ t('nav.noResults') }}
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center ">
          <!-- Theme Toggle -->
          <button @click="toggleTheme"
            class="mx-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :aria-label="isDark ? t('nav.lightTheme') : t('nav.darkTheme')">
            <SunIcon v-if="isDark" class="w-5 h-5" />
            <MoonIcon v-else class="w-5 h-5" />
          </button>

          <!-- Language Selector -->
          <div class="relative">
            <button @click="isLanguageMenuOpen = !isLanguageMenuOpen"
              class="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <LanguageIcon class="w-5 h-5" />
              <span class="font-medium">{{ currentLanguage.name }}</span>
              <div class="flex items-center">
                <ChevronDownIcon class="w-5 h-5 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': isLanguageMenuOpen }" />

              </div>
            </button>

            <!-- Language Menu -->
            <div v-if="isLanguageMenuOpen"
              class="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 divide-y divide-gray-100 dark:divide-gray-700 z-50">
              <div class="py-1">
                <button v-for="lang in languages" :key="lang.code" @click="setLanguage(lang.code)"
                  class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  :class="{ 'bg-gray-100 dark:bg-gray-700': lang.code === locale }">
                  <span>{{ lang.name }}</span>
                  <span class="ml-2 text-xs text-gray-500 dark:text-gray-400">
                    {{ lang.label }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style>
```