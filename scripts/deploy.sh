#!/bin/bash

# 自動部署腳本 | Auto Deployment Script
# 同時推送到 GitHub 和 Google Apps Script

echo "🚀 開始自動部署流程..."

# 檢查是否在正確目錄
if [ ! -f "CLAUDE.md" ]; then
    echo "❌ 錯誤：請在專案根目錄執行此腳本"
    exit 1
fi

# 1. Git 提交和推送
echo "📝 準備 Git 提交..."
git add -A

# 如果有變更才提交
if ! git diff --staged --quiet; then
    echo "✅ 發現變更，準備提交..."
    
    # 生成提交訊息
    COMMIT_MSG="update: Auto deployment $(date '+%Y-%m-%d %H:%M:%S')

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
    
    git commit -m "$COMMIT_MSG"
    echo "✅ Git 提交完成"
    
    git push origin main
    echo "✅ GitHub 推送完成"
else
    echo "ℹ️  沒有發現變更，跳過 Git 提交"
fi

# 2. Clasp 推送到 Google Apps Script
echo "📤 推送到 Google Apps Script..."
cd "google-apps-script"

# Check if configuration is properly loaded
echo "🔧 檢查配置檔案..."
if [ -f "config-loader.gs" ]; then
    echo "✅ 配置載入器已找到"
else
    echo "❌ 配置載入器遺失，請確認檔案結構"
    exit 1
fi

if [ -f ".clasp.json" ]; then
    clasp push
    echo "✅ Google Apps Script 推送完成"
    echo "📋 已推送檔案："
    echo "   - Code.gs (主要程式碼)"
    echo "   - CodeExtensions.gs (HT 擴展)"
    echo "   - config-loader.gs (配置載入器)"
    echo "   - dashboard.html (主控制台)"
    echo "   - dashboard_for_HT.html (HT 控制台)"
else
    echo "❌ 找不到 .clasp.json，請確認 clasp 設定"
    exit 1
fi

cd "../.."

echo "🎉 所有部署完成！"
echo "   ✅ GitHub: https://github.com/geonook/gradebook-system"
echo "   ✅ Google Apps Script: 已更新"