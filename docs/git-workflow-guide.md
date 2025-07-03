# 🚀 Git ワークフローガイド

HandlessCMSでのGit操作の完全ガイドです。VSCodeでの編集からデプロイまでの効率的な方法を説明します。

## 📝 基本的なワークフロー

### 1. **標準的な編集→デプロイフロー**

```bash
# 1. ファイルを編集（VSCodeで）
code /Users/ashidayuu/Desktop/開発/handlessCMS

# 2. 変更を確認
git status

# 3. すべての変更を追加
git add .

# 4. コミット
git commit -m "修正内容の説明"

# 5. プッシュ
git push origin main
```

**結果**: 約2-3分で https://kanauuu.com に反映

## 🎯 git add の使い分け

### 1. **すべての変更を追加（推奨）**

```bash
git add .
```

**用途**:
- 小規模〜中規模の修正
- 関連する複数ファイルの変更
- 日常的な開発作業

**メリット**:
- シンプルで高速
- 覚えやすい
- 修正漏れがない

### 2. **特定ファイルのみ追加**

```bash
# 単一ファイル
git add site_5/index.html

# 複数ファイル個別指定
git add site_5/index.html site_5/style.css

# パターンマッチング
git add site_5/*.html
git add site_5/assets/images/
```

**用途**:
- 段階的コミット
- 大規模な変更の整理
- 特定の機能のみリリース

### 3. **すべて（削除も含む）**

```bash
git add --all
# または
git add -A
```

**用途**:
- ファイルの削除や移動があった場合
- プロジェクト構造の変更

## 🛠️ VSCodeでのGit操作

### Method 1: VSCode内で完結

1. **ファイル編集**
   - `site_5/index.html` などを直接編集
   - 保存（Cmd+S / Ctrl+S）

2. **Source Control パネル**
   - 左サイドバーのGitアイコンをクリック
   - 変更ファイルが表示される

3. **ステージング**
   - **全ファイル**: 「Changes」の「+」ボタン
   - **個別ファイル**: 各ファイルの「+」ボタン
   - **選択ファイル**: Ctrl/Cmdクリックで複数選択→「+」

4. **コミット**
   - メッセージ入力欄に説明を記入
   - 「Commit」ボタンクリック

5. **プッシュ**
   - 「Sync Changes」または「Push」ボタン

### Method 2: VSCode + ターミナル（推奨）

1. **ファイル編集**（VSCodeで）

2. **ターミナル操作**
   ```bash
   cd /Users/ashidayuu/Desktop/開発/handlessCMS
   git add .
   git commit -m "Update team images from JPG to jpg"
   git push origin main
   ```

## 📋 実用的なコミットパターン

### 1. **日常的な修正**

```bash
git add .
git commit -m "Fix image extensions and update team section"
git push origin main
```

### 2. **段階的なコミット**

```bash
# HTML修正
git add site_5/index.html
git commit -m "HTML: Fix team member image references"

# CSS修正
git add site_5/style.css
git commit -m "CSS: Improve responsive design for mobile"

# 画像追加
git add site_5/assets/images/
git commit -m "Assets: Add new team member photos"

# 一括プッシュ
git push origin main
```

### 3. **機能別のコミット**

```bash
# ニュース機能の修正
git add site_5/script.js site_5/index.html
git commit -m "Feature: Improve news loading animation"

# スタイルの更新
git add site_5/style.css
git commit -m "Style: Update color scheme to brand colors"

git push origin main
```

## 🔍 状況確認コマンド

### 作業前の確認

```bash
# 現在の状況確認
git status

# 最新の状態に更新
git pull origin main
```

### 作業後の確認

```bash
# 変更内容の確認
git status
git diff

# ステージングされた内容の確認
git diff --staged

# コミット履歴の確認
git log --oneline -5
```

## 💡 効率的なコミットメッセージ

### 基本的な形式

```bash
git commit -m "動詞: 具体的な変更内容"
```

### 良い例

```bash
# 機能追加
git commit -m "Add: New contact form validation"

# 修正
git commit -m "Fix: Team image file extensions (JPG → jpg)"

# 更新
git commit -m "Update: Hero section layout for mobile"

# スタイル
git commit -m "Style: Improve button hover animations"

# 削除
git commit -m "Remove: Unused test files and screenshots"
```

