/**
 * 投稿カードコンポーネント
 * 投稿一覧で使用する個々の投稿表示カード
 */

import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/types/post'
import { urlFor } from '@/lib/sanity'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  // 公開日をフォーマット
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* メイン画像 */}
      {post.mainImage && (
        <div className="relative h-48 w-full">
          <Image
            src={urlFor(post.mainImage).width(400).height(200).url()}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* カード内容 */}
      <div className="p-6">
        {/* カテゴリー */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((category, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {/* タイトル */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          <Link
            href={`/posts/${post.slug.current}`}
            className="hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
        </h3>

        {/* 公開日と著者 */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          )}
          {post.author && (
            <>
              <span className="mx-2">•</span>
              <span>{typeof post.author === 'string' ? post.author : post.author.name}</span>
            </>
          )}
        </div>

        {/* 続きを読むボタン */}
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
    </article>
  )
}