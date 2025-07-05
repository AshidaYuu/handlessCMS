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
  } catch {
    return '日付不明'
  }
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