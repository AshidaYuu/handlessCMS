import { Metadata } from 'next'
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 pt-20">
        {/* Hero Section */}
        <div className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NEWS & BLOG
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
              Kanauuuの最新情報やお知らせをお届けします
            </p>
          </div>
        </div>

        {/* Main Content */}
        <main className="relative pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <NewsListClient posts={posts} />
          </div>
        </main>
      </div>
    </Layout>
  )
}