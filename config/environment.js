/**
 * Environment Configuration | 環境配置
 * Centralized configuration management for the Gradebook System
 * 成績簿系統的集中化配置管理
 */

// ===== ENVIRONMENT DETECTION | 環境檢測 =====
const ENVIRONMENT = {
  DEVELOPMENT: 'development',
  TESTING: 'testing',
  PRODUCTION: 'production'
};

// Detect current environment | 檢測當前環境
const getCurrentEnvironment = () => {
  // You can modify this logic based on your deployment needs
  // 您可以根據部署需求修改此邏輯
  return ENVIRONMENT.PRODUCTION; // Default to production | 預設為生產環境
};

// ===== MAIN CONFIGURATION | 主要配置 =====
const CONFIG = {
  // Environment | 環境
  ENVIRONMENT: getCurrentEnvironment(),
  
  // System Information | 系統資訊
  SYSTEM: {
    NAME: 'Gradebook Management System | 成績簿管理系統',
    VERSION: '2.0.0',
    SEMESTER: '2425S2',
    LAST_UPDATED: '2025-07-09'
  },
  
  // Google Drive Configuration | Google Drive 配置
  GOOGLE_DRIVE: {
    // Main folder ID - MUST be configured | 主要資料夾 ID - 必須配置
    MAIN_FOLDER_ID: '1w_UJnNthBkcP8wgyrF3rz2St0jZTPZzB',
    
    // Folder structure | 資料夾結構
    FOLDERS: {
      MAIN: 'Gradebook System | 成績簿系統',
      TEACHER_SHEETS: 'Teacher Gradebooks | 老師成績簿',
      TEMPLATES: 'Templates | 範本檔案',
      REPORTS: 'Progress Reports | 進度報告',
      BACKUP: 'System Backup | 系統備份',
      MASTER_DATA: 'Master Data | 主控資料'
    }
  },
  
  // Assessment Configuration | 評量配置
  ASSESSMENT: {
    // Count settings | 數量設定
    FORMATIVE_COUNT: 8,      // F.A.1 to F.A.8 | 平時評量 1-8
    SUMMATIVE_COUNT: 4,      // S.A.1 to S.A.4 | 總結評量 1-4
    INCLUDE_FINAL: true,     // Include final exam | 包含期末考
    
    // Default titles | 預設標題
    TITLES: {
      FORMATIVE: ['F.A.1', 'F.A.2', 'F.A.3', 'F.A.4', 'F.A.5', 'F.A.6', 'F.A.7', 'F.A.8'],
      SUMMATIVE: ['S.A.1', 'S.A.2', 'S.A.3', 'S.A.4']
    },
    
    // Grade weights | 成績權重
    WEIGHTS: {
      FORMATIVE: 0.15,    // 15% for formative assessments | 平時評量佔 15%
      SUMMATIVE: 0.20,    // 20% for summative assessments | 總結評量佔 20%
      FINAL: 0.10         // 10% for final exam | 期末考佔 10%
    }
  },
  
  // Progress tracking thresholds | 進度追蹤閾值
  PROGRESS: {
    EXCELLENT: 0.90,    // 90% and above | 90% 及以上
    GOOD: 0.80,         // 80-89% | 80-89%
    NORMAL: 0.60,       // 60-79% | 60-79%
    BEHIND: 0.59        // Below 60% | 60% 以下
  },
  
  // Web App Configuration | 網頁應用配置
  WEB_APP: {
    BASE_URL: 'https://script.google.com/macros/s/AKfycbwQD6FGVvt3R4_L5RGS8BB7yapJlE8S9gd4E8HyJRI/exec',
    TIMEOUT: 30000,     // 30 seconds | 30 秒
    MAX_RETRIES: 3      // Maximum retry attempts | 最大重試次數
  },
  
  // Testing Configuration | 測試配置
  TESTING: {
    MCP_CONFIG: {
      BASE_URL: 'https://script.google.com/macros/s/AKfycbwQD6FGVvt3R4_L5RGS8BB7yapJlE8S9gd4E8HyJRI/exec',
      BROWSER: 'chromium',
      HEADLESS: false,
      TIMEOUT: 30000,
      VIEWPORT: {
        WIDTH: 1280,
        HEIGHT: 720
      }
    }
  },
  
  // HT System Configuration | HT 系統配置
  HT_SYSTEM: {
    ENABLED: true,
    GRADE_GROUPS: {
      'G1-G2': ['G1', 'G2'],
      'G3-G4': ['G3', 'G4'],
      'G5-G6': ['G5', 'G6']
    },
    ASSESSMENT_MANAGEMENT: true,
    SYNC_ENABLED: true
  },
  
  // Localization | 在地化
  LOCALIZATION: {
    DEFAULT_LANGUAGE: 'en',
    SUPPORTED_LANGUAGES: ['en', 'zh-TW'],
    BILINGUAL_MODE: true
  },
  
  // File naming conventions | 檔案命名規則
  FILE_NAMING: {
    TEACHER_GRADEBOOK: '{teacherName} - {subject} - Gradebook',
    HT_GRADEBOOK: '{teacherName} - HT {gradeGroup} {type} - Gradebook',
    PROGRESS_REPORT: 'Progress Report - {date}',
    BACKUP_FILE: 'Backup - {timestamp}'
  }
};

