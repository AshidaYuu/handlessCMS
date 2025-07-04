/**
 * Sanity用のGROQクエリ
 * データ取得のためのクエリを定義
 */

// すべての投稿を取得するクエリ
export const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    "author": author->name,
    "categories": categories[]->title
  }
`

// 特定のスラッグの投稿を取得するクエリ
export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    body,
    "author": author->{
      name,
      image,
      bio
    },
    "categories": categories[]->title
  }
`

// すべてのスラッグを取得するクエリ（静的生成用）
export const postSlugsQuery = `
  *[_type == "post" && defined(slug.current)][].slug.current
`

// 最新の投稿を取得するクエリ
export const latestPostsQuery = `
  *[_type == "post"] | order(publishedAt desc)[0...5] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    "author": author->name
  }
`

// カテゴリー別の投稿を取得するクエリ
export const postsByCategoryQuery = `
  *[_type == "post" && references(*[_type=="category" && title == $category]._id)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    "author": author->name,
    "categories": categories[]->title
  }
`

// すべてのカテゴリーを取得するクエリ
export const allCategoriesQuery = `
  *[_type == "category"] {
    _id,
    title,
    description
  }
`

// すべての著者を取得するクエリ
export const allAuthorsQuery = `
  *[_type == "author"] {
    _id,
    name,
    slug,
    image,
    bio
  }
`