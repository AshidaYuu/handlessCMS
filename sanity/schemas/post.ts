/**
 * ブログ記事のスキーマ定義
 * 投稿の構造を定義します
 */

import {defineField, defineType} from 'sanity'

export default defineType({
  // スキーマの識別名（内部的に使用）
  name: 'post',
  // UIに表示される名前
  title: 'ブログ記事',
  // ドキュメントタイプ（他にobject, imageなどがある）
  type: 'document',
  // フィールドの定義
  fields: [
    defineField({
      name: 'title',
      title: 'タイトル',
      type: 'string',
      // 必須フィールドの設定
      validation: Rule => Rule.required().error('タイトルは必須です'),
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ（URL）',
      type: 'slug',
      // slugの自動生成設定
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required().error('スラッグは必須です'),
    }),
    defineField({
      name: 'author',
      title: '著者',
      type: 'reference',
      // 参照先のスキーマタイプ
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'メイン画像',
      type: 'image',
      options: {
        // ホットスポット機能（画像の重要な部分を指定）
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'カテゴリー',
      type: 'array',
      // 配列の要素タイプ
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: '公開日',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: '本文',
      type: 'blockContent',
    }),
  ],

  // リストビューでの表示設定
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})