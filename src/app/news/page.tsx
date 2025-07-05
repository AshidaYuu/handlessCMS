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
    const posts = await sanityClient.fetch(queries.allPosts)
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
      {/* Hero Section - Simple & Clean */}
      <div className="bg-white pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              ホーム
            </Link>
            <span>/</span>
            <span className="text-gray-900">ニュース・お知らせ</span>
          </nav>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              NEWS & BLOG
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kanauuuの最新情報やお知らせをお届けします
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <NewsListClient posts={posts} />
          ) : (
            /* Empty State */
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                記事を準備中です
              </h3>
              <p className="text-gray-600 mb-6">
                現在、新しい記事を準備しています。しばらくお待ちください。
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                ホームに戻る
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}