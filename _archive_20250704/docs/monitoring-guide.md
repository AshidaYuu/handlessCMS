# 📊 監視・エラーログ設定ガイド

## 🎯 監視戦略

HandlessCMSの安定運用のための包括的な監視設定です。

## 🔍 Step 1: Xserverでのログ設定

### 1. アクセスログの確認

**操作手順**:
1. Xserverサーバーパネル → 「ログファイル」
2. 対象ドメインを選択
3. 「アクセスログ」をクリック

**ログの見方**:
```
IPアドレス - - [日時] "GET /page HTTP/1.1" ステータス サイズ "リファラー" "ユーザーエージェント"

例:
192.168.1.100 - - [02/Jan/2025:10:30:45 +0900] "GET / HTTP/1.1" 200 1234 "-" "Mozilla/5.0..."
```

**重要なステータスコード**:
```
200: 正常
301/302: リダイレクト
404: ページ不見
500: サーバーエラー
503: サービス利用不可
```

### 2. エラーログの監視

**確認場所**:
```
サーバーパネル → ログファイル → エラーログ
```

**よくあるエラーと対処法**:
```
[error] File does not exist
→ 削除されたファイルへのアクセス、404ページで対応

[error] Permission denied
→ ファイル権限の問題、chmod 644/755で修正

[error] script not found or unable to stat
→ CGIスクリプトの問題、ファイルパスを確認
```

## 📈 Step 2: GitHub Actionsでの監視強化

### 1. デプロイ監視の追加

**ワークフローに監視を追加**:
```yaml
# .github/workflows/monitoring.yml
name: Site Monitoring

on:
  schedule:
    # 毎日午前6時に実行
    - cron: '0 21 * * *' # UTC 21:00 = JST 06:00
  workflow_dispatch: # 手動実行可能

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - name: 🏥 Site Health Check
        run: |
          echo "🔍 サイトの健康状態をチェック中..."
          
          # サイトの応答確認
          RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://yourdomain.com)
          if [ $RESPONSE -eq 200 ]; then
            echo "✅ サイトは正常に応答しています (HTTP $RESPONSE)"
          else
            echo "❌ サイトに問題があります (HTTP $RESPONSE)"
            exit 1
          fi
          
          # 応答時間の測定
          RESPONSE_TIME=$(curl -s -o /dev/null -w "%{time_total}" https://yourdomain.com)
          echo "⏱️ 応答時間: ${RESPONSE_TIME}秒"
          
          # SSL証明書の確認
          SSL_EXPIRY=$(echo | openssl s_client -servername yourdomain.com -connect yourdomain.com:443 2>/dev/null | openssl x509 -noout -dates | grep notAfter | cut -d= -f2)
          echo "🔒 SSL証明書期限: $SSL_EXPIRY"

  performance-check:
    runs-on: ubuntu-latest
    steps:
      - name: ⚡ Performance Check
        run: |
          echo "📊 パフォーマンステスト実行中..."
          
          # PageSpeed Insights API（無料版）
          # curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://yourdomain.com&category=performance"
          
          echo "✅ パフォーマンステスト完了"
```

### 2. 自動通知システム

