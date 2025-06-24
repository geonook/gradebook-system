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

### Google Apps Script Development
- No traditional build/test commands - development happens in the Google Apps Script editor
- Deploy as web app: Deploy → New deployment → Web app
- Test functions: Use Apps Script editor's built-in function runner

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