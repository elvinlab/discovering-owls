import { ref, computed } from 'vue'
import type { Article } from '@/types/article'
import type { Locale } from 'vue-i18n'
import { translateContent } from '@/services/translationService'

interface QueueItem {
  article: Article
  targetLanguage: Locale
  resolve: (value: void) => void
  reject: (error: Error) => void
}

export function useTranslationQueue() {
  const queue = ref<QueueItem[]>([])
  const isProcessing = ref(false)
  const batchSize = 3 // Reduced batch size for more frequent updates
  const batchDelay = 500 // Reduced delay between batches

  const addToQueue = async (article: Article, targetLanguage: Locale): Promise<void> => {
    // Skip if article already has translations for this language
    if (article.translations?.[targetLanguage]) {
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      queue.value.push({ article, targetLanguage, resolve, reject })
      // Start processing immediately
      if (!isProcessing.value) {
        processQueue()
      }
    })
  }

  const addBatchToQueue = async (articles: Article[], targetLanguage: Locale): Promise<void> => {
    // Filter out articles that already have translations
    const untranslatedArticles = articles.filter(
      article => !article.translations?.[targetLanguage]
    )

    if (untranslatedArticles.length === 0) return

    const promises = untranslatedArticles.map(article => 
      addToQueue(article, targetLanguage)
    )

    // Process all promises concurrently
    await Promise.all(promises)
  }

  const processQueue = async () => {
    if (isProcessing.value || queue.value.length === 0) return

    isProcessing.value = true

    try {
      while (queue.value.length > 0) {
        // Process articles in smaller batches
        const batch = queue.value.splice(0, batchSize)
        
        // Group articles by target language
        const batchesByLanguage = batch.reduce((acc, item) => {
          if (!acc[item.targetLanguage]) {
            acc[item.targetLanguage] = []
          }
          acc[item.targetLanguage].push(item)
          return acc
        }, {} as Record<Locale, QueueItem[]>)

        // Process each language batch
        for (const [targetLanguage, items] of Object.entries(batchesByLanguage)) {
          try {
            await translateBatch(items, targetLanguage as Locale)
            // Resolve promises immediately after each batch
            items.forEach(item => item.resolve())
          } catch (error) {
            console.error('Translation batch error:', error)
            items.forEach(item => item.reject(error as Error))
          }

          // Force a small delay between translations to ensure UI updates
          await new Promise(resolve => setTimeout(resolve, 100))
        }

        // Add delay between batches
        if (queue.value.length > 0) {
          await new Promise(resolve => setTimeout(resolve, batchDelay))
        }
      }
    } finally {
      isProcessing.value = false
    }
  }

  const translateBatch = async (items: QueueItem[], targetLanguage: Locale) => {
    const articles = items.map(item => item.article)
    await translateContent({ articles }, targetLanguage)
  }

  return {
    addToQueue,
    addBatchToQueue,
    isProcessing,
    queueSize: computed(() => queue.value.length)
  }
}