### より詳細な場合

```bash
git commit -m "Fix team image display issues

- Change JPG to jpg for case sensitivity
- Update alt attributes for accessibility  
- Optimize image loading performance

Fixes display issues on case-sensitive systems."
```

## 🚨 よくある問題と解決法

### 1. **変更が反映されない**

**原因チェック**:
```bash
# 1. 正しいファイルが変更されているか
git status

# 2. コミットが成功しているか
git log --oneline -2

# 3. プッシュが成功しているか
git push origin main
```

**解決法**:
```bash
# 強制的に最新状態に
git add .
git commit -m "Force update: Fix unreflected changes"
git push origin main
```

### 2. **間違ったファイルをコミット**

**直前のコミットを修正**:
```bash
# ファイルを正しく修正後
git add 正しいファイル
git commit --amend -m "新しいコミットメッセージ"
git push --force-with-lease origin main
```

**新しいコミットで修正**:
```bash
git add 正しいファイル
git commit -m "Fix: Correct file changes from previous commit"
git push origin main
```

### 3. **コンフリクトが発生**

```bash
# リモートの変更を取得
git pull origin main

# コンフリクトファイルを編集
# VSCodeでコンフリクトマーカーを削除

# 解決後
git add .
git commit -m "Resolve merge conflict"
git push origin main
```

## 🎯 シチュエーション別ガイド

### 画像ファイルの変更

```bash
# 画像追加・変更後
git add site_5/assets/images/
git add site_5/index.html  # HTMLも変更した場合
git commit -m "Update team photos and image references"
git push origin main
```

### HTMLのみの修正

```bash
git add site_5/index.html
git commit -m "HTML: Fix team member image extensions"
git push origin main
```

### CSSのみの修正

```bash
git add site_5/style.css
git commit -m "CSS: Improve mobile responsiveness"
git push origin main
```

### 複数ファイルの大規模修正

```bash
# すべてまとめて
git add .
git commit -m "Major update: Redesign team section

- Update HTML structure
- Improve CSS styling  
- Add new team member images
- Fix image extension consistency"
git push origin main
```

## ⚡ 最速ワークフロー

### 日常的な修正用

```bash
# VSCodeで編集後
git add . && git commit -m "Quick fix: [修正内容]" && git push origin main
```

### テンプレート化

```bash
# よく使うコマンドをエイリアス化
alias gquick="git add . && git commit -m"
alias gpush="git push origin main"

# 使用例
gquick "Fix image extensions" && gpush
```

## 📊 Git操作のベストプラクティス

### DO（推奨）

- ✅ こまめにコミット
- ✅ 明確なコミットメッセージ
- ✅ 作業前に `git pull`
- ✅ `git status` で状況確認
- ✅ 小さな変更は `git add .`

### DON'T（非推奨）

- ❌ 巨大なコミット
- ❌ 曖昧なメッセージ
- ❌ 動作確認せずにプッシュ
- ❌ 機密情報のコミット

## 🔄 緊急時の対応

### 間違ったコミットを取り消し

```bash
# 最新コミットを取り消し（変更は保持）
git reset --soft HEAD~1

# 最新コミットを完全に取り消し
git reset --hard HEAD~1
git push --force-with-lease origin main
```

### 特定のファイルを元に戻す

```bash
# 特定ファイルを最新コミット状態に戻す
git checkout HEAD -- site_5/index.html

# 特定ファイルを指定コミット状態に戻す
git checkout [コミットID] -- site_5/index.html
```

## 🎉 まとめ

### 最も実用的なワークフロー

```bash
# 1. VSCodeで編集
code /Users/ashidayuu/Desktop/開発/handlessCMS

# 2. 変更確認
git status

# 3. 追加・コミット・プッシュ
git add .
git commit -m "具体的な修正内容"
git push origin main

# 4. 確認（2-3分後）
# https://kanauuu.com
```

このフローが**最もシンプルで確実**です。複数ファイルの変更でも `git add .` で問題ありません！

---

**🚀 効率的なGit操作で、快適な開発を！**