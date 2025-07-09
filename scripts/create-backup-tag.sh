#!/bin/bash
# 建立備份標籤腳本
# 使用方法: ./scripts/create-backup-tag.sh [描述]

# 產生時間戳記標籤
timestamp=$(date +%Y%m%d_%H%M%S)
tag_name="backup_$timestamp"

# 取得描述 (如果有提供)
description="${1:-"Backup before changes"}"
full_description="$description: $(date)"

# 建立標籤
echo "🏷️  建立備份標籤: $tag_name"
git tag -a "$tag_name" -m "$full_description"

# 推送標籤到 GitHub
echo "🔄 推送標籤到 GitHub..."
git push origin "$tag_name"

if [ $? -eq 0 ]; then
    echo "✅ 備份標籤建立成功: $tag_name"
    echo "📋 描述: $full_description"
else
    echo "⚠️  標籤推送失敗"
fi