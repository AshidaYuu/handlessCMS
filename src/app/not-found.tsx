import Link from 'next/link'
import Layout from '@/components/layout/Layout'

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            ページが見つかりません
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            お探しのページは存在しないか、削除された可能性があります。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              トップページに戻る
            </Link>
            <Link
              href="/news"
              className="inline-block px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              お知らせ一覧
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}