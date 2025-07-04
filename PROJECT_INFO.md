# Kanauuu Next.js プロジェクト情報

## プロジェクトの位置
このプロジェクトは独立したNext.jsアプリケーションです：
- **場所**: `/Users/ashidayuu/Desktop/開発/handlessCMS/kanauuu-nextjs/`
- **他のプロジェクトとは完全に独立**

## 他のディレクトリとの関係
親ディレクトリ（`/Users/ashidayuu/Desktop/開発/handlessCMS/`）には以下があります：
- `frontend/`: 別のNext.jsプロジェクト（使用しない）
- `site_5/`: 静的HTMLサイト（移行元、使用しない）
- `sanity/`: Sanity Studioプロジェクト（データソースとして使用）

## 開発方法
```bash
# このディレクトリで実行
cd /Users/ashidayuu/Desktop/開発/handlessCMS/kanauuu-nextjs
npm run dev
```

## ポート
- デフォルト: http://localhost:3000

## 主な改善点
1. **CORS問題解決**: サーバーサイドでSanity APIを呼び出し
2. **SEO最適化**: メタデータ自動生成
3. **パフォーマンス**: SSG（静的サイト生成）
4. **開発体験**: TypeScript + Tailwind CSS

## 注意
他のプロジェクトのファイルは使用しません。このディレクトリ内で完結しています。