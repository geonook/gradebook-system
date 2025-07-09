# 📊 Gradebook Management System | 成績簿管理系統

*Complete Google-based gradebook solution with dashboard and bilingual support*  
*完全基於 Google 的成績管理解決方案，含控制台和雙語支援*

## 🎯 Features | 功能特色

### 🌟 100% Google Ecosystem | 純 Google 生態系統
- ✅ **Google Apps Script** - All automation logic | 所有自動化邏輯
- ✅ **Google Sheets** - Data storage and interface | 資料儲存和操作介面  
- ✅ **Google Drive** - File organization | 檔案組織和權限管理
- ✅ **Dashboard** - Central control panel | 中央控制台
- ✅ **Bilingual Support** - English + Traditional Chinese | 雙語支援

### 🚀 Key Capabilities | 核心功能
- 🏠 **Unified Dashboard** - Single control panel for all operations | 統一控制台
- 📋 **Teacher-Centric Gradebooks** - One file per teacher with multiple class sheets | 以老師為中心的成績簿，每位老師一個檔案含多個班級工作表
- 🎯 **Auto Teacher Extraction** - Automatically extract teachers from student data | 自動從學生資料提取老師資訊
- 📊 **Batch Creation** - Create all teacher gradebooks at once | 一鍵批量建立所有老師成績簿
- 🧮 **Auto Calculation** - Weighted grade formulas pre-configured | 預先設定的加權成績計算公式
- 🎨 **Professional Format** - Standardized, beautiful layouts | 專業標準化格式

## 📁 Project Structure | 專案結構

```
gradebook-system/
├── README.md                    # Complete documentation | 完整說明文件
├── CLAUDE.md                    # Claude Code development guide | Claude Code 開發指南
├── FILE_GUIDE.md               # File navigation guide | 檔案導覽指南
├── config/                     # Configuration management | 配置管理
│   ├── environment.js          # Centralized configuration | 集中化配置
│   └── README.md               # Configuration documentation | 配置文檔
├── google-apps-script/         # Google Apps Script files | Google Apps Script 檔案
│   ├── Code.gs                 # Complete system logic | 完整系統邏輯
│   ├── CodeExtensions.gs       # HT system extensions | HT 系統擴展
│   ├── config-loader.gs        # Configuration loader | 配置載入器
│   ├── dashboard.html          # Modern HTML dashboard | 現代化 HTML 控制台
│   └── dashboard_for_HT.html   # HT Dashboard | HT 控制台
├── scripts/                    # Deployment scripts | 部署腳本
│   ├── deploy.sh               # Main deployment script | 主要部署腳本
│   ├── deploy-production.sh    # Production deployment | 生產環境部署
│   ├── deploy-test.sh          # Test deployment | 測試環境部署
│   └── git-workflow.sh         # Git workflow management | Git 工作流程管理
├── tests/                      # Test files | 測試檔案
│   ├── dashboard.spec.js       # Dashboard tests | 控制台測試
│   └── ai-generated/           # AI-generated tests | AI 生成測試
├── docs/                       # Documentation | 文檔
│   ├── HT_DEVELOPMENT_STATUS.md # HT system status | HT 系統狀態
│   └── WEB_APP_DEPLOYMENT_GUIDE.md # Deployment guide | 部署指南
└── backups/                    # Code backups | 代碼備份
```

**That's it! Only 3 files needed. | 就這樣！只需要 3 個檔案。**

## 🚀 Quick Start | 快速開始

### 🌟 Two Deployment Options | 兩種部署方式

#### 🔥 Option A: Deploy as Web App (Recommended) | 方式A：部署為網頁應用程式（推薦）
**Get a dedicated URL for your HTML Dashboard! | 為您的 HTML 控制台取得專用網址！**

**📋 Deployment Steps | 部署步驟：**

1. **Create Project | 建立專案**
   - Go to https://script.google.com/
   - Click "New Project" | 點擊「新增專案」
   - Rename to: `Gradebook System Dashboard`

