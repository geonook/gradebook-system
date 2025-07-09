# 🔧 Configuration Management | 配置管理

## 📋 Overview | 概述

This directory contains centralized configuration management for the Gradebook System.  
此目錄包含成績簿系統的集中化配置管理。

## 📁 Files | 檔案

### `environment.js`
Central configuration file containing all system settings.  
包含所有系統設定的中央配置檔案。

- **System Settings** | 系統設定
- **Google Drive Configuration** | Google Drive 配置
- **Assessment Configuration** | 評量配置
- **Progress Tracking** | 進度追蹤
- **Web App Configuration** | 網頁應用配置
- **Testing Configuration** | 測試配置
- **HT System Configuration** | HT 系統配置

## 🎯 Key Configuration Items | 關鍵配置項目

### 🔑 Required Settings | 必要設定

```javascript
// Must be configured before deployment | 部署前必須配置
CONFIG.GOOGLE_DRIVE.MAIN_FOLDER_ID = 'YOUR_FOLDER_ID';
CONFIG.WEB_APP.BASE_URL = 'YOUR_WEBAPP_URL';
```

### 🎚️ Adjustable Settings | 可調整設定

```javascript
// Assessment counts | 評量數量
CONFIG.ASSESSMENT.FORMATIVE_COUNT = 8;
CONFIG.ASSESSMENT.SUMMATIVE_COUNT = 4;

// Grade weights | 成績權重
CONFIG.ASSESSMENT.WEIGHTS.FORMATIVE = 0.15;
CONFIG.ASSESSMENT.WEIGHTS.SUMMATIVE = 0.20;
CONFIG.ASSESSMENT.WEIGHTS.FINAL = 0.10;

// Progress thresholds | 進度閾值
CONFIG.PROGRESS.EXCELLENT = 0.90; // 90%+
CONFIG.PROGRESS.GOOD = 0.80;      // 80-89%
CONFIG.PROGRESS.NORMAL = 0.60;    // 60-79%
CONFIG.PROGRESS.BEHIND = 0.59;    // <60%
```

## 🔄 Usage | 使用方式

### In Google Apps Script | 在 Google Apps Script 中

```javascript
// Load configuration | 載入配置
// The configuration will be automatically loaded when the script runs
// 配置將在腳本運行時自動載入

// Access configuration | 存取配置
const mainFolderId = CONFIG.GOOGLE_DRIVE.MAIN_FOLDER_ID;
const systemName = CONFIG.SYSTEM.NAME;
const assessmentCount = CONFIG.ASSESSMENT.FORMATIVE_COUNT;

// Use helper functions | 使用輔助函數
const timeout = getConfig('WEB_APP.TIMEOUT');
setConfig('SYSTEM.SEMESTER', '2425S2');
```

### Environment-specific Settings | 環境特定設定

```javascript
// Development environment | 開發環境
if (CONFIG.ENVIRONMENT === ENVIRONMENT.DEVELOPMENT) {
  // Development specific settings | 開發環境特定設定
}

// Testing environment | 測試環境
if (CONFIG.ENVIRONMENT === ENVIRONMENT.TESTING) {
  // Testing specific settings | 測試環境特定設定
}

// Production environment | 生產環境
if (CONFIG.ENVIRONMENT === ENVIRONMENT.PRODUCTION) {
  // Production specific settings | 生產環境特定設定
}
```

## ⚙️ Validation | 驗證

The configuration includes automatic validation:  
配置包含自動驗證：

```javascript
// Validate configuration | 驗證配置
try {
  validateConfig();
  console.log('✅ Configuration valid | 配置有效');
} catch (error) {
  console.error('❌ Configuration error | 配置錯誤:', error.message);
}
```

## 🚀 Deployment | 部署

### Before Deployment | 部署前

1. **Set MAIN_FOLDER_ID** | 設定主要資料夾 ID
2. **Set WEB_APP.BASE_URL** | 設定網頁應用 URL
3. **Validate configuration** | 驗證配置
4. **Test in development** | 在開發環境測試

### After Deployment | 部署後

1. **Verify settings** | 驗證設定
2. **Test all functions** | 測試所有功能
3. **Monitor performance** | 監控效能
4. **Update documentation** | 更新文檔

## 🛠️ Customization | 自定義

### Adding New Configuration | 新增配置

```javascript
// Add new configuration section | 新增配置區段
CONFIG.NEW_FEATURE = {
  ENABLED: true,
  SETTINGS: {
    OPTION1: 'value1',
    OPTION2: 'value2'
  }
};
```

### Modifying Existing Configuration | 修改現有配置

```javascript
// Modify existing settings | 修改現有設定
setConfig('ASSESSMENT.FORMATIVE_COUNT', 10);
setConfig('PROGRESS.EXCELLENT', 0.95);
```

## 📝 Notes | 注意事項

1. **Always validate** after changes | 變更後總是驗證
2. **Test thoroughly** before deployment | 部署前徹底測試
3. **Document changes** in version control | 在版本控制中記錄變更
4. **Keep backups** of working configurations | 保留工作配置的備份

## 🔗 Related Files | 相關檔案

- `../google-apps-script/Code.gs` - Uses these configurations | 使用這些配置
- `../google-apps-script/CodeExtensions.gs` - HT system configurations | HT 系統配置
- `../scripts/deploy.sh` - Deployment script | 部署腳本
- `../CLAUDE.md` - Development guidelines | 開發指南