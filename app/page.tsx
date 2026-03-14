import Link from 'next/link'
import { insights } from '@/lib/data'

export default function Home() {
  const latestInsights = insights.slice(0, 5)
  const freeInsight = insights.find(i => !i.is_premium)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              AI商业洞察日报
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              每日自动生成高质量商业洞察，帮助创业者、副业者、投资者发现赚钱机会
            </p>
            <Link
              href="/subscribe"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
            >
              开始订阅 - ¥29/月
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">数据驱动</h3>
              <p className="text-gray-600">基于真实市场数据生成洞察，不是空谈</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">AI生成</h3>
              <p className="text-gray-600">每日自动生成，保证持续更新</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">实战导向</h3>
              <p className="text-gray-600">每个洞察都告诉你如何变现</p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Sample */}
      {freeInsight && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              免费试读
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <span>{freeInsight.category}</span>
                <span>•</span>
                <span>{freeInsight.published_at}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{freeInsight.title}</h3>
              <p className="text-gray-700 mb-6">{freeInsight.summary}</p>
              <Link
                href={`/insights/${freeInsight.id}`}
                className="text-primary-600 font-semibold hover:text-primary-700"
              >
                阅读全文 →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest Insights */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">最新洞察</h2>
            <Link href="/insights" className="text-primary-600 font-semibold hover:text-primary-700">
              查看全部 →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestInsights.map(insight => (
              <Link
                key={insight.id}
                href={`/insights/${insight.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6"
              >
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded">
                    {insight.category}
                  </span>
                  {insight.is_premium && (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      会员专享
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2 line-clamp-2">
                  {insight.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {insight.summary}
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  {insight.published_at}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            每日洞察，直达你的邮箱
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            订阅后，每日早上8点准时收到最新商业洞察。已有 50+ 创业者和副业者在订阅。
          </p>
          <Link
            href="/subscribe"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition inline-block"
          >
            立即订阅 - ¥29/月
          </Link>
        </div>
      </section>
    </div>
  )
}
