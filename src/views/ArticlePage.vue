<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { articles } from '@/lib/data'
import BaseButton from '@/components/BaseButton.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import MarkdownIt from 'markdown-it'
import { useComments } from '@/composables/useComments'
import CommentItem from '@/components/CommentItem.vue'
import { useTranslation } from '@/composables/useTranslation'
import {
  ArrowLeftIcon,
  BookmarkIcon as BookmarkOutlineIcon,
  EyeIcon,
  ShareIcon
} from '@heroicons/vue/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/vue/24/solid'

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true
})

const route = useRoute()
const router = useRouter()

const article = computed(() =>
  articles.find(a => a.slug === route.params.slug)
)


const { t, locale } = useI18n<{ locale: 'en' | 'es' | 'pt' }>()
const typedLocale = computed(() => locale.value as 'en' | 'es' | 'pt')

const { comments, addComment, likeComment } = useComments(route.params.slug as string)
const { translateContent, isTranslating } = useTranslation()

// Watch for language changes and translate content
watch([locale, article], async ([newLocale, currentArticle]) => {
  if (currentArticle) {
    await translateContent({
      articles: [currentArticle],
      comments: comments.value
    }, newLocale)
  }
}, { immediate: true })

const renderedContent = computed(() => {
  if (!article.value) return ''

  const translatedContent = article.value.translations?.[locale.value]?.content
  const content = translatedContent || article.value.content

  if (!content || typeof content !== 'string') return ''
  return md.render(content)
})

const galleryImages = computed(() => {
  if (!article.value) return []
  return article.value.images.map((image, index) => ({
    url: image.url,
    alt: `${article.value?.title} - Image ${index + 1}`,
    caption: image.caption
  }))
})

const newComment = ref('')
const authorName = ref('')
const commentError = ref('')
const sortBy = ref<'newest' | 'oldest' | 'mostLiked'>('newest')

const sortedComments = computed(() => {
  const sortedList = [...comments.value]

  switch (sortBy.value) {
    case 'oldest':
      return sortedList.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    case 'newest':
      return sortedList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    case 'mostLiked':
      return sortedList.sort((a, b) => b.likes - a.likes)
    default:
      return sortedList
  }
})

const submitComment = async () => {
  if (!newComment.value.trim() || !authorName.value.trim()) {
    commentError.value = 'Please fill in all fields'
    return
  }

  if (newComment.value.length > 1000) {
    commentError.value = 'Comment is too long (max 1000 characters)'
    return
  }

  commentError.value = ''

  const comment = addComment(newComment.value, {
    name: authorName.value,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName.value}`
  })

  // Translate the new comment if not in English
  await translateContent({
    comments: [comment]
  }, locale.value)

  newComment.value = ''
  authorName.value = ''
}

const shareArticle = async () => {
  if (!article.value) return

  try {
    await navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  } catch (err) {
    console.error('Clipboard error:', err)
    prompt('Copy this link to share:', window.location.href)
  }
}

const isBookmarked = ref(false)
const viewCount = ref(Math.floor(Math.random() * 1000) + 100)

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value
}

const formattedDate = computed(() => {
  if (!article.value) return ''
  return new Intl.DateTimeFormat(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(article.value.publishDate)
})

const readingTime = computed(() => {
  if (!article.value) return 0
  return article.value.readingTime
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <main v-if="article" class="relative">
      <!-- Hero Section -->
      <div class="relative h-[55vh] overflow-hidden">
        <img :src="article.featuredImage" :alt="article.title[typedLocale]"
          class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-gray-900/20" />

        <!-- Back Button -->
        <button @click="router.back()"
          class="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 text-white bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50">
          <ArrowLeftIcon class="w-5 h-5" />
          <span>{{ t('article.back') }}</span>
        </button>

        <!-- Content -->
        <div class="absolute inset-x-0 bottom-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div class="flex flex-wrap gap-2 mb-8 animate-fade-in">
            <span v-for="category in article.categories" :key="category.id"
              class="px-4 py-1.5 text-sm font-medium text-white bg-white/10 backdrop-blur-sm rounded-full border border-white/10 transition-colors hover:bg-white/20">
              {{ category.name[typedLocale] }}

            </span>
          </div>

          <h1 class="text-2xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 [text-wrap:balance] animate-slide-up">
            {{ article.title[typedLocale] }}
          </h1>

          <div class="flex items-center gap-6 text-white animate-slide-up">
            <div class="flex items-center gap-3">
              <div class="relative">
                <img :src="article.author.avatar" :alt="article.author.name"
                  class="w-12 h-12 rounded-full ring-2 ring-white/20" />
                <div
                  class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
              </div>
              <div>
                <div class="font-medium">{{ article.author.name }}</div>
                <div class="text-sm text-gray-300">{{ article.author.bio[typedLocale] }}</div>
              </div>
            </div>
            <div class="h-8 w-px bg-white/20" />
            <div class="space-y-1 text-sm">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formattedDate }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ t('article.readTime', { time: readingTime }) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-4xl mx-auto px-4 py-24 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <article class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden animate-scale-up">
          <div
            class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
            <div class="flex items-center gap-6 text-gray-600 dark:text-gray-400">
              <div class="flex items-center gap-2">
                <EyeIcon class="w-5 h-5" />
                <span>{{ t('article.views', { count: viewCount }) }}</span>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <button @click="toggleBookmark"
                class="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105"
                :class="{ 'text-primary-600 dark:text-primary-400': isBookmarked }">
                <component :is="isBookmarked ? BookmarkSolidIcon : BookmarkOutlineIcon" class="w-5 h-5" />
                <span>{{ isBookmarked ? t('article.bookmarked') : t('article.bookmark') }}</span>
              </button>

              <button @click="shareArticle"
                class="flex text-sm items-center gap-2 px-4 py-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-all duration-300 hover:scale-105">
                <ShareIcon class="w-5 h-5" />
                <span>{{ t('article.share') }}</span>
              </button>
            </div>
          </div>

          <div class="p-6 sm:p-8 lg:p-10">
            <div v-if="!isTranslating"
              class="prose dark:prose-invert dark:text-white prose-lg max-w-none prose-headings:scroll-mt-24 prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary-600 dark:prose-a:text-primary-400 hover:prose-a:text-primary-700 dark:hover:prose-a:text-primary-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-em:text-gray-700 dark:prose-em:text-gray-300 prose-code:text-gray-900 dark:prose-code:text-white prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-blockquote:border-l-4 prose-blockquote:border-primary-500 dark:prose-blockquote:border-primary-400 prose-blockquote:pl-4 prose-blockquote:italic"
              v-html="renderedContent" />


            <div v-else role="status" v-for="n in 3" :key="n" class="space-y-2.5 animate-pulse max-w-lg">
              <div class="flex items-center w-full py-8">
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <div class="flex items-center w-full max-w-[480px]">
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              </div>
              <div class="flex items-center w-full max-w-[400px]">
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                <div class="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <div class="flex items-center w-full max-w-[480px]">
                <div class="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              </div>
              <div class="flex items-center w-full max-w-[440px]">
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                <div class="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
              </div>
              <div class="flex items-center w-full max-w-[360px]">
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                <div class="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <span class="sr-only">Loading...</span>
            </div>



          </div>

          <div class="px-6 sm:px-8 lg:px-10 pb-10">
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
              <svg class="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ t('article.imageGallery') }}
            </h2>
            <ImageCarousel :images="galleryImages" />
          </div>
        </article>

        <!-- Comments Section -->
        <section class="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-sm font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              {{ t('article.commentSection.title') }}
              <span class="text-lg text-gray-600 dark:text-gray-400">
                {{ t('article.commentSection.count', { count: comments.length }) }}
              </span>
            </h2>

            <div class="flex items-center gap-2">

              <select v-model="sortBy"
                class="bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg border-0 py-1.5 pl-3 pr-8 focus:ring-2 focus:ring-primary-500">
                <option value="newest">{{ t('article.sortOptions.newest') }}</option>
                <option value="oldest">{{ t('article.sortOptions.oldest') }}</option>
                <option value="mostLiked">{{ t('article.sortOptions.mostLiked') }}</option>
              </select>
            </div>
          </div>

          <div class="mb-8 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <div class="mb-4 space-y-4">
              <input v-model="authorName" type="text" :placeholder="t('article.commentSection.yourName')"
                class="w-full bg-white dark:bg-gray-700 dark:text-white rounded-lg border-0 py-3 px-4 focus:ring-2 focus:ring-primary-500"
                maxlength="50" />
              <textarea v-model="newComment" rows="4" :placeholder="t('article.commentSection.joinConversation')"
                class="w-full bg-white dark:bg-gray-700 dark:text-white rounded-lg border-0 py-3 px-4 focus:ring-2 focus:ring-primary-500"
                maxlength="1000" />
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                {{ t('article.commentSection.characterCount', { current: newComment.length, max: 1000 }) }}
              </span>
              <BaseButton class="text-sm" variant="primary" @click="submitComment"
                :disabled="!newComment.trim() || !authorName.trim()">
                {{ t('article.commentSection.submit') }}
              </BaseButton>
            </div>

            <p v-if="commentError" class="mt-2 text-red-500 dark:text-red-400 text-sm">
              {{ commentError }}
            </p>
          </div>

          <div class="space-y-6">
            <CommentItem v-for="comment in sortedComments" :key="comment.id" :comment="comment" @like="likeComment"
              @reply="addComment" />
          </div>
        </section>
      </div>
    </main>

    <div v-else class="min-h-screen flex items-center justify-center px-4">
      <div class="text-center">
        <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{{ t('article.notFound') }}</h1>
        <router-link to="/"
          class="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline">
          <ArrowLeftIcon class="w-5 h-5" />
          <span>{{ t('article.returnHome') }}</span>
        </router-link>
      </div>
    </div>
  </div>




</template>