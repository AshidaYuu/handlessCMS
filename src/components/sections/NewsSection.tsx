import Link from 'next/link'
import { Post } from '@/types'
import { formatDate } from '@/lib/utils'

interface NewsSectionProps {
  posts: Post[]
}

export default function NewsSection({ posts }: NewsSectionProps) {
  return (
    <section id="news" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Side - Title & Description */}
          <div>
            <div className="mb-8">
              <span className="text-sm font-semibold text-gray-600 tracking-wider">NEWS</span>
              <h2 className="text-xs text-gray-500 mt-1">お知らせ</h2>
            </div>
            
            <div className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                地域とともに歩む最新の取り組みや成果、<br />
                イベント情報をお伝えします。
              </p>
            </div>

            <Link
              href="/news"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <span>VIEW ALL</span>
              <span className="flex gap-1">
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <span className="w-1 h-1 bg-white rounded-full"></span>
              </span>
            </Link>
          </div>

          {/* Right Side - News List */}
          <div>
            {posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <article
                    key={post._id}
                    className="group border-b border-gray-200 pb-6 last:border-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Link href={`/news/${post.slug.current}`} className="block">
                      <time className="text-sm text-gray-500">
                        {formatDate(post.publishedAt)}
                      </time>
                      <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">現在、お知らせはありません。</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}