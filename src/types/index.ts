// Sanity関連の型定義
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface Slug {
  _type: 'slug'
  current: string
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

// 著者の型定義
export interface Author extends SanityDocument {
  _type: 'author'
  name: string
  slug?: Slug
  image?: SanityImage
  bio?: string
}

// ブログ記事の型定義
export interface Post extends SanityDocument {
  _type: 'post'
  title: string
  slug: Slug
  publishedAt: string
  excerpt?: string
  body?: unknown[] // Portable Text
  mainImage?: SanityImage
  author?: Author
  categories?: Category[]
  tags?: Tag[]
}

// カテゴリーの型定義
export interface Category extends SanityDocument {
  _type: 'category'
  title: string
  slug: Slug
  description?: string
}

// タグの型定義
export interface Tag extends SanityDocument {
  _type: 'tag'
  title: string
  slug: Slug
}

// サイト情報の型定義
export interface SiteConfig {
  title: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter?: string
    instagram?: string
    youtube?: string
    github?: string
  }
}

// ページネーション用の型
export interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}