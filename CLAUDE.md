# CLAUDE.md - Gradebook System

> **Documentation Version**: 1.0  
> **Last Updated**: 2025-07-09  
> **Project**: Google Apps Script-based Gradebook Management System  
> **Description**: Complete educational gradebook solution with bilingual support and HT Dashboard integration  
> **Features**: GitHub auto-backup, Task agents, technical debt prevention, Playwright MCP testing

This file provides essential guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚨 CRITICAL RULES - READ FIRST

> **⚠️ RULE ADHERENCE SYSTEM ACTIVE ⚠️**  
> **Claude Code must explicitly acknowledge these rules at task start**  
> **These rules override all other instructions and must ALWAYS be followed:**

### 🔄 **RULE ACKNOWLEDGMENT REQUIRED**
> **Before starting ANY task, Claude Code must respond with:**  
> "✅ CRITICAL RULES ACKNOWLEDGED - I will follow all prohibitions and requirements listed in CLAUDE.md"

### ❌ ABSOLUTE PROHIBITIONS
- **NEVER** create new files in root directory → use proper module structure
- **NEVER** write output files directly to root directory → use designated output folders
- **NEVER** create documentation files (.md) unless explicitly requested by user
- **NEVER** use git commands with -i flag (interactive mode not supported)
- **NEVER** use `find`, `grep`, `cat`, `head`, `tail`, `ls` commands → use Read, LS, Grep, Glob tools instead
- **NEVER** create duplicate files (manager_v2.py, enhanced_xyz.py, utils_new.js) → ALWAYS extend existing files
- **NEVER** create multiple implementations of same concept → single source of truth
- **NEVER** copy-paste code blocks → extract into shared utilities/functions
- **NEVER** hardcode values that should be configurable → use config files/environment variables
- **NEVER** use naming like enhanced_, improved_, new_, v2_ → extend original files instead
- **NEVER** run `onOpen` in Apps Script editor → it only works when opening Google Sheets
- **NEVER** modify code without creating git backups first → this is CRITICAL

### 📝 MANDATORY REQUIREMENTS
- **COMMIT** after every completed task/phase - no exceptions
- **GITHUB AUTO-BACKUP** - Auto-push enabled via git hooks: commits automatically backup to GitHub
- **VERSION CONTROL** - Use `./scripts/git-workflow.sh` for complete git+GitHub workflow management
- **USE TASK AGENTS** for all long-running operations (>30 seconds) - Bash commands stop when context switches
- **TODOWRITE** for complex tasks (3+ steps) → parallel agents → git checkpoints → test validation
- **READ FILES FIRST** before editing - Edit/Write tools will fail if you didn't read the file first
- **DEBT PREVENTION** - Before creating new files, check for existing similar functionality to extend  
- **SINGLE SOURCE OF TRUTH** - One authoritative implementation per feature/concept
- **DEPLOY AFTER CHANGES** - Always run deployment script after code modifications
- **CLEAN UP TEST CODE** - Remove debug functions, test buttons, and temporary code after testing

### ⚡ EXECUTION PATTERNS
- **PARALLEL TASK AGENTS** - Launch multiple Task agents simultaneously for maximum efficiency
- **SYSTEMATIC WORKFLOW** - TodoWrite → Parallel agents → Git checkpoints → GitHub backup → Test validation
- **GITHUB BACKUP WORKFLOW** - After every commit: `git push origin main` to maintain GitHub backup
- **BACKGROUND PROCESSING** - ONLY Task agents can run true background operations

### 🔍 MANDATORY PRE-TASK COMPLIANCE CHECK
> **STOP: Before starting any task, Claude Code must explicitly verify ALL points:**

**Step 1: Rule Acknowledgment**
- [ ] ✅ I acknowledge all critical rules in CLAUDE.md and will follow them

**Step 2: Task Analysis**  
- [ ] Will this create files in root? → If YES, use proper module structure instead
- [ ] Will this take >30 seconds? → If YES, use Task agents not Bash
- [ ] Is this 3+ steps? → If YES, use TodoWrite breakdown first
- [ ] Am I about to use grep/find/cat? → If YES, use proper tools instead

**Step 3: Technical Debt Prevention (MANDATORY SEARCH FIRST)**
- [ ] **SEARCH FIRST**: Use Grep pattern="<functionality>.*<keyword>" to find existing implementations
- [ ] **CHECK EXISTING**: Read any found files to understand current functionality
- [ ] Does similar functionality already exist? → If YES, extend existing code
- [ ] Am I creating a duplicate class/manager? → If YES, consolidate instead
- [ ] Will this create multiple sources of truth? → If YES, redesign approach
- [ ] Have I searched for existing implementations? → Use Grep/Glob tools first
- [ ] Can I extend existing code instead of creating new? → Prefer extension over creation
- [ ] Am I about to copy-paste code? → Extract to shared utility instead

