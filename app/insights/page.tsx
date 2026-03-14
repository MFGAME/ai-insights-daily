import Link from 'next/link'
import { insights, categories } from '@/lib/data'

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            全部洞察
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            每日更新的商业洞察，帮助你发现赚钱机会
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg">
            全部
          </button>
          {categories.map(category => (
            <button
              key={category}
              className="bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map(insight => (
            <Link
              key={insight.id}
              href={`/insights/${insight.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6"
            >
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded">
                  {insight.category}
                </span>
                {insight.is_premium && (
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded flex items-center gap-1">
                    <span>🔒</span>
                    <span>会员专享</span>
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold mb-3 line-clamp-2">
                {insight.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {insight.summary}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{insight.published_at}</span>
                <span className="text-primary-600 font-semibold">
                  阅读全文 →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            解锁所有会员专享内容
          </h2>
          <p className="mb-6 text-primary-100">
            订阅后，每日收到最新洞察，访问所有会员专享内容
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
