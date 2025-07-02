/**
 * Sanity Studioの設定ファイル
 * このファイルでは、Sanity Studioの基本設定を行います
 */

import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

// Sanity Studioの設定をエクスポート
export default defineConfig({
  // プロジェクト名（Sanityダッシュボードで作成したプロジェクト名）
  name: 'default',
  title: 'handlessCMS',

  // プロジェクトIDとデータセット名
  projectId: 'rt90f87e',
  dataset: 'production',

  // Sanity Studioで使用するプラグイン
  plugins: [
    // デスクツール：コンテンツの編集画面を提供
    deskTool(),
    // ビジョンツール：GROQ（Sanityのクエリ言語）のテスト環境を提供
    visionTool(),
  ],

  // スキーマ（データ構造）の定義
  schema: {
    types: schemaTypes,
  },
})