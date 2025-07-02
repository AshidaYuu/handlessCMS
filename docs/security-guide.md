# 🔐 セキュリティガイド

## 🎯 概要

このドキュメントは、HandlessCMSプロジェクトのセキュリティ設定とベストプラクティスについて説明しています。

## 🔑 環境変数とシークレット管理

### 1. 開発環境

#### ローカル開発
```bash
# frontend/.env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=rt90f87e
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=sk_test_...  # 開発用トークン
SANITY_PREVIEW_SECRET=dev-preview-secret

# sanity/.env
SANITY_STUDIO_PROJECT_ID=rt90f87e
SANITY_STUDIO_DATASET=production
```

#### セキュリティ要件
- ✅ `.env` ファイルは `.gitignore` に含める
- ✅ 開発用と本番用でトークンを分ける
- ✅ 定期的にトークンをローテーション
- ❌ 環境変数をコードに直接記載しない

### 2. 本番環境

#### GitHub Secrets
```
SANITY_PROJECT_ID          # SanityプロジェクトID
SANITY_DATASET              # データセット名
SANITY_API_VERSION          # APIバージョン
SANITY_API_READ_TOKEN       # 本番用読み取りトークン
SANITY_PREVIEW_SECRET       # プレビュー用シークレット
FTP_SERVER                  # FTPサーバーアドレス
FTP_USERNAME                # FTPユーザー名
FTP_PASSWORD                # FTPパスワード
FTP_SERVER_DIR              # サーバーディレクトリ
```

## 🛡️ API セキュリティ

### 1. Sanity API トークン

#### 権限設定
```
本番用トークン:
- Scope: Read only
- Datasets: production のみ
- 有効期限: 1年間
- IP制限: 可能であれば設定

開発用トークン:
- Scope: Read/Write
- Datasets: development
- 有効期限: 3ヶ月
- ローカル開発のみ
```

#### トークン管理
```bash
# Sanity Management Console での作成
1. https://sanity.io/manage
2. プロジェクト選択
3. API → Tokens
4. Add API token
5. 適切な権限を設定
```

### 2. CORS 設定

#### Next.js設定
```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://yourdomain.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
}
```

#### Sanity CORS設定
```bash
# Sanity Management Console
1. API → CORS Origins
2. Add origin: https://yourdomain.com
3. Allow credentials: false
```

## 🔒 認証とアクセス制御

### 1. Sanity Studio アクセス

#### ユーザー管理
```
管理者レベル:
- 全機能にアクセス可能
- ユーザー管理権限
- スキーマ変更権限

編集者レベル:
- コンテンツの作成・編集のみ
- ユーザー管理権限なし
- スキーマ変更権限なし
```

#### セッション管理
- セッション有効期限: 7日間
- 自動ログアウト機能
- 多要素認証の推奨

### 2. デプロイメント認証

#### GitHub Actions
```yaml
# 必要最小限の権限
permissions:
  contents: read
  actions: read
  security-events: write
```

#### FTP認証
```bash
# 強力なパスワード要件
- 最低12文字
- 大文字・小文字・数字・記号を含む
- 辞書にない文字列
- 定期的な変更（3ヶ月毎）
```

## 🛠️ セキュリティヘッダー

### 1. Next.js セキュリティヘッダー

```javascript
// next.config.js
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY', // クリックジャッキング防止
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff', // MIMEタイプスニッフィング防止
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block', // XSS攻撃防止
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' https://cdn.sanity.io data:",
            "font-src 'self'",
            "connect-src 'self' https://*.sanity.io",
          ].join('; '),
        },
      ],
    },
  ]
}
```

### 2. サーバーレベルのセキュリティ

#### Xserver設定（.htaccess）
```apache
# セキュリティヘッダー
<IfModule mod_headers.c>
    Header always set X-Frame-Options "DENY"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>

# ディレクトリリスティング無効
Options -Indexes

# 機密ファイルへのアクセス拒否
<Files ~ "\.(env|log|config)$">
    Order allow,deny
    Deny from all
</Files>
```

## 🔍 セキュリティ監査

### 1. 依存関係のセキュリティチェック

#### 自動化されたチェック
```yaml
# .github/workflows/security.yml
name: Security Audit

on:
  schedule:
    - cron: '0 0 * * 1'  # 毎週月曜日
  push:
    branches: [ main ]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Security Audit
        run: |
          cd frontend
          npm audit --audit-level moderate
          npm audit fix --dry-run
```

#### 手動チェック
```bash
# 依存関係の脆弱性チェック
npm audit

# 重要度が中以上の問題のみ表示
npm audit --audit-level moderate

# 自動修正（注意して実行）
npm audit fix
```

### 2. コードセキュリティ

#### 静的解析
```bash
# ESLintでセキュリティルールを有効化
npm install --save-dev eslint-plugin-security

# .eslintrc.json
{
  "extends": ["plugin:security/recommended"],
  "rules": {
    "security/detect-object-injection": "error",
    "security/detect-non-literal-fs-filename": "error"
  }
}
```

#### 定期的なレビュー
- [ ] 毎月1回のセキュリティレビュー
- [ ] 依存関係の更新確認
- [ ] アクセスログの確認
- [ ] トークンの有効期限確認

## 🚨 インシデント対応

### 1. セキュリティインシデント検知

#### 監視項目
```
- 異常なAPIアクセス
- 失敗したログイン試行
- 不正なファイルアップロード
- 予期しないデータ変更
```

#### アラート設定
```bash
# GitHub Advanced Security（Proプラン）
- Secret scanning
- Dependency alerts
- Code scanning alerts
```

### 2. インシデント対応手順

#### 緊急時の対応
```
1. サービスの一時停止（必要に応じて）
2. 影響範囲の特定
3. 原因の調査
4. 修正対応の実施
5. サービスの復旧
6. 事後レポートの作成
```

#### 連絡先の管理
```
システム管理者: your-email@example.com
Sanity サポート: support@sanity.io
Xserver サポート: support@xserver.ne.jp
```

## 📋 セキュリティチェックリスト

### 開発時
- [ ] 環境変数を適切に設定
- [ ] APIトークンの権限を最小限に
- [ ] 依存関係の脆弱性チェック
- [ ] コードレビューでセキュリティ確認

### デプロイ時
- [ ] 本番用の環境変数を設定
- [ ] HTTPS接続の確認
- [ ] セキュリティヘッダーの確認
- [ ] アクセス権限の確認

### 運用時
- [ ] 定期的なトークンローテーション
- [ ] 依存関係の更新
- [ ] アクセスログの監視
- [ ] バックアップの実施

---

## 📚 参考資料

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [Sanity Security](https://www.sanity.io/docs/security)
- [GitHub Security](https://docs.github.com/en/code-security)