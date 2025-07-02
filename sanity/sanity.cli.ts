/**
 * Sanity CLIの設定ファイル
 * コマンドラインツールの設定を行います
 */

import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    // プロジェクトIDとデータセット名
    // 実際のプロジェクトIDに置き換えてください
    projectId: 'rt90f87e',
    dataset: 'production'
  }
})