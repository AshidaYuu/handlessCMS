import Link from 'next/link'
import { siteConfig } from '@/config/site'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold">KANAUUU</h2>
            </Link>
            <p className="text-gray-300">合同会社Kanauuu</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              地方から挑戦する人々の背中を押し、夢を叶える土壌をつくる。
              大崎の子どもたちと企業、そして地域そのものの未来を共創します。
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">サイトマップ</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                      TOP<span className="text-gray-500 ml-2">トップ</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#about" className="text-gray-300 hover:text-white transition-colors">
                      ABOUT<span className="text-gray-500 ml-2">私たちについて</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#mission" className="text-gray-300 hover:text-white transition-colors">
                      OUR CORE<span className="text-gray-500 ml-2">私たちの軸</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#projects" className="text-gray-300 hover:text-white transition-colors">
                      PROJECTS<span className="text-gray-500 ml-2">プロジェクト</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">&nbsp;</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                      BLOG<span className="text-gray-500 ml-2">ブログ</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/news" className="text-gray-300 hover:text-white transition-colors">
                      NEWS<span className="text-gray-500 ml-2">お知らせ</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#team" className="text-gray-300 hover:text-white transition-colors">
                      OUR TEAM<span className="text-gray-500 ml-2">私たちのチーム</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#contact" className="text-gray-300 hover:text-white transition-colors">
                      CONTACT<span className="text-gray-500 ml-2">お問い合わせ</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            ©{currentYear} Kanauuu Co., Ltd.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              個人情報保護方針
            </Link>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400 text-sm">{siteConfig.url}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}