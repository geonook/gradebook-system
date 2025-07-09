#!/bin/bash
# Git + GitHub 版本控制工作流程腳本
# 基於 HC AI Template 的最佳實踐

echo "🚀 Git + GitHub 版本控制工作流程"
echo "=================================="

# 函數：檢查 git 狀態
check_git_status() {
    echo "📋 檢查 Git 狀態..."
    git status --short
    
    if [ -n "$(git status --porcelain)" ]; then
        echo "⚠️  發現未提交的變更"
        return 1
    else
        echo "✅ 工作目錄乾淨"
        return 0
    fi
}

# 函數：建立備份標籤
create_backup() {
    echo "🏷️  建立備份標籤..."
    timestamp=$(date +%Y%m%d_%H%M%S)
    tag_name="backup_$timestamp"
    
    git tag -a "$tag_name" -m "Backup before changes: $(date)"
    git push origin "$tag_name"
    
    echo "✅ 備份標籤建立: $tag_name"
}

# 函數：檢查 GitHub 連接
check_github_connection() {
    echo "🔗 檢查 GitHub 連接..."
    
    if command -v gh &> /dev/null; then
        echo "✅ GitHub CLI 已安裝"
        
        if gh auth status &> /dev/null; then
            echo "✅ GitHub 認證成功"
            repo_info=$(gh repo view --json name,owner)
            echo "📁 倉庫: $(echo $repo_info | jq -r '.owner.login')/$(echo $repo_info | jq -r '.name')"
        else
            echo "⚠️  GitHub 認證失敗，請執行: gh auth login"
        fi
    else
        echo "⚠️  GitHub CLI 未安裝，請執行: brew install gh"
    fi
    
    # 檢查 git remote
    remote_url=$(git remote get-url origin 2>/dev/null)
    if [ $? -eq 0 ]; then
        echo "✅ Git remote 已配置: $remote_url"
    else
        echo "⚠️  Git remote 未配置"
    fi
}

# 函數：完整提交流程
full_commit_workflow() {
    local commit_message="$1"
    
    if [ -z "$commit_message" ]; then
        echo "❌ 請提供提交訊息"
        echo "使用方法: $0 commit \"提交訊息\""
        return 1
    fi
    
    echo "🚀 開始完整提交流程..."
    
    # 1. 檢查狀態
    if ! check_git_status; then
        echo "📝 發現變更，準備提交..."
    else
        echo "ℹ️  無變更需要提交"
        return 0
    fi
    
    # 2. 建立備份標籤
    create_backup
    
    # 3. 暫存所有變更
    echo "📦 暫存變更..."
    git add -A
    
    # 4. 提交變更
    echo "💾 提交變更..."
    git commit -m "$commit_message

🤖 Generated with Claude Code
🎯 Template by Chang Ho Chien | HC AI 說人話channel"
    
    # 5. 推送到 GitHub (post-commit hook 會自動處理)
    echo "🔄 推送到 GitHub..."
    # post-commit hook 會自動執行推送
    
    echo "✅ 完整提交流程完成！"
}

# 函數：顯示最近的提交記錄
show_recent_commits() {
    echo "📝 最近的提交記錄："
    git log --oneline -10
}

# 函數：顯示所有標籤
show_tags() {
    echo "🏷️  所有標籤："
    git tag -l | sort -V
}

# 主程式邏輯
case "$1" in
    "status")
        check_git_status
        ;;
    "check")
        check_github_connection
        ;;
    "backup")
        create_backup
        ;;
    "commit")
        full_commit_workflow "$2"
        ;;
    "log")
        show_recent_commits
        ;;
    "tags")
        show_tags
        ;;
    "help"|"--help"|"-h")
        echo "使用方法:"
        echo "  $0 status     - 檢查 git 狀態"
        echo "  $0 check      - 檢查 GitHub 連接"
        echo "  $0 backup     - 建立備份標籤"
        echo "  $0 commit \"訊息\" - 完整提交流程"
        echo "  $0 log        - 顯示最近提交"
        echo "  $0 tags       - 顯示所有標籤"
        ;;
    *)
        echo "🔍 Git + GitHub 版本控制狀態檢查"
        echo "================================"
        check_git_status
        echo ""
        check_github_connection
        echo ""
        echo "💡 使用 '$0 help' 查看所有可用命令"
        ;;
esac