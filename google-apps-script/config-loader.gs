/**
 * Configuration Loader for Google Apps Script | Google Apps Script 配置載入器
 * This file loads the centralized configuration from config/environment.js
 * 此檔案從 config/environment.js 載入集中化配置
 */

// ===== LOAD EXTERNAL CONFIGURATION | 載入外部配置 =====
function loadExternalConfig() {
  try {
    // In a real deployment, you would load this from a file or external source
    // For now, we'll inline the configuration here
    // 在實際部署中，您會從檔案或外部來源載入
    // 目前我們將配置內嵌在這裡
    
    return {
      // Environment | 環境
      ENVIRONMENT: 'production',
      
      // System Information | 系統資訊
      SYSTEM: {
        NAME: 'Gradebook Management System | 成績簿管理系統',
        VERSION: '2.0.0',
        SEMESTER: '2425S2',
        LAST_UPDATED: '2025-07-09'
      },
      
      // Google Drive Configuration | Google Drive 配置
      GOOGLE_DRIVE: {
        MAIN_FOLDER_ID: '1w_UJnNthBkcP8wgyrF3rz2St0jZTPZzB',
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
        FORMATIVE_COUNT: 8,
        SUMMATIVE_COUNT: 4,
        INCLUDE_FINAL: true,
        TITLES: {
          FORMATIVE: ['F.A.1', 'F.A.2', 'F.A.3', 'F.A.4', 'F.A.5', 'F.A.6', 'F.A.7', 'F.A.8'],
          SUMMATIVE: ['S.A.1', 'S.A.2', 'S.A.3', 'S.A.4']
        },
        WEIGHTS: {
          FORMATIVE: 0.15,
          SUMMATIVE: 0.20,
          FINAL: 0.10
        }
      },
      
      // Progress tracking thresholds | 進度追蹤閾值
      PROGRESS: {
        EXCELLENT: 90,
        GOOD: 80,
        NORMAL: 60,
        BEHIND: 59
      },
      
      // Web App Configuration | 網頁應用配置
      WEB_APP: {
        BASE_URL: 'https://script.google.com/macros/s/AKfycbwQD6FGVvt3R4_L5RGS8BB7yapJlE8S9gd4E8HyJRI/exec',
        TIMEOUT: 30000,
        MAX_RETRIES: 3
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
      
      // Admin Configuration | 管理員配置
      ADMIN: {
        ACCOUNTS: [
          'tsehungchen@kcislk.ntpc.edu.tw'
        ],
        ENABLED: true
      },
      
      // Localization | 在地化
      LOCALIZATION: {
        DEFAULT_LANGUAGE: 'en',
        SUPPORTED_LANGUAGES: ['en', 'zh-TW'],
        BILINGUAL_MODE: true
      }
    };
  } catch (error) {
    console.error('Failed to load external configuration:', error);
    // Return a minimal fallback configuration
    return {
      SYSTEM: {
        NAME: 'Gradebook Management System | 成績簿管理系統',
        VERSION: '2.0.0',
        SEMESTER: '2425S2'
      },
      GOOGLE_DRIVE: {
        MAIN_FOLDER_ID: '1w_UJnNthBkcP8wgyrF3rz2St0jZTPZzB'
      }
    };
  }
}

// ===== CONFIGURATION MAPPING | 配置映射 =====
function createLegacyConfig() {
  const config = loadExternalConfig();
  
  // Map new configuration structure to legacy SYSTEM_CONFIG format
  // 將新配置結構映射到舊版 SYSTEM_CONFIG 格式
  return {
    // Basic Settings | 基本設定
    SEMESTER: config.SYSTEM.SEMESTER,
    SYSTEM_NAME: config.SYSTEM.NAME,
    
    // Main Folder ID | 主要資料夾 ID
    MAIN_FOLDER_ID: config.GOOGLE_DRIVE.MAIN_FOLDER_ID,
    
    // Folder Structure | 資料夾結構
    FOLDERS: config.GOOGLE_DRIVE.FOLDERS,
    
    // Assessment Settings | 評量設定
    ASSESSMENTS: {
      FORMATIVE_COUNT: config.ASSESSMENT.FORMATIVE_COUNT,
      SUMMATIVE_COUNT: config.ASSESSMENT.SUMMATIVE_COUNT,
      INCLUDE_FINAL: config.ASSESSMENT.INCLUDE_FINAL
    },
    
    // Assessment Title Configuration | 評量標題配置
    ASSESSMENT_TITLES: {
      DEFAULT: {
        FORMATIVE: config.ASSESSMENT.TITLES.FORMATIVE,
        SUMMATIVE: config.ASSESSMENT.TITLES.SUMMATIVE
      }
    },
    
    // Grade Weights | 成績權重
    WEIGHTS: config.ASSESSMENT.WEIGHTS,
    
    // Progress Thresholds | 進度閾值
    PROGRESS: config.PROGRESS,
    
    // Admin Configuration | 管理員配置
    ADMIN: config.ADMIN,
    
    // Additional new configurations | 額外的新配置
    _FULL_CONFIG: config  // Store full configuration for new features
  };
}

// ===== CONFIGURATION HELPERS | 配置輔助函數 =====
function getConfigValue(path, defaultValue = null) {
  const config = loadExternalConfig();
  const keys = path.split('.');
  let result = config;
  
  for (const key of keys) {
    result = result[key];
    if (result === undefined) {
      return defaultValue;
    }
  }
  
  return result;
}

function validateConfiguration() {
  const config = loadExternalConfig();
  const errors = [];
  
  // Validate required fields | 驗證必要欄位
  if (!config.GOOGLE_DRIVE.MAIN_FOLDER_ID) {
    errors.push('MAIN_FOLDER_ID is required | MAIN_FOLDER_ID 為必填');
  }
  
  if (!config.WEB_APP.BASE_URL) {
    errors.push('WEB_APP.BASE_URL is required | WEB_APP.BASE_URL 為必填');
  }
  
  // Validate weight totals | 驗證權重總和
  const totalWeight = config.ASSESSMENT.WEIGHTS.FORMATIVE + 
                     config.ASSESSMENT.WEIGHTS.SUMMATIVE + 
                     config.ASSESSMENT.WEIGHTS.FINAL;
  
  if (totalWeight > 1.0) {
    errors.push(`Assessment weights exceed 100% (${totalWeight * 100}%) | 評量權重超過 100% (${totalWeight * 100}%)`);
  }
  
  if (errors.length > 0) {
    throw new Error('Configuration validation failed | 配置驗證失敗:\n' + errors.join('\n'));
  }
  
  return true;
}

// ===== INITIALIZE CONFIGURATION | 初始化配置 =====
function initializeConfiguration() {
  try {
    // Validate configuration | 驗證配置
    validateConfiguration();
    
    // Create legacy configuration | 建立舊版配置
    const legacyConfig = createLegacyConfig();
    
    console.log('✅ Configuration loaded and validated successfully | 配置載入和驗證成功');
    console.log('📋 System:', legacyConfig.SYSTEM_NAME);
    console.log('📅 Semester:', legacyConfig.SEMESTER);
    console.log('🗂️  Main Folder ID:', legacyConfig.MAIN_FOLDER_ID);
    
    return legacyConfig;
  } catch (error) {
    console.error('❌ Configuration initialization failed | 配置初始化失敗:', error);
    throw error;
  }
}

// ===== GLOBAL CONFIGURATION | 全局配置 =====
// Initialize and expose the configuration globally | 初始化並全局暴露配置
const SYSTEM_CONFIG = initializeConfiguration();