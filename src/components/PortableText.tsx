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
    image: ({ value }: { value: any }) => {
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
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="portable-h1">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="portable-h2">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="portable-h3">{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="portable-h4">{children}</h4>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="portable-blockquote">{children}</blockquote>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="portable-paragraph">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="portable-list portable-list-bullet">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="portable-list portable-list-number">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className="portable-list-item">{children}</li>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <li className="portable-list-item">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="portable-strong">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="portable-em">{children}</em>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
      <code className="portable-code">{children}</code>
    ),
    link: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => (
      <a
        href={value.href}
        className="portable-link"
        target={value.href.startsWith('http') ? '_blank' : undefined}
        rel={value.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
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