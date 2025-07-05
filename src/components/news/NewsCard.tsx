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
    <article className="group">
      <Link
        href={`/news/${post.slug.current}`}
        className="block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg backdrop-blur-sm">
              <div className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse"></div>
              {category}
            </span>
          </div>

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {/* Author */}
            {post.author && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {post.author.name}
                </span>
              </div>
            )}

            {/* Read More Arrow */}
            <div className="flex items-center gap-1 text-blue-600 text-sm font-medium group-hover:gap-2 transition-all duration-300">
              <span>詳しく見る</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Tags */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.categories.slice(0, 3).map((cat, i) => (
                <span
                  key={i}
                  className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  #{cat.title}
                </span>
              ))}
              {post.categories.length > 3 && (
                <span className="inline-block px-2 py-1 text-xs font-medium text-gray-500 bg-gray-50 rounded-md">
                  +{post.categories.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300 pointer-events-none"></div>
      </Link>
    </article>
  )
}