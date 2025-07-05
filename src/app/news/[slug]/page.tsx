import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import { sanityClient, queries } from '@/lib/sanity'
import { Post } from '@/types'
import { formatDate, generateMetadata } from '@/lib/utils'
import Link from 'next/link'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await sanityClient.fetch(queries.postBySlug(slug))
    return post
  } catch (error) {
    console.error('Failed to fetch post:', error)
    return null
  }
}

export async function generateStaticParams() {
  try {
    const posts = await sanityClient.fetch(queries.allPosts)
    return posts.map((post: Post) => ({
      slug: post.slug.current,
    }))
  } catch (error) {
    console.error('Failed to fetch posts for static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return generateMetadata({
      title: 'お知らせが見つかりません',
      description: 'お探しのお知らせは見つかりませんでした。',
    })
  }

  return generateMetadata({
    title: post.title,
    description: post.excerpt || post.title,
    url: `/news/${post.slug.current}`,
    type: 'article',
  })
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <nav className="bg-gray-50 border-b">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">HOME</Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link href="/news" className="text-gray-500 hover:text-gray-700">NEWS</Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-medium truncate max-w-xs">
                {post.title}
              </li>
            </ol>
          </div>
        </nav>

        {/* Main Content */}
        <article className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-6">
            {/* Header */}
            <header className="mb-12 text-center">
              <time className="text-sm text-gray-500">
                {formatDate(post.publishedAt)}
              </time>
              <h1 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
                {post.title}
              </h1>
            </header>

            {/* Body */}
            <div className="prose prose-lg max-w-none">
              {post.excerpt ? (
                <div className="mb-8">
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              ) : null}

              {/* Portable Text would be rendered here */}
              {post.body ? (
                <div className="space-y-4">
                  {/* TODO: Implement Portable Text renderer */}
                  <p className="text-gray-600">
                    この記事の詳細は、Sanity Studio で設定された内容が表示されます。
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-600">
                    この記事の本文は準備中です。
                  </p>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <footer className="mt-16 pt-8 border-t">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/news"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  一覧に戻る
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  トップページ
                </Link>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </Layout>
  )
}