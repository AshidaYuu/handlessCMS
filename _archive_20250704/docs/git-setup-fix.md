# 🔧 Git設定とGitHub認証の修正ガイド

## 🚨 現在の問題

```
remote: Permission to AshidaYuu/handlessCMS.git denied to yu-ashi.
```

GitHubアカウント `AshidaYuu` のリポジトリに、別のアカウント `yu-ashi` でアクセスしようとしてエラーが発生しています。

## 🛠️ 解決方法

### 方法1: Git認証情報の更新（推奨）

#### 1. Gitユーザー情報の設定
```bash
cd /Users/ashidayuu/Desktop/開発/handlessCMS

# グローバル設定
git config --global user.name "AshidaYuu"
git config --global user.email "your-email@example.com"

# ローカル設定（このプロジェクトのみ）
git config user.name "AshidaYuu"  
git config user.email "your-email@example.com"
```

#### 2. GitHubの認証情報をクリア
```bash
# macOSの場合（Keychain Access）
git config --global --unset credential.helper
git config --global credential.helper osxkeychain

# または手動でキーチェーンから削除
# アプリケーション → ユーティリティ → キーチェーンアクセス
# 「github.com」を検索して古い認証情報を削除
```

#### 3. 再度プッシュを試行
```bash
git push -u origin main
# GitHubのユーザー名とパスワード（またはPersonal Access Token）を入力
```

### 方法2: Personal Access Token（PAT）の使用

#### 1. GitHubでPersonal Access Tokenを作成
1. GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 「Generate new token」をクリック
3. 以下のスコープを選択：
   - `repo` (フルアクセス)
   - `workflow` (GitHub Actions)
4. トークンをコピー（再表示されないので注意）

#### 2. リモートURLをトークン付きに変更
```bash
git remote set-url origin https://AshidaYuu:your-token@github.com/AshidaYuu/handlessCMS.git
```

#### 3. プッシュ
```bash
git push -u origin main
```

### 方法3: SSH認証の設定

#### 1. SSH鍵の生成
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

#### 2. SSH鍵をGitHubに追加
```bash
# 公開鍵をクリップボードにコピー
cat ~/.ssh/id_ed25519.pub | pbcopy

# GitHub → Settings → SSH and GPG keys → New SSH key
# コピーした公開鍵を貼り付け
```

#### 3. リモートURLをSSHに変更
```bash
git remote set-url origin git@github.com:AshidaYuu/handlessCMS.git
```

#### 4. プッシュ
```bash
git push -u origin main
```

## 🔍 現在の設定を確認

### Git設定の確認
```bash
# ユーザー情報
git config --global user.name
git config --global user.email

# リモートリポジトリ
git remote -v

# 認証方法
git config --global credential.helper
```

### 接続テスト
```bash
# HTTPS の場合
git ls-remote origin

# SSH の場合
ssh -T git@github.com
```

## 🚀 推奨フロー

### 1. まず認証情報をクリア
```bash
# Keychainから古い認証情報を削除
git config --global --unset credential.helper
git config --global credential.helper osxkeychain
```

### 2. ユーザー情報を正しく設定
```bash
git config --global user.name "AshidaYuu"
git config --global user.email "ashidayuu@example.com"
```

### 3. プッシュを試行
```bash
cd /Users/ashidayuu/Desktop/開発/handlessCMS
git push -u origin main
```

### 4. 認証情報の入力
- **Username**: `AshidaYuu`
- **Password**: GitHubのパスワードまたはPersonal Access Token

## 🔐 セキュリティのヒント

### Personal Access Token使用時
- トークンは安全な場所に保存
- 必要最小限のスコープを設定
- 定期的にローテーション
- 不要になったらすぐに削除

### SSH鍵使用時
- パスフレーズを設定
- 鍵ファイルの権限を適切に設定（600）
- 定期的な鍵の更新

## 🆘 よくあるエラーと対処法

### エラー: 403 Forbidden
```
原因: 認証情報が間違っているか、権限がない
対処: 認証情報を再設定、Personal Access Tokenを使用
```

### エラー: 404 Not Found
```
原因: リポジトリが存在しない、URLが間違っている
対処: リポジトリのURLを確認、リモートURLを修正
```

### エラー: Connection timeout
```
原因: ネットワーク接続の問題
対処: インターネット接続を確認、プロキシ設定を確認
```

---

## ✅ チェックリスト

- [ ] Gitユーザー情報の設定
- [ ] 古い認証情報のクリア
- [ ] 正しいGitHubアカウントでの認証
- [ ] プッシュの成功確認
- [ ] GitHubリポジトリでの確認