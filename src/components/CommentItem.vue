<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Comment } from '@/composables/useComments'
import BaseButton from '@/components/BaseButton.vue'

const props = defineProps<{
  comment: Comment
  parentId?: string
}>()

const emit = defineEmits<{
  (e: 'like', commentId: string, parentId?: string): void
  (e: 'reply', content: string, author: { name: string; avatar: string }, parentId: string): void
}>()

const { locale } = useI18n()

const isReplying = ref(false)
const replyContent = ref('')
const replyAuthor = ref('')
const replyError = ref('')

const translatedContent = computed(() => {
  if (locale.value === 'en') return props.comment.content
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

// Generate initials avatar
const generateInitialsAvatar = (name: string) => {
  const initials = name.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return `data:image/svg+xml;base64,${btoa(`<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#64748B"/><text x="20" y="24" font-family="Arial" font-size="14" fill="white" text-anchor="middle">${initials}</text></svg>`)}`
}

const submitReply = () => {
  if (!replyContent.value.trim() || !replyAuthor.value.trim()) {
    replyError.value = 'Please fill in all fields'
    return
  }

  if (replyContent.value.length > 1000) {
    replyError.value = 'Reply is too long (max 1000 characters)'
    return
  }

  emit('reply', replyContent.value, {
    name: replyAuthor.value,
    avatar: generateInitialsAvatar(replyAuthor.value)
  }, props.comment.id)

  replyContent.value = ''
  replyAuthor.value = ''
  replyError.value = ''
  isReplying.value = false
}
</script>

<template>
  <div class="comment-item">
    <div class="bg-gray-100 dark:bg-gray-700/30 rounded-xl p-8">
      <div class="flex items-start gap-6">
        <img
          :src="comment.author.avatar"
          :alt="comment.author.name"
          class="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 ring-2 ring-gray-200 dark:ring-gray-700/50"
        />
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
            <button
              @click="emit('like', comment.id, parentId)"
              class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors group"
            >
              <svg
                class="w-5 h-5 group-hover:scale-110 transition-transform"
                :class="{ 'text-blue-500 dark:text-blue-400': comment.likes > 0 }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              <span>{{ comment.likes || '' }}</span>
            </button>
            <button
              @click="isReplying = !isReplying"
              class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                />
              </svg>
              <span>Reply</span>
            </button>
          </div>

          <!-- Reply Form -->
          <div v-if="isReplying" class="mt-6 bg-white dark:bg-gray-800/50 rounded-lg p-6 shadow-sm">
            <input
              v-model="replyAuthor"
              type="text"
              placeholder="Your name"
              class="w-full bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-600 p-3 focus:outline-none focus:border-blue-500 transition-colors mb-4"
              maxlength="50"
            />
            <textarea
              v-model="replyContent"
              rows="3"
              placeholder="Write a reply..."
              class="w-full bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-600 p-4 focus:outline-none focus:border-blue-500 transition-colors"
              maxlength="1000"
            />
            <div class="flex items-center justify-between mt-4">
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ replyContent.length }}/1000 characters
              </span>
              <div class="space-x-3">
                <BaseButton
                  variant="ghost"
                  @click="isReplying = false"
                >
                  Cancel
                </BaseButton>
                <BaseButton
                  variant="primary"
                  @click="submitReply"
                  :disabled="!replyContent.trim() || !replyAuthor.trim()"
                >
                  Reply
                </BaseButton>
              </div>
            </div>
            <p v-if="replyError" class="mt-2 text-red-500 dark:text-red-400 text-sm">
              {{ replyError }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Nested Replies -->
    <div v-if="comment.replies?.length" class="mt-6 ml-12 space-y-6">
      <CommentItem
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
        :parent-id="comment.id"
        @like="emit('like', $event, comment.id)"
        @reply="emit('reply', $event, $event2, comment.id)"
      />
    </div>
  </div>
</template>