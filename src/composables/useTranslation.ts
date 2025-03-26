import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Locale } from 'vue-i18n'
import { translateContent as translateContentService } from '@/services/translationService'
import type { Article } from '@/types/article'
import type { Comment } from '@/types/comment'

interface TranslationContent {
  articles?: Article[]
  article?: Article
  comments?: Comment[]
}

export function useTranslation() {
  const { locale } = useI18n()
  const isTranslating = ref(false)
  const translationError = ref<string | null>(null)
  const translationProgress = ref(0)

  const translateContent = async (
    content: TranslationContent,
    targetLanguage: Locale
  ) => {
    if (isTranslating.value) return

    try {
      isTranslating.value = true
      translationError.value = null
      translationProgress.value = 0

      await translateContentService(content, targetLanguage)
      translationProgress.value = 100

    } catch (error: any) {
      console.error('Translation error:', error)
      translationError.value = error.message || 'Failed to translate content'
      throw error
    } finally {
      setTimeout(() => {
        isTranslating.value = false
        translationProgress.value = 0
      }, 500)
    }
  }

  return {
    isTranslating,
    translationError,
    translationProgress,
    translateContent
  }
}