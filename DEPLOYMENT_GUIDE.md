# 🚀 HTML Dashboard 部署指南 | Deployment Guide

## 📋 部署步驟 | Deployment Steps

### 步驟 1：設定 Google Apps Script 專案 | Step 1: Setup Google Apps Script Project

1. **建立新專案 | Create New Project**
   - 前往 https://script.google.com/
   - 點擊「新增專案」| Click "New Project"
   - 重新命名為：`Gradebook System Dashboard` | Rename to: `Gradebook System Dashboard`

2. **新增檔案 | Add Files**
   - **Code.gs**: 複製 `google-apps-script/Code.gs` 的所有內容
   - **dashboard.html**: 點擊「+」→「HTML」→ 命名為 `dashboard` → 複製 `google-apps-script/dashboard.html` 的所有內容

3. **設定資料夾 ID | Configure Folder ID**
   ```javascript
   // 在 Code.gs 第 21 行修改 | Modify line 21 in Code.gs
   MAIN_FOLDER_ID: 'YOUR_GOOGLE_DRIVE_FOLDER_ID'
   ```

### 步驟 2：部署為網頁應用程式 | Step 2: Deploy as Web App

1. **開始部署 | Start Deployment**
   - 點擊右上角「部署」按鈕 | Click "Deploy" button (top right)
   - 選擇「新增部署」| Select "New deployment"

2. **設定部署類型 | Configure Deployment Type**
   - 點擊「選擇類型」齒輪圖示 | Click the gear icon "Select type"
   - 選擇「網頁應用程式」| Select "Web app"

3. **設定部署參數 | Configure Deployment Settings**
   ```
   描述 | Description: Gradebook System Dashboard v1.0
   執行身分 | Execute as: 我 (您的電子郵件) | Me (your email)
   存取權限 | Who has access: 任何人 | Anyone
   ```

4. **完成部署 | Complete Deployment**
   - 點擊「部署」| Click "Deploy"
   - **複製網頁應用程式 URL** | **Copy the Web app URL**
   - 這就是您的 Dashboard 網址！| This is your Dashboard URL!

### 步驟 3：授權權限 | Step 3: Authorize Permissions

1. **首次存取 | First Access**
   - 開啟您的 Dashboard URL
   - 點擊「檢閱權限」| Click "Review permissions"
   - 選擇您的 Google 帳號 | Select your Google account
   - 點擊「進階」→「前往 Gradebook System Dashboard（不安全）」
   - 點擊「允許」| Click "Allow"

2. **確認部署成功 | Confirm Successful Deployment**
   - 您應該看到美觀的 HTML Dashboard！
   - 嘗試點擊「🚀 Initialize」按鈕測試功能

## 🔗 獲得的成果 | What You Get

### ✅ 獨立網頁應用程式 | Standalone Web Application
- **專用網址** | **Dedicated URL**: `https://script.google.com/macros/s/YOUR_ID/exec`
- **無需登入 Google Sheets** | **No need to open Google Sheets**
- **書籤友善** | **Bookmark-friendly**
- **分享容易** | **Easy to share**

### ✅ 完整功能 | Full Functionality
- 🚀 **一鍵系統初始化** | **One-click system initialization**
- 📊 **即時統計資料** | **Real-time statistics**
- 🔄 **控制台重新整理** | **Dashboard refresh**
- 📁 **快速連結** | **Quick links**
- 📱 **行動裝置支援** | **Mobile device support**

## 🔄 更新部署 | Update Deployment

當您修改代碼時 | When you modify the code:

1. **編輯檔案** | **Edit Files**
   - 在 Apps Script 中修改 `Code.gs` 或 `dashboard.html`
   - 儲存變更 | Save changes

2. **重新部署** | **Redeploy**
   - 點擊「部署」→「管理部署」| Click "Deploy" → "Manage deployments"
   - 點擊版本旁的編輯圖示 | Click edit icon next to version
   - 選擇「新版本」| Select "New version"
   - 點擊「部署」| Click "Deploy"

## 🔐 權限管理 | Permission Management

### 公開存取 | Public Access
```
存取權限：任何人
適用：學校內部使用，老師無需登入
```

### 限制存取 | Restricted Access
```
存取權限：任何擁有連結的使用者
適用：需要一定程度的安全性
```

### 私人存取 | Private Access
```
存取權限：只有我
適用：管理員專用
```

## 🎯 使用建議 | Usage Recommendations

### 管理員 | For Administrators
1. **書籤 Dashboard URL** | **Bookmark the Dashboard URL**
2. **分享給老師** | **Share with teachers**
3. **定期檢查系統狀態** | **Regular system status checks**

### 老師 | For Teachers
1. **將 URL 加入書籤** | **Bookmark the URL**
2. **手機也可以使用** | **Can use on mobile devices**
3. **無需技術知識** | **No technical knowledge required**

## 🛠️ 疑難排解 | Troubleshooting

### Q: Dashboard 載入失敗？| Dashboard fails to load?
A: 
1. 檢查部署設定中的「執行身分」是否為「我」
2. 確認權限已正確授權
3. 嘗試重新部署

### Q: 按鈕功能無效？| Button functions not working?
A:
1. 檢查 `MAIN_FOLDER_ID` 是否正確設定
2. 確認 Google Drive 資料夾存取權限
3. 檢查瀏覽器控制台錯誤訊息

### Q: 如何更新 Dashboard？| How to update Dashboard?
A:
1. 修改 Apps Script 中的檔案
2. 儲存變更
3. 重新部署（選擇新版本）

## 🎉 完成！| Complete!

現在您擁有一個完全獨立的 HTML Dashboard：
- ✅ 專業外觀
- ✅ 完整功能
- ✅ 易於存取
- ✅ 行動裝置友善

**🌟 享受您的現代化成績簿管理系統！| Enjoy your modern gradebook management system!**