**Step 4: Session Management**
- [ ] Is this a long/complex task? → If YES, plan context checkpoints
- [ ] Have I been working >1 hour? → If YES, consider /compact or session break

> **⚠️ DO NOT PROCEED until all checkboxes are explicitly verified**

## 📋 PROJECT OVERVIEW

This is a Google Apps Script-based gradebook management system that provides a complete solution for educational institutions to manage student grades and teacher gradebooks. The system is built entirely within the Google ecosystem (Google Sheets, Google Drive, Google Apps Script) and features a modern HTML dashboard interface.

### 🎯 **ARCHITECTURE OVERVIEW**

#### Core Components
- **Google Apps Script (`Code.gs`)**: Contains all system logic including initialization, teacher management, gradebook creation, and progress tracking
- **HTML Dashboard (`dashboard.html`)**: Modern web interface for system control and monitoring
- **Google Sheets Integration**: Uses Google Sheets as the primary data interface
- **Google Drive Organization**: Structured folder system for file management
- **HT Dashboard Integration**: Enhanced interface for Head Teachers with grade group management

#### Key Features
- **Teacher-Centric Design**: Each teacher gets one gradebook file containing multiple class sheets
- **Bilingual Support**: English and Traditional Chinese throughout the interface
- **Automated Teacher Extraction**: Teachers are automatically identified from student data
- **Batch Operations**: Create all teacher gradebooks at once
- **Progress Tracking**: Real-time monitoring of grade completion
- **Web App Deployment**: Can be deployed as a standalone web application
- **HT System**: Head Teacher functionality with permission control and sync operations
- **Playwright MCP Testing**: Automated testing with Microsoft's official Playwright MCP server

### 🎯 **DEVELOPMENT STATUS**
- **Setup**: ✅ Complete with MCP testing integration
- **Core Features**: ✅ Complete with HT Dashboard functionality
- **Testing**: ✅ Playwright MCP automated testing configured
- **Documentation**: ✅ Comprehensive with deployment guidance
- **HT System**: ✅ Full production ready with sync operations

## 🐙 GITHUB VERSION CONTROL SYSTEM

### 🎯 **AUTOMATED BACKUP SYSTEM** (Based on HC AI Template)

#### Auto-Push Configuration ✅ ENABLED
```bash
# Post-commit hook automatically pushes every commit to GitHub
# Location: .git/hooks/post-commit
# Status: ✅ Active - Automatic backup after every commit
```

#### Version Control Commands
```bash
# Complete git workflow management
./scripts/git-workflow.sh status          # Check git status
./scripts/git-workflow.sh check           # Verify GitHub connection  
./scripts/git-workflow.sh backup          # Create backup tag
./scripts/git-workflow.sh commit "msg"    # Full commit workflow
./scripts/git-workflow.sh log             # Show recent commits
./scripts/git-workflow.sh tags            # List all backup tags

# Quick backup tag creation
./scripts/create-backup-tag.sh "description"
```

#### GitHub CLI Commands
```bash
# Check GitHub connection status
gh auth status && git remote -v

# View repository information  
gh repo view

# Check repository status
gh repo view --json name,owner,updatedAt
```

### 🛡️ **BACKUP STRATEGY** (Following Template Standards)

#### Automatic Backup Tags
- **Before major changes**: Automatic tagged backups
- **Naming convention**: `backup_YYYYMMDD_HHMMSS`
- **Storage**: GitHub repository tags
- **Retention**: Permanent (unless manually deleted)

#### Git Hooks System
- **post-commit**: Auto-push to GitHub after every commit
- **pre-commit**: (Available for future linting/testing)
- **Status**: ✅ Active and working

#### Manual Backup Commands
```bash
# Create backup before risky changes
./scripts/git-workflow.sh backup

# Full commit with auto-backup
./scripts/git-workflow.sh commit "Major feature implementation"

# Emergency backup tag
git tag -a emergency_$(date +%Y%m%d_%H%M%S) -m "Emergency backup: $(date)"
git push origin --tags
```

### 📋 **VERSION CONTROL WORKFLOW** (Mandatory)

#### Before ANY Changes
1. **Check Status**: `./scripts/git-workflow.sh status`
2. **Create Backup**: `./scripts/git-workflow.sh backup`  
3. **Verify Connection**: `./scripts/git-workflow.sh check`

