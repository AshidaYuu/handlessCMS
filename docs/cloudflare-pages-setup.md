# Cloudflare Pages セットアップガイド

このガイドでは、Sanity StudioからのWebhookを受信し、自動的にニュースを更新するためのCloudflare Pagesの設定方法を説明します。

## 前提条件

- GitHubアカウント
- Cloudflareアカウント
- Sanity Studioへのアクセス権限

## セットアップ手順

### 1. GitHub Personal Access Tokenの作成

1. GitHubにログインし、Settings → Developer settings → Personal access tokens → Tokens (classic) にアクセス
2. "Generate new token" をクリック
3. 以下の権限を選択：
   - `repo` (フルアクセス)
   - `workflow` (GitHub Actionsのトリガー用)
4. トークンを生成し、安全な場所にコピー

### 2. Cloudflare Pagesプロジェクトの作成

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)にログイン
2. "Pages" セクションに移動
3. "Create a project" をクリック
4. "Connect to Git" を選択
5. GitHubアカウントを連携し、`handlessCMS`リポジトリを選択

### 3. ビルド設定

プロジェクト設定で以下を入力：

- **プロジェクト名**: `handlesscms-site`
- **Production branch**: `main`
- **Build settings**:
  - Build command: （空欄のまま）
  - Build output directory: `site_5`
- **Root directory**: `/`

### 4. 環境変数の設定

Cloudflare Pagesダッシュボードで:

1. Settings → Environment variables に移動
2. 以下の変数を追加：

| 変数名 | 値 | 説明 |
|--------|-----|------|
| `GITHUB_TOKEN` | `ghp_xxxxx...` | 手順1で作成したトークン |
| `SANITY_PROJECT_ID` | `rt90f87e` | SanityプロジェクトID |

**重要**: `GITHUB_TOKEN`は「Encrypt」をチェックして暗号化してください。

### 5. デプロイ

1. "Save and Deploy" をクリック
2. 初回デプロイが完了するまで待機（約2-3分）
3. デプロイ完了後、URLが表示されます：
   - 例: `https://handlesscms-site.pages.dev`

### 6. Webhook URLの確認

デプロイ完了後、以下のURLでWebhookエンドポイントが利用可能になります：

```
https://handlesscms-site.pages.dev/api/webhook-sanity
```

ヘルスチェック用URL（ブラウザでアクセス可能）：
```
https://handlesscms-site.pages.dev/api/webhook-sanity
```

### 7. Sanity StudioでのWebhook設定

1. [Sanity Manage](https://www.sanity.io/manage)にログイン
2. プロジェクト`rt90f87e`を選択
3. "API" → "Webhooks" に移動
4. "Create webhook" をクリック
5. 以下を設定：

| 項目 | 値 |
|------|-----|
| Name | `Cloudflare Pages News Update` |
| URL | `https://handlesscms-site.pages.dev/api/webhook-sanity` |
| Dataset | `production` |
| Trigger on | Create, Update, Delete にチェック |
| Filter | `_type == "post"` |
| HTTP method | `POST` |
| HTTP headers | （デフォルトのまま） |
| Secret | （空欄でOK） |

6. "Save webhook" をクリック

## 動作確認

### 1. Webhookエンドポイントの確認

ブラウザで以下のURLにアクセス：
```
https://handlesscms-site.pages.dev/api/webhook-sanity
```

以下のようなレスポンスが表示されれば成功：
```json
{
  "status": "OK",
  "message": "Sanity Webhook Handler is running on Cloudflare Pages",
  "timestamp": "2025-07-02T10:00:00.000Z"
}
```

### 2. 自動更新のテスト

1. Sanity Studioで新しい投稿を作成または既存の投稿を編集
2. "Publish" をクリック
3. 以下を確認：
   - Cloudflare Pages Functions のログ
   - GitHub Actions の実行状況
   - サイト上でのニュース更新（約2-3分後）

### 3. ログの確認

**Cloudflare Pages Functions ログ**:
1. Cloudflare Dashboard → Pages → プロジェクト選択
2. "Functions" タブ → "Real-time logs" をクリック

**GitHub Actions ログ**:
1. GitHubリポジトリ → Actions タブ
2. "Update News Data" ワークフローの実行を確認

## トラブルシューティング

### Webhookが動作しない場合

1. **Cloudflare Pages Functions ログを確認**
   - エラーメッセージがないか確認
   - Webhook受信のログが記録されているか確認

2. **GitHub Token の権限を確認**
   - `repo`と`workflow`権限があることを確認
   - トークンの有効期限を確認

3. **Sanity Webhook設定を確認**
   - URLが正しいことを確認
   - Filterが`_type == "post"`になっていることを確認

### ニュースが更新されない場合

1. **GitHub Actions の実行を確認**
   - "Update News Data" ワークフローが実行されているか
   - エラーが発生していないか

2. **news-data.json の更新を確認**
   - GitHubリポジトリで`site_5/news-data.json`が更新されているか

3. **Cloudflare Pages の再デプロイ**
   - GitHub Actionsが成功してもサイトが更新されない場合は手動で再デプロイ

## セキュリティに関する注意事項

1. **GitHub Token**
   - 必要最小限の権限のみ付与
   - 定期的にトークンを更新
   - トークンを公開しない

2. **Webhook URL**
   - 必要に応じてWebhook Secretを設定して検証を追加

3. **環境変数**
   - すべての機密情報は環境変数として管理
   - Cloudflareの暗号化機能を使用

## まとめ

このセットアップにより、以下のフローが自動化されます：

1. Sanity Studioで投稿を作成/更新
2. SanityがCloudflare Pages FunctionにWebhookを送信
3. FunctionがGitHub Actionsをトリガー
4. GitHub ActionsがSanity APIからデータを取得
5. news-data.jsonを更新してコミット
6. Cloudflare Pagesが自動的に再デプロイ
7. サイトに最新のニュースが表示される

全体のプロセスは通常2-3分で完了します。