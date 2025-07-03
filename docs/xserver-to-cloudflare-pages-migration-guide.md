# XserverからCloudflare Pagesへの完全移行ガイド

このガイドは、Xserverでホスティングしている静的サイトをCloudflare Pagesに移行し、Sanity CMSと連携させる完全な手順書です。実際の移行で遭遇した問題と解決策も含めて記載します。

## 目次

1. [移行前の準備](#移行前の準備)
2. [Sanity CMS統合](#sanity-cms統合)
3. [Cloudflare Pages初期設定](#cloudflare-pages初期設定)
4. [カスタムドメイン設定](#カスタムドメイン設定)
5. [自動化システム構築](#自動化システム構築)
6. [トラブルシューティング](#トラブルシューティング)
7. [チェックリスト](#チェックリスト)

## 移行前の準備

### 1. 現状確認

```bash
# サイトファイルの構造確認
ls -la /path/to/your/site/
```

確認事項：
- HTMLファイルの場所
- 画像・CSS・JSなどのアセット
- 絶対パス vs 相対パス
- サーバー固有の設定ファイル（.htaccess など）

### 2. GitHubリポジトリの準備

```bash
# 新規リポジトリ作成または既存リポジトリ使用
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Sanity CMS統合

### 1. 既存Sanityプロジェクトとの連携

**🚨 詰まりポイント 1: CORS エラー**

最初の実装：
```javascript
// ❌ 直接Sanity APIにアクセス（CORSエラー発生）
const response = await fetch(`https://${PROJECT_ID}.api.sanity.io/...`);
```

解決策：
```javascript
// ✅ 静的JSONファイルを使用
const response = await fetch('./news-data.json');
```

### 2. 静的JSONアプローチの実装

```javascript
// script.js
async function fetchNews() {
    try {
        const response = await fetch('./news-data.json');
        const posts = await response.json();
        displayNews(posts);
    } catch (error) {
        console.error('ニュース取得エラー:', error);
        showFallbackNews();
    }
}
```

### 3. 手動更新スクリプトの作成

```javascript
// scripts/update-news-manual.js
const https = require('https');
const fs = require('fs');

async function fetchNewsFromSanity() {
    const query = '*[_type == "post"] | order(publishedAt desc)[0...4] {title, publishedAt, slug, excerpt}';
    const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
    
    // Sanity APIからデータ取得（サーバーサイドなのでCORS問題なし）
    // 取得したデータをnews-data.jsonに保存
}
```

## Cloudflare Pages初期設定

### 1. プロジェクト作成

1. Cloudflare Dashboard → Pages
2. "Create a project" → "Connect to Git"
3. GitHubリポジトリを選択

**🚨 詰まりポイント 2: ビルド設定**

```yaml
# 正しい設定
Framework preset: None
Build command: (空欄)
Build output directory: site_5  # サイトファイルのディレクトリ
Root directory: /
```

### 2. 環境変数設定

| 変数名 | 値 | 説明 |
|--------|-----|------|
| GITHUB_TOKEN | ghp_xxxxx | GitHub Personal Access Token |
| SANITY_PROJECT_ID | rt90f87e | SanityプロジェクトID |

**注意**: GITHUB_TOKENは必ず「Encrypt」にチェック

## カスタムドメイン設定

### 1. ドメイン取得（ムームードメイン）

新規ドメイン取得：`kanauuu.com`

### 2. Cloudflareでドメイン追加

**🚨 詰まりポイント 3: DNS設定の場所**

混乱しやすい点：
- **Cloudflare DNS**: ドメインのDNS設定
- **Cloudflare Pages**: カスタムドメイン設定
- 両方での設定が必要！

### 3. DNS設定手順

#### Step 1: Cloudflareでドメイン追加
```
1. Cloudflare Dashboard → Add site
2. ドメイン名: kanauuu.com
3. プラン: Free
```

#### Step 2: DNSレコード設定（Cloudflare側）
```
Type    Name    Content                    Proxy status
CNAME   @       handlesscms.pages.dev     Proxied
CNAME   www     handlesscms.pages.dev     Proxied
```

#### Step 3: ネームサーバー変更（ムームードメイン側）
```
ネームサーバー1: xxx.ns.cloudflare.com
ネームサーバー2: yyy.ns.cloudflare.com
```

#### Step 4: Cloudflare Pagesでカスタムドメイン追加

**🚨 詰まりポイント 4: Error 522**

エラー発生時の確認事項：
1. Cloudflare Pages側でカスタムドメインが未設定
2. Workers & Pages → プロジェクト → Custom domains
3. kanauuu.com と www.kanauuu.com を追加

## 自動化システム構築

### 1. GitHub Actions ワークフロー

```yaml
# .github/workflows/update-news.yml
name: Update News from Sanity

on:
  repository_dispatch:
    types: [sanity-update]
  workflow_dispatch:

jobs:
  update-news:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Fetch and update news
      run: |
        # Sanity APIからデータ取得
        # news-data.json更新
        
    - name: Commit and push
      run: |
        git config --local user.email "action@github.com"
        git config --local user.name "GitHub Action"
        git add site_5/news-data.json
        git commit -m "auto: Update news data"
        git push
```

**🚨 詰まりポイント 5: GitHub Actions権限エラー**

エラー：
```
Permission to USER/REPO.git denied to github-actions[bot]
```

解決方法：
1. GitHub → Settings → Actions → General
2. Workflow permissions → "Read and write permissions"
3. Save

### 2. Cloudflare Pages Functions（Webhook受信）

```javascript
// functions/api/webhook-sanity.js
export async function onRequestPost(context) {
  const { request, env } = context;
  
  // Sanity Webhookを受信
  const body = await request.json();
  
  // GitHub Actions をトリガー
  const response = await fetch(
    'https://api.github.com/repos/USER/REPO/dispatches',
    {
      method: 'POST',
      headers: {
        'Authorization': `token ${env.GITHUB_TOKEN}`,
        'User-Agent': 'Cloudflare-Webhook',  // 必須！
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: 'sanity-update'
      })
    }
  );
}
```

**🚨 詰まりポイント 6: User-Agent ヘッダー**

GitHub APIは User-Agent ヘッダーが必須。忘れると403エラー。

### 3. Sanity Webhook設定

```
URL: https://kanauuu.com/api/webhook-sanity
Trigger: Create, Update, Delete
Filter: _type == "post"
```

## トラブルシューティング

### 問題1: Sanity Client CDN が読み込めない

```javascript
// ❌ CDN版（読み込みエラー）
<script src="https://unpkg.com/@sanity/client"></script>

// ✅ 解決策：静的JSONファイル使用
fetch('./news-data.json')
```

### 問題2: Functions が認識されない

確認事項：
1. `functions/api/` ディレクトリ構造
2. `_routes.json` ファイルの追加
3. wrangler.toml の簡潔な設定

### 問題3: Sanity Studio が404

```bash
# Sanity Studio デプロイ手順
cd sanity/
npx sanity login
npm run build
npm run deploy
# ホスト名入力: rt90f87e
```

## チェックリスト

### 移行前
- [ ] サイトファイルをGitHubにプッシュ
- [ ] 絶対URLを新ドメインに更新
- [ ] favicon ファイルの確認
- [ ] 画像パスの確認

### Cloudflare設定
- [ ] Pages プロジェクト作成
- [ ] 環境変数設定（GITHUB_TOKEN, SANITY_PROJECT_ID）
- [ ] カスタムドメイン追加（Pages側）
- [ ] DNS設定（Cloudflare DNS側）
- [ ] ネームサーバー変更（ドメインレジストラ側）

### 自動化設定
- [ ] GitHub Actions ワークフロー作成
- [ ] GitHub Actions 権限設定
- [ ] Cloudflare Pages Functions 作成
- [ ] Sanity Webhook 設定
- [ ] Sanity Studio デプロイ

### 動作確認
- [ ] https://your-domain.com アクセス可能
- [ ] Sanity Studio で投稿作成
- [ ] 自動更新の確認（2-3分待機）
- [ ] SSL証明書確認

## まとめ

### 完成したシステム構成

```
Sanity Studio → Webhook → Cloudflare Pages Functions → GitHub Actions → サイト更新
                                    ↓
                              独自ドメイン（無料ホスティング）
```

### メリット

1. **コスト**: Xserver有料 → Cloudflare Pages無料
2. **パフォーマンス**: グローバルCDN配信
3. **自動化**: Git連携で自動デプロイ
4. **SSL**: 自動更新・無料
5. **CMS連携**: Sanityとの完全統合

### 注意点

1. DNSとPagesの設定は別々に必要
2. GitHub APIにはUser-Agentヘッダー必須
3. GitHub Actions には書き込み権限が必要
4. CORSを避けるため静的JSON方式を採用
5. Sanity Studio は別途デプロイが必要

この手順に従えば、Xserverから完全にCloudflare Pagesへ移行し、自動更新システムを構築できます。