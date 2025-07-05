'use client'

import { useState, useEffect } from 'react'
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
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
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
    <div className="space-y-8">
      {/* Category Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">#ALL</h2>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {currentPosts.map((post, index) => {
          const imageUrl = post.mainImage 
            ? urlFor(post.mainImage).width(600).height(400).url()
            : '/assets/images/ogp-image.png'
          
          const category = post.categories?.[0]?.title || 'お知らせ'
          const dayOfWeek = isClient 
            ? new Date(post.publishedAt).toLocaleDateString('ja-JP', { weekday: 'short' }).toUpperCase()
            : ''
          
          return (
            <Link
              key={post._id}
              href={`/news/${post.slug.current}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
                <Image
                  src={imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-3 mb-3 text-gray-500 text-sm">
                  <time>{formatDate(post.publishedAt)}</time>
                  {isClient && dayOfWeek && (
                    <span className="font-medium">{dayOfWeek}</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Author */}
                {post.author && (
                  <p className="text-sm text-gray-600 mb-3">
                    {post.author.name}
                  </p>
                )}

                {/* Tags */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {post.categories.slice(0, 3).map((cat, i) => (
                      <span
                        key={i}
                        className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md"
                      >
                        #{cat.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← 前へ
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    page === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              次へ →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}