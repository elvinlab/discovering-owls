<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { articles, categories as availableCategories } from '@/lib/data'
import { useIntersectionObserver } from '@vueuse/core'
import {
  GlobeAltIcon,
  BeakerIcon,
  HeartIcon,
  SparklesIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ArrowUpIcon
} from '@heroicons/vue/24/outline'
import { HeartIcon as HeartFilledIcon } from '@heroicons/vue/24/solid'
import EmptyState from '@/components/EmptyState.vue'

const { t, locale } = useI18n<{ locale: 'en' | 'es' | 'pt' }>()
const typedLocale = computed(() => locale.value as 'en' | 'es' | 'pt')

// Initialize visible articles first
const visibleArticles = ref<typeof articles>([])
const currentPage = ref(1)
const articlesPerPage = 6
const isLoading = ref(false)

// Watch for language changes with immediate effect
watch([locale], async ([newLocale]) => {
  if (visibleArticles.value.length > 0 && newLocale !== 'en') {
    try {

      // Force a component re-render after translation
      visibleArticles.value = [...visibleArticles.value]
    } catch (error) {
      console.error('Translation error:', error)
    }
  }
}, { immediate: true })

// Scroll to top functionality
const showScrollTop = ref(false)

const checkScroll = () => {
  showScrollTop.value = window.scrollY > 500
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})

// Categories
const categories = computed(() => [
  {
    id: 'all',
    label: t('categories.all'),
    icon: AcademicCapIcon
  },
  ...availableCategories.map(cat => {
    const icons: Record<'species' | 'behavior' | 'adaptation' | 'conservation' | 'mythology', typeof AcademicCapIcon> = {
      'species': GlobeAltIcon,
      'behavior': HeartIcon,
      'adaptation': BeakerIcon,
      'conservation': SparklesIcon,
      'mythology': BookOpenIcon
    }
    return {
      id: cat.id,
      label: t(`categories.${cat.id}`),
      icon: icons[cat.id as keyof typeof icons] || AcademicCapIcon
    }
  })
])

const selectedCategory = ref('all')

const filteredArticles = computed(() => {
  if (selectedCategory.value === 'all') {
    return articles
  }
  return articles.filter(article =>
    article.categories.some(cat => cat.id === selectedCategory.value)
  )
})

const loadMoreRef = ref<HTMLElement | null>(null)
const hasMoreArticles = computed(() =>
  visibleArticles.value.length < filteredArticles.value.length
)

useIntersectionObserver(loadMoreRef, ([{ isIntersecting }]) => {
  if (isIntersecting && !isLoading.value && hasMoreArticles.value) {
    loadMoreArticles()
  }
})

const loadMoreArticles = async () => {
  if (isLoading.value ) return

  isLoading.value = true

  try {
    // Simular un retraso de 1 segundo
    setTimeout(() => {
      const start = (currentPage.value - 1) * articlesPerPage
      const end = start + articlesPerPage
      const newArticles = filteredArticles.value.slice(start, end)

      // Agregar nuevos artículos a la lista visible
      visibleArticles.value.push(...newArticles)
      currentPage.value++
    }, 1000) // 1000 ms = 1 segundo
  } catch (error) {
    console.error('Error loading articles:', error)
  } finally {
    // Asegurarse de que el estado de carga se actualice después del retraso
    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  }
}

// Likes functionality
const likedArticles = ref(new Set<string>())
const articleLikes = ref<Record<string, number>>(
  Object.fromEntries(articles.map(article => [article.id, article.likes]))
)

const toggleLike = (articleId: string, event: Event) => {
  event.preventDefault()
  event.stopPropagation()

  if (likedArticles.value.has(articleId)) {
    likedArticles.value.delete(articleId)
    articleLikes.value[articleId]--
  } else {
    likedArticles.value.add(articleId)
    articleLikes.value[articleId]++
  }

  // Save to localStorage
  localStorage.setItem('likedArticles', JSON.stringify([...likedArticles.value]))
  localStorage.setItem('articleLikes', JSON.stringify(articleLikes.value))
}


