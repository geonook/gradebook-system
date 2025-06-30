# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Google Apps Script-based gradebook management system that provides a complete solution for educational institutions to manage student grades and teacher gradebooks. The system is built entirely within the Google ecosystem (Google Sheets, Google Drive, Google Apps Script) and features a modern HTML dashboard interface.

## Architecture

### Core Components
- **Google Apps Script (`Code.gs`)**: Contains all system logic including initialization, teacher management, gradebook creation, and progress tracking
- **HTML Dashboard (`dashboard.html`)**: Modern web interface for system control and monitoring
- **Google Sheets Integration**: Uses Google Sheets as the primary data interface
- **Google Drive Organization**: Structured folder system for file management

### Key Features
- **Teacher-Centric Design**: Each teacher gets one gradebook file containing multiple class sheets
- **Bilingual Support**: English and Traditional Chinese throughout the interface
- **Automated Teacher Extraction**: Teachers are automatically identified from student data
- **Batch Operations**: Create all teacher gradebooks at once
- **Progress Tracking**: Real-time monitoring of grade completion
- **Web App Deployment**: Can be deployed as a standalone web application

## Development Commands

### Deployment Scripts (部署腳本)

#### Test Deployment (測試部署)
```bash
# 🧪 用於開發和測試，不影響生產環境
./scripts/deploy-test.sh
```

#### Production Deployment (生產部署)
```bash
# 🚀 部署到生產環境（需要確認）
./scripts/deploy-production.sh
```

#### Legacy Auto Deployment (舊版自動部署)
```bash
# 自動推送到 GitHub 和 Google Apps Script
./scripts/deploy.sh
```

### Claude Code Slash Commands (Claude Code 專用指令)

#### System Commands | 系統指令
```
/check          - Perform comprehensive code quality and security analysis
/test           - Run system integrity tests and generate test reports
/deploy         - Execute deployment sequence with proper validation
/status         - Check current system status and health metrics
```

#### Development Commands | 開發指令
```
/implement      - Break down and implement new features systematically
/refactor       - Analyze and improve code structure and performance
/debug          - Investigate and resolve system issues
/optimize       - Identify and apply performance optimizations
```

#### Documentation Commands | 文件指令
```
/docs           - Generate comprehensive project documentation
/api-docs       - Create API documentation for system functions
/guide          - Create user guides and tutorials
/changelog      - Generate release notes and change logs
```

#### Quality Assurance | 品質保證
```
/review         - Conduct thorough code review with best practices
/security       - Perform security audit and vulnerability assessment
/performance    - Analyze system performance and bottlenecks
/backup         - Create system backup and recovery procedures
```

### Google Apps Script Development
- No traditional build/test commands - development happens in the Google Apps Script editor
- Deploy as web app: Deploy → New deployment → Web app
- Test functions: Use Apps Script editor's built-in function runner
- Manual clasp push: `cd gradebook-system/google-apps-script && clasp push`

### System Initialization
```javascript
// Primary initialization function (run in Apps Script editor)
initializeSystem()

// Dashboard-based initialization (run in Google Sheets)
=initializeSystemFromDashboard()
```

### Key Dashboard Functions
```javascript
// System status and statistics
=checkSystemStatusFromDashboard()

// Refresh dashboard data
=refreshDashboard()

// Get system folder links
=getSystemFolderLink()
=getMasterDataLink()
```

## Configuration

### Essential Configuration (Code.gs line 21)
```javascript
MAIN_FOLDER_ID: 'YOUR_GOOGLE_DRIVE_FOLDER_ID'
```

### System Settings (SYSTEM_CONFIG object)
- **SEMESTER**: Current semester code (e.g., '2425S2')
- **ASSESSMENTS**: Configure number of formative/summative assessments
- **WEIGHTS**: Grade calculation weights for different assessment types
- **PROGRESS**: Thresholds for progress indicators

## Data Structure

