# Core Files Documentation | 核心文件說明

## Project Structure | 專案結構

```
gradebook check/
├── CLAUDE.md                    # Project instructions for Claude Code | Claude Code 專案說明
├── todo.md                      # Project todo list | 專案待辦清單
├── Core_files.md               # This file - core files documentation | 本文件 - 核心文件說明
├── package.json                # Node.js dependencies | Node.js 依賴配置
├── package-lock.json           # Dependency lock file | 依賴鎖定檔案
└── gradebook-system/           # Main gradebook system | 主要成績簿系統
    ├── README.md               # System documentation | 系統說明文件
    └── google-apps-script/     # Google Apps Script files | Google Apps Script 檔案
        ├── Code.gs             # Main system logic | 主要系統邏輯
        └── dashboard.html      # Web dashboard interface | 網頁控制台介面
```

## Core Files | 核心檔案

### 1. Code.gs | 主要程式碼
**Location**: `/gradebook-system/google-apps-script/Code.gs`
- **Purpose**: Complete Google Apps Script implementation of the gradebook management system
- **功能**: 成績簿管理系統的完整 Google Apps Script 實作
- **Key Features | 主要功能**:
  - System initialization and configuration | 系統初始化和配置
  - Teacher and class management | 教師和班級管理
  - Student data processing | 學生資料處理
  - Gradebook creation and management | 成績簿建立和管理
  - Progress tracking and reporting | 進度追蹤和報告
  - Bilingual interface support | 雙語介面支援

### 2. dashboard.html | 控制台介面
**Location**: `/gradebook-system/google-apps-script/dashboard.html`
- **Purpose**: Modern web interface for system control and monitoring
- **功能**: 現代化的系統控制和監控網頁介面
- **Features | 特色**:
  - System status dashboard | 系統狀態控制台
  - Real-time progress monitoring | 即時進度監控
  - Batch operations interface | 批次操作介面
  - Bilingual user interface | 雙語使用者介面

### 3. CLAUDE.md | Claude 專案說明
**Location**: `/CLAUDE.md`
- **Purpose**: Project instructions and guidelines for Claude Code
- **功能**: Claude Code 的專案說明和指導原則
- **Content | 內容**:
  - Project overview and architecture | 專案概述和架構
  - Development commands and configuration | 開發指令和配置
  - Data structure specifications | 資料結構規格
  - Deployment options | 部署選項

### 4. README.md | 系統說明
**Location**: `/gradebook-system/README.md`
- **Purpose**: System documentation and usage instructions
- **功能**: 系統文件和使用說明
- **Content | 內容**:
  - Installation and setup | 安裝和設定
  - Usage examples | 使用範例
  - API documentation | API 文件
  - Troubleshooting guide | 疑難排解指南

## Configuration Files | 配置檔案

### 5. package.json | Node.js 配置
**Location**: `/package.json`
- **Purpose**: Node.js project configuration and dependencies
- **功能**: Node.js 專案配置和依賴管理

### 6. package-lock.json | 依賴鎖定
**Location**: `/package-lock.json`
- **Purpose**: Dependency version lock file
- **功能**: 依賴版本鎖定檔案

## System Configuration | 系統配置

### Key Configuration Points | 重要配置要點

1. **Main Folder ID** | 主要資料夾 ID
   - Location: `Code.gs` line 21
   - Current value: `1w_UJnNthBkcP8wgyrF3rz2St0jZTPZzB`

2. **Semester Settings** | 學期設定
   - Location: `Code.gs` line 17
   - Current value: `2425S2`

3. **Assessment Configuration** | 評量配置
   - Formative assessments: 8 (F.A.1 to F.A.8)
   - Summative assessments: 4 (S.A.1 to S.A.4)
   - Includes final exam | 包含期末考

4. **Grade Calculation Weights** | 成績計算權重
   - Formative: 15% | 平時評量: 15%
   - Summative: 20% | 總結評量: 20%
   - Final: 10% | 期末考: 10%

## Data Structure | 資料結構

### Class Names | 班級名稱
The system uses 14 standardized class names across G1-G6:
系統在G1-G6年級使用14個標準化班級名稱：

- **G1**: Trailblazers, Discoverers
- **G2**: Adventurers, Innovators  
- **G3**: Explorers, Navigators
- **G4**: Inventors, Voyagers
- **G5**: Pioneers, Guardians
- **G6**: Pathfinders, Seekers, Visionaries, Achievers

### Data Matching Logic | 資料匹配邏輯
The system only creates gradebooks for classes that have complete matches between Students and Classes sheets. This ensures data integrity and prevents creation of incomplete gradebooks.
系統只為在學生表和班級表之間有完全匹配的班級創建成績簿。這確保了資料完整性並防止創建不完整的成績簿。

## Important Notes | 重要說明

1. **Function Restrictions** | 功能限制
   - Never run `onOpen` in Apps Script editor
   - Use `initializeSystem` for manual initialization
   - Dashboard functions only work in Google Sheets cells

2. **File Organization** | 檔案組織
   - Each teacher gets ONE gradebook file with multiple class sheets
   - System automatically creates folder structure in Google Drive
   - Progress reports are saved automatically

3. **Bilingual Support** | 雙語支援
   - All user-facing text appears in both English and Traditional Chinese
   - Error messages and system responses are bilingual
   - Documentation maintains dual-language format