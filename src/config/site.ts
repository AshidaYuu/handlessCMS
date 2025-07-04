import { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  title: 'Kanauuu - 地方から夢は叶う',
  description: '地方から挑戦する人々の背中を押し、夢を叶える土壌をつくる。大崎の子どもたちと企業、そして地域そのものの未来を共創します。',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://kanauuu.com',
  ogImage: '/assets/images/ogp-image.png',
  links: {
    twitter: 'https://twitter.com/kanauuu',
    instagram: 'https://instagram.com/kanauuu',
    youtube: 'https://youtube.com/@kanauuu',
    // github: 'https://github.com/kanauuu', // 必要に応じて
  }
}

export const navigation = [
  {
    title: 'HOME',
    href: '/',
    description: 'トップページ'
  },
  {
    title: 'ABOUT',
    href: '/#about',
    description: '私たちについて'
  },
  {
    title: 'OUR CORE',
    href: '/#mission',
    description: '私たちの軸'
  },
  {
    title: 'PROJECTS',
    href: '/#projects',
    description: 'プロジェクト'
  },
  {
    title: 'BLOG',
    href: '/blog',
    description: 'ブログ'
  },
  {
    title: 'NEWS',
    href: '/news',
    description: 'お知らせ'
  },
  {
    title: 'OUR TEAM',
    href: '/#team',
    description: '私たちのチーム'
  },
  {
    title: 'CONTACT',
    href: '/#contact',
    description: 'お問い合わせ'
  }
]