2. **Add Files | 新增檔案**
   - **Code.gs**: Copy all content from `google-apps-script/Code.gs`
   - **dashboard.html**: Click "+" → "HTML" → Name it `dashboard` → Copy content
   - **Configure Folder ID | 設定資料夾ID**: Line 21 in Code.gs
     ```javascript
     MAIN_FOLDER_ID: 'YOUR_GOOGLE_DRIVE_FOLDER_ID'
     ```

3. **Deploy as Web App | 部署為網頁應用程式**
   - Click "Deploy" → "New deployment" | 點擊「部署」→「新增部署」
   - Select "Web app" | 選擇「網頁應用程式」
   - Settings | 設定:
     - Execute as: Me | 執行身分：我
     - Who has access: Anyone | 存取權限：任何人
   - Click "Deploy" | 點擊「部署」
   - **Copy the Web app URL** | **複製網頁應用程式URL**

4. **Authorize | 授權**
   - Open your Dashboard URL | 開啟控制台URL
   - Click "Review permissions" → "Allow" | 點擊「檢閱權限」→「允許」
   - Done! | 完成！

**Benefits | 優勢:**
- ✅ **Standalone web application** | **獨立網頁應用程式**
- ✅ **Professional URL** | **專業網址**
- ✅ **Easy to bookmark and share** | **容易加入書籤和分享**
- ✅ **No need to open Google Sheets** | **無需開啟 Google Sheets**
- ✅ **Mobile-friendly access** | **行動裝置友善存取**

#### ⚙️ Option B: Traditional Setup | 方式B：傳統設定

### Step 1: Setup Google Apps Script | 步驟一：設定 Google Apps Script

1. **Create New Project | 建立新專案**
   - Go to https://script.google.com/
   - Click "New Project" | 點擊「新增專案」
   - Rename to: `Gradebook System` | 重新命名為：`成績簿管理系統`

2. **Copy Code & Configure | 複製程式碼並配置**
   - Delete all content in `Code.gs` | 刪除 `Code.gs` 中的所有內容
   - Copy all content from `google-apps-script/Code.gs` | 複製 `google-apps-script/Code.gs` 的全部內容
   - Paste into the editor | 貼上到編輯器中
   - **🔑 IMPORTANT | 重要：**
     ```javascript
     // Line 21: Replace with your Google Drive folder ID
     // 第21行：替換為您的 Google Drive 資料夾 ID
     MAIN_FOLDER_ID: 'YOUR_FOLDER_ID_HERE'
     ```
   - Save the file | 儲存檔案

3. **Add HTML Dashboard | 加入 HTML 控制台**
   - Click the "+" button and select "HTML" | 點擊「+」按鈕並選擇「HTML」
   - Name it: `dashboard` | 命名為：`dashboard`
   - Delete all content in the HTML file | 刪除 HTML 檔案中的所有內容
   - Copy all content from `google-apps-script/dashboard.html` | 複製 `google-apps-script/dashboard.html` 的全部內容
   - Paste into the HTML editor | 貼上到 HTML 編輯器中
   - Save the file | 儲存檔案

4. **How to Get Folder ID | 如何取得資料夾 ID**
   - Open your Google Drive folder | 開啟您的 Google Drive 資料夾
   - Copy the URL from address bar | 複製網址列的 URL
   - Extract ID from: `https://drive.google.com/drive/folders/YOUR_FOLDER_ID`
   - Example | 範例: `1w_UJnNthBkcP8wgyrF3rz2St0jZTPZzB`

### Step 2: Initialize System | 步驟二：初始化系統

You have **TWO OPTIONS** to initialize the system | 您有**兩種方式**可以初始化系統：

#### 🏠 Option A: Easy Dashboard Method (Recommended) | 方式A：簡易控制台方式（推薦）

1. **Open Dashboard First | 先開啟控制台**
   - Open any Google Sheets | 開啟任意 Google Sheets
   - Look for menu: `📊 Gradebook System | 成績簿系統`
   - Click: `🏠 Dashboard | 控制台`
   - Dashboard will open | 控制台會開啟