### Master Data Sheet Format
- **Students Sheet**: Contains student information with LT Teacher and IT Teacher columns
- **Teachers Sheet**: Auto-generated from student data, shows teacher-class relationships
- **Status Column**: Uses formula `=IF(AND(A2<>"", B2<>""), "在學", "")` for automatic status filling

### Grade Calculation Formula
```javascript
// Weighted semester grade calculation
Semester Grade = (Formative×0.15 + Summative×0.2 + Final×0.1) ÷ 0.45
```

## Deployment Options

### Option A: Web App Deployment (Recommended)
1. Deploy as web app from Google Apps Script
2. Set execution as "Me" and access to "Anyone"
3. Provides standalone URL for dashboard access

### Option B: Traditional Menu System
1. Install script in Google Apps Script
2. Access through custom menu in Google Sheets
3. Menu appears as "📊 Gradebook System | 成績簿系統"

## Important Notes

### Function Restrictions
- **NEVER run `onOpen` in Apps Script editor** - it only works when opening Google Sheets
- Use `initializeSystem` for manual initialization in the editor
- Dashboard functions (ending with `FromDashboard`) should only be used in Google Sheets cells

### File Organization
- Each teacher receives ONE gradebook file with multiple class sheets
- System automatically creates folder structure in Google Drive
- Progress reports are saved automatically to dedicated folders

### Bilingual Interface
- All user-facing text appears in both English and Traditional Chinese
- Error messages and system responses are bilingual
- Documentation and comments maintain dual-language format

## Common Workflows

### Initial Setup
1. Configure `MAIN_FOLDER_ID` in Code.gs
2. Deploy to Google Apps Script
3. Run `initializeSystem` or use dashboard initialization
4. Grant necessary Google Drive permissions

### Adding Students/Teachers
1. Update Students sheet with student data including teacher assignments
2. Teachers are automatically extracted from LT Teacher/IT Teacher columns
3. Run batch creation to generate teacher gradebooks

### Progress Monitoring
- Use dashboard or menu system to check progress
- Color-coded indicators: 🟢 Excellent (≥90%), 🟡 Good (80-89%), 🟠 Normal (60-79%), 🔴 Behind (<60%)
- Automated weekly progress checks available

## 🚨 CRITICAL DEVELOPMENT WORKFLOW

### ⚠️ MANDATORY VERSION CONTROL BEFORE ANY CHANGES

**NEVER modify code without creating backups first. This is CRITICAL.**

**BEFORE making ANY modifications to the codebase:**

1. **Create Tagged Backup**
   ```bash
   # Tag current working version with timestamp
   git tag -a v$(date +%Y%m%d_%H%M%S) -m "Backup before changes: $(date)"
   git push origin --tags
   
   # Create timestamped backup files in dedicated folder (avoids SYSTEM_CONFIG conflicts)
   mkdir -p backups
   cp gradebook-system/google-apps-script/Code.gs backups/Code_backup_$(date +%Y%m%d_%H%M%S).gs
   cp gradebook-system/google-apps-script/CodeExtensions.gs backups/CodeExtensions_backup_$(date +%Y%m%d_%H%M%S).gs
   ```

2. **Document Current State**
   ```bash
   # Create or update version log
   echo "=== BACKUP LOG $(date) ===" >> VERSION_LOG.md
   echo "Lines of code before changes:" >> VERSION_LOG.md
   wc -l gradebook-system/google-apps-script/*.gs >> VERSION_LOG.md
   echo "Recent git commits:" >> VERSION_LOG.md
   git log --oneline -5 >> VERSION_LOG.md
   echo "Google Apps Script version: [Record from GAS platform]" >> VERSION_LOG.md
   echo "" >> VERSION_LOG.md
   ```

3. **Test Current Functionality** 
   - Verify all dashboard buttons work
   - Test batch gradebook creation
   - Confirm formulas and calculations are correct
   - Document any known issues
   - Take screenshots if UI changes are planned

4. **Commit Current State**
   ```bash
   git add -A
   git commit -m "BACKUP: Working state before modifications $(date)"
   git push origin main
   ```

### Mandatory Steps for Every Code Update

