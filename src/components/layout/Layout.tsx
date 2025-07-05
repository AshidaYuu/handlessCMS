import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import Script from 'next/script'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
      <Script src="/js/animations.js" strategy="lazyOnload" />
    </>
  )
}