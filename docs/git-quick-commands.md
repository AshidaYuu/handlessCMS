# ⚡ Git クイックコマンド集

## 🚀 基本の3ステップ

```bash
git add .
git commit -m "修正内容"
git push origin main
```

## 📝 git add の使い分け

| コマンド | 用途 | 使用頻度 |
|----------|------|----------|
| `git add .` | **すべての変更** | ⭐⭐⭐⭐⭐ |
| `git add ファイル名` | 特定ファイルのみ | ⭐⭐⭐ |
| `git add -A` | 削除も含むすべて | ⭐⭐ |

## 🎯 シチュエーション別

### 日常的な修正
```bash
git add .
git commit -m "Fix team image extensions"
git push origin main
```

### 複数ファイル個別指定
```bash
git add site_5/index.html site_5/style.css
git commit -m "Update HTML and CSS"
git push origin main
```

### 段階的コミット
```bash
# HTML修正
git add site_5/index.html
git commit -m "HTML: Fix team images"

# CSS修正  
git add site_5/style.css
git commit -m "CSS: Improve layout"

# 一括プッシュ
git push origin main
```

## 🔍 確認コマンド

```bash
git status          # 現在の状況
git diff            # 変更内容
git log --oneline   # コミット履歴
```

## 🚨 緊急時

### やり直し
```bash
# 最新コミット取り消し
git reset --soft HEAD~1

# ファイルを元に戻す
git checkout HEAD -- ファイル名
```

### 強制更新
```bash
git add .
git commit -m "Force fix"
git push origin main
```

## 💡 VSCode操作

1. **編集** → ファイル保存
2. **Source Control** → 「+」で追加
3. **メッセージ入力** → Commit
4. **Sync Changes** → 完了

## 🎯 推奨パターン

**初心者**: `git add .` で全部まとめて  
**慣れたら**: 機能別に段階的コミット

---

**⚡ 迷ったら `git add .` で OK！**