'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SubscribePage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: 实际部署时接入支付
    // 这里模拟提交
    setTimeout(() => {
      setMessage('感谢订阅！（实际部署时将接入支付）')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            订阅 AI 商业洞察日报
          </h1>
          <p className="text-xl text-gray-600">
            每日发现赚钱机会，走在趋势前面
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                免费版
              </h2>
              <div className="text-5xl font-bold text-gray-900 mb-2">
                ¥0
              </div>
              <p className="text-gray-500">永久免费</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>每周1篇免费洞察</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>访问所有免费内容</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>邮件订阅（每周精选）</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <span>✗</span>
                <span>会员专享内容</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <span>✗</span>
                <span>每日深度洞察</span>
              </li>
            </ul>
            <Link
              href="/insights"
              className="block text-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              浏览免费内容
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl shadow-xl p-8 text-white transform scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                推荐
              </span>
            </div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">
                会员版
              </h2>
              <div className="text-5xl font-bold mb-2">
                ¥29
              </div>
              <p className="text-primary-100">每月</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-yellow-300 mt-1">✓</span>
                <span>每日深度洞察</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300 mt-1">✓</span>
                <span>访问所有会员专享内容</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300 mt-1">✓</span>
                <span>每日邮件推送</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300 mt-1">✓</span>
                <span>独家分析报告</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300 mt-1">✓</span>
                <span>会员专属社群</span>
              </li>
            </ul>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="输入你的邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-gray-900 mb-3"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50"
              >
                {isLoading ? '处理中...' : '立即订阅'}
              </button>
            </form>
            {message && (
              <p className="mt-3 text-center text-sm text-yellow-200">
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            你将获得什么
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-bold mb-2">数据驱动洞察</h3>
              <p className="text-gray-600">
                基于真实市场数据，不是空谈理论
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-lg font-bold mb-2">实战变现策略</h3>
              <p className="text-gray-600">
                每个洞察都告诉你如何变现
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-lg font-bold mb-2">每日准时送达</h3>
              <p className="text-gray-600">
                每天早上8点，最新洞察直达邮箱
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            订阅者怎么说
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                  👨‍💼
                </div>
                <div>
                  <div className="font-bold">张先生</div>
                  <div className="text-sm text-gray-500">创业者</div>
                </div>
              </div>
              <p className="text-gray-700">
                "每日的洞察帮我发现了一个副业机会，现在已经月入¥5000+了。订阅费早就回本了。"
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                  👩‍💻
                </div>
                <div>
                  <div className="font-bold">李女士</div>
                  <div className="text-sm text-gray-500">产品经理</div>
                </div>
              </div>
              <p className="text-gray-700">
                "内容质量很高，数据详实，每个洞察都有可执行的建议。强烈推荐给想搞副业的朋友。"
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            常见问题
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-2">
                可以免费试用吗？
              </h3>
              <p className="text-gray-600">
                可以的。我们有大量免费内容供你体验。订阅会员后，可以访问所有会员专享内容。
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">
                如何取消订阅？
              </h3>
              <p className="text-gray-600">
                随时可以在账户设置中取消订阅，没有任何限制。取消后，当月仍可访问会员内容。
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">
                内容是AI生成的吗？
              </h3>
              <p className="text-gray-600">
                是的，内容由AI自动生成，但基于真实市场数据和案例。我们会持续优化生成质量。
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">
                支持哪些支付方式？
              </h3>
              <p className="text-gray-600">
                支持支付宝、微信支付、银行卡等主流支付方式。
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">
            有疑问？发邮件至 support@insights.example.com
          </p>
          <Link
            href="/insights"
            className="text-primary-600 font-semibold hover:text-primary-700"
          >
            ← 返回全部洞察
          </Link>
        </div>
      </div>
    </div>
  )
}
