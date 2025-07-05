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
      {/* Hero Section with Modern Design */}
      <section className="relative bg-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='1'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Breadcrumb */}
              <nav className="flex justify-center mb-8" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                      </svg>
                      ホーム
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                      </svg>
                      <span className="ml-1 text-sm font-medium text-gray-700 md:ml-2">ニュース・お知らせ</span>
                    </div>
                  </li>
                </ol>
              </nav>

              {/* Title */}
              <div className="relative mb-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    NEWS & BLOG
                  </span>
                </h1>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
              </div>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Kanauuuの最新情報やお知らせをお届けします。<br className="hidden sm:block" />
                地方から夢を叶えるための取り組みや、教育事業の最新動向をご覧ください。
              </p>

              {/* Stats */}
              <div className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-12">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">{posts.length}</div>
                  <div className="text-sm text-gray-500 mt-1">記事総数</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600">Latest</div>
                  <div className="text-sm text-gray-500 mt-1">最新情報</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-indigo-600">Updates</div>
                  <div className="text-sm text-gray-500 mt-1">定期更新</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-6 sm:h-8 text-gray-50" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-gray-50 min-h-screen py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <NewsListClient posts={posts} />
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  記事を準備中です
                </h3>
                <p className="text-gray-600 mb-6">
                  現在、新しい記事を準備しています。<br />
                  しばらくお待ちください。
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  ホームに戻る
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  )
}