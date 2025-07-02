/**
 * ブログのホームページ
 * Sanityから投稿一覧を取得して表示
 */

import { client } from '@/lib/sanity'
import { allPostsQuery } from '@/lib/queries'
import { Post } from '@/types/post'

import Link from 'next/link'

// PostCard が見つからない場合の一時的な対処
const PostCardFallback = ({ post }: { post: Post }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
    <h3 className="text-xl font-bold mb-2">
      <Link 
        href={`/posts/${post.slug.current}`}
        className="hover:text-blue-600 transition-colors"
      >
        {post.title}
      </Link>
    </h3>
    <p className="text-gray-600 mb-4">
      {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('ja-JP')}
    </p>
    <p className="text-sm text-gray-500 mb-4">
      {typeof post.author === 'string' ? post.author : post.author?.name}
    </p>
    <Link
      href={`/posts/${post.slug.current}`}
      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
    >
      続きを読む
      <svg
        className="ml-1 w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </Link>
  </div>
)

// 投稿データを取得する関数
async function getPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch(allPostsQuery)
    return posts
  } catch (error) {
    console.error('投稿の取得に失敗しました:', error)
    return []
  }
}

export default async function Home() {
  // Sanityから投稿データを取得
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            HandlessCMS Blog
          </h1>
          <p className="text-gray-600 mt-2">
            Sanity + Next.jsで作ったブログサイト
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            最新の投稿
          </h2>
          
          {/* 投稿一覧 */}
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCardFallback key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                投稿がまだありません
              </h3>
              <p className="text-gray-500 mb-4">
                Sanity Studioで投稿を作成してください
              </p>
              <a
                href="http://localhost:3333"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sanity Studioを開く
              </a>
            </div>
          )}
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2024 HandlessCMS Blog. Powered by Sanity + Next.js
          </p>
        </div>
      </footer>
    </div>
  )
}