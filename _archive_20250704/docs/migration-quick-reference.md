# Xserver → Cloudflare Pages 移行クイックリファレンス

## 📋 必要なもの

- [ ] GitHubアカウント
- [ ] Cloudflareアカウント  
- [ ] ドメイン（新規または既存）
- [ ] Sanityアカウント（CMS使用時）
- [ ] サイトのソースファイル

## 🚀 最短手順（30分〜1時間）

### 1. GitHub準備（5分）

```bash
# サイトファイルをGitHubにアップ
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

### 2. Cloudflare Pages作成（5分）

1. https://dash.cloudflare.com/ → Pages
2. Create a project → Connect to Git
3. 設定:
   - Build command: (空欄)
   - Output directory: `site_5` または `./`
   - Root directory: `/`

### 3. ドメイン設定（20分）

#### A. Cloudflareでドメイン追加
```
1. Add site → ドメイン名入力
2. Free プラン選択
3. DNSレコード追加:
   CNAME @ your-project.pages.dev
   CNAME www your-project.pages.dev
4. ネームサーバー情報をメモ
```

#### B. ドメインレジストラ（ムームー等）
```
ネームサーバー変更:
NS1: xxx.ns.cloudflare.com
NS2: yyy.ns.cloudflare.com
```

#### C. Cloudflare Pagesでカスタムドメイン
```
Pages → プロジェクト → Custom domains
→ Add domain → your-domain.com
```

### 4. 動作確認（5-10分）

- [ ] https://your-domain.com アクセス
- [ ] SSL証明書確認（鍵マーク）
- [ ] www サブドメイン確認

## ⚠️ よくある詰まりポイント

### 1. Error 522（接続タイムアウト）

**原因**: Cloudflare Pages側でカスタムドメイン未設定

**解決**: 
```
Pages → Custom domains → Add domain
（DNSとは別に設定が必要！）
```

### 2. Sanity CORS エラー

**原因**: ブラウザから直接Sanity APIアクセス

**解決**:
```javascript
// ❌ 直接API
fetch('https://PROJECT.api.sanity.io/...')

// ✅ 静的JSON
fetch('./news-data.json')
```

### 3. GitHub Actions 権限エラー

**原因**: デフォルトは読み取り専用

**解決**:
```
GitHub → Settings → Actions → General
→ Workflow permissions
→ Read and write permissions
```

### 4. Functions が動作しない

**原因**: ファイル配置ミス

**解決**:
```
/functions/
  /api/
    webhook.js  ← この階層が重要
```

### 5. User-Agent エラー（GitHub API）

**原因**: GitHub APIの必須ヘッダー不足

**解決**:
```javascript
headers: {
  'User-Agent': 'Your-App-Name',  // 必須！
  'Authorization': `token ${TOKEN}`
}
```

## 📁 必要なファイル構造

```
your-repo/
├── site_5/               # サイトファイル
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── news-data.json    # Sanity連携時
├── functions/            # Cloudflare Functions
│   └── api/
│       └── webhook.js
├── .github/workflows/    # 自動化
│   └── update-news.yml
├── scripts/              # ユーティリティ
│   └── update-news.js
└── wrangler.toml        # Cloudflare設定
```

## 🔧 環境変数設定

### Cloudflare Pages

| 変数名 | 値 | 暗号化 |
|--------|-----|---------|
| GITHUB_TOKEN | ghp_xxxx | ✓ |
| SANITY_PROJECT_ID | abc123 | - |

### GitHub Secrets

| 名前 | 値 |
|------|-----|
| SANITY_PROJECT_ID | abc123 |

## 🎯 移行完了チェック

- [ ] 独自ドメインでアクセス可能
- [ ] HTTPS（SSL）有効
- [ ] Git push で自動デプロイ
- [ ] 環境変数設定完了
- [ ] (CMS使用時) Webhook動作確認
- [ ] 旧サーバーからのリダイレクト設定

## 💡 Tips

1. **DNSの反映待ち時間**
   - 通常: 2-24時間
   - 最大: 48時間
   - その間も旧サイトは表示される

2. **一時的な確認方法**
   - `your-project.pages.dev` でアクセス
   - DNSのProxy statusを一時的にグレー雲に

3. **キャッシュクリア**
   - Cloudflare → Caching → Purge Cache
   - ブラウザのキャッシュもクリア

4. **デバッグ**
   - Functions: Real-time logs確認
   - Actions: GitHubのActionsタブ
   - DNS: `dig your-domain.com`

## 🆘 困ったときは

1. **Cloudflare Community**
   - https://community.cloudflare.com/

2. **エラーコード検索**
   - Error 522, 521, 520など

3. **ログ確認**
   - Cloudflare Dashboard → Analytics
   - Pages → Functions → Logs

これで完全移行の準備は完了です！