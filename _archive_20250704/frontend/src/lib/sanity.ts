/**
 * Sanityクライアントの設定
 * Next.jsアプリケーションからSanityのデータを取得するための設定
 */

import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// Sanityクライアントの設定
export const client = createClient({
  // プロジェクトID（環境変数から取得、デフォルト値付き）
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rt90f87e',
  // データセット名（環境変数から取得、デフォルト値付き）
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  // APIバージョン（環境変数から取得、デフォルト値付き）
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  // CDNを使用するかどうか（本番環境ではtrue推奨）
  useCdn: process.env.NODE_ENV === 'production',
  // 認証トークン（プレビュー機能で使用）
  token: process.env.SANITY_API_READ_TOKEN,
})

// 画像URLビルダーの設定
const builder = imageUrlBuilder(client)

/**
 * Sanityの画像を最適化されたURLに変換する関数
 * @param source - Sanityの画像オブジェクト
 * @returns 画像URLビルダー
 */
export function urlFor(source: any) {
  return builder.image(source)
}

// プレビュー用のクライアント設定
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rt90f87e',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  // プレビューモードではCDNを使用しない
  useCdn: false,
  // プレビュー用のトークンを使用
  token: process.env.SANITY_API_READ_TOKEN,
})

/**
 * プレビューモードに応じて適切なクライアントを返す関数
 * @param preview - プレビューモードかどうか
 * @returns Sanityクライアント
 */
export function getClient(preview?: boolean) {
  return preview ? previewClient : client
}