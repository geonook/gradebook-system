#!/bin/bash

# 🧪 測試部署腳本 | Test Deployment Script
# 這個腳本只用於開發和測試，不會影響生產環境

echo "🧪 開始測試部署流程 | Starting test deployment..."

# 進入 Google Apps Script 目錄
cd "$(dirname "$0")/gradebook-system/google-apps-script"

# 檢查是否有變更
echo "📝 檢查變更 | Checking for changes..."

# 推送到 Google Apps Script (測試環境)
echo "📤 推送到測試環境 | Pushing to test environment..."
clasp push --force

# 部署到測試版本
echo "🚀 部署測試版本 | Deploying test version..."
TEST_DEPLOYMENT=$(clasp deploy --description "🧪 TEST - $(date '+%Y-%m-%d %H:%M:%S')")

if [ $? -eq 0 ]; then
    echo "✅ 測試部署完成 | Test deployment completed"
    echo ""
    echo "🔗 測試環境 URL | Test Environment URLs:"
    echo "   主控制台 | Main Dashboard:"
    echo "   https://script.google.com/macros/s/AKfycbz9WjeWpg_J5ZmDKj37VHRetJAjtWL4IJCwXVpqq7z45a2uwFAdzTV1_O4U-2IjpEgW/exec"
    echo ""
    echo "   HT Dashboard:"
    echo "   https://script.google.com/macros/s/AKfycbz9WjeWpg_J5ZmDKj37VHRetJAjtWL4IJCwXVpqq7z45a2uwFAdzTV1_O4U-2IjpEgW/exec?page=ht"
    echo ""
    echo "📋 部署資訊 | Deployment Info:"
    echo "$TEST_DEPLOYMENT"
else
    echo "❌ 測試部署失敗 | Test deployment failed"
    exit 1
fi

echo ""
echo "🎯 使用說明 | Usage Instructions:"
echo "   • 使用上面的測試 URL 進行功能測試"
echo "   • 測試完成後，運行 ./deploy-production.sh 部署到生產環境"
echo "   • 不要將測試 URL 分享給最終使用者"