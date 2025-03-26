import type { Locale } from 'vue-i18n'
import type { Article } from '@/types/article'
import type { Comment } from '@/types/comment'
import OpenAI from 'openai'

interface TranslationOptions {
  preserveFormatting?: boolean
}

interface TranslationContent {
  articles?: Article[]
  comments?: Comment[]
}

// Cache translations to avoid redundant calls
const translationCache = new Map<string, { translation: string; timestamp: number }>()
const CACHE_DURATION = 1000 * 60 * 60 * 24 // 24 hours

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

function getCacheKey(text: string, targetLanguage: string): string {
  return `${text}_${targetLanguage}`
}

function getFromCache(text: string, targetLanguage: string): string | null {
  const key = getCacheKey(text, targetLanguage)
  const cached = translationCache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.translation
  }
  return null
}

function saveToCache(text: string, targetLanguage: string, translation: string): void {
  const key = getCacheKey(text, targetLanguage)
  translationCache.set(key, {
    translation,
    timestamp: Date.now()
  })
}

async function translateText(
  text: string,
  targetLanguage: Locale,
  options: TranslationOptions = {}
): Promise<string> {
  if (!text?.trim() || targetLanguage === 'en') {
    return text
  }

  try {
    const cached = getFromCache(text, targetLanguage)
    if (cached) return cached

    let systemPrompt = `You are a professional translator. Translate the following text to ${targetLanguage}. Return ONLY the translated text without any explanations or additional content.`

    if (options.preserveFormatting) {
      systemPrompt += ' Maintain all formatting, including markdown syntax, line breaks, and special characters.'
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.3,
    })

    const translation = completion.choices[0].message.content || text
    saveToCache(text, targetLanguage, translation)
    return translation

  } catch (error) {
    console.warn('Translation error:', error)
    return text // Return original text as fallback
  }
}

export async function translateContent(
  content: TranslationContent,
  targetLanguage: Locale
): Promise<void> {
  if (targetLanguage === 'en') return

  try {
    if (content.articles) {
      for (const article of content.articles) {
        if (!article.translations) {
          article.translations = {}
        }

        if (!article.translations[targetLanguage]) {
          article.translations[targetLanguage] = {
            content: await translateText(article.content, targetLanguage, { preserveFormatting: true })
          }
        }


      }
    }
    if (content.comments) {
      for (const comment of content.comments) {
        if (!comment.translations) {
          comment.translations = {}
        }
        if (!comment.translations[targetLanguage]) {
          comment.translations[targetLanguage] = await translateText(comment.content, targetLanguage)
        }
      }
    }
  } catch (error) {
    console.warn('Translation content error:', error)
    // Don't throw error to prevent UI disruption
    // Failed translations will fall back to original text
  }
}