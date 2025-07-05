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
    <Link
      href={`/news/${post.slug.current}`}
      className="block bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-100">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="text-sm text-gray-500 mb-2">
          {formatDate(post.publishedAt)}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Author */}
          {post.author && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-blue-600">
                  {post.author.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {post.author.name}
              </span>
            </div>
          )}

          {/* Read More */}
          <div className="text-blue-600 text-sm font-medium">
            続きを読む →
          </div>
        </div>

        {/* Tags */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-gray-100">
            {post.categories.slice(0, 3).map((cat, i) => (
              <span
                key={i}
                className="inline-block px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
              >
                #{cat.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}