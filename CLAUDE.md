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

### Auto Deployment (一鍵部署)
```bash
# 自動推送到 GitHub 和 Google Apps Script
./deploy.sh
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