// ===== ENVIRONMENT SPECIFIC OVERRIDES | 環境特定覆蓋 =====
if (CONFIG.ENVIRONMENT === ENVIRONMENT.DEVELOPMENT) {
  // Development overrides | 開發環境覆蓋
  CONFIG.TESTING.MCP_CONFIG.HEADLESS = false;
  CONFIG.WEB_APP.TIMEOUT = 60000; // Longer timeout for development | 開發環境更長的超時時間
}

if (CONFIG.ENVIRONMENT === ENVIRONMENT.TESTING) {
  // Testing overrides | 測試環境覆蓋
  CONFIG.TESTING.MCP_CONFIG.HEADLESS = true;
  CONFIG.WEB_APP.MAX_RETRIES = 5;
}

// ===== VALIDATION FUNCTIONS | 驗證函數 =====
const validateConfig = () => {
  const errors = [];
  
  // Validate required fields | 驗證必要欄位
  if (!CONFIG.GOOGLE_DRIVE.MAIN_FOLDER_ID) {
    errors.push('MAIN_FOLDER_ID is required | MAIN_FOLDER_ID 為必填');
  }
  
  if (!CONFIG.WEB_APP.BASE_URL) {
    errors.push('WEB_APP.BASE_URL is required | WEB_APP.BASE_URL 為必填');
  }
  
  // Validate weight totals | 驗證權重總和
  const totalWeight = CONFIG.ASSESSMENT.WEIGHTS.FORMATIVE + 
                     CONFIG.ASSESSMENT.WEIGHTS.SUMMATIVE + 
                     CONFIG.ASSESSMENT.WEIGHTS.FINAL;
  
  if (totalWeight > 1.0) {
    errors.push(`Assessment weights exceed 100% (${totalWeight * 100}%) | 評量權重超過 100% (${totalWeight * 100}%)`);
  }
  
  if (errors.length > 0) {
    throw new Error('Configuration validation failed | 配置驗證失敗:\n' + errors.join('\n'));
  }
  
  return true;
};

// ===== HELPER FUNCTIONS | 輔助函數 =====
const getConfig = (path) => {
  const keys = path.split('.');
  let result = CONFIG;
  
  for (const key of keys) {
    result = result[key];
    if (result === undefined) {
      return null;
    }
  }
  
  return result;
};

const setConfig = (path, value) => {
  const keys = path.split('.');
  let current = CONFIG;
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (current[keys[i]] === undefined) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  
  current[keys[keys.length - 1]] = value;
};

// ===== EXPORTS | 導出 =====
// For Google Apps Script usage | 給 Google Apps Script 使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CONFIG,
    ENVIRONMENT,
    validateConfig,
    getConfig,
    setConfig,
    getCurrentEnvironment
  };
}

// For direct usage in Google Apps Script | 直接在 Google Apps Script 中使用
if (typeof global !== 'undefined') {
  global.CONFIG = CONFIG;
  global.ENVIRONMENT = ENVIRONMENT;
  global.validateConfig = validateConfig;
  global.getConfig = getConfig;
  global.setConfig = setConfig;
  global.getCurrentEnvironment = getCurrentEnvironment;
}

// Validate configuration on load | 載入時驗證配置
try {
  validateConfig();
  console.log('✅ Configuration validation passed | 配置驗證通過');
} catch (error) {
  console.error('❌ Configuration validation failed | 配置驗證失敗:', error.message);
}