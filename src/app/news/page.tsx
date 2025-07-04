import { Metadata } from 'next'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import { sanityClient, queries } from '@/lib/sanity'
import { Post } from '@/types'
import NewsListClient from '@/components/news/NewsListClient'
import { generateMetadata as generateMeta } from '@/lib/utils'

export const metadata: Metadata = generateMeta({
  title: 'お知らせ一覧',
  description: 'Kanauuuからのお知らせ一覧です。最新の情報をご確認いただけます。',
  url: '/news',
})

async function getAllPosts(): Promise<Post[]> {
  try {
    const posts = await sanityClient.fetch(queries.allPosts)
    return posts || []
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    return []
  }
}

export default async function NewsListPage() {
  const posts = await getAllPosts()

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">HOME</Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-medium">NEWS</li>
            </ol>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              お知らせ一覧
            </h1>

            <NewsListClient posts={posts} />
          </div>
        </main>
      </div>
    </Layout>
  )
}