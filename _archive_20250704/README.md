# 🚀 HandlessCMS - Sanity CMS + Cloudflare Pages

完全自動化対応のヘッドレスCMSサイト

## 📖 概要

このプロジェクトは、以下の技術を使用して構築された現代的なCMSサイトです：

- **Frontend**: 静的HTML + JavaScript (site_5)
- **CMS**: Sanity Studio v3
- **Hosting**: Cloudflare Pages
- **Automation**: GitHub Actions + Cloudflare Functions
- **Domain**: kanauuu.com

## 🚀 プロジェクト構成

```
handlessCMS/
├── site_5/              # メインサイト (Cloudflare Pages)
│   ├── index.html       # メインページ
│   ├── script.js        # JavaScript
│   ├── style.css        # スタイル
│   ├── news-data.json   # ニュースデータ（自動更新）
│   └── assets/          # 画像・アセット
├── sanity/              # Sanity Studio
│   ├── schemas/         # コンテンツスキーマ
│   └── sanity.config.ts # Sanity設定
├── functions/           # Cloudflare Pages Functions
│   └── api/
│       └── webhook-sanity.ts # Webhook受信
├── .github/workflows/   # GitHub Actions
│   └── update-news.yml  # 自動更新ワークフロー
├── scripts/             # ユーティリティ
│   └── update-news-manual.js # 手動更新
└── docs/                # ドキュメント
```

## 🎯 機能

### ✨ 自動化システム

```
Sanity Studio → Webhook → Cloudflare Functions → GitHub Actions → サイト更新
                                ↓
                          kanauuu.com（本番サイト）
```

1. **Sanity Studio**で投稿を作成・編集
2. **Webhook**が自動的にCloudflare Functionsに送信
3. **GitHub Actions**が自動実行され、最新データを取得
4. **news-data.json**が自動更新
5. **サイト**に最新ニュースが反映（約2-3分）

### 🌐 アクセスURL

| サービス | URL | 用途 |
|---------|-----|------|
| **本番サイト** | https://kanauuu.com | 公開サイト |
| **Sanity Studio** | https://rt90f87e.sanity.studio/ | コンテンツ管理 |
| **開発用URL** | https://handlesscms.pages.dev | テスト用 |

## 🛠️ 開発環境セットアップ

### 1. リポジトリクローン

```bash
git clone https://github.com/AshidaYuu/handlessCMS.git
cd handlessCMS
```

### 2. Sanity Studio セットアップ

```bash
cd sanity
npm install
npm run dev  # http://localhost:3333
```

### 3. 手動ニュース更新（必要時）

```bash
node scripts/update-news-manual.js
```

## 📝 コンテンツ管理

### 新しい投稿を作成

1. **Sanity Studio**にアクセス: https://rt90f87e.sanity.studio/
2. ログイン後、「Post」→「Create」
3. 投稿内容を入力
4. **Publish**ボタンをクリック
5. 約2-3分でサイトに自動反映

### 投稿の編集・削除

- Sanity Studioで編集・削除すると自動的にサイトに反映

## 🔧 設定

### 環境変数

#### Cloudflare Pages

| 変数名 | 値 | 説明 |
|--------|-----|------|
| GITHUB_TOKEN | ghp_xxxxx | GitHub Personal Access Token |
| SANITY_PROJECT_ID | rt90f87e | SanityプロジェクトID |

#### Sanity Studio

```env
SANITY_STUDIO_PROJECT_ID=rt90f87e
SANITY_STUDIO_DATASET=production
```

## 🚀 デプロイ

### 自動デプロイ

- GitHubへのpushで自動的にCloudflare Pagesにデプロイ
- Sanity Studioでの投稿でコンテンツが自動更新

### 手動デプロイ（必要時）

```bash
# Sanity Studioのデプロイ
cd sanity
npx sanity login
npm run deploy
```

## 📊 監視・分析

- **Cloudflare Analytics**: サイトアクセス解析
- **GitHub Actions**: 自動化の実行状況
- **Sanity**: コンテンツ管理の履歴

## 🔒 セキュリティ

- SSL証明書: Cloudflareが自動管理
- DDoS保護: Cloudflare標準機能
- 環境変数: 暗号化して管理

## 📚 ドキュメント

### 開発・カスタマイズ
- [🎨 Frontend Development Guide](docs/frontend-development-guide.md): フロントエンド修正の完全ガイド
- [⚡ Quick Edit Reference](docs/quick-edit-reference.md): 修正のクイックリファレンス
- [🚀 Git Workflow Guide](docs/git-workflow-guide.md): Git操作の完全ガイド
- [⚡ Git Quick Commands](docs/git-quick-commands.md): Gitコマンドのクイックリファレンス
- [🔄 Local Rollback Guide](docs/local-rollback-guide.md): ローカル環境での巻き戻し完全ガイド
- [🆘 Emergency Rollback Commands](docs/emergency-rollback-commands.md): 緊急時の巻き戻しコマンド

### セットアップ・移行
- [Migration Quick Reference](docs/migration-quick-reference.md): 移行手順
- [Cloudflare Setup Guide](docs/cloudflare-pages-setup.md): 詳細セットアップ
- [Troubleshooting](docs/cloudflare-troubleshooting.md): トラブルシューティング

## 🤝 開発

### プルリクエスト

1. フィーチャーブランチを作成
2. 変更を実装
3. プルリクエストを作成

### 課題・バグ報告

GitHubのIssuesでお願いします。

## 📄 ライセンス

MIT License

---

**🌟 HandlessCMS - 地方から夢は叶う**