export interface Article {
  slug: string
  title: string
  description: string
  content: string
  category: Category
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  readTime: number
  publishedAt: string
  updatedAt: string
  author: string
}

export interface Category {
  slug: string
  name: string
  description: string
  icon: string
  color: string
  articleCount: number
}

export interface SiteMetadata {
  title: string
  description: string
  url: string
  ogImage: string
  keywords: string[]
}

export interface SearchResult {
  article: Article
  score: number
}

export type Theme = 'light' | 'dark' | 'system'
