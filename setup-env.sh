#!/bin/bash

# Sanity環境変数設定スクリプト
# 使い方: ./setup-env.sh あなたのプロジェクトID

if [ -z "$1" ]; then
    echo "使い方: ./setup-env.sh <SANITY_PROJECT_ID>"
    echo "例: ./setup-env.sh abc123xyz"
    exit 1
fi

PROJECT_ID=$1

# Sanity Studioの環境変数設定
cd sanity
cp .env.example .env
sed -i '' "s/your-project-id/$PROJECT_ID/g" .env
echo "✅ Sanity Studio環境変数を設定しました"

# Next.jsの環境変数設定
cd ../frontend
cp .env.local.example .env.local
sed -i '' "s/your-project-id/$PROJECT_ID/g" .env.local
sed -i '' "s/your-preview-secret-key/$(openssl rand -base64 32)/g" .env.local
echo "✅ Next.js環境変数を設定しました"

# sanity.cli.tsの更新
cd ../sanity
sed -i '' "s/projectId: 'your-project-id'/projectId: '$PROJECT_ID'/g" sanity.cli.ts
echo "✅ Sanity CLI設定を更新しました"

echo ""
echo "🎉 環境変数の設定が完了しました！"
echo ""
echo "次のステップ:"
echo "1. cd /Users/ashidayuu/Desktop/開発/handlessCMS/sanity"
echo "2. npm install"
echo "3. cd ../frontend"  
echo "4. npm install"
echo ""
echo "開発サーバーの起動:"
echo "- Sanity Studio: cd sanity && npm run dev"
echo "- Next.js: cd frontend && npm run dev"