2. **Initialize from Dashboard | 從控制台初始化**
   - In the dashboard, find the execution area | 在控制台中找到執行區域
   - Click any empty cell under "🚀 INITIALIZE" | 點擊「🚀 INITIALIZE」下方的任意空白格子
   - Type: `=initializeSystemFromDashboard()` | 輸入：`=initializeSystemFromDashboard()`
   - Press Enter | 按 Enter 鍵
   - Wait for authorization popup | 等待授權彈窗
   - Grant permissions when prompted | 出現提示時授權權限
   - System will initialize automatically! | 系統會自動初始化！

#### ⚙️ Option B: Apps Script Editor Method | 方式B：Apps Script 編輯器方式

⚠️ **Important | 重要提醒**: Do NOT run `onOpen` function in Apps Script editor! | 不要在 Apps Script 編輯器中執行 `onOpen` 函數！

1. **Run Initialization | 執行初始化**
   - In the function dropdown, select: `initializeSystem` | 在函數下拉選單中選擇：`initializeSystem`
   - **DO NOT select `onOpen`** | **不要選擇 `onOpen`**
   - Click "Run" button | 點擊「執行」按鈕

2. **Grant Permissions | 授權權限**
   - Click "Review permissions" | 點擊「檢閱權限」
   - Choose your Google account | 選擇您的 Google 帳號
   - Click "Advanced" → "Go to Gradebook System (unsafe)" | 點擊「進階」→「前往 Gradebook System（不安全）」
   - Click "Allow" | 點擊「允許」

3. **Complete Setup | 完成設定**
   - Run `initializeSystem` again | 再次執行 `initializeSystem`
   - Wait 1-2 minutes for completion | 等待 1-2 分鐘完成
   - Check success message with folder links | 檢查成功訊息和資料夾連結

### Step 3: Test System | 步驟三：測試系統

1. **Access Menu System | 存取選單系統**
   - Open any Google Sheets | 開啟任意 Google Sheets
   - Refresh the page | 重新整理頁面
   - Look for menu: `📊 Gradebook System | 成績簿系統`
   - The `onOpen` function will automatically create the menu | `onOpen` 函數會自動建立選單

2. **Access Dashboard | 開啟控制台**
   - Click: `🏠 Dashboard | 控制台`
   - Dashboard will open with system overview | 控制台將開啟並顯示系統總覽

3. **Common Functions | 常用功能**
   - Use menu to access all system functions | 使用選單存取所有系統功能
   - Dashboard provides quick overview | 控制台提供快速總覽
   - All operations are bilingual | 所有操作都是雙語顯示

## 📋 Complete Workflow | 完整工作流程

### 🎯 Three Simple Steps | 簡單三步驟

**Step 1: Prepare Data | 準備資料**
```
Menu → 🏗️ System Management → 📋 Open Master Data
在 Students 工作表填入學生資料（重點：LT Teacher 和 IT Teacher 欄位）
老師資料會自動從學生資料中提取，無需手動輸入
```

**Step 2: Batch Create | 批量建立**
```
Menu → 👨‍🏫 Teacher Management → 📋 Batch Create Gradebooks
系統自動提取老師資料並顯示清單
確認老師清單，點擊「是」開始建立
每位老師獲得一個成績簿檔案，包含其教授的所有班級工作表
```

**Step 3: Monitor Progress | 監控進度**
```
Menu → 📊 Progress Management → 📈 Check All Progress
查看所有老師的成績填寫進度
系統自動生成詳細報告
```

## 🏠 HTML Dashboard Features | HTML 控制台功能

**🎉 NEW: Modern HTML Dashboard with beautiful interface!**
**🎉 新功能：現代化 HTML 控制台，擁有美觀介面！**

The HTML Dashboard provides a modern, user-friendly control center for your entire gradebook system:
HTML 控制台為整個成績簿系統提供現代化、使用者友善的控制中心：

### 🎨 Modern Web Interface | 現代化網頁介面
- **Beautiful responsive design** | **美觀響應式設計**
- **Intuitive button-based controls** | **直觀的按鈕式控制**
- **Real-time status indicators** | **即時狀態指示器**
- **Professional gradient styling** | **專業漸層樣式**
- **Mobile-friendly layout** | **行動裝置友善布局**

