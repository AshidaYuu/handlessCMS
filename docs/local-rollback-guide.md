# 🔄 ローカル環境巻き戻しガイド

Claude CodeやVSCodeでデザイン修正中に「前のバージョンに戻したい！」となった時の完全ガイドです。

## 🎯 基本コンセプト

**Git = タイムマシン**  
修正前の状態をいつでも復元できます。Claude Codeでの修正もただのファイル編集なので、Gitで完全に管理可能です。

## 🔄 想定シナリオ

### 典型的なワークフロー

```bash
# 1. 現在の状態を保存（修正前の安全地点）
git add .
git commit -m "Save current design before modifications"

# 2. Claude Codeでデザイン修正
# → ファイルが変更される

# 3. うまくいかない場合
git checkout -- .  # 全ての変更を破棄して前の状態に戻る
```

## 📋 状況別の戻し方

### 1. **修正中に戻したい（まだコミットしていない）**

#### すべての変更を破棄
```bash
git checkout -- .
```

#### 特定ファイルのみ戻す
```bash
# HTMLのみ
git checkout -- site_5/index.html

# CSSのみ
git checkout -- site_5/style.css

# 複数ファイル
git checkout -- site_5/index.html site_5/style.css
```

#### VSCodeで視覚的に戻す
1. **Source Control パネル**（左サイドバー）
2. **変更ファイルの「↶」ボタン**クリック
3. **または「Changes」全体の「↶」**で全て戻す

### 2. **コミット後に戻したい**

#### 最新コミットを取り消し
```bash
# コミットを取り消し（変更も破棄）
git reset --hard HEAD~1

# コミットを取り消し（変更は保持）
git reset --soft HEAD~1
```

#### 複数コミット前に戻る
```bash
# 2つ前のコミットに戻る
git reset --hard HEAD~2

# 3つ前のコミットに戻る
git reset --hard HEAD~3
```

#### 特定のコミット状態に戻る
```bash
# コミット履歴確認
git log --oneline

# 特定のコミットに戻る
git reset --hard abc1234
```

### 3. **プッシュ済みの場合**

#### 新しいコミットで戻す（推奨）
```bash
# 最新コミットを打ち消すコミットを作成
git revert HEAD
git push origin main
```

#### 強制的に巻き戻し（注意が必要）
```bash
git reset --hard HEAD~1
git push --force-with-lease origin main
```

## 🎨 実用的な使用例

### 例1: CSSデザイン修正失敗

```bash
# === 修正前のセーフポイント ===
git add .
git commit -m "Current layout - before Claude Code modifications"

# === Claude Codeで style.css を修正 ===
# レイアウトが崩れた

# === 解決方法 ===
# Option A: CSSだけ戻す
git checkout -- site_5/style.css

# Option B: すべて戻す
git checkout -- .
```

### 例2: レイアウト全体の大幅修正失敗

```bash
# === 修正前のセーフポイント ===
git add .
git commit -m "Stable layout before redesign"

# === Claude Codeで大幅修正 ===
# index.html, style.css, 画像など複数変更
# 結果が気に入らない

# === 解決方法 ===
git reset --hard HEAD~1  # すべて元に戻す
```

### 例3: 段階的修正で途中まで戻したい

```bash
# === 修正履歴 ===
git log --oneline
# abc123 Step 3: Add animations (← 今ここ)
# def456 Step 2: Update colors
# ghi789 Step 1: Fix layout
# jkl012 Original design (← ここに戻りたい)

# === Step 1の状態に戻る ===
git reset --hard ghi789
```

## 🛡️ 安全な開発フロー

### 1. **修正前のセーフポイント作成（必須）**

```bash
# 修正前に必ず実行
git add .
git commit -m "Before design modifications - working state"
```

### 2. **ブランチを使った安全な実験**

```bash
# 実験用ブランチ作成
git checkout -b design-experiment

# Claude Codeで修正
# → うまくいかない場合

# 元のブランチに戻る
git checkout main
git branch -D design-experiment  # 実験ブランチ削除
```

### 3. **段階的コミット**

```bash
# 小さな修正を重ねる
git add .
git commit -m "Step 1: Update header design"

git add .
git commit -m "Step 2: Modify navigation style"

git add .
git commit -m "Step 3: Add hover animations"

# 各段階で戻れるポイントを作る
```

## ⚡ クイックリファレンス

### 最もよく使うコマンド

