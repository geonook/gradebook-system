# Playwright MCP Server Setup for Gradebook System

## 🚀 Microsoft 官方 Playwright MCP Server 設置指南

### 📦 已安裝套件
- **@playwright/mcp** v0.0.29 (Microsoft 官方)
- **@playwright/test** v1.53.2 (基礎 Playwright)

### 🔧 設定檔案

#### 1. MCP 伺服器設定 (`mcp-config.json`)
包含成績簿系統專用的 MCP 伺服器設定：
- 基礎 URL: Google Apps Script 部署 URL
- 瀏覽器設定: Chromium, 非 headless 模式
- 測試資料: 測試教師、班級、學生資料
- 雙語支援: 英文和繁體中文

#### 2. Claude Desktop 設定 (`claude-mcp-config.json`)
Claude Desktop 的 MCP 伺服器整合設定：
- 伺服器名稱: `playwright-gradebook`
- 命令: `npx @playwright/mcp@latest`
- 環境變數: 成績簿系統相關設定

### 🎯 Claude Desktop 設定步驟

1. **找到 Claude Desktop 設定檔案**：
   ```bash
   # macOS 路徑
   ~/Library/Application Support/Claude/claude_desktop_config.json
   ```

2. **複製設定內容**：
   將 `claude-mcp-config.json` 的內容複製到 Claude Desktop 設定檔案中

3. **重啟 Claude Desktop**：
   完成設定後重新啟動 Claude Desktop

### 🧪 測試 MCP 伺服器

#### 基本測試
```bash
# 檢查版本
npx @playwright/mcp@latest --version

# 使用自訂設定啟動
npx @playwright/mcp@latest --config ./mcp-config.json --browser chromium
```

#### 進階測試
```bash
# 測試成績簿系統連線
npx @playwright/mcp@latest --config ./mcp-config.json --browser chromium --headless --output-dir test-results/mcp-output
```

### 🎪 MCP 伺服器功能

#### 支援的功能
- ✅ **頁面導航**: 自動導航到成績簿系統
- ✅ **元素互動**: 點擊按鈕、填寫表單
- ✅ **截圖**: 自動擷取測試截圖
- ✅ **PDF 生成**: 生成測試報告 PDF
- ✅ **無障礙樹**: 使用 Playwright 的無障礙樹
- ✅ **等待機制**: 智能等待頁面載入
- ✅ **檔案操作**: 上傳下載檔案

#### 成績簿系統專用功能
- 🏫 **儀表板測試**: 自動測試所有儀表板功能
- 👨‍🏫 **HT 系統**: 測試 HT 權限和評估管理
- 📊 **進度追蹤**: 自動化進度檢查
- 🌐 **雙語測試**: 中英文介面切換測試
- 📝 **評估管理**: 評估標題同步測試

### 🔍 使用範例

#### 在 Claude Desktop 中
```
請使用 Playwright MCP 測試成績簿系統的儀表板功能
```

#### 自動化測試腳本
```javascript
// AI 生成的測試將使用 MCP 伺服器
test('AI-generated gradebook dashboard test', async ({ page }) => {
  // MCP 伺服器將智能生成測試步驟
});
```

### 🐛 故障排除

#### 常見問題
1. **MCP 伺服器無法啟動**
   - 檢查 Node.js 版本 (需要 18+)
   - 確認 @playwright/mcp 已正確安裝

2. **Claude Desktop 無法連接**
   - 檢查設定檔案格式
   - 確認檔案路徑正確
   - 重啟 Claude Desktop

3. **瀏覽器啟動失敗**
   - 執行 `npx playwright install`
   - 檢查 macOS 安全性設定

### 📊 測試結果

測試結果將儲存在：
- **截圖**: `test-results/mcp-output/screenshots/`
- **Trace**: `test-results/mcp-output/traces/`
- **PDF**: `test-results/mcp-output/pdfs/`
- **日誌**: `test-results/mcp-output/logs/`

### 🎉 下一步

1. 在 Claude Desktop 中測試 MCP 連線
2. 開始使用 AI 生成測試案例
3. 建立成績簿系統的自動化測試套件
4. 整合 CI/CD 流程

---

**🤖 Powered by Microsoft Playwright MCP Server v0.0.29**