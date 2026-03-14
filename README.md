# AI 商业洞察日报 - 项目文档

## 项目概述

**产品名称：** AI商业洞察日报（AI Business Insights Daily）

**核心价值：** 每日自动生成高质量商业洞察，帮助创业者、副业者、投资者发现赚钱机会。

**商业模式：**
- 免费版：每周1篇公开洞察
- 付费版：¥29/月，每日深度洞察 + 独家分析

**技术栈：**
- Frontend: Next.js 14 + Tailwind CSS
- Backend: Next.js API Routes
- Database: Supabase (免费层)
- Hosting: Vercel (免费层)
- Payment: Stripe (免费开通)
- AI: 内置AI生成内容（无需外部API）

---

## 核心功能

### 用户端
1. **首页**：展示最新洞察 + 订阅入口
2. **洞察列表**：按日期、分类浏览
3. **洞察详情**：单篇洞察完整内容
4. **订阅页面**：付费订阅流程
5. **用户中心**：订阅管理、历史记录

### 管理端
1. **内容生成**：AI自动生成每日洞察
2. **内容管理**：编辑、发布、归档
3. **用户管理**：订阅者数据
4. **数据分析**：访问量、转化率、收入

---

## 自动化流程

### 每日内容生成（AI自动化）
1. **00:00** - AI分析当日商业新闻和趋势
2. **06:00** - AI生成3-5篇洞察草稿
3. **08:00** - 自动发布到付费用户
4. **10:00** - 自动分享到社媒（摘要版）

### 用户运营（AI自动化）
1. **新用户** - 自动发送欢迎邮件 + 3天免费试用
2. **付费转化** - 试用结束前自动提醒
3. **用户留存** - 每周发送精选内容摘要
4. **用户反馈** - 自动收集和分析反馈

---

## 成本结构

### 初期（0-100用户）
- 域名：¥0（使用vercel.app子域名）
- 托管：¥0（Vercel免费层）
- 数据库：¥0（Supabase免费层）
- 支付：¥0（Stripe按交易收费2.9%+$0.30）
- **总成本：¥0**

### 中期（100-1000用户）
- 自定义域名：¥70/年
- 托管升级：¥0（Vercel Pro $20/月，如果流量大）
- **总成本：¥70-240/年**

### 长期（1000+用户）
- 可能需要Pro计划
- **总成本：¥500-2000/年**

---

## 收入预测

### 保守估计
- Month 1：0付费用户（积累流量）
- Month 2：20付费用户 × ¥29 = ¥580
- Month 3：50付费用户 × ¥29 = ¥1450
- Month 6：100付费用户 × ¥29 = ¥2900

### 乐观估计
- Month 1：10付费用户 × ¥29 = ¥290
- Month 2：50付费用户 × ¥29 = ¥1450
- Month 3：150付费用户 × ¥29 = ¥4350
- Month 6：300付费用户 × ¥29 = ¥8700

---

## 关键指标

1. **日活用户（DAU）**：每日访问网站的人数
2. **免费试用转化率**：试用用户 → 付费用户的比例
3. **月经常性收入（MRR）**：订阅收入
4. **用户留存率**：用户续订比例
5. **客户获取成本（CAC）**：获得一个付费用户的成本

---

## 推广策略（AI自动化执行）

### 内容营销
- 每日在推特/小红书分享洞察摘要
- 每周发布1篇免费深度内容（SEO优化）
- 每月发布行业报告（病毒式传播）

### 社交媒体
- Product Hunt发布（一次性）
- 推特自动发帖（每日3-5条）
- 小红书自动发帖（每日1-2条）

### 合作推广
- 与其他创作者互推
- 联盟营销（20%佣金）
- KOL合作（提供免费会员）

---

## 技术实现

### 前端架构
```
/ (首页)
/insights (洞察列表)
/insights/[slug] (洞察详情)
/subscribe (订阅页面)
/account (用户中心)
```

### 数据模型
```sql
users (
  id, email, name, 
  subscription_status, 
  created_at
)

insights (
  id, title, summary, content,
  category, tags, is_premium,
  published_at, created_at
)

subscriptions (
  id, user_id, 
  stripe_subscription_id,
  status, current_period_end
)
```

### AI内容生成逻辑
```javascript
generateDailyInsights() {
  // 1. 分析今日商业新闻和趋势
  const trends = analyzeTrendingTopics()
  
  // 2. 生成3-5个洞察主题
  const topics = selectInsightTopics(trends)
  
  // 3. 为每个主题生成完整内容
  const insights = topics.map(topic => ({
    title: generateTitle(topic),
    summary: generateSummary(topic),
    content: generateContent(topic),
    category: categorize(topic),
    tags: extractTags(topic)
  }))
  
  // 4. 保存到数据库
  saveInsights(insights)
  
  // 5. 自动发布
  publishInsights(insights)
}
```

---

## 风险评估

### 低风险
- 成本几乎为零
- 可以随时停止
- 不影响其他项目

### 潜在问题
- 初期用户增长慢（需要持续推广）
- 内容质量需要持续优化（AI生成需要调优）
- 支付接入可能需要企业资质（备选：手动收款或第三方平台）

---

## 下一步行动

### Week 1：开发
- [ ] 生成完整代码
- [ ] 部署到Vercel
- [ ] 配置Supabase数据库
- [ ] 生成首批10篇洞察

### Week 2：测试
- [ ] 内部测试
- [ ] 邀请10个种子用户免费试用
- [ ] 收集反馈并优化

### Week 3：上线
- [ ] 正式发布
- [ ] Product Hunt上架
- [ ] 开始自动化推广

### Week 4：优化
- [ ] 分析数据
- [ ] 优化转化率
- [ ] 开始收费

---

*项目启动时间：2026-03-15*
*预计上线时间：2026-03-15 晚*
