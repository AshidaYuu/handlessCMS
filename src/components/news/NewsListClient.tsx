'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/types'
import { formatDate } from '@/lib/utils'
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from '@/lib/sanity'

interface NewsListClientProps {
  posts: Post[]
}

const ITEMS_PER_PAGE = 6

// Sanity画像URLビルダー
const builder = imageUrlBuilder(sanityClient)
function urlFor(source: any) {
  return builder.image(source)
}

export default function NewsListClient({ posts }: NewsListClientProps) {
  const [currentPage, setCurrentPage] = useState(1)
  
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentPosts = posts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          お知らせはありません
        </h2>
        <p className="text-gray-500">現在、お知らせはありません。</p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          トップページに戻る
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Category Filter */}
      <div className="mb-12 flex items-center gap-8">
        <h2 className="text-3xl font-bold">#ALL</h2>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {currentPosts.map((post, index) => {
          const imageUrl = post.mainImage 
            ? urlFor(post.mainImage).width(600).height(400).url()
            : '/assets/images/ogp-image.png'
          
          const category = post.categories?.[0]?.title || 'お知らせ'
          const dayOfWeek = new Date(post.publishedAt).toLocaleDateString('ja-JP', { weekday: 'short' }).toUpperCase()
          
          return (
            <article
              key={post._id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link href={`/news/${post.slug.current}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-block w-2 h-2 bg-gray-900 rounded-full"></span>
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                  </div>

                  {/* Date */}
                  <div className="flex items-baseline gap-3 mb-4 text-gray-500">
                    <time className="text-sm">
                      {formatDate(post.publishedAt)}
                    </time>
                    <span className="text-sm font-medium">{dayOfWeek}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>

                  {/* Author */}
                  {post.author && (
                    <p className="text-sm text-gray-600 mb-4">
                      {post.author.name}
                    </p>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.categories?.map((cat, i) => (
                      <span
                        key={i}
                        className="inline-block px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
                      >
                        #{cat.title}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-12 flex justify-center">
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← 前へ
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        page === currentPage
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  )
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return <span key={page} className="px-2 text-gray-400">...</span>
                }
                return null
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              次へ →
            </button>
          </div>
        </nav>
      )}
    </>
  )
}