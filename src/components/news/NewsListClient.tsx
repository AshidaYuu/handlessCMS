'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Post } from '@/types'
import NewsCard from './NewsCard'

interface NewsListClientProps {
  posts: Post[]
}

const ITEMS_PER_PAGE = 6

export default function NewsListClient({ posts }: NewsListClientProps) {
  const [currentPage, setCurrentPage] = useState(1)
  
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentPosts = posts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
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
        {currentPosts.map((post) => (
          <NewsCard key={post._id} post={post} />
        ))}
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