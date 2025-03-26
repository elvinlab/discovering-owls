export interface Author {
  id: string
  name: string
  avatar: string
  bio: {
    en: string
    es: string
    pt: string
  }
}

export interface Category {
  id: string
  name: string | { en: string; es: string; pt: string }
  icon: string
}

export interface Image {
  url: string
  caption: string
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage: string
  images: Image[]
  author: Author
  rating: number
  readingTime: number
  likes: number
  categories: Pick<Category, 'id' | 'name'>[]
  publishDate: Date
  scientificNames?: string[]
}

export type ArticlePreview = Omit<Article, 'content' | 'images'>