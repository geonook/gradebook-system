# 📁 專案檔案導覽指南 | Project File Guide

## 🎯 **主要文件 | Main Documentation**

### 📋 **開發相關 | Development**
- **CLAUDE.md** - 🎯 **主要開發指導** - Claude Code 開發規則、工作流程、命令
- **README.md** - 📖 **專案概述** - 快速開始、架構說明、基本配置
- **README-MCP.md** - 🤖 **MCP 測試配置** - Playwright MCP 伺服器設置和使用

### 📊 **部署與分析 | Deployment & Analysis**
- **DEPLOYMENT-ANALYSIS.md** - 🚀 **部署分析** - Google Apps Script 部署設定指導
- **VERSION_LOG.md** - 📝 **版本記錄** - 代碼變更和備份記錄

## 🗂️ **資料夾結構 | Folder Structure**

### 📁 **docs/** - 詳細文件
- **HT_DEVELOPMENT_STATUS.md** - HT 系統開發狀態
- **TEST_DATA_SUMMARY.md** - 測試資料摘要
- **VERSION_LOG.md** - 詳細版本記錄
- **WEB_APP_DEPLOYMENT_GUIDE.md** - Web 應用程式部署指南

### 🔧 **google-apps-script/** - 核心代碼
- **Code.gs** - 主要系統邏輯
- **CodeExtensions.gs** - 擴展功能
- **dashboard.html** - 主控台界面
- **dashboard_for_HT.html** - HT 專用控台

### 🧪 **tests/** - 測試檔案
- **ai-generated/** - AI 生成的測試
- **dashboard.spec.js** - 控台測試

### 🚀 **scripts/** - 部署腳本
- **deploy.sh** - 主要部署腳本
- **deploy-production.sh** - 生產環境部署
- **deploy-test.sh** - 測試環境部署

### 💾 **backups/** - 代碼備份
- 包含時間戳記的備份檔案

## 🎯 **如何使用這些檔案 | How to Use These Files**

### 🚀 **開始開發時**
1. **先讀** `CLAUDE.md` - 了解開發規則和工作流程
2. **參考** `README.md` - 了解專案架構和配置

### 🧪 **進行測試時**
1. **參考** `README-MCP.md` - 設置 MCP 測試環境
2. **使用** `tests/` 資料夾中的測試檔案

### 🚀 **部署時**
1. **運行** `scripts/deploy.sh` - 自動部署到 Google Apps Script
2. **參考** `DEPLOYMENT-ANALYSIS.md` - 如遇部署問題

### 📚 **需要詳細資訊時**
1. **查看** `docs/` 資料夾中的專門文件
2. **檢查** `VERSION_LOG.md` - 了解最新變更

## 🎯 **最重要的檔案 | Most Important Files**

### 🔥 **必讀 | Must Read**
1. **CLAUDE.md** - 開發規則和命令 (最重要!)
2. **README.md** - 專案基本資訊
3. **google-apps-script/Code.gs** - 核心程式碼

### ⚡ **常用 | Frequently Used**
1. **scripts/deploy.sh** - 部署腳本
2. **README-MCP.md** - 測試設置
3. **google-apps-script/dashboard.html** - 主控台

## 📋 **檔案優先級 | File Priority**

### 🔴 **高優先級 (經常使用)**
- CLAUDE.md
- README.md
- google-apps-script/Code.gs
- scripts/deploy.sh

### 🟡 **中優先級 (偶爾參考)**
- README-MCP.md
- DEPLOYMENT-ANALYSIS.md
- docs/ 資料夾中的檔案

### 🟢 **低優先級 (備份/記錄)**
- VERSION_LOG.md
- backups/ 資料夾
- test-results/ 資料夾

---

## 💡 **建議 | Recommendations**

1. **bookmark** 📌 CLAUDE.md - 作為主要開發參考
2. **定期查看** VERSION_LOG.md - 了解專案變更
3. **開發前先讀** CLAUDE.md 中的規則檢查清單
4. **有問題時參考** docs/ 資料夾中的專門文件

---

*這個指南幫助您快速找到需要的檔案，避免在眾多檔案中迷失方向！*