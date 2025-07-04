# ⚡ フロントエンド修正クイックリファレンス

## 🎯 3ステップで修正

### 1. ファイル編集
```bash
# メインファイル
site_5/index.html    # HTML修正
site_5/style.css     # スタイル修正
site_5/script.js     # JS修正（注意）
site_5/assets/images/ # 画像追加
```

### 2. デプロイ
```bash
cd /Users/ashidayuu/Desktop/開発/handlessCMS
git add .
git commit -m "修正内容の説明"
git push origin main
```

### 3. 確認
- 2-3分待機 → https://kanauuu.com

## ⚠️ 触っちゃダメな部分

```html
<!-- これらのIDは変更禁止 -->
<div id="news-list">
<div id="news-loading">
<div id="news-fallback">
```

```javascript
// これらの関数は変更禁止
fetchNews()
displayNews()
```

```
site_5/news-data.json  // 自動更新ファイル
```

## 💡 よくある修正

### テキスト変更
```html
<h1>Kanauuu - 地方から夢は叶う</h1>
<!-- ↓ -->
<h1>新しいタイトル</h1>
```

### 色変更
```css
:root {
    --primary-color: #007bff;
    /* ↓ */
    --primary-color: #28a745;
}
```

### 画像追加
```bash
# 画像をコピー
cp new-image.jpg site_5/assets/images/
```

```html
<!-- HTMLで使用 -->
<img src="assets/images/new-image.jpg" alt="説明">
```

## 🚨 緊急時

### すぐ確認したい
```
https://handlesscms.pages.dev
```

### ローカルプレビュー
```bash
cd site_5
python3 -m http.server 8000
# http://localhost:8000
```

### 変更を元に戻す
```bash
git log --oneline  # コミット履歴確認
git revert [コミットID]  # 特定の変更を元に戻す
git push origin main
```

## 📱 レスポンシブ確認

```css
@media (max-width: 768px) {
    /* モバイル用スタイル */
}
```

## 🔧 デバッグ

### ブラウザ開発者ツール
- F12 → Console タブ
- エラーメッセージ確認

### よくあるエラー
- `Uncaught TypeError`: JavaScript エラー
- `404 Not Found`: ファイルパス間違い
- CSS適用されない: セレクタ間違い

## 📋 チェックリスト

修正前：
- [ ] 何を変更するか明確にする
- [ ] バックアップ（git commit）

修正後：
- [ ] ローカルで動作確認
- [ ] Git commit & push
- [ ] 本番サイトで確認
- [ ] モバイル表示確認

---

**🎨 安全に、素早く、美しいサイトを作ろう！**