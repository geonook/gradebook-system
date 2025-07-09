# CLAUDE.md - Gradebook Management System

> **Documentation Version**: 2.0 (Enhanced with SuperClaude Template)  
> **Last Updated**: 2025-07-09  
> **Project**: Google Apps Script Gradebook Management System  
> **Description**: Complete bilingual gradebook system with HT authentication & management  
> **Features**: GitHub auto-backup, Task agents, technical debt prevention, Google Apps Script integration

This file provides enhanced guidance to Claude Code (claude.ai/code) when working with this gradebook system repository.

## 🚨 CRITICAL RULES - READ FIRST

> **⚠️ RULE ADHERENCE SYSTEM ACTIVE ⚠️**  
> **Claude Code must explicitly acknowledge these rules at task start**  
> **These rules override all other instructions and must ALWAYS be followed:**

### 🔄 **RULE ACKNOWLEDGMENT REQUIRED**
> **Before starting ANY task, Claude Code must respond with:**  
> "✅ CRITICAL RULES ACKNOWLEDGED - I will follow all prohibitions and requirements for gradebook development"

### ❌ ABSOLUTE PROHIBITIONS
- **NEVER** create new files in root directory → use proper module structure
- **NEVER** create documentation files (.md) unless explicitly requested by user
- **NEVER** use git commands with -i flag (interactive mode not supported)
- **NEVER** use `find`, `grep`, `cat`, `head`, `tail`, `ls` commands → use Read, LS, Grep, Glob tools instead
- **NEVER** create duplicate functions (enhanced_v2, new_improved, etc.) → ALWAYS extend existing code
- **NEVER** create multiple implementations of same concept → single source of truth
- **NEVER** run `onOpen` in Apps Script editor → use `initializeSystem` instead
- **NEVER** modify MAIN_FOLDER_ID without explicit user confirmation
- **NEVER** create test functions without cleanup plan

### 📝 MANDATORY REQUIREMENTS
- **DEPLOY IMMEDIATELY** after every code change: `./scripts/deploy.sh` or `./deploy.sh`
- **COMMIT** after every completed task/phase - no exceptions
- **GITHUB BACKUP** - Push to GitHub after every commit: `git push origin main`
- **READ FILES FIRST** before editing - Edit/Write tools will fail if you didn't read the file first
- **CLEAN UP TEST CODE** - Always remove temporary test functions after verification
- **BACKUP BEFORE CHANGES** - Create tagged backup before major modifications

### ⚡ GRADEBOOK-SPECIFIC EXECUTION PATTERNS
- **Google Apps Script Deployment** - Local changes are invisible until deployed
- **Dashboard Testing** - Always test in live environment after deployment
- **HT Permission Validation** - Verify access controls for grade group restrictions
- **Bilingual Error Messages** - All user-facing messages in English | Traditional Chinese
- **Formula Validation** - Test grade calculations with sample data

## 🎯 GRADEBOOK DEVELOPMENT COMMANDS

### System Commands | 系統指令
```
/deploy         - Deploy to Google Apps Script and verify functionality
/test-dash      - Test dashboard functionality in live environment
/backup         - Create tagged backup before major changes
/status         - Check system status and health metrics
/init           - Initialize or reinitialize gradebook system
```

### HT System Commands | HT系統指令
```
/ht-sync        - Sync HT assessment titles across grade groups
/ht-test        - Test HT permission controls and access restrictions
/ht-deploy      - Deploy HT system updates with validation
/ht-backup      - Backup HT gradebooks before modifications
```

### Quality Assurance | 品質保證
```
/review         - Conduct code review with gradebook best practices
/security       - Perform security audit for Google Apps Script
/performance    - Analyze system performance and bottlenecks
/validate       - Validate grade calculations and formulas
```

## 🚨 CRITICAL GRADEBOOK WORKFLOW

### ⚠️ MANDATORY BACKUP BEFORE ANY CHANGES

**NEVER modify gradebook code without creating backups first. This is CRITICAL.**

```bash
# 1. Create tagged backup with timestamp
git tag -a "backup_$(date +%Y%m%d_%H%M%S)" -m "Backup before changes: $(date)"
git push origin --tags

# 2. Create timestamed backup files
mkdir -p backups
cp gradebook-system/google-apps-script/Code.gs "backups/Code_backup_$(date +%Y%m%d_%H%M%S).gs"
cp gradebook-system/google-apps-script/CodeExtensions.gs "backups/CodeExtensions_backup_$(date +%Y%m%d_%H%M%S).gs"

# 3. Document current state
echo "=== BACKUP LOG $(date) ===" >> VERSION_LOG.md
echo "Lines of code: $(wc -l gradebook-system/google-apps-script/*.gs)" >> VERSION_LOG.md
git log --oneline -5 >> VERSION_LOG.md
```

