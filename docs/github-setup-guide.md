# 🚀 GitHub設定ガイド

## 📋 Step 1: GitHubリポジトリの作成

### 1. GitHub.comにアクセス
1. [GitHub.com](https://github.com) にアクセス
2. アカウントにログイン
3. 右上の「+」→「New repository」をクリック

### 2. リポジトリ情報の入力
```
Repository name: handlessCMS
Description: 🚀 Sanity + Next.js ブログサイト - 完全自動化対応のヘッドレスCMS
Visibility: Public (または Private)
```

**重要**: 
- ✅ 「Add a README file」は**チェックしない**
- ✅ 「Add .gitignore」は**チェックしない**
- ✅ 「Choose a license」は**なし**

### 3. リポジトリの作成
「Create repository」ボタンをクリック

## 📋 Step 2: ローカルリポジトリをGitHubにプッシュ

### 1. リモートリポジトリの追加
```bash
cd /Users/ashidayuu/Desktop/開発/handlessCMS
git remote add origin https://github.com/yourusername/handlessCMS.git
```

### 2. ブランチ名の設定
```bash
git branch -M main
```

### 3. GitHubにプッシュ
```bash
git push -u origin main
```

## 📋 Step 3: GitHub Secretsの設定

### 1. Settings → Secrets and variables → Actions
1. GitHubリポジトリページで「Settings」タブをクリック
2. 左メニューの「Secrets and variables」→「Actions」をクリック
3. 「New repository secret」をクリック

### 2. 必要なSecrets

#### Sanity関連
```
Name: SANITY_PROJECT_ID
Value: rt90f87e

Name: SANITY_DATASET  
Value: production

Name: SANITY_API_VERSION
Value: 2024-01-01

Name: SANITY_PREVIEW_SECRET
Value: preview-secret-handlesscms-2024
```

#### Xserver FTP関連（後で設定）
```
Name: FTP_SERVER
Value: your-ftp-server.com

Name: FTP_USERNAME
Value: your-ftp-username

Name: FTP_PASSWORD
Value: your-ftp-password

Name: FTP_SERVER_DIR
Value: /public_html/
```

## 📋 Step 4: ブランチ保護ルールの設定

### 1. Settings → Branches
1. 「Settings」タブ → 左メニューの「Branches」
2. 「Add rule」をクリック

### 2. 保護ルールの設定
```
Branch name pattern: main

設定項目:
✅ Require a pull request before merging
✅ Require approvals (1)
✅ Dismiss stale PR approvals when new commits are pushed
✅ Require status checks to pass before merging
✅ Require branches to be up to date before merging
✅ Require linear history
✅ Include administrators
```

## 📋 Step 5: GitHub Actionsの有効化

### 1. Actions タブ
1. リポジトリの「Actions」タブをクリック
2. 「I understand my workflows, go ahead and enable them」をクリック

### 2. ワークフローの確認
- `.github/workflows/deploy.yml` が表示されることを確認
- 初回は手動でトリガーするか、コードをプッシュしてテスト

## 🔐 セキュリティ考慮事項

### 1. 環境変数の管理
- ✅ `.env` ファイルは `.gitignore` に追加済み
- ✅ 本番用の設定はGitHub Secretsで管理
- ❌ 機密情報をコードに直接記載しない

### 2. APIトークンのスコープ
```
Sanity API Token:
- Read access のみ
- 必要最小限の権限
- 定期的なローテーション
```

### 3. FTP認証情報
```
- 強力なパスワードを使用
- 可能であればSSH鍵認証
- アクセス元IPの制限
```

## 🛠️ Git基本コマンド

### 日常的な開発フロー
```bash
# 変更を確認
git status

# ファイルを追加
git add .

# コミット
git commit -m "機能: 新しい機能を追加"

# プッシュ
git push origin main
```

### ブランチでの開発
```bash
# 新しいブランチを作成
git checkout -b feature/new-feature

# 変更をコミット
git add .
git commit -m "機能: 新機能を実装"

# プッシュ
git push origin feature/new-feature

# GitHub でプルリクエストを作成
```

### よく使うコマンド
```bash
# ログを確認
git log --oneline

# 差分を確認
git diff

# ブランチ一覧
git branch -a

# リモートの変更を取得
git pull origin main
```

## 🐛 トラブルシューティング

### GitHub Actionsが失敗する場合
1. **Secrets の確認**
   - 設定した値が正しいか確認
   - タイプミスがないか確認

2. **ビルドエラー**
   - ローカルで `npm run build` を実行
   - TypeScript エラーを修正

3. **FTPエラー**
   - サーバー情報が正しいか確認
   - ディレクトリの権限を確認

### Git操作でエラーが出る場合
```bash
# リモートURLの確認
git remote -v

# 強制プッシュ（注意して使用）
git push --force-with-lease origin main

# コンフリクトの解決
git status
# ファイルを編集してコンフリクト解決
git add .
git commit -m "コンフリクト解決"
```

## 📚 参考リンク

- [GitHub Docs](https://docs.github.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Git Documentation](https://git-scm.com/doc)
- [Semantic Commit Messages](https://www.conventionalcommits.org/)

---

## ✅ チェックリスト

- [ ] GitHubリポジトリを作成
- [ ] ローカルリポジトリをプッシュ
- [ ] GitHub Secrets を設定
- [ ] ブランチ保護ルールを設定
- [ ] GitHub Actions を有効化
- [ ] テストプッシュで動作確認