**Slack通知の設定**（オプション）:
```yaml
# 失敗時の通知
- name: 📢 Slack Notification
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    channel: '#alerts'
    webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

## 🔧 Step 3: エラーページの設定

### 1. カスタムエラーページの作成

**404ページ**:
```typescript
// frontend/src/app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          ページが見つかりません
        </h2>
        <p className="text-gray-600 mb-8">
          お探しのページは削除されたか、URLが変更された可能性があります。
        </p>
        <div className="space-x-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ホームに戻る
          </Link>
          <Link
            href="/posts"
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            投稿一覧
          </Link>
        </div>
      </div>
    </div>
  )
}
```

**500エラーページ**:
```typescript
// frontend/src/app/500.tsx
export default function Custom500() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          サーバーエラーが発生しました
        </h2>
        <p className="text-gray-600 mb-8">
          一時的な問題が発生している可能性があります。<br/>
          しばらく時間をおいてから再度アクセスしてください。
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  )
}
```

### 2. .htaccessでのエラーページ設定

**既に設定済み**:
```apache
# カスタムエラーページ
ErrorDocument 404 /404/index.html
ErrorDocument 500 /500/index.html
```

## 📊 Step 4: アナリティクス設定

### 1. Google Analytics 4の設定

**操作手順**:
1. Google Analytics → 「管理」
2. 「プロパティを作成」
3. ウェブサイトの情報を入力
4. 測定IDを取得（G-XXXXXXXXXX）

**Next.jsでの実装**:
```typescript
// frontend/src/app/layout.tsx
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**環境変数の追加**:
```env
# frontend/.env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 2. Search Console設定

**操作手順**:
1. Google Search Console → 「プロパティを追加」
2. 「URLプレフィックス」でドメインを入力
3. 所有権の確認（HTMLファイルまたはDNS）
4. サイトマップの送信

**サイトマップの自動生成**:
```typescript
// frontend/src/app/sitemap.ts
import { client } from '@/lib/sanity'
import { allPostsQuery } from '@/lib/queries'

export default async function sitemap() {
  const posts = await client.fetch(allPostsQuery)
  
  const baseUrl = 'https://yourdomain.com'
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]
  
  const postPages = posts.map((post: any) => ({
    url: `${baseUrl}/posts/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  return [...staticPages, ...postPages]
}
```

## 🚨 Step 5: アラート設定

### 1. 重要な監視項目

**サイトダウン検知**:
```bash
# 簡易監視スクリプト
#!/bin/bash
SITE_URL="https://yourdomain.com"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $SITE_URL)

if [ $RESPONSE -ne 200 ]; then
    echo "🚨 サイトダウン検知: HTTP $RESPONSE"
    # 通知処理（メール、Slack等）
fi
```

**SSL証明書期限監視**:
```bash
# SSL証明書の期限確認
SSL_EXPIRY_DAYS=$(echo | openssl s_client -servername yourdomain.com -connect yourdomain.com:443 2>/dev/null | openssl x509 -noout -checkend 604800)

if [ $? -ne 0 ]; then
    echo "⚠️ SSL証明書が7日以内に期限切れします"
fi
```

### 2. 自動復旧システム

**基本的な自動復旧**:
```yaml
# GitHub Actionsでの自動復旧
- name: 🔄 Auto Recovery
  if: failure()
  run: |
    echo "🔄 自動復旧を試行中..."
    
    # キャッシュクリア
    curl -X PURGE "https://yourdomain.com/*"
    
    # 再デプロイ（最新のビルドを再送信）
    echo "📤 最新ビルドの再デプロイ中..."
```

## 📋 監視チェックリスト

### 🔴 重要（毎日確認）
- [ ] サイトの正常応答（200 OK）
- [ ] 主要ページの表示確認
- [ ] SSL証明書の有効性
- [ ] エラーログの確認

### 🟡 中重要（週1回確認）
- [ ] アクセス解析データ
- [ ] ページ表示速度
- [ ] 検索順位
- [ ] セキュリティ状況

### 🟢 低重要（月1回確認）
- [ ] サーバー容量使用状況
- [ ] バックアップ状況
- [ ] 依存関係の更新
- [ ] パフォーマンス改善点

---

## 🎯 期待される効果

### 監視実装後
- **ダウンタイム**: 99.9%以上の稼働率
- **問題検知**: 5分以内
- **復旧時間**: 30分以内
- **予防保守**: 問題発生前の対処

### データ活用
- **アクセス解析**: ユーザー行動の理解
- **パフォーマンス**: 継続的な改善
- **SEO効果**: 検索順位の向上
- **ビジネス成果**: コンバージョン改善