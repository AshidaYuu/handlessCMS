import { PortableText as BasePortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'

const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
})

function urlFor(source: any) {
  return builder.image(source)
}

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      
      return (
        <div className="portable-image">
          <Image
            src={urlFor(value).width(800).height(600).fit('max').auto('format').url()}
            alt={value.alt || '記事の画像'}
            width={800}
            height={600}
            className="portable-image-element"
          />
          {value.caption && (
            <figcaption className="portable-image-caption">
              {value.caption}
            </figcaption>
          )}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="portable-h1">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="portable-h2">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="portable-h3">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="portable-h4">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="portable-blockquote">{children}</blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="portable-paragraph">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="portable-list portable-list-bullet">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="portable-list portable-list-number">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="portable-list-item">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="portable-list-item">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="portable-strong">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="portable-em">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="portable-code">{children}</code>
    ),
    link: ({ children, value }: any) => {
      const href = value?.href || '#'
      return (
        <a
          href={href}
          className="portable-link"
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
  },
}

interface PortableTextProps {
  value: any
}

export default function PortableText({ value }: PortableTextProps) {
  if (!value || !Array.isArray(value)) {
    return null
  }

  return (
    <div className="portable-text">
      <BasePortableText value={value} components={components} />
    </div>
  )
}