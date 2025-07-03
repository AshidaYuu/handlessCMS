# 🆘 緊急時巻き戻しコマンド集

**「デザイン修正で失敗した！すぐ戻したい！」**という時のための超シンプルガイド

## ⚡ 最速解決コマンド

### 😱 編集中にミスした → 即座に解決

```bash
# すべての変更を破棄
git checkout -- .
```

### 😱 コミット後にミスした → 即座に解決

```bash
# 最新コミットを完全削除
git reset --hard HEAD~1
```

### 😱 特定ファイルだけ戻したい → 即座に解決

```bash
# 例: CSSだけ戻す
git checkout -- site_5/style.css
```

## 🔍 状況判断（3秒で判断）

### Q1: まだコミットしていない？
**YES** → `git checkout -- .`

### Q2: コミットしたけどプッシュしていない？  
**YES** → `git reset --hard HEAD~1`

### Q3: プッシュもしてしまった？
**YES** → `git revert HEAD && git push origin main`

## 🚨 パニック時のチェックリスト

### 1. **深呼吸** 🫁
何も壊れていません。Gitがあります。

### 2. **状況確認** 🔍
```bash
git status
```

### 3. **コマンド実行** ⚡
上記の最速コマンドを実行

### 4. **確認** ✅
```bash
git status
```

## 🛡️ 安全対策（次回から）

### 修正前に必ずこれを実行
```bash
git add .
git commit -m "Before modifications"
```

**これさえしておけば、いつでも安心して戻れます！**

---

**💡 覚えることは1つだけ: `git checkout -- .`**