import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 日付フォーマット（サーバー・クライアント一致）
export function formatDate(date: string | Date): string {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return '日付不明'
    
    // タイムゾーンの影響を受けないように、UTCベースで計算
    const year = d.getUTCFullYear()
    const month = (d.getUTCMonth() + 1).toString().padStart(2, '0')
    const day = d.getUTCDate().toString().padStart(2, '0')
    
    return `${year}.${month}.${day}`
  } catch (error) {
    return '日付不明'
  }
}

// 相対日付（例: 3日前）
export function formatRelativeDate(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)
  
  if (diffInSeconds < 60) return '今'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}分前`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}時間前`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}日前`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}ヶ月前`
  
  return `${Math.floor(diffInSeconds / 31536000)}年前`
}

// 文字列を切り詰める
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

// スラッグを生成
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 特殊文字を削除
    .replace(/[\s_-]+/g, '-') // スペースとアンダースコアをハイフンに
    .replace(/^-+|-+$/g, '') // 先頭末尾のハイフンを削除
}

// メタデータ生成ヘルパー
export function generateMetadata({
  title,
  description,
  image,
  url,
  type = 'website'
}: {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}) {
  const siteName = 'Kanauuu'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kanauuu.com'
  
  return {
    title: `${title} | ${siteName}`,
    description,
    openGraph: {
      type,
      title: `${title} | ${siteName}`,
      description,
      url: url ? `${siteUrl}${url}` : siteUrl,
      siteName,
      images: [
        {
          url: image || '/assets/images/ogp-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteName}`,
      description,
      images: [image || '/assets/images/ogp-image.png'],
    },
  }
}