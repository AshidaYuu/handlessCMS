import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImage } from '@/types'

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

// 型定義はtypes/index.tsにまとめられています
export type { Post, SanityImage, Author, Category } from '@/types'

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
    body,
    mainImage,
    author->{
      _id,
      name,
      image
    },
    categories[]->{
      _id,
      title,
      description
    }
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
    body,
    mainImage,
    author->{
      _id,
      name,
      image
    },
    categories[]->{
      _id,
      title,
      description
    }
  }`,
  
  // 最新記事取得（件数指定）
  latestPosts: (count: number) => `*[_type == "post"] | order(publishedAt desc)[0...${count}] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    categories[]->{
      _id,
      title
    }
  }`
}