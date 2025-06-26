# Gradebook Management System - Complete Specification
# 成績簿管理系統 - 完整規格書

## 📋 Table of Contents | 目錄

1. [Project Overview | 專案概述](#project-overview)
2. [System Architecture | 系統架構](#system-architecture)
3. [Core Features | 核心功能](#core-features)
4. [Technical Stack | 技術堆疊](#technical-stack)
5. [Data Structure | 資料結構](#data-structure)
6. [User Interface | 用戶介面](#user-interface)
7. [Security & Permissions | 安全與權限](#security)
8. [Deployment Strategy | 部署策略](#deployment)
9. [Development Workflow | 開發流程](#development-workflow)
10. [Future Roadmap | 未來規劃](#roadmap)

---

## 🎯 Project Overview | 專案概述

### Vision | 願景
Create a comprehensive, bilingual gradebook management system that operates entirely within the Google ecosystem, providing educators with powerful tools for student assessment, grade calculation, and progress tracking.

建立一個全面的雙語成績簿管理系統，完全在Google生態系統內運作，為教育工作者提供學生評量、成績計算和進度追蹤的強大工具。

### Goals | 目標
- **100% Google-based**: No external dependencies beyond Google Workspace
- **Bilingual Support**: Full Chinese-English interface
- **Teacher-Centric**: Each teacher gets customized gradebooks for their classes
- **Automated Calculations**: Smart formulas for grade computation
- **Progressive Enhancement**: Modern web dashboard with fallback to menu system

### Target Users | 目標用戶
- **Primary**: Subject teachers (LT/IT teachers)
- **Secondary**: Head teachers (HT) and administrators
- **Tertiary**: Students and parents (view-only access)

---

## 🏗️ System Architecture | 系統架構

### Core Components | 核心組件

```
📊 Gradebook System
├── 🎛️ Dashboard (HTML/CSS/JS)
│   ├── System Controls
│   ├── Statistics Overview
│   └── Quick Actions
├── 📋 Master Data (Google Sheets)
│   ├── Students Sheet
│   ├── Classes Sheet
│   ├── Auto-Generated Teachers
│   └── HT Teachers
├── 📚 Teacher Gradebooks (Individual Sheets)
│   ├── Teacher Info
│   └── Class Sheets (per class)
├── ⚙️ Google Apps Script Engine
│   ├── Core Functions (Code.gs)
│   ├── Extensions (CodeExtensions.gs)
│   └── Automation Triggers
└── 📁 Google Drive Structure
    ├── System Folder
    ├── Teacher Gradebooks
    ├── Templates
    ├── Reports
    └── Backups
```

### Data Flow | 資料流

1. **Input**: Student data → Master Data sheet
2. **Processing**: Apps Script extracts teacher assignments
3. **Generation**: Auto-create teacher gradebooks with class sheets
4. **Usage**: Teachers input grades → Formulas calculate results
5. **Monitoring**: Dashboard displays progress and statistics

---

## ⭐ Core Features | 核心功能

### 1. System Management | 系統管理
- **One-click Initialization**: Complete system setup
- **Folder Structure Creation**: Organized Google Drive hierarchy
- **Permission Management**: Secure access controls
- **Backup & Recovery**: Automated data protection

### 2. Teacher Management | 教師管理
- **Auto-extraction**: Teachers identified from student data
- **Gradebook Generation**: Automated creation of teacher-specific files
- **Class Assignment**: Smart mapping of teachers to classes
- **Progress Tracking**: Real-time completion monitoring

### 3. Student Assessment | 學生評量
- **Flexible Assessment Types**:
  - Formative Assessments (F.A.1-8)
  - Summative Assessments (S.A.1-4)
  - Final Examinations
- **Grade Calculation**: Weighted semester grades
- **Letter Grades**: Automatic A-F conversion
- **Status Tracking**: Active/inactive student management

### 4. Grade Computation | 成績計算
- **Weighted Averages**: Configurable assessment weights
- **Formula Protection**: Prevent accidental modifications
- **Real-time Updates**: Instant recalculation
- **Error Handling**: Graceful handling of missing data

### 5. Assessment Title Management | 評量標題管理
- **Level-based Configuration**: G1E1, G1E2, etc.
- **Teacher Type Support**: Separate LT/IT configurations
- **Batch Updates**: Sync titles across gradebooks
- **Custom Titles**: Beyond default F.A./S.A. naming

---

## 💻 Technical Stack | 技術堆疊

### Platform | 平台
- **Google Apps Script**: Server-side JavaScript runtime
- **Google Sheets**: Data storage and computation
- **Google Drive**: File management and organization
- **Google HTML Service**: Web interface rendering

### Languages | 程式語言
- **JavaScript**: Primary development language
- **HTML5**: Dashboard structure
- **CSS3**: Styling and responsive design
- **Google Apps Script API**: Platform integration

### Tools & Services | 工具與服務
- **clasp**: Command-line deployment tool
- **Git**: Version control system
- **GitHub**: Code repository hosting
- **Google Workspace**: Complete ecosystem integration

---

## 📊 Data Structure | 資料結構

### Master Data Schema | 主控資料結構

#### Students Sheet | 學生工作表
```
Column A: Student ID | 學生編號 (LE11001)
Column B: Student Name | 學生姓名
Column C: English Name | 英文姓名
Column D: Grade | 年級 (G1-G6)
Column E: Homeroom | 班級 (104, 201, etc.)
Column F: English Class | 英文班級 (G1 Achievers, G2 Builders)
Column G: LT Teacher | LT老師
Column H: IT Teacher | IT老師
Column I: Email | 電子郵件
Column J: Status | 狀態 (在學/離校)
```

#### Classes Sheet | 班級工作表
```
Column A: Class Name | 班級名稱
Column B: LT Teacher | LT老師
Column C: IT Teacher | IT老師
Column D: Level | 級別 (G1E1, G1E2, etc.)
Column E: Student Count | 學生數量
```

### Gradebook Schema | 成績簿結構

#### Class Sheet Layout | 班級工作表佈局
```
Columns A-C: Student Information (ID, Name, English Name)
Columns D-K: Formative Assessments (F.A.1-8)
Columns L-O: Summative Assessments (S.A.1-4)
Column P: Final Exam | 期末考
Column Q: F.A. Average | 平時平均
Column R: S.A. Average | 總結平均
Column S: Semester Grade | 學期成績
Column T: Letter Grade | 等第
Column U: Notes | 備註
```

### Formula Structure | 公式結構
```javascript
// F.A. Average
=AVERAGEIF(D3:K3,">0")

// S.A. Average  
=AVERAGEIF(L3:O3,">0")

// Semester Grade (weighted)
=(Q3*0.15+R3*0.2+P3*0.1)/0.45

// Letter Grade
=IF(S3>=90,"A",IF(S3>=80,"B",IF(S3>=70,"C",IF(S3>=60,"D","F"))))
```

---

## 🎨 User Interface | 用戶介面

### Dashboard Design | 控制台設計

#### Layout | 佈局
- **Header**: System branding and navigation
- **Stats Cards**: Real-time system statistics
- **Control Panel**: System management buttons
- **Progress Overview**: Visual progress indicators
- **Quick Actions**: Frequently used functions

#### Responsive Design | 響應式設計
- **Desktop**: Full feature dashboard
- **Tablet**: Condensed layout with key functions
- **Mobile**: Essential controls only

#### Accessibility | 無障礙設計
- **Bilingual Labels**: All text in Chinese and English
- **Color Coding**: Consistent status indicators
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Semantic HTML structure

### Menu System | 選單系統
- **Fallback Interface**: When dashboard unavailable
- **Google Sheets Menu**: Native integration
- **Hierarchical Organization**: Logical function grouping
- **Context Sensitivity**: Role-based menu items

---

## 🔒 Security & Permissions | 安全與權限

### Access Control | 存取控制
- **Role-based Permissions**: Different access levels
- **File-level Security**: Google Drive native permissions
- **Function Restrictions**: Script execution limits
- **Audit Trail**: Action logging and monitoring

### Data Protection | 資料保護
- **Encryption**: Google's built-in encryption
- **Backup Strategy**: Automated versioning
- **Privacy Compliance**: Student data protection
- **Secure Sharing**: Controlled file access

### Permission Levels | 權限層級
1. **System Administrator**: Full system access
2. **Head Teacher (HT)**: Grade-level management
3. **Subject Teacher**: Own classes only
4. **Student/Parent**: Read-only access

---

## 🚀 Deployment Strategy | 部署策略

### Development Environment | 開發環境
```bash
# Local development
git clone https://github.com/geonook/gradebook-system.git
cd gradebook-system/google-apps-script
clasp login
clasp push
```

### Production Deployment | 生產部署
```bash
# Automated deployment
./deploy.sh
```

### Deployment Pipeline | 部署流水線
1. **Code Changes**: Local development
2. **Version Control**: Git commit and push
3. **Testing**: Manual verification
4. **Deployment**: clasp push to Google Apps Script
5. **Verification**: System health check

### Environment Configuration | 環境配置
```javascript
// Production settings
const SYSTEM_CONFIG = {
  MAIN_FOLDER_ID: 'production_folder_id',
  SEMESTER: '2425S2',
  ENVIRONMENT: 'production'
};
```

---

## 🔄 Development Workflow | 開發流程

### Version Control Protocol | 版本控制協議
1. **Before Changes**: Create tagged backup
2. **Development**: Feature branches for major changes
3. **Testing**: Verify functionality
4. **Cleanup**: Remove debug code
5. **Deployment**: Deploy to production
6. **Documentation**: Update specification

### Code Standards | 程式碼標準
- **Bilingual Comments**: Chinese and English
- **Function Documentation**: JSDoc format
- **Error Handling**: Comprehensive try-catch blocks
- **Logging**: Consistent console output
- **Naming Conventions**: CamelCase for functions

### Testing Strategy | 測試策略
- **Manual Testing**: Dashboard functionality
- **Integration Testing**: Apps Script functions
- **User Acceptance**: Teacher feedback
- **Performance Testing**: Large dataset handling

---

## 🗺️ Future Roadmap | 未來規劃

### Phase 1: Foundation (Current) | 第一階段：基礎
- ✅ Core system architecture
- ✅ Basic gradebook functionality
- ✅ Dashboard interface
- ✅ Teacher management

### Phase 2: Enhancement | 第二階段：增強
- 📅 Advanced reporting features
- 📅 Student progress analytics
- 📅 Parent portal integration
- 📅 Mobile app development

### Phase 3: Intelligence | 第三階段：智能化
- 📅 AI-powered grade prediction
- 📅 Automated trend analysis
- 📅 Performance recommendations
- 📅 Integration with learning management systems

### Phase 4: Ecosystem | 第四階段：生態系統
- 📅 Third-party integrations
- 📅 API development
- 📅 Multi-school support
- 📅 Educational analytics platform

---

## 📚 Technical References | 技術參考

### Google Apps Script APIs
- [Spreadsheet Service](https://developers.google.com/apps-script/reference/spreadsheet)
- [Drive Service](https://developers.google.com/apps-script/reference/drive)
- [HTML Service](https://developers.google.com/apps-script/reference/html)

### Development Tools
- [clasp CLI](https://developers.google.com/apps-script/guides/clasp)
- [Apps Script IDE](https://script.google.com)
- [Google Cloud Console](https://console.cloud.google.com)

---

## 📞 Support & Contact | 支援與聯絡

### Development Team | 開發團隊
- **Lead Developer**: Claude Code AI Assistant
- **Project Owner**: Education Technology Team
- **Repository**: [GitHub](https://github.com/geonook/gradebook-system)

### Documentation | 文件
- **Technical Docs**: CLAUDE.md
- **Version Log**: VERSION_LOG.md
- **This Specification**: SYSTEM_SPECIFICATION.md

---

*Last Updated: 2025-06-26*
*Document Version: 1.0*