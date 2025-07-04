# 自動デプロイメント完全ガイド

## 概要

このガイドでは、Sanity CMSと連携したサイトの完全な自動デプロイメントシステムの構成と手順を説明します。

## システム構成

```
Sanity Studio → Cloudflare Pages → GitHub Actions → サイト更新
     ↓              ↓                    ↓           ↓
   投稿作成      Webhook受信        データ取得    自動デプロイ
```

## 必要なサービス

- **Sanity Studio**: コンテンツ管理
- **GitHub**: ソースコード管理とActions
- **Cloudflare Pages**: ホスティングとWebhook処理
- **GitHub Actions**: 自動化ワークフロー

## セットアップ手順

### 1. GitHub Personal Access Token

1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. 必要な権限:
   - `repo` (フルアクセス)
   - `workflow` (GitHub Actions用)

### 2. Cloudflare Pages設定

1. Cloudflare Dashboard → Pages → Create a project
2. GitHubリポジトリ `handlessCMS` を選択
3. ビルド設定:
   - Build command: (空欄)
   - Output directory: `site_5`
4. 環境変数設定:
   - `GITHUB_TOKEN`: 手順1で作成したトークン
   - `SANITY_PROJECT_ID`: `rt90f87e`

### 3. Sanity Webhook設定

1. Sanity Manage → プロジェクト選択 → API → Webhooks
2. Create webhook:
   - URL: `https://your-site.pages.dev/api/webhook-sanity`
   - Trigger: Create, Update, Delete
   - Filter: `_type == "post"`

## ファイル構成

```
handlessCMS/
├── site_5/                 # メインサイト
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── news-data.json      # 自動更新されるニュースデータ
├── functions/              # Cloudflare Pages Functions
│   └── api/
│       └── webhook-sanity.js
├── .github/workflows/      # GitHub Actions
│   └── update-news.yml
├── scripts/                # 更新スクリプト
│   └── update-news-manual.js
├── wrangler.toml          # Cloudflare設定
└── docs/                  # ドキュメント
    ├── cloudflare-pages-setup.md
    └── deployment-guide.md
```

## 自動化フロー

### 投稿作成時の流れ

1. **Sanity Studio**: 新しい投稿を作成してPublish
2. **Webhook送信**: SanityがCloudflare Pages Functionに通知
3. **GitHub Actions トリガー**: FunctionがRepository Dispatchを送信
4. **データ取得**: ActionsがSanity APIから最新データを取得
5. **ファイル更新**: `news-data.json`を更新してコミット
6. **再デプロイ**: Cloudflare Pagesが自動的に再デプロイ
7. **サイト更新**: 最新のニュースがサイトに反映

### 処理時間

- Webhook → GitHub Actions: 即座
- GitHub Actions実行: 約30秒
- Cloudflare Pages再デプロイ: 約1-2分
- **合計**: 約2-3分

## 手動での更新方法

自動化に問題がある場合の手動更新：

```bash
# HandlessCMSディレクトリで実行
cd /Users/ashidayuu/Desktop/開発/handlessCMS
node scripts/update-news-manual.js
```

## デバッグとトラブルシューティング

### 1. Webhook受信の確認

```bash
# ヘルスチェックURL（ブラウザでアクセス）
https://your-site.pages.dev/api/webhook-sanity
```

期待されるレスポンス:
```json
{
  "status": "OK",
  "message": "Sanity Webhook Handler is running on Cloudflare Pages"
}
```

### 2. GitHub Actions の確認

1. GitHubリポジトリ → Actions タブ
2. "Update News Data" ワークフローを確認
3. 失敗している場合はログを確認

### 3. Cloudflare Pages Functions ログ

1. Cloudflare Dashboard → Pages → プロジェクト
2. Functions タブ → Real-time logs

### 4. よくある問題

**問題**: Webhookが届かない
- Sanity Webhook設定のURL確認
- Cloudflare Pages Functions の動作確認

**問題**: GitHub Actions が実行されない
- GitHub Token の権限確認
- Repository Dispatch の設定確認

**問題**: ニュースが更新されない
- news-data.json の更新確認
- サイトの再デプロイ確認

## セキュリティ考慮事項

1. **APIトークン管理**
   - GitHub Tokenの最小権限設定
   - 環境変数での機密情報管理

2. **Webhook検証**
   - 必要に応じてWebhook Secretの実装

3. **CORS設定**
   - 静的ファイルアプローチでCORS回避

## パフォーマンス最適化

1. **キャッシュ戦略**
   - news-data.json のキャッシュ設定
   - CDN活用

2. **更新頻度制限**
   - 必要に応じてRate Limiting実装

## 今後の拡張可能性

1. **画像対応**
   - Sanity画像APIとの連携
   - 画像最適化

2. **カテゴリ対応**
   - 投稿カテゴリの追加
   - フィルタリング機能

3. **SEO強化**
   - メタデータの自動生成
   - サイトマップ自動更新

## まとめ

この自動デプロイメントシステムにより：

- **コンテンツ更新の自動化**: Sanity Studioでの投稿が即座にサイトに反映
- **開発効率の向上**: 手動デプロイ作業の削減
- **信頼性の向上**: 自動化による人的エラーの削減
- **スケーラビリティ**: 新しい機能の追加が容易

システム全体が正常に動作すれば、コンテンツ更新から公開まで2-3分で完了します。