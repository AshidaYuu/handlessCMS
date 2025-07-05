'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/types'
import { formatDate } from '@/lib/utils'
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from '@/lib/sanity'

interface NewsCardProps {
  post: Post
}

const builder = imageUrlBuilder(sanityClient)
function urlFor(source: { asset: { _ref: string } }) {
  return builder.image(source)
}

export default function NewsCard({ post }: NewsCardProps) {
  const imageUrl = post.mainImage 
    ? urlFor(post.mainImage).width(600).height(400).url()
    : '/assets/images/ogp-image.png'
  
  const category = post.categories?.[0]?.title || 'お知らせ'

  return (
    <Link href={`/news/${post.slug.current}`} className="news-card">
      {/* Image */}
      <div className="news-card-image">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Category Badge */}
        <div className="news-card-badge">
          <span>{category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="news-card-content">
        {/* Date */}
        <div className="news-card-date">
          {formatDate(post.publishedAt)}
        </div>

        {/* Title */}
        <h3 className="news-card-title">
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="news-card-excerpt">
            {post.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="news-card-footer">
          {/* Author */}
          {post.author && (
            <div className="news-card-author">
              <div className="author-avatar">
                <span>{post.author.name.charAt(0)}</span>
              </div>
              <span className="author-name">{post.author.name}</span>
            </div>
          )}

          {/* Read More */}
          <div className="news-card-more">
            続きを読む →
          </div>
        </div>

        {/* Tags */}
        {post.categories && post.categories.length > 0 && (
          <div className="news-card-tags">
            {post.categories.slice(0, 3).map((cat, i) => (
              <span key={i} className="news-tag">
                #{cat.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}