interface Author {
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
  name:  { en: string; es: string; pt: string }
  icon: string
}

export interface Image {
  url: string
  caption: string
}

export interface Article {
  id: string
  slug: string
  title: { en: string; es: string; pt: string }
  excerpt: { en: string; es: string; pt: string }
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
  translations?: Record<string, {
    content: string;
  }>;
}

export type ArticlePreview = Omit<Article, 'content' | 'images'>