# 🎨 フロントエンド開発・修正ガイド

HandlessCMS（site_5）のフロントエンド部分を安全に修正するための完全ガイドです。

## 📁 ファイル構造

```
site_5/
├── index.html         # メインHTML（修正OK）
├── style.css          # スタイルシート（修正OK）
├── script.js          # JavaScript（注意点あり）
├── news-data.json     # ニュースデータ（自動更新・触らない）
└── assets/
    └── images/        # 画像ファイル（追加・変更OK）
```

## 🛠️ 修正方法

### 1. HTMLの修正

**ファイル**: `site_5/index.html`

**よくある修正内容**:
- テキスト・コンテンツ変更
- レイアウト調整
- 新しいセクション追加
- メタデータ更新

**修正例**:
```html
<!-- タイトル変更 -->
<h1>Kanauuu - 地方から夢は叶う</h1>
<!-- ↓ -->
<h1>新しいタイトル</h1>

<!-- 新しいセクション追加 -->
<section class="new-section">
    <div class="container">
        <h2>新しいセクション</h2>
        <p>コンテンツ...</p>
    </div>
</section>
```

### 2. スタイル（CSS）の修正

**ファイル**: `site_5/style.css`

**よくある修正内容**:
- カラーテーマ変更
- レスポンシブ調整
- アニメーション追加
- フォント変更

**修正例**:
```css
/* カラー変更 */
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    /* ↓ 新しいカラー */
    --primary-color: #28a745;
    --secondary-color: #17a2b8;
}

/* 新しいセクションのスタイル */
.new-section {
    padding: 60px 0;
    background-color: var(--primary-color);
    color: white;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
    .new-section {
        padding: 40px 0;
    }
}
```

### 3. JavaScript機能の修正

**ファイル**: `site_5/script.js`

**⚠️ 重要な注意事項**:
以下の機能は**変更しないでください**（ニュース自動更新が壊れます）:
- `fetchNews()` 関数
- `displayNews()` 関数
- `#news-list`, `#news-loading`, `#news-fallback` 要素の操作

**安全に修正できる内容**:
- アニメーション効果
- UI インタラクション
- スムーススクロール
- その他のDOM操作

**修正例**:
```javascript
// 新しいアニメーション追加
function addScrollAnimation() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    });
    
    elements.forEach(el => observer.observe(el));
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
    addScrollAnimation();
    // 既存のニュース読み込み機能は保持
    fetchNews();
});
```

### 4. 画像・アセットの追加

**ディレクトリ**: `site_5/assets/images/`

**追加方法**:
```bash
# 新しい画像を追加
cp new-image.jpg site_5/assets/images/

# HTMLで使用
<img src="assets/images/new-image.jpg" alt="説明">
```

## 🚀 デプロイフロー

### 自動デプロイ（推奨）

```bash
cd /Users/ashidayuu/Desktop/開発/handlessCMS

# 1. 変更を確認
git status
git diff

# 2. 変更をステージング
git add .

# 3. コミット（分かりやすいメッセージで）
git commit -m "feat: Add new hero section animation

- Add scroll-triggered animations
- Update color scheme to green theme
- Improve mobile responsiveness"

# 4. プッシュ
git push origin main
```

**結果**: 約2-3分で https://kanauuu.com に反映

### 段階的デプロイ

```bash
# HTML変更のみ
git add index.html
git commit -m "Update: Change hero section title"

# CSS変更のみ  
git add style.css
git commit -m "Style: Update color theme to green"

# 画像追加
git add assets/images/
git commit -m "Assets: Add new project images"

# 一括プッシュ
git push origin main
```

## 💡 開発効率のTips

### 1. ローカル開発環境

```bash
# 簡易サーバーでプレビュー
cd site_5
python3 -m http.server 8000

# ブラウザで確認
open http://localhost:8000
```

### 2. VSCode での編集

```bash
# プロジェクト全体を開く
code /Users/ashidayuu/Desktop/開発/handlessCMS/

# site_5 のみ開く
code /Users/ashidayuu/Desktop/開発/handlessCMS/site_5/
```

