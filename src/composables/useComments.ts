import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTranslation } from './useTranslation'
import type { Comment } from '@/types/comment'

export function useComments(articleId: string) {
  const comments = ref<Comment[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const { locale } = useI18n()
  const { translateContent } = useTranslation()

  const loadComments = () => {
    try {
      const savedComments = localStorage.getItem(`comments-${articleId}`)
      if (savedComments) {
        comments.value = JSON.parse(savedComments).map((comment: any) => ({
          ...comment,
          createdAt: new Date(comment.createdAt),
          replies: (comment.replies || []).map((reply: any) => ({
            ...reply,
            createdAt: new Date(reply.createdAt)
          }))
        }))

        // Translate comments if needed
        if (locale.value !== 'en') {
          translateContent({ comments: comments.value }, locale.value)
        }
      }
    } catch (err) {
      error.value = 'Failed to load comments'
      console.error('Error loading comments:', err)
    }
  }

  const saveComments = () => {
    try {
      localStorage.setItem(`comments-${articleId}`, JSON.stringify(comments.value))
    } catch (err) {
      error.value = 'Failed to save comment'
      console.error('Error saving comments:', err)
    }
  }

  const addComment = (
    content: string,
    author: { name: string; avatar: string },
  ) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      translations: {},
      author: {
        id: Date.now().toString(),
        ...author
      },
      createdAt: new Date(),
      likes: 0,
    }

    comments.value.unshift(newComment)

    saveComments()

    // Translate new comment if needed
    if (locale.value !== 'en') {
      translateContent({ comments: [newComment] }, locale.value)
    }

    return newComment
  }

  const likeComment = (commentId: string) => {
    const comment = comments.value.find(c => c.id === commentId)
    if (comment) {
      comment.likes++
    }
    saveComments()
  }

  onMounted(loadComments)

  return {
    comments,
    isLoading,
    error,
    addComment,
    likeComment
  }
}