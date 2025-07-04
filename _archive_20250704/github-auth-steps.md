# 🔐 GitHub認証の完全解決ガイド

## 🚨 現在の状況
- GitHubアカウント: `AshidaYuu`
- 認証エラー: `yu-ashi` アカウントで認証されている
- 必要: 正しいアカウントでの認証

## 🛠️ 解決方法

### 方法1: Personal Access Token（推奨）

#### 1. GitHubでPersonal Access Tokenを作成
1. **GitHub.com にログイン** (AshidaYuuアカウントで)
2. **右上のプロフィール画像** → **Settings**
3. **左メニューの一番下** → **Developer settings**
4. **Personal access tokens** → **Tokens (classic)**
5. **Generate new token (classic)** をクリック
6. **Note**: `handlessCMS-deploy`
7. **Expiration**: `90 days` (または任意)
8. **Select scopes**:
   - ✅ **repo** (Full control of private repositories)
   - ✅ **workflow** (Update GitHub Action workflows)
9. **Generate token** をクリック
10. **トークンをコピー** (再表示されないので必ずコピー)

#### 2. リモートURLをトークン付きに変更
```bash
cd /Users/ashidayuu/Desktop/開発/handlessCMS

# 現在のリモートURL確認
git remote -v

# トークン付きURLに変更
git remote set-url origin https://AshidaYuu:YOUR_TOKEN_HERE@github.com/AshidaYuu/handlessCMS.git
```

#### 3. プッシュ
```bash
git push -u origin main
```

### 方法2: キーチェーン完全クリア + 手動認証

#### 1. キーチェーンアクセスで手動削除
1. **アプリケーション** → **ユーティリティ** → **キーチェーンアクセス**
2. 検索欄に「**github**」と入力
3. 見つかった項目をすべて削除
4. 検索欄に「**git**」と入力
5. 見つかった項目をすべて削除

#### 2. Git credential helper をリセット
```bash
git config --global --unset credential.helper
git config --global credential.helper osxkeychain
```

#### 3. プッシュ時に新しい認証情報を入力
```bash
git push -u origin main
```
- **Username**: `AshidaYuu`
- **Password**: GitHubのパスワードまたはPersonal Access Token

### 方法3: 新しいリポジトリとして再作成

#### 1. 新しいGitHubリポジトリを作成
1. GitHub.com で新しいリポジトリを作成
2. 名前: `handlessCMS-new` (または任意)

#### 2. リモートURLを変更
```bash
git remote set-url origin https://github.com/AshidaYuu/handlessCMS-new.git
git push -u origin main
```

## 🔍 トラブルシューティング

### 現在の設定確認
```bash
# Git設定確認
git config --global user.name
git config --global user.email

# リモートリポジトリ確認
git remote -v

# 認証ヘルパー確認
git config --global credential.helper
```

### 接続テスト
```bash
# GitHubへの接続テスト
git ls-remote origin
```

## 🎯 推奨手順（順番に試してください）

### 手順1: Personal Access Token作成
1. GitHub.com でトークンを作成
2. トークンをメモ帳などに一時保存

### 手順2: リモートURL更新
```bash
cd /Users/ashidayuu/Desktop/開発/handlessCMS
git remote set-url origin https://AshidaYuu:YOUR_TOKEN@github.com/AshidaYuu/handlessCMS.git
```

### 手順3: プッシュ
```bash
git push -u origin main
```

## 🔐 セキュリティメモ

- Personal Access Tokenは安全な場所に保存
- 使用後はトークンを安全に管理
- 不要になったらGitHubで削除
- 定期的なローテーションを推奨

---

**注意**: YOUR_TOKEN_HERE の部分は実際に作成したPersonal Access Tokenに置き換えてください。