推奨拡張機能:
- Live Server
- Auto Rename Tag
- CSS Peek
- GitLens

### 3. ブラウザ開発者ツール活用

```javascript
// デバッグ用コンソールコマンド
console.log('Current news data:', window.newsData);

// 要素の確認
document.querySelector('#news-list');

// スタイルのテスト
document.body.style.backgroundColor = '#f0f0f0';
```

## ⚠️ 重要な注意事項

### 1. ニュース機能を壊さない

**変更禁止の要素**:
```html
<!-- これらのIDは変更しない -->
<div id="news-list">
<div id="news-loading">  
<div id="news-fallback">
```

**変更禁止のファイル**:
- `site_5/news-data.json` （自動更新される）

### 2. レスポンシブ対応の維持

既存のメディアクエリを参考に：
```css
/* 既存のブレイクポイント */
@media (max-width: 1200px) { /* Large devices */ }
@media (max-width: 992px)  { /* Medium devices */ }
@media (max-width: 768px)  { /* Small devices */ }
@media (max-width: 576px)  { /* Extra small devices */ }
```

### 3. パフォーマンスの考慮

```html
<!-- 画像最適化 -->
<img src="assets/images/hero.jpg" 
     alt="Hero image"
     loading="lazy"
     width="800" 
     height="600">

<!-- 外部リソースの最適化 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="//example.com">
```

## 🔄 修正→確認のワークフロー

### 基本フロー

1. **ファイル修正**
   - HTML/CSS/JS/画像の変更

2. **ローカル確認**（オプション）
   - `python3 -m http.server 8000`

3. **Git コミット・プッシュ**
   - `git add .`
   - `git commit -m "説明的なメッセージ"`
   - `git push origin main`

4. **本番確認**
   - 2-3分待機
   - https://kanauuu.com で確認

5. **追加修正**（必要に応じて）
   - 問題があれば1に戻る

### 緊急時の確認方法

```bash
# 開発用URLで即座に確認
https://handlesscms.pages.dev

# Cloudflare Pages ダッシュボードでデプロイ状況確認
https://dash.cloudflare.com/
```

## 📊 よくある修正パターン

### 1. カラーテーマ変更

```css
:root {
    /* 既存のカラー */
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    
    /* 新しいカラーテーマ */
    --primary-color: #28a745;
    --secondary-color: #17a2b8;
    --accent-color: #ffc107;
}
```

### 2. 新しいセクション追加

```html
<!-- HTML -->
<section class="custom-section">
    <div class="container">
        <h2>新しいセクション</h2>
        <p>コンテンツ...</p>
    </div>
</section>
```

```css
/* CSS */
.custom-section {
    padding: 80px 0;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
}

.custom-section .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}
```

### 3. アニメーション追加

```css
/* CSS */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out;
}
```

```javascript
// JavaScript
function addScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    });
    
    elements.forEach(el => observer.observe(el));
}
```

## 🚨 トラブルシューティング

### 問題: 変更が反映されない

**解決方法**:
1. ブラウザキャッシュをクリア（Ctrl+F5）
2. Cloudflare Pages のキャッシュクリア
3. Git push が成功しているか確認

### 問題: ニュース機能が動かない

**解決方法**:
1. `script.js` のニュース関連関数を確認
2. `news-data.json` が存在するか確認
3. ブラウザのコンソールエラーをチェック

### 問題: モバイルで表示が崩れる

**解決方法**:
1. レスポンシブ用CSS追加
2. viewport メタタグ確認
3. 画像サイズの調整

## 🎯 まとめ

このガイドに従えば、HandlessCMSのフロントエンドを安全に修正できます：

- **HTML/CSS**: 自由に修正可能
- **JavaScript**: ニュース機能以外は修正可能
- **画像**: 追加・変更可能
- **デプロイ**: Git push で自動反映
- **確認**: 約2-3分で本番反映

何か不明な点があれば、このガイドを参考に安全に開発を進めてください！