// Initialize likes from localStorage
onMounted(() => {
  const savedLikes = localStorage.getItem('likedArticles')
  if (savedLikes) {
    likedArticles.value = new Set(JSON.parse(savedLikes))
  }

  const savedArticleLikes = localStorage.getItem('articleLikes')
  if (savedArticleLikes) {
    articleLikes.value = JSON.parse(savedArticleLikes)
  }

  // Load initial articles
  loadMoreArticles()
})

// Reset visible articles when category changes
watch(selectedCategory, () => {
  visibleArticles.value = []
  currentPage.value = 1
  loadMoreArticles()
})
</script>

<template>
  <main>
    <!-- Hero Section -->
    <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="relative isolate px-6 py-20">
        <!-- Background gradient effect -->
        <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-200 to-primary-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
        </div>

        <!-- Content -->
        <div class="mx-auto max-w-4xl text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600">
            {{ t('hero.title') }}
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {{ t('hero.subtitle') }}
          </p>

          <div class="flex flex-wrap items-center justify-center gap-2 md:gap-4 mt-4">
          <img
            src="/buoLogo.png"
            alt="Buo"
            class="mb-2"
          />

          <span class="text-3xl dark:text-white">+</span>

          <svg
            width="50"
            height="50"
            viewBox="0 0 512 512"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            class="fill-gray-900 dark:fill-white w-12"
          >
            <g id="SVGRepo_iconCarrier">
              <title>ai</title>
              <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd">
                <g id="icon" transform="translate(64.000000, 64.000000)">
                  <path
                    d="M320,64 L320,320 L64,320 L64,64 L320,64 Z M171.749388,128 L146.817842,128 L99.4840387,256 L121.976629,256 L130.913039,230.977 L187.575039,230.977 L196.319607,256 L220.167172,256 L171.749388,128 Z M260.093778,128 L237.691519,128 L237.691519,256 L260.093778,256 L260.093778,128 Z M159.094727,149.47526 L181.409039,213.333 L137.135039,213.333 L159.094727,149.47526 Z M341.333333,256 L384,256 L384,298.666667 L341.333333,298.666667 L341.333333,256 Z M85.3333333,341.333333 L128,341.333333 L128,384 L85.3333333,384 L85.3333333,341.333333 Z M170.666667,341.333333 L213.333333,341.333333 L213.333333,384 L170.666667,384 L170.666667,341.333333 Z M85.3333333,0 L128,0 L128,42.6666667 L85.3333333,42.6666667 L85.3333333,0 Z M256,341.333333 L298.666667,341.333333 L298.666667,384 L256,384 L256,341.333333 Z M170.666667,0 L213.333333,0 L213.333333,42.6666667 L170.666667,42.6666667 L170.666667,0 Z M256,0 L298.666667,0 L298.666667,42.6666667 L256,42.6666667 L256,0 Z M341.333333,170.666667 L384,170.666667 L384,213.333333 L341.333333,213.333333 L341.333333,170.666667 Z M0,256 L42.6666667,256 L42.6666667,298.666667 L0,298.666667 L0,256 Z M341.333333,85.3333333 L384,85.3333333 L384,128 L341.333333,128 L341.333333,85.3333333 Z M0,170.666667 L42.6666667,170.666667 L42.6666667,213.333333 L0,213.333333 L0,170.666667 Z M0,85.3333333 L42.6666667,85.3333333 L42.6666667,128 L0,128 L0,85.3333333 Z"
                  ></path>
                </g>
              </g>
            </g>
          </svg>

          <span class="text-3xl dark:text-white">+</span>

          <svg
            viewBox="0 0 256 221"
            width="40"
            height="40"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
          >
            <path d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36Z" fill="#41B883" />
            <path d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0Z" fill="#41B883" />
            <path d="M50.56 0 128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56Z" fill="#35495E" />
          </svg>

          <span class="text-3xl dark:text-white">= ❤️</span>
        </div>
        </div>

        <!-- Bottom gradient effect -->
        <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary-400 to-primary-600 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
        </div>
      </div>
    </div>

    <!-- Articles Grid or Empty State -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Categories -->
      <nav class=" top-20 z-30 mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
        <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectedCategory = category.id"
            class="inline-flex items-center px-6 py-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 focus:ring-primary-500"
            :class="[
              selectedCategory === category.id
                ? 'bg-primary-500 text-white shadow-lg transform -translate-y-0.5'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm'
            ]"
          >
            <component
              :is="category.icon"
              class="w-5 h-5 mr-3"
              :class="selectedCategory === category.id ? 'text-white' : 'text-gray-500 dark:text-gray-400'"
            />
            <span class="font-medium">{{ category.label }}</span>
          </button>
        </div>
      </nav>

      <!-- Content -->
      <template v-if="filteredArticles.length > 0">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="article in visibleArticles"
            :key="article.id"
            class="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden animate-slide-up relative"
          >
            <!-- Article Content -->
            <div class="relative aspect-video overflow-hidden">
              <img
                :src="article.featuredImage"
                :alt="article.title[typedLocale]"
                class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <!-- Like Button -->
              <button
                @click="toggleLike(article.id, $event)"
                class="absolute top-4 right-4 p-2 rounded-full text-red-500 bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors z-10"
                :class="{ 'text-red-500': likedArticles.has(article.id) }"
              >
                <component
                  :is="likedArticles.has(article.id) ? HeartFilledIcon : HeartIcon"
                  class="w-5 h-5"
                />
              </button>
            </div>

            <div class="p-6">
              <div class="flex flex-wrap gap-2 mb-3">
                <span
                  v-for="category in article.categories"
                  :key="category.id"
                  class="px-2.5 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {{ t(`categories.${category.id}`) }}
                </span>
              </div>
              <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {{ article.title[typedLocale] }}
              </h2>
              <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {{ article.excerpt[typedLocale] }}
              </p>
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div class="flex items-center">
                  <img
                    :src="article.author.avatar"
                    :alt="article.author.name"
                    class="w-6 h-6 rounded-full mr-2"
                  />
                  <span>{{ article.author.name }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <span>{{ articleLikes[article.id] }} likes</span>
                  <span>{{ t('article.readTime', { time: article.readingTime }) }}</span>
                </div>
              </div>
            </div>

            <!-- Article Link -->
            <router-link
              :to="{ name: 'article', params: { slug: article.slug }}"
              class="absolute inset-0 z-0"
              :aria-label="article.title[typedLocale]"
            />
          </article>

          <!-- Skeleton Articles -->
          <template v-if="isLoading">
            <div
              v-for="n in 3"
              :key="n"
              class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden animate-pulse"
            >
              <!-- Skeleton Image -->
              <div class="aspect-video bg-gray-200 dark:bg-gray-700" />

              <div class="p-6">
                <!-- Skeleton Categories -->
                <div class="flex gap-2 mb-3">
                  <div class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div class="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
                </div>

                <!-- Skeleton Title -->
                <div class="h-7 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div class="h-7 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />

                <!-- Skeleton Excerpt -->
                <div class="space-y-2 mb-4">
                  <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>

                <!-- Skeleton Footer -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full mr-2" />
                    <div class="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div class="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Loading More Trigger -->
        <div
          v-if="hasMoreArticles"
          ref="loadMoreRef"
          class="h-20"
        />
      </template>

      <template v-else>
        <div class="min-h-[400px] bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <EmptyState
            type="articles"
            :title="t('categories.noArticles')"
            :description="t('categories.tryAnother')"
          >
            <template #actions>
              <button
                @click="selectedCategory = 'all'"
                class="inline-flex items-center px-4 py-2 rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
              >
                {{ t('categories.viewAll') }}
              </button>
              <button
                @click="selectedCategory = categories[Math.floor(Math.random() * categories.length)].id"
                class="inline-flex items-center px-4 py-2 rounded-xl bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                {{ t('categories.tryRandom') }}
              </button>
            </template>
          </EmptyState>
        </div>
      </template>

      <!-- Scroll to Top Button -->
      <button
        v-show="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 p-3 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        aria-label="Scroll to top"
      >
        <ArrowUpIcon class="w-6 h-6" />
      </button>
    </div>
  </main>
</template>
```