import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Locale } from 'vue-i18n'
import { translateContent } from '@/services/translationService'

export interface Language {
  code: Locale
  name: string
  flag: string
  dir: 'ltr' | 'rtl'
}

export function useLanguage() {
  const { locale } = useI18n()
  const isTranslating = ref(false)
  const translationProgress = ref(0)
  const translationError = ref<string | null>(null)

  const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
    { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
    { code: 'pt', name: 'Português', flag: '🇧🇷', dir: 'ltr' }
  ]

  const changeLanguage = async (newLocale: Locale, articles: any[]) => {
    if (isTranslating.value) return

    try {
      isTranslating.value = true
      translationError.value = null
      translationProgress.value = 0

      // Update locale immediately for UI elements
      locale.value = newLocale
      localStorage.setItem('language', newLocale)

      // Translate articles
      await translateContent({ articles }, newLocale)
      translationProgress.value = 100

    } catch (error: any) {
      console.error('Language change error:', error)
      translationError.value = error.message || 'Failed to translate content. Please try again.'
    } finally {
      setTimeout(() => {
        isTranslating.value = false
        translationProgress.value = 0
      }, 1000)
    }
  }

  return {
    isTranslating,
    translationProgress,
    translationError,
    changeLanguage,
    languages
  }
}