| 状況 | コマンド | 説明 |
|------|----------|------|
| **編集中のミス** | `git checkout -- .` | すべての変更を破棄 |
| **特定ファイル** | `git checkout -- ファイル名` | 特定ファイルのみ戻す |
| **コミット取り消し** | `git reset --hard HEAD~1` | 最新コミットを完全削除 |
| **安全な取り消し** | `git reset --soft HEAD~1` | コミットのみ取り消し |

### 緊急時のクイックコマンド

```bash
# 最も簡単（編集中の変更を全て破棄）
git checkout -- .

# コミットごと戻す
git reset --hard HEAD~1

# 一時保存してから戻す
git stash
git stash drop
```

## 🔍 状況確認コマンド

### 戻す前の確認

```bash
git status              # 現在の変更状況
git log --oneline -5    # 最近のコミット履歴
git diff                # 具体的な変更内容
```

### 戻した後の確認

```bash
git status              # 正常に戻ったか確認
git log --oneline -3    # コミット履歴確認
```

## 🎯 Claude Code使用時の推奨ワークフロー

### 完全な安全ワークフロー

```bash
# === Phase 1: 準備 ===
# 現在の状態を保存
git add .
git commit -m "Before Claude Code modifications - stable point"

# === Phase 2: 修正 ===
# Claude Codeでデザイン修正
# (ファイルが変更される)

# === Phase 3: 確認 ===
# ローカルプレビューで確認
cd site_5
python3 -m http.server 8001
# http://localhost:8001 で確認

# === Phase 4: 判断 ===
# 👍 うまくいった場合
git add .
git commit -m "Successful design update by Claude Code"
git push origin main

# 👎 うまくいかない場合
git checkout -- .  # 元に戻す
# または
git reset --hard HEAD~1  # コミットごと戻す
```

### 実験的修正の場合

```bash
# === 実験用ブランチで安全に ===
git checkout -b claude-design-experiment

# Claude Codeで修正
# 結果を確認

# うまくいった場合
git checkout main
git merge claude-design-experiment
git push origin main

# うまくいかない場合
git checkout main
git branch -D claude-design-experiment
```

## 🚨 よくある間違いと対処法

### 間違い1: 修正前にコミットを忘れる

```bash
# 😱 修正後に気づいた場合
git add .
git commit -m "Current state - need to revert some changes"

# 手動で修正するか、部分的に戻す
git checkout HEAD~1 -- site_5/style.css
```

### 間違い2: 間違ったファイルを戻してしまう

```bash
# 😱 間違って必要なファイルを戻した場合
git checkout HEAD~1 -- 必要だったファイル名
```

### 間違い3: 重要なコミットを削除してしまう

```bash
# 😱 重要なコミットを消してしまった場合
git reflog  # 削除されたコミットを探す
git checkout [コミットID]  # 復活させる
```

## 🔧 高度なテクニック

### 1. **一時保存（Stash）を使った安全な戻し**

```bash
# 現在の変更を一時保存
git stash

# 前の状態で作業
git checkout HEAD~1

# 必要に応じて変更を復活
git stash pop
```

### 2. **特定の変更のみ戻す**

```bash
# 特定のコミットの特定ファイルのみ戻す
git checkout abc123 -- site_5/style.css
```

### 3. **バックアップブランチ作成**

```bash
# 重要な状態をブランチで永続保存
git branch backup-stable-design
```

## 📝 戻し方の選択基準

### いつ使うか

| 方法 | タイミング | リスク | 推奨度 |
|------|------------|--------|---------|
| `git checkout --` | 編集中 | 低 | ⭐⭐⭐⭐⭐ |
| `git reset --soft` | コミット直後 | 低 | ⭐⭐⭐⭐ |
| `git reset --hard` | 複数コミット戻し | 中 | ⭐⭐⭐ |
| `git revert` | プッシュ済み | 低 | ⭐⭐⭐⭐ |

## 🎉 まとめ

### ✅ 覚えておくべきポイント

1. **修正前に必ずコミット**: `git add . && git commit -m "Before modifications"`
2. **編集中の戻し**: `git checkout -- .`
3. **コミット後の戻し**: `git reset --hard HEAD~1`
4. **安全第一**: 不安な時はブランチで実験

### 🚀 Claude Codeとの組み合わせ

Claude Codeでの修正も通常のファイル編集と同じなので：
- ✅ **完全にGitで管理可能**
- ✅ **いつでも前の状態に戻れる**
- ✅ **安心して実験できる**

**これで安心してClaude Codeでデザイン修正にチャレンジできます！** 失敗を恐れずに、どんどん改善していきましょう！ 🎨✨

---

**🔄 失敗は成功のもと。Gitがあれば、いつでもやり直せます！**