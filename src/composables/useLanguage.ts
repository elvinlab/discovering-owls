import { useI18n } from 'vue-i18n'
import type { Locale } from 'vue-i18n'
export interface Language {
  code: Locale
  name: string
  flag: string
  dir: 'ltr' | 'rtl'
}

export function useLanguage() {
  const { locale } = useI18n()


  const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
    { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
    { code: 'pt', name: 'Português', flag: '🇧🇷', dir: 'ltr' }
  ]

  const changeLanguage = (newLocale: Locale) => {

    try {


      // Update locale immediately for UI elements
      locale.value = newLocale
      localStorage.setItem('language', newLocale)


    } catch (error: any) {
      console.error('Language change error:', error)

    }
  }

  return {

    changeLanguage,
    languages
  }
}