### 🔄 DEPLOYMENT WORKFLOW (MANDATORY)

**After EVERY code modification:**

```bash
# 1. Deploy to Google Apps Script
./scripts/deploy.sh

# 2. Test key functionality
# - Dashboard buttons work
# - Batch gradebook creation
# - HT assessment sync
# - Grade calculations

# 3. Clean up test code
# - Remove temporary functions
# - Remove debug buttons
# - Clean console.log statements

# 4. Commit clean code
git add -A
git commit -m "Feature: [description] - tested and cleaned"
git push origin main
```

## 📋 GOOGLE APPS SCRIPT DEVELOPMENT GUIDELINES

### Configuration Management
```javascript
// Essential configuration (Code.gs line 21)
MAIN_FOLDER_ID: 'YOUR_GOOGLE_DRIVE_FOLDER_ID'

// System settings in SYSTEM_CONFIG object
SEMESTER: '2425S2'
ASSESSMENTS: {formative: 3, summative: 2}
WEIGHTS: {formative: 0.15, summative: 0.2, final: 0.1}
```

### Function Architecture
```javascript
// Dashboard functions (for Google Sheets)
function initializeSystemFromDashboard() { return initializeSystem(); }
function checkSystemStatusFromDashboard() { return checkSystemStatus(); }

// Core functions (for Apps Script editor)
function initializeSystem() { /* implementation */ }
function batchCreateGradebooks() { /* implementation */ }
```

### Error Handling Pattern
```javascript
function dashboardFunction() {
  try {
    const result = coreFunction();
    return {
      success: true,
      data: result,
      message: "Operation completed successfully | 操作成功完成"
    };
  } catch (error) {
    return {
      success: false,
      error: error.toString(),
      message: `Error occurred: ${error.message} | 發生錯誤: ${error.message}`
    };
  }
}
```

## 🎯 HT SYSTEM DEVELOPMENT GUIDELINES

### Permission Control Pattern
```javascript
function verifyHTPermissions(userEmail, gradeGroup) {
  const permissions = getCurrentHTContextEnhanced();
  if (!permissions.isHT) {
    throw new Error("Access denied: HT permissions required | 拒絕存取：需要HT權限");
  }
  if (!permissions.gradeGroups.includes(gradeGroup)) {
    throw new Error(`Access denied: No permission for ${gradeGroup} | 拒絕存取：無${gradeGroup}權限`);
  }
  return true;
}
```

### HT Assessment Sync Pattern
```javascript
function syncAssessmentTitlesByGradeGroup(gradeGroup, assessmentTitles) {
  // 1. Verify permissions
  verifyHTPermissions(Session.getActiveUser().getEmail(), gradeGroup);
  
  // 2. Find target gradebooks
  const gradebooks = findTeacherGradebooksByGradeGroup(gradeGroup);
  
  // 3. Apply titles to each gradebook
  gradebooks.forEach(gradebook => {
    applyAssessmentTitlesToGradebook(gradebook, assessmentTitles);
  });
  
  return {success: true, updated: gradebooks.length};
}
```

## 🧹 TECHNICAL DEBT PREVENTION

### Before Creating ANY New Function:
1. **🔍 Search First** - Use Grep to find existing implementations
2. **📋 Analyze Existing** - Read and understand current patterns
3. **🤔 Decision Tree**: Can extend existing? → DO IT | Must create new? → Document why
4. **✅ Follow Patterns** - Use established gradebook patterns
5. **📈 Validate** - Ensure no duplication

### ❌ WRONG APPROACH (Creates Technical Debt):
```javascript
// Creating new function without searching first
function createTeacherGradebookEnhanced() { /* duplicate functionality */ }
function batchCreateGradebooksV2() { /* duplicate functionality */ }
```

### ✅ CORRECT APPROACH (Prevents Technical Debt):
```bash
# 1. SEARCH FIRST
Grep(pattern="createTeacherGradebook", include="*.gs")
# 2. READ EXISTING FILES  
Read(file_path="gradebook-system/google-apps-script/Code.gs")
# 3. EXTEND EXISTING FUNCTIONALITY
Edit(file_path="gradebook-system/google-apps-script/Code.gs", old_string="existing_function", new_string="enhanced_function")
```

