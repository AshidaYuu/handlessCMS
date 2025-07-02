# Cloudflare Pages Functions トラブルシューティング

## 問題: `/api/webhook-sanity` にアクセスできない

現在の状況：https://handlesscms.pages.dev/api/webhook-sanity が動作していない

## 解決手順

### 1. Cloudflare Pages ダッシュボードで確認

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages
2. `handlesscms` プロジェクトを選択
3. 以下を確認：

#### ビルド設定の確認
- **Framework preset**: None
- **Build command**: 空欄
- **Build output directory**: `site_5`
- **Root directory (advanced)**: `/`

#### Functions の確認
- "Functions" タブを確認
- `api/webhook-sanity` が表示されているか

### 2. 環境変数の設定確認

Settings → Environment variables で以下が設定されているか：

| 変数名 | 値 | Production | Preview |
|--------|-----|------------|---------|
| `GITHUB_TOKEN` | `ghp_xxxxx...` | ✓ | ✓ |
| `SANITY_PROJECT_ID` | `rt90f87e` | ✓ | ✓ |

**重要**: `GITHUB_TOKEN` は "Encrypt" にチェックを入れる

### 3. 再デプロイ

1. "Deployments" タブ
2. 最新のデプロイを選択
3. "Retry deployment" をクリック

### 4. Functions ログの確認

1. "Functions" タブ
2. "Real-time logs" をクリック
3. エラーメッセージを確認

### 5. ファイル構造の確認

リポジトリに以下のファイルが存在することを確認：

```
handlessCMS/
├── functions/
│   └── api/
│       ├── webhook-sanity.js
│       └── webhook-sanity.ts
├── _routes.json
├── wrangler.toml
└── site_5/
    └── (サイトファイル)
```

### 6. 代替手動テスト

Functions が動作しない場合、まず手動でテスト：

```bash
# リポジトリルートで実行
cd /Users/ashidayuu/Desktop/開発/handlessCMS
node scripts/update-news-manual.js
```

### 7. GitHub Actions の手動実行

1. GitHub → Actions → "Update News Data"
2. "Run workflow" → "Run workflow"
3. 正常に動作するか確認

## よくある問題と解決法

### 問題1: Functions が認識されない

**原因**: ファイル構造またはエクスポート形式の問題

**解決法**:
1. `_routes.json` の追加（既に作成済み）
2. TypeScript版の作成（既に作成済み）
3. 再デプロイ

### 問題2: 環境変数が読み取れない

**原因**: 環境変数の設定ミス

**解決法**:
1. Cloudflare Dashboard で環境変数を再設定
2. Production と Preview 両方にチェック
3. 再デプロイ

### 問題3: GitHub Token の権限不足

**原因**: Token の権限設定が不適切

**解決法**:
1. GitHub → Settings → Developer settings → Personal access tokens
2. 新しいトークンを作成
3. `repo` と `workflow` 権限を付与
4. Cloudflare で環境変数を更新

### 問題4: CORS エラー

**原因**: フロントエンドからの直接アクセス

**解決法**:
- Webhook URL はブラウザではなく、Sanity からのPOSTリクエスト用
- ブラウザテストは GET リクエストのみ

## 手動確認コマンド

### cURL でのテスト

```bash
# ヘルスチェック（GET）
curl https://handlesscms.pages.dev/api/webhook-sanity

# Webhook テスト（POST）
curl -X POST https://handlesscms.pages.dev/api/webhook-sanity \
  -H "Content-Type: application/json" \
  -d '{"_type":"post","_id":"test"}'
```

### 期待される応答

**GET リクエスト**:
```json
{
  "status": "OK",
  "message": "Sanity Webhook Handler is running on Cloudflare Pages",
  "timestamp": "2025-07-02T10:00:00.000Z"
}
```

## 次のステップ

1. **再デプロイ実行**: 上記の修正後に再デプロイ
2. **Functions ログ確認**: エラーメッセージをチェック
3. **環境変数再設定**: 必要に応じて環境変数を再設定
4. **手動テスト**: cURL でのテスト実行

Functions が動作しない場合は、まず手動でのニュース更新システムを使用し、並行してCloudflare Pages の設定を調整していきます。