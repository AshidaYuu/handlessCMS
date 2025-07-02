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
  
  // ビルド時の設定
  experimental: {
    // App Routerの最適化
    appDir: true,
  },
  
  // セキュリティヘッダーの設定
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig