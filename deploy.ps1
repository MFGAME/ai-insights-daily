# AI商业洞察日报 - 一键部署脚本
# 使用方法：右键 -> 使用 PowerShell 运行

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  AI商业洞察日报 - 自动部署脚本" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# 检查 Node.js
Write-Host "[1/5] 检查 Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js 已安装: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ 未检测到 Node.js，请先安装: https://nodejs.org" -ForegroundColor Red
    Read-Host "按回车键退出"
    exit 1
}

# 检查 Vercel CLI
Write-Host "`n[2/5] 检查 Vercel CLI..." -ForegroundColor Yellow
try {
    $vercelVersion = vercel --version 2>&1
    Write-Host "✓ Vercel CLI 已安装: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "正在安装 Vercel CLI..." -ForegroundColor Yellow
    npm i -g vercel
    Write-Host "✓ Vercel CLI 安装完成" -ForegroundColor Green
}

# 检查登录状态
Write-Host "`n[3/5] 检查 Vercel 登录状态..." -ForegroundColor Yellow
try {
    $whoami = vercel whoami 2>&1
    if ($whoami -match "Error") {
        Write-Host "⚠ 需要登录 Vercel" -ForegroundColor Yellow
        Write-Host "`n即将打开浏览器进行登录..." -ForegroundColor Cyan
        Write-Host "请在浏览器中完成登录后，回到这里继续" -ForegroundColor Cyan
        Read-Host "按回车键开始登录"
        vercel login
    } else {
        Write-Host "✓ 已登录账号: $whoami" -ForegroundColor Green
    }
} catch {
    Write-Host "登录过程出错: $_" -ForegroundColor Red
    Read-Host "按回车键退出"
    exit 1
}

# 部署项目
Write-Host "`n[4/5] 开始部署到 Vercel..." -ForegroundColor Yellow
Write-Host "这可能需要1-2分钟..." -ForegroundColor Gray
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[5/5] ✓ 部署成功！" -ForegroundColor Green
    Write-Host "`n=====================================" -ForegroundColor Cyan
    Write-Host "  🎉 部署完成！" -ForegroundColor Cyan
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host "`n你的网站地址：" -ForegroundColor Yellow
    Write-Host "https://ai-insights-daily.vercel.app" -ForegroundColor Cyan
    Write-Host "`n或者运行以下命令查看所有部署：" -ForegroundColor Gray
    Write-Host "vercel ls" -ForegroundColor Gray
} else {
    Write-Host "`n✗ 部署失败，请检查错误信息" -ForegroundColor Red
}

Write-Host "`n"
Read-Host "按回车键退出"