#### During Development
1. **Regular Commits**: Use descriptive commit messages
2. **Auto-Push**: Happens automatically via git hooks
3. **Progress Tracking**: Use todo list system

#### After Completion
1. **Final Commit**: `./scripts/git-workflow.sh commit "Feature complete"`
2. **Verification**: Check GitHub repository for backup
3. **Documentation**: Update relevant MD files

### 🔄 **GITHUB INTEGRATION STATUS**

#### Current Configuration ✅
- **Repository**: Connected to `https://github.com/geonook/gradebook-system.git`
- **Branch**: `main` (modern standard)
- **Auto-push**: ✅ Enabled via git hooks
- **GitHub CLI**: ✅ Installed and ready
- **Backup System**: ✅ Fully operational

#### Repository Settings
- **Visibility**: Public (can be changed if needed)
- **Default Branch**: `main`
- **Issues & Wiki**: Available for project management
- **Collaboration**: Ready for team development

## 🚀 DEVELOPMENT COMMANDS

### 🤖 **Playwright MCP Testing Commands**

#### MCP Server Management
```bash
# Check MCP server status
claude mcp list

# Add/Update Playwright MCP server
claude mcp add playwright npx @playwright/mcp@latest

# Remove MCP server
claude mcp remove playwright
```

#### Test Execution
```bash
# Run all tests with browser visible
npx playwright test --headed

# Run specific test file
npx playwright test tests/ai-generated/connection-test.spec.js --headed

# Run tests with specific browser
npx playwright test --headed --project=chromium

# Run MCP-enhanced tests
npx playwright test tests/ai-generated/gradebook-mcp.spec.js --headed
```

#### Test Development
```bash
# Generate new tests
npx playwright codegen https://script.google.com/macros/s/AKfycbwQD6FGVvt3R4_L5RGS8BB7yapJlE8S9gd4E8HyJRI/exec

# View test results
npx playwright show-report

# Debug failing tests
npx playwright test --debug
```

### 🚀 **Deployment Scripts (部署腳本)**

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

### 🎯 **Claude Code Slash Commands (Claude Code 專用指令)**

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

### 🔧 **Google Apps Script Development**
- No traditional build/test commands - development happens in the Google Apps Script editor
- Deploy as web app: Deploy → New deployment → Web app
- Test functions: Use Apps Script editor's built-in function runner
- Manual clasp push: `cd google-apps-script && clasp push`

### 🔄 **System Initialization**
```javascript
// Primary initialization function (run in Apps Script editor)
initializeSystem()

// Dashboard-based initialization (run in Google Sheets)
=initializeSystemFromDashboard()
```

### 📊 **Key Dashboard Functions**
```javascript
// System status and statistics
=checkSystemStatusFromDashboard()

// Refresh dashboard data
=refreshDashboard()

// Get system folder links
=getSystemFolderLink()
=getMasterDataLink()
```

## ⚙️ CONFIGURATION

### 🔧 **Essential Configuration (Code.gs line 21)**
```javascript
MAIN_FOLDER_ID: 'YOUR_GOOGLE_DRIVE_FOLDER_ID'
```

### 🛠️ **System Settings (SYSTEM_CONFIG object)**
- **SEMESTER**: Current semester code (e.g., '2425S2')
- **ASSESSMENTS**: Configure number of formative/summative assessments
- **WEIGHTS**: Grade calculation weights for different assessment types
- **PROGRESS**: Thresholds for progress indicators

### 🤖 **MCP Configuration (mcp-config.json)**
```json
{
  "baseUrl": "https://script.google.com/macros/s/AKfycbwQD6FGVvt3R4_L5RGS8BB7yapJlE8S9gd4E8HyJRI/exec",
  "browser": "chromium",
  "headless": false,
  "timeout": 30000,
  "capabilities": ["screenshot", "pdf", "accessibility", "files", "history", "wait", "tabs"]
}
```

## 📊 DATA STRUCTURE

### 📋 **Master Data Sheet Format**
- **Students Sheet**: Contains student information with LT Teacher and IT Teacher columns
- **Teachers Sheet**: Auto-generated from student data, shows teacher-class relationships
- **Status Column**: Uses formula `=IF(AND(A2<>"", B2<>""), "在學", "")` for automatic status filling

### 🧮 **Grade Calculation Formula**
```javascript
// Weighted semester grade calculation
Semester Grade = (Formative×0.15 + Summative×0.2 + Final×0.1) ÷ 0.45
```

## 🚀 DEPLOYMENT OPTIONS

### 🌐 **Option A: Web App Deployment (Recommended)**
1. Deploy as web app from Google Apps Script
2. Set execution as "Me" and access to "Anyone"
3. Provides standalone URL for dashboard access