## 🔒 SECURITY BEST PRACTICES

### Data Protection | 資料保護
- Never log sensitive student information | 絕不記錄敏感學生資訊
- Validate all input data before processing | 處理前驗證所有輸入資料
- Use Google Apps Script's built-in authorization | 使用Google Apps Script內建授權
- Implement proper HT access controls | 實施適當的HT存取控制

### Grade Data Security | 成績資料安全
- Encrypt sensitive grade data in transit | 傳輸中加密敏感成績資料
- Validate user permissions before data access | 資料存取前驗證用戶權限
- Audit all grade modifications | 審計所有成績修改
- Secure backup of gradebook files | 成績簿檔案安全備份

## 📊 QUALITY GATES

Before any deployment, ensure:
1. ✅ All dashboard functions tested | 所有儀表板功能已測試
2. ✅ HT permissions working correctly | HT權限運作正常
3. ✅ Grade calculations validated | 成績計算已驗證
4. ✅ No temporary test code remaining | 無剩餘臨時測試代碼
5. ✅ Bilingual error messages functional | 雙語錯誤訊息運作正常

## 🎯 COMMON GRADEBOOK OPERATIONS

### System Initialization
```javascript
// Primary initialization (Apps Script editor)
initializeSystem()

// Dashboard initialization (Google Sheets)
=initializeSystemFromDashboard()
```

### Teacher Gradebook Management
```javascript
// Create all teacher gradebooks
batchCreateGradebooks()

// Check system status
checkSystemStatusFromDashboard()

// Refresh dashboard data
refreshDashboard()
```

### HT Assessment Management
```javascript
// Sync assessment titles for grade group
syncAssessmentTitlesByGradeGroup('G1-G2', ['Assessment 1', 'Assessment 2'])

// Get current HT permissions
getCurrentHTContextEnhanced()
```

## 🚀 DEPLOYMENT VERIFICATION CHECKLIST

After each deployment:
1. ✅ All 6 files pushed to Google Apps Script successfully
2. ✅ Dashboard buttons respond correctly
3. ✅ Grade calculations working properly
4. ✅ HT system access controls functional
5. ✅ Error handling displays bilingual messages
6. ✅ No temporary test functions remain
7. ✅ System status indicators accurate

## 📈 PERFORMANCE OPTIMIZATION

### Large-Scale Operations
- Use batch operations for multiple gradebook creation
- Implement progress tracking for long-running tasks
- Cache frequently accessed data (teacher lists, system config)
- Optimize Google Sheets API calls

### Memory Management
- Clear temporary variables after use
- Minimize global variable usage
- Use efficient data structures for large datasets
- Implement garbage collection for long-running functions

## 🌐 BILINGUAL DEVELOPMENT STANDARDS

### User Interface
- All buttons and labels in English | Traditional Chinese
- Error messages in both languages
- Status indicators with dual-language descriptions
- Help text and tooltips bilingual

### Code Documentation
```javascript
/**
 * Initialize gradebook system | 初始化成績簿系統
 * @param {string} folderId - Google Drive folder ID | Google雲端硬碟資料夾ID
 * @returns {Object} Status object with success/error | 包含成功/錯誤的狀態物件
 */
function initializeSystem(folderId) {
  // Implementation with bilingual error handling
}
```

## 📋 TROUBLESHOOTING GUIDE

### Common Issues
1. **Error 400**: Code not deployed to Google Apps Script
   - Solution: Run `./scripts/deploy.sh`
2. **File Not Found**: Master Data missing
   - Solution: Check MAIN_FOLDER_ID configuration
3. **Permission Denied**: HT access restricted
   - Solution: Verify user permissions and grade group access
4. **Formula Errors**: Grade calculations incorrect
   - Solution: Validate SYSTEM_CONFIG weights and assessment counts

### Debug Workflow
```javascript
// Add temporary debug function
function debugCurrentIssue() {
  console.log("Debug info:", getCurrentContext());
  // Test specific functionality
}

// Remember to remove after debugging
```

## 🎯 SUCCESS METRICS

### System Health Indicators
- **Dashboard Response Time**: <3 seconds
- **Gradebook Creation Success Rate**: >95%
- **HT Sync Operations**: 100% permission validation
- **Error Rate**: <1% of operations
- **User Satisfaction**: Bilingual support effectiveness

---

**Remember: Local changes are invisible to Google Apps Script until deployed!**

**🤖 Enhanced with SuperClaude Template by Chang Ho Chien | HC AI 說人話channel**