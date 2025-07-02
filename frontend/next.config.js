/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的エクスポートの設定
  output: 'export',
  
  // トレイリングスラッシュを追加
  trailingSlash: true,
  
  // 画像最適化をスキップ（静的エクスポート時）
  images: {
    unoptimized: true,
    domains: ['cdn.sanity.io'],
  },
  
  // 環境変数の設定
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  },
}

module.exports = nextConfig