/**
 * 投稿詳細ページ（シンプル版）
 */

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import { postBySlugQuery } from '@/lib/queries'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

// 特定のスラッグの投稿を取得
async function getPost(slug: string) {
  try {
    const post = await client.fetch(postBySlugQuery, { slug })
    return post
  } catch (error) {
    console.error('投稿の取得に失敗しました:', error)
    return null
  }
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const { slug } = await params
    const post = await getPost(slug)

    // 投稿が見つからない場合は404ページを表示
    if (!post) {
      notFound()
    }

    // 公開日をフォーマット
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg
                className="mr-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              ブログ一覧に戻る
            </Link>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          <article className="bg-white rounded-lg shadow-md p-8">
            {/* タイトル */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title || 'タイトルなし'}
            </h1>

            {/* メタ情報 */}
            <div className="flex items-center text-gray-500 mb-8 pb-8 border-b">
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              )}
              {post.author && (
                <>
                  <span className="mx-3">•</span>
                  <span>
                    {typeof post.author === 'string' ? post.author : post.author.name}
                  </span>
                </>
              )}
            </div>

            {/* カテゴリー */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((category: string, index: number) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

            {/* 本文（シンプル表示） */}
            <div className="prose prose-lg max-w-none">
              {post.body ? (
                <div>
                  <p className="mb-4">
                    {JSON.stringify(post.body, null, 2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    ※ 本文は開発中のため、データ構造を表示しています
                  </p>
                </div>
              ) : (
                <p className="text-gray-600">本文がありません</p>
              )}
            </div>
          </article>
        </main>
      </div>
    )
  } catch (error) {
    console.error('投稿ページの表示エラー:', error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            エラーが発生しました
          </h1>
          <p className="text-gray-600 mb-4">
            投稿の読み込みに失敗しました
          </p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    )
  }
}