### 📊 Dashboard Components | 控制台組件

#### 1. System Status Card | 系統狀態卡片
- System health with color indicators | 帶彩色指示器的系統健康度
- Last updated timestamp | 最後更新時間戳
- Current semester and version info | 目前學期和版本資訊

#### 2. Quick Statistics Card | 快速統計卡片
- Real-time teacher and student counts | 即時老師和學生數量
- Active gradebooks counter | 活躍成績簿計數器
- System files overview | 系統檔案總覽

#### 3. System Controls Card | 系統控制卡片
- **🚀 One-click Initialize** | **一鍵初始化**
- **📊 Status Check** | **狀態檢查**
- **🔄 Dashboard Refresh** | **控制台重新整理**
- **📁 Quick Access Links** | **快速存取連結**

#### 4. Progress Overview Card | 進度總覽卡片
- Color-coded progress indicators | 彩色進度指示器
- Teacher progress distribution | 老師進度分布
- Overall system progress bar | 整體系統進度條

### 🚀 Dashboard Controls | 控制台操作功能

**Yes! You can now execute system functions directly from the Dashboard!**
**是的！您現在可以直接從控制台執行系統功能！**

#### Available Dashboard Functions | 可用的控制台函數:

1. **🚀 System Initialization | 系統初始化**
   ```
   =initializeSystemFromDashboard()
   ```
   - Initialize the entire system | 初始化整個系統
   - Create all folders and files | 建立所有資料夾和檔案
   - No need to use Apps Script editor! | 無需使用 Apps Script 編輯器！

2. **📊 System Status Check | 系統狀態檢查**
   ```
   =checkSystemStatusFromDashboard()
   ```
   - Get real-time system statistics | 取得即時系統統計
   - Check system health | 檢查系統健康度

3. **🔄 Dashboard Refresh | 控制台重新整理**
   ```
   =refreshDashboard()
   ```
   - Update all dashboard data | 更新所有控制台資料
   - Refresh statistics | 重新整理統計數據

4. **📁 Get System Links | 取得系統連結**
   ```
   =getSystemFolderLink()    # System folder | 系統資料夾
   =getMasterDataLink()      # Master data sheet | 主控資料表
   ```

#### How to Use Dashboard Functions | 如何使用控制台函數:

1. **Open Dashboard | 開啟控制台**
   - Use menu: `🏠 Dashboard | 控制台`
   - Dashboard will open in new tab | 控制台會在新分頁開啟

2. **Execute Functions | 執行函數**
   - Click any empty cell in the execution area | 點擊執行區域中的任意空白格子
   - Type the function formula (e.g., `=initializeSystemFromDashboard()`) | 輸入函數公式
   - Press Enter | 按 Enter 鍵
   - Result will appear directly in the cell! | 結果會直接顯示在格子中！

3. **No More Apps Script Editor Needed! | 不再需要 Apps Script 編輯器！**
   - All initialization can be done from Dashboard | 所有初始化都可從控制台完成
   - User-friendly interface | 使用者友善介面
   - Real-time feedback | 即時回饋

### 📈 Progress Dashboard | 進度儀表板
- Real-time progress indicators | 即時進度指示器
- Color-coded status (🟢🟡🟠🔴) | 彩色狀態指示
- Completion percentages | 完成百分比
- Teacher ranking by progress | 老師進度排行

### 🎛️ Quick Actions | 快速操作
- Interactive formula-based controls | 互動式公式控制
- Direct system management | 直接系統管理
- No technical knowledge required | 無需技術知識
- Instant results and feedback | 即時結果和回饋

## 📊 Menu System | 選單系統

### 🏗️ System Management | 系統管理
- 🚀 **Initialize System** | 初始化系統
- 📁 **Open System Folder** | 開啟系統資料夾
- 📋 **Open Master Data** | 開啟主控資料表
- ⚙️ **System Settings** | 系統設定
- 🔄 **System Backup** | 系統備份

