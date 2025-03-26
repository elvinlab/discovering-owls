import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Article } from '@/lib/types'

export function useArticle(article: Article | undefined) {
  const { locale } = useI18n()

  const localizedTitle = computed(() => {
    if (!article) return ''
    return locale.value === 'en' 
      ? article.title 
      : article.translations?.[locale.value]?.title || article.title
  })

  const localizedExcerpt = computed(() => {
    if (!article) return ''
    return locale.value === 'en'
      ? article.excerpt
      : article.translations?.[locale.value]?.excerpt || article.excerpt
  })

  const localizedContent = computed(() => {
    if (!article) return ''
    
    let content = locale.value === 'en'
      ? article.content
      : article.translations?.[locale.value]?.content || article.content
    
    // Preserve scientific names in Latin if they exist
    if (article.scientificNames?.length) {
      article.scientificNames.forEach(name => {
        const regex = new RegExp(`\\b${name}\\b`, 'g')
        content = content.replace(regex, `<em>${name}</em>`)
      })
    }
    
    return content
  })

  const localizedCategories = computed(() => {
    if (!article) return []
    return article.categories.map(category => ({
      ...category,
      name: locale.value === 'en'
        ? category.name
        : category.translations?.[locale.value]?.name || category.name
    }))
  })

  const localizedImages = computed(() => {
    if (!article) return []
    return article.images.map(image => ({
      ...image,
      caption: locale.value === 'en'
        ? image.caption
        : image.translations?.[locale.value]?.caption || image.caption
    }))
  })

  const localizedAuthorBio = computed(() => {
    if (!article) return ''
    return locale.value === 'en'
      ? article.author.bio
      : article.author.translations?.[locale.value]?.bio || article.author.bio
  })

  const formattedDate = computed(() => {
    if (!article?.publishDate) return ''
    return new Intl.DateTimeFormat(locale.value, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(article.publishDate)
  })

  const readingTime = computed(() => {
    if (!article) return 0
    return article.readingTime
  })

  return {
    localizedTitle,
    localizedExcerpt,
    localizedContent,
    localizedCategories,
    localizedImages,
    localizedAuthorBio,
    formattedDate,
    readingTime
  }
}