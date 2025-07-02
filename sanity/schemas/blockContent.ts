/**
 * ブロックコンテンツのスキーマ定義
 * リッチテキストエディタの設定
 */

import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'ブロックコンテンツ',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // 使用可能なスタイル
      styles: [
        {title: '通常', value: 'normal'},
        {title: '見出し1', value: 'h1'},
        {title: '見出し2', value: 'h2'},
        {title: '見出し3', value: 'h3'},
        {title: '見出し4', value: 'h4'},
        {title: '引用', value: 'blockquote'},
      ],
      // リストの種類
      lists: [
        {title: '箇条書き', value: 'bullet'},
        {title: '番号付き', value: 'number'}
      ],
      // インライン要素のマーク
      marks: {
        decorators: [
          {title: '太字', value: 'strong'},
          {title: 'イタリック', value: 'em'},
          {title: '下線', value: 'underline'},
          {title: 'コード', value: 'code'},
        ],
        // リンクの設定
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    // 画像ブロック
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})