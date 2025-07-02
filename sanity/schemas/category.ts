/**
 * カテゴリーのスキーマ定義
 * ブログ記事のカテゴリーを管理します
 */

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'カテゴリー',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'タイトル',
      type: 'string',
      validation: Rule => Rule.required().error('タイトルは必須です'),
    }),
    defineField({
      name: 'description',
      title: '説明',
      type: 'text',
    }),
  ],
})