'use client'

import Link from 'next/link'
import { insights } from '@/lib/data'

export default function Home() {
  const latestInsights = insights.slice(0, 5)
  const freeInsight = insights.find(i => !i.is_premium)

  return (
    <>
      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        nav {
          background: white;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 50;
          padding: 0 2rem;
          height: 64px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        nav a { text-decoration: none; }
        
        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: #0284c7;
        }
        
        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        
        .nav-links a {
          color: #374151;
          transition: color 0.2s;
        }
        
        .nav-links a:hover { color: #0284c7; }
        
        .cta-button {
          background: #0284c7;
          color: white !important;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          transition: background 0.2s;
        }
        
        .cta-button:hover { background: #0369a1; }
        
        .hero {
          background: linear-gradient(to right, #0284c7, #075985);
          color: white;
          padding: 5rem 2rem;
          text-align: center;
        }
        
        .hero h1 {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
        }
        
        .hero p {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          max-width: 42rem;
          margin-left: auto;
          margin-right: auto;
        }
        
        .hero .cta-button {
          background: white;
          color: #0284c7 !important;
          padding: 0.75rem 2rem;
          font-weight: 600;
          display: inline-block;
        }
        
        .hero .cta-button:hover { background: #f3f4f6; }
        
        .features {
          padding: 4rem 2rem;
          background: white;
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        
        .feature { text-align: center; }
        
        .feature .icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .feature h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        .feature p { color: #6b7280; }
        
        .free-trial {
          padding: 4rem 2rem;
          background: #f9fafb;
        }
        
        .free-trial .container {
          max-width: 1280px;
          margin: 0 auto;
        }
        
        .free-trial h2 {
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .free-trial .card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 2rem;
        }
        
        .free-trial .meta {
          display: flex;
          gap: 0.5rem;
          color: #6b7280;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }
        
        .free-trial h3 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        
        .free-trial p {
          color: #374151;
          margin-bottom: 1.5rem;
        }
        
        .free-trial a {
          color: #0284c7;
          font-weight: 600;
          text-decoration: none;
        }
        
        .free-trial a:hover { color: #0369a1; }
        
        .insights {
          padding: 4rem 2rem;
          max-width: 1280px;
          margin: 0 auto;
        }
        
        .insights .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .insights h2 {
          font-size: 2rem;
          font-weight: bold;
        }
        
        .insights .view-all {
          color: #0284c7;
          font-weight: 600;
          text-decoration: none;
        }
        
        .insights .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        
        .insights .card {
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          text-decoration: none;
          transition: box-shadow 0.2s;
          display: block;
        }
        
        .insights .card:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        .insights .tags {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        
        .insights .tag {
          background: #e0f2fe;
          color: #0369a1;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
        
        .insights .premium-tag {
          background: #fef3c7;
          color: #92400e;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
        
        .insights h3 {
          font-size: 1.125rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          color: #111827;
        }
        
        .insights p {
          color: #6b7280;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }
        
        .insights .date {
          color: #6b7280;
          font-size: 0.875rem;
        }
        
        .cta {
          padding: 4rem 2rem;
          background: #f0f9ff;
          text-align: center;
        }
        
        .cta h2 {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        
        .cta p {
          color: #374151;
          margin-bottom: 2rem;
          max-width: 42rem;
          margin-left: auto;
          margin-right: auto;
        }
        
        .cta .cta-button {
          background: #0284c7;
          color: white !important;
          padding: 0.75rem 2rem;
          font-weight: 600;
          display: inline-block;
        }
        
        .cta .cta-button:hover { background: #0369a1; }
        
        footer {
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          padding: 3rem 2rem;
          text-align: center;
          color: #6b7280;
          margin-top: 5rem;
        }
        
        @media (max-width: 768px) {
          .features, .insights .grid {
            grid-template-columns: 1fr;
          }
          .hero h1 { font-size: 2rem; }
        }
      `}</style>
      
      <nav>
        <a href="/" className="logo">💡 洞察日报</a>
        <div className="nav-links">
          <a href="/insights">全部洞察</a>
          <a href="/subscribe">订阅</a>
          <a href="/subscribe" className="cta-button">开始订阅</a>
        </div>
      </nav>

      <main>
        <section className="hero">
          <h1>AI商业洞察日报</h1>
          <p>每日自动生成高质量商业洞察，帮助创业者、副业者、投资者发现赚钱机会</p>
          <a href="/subscribe" className="cta-button">立即订阅 - ¥99终身</a>
        </section>

        <section className="features">
          <div className="feature">
            <div className="icon">📊</div>
            <h3>数据驱动</h3>
            <p>基于真实市场数据生成洞察，不是空谈</p>
          </div>
          <div className="feature">
            <div className="icon">🤖</div>
            <h3>AI生成</h3>
            <p>每日自动生成，保证持续更新</p>
          </div>
          <div className="feature">
            <div className="icon">💰</div>
            <h3>实战导向</h3>
            <p>每个洞察都告诉你如何变现</p>
          </div>
        </section>

        {freeInsight && (
          <section className="free-trial">
            <div className="container">
              <h2>免费试读</h2>
              <div className="card">
                <div className="meta">
                  <span>{freeInsight.category}</span>
                  <span>•</span>
                  <span>{freeInsight.published_at}</span>
                </div>
                <h3>{freeInsight.title}</h3>
                <p>{freeInsight.summary}</p>
                <Link href={`/insights/${freeInsight.id}`}>
                  阅读全文 →
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="insights">
          <div className="header">
            <h2>最新洞察</h2>
            <Link href="/insights" className="view-all">
              查看全部 →
            </Link>
          </div>
          <div className="grid">
            {latestInsights.map(insight => (
              <Link
                key={insight.id}
                href={`/insights/${insight.id}`}
                className="card"
              >
                <div className="tags">
                  <span className="tag">{insight.category}</span>
                  {insight.is_premium && (
                    <span className="premium-tag">会员专享</span>
                  )}
                </div>
                <h3>{insight.title}</h3>
                <p>{insight.summary}</p>
                <div className="date">{insight.published_at}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="cta">
          <h2>每日洞察，直达你的邮箱</h2>
          <p>订阅后，每日早上8点准时收到最新商业洞察。已有 50+ 创业者和副业者在订阅。</p>
          <a href="/subscribe" className="cta-button">立即订阅 - ¥99终身</a>
        </section>
      </main>

      <footer>
        <p>© 2026 AI商业洞察日报. 每日发现赚钱机会.</p>
      </footer>
    </>
  )
}