1. **Always Deploy After Changes**
   ```bash
   # Execute deployment script after every modification
   ./deploy.sh
   ```
   - This pushes changes to Google Apps Script immediately
   - Without deployment, changes only exist locally and won't work in the dashboard
   - Google Apps Script runs the server-side code, so local changes must be pushed

2. **Clean Up Test Code**
   - After testing functionality, ALWAYS remove temporary test functions
   - Remove debug buttons and test UI elements
   - Keep code clean and production-ready
   - Example cleanup items:
     - Test functions like `testConnection()`, `debugFunction()`
     - Temporary buttons for debugging
     - Console.log statements used for testing
     - Experimental code blocks

3. **Code Optimization Priority**
   - Remove unused functions and variables
   - Consolidate duplicate code
   - Maintain consistent naming conventions
   - Keep comments bilingual (English | Chinese)

### Error Handling Best Practices

1. **Dashboard Function Returns**
   - Always return structured objects: `{success: true/false, data/error: ...}`
   - Include meaningful error messages in both languages
   - Provide debugging information when errors occur

2. **File Name Flexibility**
   - Support multiple possible file naming patterns
   - Include file listing in error messages for debugging
   - Use try-catch blocks with fallback options

### Testing Workflow

1. **Add temporary test functions for debugging**
2. **Test functionality thoroughly**
3. **Remove all test code once confirmed working**
4. **Execute `./deploy.sh` to push clean code**
5. **Verify functionality in live environment**

### Common Issues Prevention

- **Error 400**: Usually caused by outdated code in Google Apps Script
  - Solution: Always run `./deploy.sh` after changes
- **File Not Found**: Master Data or system files missing
  - Solution: Check file names and folder structure
  - Use enhanced error messages to identify actual file names
- **Permission Issues**: Google Apps Script lacks Drive access
  - Solution: Re-authorize permissions in Apps Script

### Deployment Verification

After each `./deploy.sh`:
1. Check that all 6 files are pushed successfully
2. Test key functions in the dashboard
3. Verify error handling works correctly
4. Confirm all temporary code is removed

**Remember: Local changes are invisible to Google Apps Script until deployed!**

## 🧪 Testing Strategy (測試策略)

### Test-Driven Development | 測試驅動開發
```javascript
// 1. Write test first | 先寫測試
function testCreateTeacherGradebook() {
  const mockTeacher = { name: 'Test Teacher', classes: ['G1A'] };
  const result = createTeacherGradebook(mockTeacher);
  assert(result.success === true, 'Teacher gradebook creation failed');
}

// 2. Implement function | 實施功能
function createTeacherGradebook(teacher) {
  // Implementation here
}

// 3. Refactor and optimize | 重構和優化
```

### Testing Levels | 測試層級
- **Unit Tests**: Individual function testing | 單元測試：個別函數測試
- **Integration Tests**: Component interaction testing | 整合測試：組件互動測試  
- **System Tests**: End-to-end workflow testing | 系統測試：端到端流程測試
- **Performance Tests**: Load and stress testing | 性能測試：負載和壓力測試

### Quality Gates | 品質門檻
Before any deployment, ensure:
1. ✅ All unit tests pass | 所有單元測試通過
2. ✅ Code coverage > 80% | 代碼覆蓋率 > 80%
3. ✅ No security vulnerabilities | 無安全漏洞
4. ✅ Performance benchmarks met | 達到性能基準
5. ✅ Documentation updated | 文件已更新

## 🏗️ Code Organization (代碼組織)

### Modular Structure | 模組化結構
```
gradebook-system/
├── core/                   # Core business logic | 核心業務邏輯
│   ├── teacher-manager.gs  # Teacher operations | 教師操作
│   ├── grade-calculator.gs # Grade calculations | 成績計算
│   └── progress-tracker.gs # Progress monitoring | 進度監控
├── utils/                  # Utility functions | 工具函數
│   ├── data-validator.gs   # Data validation | 資料驗證
│   ├── error-handler.gs    # Error handling | 錯誤處理
│   └── logger.gs          # Logging system | 日誌系統
├── tests/                  # Test suite | 測試套件
│   ├── unit/              # Unit tests | 單元測試
│   ├── integration/       # Integration tests | 整合測試
│   └── performance/       # Performance tests | 性能測試
└── docs/                  # Documentation | 文件
    ├── api/               # API documentation | API 文件
    ├── guides/            # User guides | 使用指南
    └── troubleshooting/   # Problem solving | 問題解決
```

