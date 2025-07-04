import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import Script from 'next/script'
import LoadingScreen from '@/components/LoadingScreen'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export default function Layout({ children, className = '' }: LayoutProps) {
  return (
    <>
      <LoadingScreen />
      <Header />
      <main>
        {children}
      </main>
      <Footer />
      <Script src="/js/animations.js" strategy="lazyOnload" />
    </>
  )
}