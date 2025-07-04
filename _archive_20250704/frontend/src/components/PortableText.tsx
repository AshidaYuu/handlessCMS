/**
 * Portable Textのレンダリングコンポーネント
 * SanityのリッチテキストをReactコンポーネントに変換
 */

import { PortableText as PortableTextComponent } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

// Portable Textのカスタムコンポーネント
const components = {
  types: {
    // 画像のレンダリング
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="relative w-full h-96 my-8">
          <Image
            src={urlFor(value).width(800).height(400).url()}
            alt={value.alt || ' '}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )
    },
  },
  block: {
    // 見出し1
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    // 見出し2
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>
    ),
    // 見出し3
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mt-4 mb-2">{children}</h3>
    ),
    // 見出し4
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold mt-3 mb-2">{children}</h4>
    ),
    // 通常の段落
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    // 引用
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    // 箇条書き
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
    ),
    // 番号付きリスト
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
    ),
  },
  marks: {
    // リンク
    link: ({ value, children }: any) => {
      const target = value?.href?.startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      )
    },
    // 太字
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    // イタリック
    em: ({ children }: any) => <em className="italic">{children}</em>,
    // コード
    code: ({ children }: any) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
}

// Portable Textコンポーネントのプロパティ
interface PortableTextProps {
  value: any[]
}

/**
 * Portable Textをレンダリングするコンポーネント
 * @param value - Portable Text形式のデータ
 */
export default function PortableText({ value }: PortableTextProps) {
  return <PortableTextComponent value={value} components={components} />
}