### 📋 **Option B: Traditional Menu System**
1. Install script in Google Apps Script
2. Access through custom menu in Google Sheets
3. Menu appears as "📊 Gradebook System | 成績簿系統"

## ⚠️ IMPORTANT NOTES

### 🚫 **Function Restrictions**
- **NEVER run `onOpen` in Apps Script editor** - it only works when opening Google Sheets
- Use `initializeSystem` for manual initialization in the editor
- Dashboard functions (ending with `FromDashboard`) should only be used in Google Sheets cells

### 📁 **File Organization**
- Each teacher receives ONE gradebook file with multiple class sheets
- System automatically creates folder structure in Google Drive
- Progress reports are saved automatically to dedicated folders

### 🌐 **Bilingual Interface**
- All user-facing text appears in both English and Traditional Chinese
- Error messages and system responses are bilingual
- Documentation and comments maintain dual-language format

## 🔄 COMMON WORKFLOWS

### 🎯 **Initial Setup**
1. Configure `MAIN_FOLDER_ID` in Code.gs
2. Deploy to Google Apps Script
3. Run `initializeSystem` or use dashboard initialization
4. Grant necessary Google Drive permissions

### 👥 **Adding Students/Teachers**
1. Update Students sheet with student data including teacher assignments
2. Teachers are automatically extracted from LT Teacher/IT Teacher columns
3. Run batch creation to generate teacher gradebooks

### 📈 **Progress Monitoring**
- Use dashboard or menu system to check progress
- Color-coded indicators: 🟢 Excellent (≥90%), 🟡 Good (80-89%), 🟠 Normal (60-79%), 🔴 Behind (<60%)
- Automated weekly progress checks available

## 🚨 CRITICAL DEVELOPMENT WORKFLOW

### ⚠️ **MANDATORY VERSION CONTROL BEFORE ANY CHANGES**

**NEVER modify code without creating backups first. This is CRITICAL.**

**BEFORE making ANY modifications to the codebase:**

1. **Create Tagged Backup**
   ```bash
   # Tag current working version with timestamp
   git tag -a v$(date +%Y%m%d_%H%M%S) -m "Backup before changes: $(date)"
   git push origin --tags
   
   # Create timestamped backup files in dedicated folder (avoids SYSTEM_CONFIG conflicts)
   mkdir -p backups
   cp google-apps-script/Code.gs backups/Code_backup_$(date +%Y%m%d_%H%M%S).gs
   cp google-apps-script/CodeExtensions.gs backups/CodeExtensions_backup_$(date +%Y%m%d_%H%M%S).gs
   ```

2. **Document Current State**
   ```bash
   # Create or update version log
   echo "=== BACKUP LOG $(date) ===" >> VERSION_LOG.md
   echo "Lines of code before changes:" >> VERSION_LOG.md
   wc -l google-apps-script/*.gs >> VERSION_LOG.md
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

### 🔄 **Mandatory Steps for Every Code Update**

1. **Always Deploy After Changes**
   ```bash
   # Execute deployment script after every modification
   ./scripts/deploy.sh
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

### 🛠️ **Error Handling Best Practices**

1. **Dashboard Function Returns**
   - Always return structured objects: `{success: true/false, data/error: ...}`
   - Include meaningful error messages in both languages
   - Provide debugging information when errors occur

2. **File Name Flexibility**
   - Support multiple possible file naming patterns
   - Include file listing in error messages for debugging
   - Use try-catch blocks with fallback options

### 🧪 **Testing Workflow**

1. **Add temporary test functions for debugging**
2. **Test functionality thoroughly**
3. **Remove all test code once confirmed working**
4. **Execute `./scripts/deploy.sh` to push clean code**
5. **Verify functionality in live environment**

### 🐛 **Common Issues Prevention**

- **Error 400**: Usually caused by outdated code in Google Apps Script
  - Solution: Always run `./scripts/deploy.sh` after changes
- **File Not Found**: Master Data or system files missing
  - Solution: Check file names and folder structure
  - Use enhanced error messages to identify actual file names
- **Permission Issues**: Google Apps Script lacks Drive access
  - Solution: Re-authorize permissions in Apps Script

### ✅ **Deployment Verification**

After each `./scripts/deploy.sh`:
1. Check that all 6 files are pushed successfully
2. Test key functions in the dashboard
3. Verify error handling works correctly
4. Confirm all temporary code is removed

**Remember: Local changes are invisible to Google Apps Script until deployed!**

## 🎯 HT (Head Teacher) SYSTEM STATUS

