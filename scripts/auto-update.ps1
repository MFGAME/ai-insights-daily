# AI商业洞察日报 - 每日自动更新脚本
# 执行时间：每天凌晨2点

# 设置错误处理
$ErrorActionPreference = "Stop"

# 记录开始时间
$startTime = Get-Date
$logFile = "C:\Users\Administrator\.openclaw-autoclaw\agents\laicai\workspace\projects\ai-insights-daily\logs\auto-update.log"

# 创建日志目录
$logDir = Split-Path $logFile -Parent
if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir -Force | Out-Null
}

# 日志函数
function Write-Log {
    param($Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] $Message"
    Write-Host $logMessage
    Add-Content -Path $logFile -Value $logMessage
}

try {
    Write-Log "========================================="
    Write-Log "🚀 开始每日洞察自动更新..."
    Write-Log "========================================="

    # 切换到项目目录
    $projectPath = "C:\Users\Administrator\.openclaw-autoclaw\agents\laicai\workspace\projects\ai-insights-daily"
    Set-Location $projectPath
    Write-Log "📂 工作目录: $projectPath"

    # 拉取最新代码
    Write-Log "⬇️  拉取最新代码..."
    git pull origin master 2>&1 | ForEach-Object { Write-Log $_ }

    # 生成新洞察
    Write-Log "🤖 生成新洞察..."
    $nodeOutput = node scripts/generate-insights.js 2>&1
    Write-Log $nodeOutput

    # 检查是否有变更
    $hasChanges = git status --porcelain
    if ($hasChanges) {
        Write-Log "📝 检测到内容变更，准备提交..."

        # 添加变更
        git add lib/data.ts 2>&1 | ForEach-Object { Write-Log $_ }

        # 提交
        $commitMessage = "📚 自动更新每日洞察 - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
        git commit -m $commitMessage 2>&1 | ForEach-Object { Write-Log $_ }

        # 推送
        Write-Log "⬆️  推送到GitHub..."
        git push origin master 2>&1 | ForEach-Object { Write-Log $_ }

        Write-Log "✅ 推送成功！"
        Write-Log "🌐 Vercel将自动部署更新..."
    } else {
        Write-Log "ℹ️  没有新的变更需要提交"
    }

    # 记录执行时间
    $endTime = Get-Date
    $duration = ($endTime - $startTime).TotalSeconds
    Write-Log "========================================="
    Write-Log "✅ 自动更新完成！"
    Write-Log "⏱️  执行时间: $([math]::Round($duration, 2))秒"
    Write-Log "========================================="

    # 发送成功通知（可选）
    # 可以在这里添加邮件或消息通知

} catch {
    $errorMessage = $_.Exception.Message
    Write-Log "========================================="
    Write-Log "❌ 错误: $errorMessage"
    Write-Log "========================================="

    # 发送错误通知（可选）
    # 可以在这里添加错误通知

    exit 1
}
