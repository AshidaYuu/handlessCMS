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
        <div className="mb-3">
          <time className="text-sm text-gray-500">{formatDate(post.publishedAt)}</time>
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
}