### Coding Standards | 編碼標準
- **Function Naming**: camelCase with descriptive names | 函數命名：駝峰式，描述性名稱
- **Constants**: UPPER_SNAKE_CASE | 常數：大寫蛇形命名
- **Comments**: Bilingual (English | Chinese) | 註釋：雙語（英文｜中文）
- **Error Handling**: Always use try-catch with meaningful messages | 錯誤處理：總是使用 try-catch 與有意義的訊息

## 🔒 Security Best Practices (安全最佳實踐)

### Data Protection | 資料保護
- Never log sensitive student information | 絕不記錄敏感學生資訊
- Validate all input data | 驗證所有輸入資料
- Use Google Apps Script's built-in authorization | 使用 Google Apps Script 內建授權
- Implement proper access controls | 實施適當的存取控制

### Code Security | 代碼安全
- No hardcoded secrets or API keys | 無硬編碼密鑰或 API 金鑰
- Input sanitization for all user data | 對所有用戶資料進行輸入清理
- Regular security audits | 定期安全審計
- Follow OWASP guidelines | 遵循 OWASP 指導原則

**Remember: Local changes are invisible to Google Apps Script until deployed!**

## 🎯 HT (Head Teacher) System Status | HT學年主任系統狀態

### Current Implementation Status | 當前實作狀態

#### ✅ **COMPLETED (Ready for Production) | 已完成（可用於生產）**
- **HT Gradebook Creation**: Integrated with `batchCreateGradebooks()` 
- **Permission Control**: Complete access validation and restriction system
- **Dual-Grade Management**: G1-G2, G3-G4, G5-G6 grade group support
- **HT Assessment Management Interface**: Full UI with bilingual support
- **File Naming Convention**: `[Name] - HT [GradeGroup] [Type] - Gradebook`

#### ⚠️ **PENDING IMPLEMENTATION (Critical) | 待實作（關鍵）**
- **Sync Function Core Operations**: Physical read/write to Google Sheets
- **Assessment Title Persistence**: Actual data storage and retrieval
- **HT Dashboard Integration**: Connect UI with real gradebook data

#### 📋 **Key Functions Status | 關鍵函數狀態**
```javascript
// ✅ WORKING - Permission control and validation
getCurrentHTContextEnhanced()     // HT identity detection
verifyHTPermissions()            // Access control validation  
syncAssessmentTitlesByGradeGroup() // Framework with permission checks

// ❌ PLACEHOLDER - Need implementation
getAssessmentTitlesFromHTGradebook()    // Read from HT sheets
findTeacherGradebooksByGradeGroup()     // Locate target gradebooks  
applyAssessmentTitlesToGradebook()      // Write to teacher gradebooks
```

### Usage Instructions | 使用說明

#### **For Production Use | 生產環境使用**
1. Run `batchCreateGradebooks()` to create all gradebooks including HT versions
2. HT teachers will receive enhanced gradebooks with Assessment Management sheets
3. Permission system automatically restricts HT access to their grade groups only

#### **For Development | 開發環境**
1. See `docs/HT_DEVELOPMENT_STATUS.md` for detailed implementation status
2. HT Dashboard fully functional via Web App deployment
3. All sync functions implemented and operational

### Next Development Priority | 下一步開發優先級
1. **MEDIUM**: Resolve Web App console warnings (cosmetic only)
2. **LOW**: Performance optimization for large-scale operations
3. **LOW**: Enhanced audit logging and reporting features

**Note**: HT system is now fully functional in production with complete sync operations and Web App integration. Console warnings are cosmetic and do not affect functionality.