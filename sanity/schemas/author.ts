/**
 * 著者のスキーマ定義
 * ブログの著者情報を管理します
 */

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'author',
  title: '著者',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '名前',
      type: 'string',
      validation: Rule => Rule.required().error('名前は必須です'),
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required().error('スラッグは必須です'),
    }),
    defineField({
      name: 'image',
      title: 'プロフィール画像',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: '自己紹介',
      type: 'array',
      // リッチテキストエディタの設定
      of: [
        {
          title: 'Block',
          type: 'block',
          // 使用可能なスタイル
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})