# 一键部署脚本 - 只需运行一次

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  AI商业洞察日报 - 自动部署" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# 步骤1：登录 Vercel
Write-Host "[步骤1/3] 登录 Vercel..." -ForegroundColor Yellow
Write-Host "即将打开浏览器，请完成登录后回到这里" -ForegroundColor Gray
Read-Host "按回车键继续"
npx vercel login

# 步骤2：部署到生产环境
Write-Host "`n[步骤2/3] 部署到生产环境..." -ForegroundColor Yellow
Write-Host "这可能需要1-2分钟..." -ForegroundColor Gray
npx vercel --prod --yes

# 步骤3：获取部署地址
Write-Host "`n[步骤3/3] 获取部署地址..." -ForegroundColor Yellow
npx vercel ls --prod

Write-Host "`n======================================" -ForegroundColor Green
Write-Host "  🎉 部署完成！" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host "`n你的网站地址：" -ForegroundColor Cyan
Write-Host "https://ai-insights-daily.vercel.app" -ForegroundColor Yellow
Write-Host "`n✓ 全部完成！" -ForegroundColor Green

Read-Host "`n按回车键退出"