### 👨‍🏫 Teacher Management | 老師管理  
- 📋 **Batch Create Gradebooks** | 批量建立成績簿 ⭐
- ➕ **Create Single Gradebook** | 新增單一老師成績簿
- 📊 **Check All Gradebooks** | 檢查所有老師成績簿

### 📊 Progress Management | 進度管理
- 📈 **Check All Progress** | 檢查全體進度
- 📋 **Generate Detailed Report** | 生成詳細報告
- 📧 **Send Progress Reminders** | 發送進度提醒

### 📚 Student Management | 學生管理
- 📥 **Import Student Data** | 匯入學生資料
- 📤 **Export Student Data** | 匯出學生資料
- ✏️ **Quick Add Student** | 快速新增學生

### 📋 Template Management | 範本管理
- 📄 **Update Gradebook Templates** | 更新成績簿範本
- 🎨 **Beautify Gradebooks** | 美化成績簿格式
- 🔧 **Repair Damaged Sheets** | 修復損壞格式

## 📊 Master Data Format | 主控資料格式

### Students Sheet | 學生工作表
| Column | English Header | Chinese Header | Example | Required | Notes |
|--------|---------------|----------------|---------|----------|-------|
| A | Student ID | 學生編號 | LE11020 | ✅ | |
| B | Student Name | 學生姓名 | Emily Lee | ✅ | |
| C | English Name | 英文姓名 | Emily | ✅ | |
| D | Grade | 年級 | G3 | ✅ | |
| E | Homeroom | 班級 | 304 | ✅ | |
| F | English Class | 英文班級 | G3 Achievers | ✅ | |
| G | LT Teacher | LT老師 | Mr.Jason | ✅ | |
| H | IT Teacher | IT老師 | Ms.Smith |  | |
| I | Email | 電子郵件 | emily@school.edu |  | |
| J | Status | 狀態 | 在學 | ✅ | Auto-fills to "在學" when data exists |

**📝 Status Column Features | 狀態欄位功能：**
- ✅ **Auto-fill "在學"** | **自動填入"在學"** - When Student ID and Name are provided
- ✅ **Manual override** | **手動覆寫** - Change to "離校" when student leaves  
- ✅ **Data validation** | **資料驗證** - Only allows "在學" or "離校"
- ✅ **Formula preserved** | **公式保留** - Manual changes are maintained

### Auto-Generated Teachers Sheet | 自動生成老師工作表

**🚀 NEW: Teachers are automatically extracted from student data!**
**🚀 新功能：老師資訊從學生資料中自動提取！**

| Column | English Header | Chinese Header | Example | Auto-Generated |
|--------|---------------|----------------|---------|-----------------|
| A | Teacher Name | 老師姓名 | Mr. Alvin | ✅ |
| B | Subject | 科目 | LT (Local Teacher) | ✅ |
| C | Classes | 班級 | G1 Achievers, G2 Builders | ✅ |
| D | Student Count | 學生數量 | 25 | ✅ |
| E | Last Updated | 最後更新 | 2024-12-20 10:30:00 | ✅ |
| F | Status | 狀態 | Active | ✅ |

**🔑 How It Works | 運作方式：**

1. **📖 System scans Students sheet** | **系統掃描學生工作表**
   - Looks for `LT Teacher` and `IT Teacher` columns | 尋找 `LT Teacher` 和 `IT Teacher` 欄位
   - Example: Mr. Alvin (LT), Ms. Xwayi (IT) | 範例：Mr. Alvin (LT), Ms. Xwayi (IT)

2. **🔄 Auto-extracts unique teachers** | **自動提取唯一老師**
   - Each teacher gets separate entries for LT and IT | 每位老師的 LT 和 IT 分別建立條目
   - Groups students by English Class | 按英文班級分組學生

3. **📊 Creates teacher-centric gradebooks** | **建立以老師為中心的成績簿**
   - Each teacher gets ONE gradebook file | 每位老師獲得一個成績簿檔案
   - Multiple class sheets within each teacher's gradebook | 每位老師的成績簿內含多個班級工作表
   - Example: Mr. Alvin's gradebook contains sheets for all classes he teaches | 範例：Mr. Alvin 的成績簿包含他教授的所有班級工作表

