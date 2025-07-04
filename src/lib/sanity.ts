import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityConfig = {
  projectId: 'rt90f87e',
  dataset: 'production',
  apiVersion: '2023-10-01',
  useCdn: true,
}

export const sanityClient = createClient(sanityConfig)

// 画像URL生成用のbuilder
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}

// 型定義
export interface Post {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  excerpt?: string
  body?: unknown[]
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

// 記事取得用のクエリ
export const queries = {
  // 全記事取得
  allPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    publishedAt,
    excerpt,
    body
  }`,
  
  // 特定のスラッグの記事取得
  postBySlug: (slug: string) => `*[_type == "post" && slug.current == "${slug}"][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    publishedAt,
    excerpt,
    body
  }`,
  
  // 最新記事取得（件数指定）
  latestPosts: (count: number) => `*[_type == "post"] | order(publishedAt desc)[0...${count}] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt
  }`
}