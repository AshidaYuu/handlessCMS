# ⚡ パフォーマンス最適化ガイド

## 🎯 概要

HandlessCMSサイトの表示速度とユーザー体験を最大限に向上させるための設定ガイドです。

## 📊 現在の最適化状況

### ✅ 実装済み最適化
- **静的サイト生成**: Next.js static export
- **Gzip圧縮**: .htaccess設定済み
- **ブラウザキャッシュ**: 長期キャッシュ設定
- **画像最適化**: Sanity CDN + Next.js Image
- **コード分割**: Next.js自動分割
- **CSS最適化**: Tailwind CSS Purge

## 🖼️ 画像最適化設定

### 1. Sanity画像最適化

**自動画像変換**:
```typescript
// src/lib/sanity.ts で設定済み
export function urlFor(source: any) {
  return builder.image(source)
    .auto('format') // WebP自動変換
    .quality(85)    // 品質最適化
}
```

**使用例**:
```typescript
// レスポンシブ画像
urlFor(image)
  .width(800)
  .height(400)
  .fit('crop')
  .url()

// 高解像度対応
urlFor(image)
  .width(1600)
  .dpr(2)
  .url()
```

### 2. Next.js Image コンポーネント

**最適化された画像読み込み**:
```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

// 遅延読み込み + 最適化
<Image
  src={urlFor(image).width(800).height(400).url()}
  alt="画像の説明"
  width={800}
  height={400}
  priority={false} // Above the fold の場合はtrue
  placeholder="blur" // ぼかしプレースホルダー
/>
```

### 3. 画像圧縮設定

**推奨設定**:
```
JPEG品質: 85%
PNG: 可能な限りWebPに変換
SVG: 最小化
WebP: 最優先フォーマット
AVIF: 対応ブラウザで使用
```

## 🚀 キャッシュ戦略

### 1. ブラウザキャッシュ（.htaccess）

**キャッシュ期間**:
```apache
# HTML: 1時間（コンテンツ更新頻度考慮）
ExpiresByType text/html "access plus 1 hour"

# CSS/JS: 1ヶ月（ハッシュ付きファイル名）
ExpiresByType text/css "access plus 1 month"
ExpiresByType application/javascript "access plus 1 month"

# 画像: 1年（変更頻度低い）
ExpiresByType image/jpeg "access plus 1 year"
ExpiresByType image/png "access plus 1 year"
ExpiresByType image/webp "access plus 1 year"

# Next.js静的ファイル: 永続キャッシュ
/_next/static/ → "max-age=31536000, immutable"
```

### 2. CDN設定（Xserver）

**Xserver高速化設定**:
1. サーバーパネル → 「高速化」
2. 「Xアクセラレータ」有効化
3. 「ブラウザキャッシュ設定」有効化
4. 「Gzip圧縮設定」有効化

**設定画面での操作**:
```
┌─────────────────────────────────────┐
│           高速化設定                 │
├─────────────────────────────────────┤
│ ☑ Xアクセラレータ Ver.2              │
│   └ 静的ファイル配信の高速化          │
│                                     │
│ ☑ ブラウザキャッシュ設定              │
│   └ CSS/JS: 1ヶ月                  │
│   └ 画像: 1年                      │
│                                     │
│ ☑ Gzip圧縮設定                     │
│   └ テキストファイルの圧縮配信        │
└─────────────────────────────────────┘
```

## 📱 モバイル最適化

### 1. レスポンシブ画像

**srcset の活用**:
```tsx
<Image
  src={urlFor(image).width(800).url()}
  srcSet={`
    ${urlFor(image).width(400).url()} 400w,
    ${urlFor(image).width(800).url()} 800w,
    ${urlFor(image).width(1200).url()} 1200w
  `}
  sizes="(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px"
  alt="レスポンシブ画像"
/>
```

### 2. Critical CSS

**重要なスタイルの優先読み込み**:
```html
<!-- Above the fold CSS -->
<style>
  /* 重要なレイアウト CSS */
  .header { /* ... */ }
  .hero-section { /* ... */ }
</style>

<!-- その他のCSS（遅延読み込み） -->
<link rel="preload" href="/_next/static/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

## 🔧 ビルド最適化

### 1. Next.js設定（next.config.js）

**最適化設定**:
```javascript
const nextConfig = {
  // 静的エクスポート
  output: 'export',
  
  // 画像最適化
  images: {
    unoptimized: true, // 静的エクスポート用
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  
  // 実験的機能
  experimental: {
    optimizeCss: true,        // CSS最適化
    optimizePackageImports: [ // パッケージ最適化
      '@sanity/ui',
      'react-icons'
    ],
  },
  
  // バンドル分析
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // 本番ビルドでの最適化
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      }
    }
    return config
  },
}
```

### 2. 依存関係の最適化

**不要なパッケージの除去**:
```bash
# バンドルサイズ分析
npm install --save-dev @next/bundle-analyzer

# 分析実行
ANALYZE=true npm run build
```

**Tree Shaking の活用**:
```typescript
// ❌ 全体インポート（避ける）
import * as Icons from 'react-icons/fa'

// ✅ 必要な分のみインポート
import { FaHome, FaUser } from 'react-icons/fa'
```

## 📈 パフォーマンス監視

### 1. Core Web Vitals の監視

**重要な指標**:
```
LCP (Largest Contentful Paint): < 2.5秒
FID (First Input Delay): < 100ms
CLS (Cumulative Layout Shift): < 0.1
```

**測定ツール**:
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/

### 2. 継続的なモニタリング

**GitHub Actionsでの自動測定**:
```yaml
# .github/workflows/performance.yml
name: Performance Monitoring

on:
  schedule:
    - cron: '0 0 * * 1' # 毎週月曜日

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://yourdomain.com
            https://yourdomain.com/posts/sample-post
          configPath: './lighthouserc.json'
```

## 🎯 最適化チェックリスト

### ✅ 画像最適化
- [ ] Sanity画像変換設定
- [ ] WebP/AVIF対応
- [ ] レスポンシブ画像設定
- [ ] 遅延読み込み実装

### ✅ CSS/JS最適化
- [ ] Tailwind CSS Purge設定
- [ ] Critical CSS抽出
- [ ] コード分割実装
- [ ] 未使用コード除去

### ✅ キャッシュ設定
- [ ] ブラウザキャッシュ設定
- [ ] CDN設定（Xserver）
- [ ] Service Worker（将来）

### ✅ サーバー最適化
- [ ] Gzip圧縮有効化
- [ ] Keep-Alive設定
- [ ] HTTP/2対応確認

### ✅ 監視・分析
- [ ] PageSpeed Insights 90+点
- [ ] GTmetrix A評価
- [ ] Core Web Vitals合格

## 📊 期待される改善結果

### Before（最適化前）
```
PageSpeed Score: 60-70点
LCP: 3-4秒
FID: 200-300ms
CLS: 0.2-0.3
```

### After（最適化後）
```
PageSpeed Score: 90-95点
LCP: 1-2秒
FID: 50-100ms
CLS: 0.05-0.1
```

---

## 🚀 実装優先度

### 🔴 高優先度（即座に実装）
1. .htaccess最適化設定
2. Sanity画像変換設定
3. Next.js Image コンポーネント使用

### 🟡 中優先度（1週間以内）
1. Xserver高速化設定
2. Critical CSS実装
3. パフォーマンス監視設定

### 🟢 低優先度（1ヶ月以内）
1. Service Worker実装
2. CDN詳細設定
3. 高度な分析ツール導入