4. **🔄 Updates automatically** | **自動更新**
   - Click "Update Teachers" in Dashboard | 在控制台點擊「更新老師資料」
   - Teachers list refreshes based on current student data | 老師清單根據目前學生資料重新整理

**🎯 Benefits | 優勢：**
- ✅ **No manual teacher entry** | **無需手動輸入老師**
- ✅ **Teacher-centric organization** | **以老師為中心的組織方式**
- ✅ **One file per teacher** | **每位老師一個檔案**
- ✅ **Multiple classes per file** | **每個檔案包含多個班級**
- ✅ **Automatic student assignment** | **自動學生分配**

## 🧮 Grade Calculation | 成績計算

### Assessment Structure | 評量結構
- **Formative Assessments** | 平時評量: F.A.1 to F.A.8 (8 times)
- **Summative Assessments** | 總結評量: S.A.1 to S.A.4 (4 times)  
- **Final Exam** | 期末考試: Final (1 time)

### Calculation Formula | 計算公式
```javascript
// Average only non-zero scores | 只計算非零分數平均
Formative Average = AVERAGEIF(F.A.1:F.A.8, ">0")
Summative Average = AVERAGEIF(S.A.1:S.A.4, ">0")

// Weighted semester grade | 加權學期成績
Semester Grade = (Formative×0.15 + Summative×0.2 + Final×0.1) ÷ 0.45
```

### Weight Distribution | 權重分配
- Formative Assessments | 平時評量：33.33% (15/45)
- Summative Assessments | 總結評量：44.44% (20/45)
- Final Exam | 期末考試：22.22% (10/45)

## 📊 Progress Indicators | 進度指示器

### Color System | 顏色系統
- 🟢 **Excellent (≥90%)** | 優秀 - Ahead of schedule | 進度領先
- 🟡 **Good (80-89%)** | 良好 - On track | 進度正常
- 🟠 **Normal (60-79%)** | 普通 - Needs attention | 需要關注
- 🔴 **Behind (<60%)** | 落後 - Immediate action needed | 需要立即處理

### Automated Features | 自動化功能
- ⏰ **Weekly Progress Check** | 每週進度檢查 - Monday 8:00 AM | 週一早上8點
- 📊 **Auto Report Saving** | 自動報告保存 - All reports saved to Progress folder | 所有報告自動保存
- 📧 **Smart Reminders** | 智能提醒 - Coming soon | 開發中

## 🔧 System Configuration | 系統配置

You can customize the system by modifying the `SYSTEM_CONFIG` section:
您可以透過修改 `SYSTEM_CONFIG` 區段來客製化系統：

```javascript
const SYSTEM_CONFIG = {
  SEMESTER: '2425S2',              // Semester code | 學期代碼
  MAIN_FOLDER_ID: 'YOUR_ID',       // Your folder ID | 您的資料夾ID
  
  ASSESSMENTS: {
    FORMATIVE_COUNT: 8,            // Number of F.A. | 平時評量次數
    SUMMATIVE_COUNT: 4,            // Number of S.A. | 總結評量次數
    INCLUDE_FINAL: true            // Include final exam | 包含期末考
  },
  
  WEIGHTS: {
    FORMATIVE: 0.15,               // F.A. weight | 平時評量權重
    SUMMATIVE: 0.2,                // S.A. weight | 總結評量權重
    FINAL: 0.1                     // Final weight | 期末考權重
  },
  
  PROGRESS: {
    EXCELLENT: 90,                 // Excellent threshold | 優秀標準
    GOOD: 80,                      // Good threshold | 良好標準
    NORMAL: 60                     // Normal threshold | 普通標準
  }
};
```

## 🔧 Troubleshooting | 故障排除

### Q: Error when running onOpen? | 執行 onOpen 時出錯？
A: 
**DO NOT run `onOpen` in Apps Script editor!** | **不要在 Apps Script 編輯器中執行 `onOpen`！**
- `onOpen` only works when opening Google Sheets | `onOpen` 只在開啟 Google Sheets 時有效
- Run `initializeSystem` instead in Apps Script editor | 在 Apps Script 編輯器中改為執行 `initializeSystem`
- `onOpen` will automatically work when you open any Google Sheets | 開啟任意 Google Sheets 時 `onOpen` 會自動工作

