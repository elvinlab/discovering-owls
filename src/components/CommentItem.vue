<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Comment } from '@/types/comment'

const props = defineProps<{
  comment: Comment
  parentId?: string
}>()

const emit = defineEmits<{
  (e: 'like', commentId: string, parentId?: string): void
  (e: 'reply', content: string, author: { name: string; avatar: string }, parentId: string): void
}>()

const { locale } = useI18n()


const translatedContent = computed(() => {
  return props.comment.translations?.[locale.value] || props.comment.content
})

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat(locale.value, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}



</script>

<template>
  <div class="comment-item">
    <div class="bg-gray-100 dark:bg-gray-700/30 rounded-xl p-8">
      <div class="flex items-start gap-6">
        <img :src="comment.author.avatar" :alt="comment.author.name"
          class="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 ring-2 ring-gray-200 dark:ring-gray-700/50" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-3">
            <span class="font-semibold text-lg text-gray-900 dark:text-gray-100">{{ comment.author.name }}</span>
            <span class="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
              {{ formatDate(comment.createdAt) }}
            </span>
          </div>
          <p class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words text-lg leading-relaxed mb-4">
            {{ translatedContent }}
          </p>
          <div class="flex items-center gap-6">
            <button @click="emit('like', comment.id, parentId)"
              class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors group">
              <svg class="w-5 h-5 group-hover:scale-110 transition-transform"
                :class="{ 'text-blue-500 dark:text-blue-400': comment.likes > 0 }" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span>{{ comment.likes || '' }}</span>
            </button>

          </div>


        </div>
      </div>
    </div>


  </div>
</template>