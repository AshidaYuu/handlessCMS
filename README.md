# 🚀 HandlessCMS - Sanity + Next.js ブログサイト

完全自動化対応のヘッドレスCMSブログサイト

## 📖 概要

このプロジェクトは、以下の技術を使用して構築された現代的なブログサイトです：

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **CMS**: Sanity Studio v3
- **Styling**: Tailwind CSS
- **Deploy**: 自動デプロイ (GitHub Actions + Xserver)

## 🚀 プロジェクト構成

```
handlessCMS/
├── frontend/        # Next.js 14アプリケーション
│   ├── src/
│   │   ├── app/     # App Router
│   │   ├── components/  # Reactコンポーネント
│   │   ├── lib/     # ユーティリティ関数
│   │   └── types/   # TypeScript型定義
│   └── .env.local.example  # 環境変数の例
└── sanity/          # Sanity Studio
    ├── schemas/     # コンテンツモデル定義
    └── .env.example # 環境変数の例
```

## 📋 前提条件

- Node.js 18以上
- npm または yarn
- Sanityアカウント（[sanity.io](https://www.sanity.io/)で無料作成可能）

## 🛠️ セットアップ手順

### Step 1: Sanityプロジェクトの作成

1. [Sanity Management Console](https://www.sanity.io/manage)にアクセス
2. 新しいプロジェクトを作成
3. プロジェクトIDをメモしておく

### Step 2: 環境変数の設定

#### Sanity Studioの設定

```bash
cd sanity
cp .env.example .env
```

`.env`ファイルを編集:
```env
SANITY_STUDIO_PROJECT_ID=あなたのプロジェクトID
SANITY_STUDIO_DATASET=production
```

#### Next.jsアプリケーションの設定

```bash
cd ../frontend
cp .env.local.example .env.local
```

`.env.local`ファイルを編集:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=あなたのプロジェクトID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=（オプション：プレビュー機能用）
SANITY_PREVIEW_SECRET=任意のシークレットキー
```

### Step 3: 依存関係のインストール

```bash
# Sanity Studioの依存関係
cd sanity
npm install

# Next.jsアプリケーションの依存関係
cd ../frontend
npm install
```

### Step 4: Sanity Studioの初期化

```bash
cd sanity
npx sanity init --bare
```

プロンプトが表示されたら:
- プロジェクトIDを入力
- データセット名は`production`を使用

### Step 5: 開発サーバーの起動

2つのターミナルウィンドウを開いて:

**ターミナル1: Sanity Studio**
```bash
cd sanity
npm run dev
```
→ http://localhost:3333 でSanity Studioにアクセス

**ターミナル2: Next.jsアプリケーション**
```bash
cd frontend
npm run dev
```
→ http://localhost:3000 でサイトにアクセス

## 📝 次のステップ

### Step 2: APIルートとページの実装

1. **APIルートの作成**
   - `/api/preview` - プレビューモードの設定
   - `/api/exit-preview` - プレビューモードの解除

2. **ページの実装**
   - トップページ（投稿一覧）
   - 投稿詳細ページ
   - カテゴリーページ
   - 著者ページ

3. **コンポーネントの作成**
   - PostCard（投稿カード）
   - PostList（投稿リスト）
   - CategoryList（カテゴリーリスト）
   - AuthorBio（著者情報）

### Step 3: GitHub Actionsの設定

自動デプロイのためのワークフローを設定

### Step 4: Xserverへのデプロイ設定

1. SSH接続の設定
2. Node.jsアプリケーションのデプロイ
3. PM2での永続化

### Step 5: Webhookの設定

Sanityの更新を自動的にサイトに反映

## 🎯 主な機能

- **ヘッドレスCMS**: Sanityによるコンテンツ管理
- **高速なサイト**: Next.js 14のApp Router使用
- **型安全**: TypeScriptによる型チェック
- **レスポンシブデザイン**: Tailwind CSS使用
- **画像最適化**: Next.js Image + Sanity画像変換
- **プレビュー機能**: 下書きのリアルタイムプレビュー
- **自動デプロイ**: GitHub Actions連携

## 📚 プロジェクトで使用している主な技術

- **Next.js 14**: Reactフレームワーク（App Router使用）
- **TypeScript**: 型安全な開発
- **Tailwind CSS**: ユーティリティファーストCSS
- **Sanity Studio v3**: ヘッドレスCMS
- **GROQ**: Sanityのクエリ言語

## 🔧 よく使うコマンド

```bash
# 開発サーバー起動（両方同時）
npm run dev      # frontendディレクトリで実行

# Sanity Studioのみ起動
npm run sanity   # frontendディレクトリで実行

# ビルド
npm run build    # 各ディレクトリで実行

# Sanity Studioのデプロイ
cd sanity && npm run deploy
```

## 🆘 トラブルシューティング

### Sanity Studioにログインできない
- プロジェクトIDが正しいか確認
- Sanityアカウントでログインしているか確認

### データが表示されない
- 環境変数が正しく設定されているか確認
- Sanity Studioでコンテンツを作成したか確認
- APIバージョンの日付が正しいか確認

### 型エラーが発生する
- `npm install`を再実行
- TypeScriptのバージョンを確認

## 📖 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

初心者の方でも、この手順に従えば確実にセットアップできます。
質問や問題がある場合は、各技術の公式ドキュメントを参照してください。