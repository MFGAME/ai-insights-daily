import { notFound } from 'next/navigation'
import Link from 'next/link'
import { insights } from '@/lib/data'

export default function InsightPage({ params }: { params: { id: string } }) {
  const insight = insights.find(i => i.id === params.id)

  if (!insight) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary-600">
            首页
          </Link>
          <span>/</span>
          <Link href="/insights" className="hover:text-primary-600">
            全部洞察
          </Link>
          <span>/</span>
          <span className="text-gray-900">{insight.title}</span>
        </div>

        {/* Article */}
        <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-lg text-sm font-semibold">
                {insight.category}
              </span>
              {insight.is_premium && (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
                  <span>🔒</span>
                  <span>会员专享</span>
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {insight.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {insight.summary}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>📅 {insight.published_at}</span>
              <span>☕ 5分钟阅读</span>
            </div>
          </header>

          {/* Content */}
          {insight.is_premium ? (
            <div>
              <div className="prose max-w-none mb-8">
                <div
                  dangerouslySetInnerHTML={{
                    __html: insight.content.substring(0, 500) + '...'
                  }}
                />
              </div>
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  🔒 会员专享内容
                </h3>
                <p className="text-gray-700 mb-6">
                  订阅后查看完整内容，并解锁所有会员专享洞察
                </p>
                <Link
                  href="/subscribe"
                  className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition inline-block"
                >
                  立即订阅 - ¥29/月
                </Link>
              </div>
            </div>
          ) : (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: insight.content }}
            />
          )}

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {insight.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Related */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            相关洞察
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {insights
              .filter(i => i.id !== insight.id && i.category === insight.category)
              .slice(0, 2)
              .map(related => (
                <Link
                  key={related.id}
                  href={`/insights/${related.id}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6"
                >
                  <div className="text-sm text-gray-500 mb-2">
                    {related.category}
                  </div>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {related.summary}
                  </p>
                </Link>
              ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            每日洞察，直达你的邮箱
          </h2>
          <p className="mb-6 text-primary-100">
            订阅后，每日早上8点准时收到最新商业洞察
          </p>
          <Link
            href="/subscribe"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            立即订阅 - ¥29/月
          </Link>
        </div>
      </div>
    </div>
  )
}
