import { Metadata } from 'next'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import { sanityClient, queries } from '@/lib/sanity'
import { Post } from '@/types'
import NewsListClient from '@/components/news/NewsListClient'
import { generateMetadata } from '@/lib/utils'

export const metadata: Metadata = generateMetadata({
  title: 'お知らせ一覧',
  description: 'Kanauuuからのお知らせ一覧です。最新の情報をご確認いただけます。',
  url: '/news',
})

async function getAllPosts(): Promise<Post[]> {
  try {
    const posts = await sanityClient.fetch(queries.allPosts, {}, {
      next: { revalidate: 60 } // 60秒でキャッシュ更新
    })
    return posts || []
  } catch {
    console.error('Failed to fetch posts')
    return []
  }
}

export default async function NewsListPage() {
  const posts = await getAllPosts()

  return (
    <Layout>
      {/* Hero Section */}
      <section className="news-hero">
        <div className="news-hero-container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link href="/">ホーム</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">ニュース・お知らせ</span>
          </nav>

          {/* Title */}
          <div className="news-hero-content">
            <h1 className="news-hero-title">NEWS & BLOG</h1>
            <p className="news-hero-subtitle">Kanauuuの最新情報やお知らせをお届けします</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="news-list-section">
        <div className="news-list-container">
          {posts.length > 0 ? (
            <div className="news-list-wrapper">
              <NewsListClient posts={posts} />
            </div>
          ) : (
            /* Empty State */
            <div className="news-empty">
              <div className="news-empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="news-empty-title">記事を準備中です</h3>
              <p className="news-empty-text">現在、新しい記事を準備しています。しばらくお待ちください。</p>
              <Link href="/" className="news-empty-btn">
                ホームに戻る
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}