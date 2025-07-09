#!/bin/bash

# 🚀 生產部署腳本 | Production Deployment Script
# ⚠️  請只在測試完成後使用此腳本

echo "🚀 開始生產部署流程 | Starting production deployment..."
echo "⚠️  警告：這將更新生產環境！| Warning: This will update production environment!"

# 確認部署
read -p "確定要部署到生產環境嗎？(y/N) | Are you sure you want to deploy to production? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 取消部署 | Deployment cancelled"
    exit 0
fi

# 進入 Google Apps Script 目錄
cd "$(dirname "$0")/gradebook-system/google-apps-script"

# Git 提交（如果有變更）
echo "📝 準備 Git 提交 | Preparing Git commit..."
if git diff --quiet && git diff --staged --quiet; then
    echo "ℹ️  沒有發現變更，跳過 Git 提交 | No changes found, skipping Git commit"
else
    git add -A
    read -p "請輸入提交訊息 | Enter commit message: " commit_message
    if [ -z "$commit_message" ]; then
        commit_message="Production deployment - $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    git commit -m "$commit_message"
    git push origin main
    echo "✅ Git 推送完成 | Git push completed"
fi

# 推送到 Google Apps Script
echo "📤 推送到 Google Apps Script | Pushing to Google Apps Script..."
clasp push --force

# 部署到生產環境 (@HEAD)
echo "🚀 部署到生產環境 | Deploying to production..."
PROD_DEPLOYMENT=$(clasp deploy --deploymentId AKfycbwQD6FGVvt3R4_L5RGS8BB7yapJlE8S9gd4E8HyJRI --description "🚀 PRODUCTION - $(date '+%Y-%m-%d %H:%M:%S')")

if [ $? -eq 0 ]; then
    echo "✅ 生產部署完成 | Production deployment completed"
    echo ""
    echo "🔗 生產環境 URL | Production Environment URLs:"
    echo "   主控制台 | Main Dashboard:"
    echo "   https://script.google.com/macros/s/AKfycbwQD6FGVvt3R4_L5RGS8BB7yapJlE8S9gd4E8HyJRI/exec"
    echo ""
    echo "   HT Dashboard:"
    echo "   https://script.google.com/macros/s/AKfycbwQD6FGVvt3R4_L5RGS8BB7yapJlE8S9gd4E8HyJRI/exec?page=ht"
    echo ""
    echo "📋 部署資訊 | Deployment Info:"
    echo "$PROD_DEPLOYMENT"
else
    echo "❌ 生產部署失敗 | Production deployment failed"
    exit 1
fi

echo ""
echo "🎉 部署完成！| Deployment completed!"
echo "   • 生產環境已更新 | Production environment updated"
echo "   • 使用者可以使用新功能 | Users can access new features"