import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTranslation } from './useTranslation'

export interface Comment {
  id: string
  content: string
  translations?: Record<string, string>
  author: {
    name: string
    avatar: string
  }
  createdAt: Date
  likes: number
  parentId?: string
  replies: Comment[]
}

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
    parentId?: string
  ) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      translations: {},
      author,
      createdAt: new Date(),
      likes: 0,
      parentId,
      replies: []
    }
    
    if (parentId) {
      const parentComment = comments.value.find(c => c.id === parentId)
      if (parentComment) {
        parentComment.replies.push(newComment)
      }
    } else {
      comments.value.unshift(newComment)
    }
    
    saveComments()

    // Translate new comment if needed
    if (locale.value !== 'en') {
      translateContent({ comments: [newComment] }, locale.value)
    }

    return newComment
  }

  const likeComment = (commentId: string, parentId?: string) => {
    if (parentId) {
      const parentComment = comments.value.find(c => c.id === parentId)
      if (parentComment) {
        const reply = parentComment.replies.find(r => r.id === commentId)
        if (reply) {
          reply.likes++
        }
      }
    } else {
      const comment = comments.value.find(c => c.id === commentId)
      if (comment) {
        comment.likes++
      }
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