export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  translations?: Record<string, {
    bio: string;
  }>;
}

export interface Category {
  id: string;
  name: string;
  translations?: Record<string, {
    name: string;
  }>;
}

export interface Image {
  url: string;
  caption: string;
  translations?: Record<string, {
    caption: string;
  }>;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  images: Image[];
  author: Author;
  rating: number;
  readingTime: number;
  likes: number;
  categories: Category[];
  publishDate: Date;
  scientificNames?: string[];
  translations?: Record<string, {
    title: string;
    excerpt: string;
    content: string;
  }>;
}

export type ArticlePreview = Omit<Article, 'content' | 'scientificNames'>;