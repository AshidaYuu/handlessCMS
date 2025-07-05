import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import PortableText from '@/components/PortableText'
import { sanityClient, queries } from '@/lib/sanity'
import { Post } from '@/types'
import { formatDate, generateMetadata as generateSEOMetadata } from '@/lib/utils'
import Link from 'next/link'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await sanityClient.fetch(queries.postBySlug(slug), { slug }, {
      next: { revalidate: 60 } // 60秒でキャッシュ更新
    })
    return post
  } catch {
    console.error('Failed to fetch post')
    return null
  }
}

export async function generateStaticParams() {
  try {
    const posts = await sanityClient.fetch(queries.allPosts)
    return posts.map((post: Post) => ({
      slug: post.slug.current,
    }))
  } catch {
    console.error('Failed to fetch posts for static params')
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return generateSEOMetadata({
      title: 'お知らせが見つかりません',
      description: 'お探しのお知らせは見つかりませんでした。',
    })
  }

  return generateSEOMetadata({
    title: post.title,
    description: post.excerpt || post.title,
    url: `/news/${post.slug.current}`,
    type: 'article',
  })
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <Layout>
      <div className="article-detail">
        {/* Breadcrumb */}
        <nav className="article-breadcrumb">
          <div className="article-breadcrumb-container">
            <ol className="breadcrumb-list">
              <li>
                <Link href="/" className="breadcrumb-link">HOME</Link>
              </li>
              <li className="breadcrumb-separator">/</li>
              <li>
                <Link href="/news" className="breadcrumb-link">NEWS</Link>
              </li>
              <li className="breadcrumb-separator">/</li>
              <li className="breadcrumb-current">
                {post.title}
              </li>
            </ol>
          </div>
        </nav>

        {/* Main Content */}
        <article className="article-content">
          <div className="article-container">
            {/* Header */}
            <header className="article-header">
              <time className="article-date">
                {formatDate(post.publishedAt)}
              </time>
              <h1 className="article-title">
                {post.title}
              </h1>
            </header>

            {/* Body */}
            <div className="article-body">
              {post.excerpt ? (
                <div className="article-excerpt">
                  <p>{post.excerpt}</p>
                </div>
              ) : null}

              {/* Portable Text Content */}
              {post.body ? (
                <div className="article-main-content">
                  <PortableText value={post.body} />
                </div>
              ) : (
                <div className="article-placeholder">
                  <p>この記事の本文は準備中です。</p>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <footer className="article-footer">
              <div className="article-actions">
                <Link href="/news" className="view-more-btn-dark">
                  <span>一覧に戻る</span>
                  <div className="btn-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </Link>
                <Link href="/" className="view-more-btn-alt">
                  <span>トップページ</span>
                  <div className="btn-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </Link>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </Layout>
  )
}