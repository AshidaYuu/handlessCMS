/**
 * 投稿関連の型定義
 * TypeScriptで型安全性を確保するための定義
 */

// 投稿の型定義
export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  mainImage?: {
    _type: string
    asset: {
      _ref: string
      _type: string
    }
  }
  body?: any[] // Portable Text形式
  author?: Author | string // 簡易表示では文字列、詳細表示ではAuthorオブジェクト
  categories?: string[]
}

// 著者の型定義
export interface Author {
  _id?: string
  name: string
  slug?: {
    current: string
  }
  image?: {
    _type: string
    asset: {
      _ref: string
      _type: string
    }
  }
  bio?: any[] // Portable Text形式
}

// カテゴリーの型定義
export interface Category {
  _id: string
  title: string
  description?: string
}