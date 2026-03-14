# AI商业洞察日报 - GitHub自动部署脚本
# 使用方法：.\deploy-github.ps1

param(
    [Parameter(Mandatory=$false)]
    [string]$Token = ""
)

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  AI商业洞察日报 - GitHub自动部署" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# 检查Token
if ([string]::IsNullOrWhiteSpace($Token)) {
    Write-Host "需要GitHub Personal Access Token" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "创建Token步骤（1分钟）：" -ForegroundColor Gray
    Write-Host "1. 打开: https://github.com/settings/tokens/new" -ForegroundColor Gray
    Write-Host "2. Note: 填 'laicai-deploy'" -ForegroundColor Gray
    Write-Host "3. Expiration: 选 'No expiration'" -ForegroundColor Gray
    Write-Host "4. Select scopes: 只勾选 'repo'" -ForegroundColor Gray
    Write-Host "5. 点击底部 'Generate token'" -ForegroundColor Gray
    Write-Host "6. 复制生成的token（ghp_开头）" -ForegroundColor Gray
    Write-Host ""
    $Token = Read-Host "请输入你的GitHub Token"
}

if ([string]::IsNullOrWhiteSpace($Token)) {
    Write-Host "✗ 未提供Token，退出" -ForegroundColor Red
    exit 1
}

# 验证Token格式
if (-not $Token.StartsWith("ghp_")) {
    Write-Host "⚠ Token格式不正确，应该以 ghp_ 开头" -ForegroundColor Yellow
    Write-Host "请确认你复制的是完整的token" -ForegroundColor Yellow
}

Write-Host "`n[1/5] 获取GitHub用户信息..." -ForegroundColor Yellow
try {
    $userResponse = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers @{
        "Authorization" = "token $Token"
        "Accept" = "application/vnd.github.v3+json"
    } -ErrorAction Stop
    $username = $userResponse.login
    Write-Host "✓ 用户名: $username" -ForegroundColor Green
    Write-Host "✓ 邮箱: $($userResponse.email)" -ForegroundColor Green
} catch {
    Write-Host "✗ Token验证失败: $_" -ForegroundColor Red
    Write-Host "请检查Token是否正确" -ForegroundColor Yellow
    exit 1
}

$repoName = "ai-insights-daily"
Write-Host "`n[2/5] 创建GitHub仓库: $repoName..." -ForegroundColor Yellow
try {
    $createRepoBody = @{
        name = $repoName
        description = "AI商业洞察日报 - 每日精选AI行业商机和变现机会"
        private = $false
        has_issues = $true
        has_projects = $false
        has_wiki = $false
    } | ConvertTo-Json

    $null = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method POST -Headers @{
        "Authorization" = "token $Token"
        "Accept" = "application/vnd.github.v3+json"
    } -Body $createRepoBody -ErrorAction Stop
    Write-Host "✓ 仓库创建成功" -ForegroundColor Green
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 422) {
        Write-Host "⚠ 仓库已存在，继续..." -ForegroundColor Yellow
    } else {
        Write-Host "✗ 创建仓库失败: $_" -ForegroundColor Red
        exit 1
    }
}

Write-Host "`n[3/5] 配置Git远程地址..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot"
try {
    & git remote remove origin 2>$null
    & git remote add origin "https://$Token@github.com/$username/$repoName.git"
    Write-Host "✓ 远程地址配置完成" -ForegroundColor Green
} catch {
    Write-Host "✗ Git配置失败: $_" -ForegroundColor Red
    exit 1
}

Write-Host "`n[4/5] 推送代码到GitHub..." -ForegroundColor Yellow
try {
    & git push -u origin master 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ 代码推送成功" -ForegroundColor Green
    } else {
        # 可能是main分支
        & git push -u origin main 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ 代码推送成功" -ForegroundColor Green
        } else {
            throw "推送失败"
        }
    }
} catch {
    Write-Host "✗ 推送失败: $_" -ForegroundColor Red
    Write-Host "尝试手动推送: git push -u origin master" -ForegroundColor Yellow
    exit 1
}

Write-Host "`n[5/5] 生成Vercel部署链接..." -ForegroundColor Yellow
$vercelDeployUrl = "https://vercel.com/new/clone?repository-url=https://github.com/$username/$repoName"

Write-Host "`n=====================================" -ForegroundColor Cyan
Write-Host "  🎉 部署准备完成！" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "`nGitHub仓库:" -ForegroundColor Yellow
Write-Host "https://github.com/$username/$repoName" -ForegroundColor Cyan
Write-Host "`n部署到Vercel（一键部署）:" -ForegroundColor Yellow
Write-Host "$vercelDeployUrl" -ForegroundColor Cyan
Write-Host "`n或者手动部署:" -ForegroundColor Gray
Write-Host "1. 打开 https://vercel.com/new" -ForegroundColor Gray
Write-Host "2. 选择 'Import Git Repository'" -ForegroundColor Gray
Write-Host "3. 选择 $repoName 仓库" -ForegroundColor Gray
Write-Host "4. 点击 Deploy" -ForegroundColor Gray
Write-Host "`n✓ 完成后你会获得一个免费域名（如 ai-insights-daily.vercel.app）" -ForegroundColor Green

# 自动打开浏览器
Write-Host "`n3秒后自动打开部署页面..." -ForegroundColor Yellow
Start-Sleep -Seconds 3
Start-Process $vercelDeployUrl

Write-Host "`n✓ 全部完成！" -ForegroundColor Green