### Q: Menu not showing? | 選單沒有顯示？
A: 
1. Refresh Google Sheets page | 重新整理 Google Sheets 頁面
2. Verify code copied correctly | 確認程式碼複製正確
3. Check permissions granted | 檢查權限已授權
4. Make sure you initialized the system first | 確保已先初始化系統

### Q: Batch creation failed? | 批量建立失敗？
A:
1. Check LT Teacher field filled correctly | 檢查 LT Teacher 欄位填寫正確
2. Verify Google Sheets ID correct | 確認 Google Sheets ID 正確
3. Ensure sufficient Google Drive storage | 確保 Google Drive 儲存空間足夠

### Q: Need to modify assessment counts? | 需要修改評量次數？
A: 
1. Find `SYSTEM_CONFIG` in Google Apps Script | 在 Google Apps Script 中找到 `SYSTEM_CONFIG`
2. Modify `FORMATIVE_COUNT` and `SUMMATIVE_COUNT` | 修改 `FORMATIVE_COUNT` 和 `SUMMATIVE_COUNT`
3. Save and re-run batch creation | 儲存後重新執行批量建立

## 🎯 System Advantages | 系統優勢

### For Administrators | 對管理者
- ⏰ **Time Saving** | 節省時間 - Batch creation vs manual setup | 批量建立 vs 手動設定
- 🎯 **Consistency** | 一致性 - All gradebooks use same format | 所有成績簿使用相同格式
- 📊 **Real-time Monitoring** | 即時監控 - Track all teachers' progress | 追蹤所有老師進度
- 🔄 **Automation** | 自動化 - Reduce repetitive tasks | 減少重複性工作

### For Teachers | 對老師  
- 📝 **Familiar Interface** | 熟悉介面 - Continue using Google Sheets | 繼續使用 Google Sheets
- ✅ **Pre-populated Data** | 預填資料 - Student lists ready | 學生名單已準備
- 🧮 **Auto Calculation** | 自動計算 - Complex formulas pre-configured | 複雜公式已設定
- 🎨 **Professional Look** | 專業外觀 - Standardized beautiful design | 標準化美觀設計

### For Schools | 對學校
- 📈 **Efficiency** | 效率提升 - Dramatically reduce time costs | 大幅降低時間成本
- 🎯 **Quality** | 品質保證 - Standardized process reduces errors | 標準化流程減少錯誤
- 📊 **Analytics** | 數據分析 - Uniform format for analysis | 統一格式便於分析
- 🔒 **Security** | 安全性 - Google Cloud storage | Google 雲端儲存

## 📞 Support | 技術支援

### System Requirements | 系統需求
- Google Account | Google 帳號
- Chrome or Edge browser | Chrome 或 Edge 瀏覽器
- Internet connection | 網路連線

### Getting Help | 取得協助
- System issues | 系統問題: Contact system administrator | 聯繫系統管理員
- Usage questions | 使用疑問: Check built-in user guide | 查看內建使用說明
- Feature requests | 功能建議: Submit improvement suggestions | 提交改進建議

---

## 🎉 Ready to Transform Your Gradebook Management? | 準備改革您的成績管理？

**Complete, Free, Zero-Maintenance Solution! | 完整、免費、零維護解決方案！**

1. **Copy one file** | 複製一個檔案 - `Code.gs`
2. **Follow three steps** | 遵循三個步驟 - Setup → Authorize → Initialize | 設定 → 授權 → 初始化
3. **Enjoy efficiency** | 享受效率 - Professional gradebook management | 專業成績管理

**🎓 Make gradebook management effortless and enjoyable! | 讓成績管理變得輕鬆愉快！**

---

**Version | 版本**: Teacher-Centric Gradebook System v3.1  
**Updated | 更新日期**: 2024-12-20  
**Architecture | 技術架構**: 100% Google Ecosystem with Teacher-Centric Structure | 100% Google 生態系統含以老師為中心的結構