import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI商业洞察日报 - 每日发现赚钱机会',
  description: '每日自动生成高质量商业洞察，帮助创业者、副业者、投资者发现赚钱机会',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="text-2xl font-bold text-primary-600">
                  💡 洞察日报
                </a>
              </div>
              <div className="flex items-center space-x-8">
                <a href="/insights" className="text-gray-700 hover:text-primary-600">
                  全部洞察
                </a>
                <a href="/subscribe" className="text-gray-700 hover:text-primary-600">
                  订阅
                </a>
                <a
                  href="/subscribe"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  开始订阅
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-gray-50 border-t border-gray-200 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center text-gray-600">
              <p>© 2026 AI商业洞察日报. 每日发现赚钱机会.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
