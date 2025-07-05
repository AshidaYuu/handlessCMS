'use client'

import { useState } from 'react'
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
    return null
  }

  return (
    <div className="news-list">
      {/* Header */}
      <div className="news-list-header">
        <h2 className="news-list-title">
          すべての記事
          <span className="news-count">{posts.length}件</span>
        </h2>
        <div className="news-sort">
          最新順
        </div>
      </div>

      {/* News Grid */}
      <div className="news-grid">
        {currentPosts.map((post) => (
          <NewsCard key={post._id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="news-pagination">
          <div className="pagination-info">
            ページ {currentPage} / {totalPages} （全 {posts.length} 件）
          </div>

          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn pagination-prev"
            >
              前へ
            </button>

            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`pagination-number ${page === currentPage ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn pagination-next"
            >
              次へ
            </button>
          </div>
        </div>
      )}
    </div>
  )
}