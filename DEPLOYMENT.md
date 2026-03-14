# 部署指南

## 快速开始（5分钟部署）

### 方法1：使用Vercel（推荐）

1. **安装Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录Vercel**
   ```bash
   vercel login
   ```

3. **部署**
   ```bash
   cd projects/ai-insights-daily
   vercel
   ```

4. **访问**
   - Vercel会给你一个免费域名，比如 `ai-insights-daily.vercel.app`
   - 立即可访问！

---

### 方法2：本地运行

1. **安装依赖**
   ```bash
   cd projects/ai-insights-daily
   npm install
   ```

2. **运行开发服务器**
   ```bash
   npm run dev
   ```

3. **访问**
   - 打开 http://localhost:3000

---

## 数据库配置（可选）

如果需要持久化存储用户和订阅数据：

1. **创建Supabase项目**
   - 访问 https://supabase.com
   - 创建新项目（免费层）

2. **配置环境变量**
   创建 `.env.local` 文件：
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **创建数据表**
   在Supabase SQL编辑器中运行：
   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     name VARCHAR(255),
     subscription_status VARCHAR(50) DEFAULT 'free',
     created_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE insights (
     id SERIAL PRIMARY KEY,
     title VARCHAR(500) NOT NULL,
     summary TEXT,
     content TEXT,
     category VARCHAR(100),
     tags TEXT[],
     is_premium BOOLEAN DEFAULT false,
     published_at DATE,
     created_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE subscriptions (
     id SERIAL PRIMARY KEY,
     user_id INTEGER REFERENCES users(id),
     stripe_subscription_id VARCHAR(255),
     status VARCHAR(50),
     current_period_end TIMESTAMP,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

---

## 支付配置（生产环境）

1. **创建Stripe账户**
   - 访问 https://stripe.com
   - 创建账户（免费开通）

2. **获取API密钥**
   - 在Stripe Dashboard > Developers > API keys
   - 复制 Publishable key 和 Secret key

3. **配置环境变量**
   添加到 `.env.local`：
   ```
   STRIPE_PUBLIC_KEY=your_stripe_public_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   ```

4. **创建产品和价格**
   在Stripe Dashboard中：
   - 创建产品：AI商业洞察日报 - 会员版
   - 设置价格：¥29/月（Recurring）
   - 复制 Price ID

5. **配置Webhook**
   - 在Stripe Dashboard > Webhooks
   - 添加端点：`https://your-domain.vercel.app/api/webhooks/stripe`
   - 选择事件：`checkout.session.completed`, `customer.subscription.*`

---

## 自定义域名（可选）

1. **购买域名**
   - 在阿里云/腾讯云/GoDaddy购买域名
   - 成本：¥50-100/年

2. **在Vercel添加域名**
   - 进入项目设置 > Domains
   - 添加你的域名
   - 按提示配置DNS

3. **等待DNS生效**
   - 通常5-30分钟

---

## 自动化部署

### GitHub集成（推荐）

1. **推送代码到GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/ai-insights-daily.git
   git push -u origin main
   ```

2. **连接Vercel和GitHub**
   - 在Vercel导入GitHub项目
   - 之后每次push，Vercel自动部署

---

## 内容更新

### 手动更新

编辑 `lib/data.ts` 文件，添加新的洞察：

```typescript
{
  id: '6',
  title: '新的洞察标题',
  summary: '简短摘要',
  content: `完整内容...`,
  category: '分类',
  tags: ['标签1', '标签2'],
  is_premium: true,
  published_at: '2026-03-16'
}
```

### 自动化更新（高级）

可以创建定时任务，每日自动生成内容：

1. **创建API路由**
   创建 `app/api/generate-insights/route.ts`

2. **配置Cron Job**
   - 使用Vercel Cron Jobs
   - 或使用外部服务如cron-job.org

---

## 监控和分析

### Google Analytics

1. **创建GA4账户**
   - 访问 https://analytics.google.com
   - 创建媒体资源

2. **添加追踪代码**
   在 `app/layout.tsx` 中添加GA脚本

3. **查看数据**
   - 访问量
   - 用户行为
   - 转化率

---

## 成本预估

### 初期（0-100用户）
- 域名：¥0（使用vercel.app子域名）
- 托管：¥0（Vercel免费层）
- 数据库：¥0（Supabase免费层）
- 支付：¥0（Stripe按交易收费）
- **总计：¥0/月**

### 中期（100-1000用户）
- 自定义域名：¥70/年
- 托管升级：¥0-140/月（如需Pro版）
- **总计：¥70-1800/年**

---

## 下一步

1. ✅ 部署到Vercel
2. ✅ 测试所有功能
3. ⬜ 接入真实支付（Stripe）
4. ⬜ 配置数据库（Supabase）
5. ⬜ 开始推广（Product Hunt、社媒）
6. ⬜ 监控数据，优化产品

---

**预计完成时间：** 1-2小时（包括测试）

**立即开始：**
```bash
cd projects/ai-insights-daily
vercel
```