### ✅ **COMPLETED (Ready for Production)**
- **HT Gradebook Creation**: Integrated with `batchCreateGradebooks()` 
- **Permission Control**: Complete access validation and restriction system
- **Dual-Grade Management**: G1-G2, G3-G4, G5-G6 grade group support
- **HT Assessment Management Interface**: Full UI with bilingual support
- **File Naming Convention**: `[Name] - HT [GradeGroup] [Type] - Gradebook`
- **Sync Function Core Operations**: Physical read/write to Google Sheets
- **Assessment Title Persistence**: Actual data storage and retrieval
- **HT Dashboard Integration**: Connect UI with real gradebook data

### 📋 **Key Functions Status**
```javascript
// ✅ WORKING - All functions implemented and operational
getCurrentHTContextEnhanced()           // HT identity detection
verifyHTPermissions()                   // Access control validation  
syncAssessmentTitlesByGradeGroup()      // Complete sync implementation
getAssessmentTitlesFromHTGradebook()    // Read from HT sheets
findTeacherGradebooksByGradeGroup()     // Locate target gradebooks  
applyAssessmentTitlesToGradebook()      // Write to teacher gradebooks
```

### 🚀 **Usage Instructions**

#### **For Production Use**
1. Run `batchCreateGradebooks()` to create all gradebooks including HT versions
2. HT teachers will receive enhanced gradebooks with Assessment Management sheets
3. Permission system automatically restricts HT access to their grade groups only
4. All sync functions fully operational via Web App deployment

#### **For Development**
1. HT Dashboard fully functional via Web App deployment
2. All sync functions implemented and operational
3. Console warnings are cosmetic and do not affect functionality

### 🎯 **Next Development Priority**
1. **MEDIUM**: Resolve Web App console warnings (cosmetic only)
2. **LOW**: Performance optimization for large-scale operations
3. **LOW**: Enhanced audit logging and reporting features

**Note**: HT system is now fully functional in production with complete sync operations and Web App integration.

## 🚨 TECHNICAL DEBT PREVENTION

### ❌ **WRONG APPROACH (Creates Technical Debt)**:
```bash
# Creating new file without searching first
Write(file_path="new_feature.py", content="...")
```

### ✅ **CORRECT APPROACH (Prevents Technical Debt)**:
```bash
# 1. SEARCH FIRST
Grep(pattern="feature.*implementation", include="*.py")
# 2. READ EXISTING FILES  
Read(file_path="existing_feature.py")
# 3. EXTEND EXISTING FUNCTIONALITY
Edit(file_path="existing_feature.py", old_string="...", new_string="...")
```

### 🧹 **DEBT PREVENTION WORKFLOW**

#### Before Creating ANY New File:
1. **🔍 Search First** - Use Grep/Glob to find existing implementations
2. **📋 Analyze Existing** - Read and understand current patterns
3. **🤔 Decision Tree**: Can extend existing? → DO IT | Must create new? → Document why
4. **✅ Follow Patterns** - Use established project patterns
5. **📈 Validate** - Ensure no duplication or technical debt

## 🎯 RULE COMPLIANCE CHECK

Before starting ANY task, verify:
- [ ] ✅ I acknowledge all critical rules above
- [ ] Files go in proper module structure (not root)
- [ ] Use Task agents for >30 second operations
- [ ] TodoWrite for 3+ step tasks
- [ ] Commit after each completed task
- [ ] Deploy after code changes
- [ ] Clean up test code after testing

## 📚 NEED HELP? START HERE

### 🎯 **Essential Documentation**
- **README.md**: Project overview and quick start
- **README-MCP.md**: MCP testing configuration and usage
- **DEPLOYMENT-ANALYSIS.md**: Deployment analysis and guidance
- **This CLAUDE.md**: Development rules and workflows

### 🛠️ **Common Issues & Solutions**
- **Browser not opening in MCP**: Check MCP server connection with `claude mcp list`
- **Tests failing**: Verify Google Apps Script public access configuration
- **Deployment issues**: Ensure `./scripts/deploy.sh` runs after code changes
- **HT permissions**: Check grade group assignments in Master Data

### 🎯 **Template Credits**
```
🎯 Template structure by Chang Ho Chien | HC AI 說人話channel | v1.0.0
📺 Tutorial: https://youtu.be/8Q1bRZaHH24
```

---

**⚠️ Prevention is better than consolidation - build clean from the start.**  
**🎯 Focus on single source of truth and extending existing functionality.**  
**📈 Each task should maintain clean architecture and prevent technical debt.**  
**🚀 Remember: Local changes are invisible to Google Apps Script until deployed!**

---

*Gradebook System v2.0 | Google Apps Script + MCP Testing | Bilingual Support | HT Dashboard Integration*