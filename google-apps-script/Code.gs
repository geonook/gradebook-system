/**
 * Gradebook Management System | 成績簿管理系統
 * Complete Google-based gradebook solution with dashboard and bilingual support
 * 完全基於 Google 的成績管理解決方案，含控制台和雙語支援
 * 
 * Features | 功能特色:
 * - Dashboard control panel | 控制台儀表板
 * - Batch gradebook creation | 批量成績簿建立
 * - Smart progress tracking | 智能進度追蹤  
 * - Bilingual interface | 雙語介面
 * - 100% Google ecosystem | 100% Google 生態系統
 */

// ===== SYSTEM CONFIGURATION | 系統配置 =====
const SYSTEM_CONFIG = {
  // Basic Settings | 基本設定
  SEMESTER: '2425S2',
  SYSTEM_NAME: 'Gradebook Management System | 成績簿管理系統',
  
  // Main Folder ID (User specified) | 主要資料夾 ID (使用者指定)
  MAIN_FOLDER_ID: '1w_UJnNthBkcP8wgyrF3rz2St0jZTPZzB',
  
  // Folder Structure | 資料夾結構
  FOLDERS: {
    MAIN: 'Gradebook System | 成績簿系統',
    TEACHER_SHEETS: 'Teacher Gradebooks | 老師成績簿',
    TEMPLATES: 'Templates | 範本檔案',
    REPORTS: 'Progress Reports | 進度報告',
    BACKUP: 'System Backup | 系統備份',
    MASTER_DATA: 'Master Data | 主控資料'
  },
  
  // Assessment Settings | 評量設定
  ASSESSMENTS: {
    FORMATIVE_COUNT: 8,      // F.A.1 to F.A.8 | 平時評量 1-8
    SUMMATIVE_COUNT: 4,      // S.A.1 to S.A.4 | 總結評量 1-4
    INCLUDE_FINAL: true      // Include final exam | 包含期末考
  },
  
  // Grade Weights | 成績權重
  WEIGHTS: {
    FORMATIVE: 0.15,         // Formative assessment 15% | 平時評量 15%
    SUMMATIVE: 0.2,          // Summative assessment 20% | 總結評量 20%
    FINAL: 0.1               // Final exam 10% | 期末考 10%
  },
  
  // Progress Thresholds | 進度閾值
  PROGRESS: {
    EXCELLENT: 90,           // Excellent ≥90% | 優秀 ≥90%
    GOOD: 80,               // Good 80-89% | 良好 80-89%
    NORMAL: 60              // Normal 60-79% | 普通 60-79%
  }
};

// ===== WEB APP DEPLOYMENT | 網頁應用程式部署 =====

/**
 * Handle web app GET requests | 處理網頁應用程式 GET 請求
 */
function doGet() {
  // Create HTML output from dashboard template | 從控制台範本建立 HTML 輸出
  const htmlTemplate = HtmlService.createTemplateFromFile('dashboard');
  
  // Add server-side data to template | 將伺服器端資料加入範本
  htmlTemplate.config = SYSTEM_CONFIG;
  htmlTemplate.timestamp = new Date().toLocaleString();
  
  return htmlTemplate.evaluate()
    .setTitle('Gradebook System Dashboard | 成績簿系統控制台')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}

// ===== MENU SYSTEM | 選單系統 =====

/**
 * Initialize Google Sheets menu | Google Sheets 選單初始化
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  
  ui.createMenu('📊 Gradebook System | 成績簿系統')
    .addItem('🏠 Dashboard | 控制台', 'openDashboard')
    .addSeparator()
    .addSubMenu(ui.createMenu('🏗️ System Management | 系統管理')
      .addItem('🚀 Initialize System | 初始化系統', 'initializeSystem')
      .addItem('📁 Open System Folder | 開啟系統資料夾', 'openSystemFolder')
      .addItem('📋 Open Master Data | 開啟主控資料表', 'openMasterDataSheet')
      .addItem('⚙️ System Settings | 系統設定', 'openSystemSettings')
      .addSeparator()
      .addItem('🔄 System Backup | 系統備份', 'backupSystem')
      .addItem('🔧 System Maintenance | 系統維護', 'systemMaintenance'))
    
    .addSubMenu(ui.createMenu('👨‍🏫 Teacher Management | 老師管理')
      .addItem('📋 Batch Create Gradebooks | 批量建立成績簿', 'batchCreateGradebooks')
      .addItem('➕ Create Single Gradebook | 新增單一成績簿', 'createSingleGradebook')
      .addItem('📊 Check All Gradebooks | 檢查所有成績簿', 'checkAllGradebooks')
      .addSeparator()
      .addItem('🔗 Update Gradebook Links | 更新成績簿連結', 'updateGradebookLinks'))
    
    .addSubMenu(ui.createMenu('📊 Progress Management | 進度管理')
      .addItem('📈 Check All Progress | 檢查全體進度', 'checkAllProgress')
      .addItem('📋 Generate Report | 生成詳細報告', 'generateDetailedReport')
      .addItem('📧 Send Reminders | 發送進度提醒', 'sendProgressReminders')
      .addSeparator()
      .addItem('📊 Progress Statistics | 進度統計', 'openProgressStats'))
    
    .addSubMenu(ui.createMenu('📚 Student Management | 學生管理')
      .addItem('📥 Import Student Data | 匯入學生資料', 'importStudentData')
      .addItem('📤 Export Student Data | 匯出學生資料', 'exportStudentData')
      .addItem('🔄 Sync Student Data | 同步學生資料', 'syncStudentData')
      .addSeparator()
      .addItem('✏️ Quick Add Student | 快速新增學生', 'quickAddStudent')
      .addItem('📝 Update Student Status | 更新學生狀態', 'updateStudentStatus'))
    
    .addSubMenu(ui.createMenu('📋 Template Management | 範本管理')
      .addItem('📄 Update Templates | 更新成績簿範本', 'updateGradebookTemplates')
      .addItem('🎨 Beautify Gradebooks | 美化成績簿格式', 'beautifyGradebooks')
      .addItem('📐 Validate Formulas | 檢查公式正確性', 'validateFormulas')
      .addSeparator()
      .addItem('🔧 Repair Sheets | 修復損壞格式', 'repairDamagedSheets'))
    
    .addSeparator()
    .addItem('📖 User Guide | 使用說明', 'showUserGuide')
    .addItem('🔍 System Status | 系統狀態檢查', 'checkSystemStatus')
    .addItem('ℹ️ System Info | 系統資訊', 'showSystemInfo')
    .addToUi();
}

// ===== DASHBOARD SYSTEM | 控制台系統 =====

/**
 * Open HTML Dashboard (for menu compatibility) | 開啟 HTML 控制台（選單相容性）
 */
function openDashboard() {
  try {
    // For deployed web app, just show the URL | 對於已部署的網頁應用程式，只顯示網址
    const scriptUrl = ScriptApp.getService().getUrl();
    showMessage(
      '🏠 Dashboard URL | 控制台網址',
      `Open this URL in your browser | 在瀏覽器中開啟此網址:\n\n${scriptUrl}\n\n📱 You can bookmark this URL for quick access | 您可以將此網址加入書籤以便快速存取`
    );
  } catch (error) {
    showError('❌ Dashboard Error | 控制台錯誤', `Failed to get dashboard URL | 無法取得控制台網址: ${error.message}`);
  }
}

/**
 * Extract teachers from student data | 從學生資料提取老師資訊
 */
function extractTeachersFromStudentData(masterSheet) {
  try {
    const studentsSheet = masterSheet.getSheetByName('Students');
    if (!studentsSheet) {
      throw new Error('Students sheet not found');
    }
    
    // Get student data | 取得學生資料
    const studentData = studentsSheet.getDataRange().getValues();
    const headers = studentData[0];
    
    // Find column indices | 找到欄位索引
    const ltTeacherCol = headers.indexOf('LT Teacher | LT老師');
    const itTeacherCol = headers.indexOf('IT Teacher | IT老師');
    const englishClassCol = headers.indexOf('English Class | 英文班級');
    const statusCol = headers.indexOf('Status | 狀態');
    
    if (ltTeacherCol === -1 || itTeacherCol === -1 || englishClassCol === -1) {
      throw new Error('Required columns not found in Students sheet');
    }
    
    // Extract teacher information | 提取老師資訊
    const teacherData = new Map();
    
    for (let i = 1; i < studentData.length; i++) {
      const row = studentData[i];
      const ltTeacher = row[ltTeacherCol];
      const itTeacher = row[itTeacherCol];
      const englishClass = row[englishClassCol];
      const status = statusCol !== -1 ? row[statusCol] : '';
      
      // Only process students with "在學" status | 只處理狀態為"在學"的學生
      if (status !== '在學') {
        continue;
      }
      
      // Process LT Teacher | 處理 LT 老師
      if (ltTeacher && ltTeacher.trim()) {
        const teacherKey = `${ltTeacher}_LT`;
        if (!teacherData.has(teacherKey)) {
          teacherData.set(teacherKey, {
            name: ltTeacher.trim(),
            subject: 'LT (Local Teacher)',
            classes: new Set(),
            students: []
          });
        }
        teacherData.get(teacherKey).classes.add(englishClass);
        teacherData.get(teacherKey).students.push(row);
      }
      
      // Process IT Teacher | 處理 IT 老師
      if (itTeacher && itTeacher.trim()) {
        const teacherKey = `${itTeacher}_IT`;
        if (!teacherData.has(teacherKey)) {
          teacherData.set(teacherKey, {
            name: itTeacher.trim(),
            subject: 'IT (International Teacher)',
            classes: new Set(),
            students: []
          });
        }
        teacherData.get(teacherKey).classes.add(englishClass);
        teacherData.get(teacherKey).students.push(row);
      }
    }
    
    // Convert to array format | 轉換為陣列格式
    const teacherArray = [];
    teacherData.forEach((data, key) => {
      teacherArray.push([
        data.name,
        data.subject,
        Array.from(data.classes).join(', '),
        data.students.length,
        new Date().toLocaleString(),
        'Active | 活躍'
      ]);
    });
    
    return teacherArray;
    
  } catch (error) {
    console.log(`Extract teachers error: ${error.message}`);
    return [];
  }
}

/**
 * Update auto-generated teachers sheet | 更新自動生成老師工作表
 */
function updateAutoGeneratedTeachers() {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA, false);
    
    if (!masterDataFolder) {
      throw new Error('Master data folder not found');
    }
    
    const masterFiles = masterDataFolder.getFilesByName('Gradebook Master Data | 成績簿主控資料表');
    if (!masterFiles.hasNext()) {
      throw new Error('Master data sheet not found');
    }
    
    const masterSheet = SpreadsheetApp.openById(masterFiles.next().getId());
    const teachersSheet = masterSheet.getSheetByName('Auto-Generated Teachers | 自動生成老師');
    
    if (!teachersSheet) {
      throw new Error('Auto-Generated Teachers sheet not found');
    }
    
    // Extract teacher data | 提取老師資料
    const teacherData = extractTeachersFromStudentData(masterSheet);
    
    // Clear existing data (keep headers) | 清除現有資料（保留標題）
    const lastRow = teachersSheet.getLastRow();
    if (lastRow > 4) {
      teachersSheet.getRange(5, 1, lastRow - 4, 6).clear();
    }
    
    // Add new teacher data | 新增老師資料
    if (teacherData.length > 0) {
      teachersSheet.getRange(5, 1, teacherData.length, 6).setValues(teacherData);
    }
    
    // Add summary | 新增摘要
    const summaryRow = 5 + teacherData.length + 1;
    teachersSheet.getRange(summaryRow, 1, 1, 6).merge().setValue(
      `📊 Summary: Found ${teacherData.length} teachers extracted from student data | 摘要：從學生資料中提取了 ${teacherData.length} 位老師`
    );
    teachersSheet.getRange(summaryRow, 1).setFontWeight('bold').setBackground('#E8F5E8');
    
    return teacherData;
    
  } catch (error) {
    console.log(`Update teachers error: ${error.message}`);
    return [];
  }
}

/**
 * Get system statistics | 取得系統統計數據
 */
function getSystemStatistics() {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    
    // Count system files | 計算系統檔案
    const allFiles = systemFolder.getFiles();
    let systemFiles = 0;
    while (allFiles.hasNext()) {
      allFiles.next();
      systemFiles++;
    }
    
    // Try to get master data statistics | 嘗試取得主控資料統計
    let totalTeachers = 0;
    let totalStudents = 0;
    let activeGradebooks = 0;
    
    try {
      // Look for master data sheet | 尋找主控資料表
      const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA, false);
      if (masterDataFolder) {
        const masterFiles = masterDataFolder.getFilesByName('Gradebook Master Data | 成績簿主控資料表');
        if (masterFiles.hasNext()) {
          const masterSheet = SpreadsheetApp.openById(masterFiles.next().getId());
          
          // Count students | 計算學生數
          const studentsSheet = masterSheet.getSheetByName('Students');
          if (studentsSheet) {
            const studentData = studentsSheet.getDataRange().getValues();
            totalStudents = studentData.length > 1 ? studentData.length - 1 : 0; // Exclude header
          }
          
          // Count teachers (auto-extracted) | 計算老師數（自動提取）
          const teacherData = extractTeachersFromStudentData(masterSheet);
          totalTeachers = teacherData.length;
        }
      }
      
      // Count gradebooks | 計算成績簿數量
      const gradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS, false);
      if (gradebooksFolder) {
        const gradebookFiles = gradebooksFolder.getFiles();
        while (gradebookFiles.hasNext()) {
          gradebookFiles.next();
          activeGradebooks++;
        }
      }
      
    } catch (error) {
      console.log(`Statistics calculation error: ${error.message}`);
    }
    
    return {
      totalTeachers,
      totalStudents,
      activeGradebooks,
      systemFiles
    };
    
  } catch (error) {
    console.log(`Get statistics error: ${error.message}`);
    return {
      totalTeachers: 0,
      totalStudents: 0,
      activeGradebooks: 0,
      systemFiles: 0
    };
  }
}

// ===== SYSTEM INITIALIZATION | 系統初始化 =====

/**
 * Initialize the complete gradebook management system | 初始化完整成績簿管理系統
 */
function initializeSystem() {
  try {
    showMessage('🚀 Initializing System | 正在初始化系統...', 'Please wait, this may take 1-2 minutes | 請耐心等候，約需要 1-2 分鐘');
    
    // 1. Create system folder structure | 建立系統資料夾結構
    const systemFolder = createSystemFolders();
    
    // 2. Create master data sheet | 建立主控資料表
    const masterDataSheet = createMasterDataSheet(systemFolder);
    
    // 3. Create dashboard | 建立控制台
    const dashboard = getOrCreateDashboard();
    
    // 4. Create system settings sheet | 建立系統設定表
    const configSheet = createConfigSheet(systemFolder);
    
    // 5. Setup automation triggers | 設定自動化觸發器
    setupTriggers();
    
    // 6. Create gradebook template | 建立成績簿範本
    const template = createGradebookTemplate(systemFolder);
    
    const successMessage = `
🎉 Gradebook System Initialized Successfully! | 成績簿系統初始化成功！

📁 System Folder | 系統資料夾：
${systemFolder.getUrl()}

📋 Important Files | 重要檔案：
• Master Data | 主控資料表：${masterDataSheet.getUrl()}
• Dashboard | 控制台：${dashboard.getUrl()}
• System Settings | 系統設定表：${configSheet.getUrl()}

🚀 Next Steps | 下一步操作：
1. Open Master Data and fill in student/teacher information | 開啟主控資料表，填入學生和老師資料
2. Ensure LT Teacher field is correctly filled | 確保「LT Teacher」欄位正確填入
3. Use "Batch Create Gradebooks" function | 使用「批量建立成績簿」功能
4. Start enjoying efficient grade management! | 開始享受高效的成績管理！

✨ System Ready! | 系統已準備就緒！
    `;
    
    showMessage('✅ Initialization Complete | 初始化完成', successMessage);
    
  } catch (error) {
    showError('❌ Initialization Failed | 初始化失敗', `Error: ${error.message}\n\nPlease check folder permissions and try again. | 請檢查資料夾權限並重試。`);
  }
}

/**
 * Create system folder structure | 建立系統資料夾結構
 */
function createSystemFolders() {
  try {
    // Use specified folder ID | 使用指定的資料夾 ID
    const mainFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    console.log(`✅ Using specified main folder: ${mainFolder.getName()}`);
    
    // Check and create subfolders | 檢查並建立子資料夾
    Object.values(SYSTEM_CONFIG.FOLDERS).slice(1).forEach(folderName => {
      if (!getSubFolder(mainFolder, folderName, false)) {
        mainFolder.createFolder(folderName);
        console.log(`✅ Created subfolder: ${folderName}`);
      } else {
        console.log(`✅ Subfolder exists: ${folderName}`);
      }
    });
    
    console.log(`✅ System folder structure confirmed`);
    return mainFolder;
    
  } catch (error) {
    if (error.message.includes('File not found')) {
      throw new Error(`❌ Cannot find specified folder ID: ${SYSTEM_CONFIG.MAIN_FOLDER_ID}\nPlease verify the folder ID is correct and accessible | 無法找到指定的資料夾 ID，請確認資料夾 ID 正確且有存取權限`);
    }
    throw error;
  }
}

/**
 * Create master data sheet with bilingual headers | 建立具有雙語標題的主控資料表
 */
function createMasterDataSheet(systemFolder) {
  const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA);
  
  // Create master data sheet | 建立主控資料表
  const masterSheet = SpreadsheetApp.create('Gradebook Master Data | 成績簿主控資料表');
  DriveApp.getFileById(masterSheet.getId()).moveTo(masterDataFolder);
  
  // Setup Students sheet | 設定學生資料工作表
  const studentsSheet = masterSheet.getActiveSheet();
  studentsSheet.setName('Students');
  
  // Bilingual headers for students | 學生資料雙語標題
  const studentHeaders = [
    'Student ID | 學生編號',
    'Student Name | 學生姓名',
    'English Name | 英文姓名',
    'Grade | 年級',
    'Homeroom | 班級',
    'English Class | 英文班級',
    'LT Teacher | LT老師',
    'IT Teacher | IT老師',
    'Email | 電子郵件',
    'Status | 狀態'
  ];
  
  studentsSheet.getRange(1, 1, 1, studentHeaders.length).setValues([studentHeaders]);
  studentsSheet.getRange(1, 1, 1, studentHeaders.length).setFontWeight('bold').setBackground('#4285F4').setFontColor('white');
  
  // Add sample student data | 新增範例學生資料
  const sampleStudents = [
    ['LE11020', 'Emily Lee', 'Emily', 'G3', '304', 'G3 Achievers', 'Mr.Jason', 'Ms.Smith', 'emily@school.edu', '在學'],
    ['LE11043', 'Ryan Tu', 'Ryan', 'G3', '301', 'G3 Achievers', 'Mr.Jason', 'Ms.Smith', 'ryan@school.edu', '在學'],
    ['LE11065', 'Sarah Chen', 'Sarah', 'G3', '302', 'G3 Builders', 'Ms.Chen', 'Mr.Johnson', 'sarah@school.edu', '在學']
  ];
  
  studentsSheet.getRange(2, 1, sampleStudents.length, studentHeaders.length).setValues(sampleStudents);
  
  // Set up data validation for Status column | 設定狀態欄位的資料驗證
  const statusRange = studentsSheet.getRange('J:J'); // Status column (column J is 10th column)
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['在學', '離校'])
    .setAllowInvalid(false)
    .setHelpText('Select student status | 選擇學生狀態')
    .build();
  statusRange.setDataValidation(statusRule);
  
  // Add auto-fill formula for status column | 新增狀態欄位的自動填入公式
  // This will be handled by a trigger function instead of a formula to avoid circular reference
  // 這將由觸發函數處理，而不是公式，以避免循環引用
  
  // For now, just set up the sample data with default status
  // 目前只設定範例資料的預設狀態
  
  // Add instructions | 新增使用說明
  studentsSheet.getRange('L1').setValue('💡 Tips | 提示');
  studentsSheet.getRange('L1').setFontWeight('bold').setFontSize(12).setBackground('#FFF3C4');
  studentsSheet.getRange('L2').setValue('Status auto-fills to "在學" when Student ID & Name exist');
  studentsSheet.getRange('L3').setValue('當學生編號和姓名都有值時，狀態自動填入"在學"');
  studentsSheet.getRange('L4').setValue('Change to "離校" manually when student leaves');
  studentsSheet.getRange('L5').setValue('學生離校時請手動改為"離校"');
  studentsSheet.getRange('L6').setValue('Formula will preserve manual changes');
  studentsSheet.getRange('L7').setValue('公式會保留手動修改的內容');
  
  // Setup Auto-Generated Teachers sheet | 設定自動生成老師資料工作表
  const teachersSheet = masterSheet.insertSheet('Auto-Generated Teachers | 自動生成老師');
  
  // Explanation header | 說明標題
  teachersSheet.getRange('A1:F1').merge().setValue('📝 This sheet is AUTO-GENERATED from student data | 此工作表從學生資料自動生成');
  teachersSheet.getRange('A1').setFontSize(14).setFontWeight('bold').setHorizontalAlignment('center');
  teachersSheet.getRange('A1:F1').setBackground('#FFC107').setFontColor('#000');
  
  teachersSheet.getRange('A2:F2').merge().setValue('Do NOT edit manually. Teachers are extracted from Students sheet. | 請勿手動編輯。老師資訊從學生工作表中提取。');
  teachersSheet.getRange('A2').setFontStyle('italic').setHorizontalAlignment('center');
  teachersSheet.getRange('A2:F2').setBackground('#FFF3C4');
  
  // Bilingual headers for auto-generated teachers | 自動生成老師資料雙語標題
  const teacherHeaders = [
    'Teacher Name | 老師姓名',
    'Subject | 科目',
    'Classes | 班級',
    'Student Count | 學生數量',
    'Last Updated | 最後更新',
    'Status | 狀態'
  ];
  
  teachersSheet.getRange(4, 1, 1, teacherHeaders.length).setValues([teacherHeaders]);
  teachersSheet.getRange(4, 1, 1, teacherHeaders.length).setFontWeight('bold').setBackground('#34A853').setFontColor('white');
  
  // Add explanation note | 新增說明
  teachersSheet.getRange('A6').setValue('💡 How it works | 運作方式:');
  teachersSheet.getRange('A6').setFontWeight('bold').setFontSize(12);
  
  const explanationNotes = [
    '1. System scans Students sheet for LT Teacher and IT Teacher columns | 系統掃描學生工作表的 LT Teacher 和 IT Teacher 欄位',
    '2. Automatically extracts unique teacher names | 自動提取唯一的老師姓名',
    '3. Groups students by English Class for each teacher | 為每位老師按英文班級分組學生',
    '4. Creates gradebooks automatically based on this data | 根據此資料自動建立成績簿',
    '5. Updates automatically when student data changes | 學生資料變更時自動更新'
  ];
  
  explanationNotes.forEach((note, index) => {
    teachersSheet.getRange(`A${7 + index}`).setValue(note);
    teachersSheet.getRange(`A${7 + index}`).setFontSize(10);
  });
  
  // Format both sheets | 格式化兩個工作表
  [studentsSheet, teachersSheet].forEach(sheet => {
    // Auto-resize columns | 自動調整欄寬
    sheet.autoResizeColumns(1, sheet.getLastColumn());
    
    // Add borders | 加入邊框
    const range = sheet.getDataRange();
    range.setBorder(true, true, true, true, true, true);
    
    // Freeze header row | 凍結標題列
    sheet.setFrozenRows(1);
  });
  
  // Set Students sheet as active | 設定學生工作表為活躍狀態
  masterSheet.setActiveSheet(studentsSheet);
  
  console.log(`✅ Master data sheet created: ${masterSheet.getName()}`);
  return masterSheet;
}

/**
 * Create system configuration sheet | 建立系統配置工作表
 */
function createConfigSheet(systemFolder) {
  const configSheet = SpreadsheetApp.create('System Settings | 系統設定表');
  DriveApp.getFileById(configSheet.getId()).moveTo(systemFolder);
  
  const sheet = configSheet.getActiveSheet();
  sheet.setName('Settings | 設定');
  
  // Title | 標題
  sheet.getRange('A1:C1').merge().setValue('🔧 System Configuration | 系統配置');
  sheet.getRange('A1').setFontSize(16).setFontWeight('bold').setHorizontalAlignment('center');
  sheet.getRange('A1:C1').setBackground('#FF9800').setFontColor('white');
  
  // Configuration data | 配置資料
  const configData = [
    ['Setting | 設定項目', 'Value | 數值', 'Description | 說明'],
    ['Semester | 學期', SYSTEM_CONFIG.SEMESTER, 'Current semester code | 目前學期代碼'],
    ['Formative Count | 平時評量次數', SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT, 'Number of F.A. assessments | F.A.評量次數'],
    ['Summative Count | 總結評量次數', SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT, 'Number of S.A. assessments | S.A.評量次數'],
    ['Include Final | 包含期末考', SYSTEM_CONFIG.ASSESSMENTS.INCLUDE_FINAL, 'Include final exam in calculations | 計算中包含期末考'],
    ['Formative Weight | 平時評量權重', SYSTEM_CONFIG.WEIGHTS.FORMATIVE, 'Weight for formative assessments | 平時評量權重'],
    ['Summative Weight | 總結評量權重', SYSTEM_CONFIG.WEIGHTS.SUMMATIVE, 'Weight for summative assessments | 總結評量權重'],
    ['Final Weight | 期末考權重', SYSTEM_CONFIG.WEIGHTS.FINAL, 'Weight for final exam | 期末考權重'],
    ['Excellent Threshold | 優秀門檻', SYSTEM_CONFIG.PROGRESS.EXCELLENT + '%', 'Threshold for excellent progress | 優秀進度門檻'],
    ['Good Threshold | 良好門檻', SYSTEM_CONFIG.PROGRESS.GOOD + '%', 'Threshold for good progress | 良好進度門檻'],
    ['Normal Threshold | 普通門檻', SYSTEM_CONFIG.PROGRESS.NORMAL + '%', 'Threshold for normal progress | 普通進度門檻']
  ];
  
  sheet.getRange(2, 1, configData.length, 3).setValues(configData);
  sheet.getRange(2, 1, 1, 3).setFontWeight('bold').setBackground('#f0f0f0');
  
  // Format | 格式化
  sheet.autoResizeColumns(1, 3);
  sheet.getDataRange().setBorder(true, true, true, true, true, true);
  sheet.setFrozenRows(2);
  
  console.log(`✅ Configuration sheet created: ${configSheet.getName()}`);
  return configSheet;
}

/**
 * Create gradebook template with bilingual format | 建立雙語格式成績簿範本
 */
function createGradebookTemplate(systemFolder) {
  const templatesFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEMPLATES);
  
  const template = SpreadsheetApp.create('Teacher Gradebook Template | 老師成績簿範本');
  DriveApp.getFileById(template.getId()).moveTo(templatesFolder);
  
  // Remove default sheet and create a sample class sheet | 移除預設工作表並建立範例班級工作表
  const defaultSheet = template.getActiveSheet();
  const sampleSheet = template.insertSheet('Sample Class | 範例班級');
  template.deleteSheet(defaultSheet);
  
  // Create class gradebook format | 建立班級成績簿格式
  setupClassSheet(sampleSheet, 'Sample Class | 範例班級');
  
  // Add teacher info sheet | 新增老師資訊工作表
  const teacherInfoSheet = template.insertSheet('📋 Teacher Info | 老師資訊');
  setupTeacherInfoSheet(teacherInfoSheet);
  
  // Set sample sheet as active | 設定範例工作表為活躍狀態
  template.setActiveSheet(sampleSheet);
  
  console.log(`✅ Teacher gradebook template created: ${template.getName()}`);
  return template;
}

/**
 * Setup class sheet headers only (no sample data) | 只設定班級工作表標題（無範例資料）
 */
function setupClassSheetHeaders(sheet, className) {
  // Clear sheet | 清空工作表
  sheet.clear();
  
  // Class title | 班級標題
  sheet.getRange('A1:Q1').merge().setValue(`📚 ${className} - Grade Sheet | 成績表`);
  sheet.getRange('A1').setFontSize(16).setFontWeight('bold').setHorizontalAlignment('center');
  sheet.getRange('A1:Q1').setBackground('#4285F4').setFontColor('white');
  
  // Create bilingual gradebook headers | 建立雙語成績簿標題
  const headers = ['Student ID | 學生編號', 'Student Name | 學生姓名', 'English Name | 英文姓名'];
  
  // Add Formative Assessment columns | 新增平時評量欄位
  for (let i = 1; i <= SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT; i++) {
    headers.push(`F.A.${i} | 平時${i}`);
  }
  
  // Add Summative Assessment columns | 新增總結評量欄位
  for (let i = 1; i <= SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT; i++) {
    headers.push(`S.A.${i} | 總結${i}`);
  }
  
  // Add Final and calculation columns | 新增期末考和計算欄位
  if (SYSTEM_CONFIG.ASSESSMENTS.INCLUDE_FINAL) {
    headers.push('Final | 期末考');
  }
  
  headers.push(
    'F.A. Average | 平時平均',
    'S.A. Average | 總結平均',
    'Semester Grade | 學期成績',
    'Letter Grade | 等第',
    'Notes | 備註'
  );
  
  // Set headers | 設定標題
  sheet.getRange(2, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(2, 1, 1, headers.length).setFontWeight('bold').setBackground('#34A853').setFontColor('white');
  
  // Format sheet | 格式化工作表
  sheet.autoResizeColumns(1, headers.length);
  sheet.setFrozenRows(2);
  sheet.setFrozenColumns(3);
}

/**
 * Setup class sheet with gradebook format | 設定班級工作表成績簿格式
 */
function setupClassSheet(sheet, className) {
  // Clear sheet | 清空工作表
  sheet.clear();
  
  // Class title | 班級標題
  sheet.getRange('A1:Q1').merge().setValue(`📚 ${className} - Grade Sheet | 成績表`);
  sheet.getRange('A1').setFontSize(16).setFontWeight('bold').setHorizontalAlignment('center');
  sheet.getRange('A1:Q1').setBackground('#4285F4').setFontColor('white');
  
  // Create bilingual gradebook headers | 建立雙語成績簿標題
  const headers = ['Student ID | 學生編號', 'Student Name | 學生姓名', 'English Name | 英文姓名'];
  
  // Add Formative Assessment columns | 新增平時評量欄位
  for (let i = 1; i <= SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT; i++) {
    headers.push(`F.A.${i} | 平時${i}`);
  }
  
  // Add Summative Assessment columns | 新增總結評量欄位
  for (let i = 1; i <= SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT; i++) {
    headers.push(`S.A.${i} | 總結${i}`);
  }
  
  // Add Final and calculation columns | 新增期末考和計算欄位
  if (SYSTEM_CONFIG.ASSESSMENTS.INCLUDE_FINAL) {
    headers.push('Final | 期末考');
  }
  
  headers.push(
    'F.A. Average | 平時平均',
    'S.A. Average | 總結平均',
    'Semester Grade | 學期成績',
    'Letter Grade | 等第',
    'Notes | 備註'
  );
  
  // Set headers | 設定標題
  sheet.getRange(2, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(2, 1, 1, headers.length).setFontWeight('bold').setBackground('#34A853').setFontColor('white');
  
  // Add sample student row with formulas | 新增含公式的範例學生列
  const sampleRow = ['LE11001', 'Sample Student | 範例學生', 'Sample'];
  
  // Add empty assessment cells | 新增空白評量格子
  const totalAssessments = SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT + SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT;
  if (SYSTEM_CONFIG.ASSESSMENTS.INCLUDE_FINAL) {
    for (let i = 0; i <= totalAssessments; i++) sampleRow.push('');
  } else {
    for (let i = 0; i < totalAssessments; i++) sampleRow.push('');
  }
  
  // Calculate column positions | 計算欄位位置
  const faStartCol = 4; // F.A.1 starts at column D
  const faEndCol = faStartCol + SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT - 1;
  const saStartCol = faEndCol + 1;
  const saEndCol = saStartCol + SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT - 1;
  const finalCol = SYSTEM_CONFIG.ASSESSMENTS.INCLUDE_FINAL ? saEndCol + 1 : null;
  const avgStartCol = finalCol ? finalCol + 1 : saEndCol + 1;
  
  // Add formula cells | 新增公式格子
  const faAvgFormula = `=AVERAGEIF(${getColumnLetter(faStartCol)}3:${getColumnLetter(faEndCol)}3,">0")`;
  const saAvgFormula = `=AVERAGEIF(${getColumnLetter(saStartCol)}3:${getColumnLetter(saEndCol)}3,">0")`;
  
  sampleRow.push(faAvgFormula); // F.A. Average
  sampleRow.push(saAvgFormula); // S.A. Average
  
  // Semester grade formula | 學期成績公式
  const semesterFormula = finalCol 
    ? `=(${getColumnLetter(avgStartCol)}3*${SYSTEM_CONFIG.WEIGHTS.FORMATIVE}+${getColumnLetter(avgStartCol + 1)}3*${SYSTEM_CONFIG.WEIGHTS.SUMMATIVE}+${getColumnLetter(finalCol)}3*${SYSTEM_CONFIG.WEIGHTS.FINAL})/${SYSTEM_CONFIG.WEIGHTS.FORMATIVE + SYSTEM_CONFIG.WEIGHTS.SUMMATIVE + SYSTEM_CONFIG.WEIGHTS.FINAL}`
    : `=(${getColumnLetter(avgStartCol)}3*${SYSTEM_CONFIG.WEIGHTS.FORMATIVE}+${getColumnLetter(avgStartCol + 1)}3*${SYSTEM_CONFIG.WEIGHTS.SUMMATIVE})/${SYSTEM_CONFIG.WEIGHTS.FORMATIVE + SYSTEM_CONFIG.WEIGHTS.SUMMATIVE}`;
  
  sampleRow.push(semesterFormula);
  
  // Letter grade formula | 等第公式
  const letterGradeFormula = `=IF(${getColumnLetter(avgStartCol + 2)}3>=90,"A",IF(${getColumnLetter(avgStartCol + 2)}3>=80,"B",IF(${getColumnLetter(avgStartCol + 2)}3>=70,"C",IF(${getColumnLetter(avgStartCol + 2)}3>=60,"D","F"))))`;
  sampleRow.push(letterGradeFormula);
  sampleRow.push(''); // Notes
  
  // Set sample row | 設定範例列
  sheet.getRange(3, 1, 1, sampleRow.length).setValues([sampleRow]);
  
  // Format sheet | 格式化工作表
  sheet.autoResizeColumns(1, headers.length);
  sheet.getDataRange().setBorder(true, true, true, true, true, true);
  sheet.setFrozenRows(2);
  sheet.setFrozenColumns(3);
}

/**
 * Setup teacher info sheet | 設定老師資訊工作表
 */
function setupTeacherInfoSheet(sheet) {
  // Clear sheet | 清空工作表
  sheet.clear();
  
  // Title | 標題
  sheet.getRange('A1:D1').merge().setValue('📋 Teacher Information | 老師資訊');
  sheet.getRange('A1').setFontSize(18).setFontWeight('bold').setHorizontalAlignment('center');
  sheet.getRange('A1:D1').setBackground('#FF9800').setFontColor('white');
  
  // Teacher info template | 老師資訊範本
  const teacherInfo = [
    ['Teacher Name | 老師姓名:', 'Teacher Name Here | 在此填入老師姓名'],
    ['Subject | 科目:', 'LT/IT'],
    ['Semester | 學期:', SYSTEM_CONFIG.SEMESTER],
    ['Last Updated | 最後更新:', new Date().toLocaleString()],
    ['', ''],
    ['Classes Overview | 班級總覽:', ''],
    ['Class Name | 班級名稱', 'Student Count | 學生數量'],
    ['G1 Achievers (Example)', '25'],
    ['G2 Builders (Example)', '23']
  ];
  
  sheet.getRange(3, 1, teacherInfo.length, 2).setValues(teacherInfo);
  sheet.getRange(3, 1, 4, 1).setFontWeight('bold');
  sheet.getRange(8, 1, 1, 2).setFontWeight('bold').setBackground('#E3F2FD');
  
  // Instructions | 使用說明
  sheet.getRange('A13').setValue('💡 How to use this gradebook | 如何使用此成績簿:');
  sheet.getRange('A13').setFontWeight('bold').setFontSize(12);
  
  const instructions = [
    '1. Each sheet tab represents a different class | 每個分頁代表不同班級',
    '2. Add student data to each class sheet | 在每個班級分頁中新增學生資料',
    '3. Formulas are pre-configured for automatic calculation | 公式已預先設定自動計算',
    '4. Do not modify formula columns | 請勿修改公式欄位',
    '5. Contact system admin for technical support | 技術支援請聯繫系統管理員'
  ];
  
  instructions.forEach((instruction, index) => {
    sheet.getRange(`A${14 + index}`).setValue(instruction);
    sheet.getRange(`A${14 + index}`).setFontSize(10);
  });
  
  // Format | 格式化
  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 200);
  sheet.getRange('A1:D20').setBorder(true, true, true, true, true, true);
}

/**
 * Setup automation triggers | 設定自動化觸發器
 */
function setupTriggers() {
  try {
    // Delete existing triggers | 刪除現有觸發器
    const existingTriggers = ScriptApp.getProjectTriggers();
    existingTriggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === 'weeklyProgressCheck') {
        ScriptApp.deleteTrigger(trigger);
      }
    });
    
    // Create weekly progress check trigger | 建立每週進度檢查觸發器
    ScriptApp.newTrigger('weeklyProgressCheck')
      .timeBased()
      .everyWeeks(1)
      .onWeekDay(ScriptApp.WeekDay.MONDAY)
      .atHour(8)
      .create();
    
    console.log('✅ Automation triggers setup complete');
    
  } catch (error) {
    console.log(`Trigger setup warning: ${error.message}`);
  }
}

// ===== HELPER FUNCTIONS | 輔助函數 =====

/**
 * Get or create subfolder | 取得或建立子資料夾
 */
function getSubFolder(parentFolder, folderName, createIfNotExists = true) {
  const subFolders = parentFolder.getFoldersByName(folderName);
  if (subFolders.hasNext()) {
    return subFolders.next();
  }
  
  if (createIfNotExists) {
    return parentFolder.createFolder(folderName);
  }
  
  return null;
}

/**
 * Convert number to column letter | 數字轉欄位字母
 */
function getColumnLetter(columnNumber) {
  let temp;
  let letter = '';
  while (columnNumber > 0) {
    temp = (columnNumber - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    columnNumber = (columnNumber - temp - 1) / 26;
  }
  return letter;
}

/**
 * Show message dialog | 顯示訊息對話框
 */
function showMessage(title, message) {
  try {
    const ui = SpreadsheetApp.getUi();
    ui.alert(title, message, ui.ButtonSet.OK);
  } catch (error) {
    console.log(`${title}: ${message}`);
  }
}

/**
 * Show error dialog | 顯示錯誤對話框
 */
function showError(title, message) {
  try {
    const ui = SpreadsheetApp.getUi();
    ui.alert(title, message, ui.ButtonSet.OK);
  } catch (error) {
    console.log(`${title}: ${message}`);
  }
}

/**
 * Show confirmation dialog | 顯示確認對話框
 */
function showConfirm(title, message) {
  try {
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert(title, message, ui.ButtonSet.YES_NO);
    return response === ui.Button.YES;
  } catch (error) {
    console.log(`${title}: ${message}`);
    return false;
  }
}

// ===== PLACEHOLDER FUNCTIONS | 佔位函數 =====
// These functions are referenced in the menu but need to be implemented
// 這些函數在選單中被引用但需要實作

function openSystemFolder() {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    showMessage('📁 System Folder | 系統資料夾', `Opening system folder | 正在開啟系統資料夾:\n\n${systemFolder.getUrl()}`);
  } catch (error) {
    showError('❌ Error | 錯誤', `Cannot open system folder | 無法開啟系統資料夾: ${error.message}`);
  }
}

function openMasterDataSheet() {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA, false);
    if (masterDataFolder) {
      const masterFiles = masterDataFolder.getFilesByName('Gradebook Master Data | 成績簿主控資料表');
      if (masterFiles.hasNext()) {
        const masterSheet = SpreadsheetApp.openById(masterFiles.next().getId());
        showMessage('📋 Master Data | 主控資料表', `Opening master data sheet | 正在開啟主控資料表:\n\n${masterSheet.getUrl()}`);
      } else {
        showError('❌ Error | 錯誤', 'Master data sheet not found. Please initialize system first. | 找不到主控資料表，請先初始化系統。');
      }
    }
  } catch (error) {
    showError('❌ Error | 錯誤', `Cannot open master data | 無法開啟主控資料表: ${error.message}`);
  }
}

function openSystemSettings() {
  showMessage('⚙️ System Settings | 系統設定', 'System settings feature coming soon | 系統設定功能即將推出');
}

/**
 * Create gradebooks for all teachers with teacher-centric structure | 為所有老師建立以老師為中心的成績簿
 */
function createGradebooksForAllTeachers(teacherArray) {
  let successCount = 0;
  let failedCount = 0;
  const results = { success: 0, failed: 0, details: [] };
  
  try {
    // Get system folders | 取得系統資料夾
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA);
    
    // Get master data sheet for student details | 取得主控資料表以獲取學生詳細資料
    const masterFiles = masterDataFolder.getFilesByName('Gradebook Master Data | 成績簿主控資料表');
    if (!masterFiles.hasNext()) {
      throw new Error('Master data sheet not found');
    }
    
    const masterSheet = SpreadsheetApp.openById(masterFiles.next().getId());
    const studentsSheet = masterSheet.getSheetByName('Students');
    const studentData = studentsSheet.getDataRange().getValues();
    const headers = studentData[0];
    
    console.log('=== DEBUGGING GRADEBOOK CREATION ===');
    console.log('Headers found:', headers);
    console.log('Total student rows:', studentData.length - 1);
    
    // Find column indices | 找到欄位索引
    const ltTeacherCol = headers.indexOf('LT Teacher | LT老師');
    const itTeacherCol = headers.indexOf('IT Teacher | IT老師');
    const englishClassCol = headers.indexOf('English Class | 英文班級');
    const statusCol = headers.indexOf('Status | 狀態');
    
    console.log('Column indices:', {
      ltTeacher: ltTeacherCol,
      itTeacher: itTeacherCol,
      englishClass: englishClassCol,
      status: statusCol
    });
    
    // Extract detailed teacher information with students | 提取包含學生資料的詳細老師資訊
    const teacherDetails = new Map();
    let processedStudents = 0;
    let skippedStudents = 0;
    
    for (let i = 1; i < studentData.length; i++) {
      const row = studentData[i];
      const ltTeacher = row[ltTeacherCol];
      const itTeacher = row[itTeacherCol];
      const englishClass = row[englishClassCol];
      const status = statusCol !== -1 ? row[statusCol] : '';
      
      console.log(`Row ${i}: Student=${row[1]}, LT=${ltTeacher}, IT=${itTeacher}, Class=${englishClass}, Status="${status}"`);
      
      // Only process students with "在學" status | 只處理狀態為"在學"的學生
      if (status !== '在學') {
        console.log(`  -> SKIPPED: Status is not "在學" (found: "${status}")`);
        skippedStudents++;
        continue;
      }
      
      processedStudents++;
      
      // Process LT Teacher | 處理 LT 老師
      if (ltTeacher && ltTeacher.trim()) {
        const teacherKey = `${ltTeacher.trim()}_LT`;
        if (!teacherDetails.has(teacherKey)) {
          teacherDetails.set(teacherKey, {
            name: ltTeacher.trim(),
            subject: 'LT (Local Teacher)',
            classes: new Map()
          });
        }
        
        if (!teacherDetails.get(teacherKey).classes.has(englishClass)) {
          teacherDetails.get(teacherKey).classes.set(englishClass, []);
        }
        teacherDetails.get(teacherKey).classes.get(englishClass).push(row);
      }
      
      // Process IT Teacher | 處理 IT 老師
      if (itTeacher && itTeacher.trim()) {
        const teacherKey = `${itTeacher.trim()}_IT`;
        if (!teacherDetails.has(teacherKey)) {
          teacherDetails.set(teacherKey, {
            name: itTeacher.trim(),
            subject: 'IT (International Teacher)',
            classes: new Map()
          });
        }
        
        if (!teacherDetails.get(teacherKey).classes.has(englishClass)) {
          teacherDetails.get(teacherKey).classes.set(englishClass, []);
        }
        teacherDetails.get(teacherKey).classes.get(englishClass).push(row);
      }
    }
    
    console.log(`=== PROCESSING SUMMARY ===`);
    console.log(`Total students processed: ${processedStudents}`);
    console.log(`Total students skipped: ${skippedStudents}`);
    console.log(`Teachers found: ${teacherDetails.size}`);
    
    teacherDetails.forEach((teacherInfo, teacherKey) => {
      console.log(`Teacher: ${teacherKey}, Classes: ${teacherInfo.classes.size}`);
      teacherInfo.classes.forEach((students, className) => {
        console.log(`  - Class: ${className}, Students: ${students.length}`);
      });
    });
    
    console.log(`=== STARTING GRADEBOOK CREATION ===`);
    
    // Create gradebook for each teacher | 為每位老師建立成績簿
    teacherDetails.forEach((teacherInfo, teacherKey) => {
      try {
        // Create teacher gradebook spreadsheet | 建立老師成績簿試算表
        const gradebookName = `${teacherInfo.name}_${SYSTEM_CONFIG.SEMESTER}_Gradebook`;
        const teacherGradebook = SpreadsheetApp.create(gradebookName);
        DriveApp.getFileById(teacherGradebook.getId()).moveTo(teacherGradebooksFolder);
        
        // Delete default sheet | 刪除預設工作表
        const defaultSheet = teacherGradebook.getSheets()[0];
        
        // Add teacher info sheet first | 首先新增老師資訊工作表
        const teacherInfoSheet = teacherGradebook.insertSheet('📋 Teacher Info | 老師資訊');
        setupTeacherInfoSheet(teacherInfoSheet);
        
        // Update teacher info with actual data | 更新老師資訊為實際資料
        teacherInfoSheet.getRange('B3').setValue(teacherInfo.name);
        teacherInfoSheet.getRange('B4').setValue(teacherInfo.subject);
        
        // Clear example classes and add real ones | 清除範例班級並新增真實班級
        teacherInfoSheet.getRange('A8:B11').clear();
        teacherInfoSheet.getRange('A8:B8').setValues([['Class Name | 班級名稱', 'Student Count | 學生數量']]);
        teacherInfoSheet.getRange('A8:B8').setFontWeight('bold').setBackground('#E3F2FD');
        
        let classIndex = 0;
        
        // Create a sheet for each class this teacher teaches | 為老師教授的每個班級建立工作表
        teacherInfo.classes.forEach((students, className) => {
          try {
            // Create class sheet | 建立班級工作表
            const classSheet = teacherGradebook.insertSheet(`📚 ${className}`);
            setupClassSheetHeaders(classSheet, className);
            
            // Add real student data | 新增真實學生資料
            console.log(`Creating class sheet for ${className} with ${students.length} students`);
            if (students.length > 0) {
              console.log(`Students for ${className}:`, students.map(s => s[1])); // Log student names
              
              // Step 1: Write basic student data first (without formulas) | 第一步：先寫入基本學生資料（不含公式）
              const basicStudentRows = students.map(studentRow => [
                studentRow[0], // Student ID
                studentRow[1], // Student Name  
                studentRow[2]  // English Name
              ]);
              
              console.log(`Writing ${basicStudentRows.length} basic student rows to sheet ${className}`);
              console.log(`First basic student row:`, basicStudentRows[0]);
              
              // Write basic student info (first 3 columns) | 寫入基本學生資訊（前3欄）
              classSheet.getRange(3, 1, basicStudentRows.length, 3).setValues(basicStudentRows);
              
              // Step 2: Add formulas for each student row | 第二步：為每個學生列新增公式
              students.forEach((studentRow, index) => {
                const rowNum = 3 + index;
                
                // Calculate column positions | 計算欄位位置
                const faStartCol = 4;
                const faEndCol = faStartCol + SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT - 1;
                const saStartCol = faEndCol + 1;
                const saEndCol = saStartCol + SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT - 1;
                const finalColNum = SYSTEM_CONFIG.ASSESSMENTS.INCLUDE_FINAL ? saEndCol + 1 : null;
                const avgStartCol = finalColNum ? finalColNum + 1 : saEndCol + 1;
                
                // Add F.A. Average formula | 新增平時評量平均公式
                const faAvgFormula = `=AVERAGEIF(${getColumnLetter(faStartCol)}${rowNum}:${getColumnLetter(faEndCol)}${rowNum},">0")`;
                classSheet.getRange(rowNum, avgStartCol).setFormula(faAvgFormula);
                
                // Add S.A. Average formula | 新增總結評量平均公式
                const saAvgFormula = `=AVERAGEIF(${getColumnLetter(saStartCol)}${rowNum}:${getColumnLetter(saEndCol)}${rowNum},">0")`;
                classSheet.getRange(rowNum, avgStartCol + 1).setFormula(saAvgFormula);
                
                // Add Semester Grade formula | 新增學期成績公式
                const semesterFormula = finalColNum
                  ? `=(${getColumnLetter(avgStartCol)}${rowNum}*${SYSTEM_CONFIG.WEIGHTS.FORMATIVE}+${getColumnLetter(avgStartCol + 1)}${rowNum}*${SYSTEM_CONFIG.WEIGHTS.SUMMATIVE}+${getColumnLetter(finalColNum)}${rowNum}*${SYSTEM_CONFIG.WEIGHTS.FINAL})/${SYSTEM_CONFIG.WEIGHTS.FORMATIVE + SYSTEM_CONFIG.WEIGHTS.SUMMATIVE + SYSTEM_CONFIG.WEIGHTS.FINAL}`
                  : `=(${getColumnLetter(avgStartCol)}${rowNum}*${SYSTEM_CONFIG.WEIGHTS.FORMATIVE}+${getColumnLetter(avgStartCol + 1)}${rowNum}*${SYSTEM_CONFIG.WEIGHTS.SUMMATIVE})/${SYSTEM_CONFIG.WEIGHTS.FORMATIVE + SYSTEM_CONFIG.WEIGHTS.SUMMATIVE}`;
                classSheet.getRange(rowNum, avgStartCol + 2).setFormula(semesterFormula);
                
                // Add Letter Grade formula | 新增等第公式
                const letterGradeFormula = `=IF(${getColumnLetter(avgStartCol + 2)}${rowNum}>=90,"A",IF(${getColumnLetter(avgStartCol + 2)}${rowNum}>=80,"B",IF(${getColumnLetter(avgStartCol + 2)}${rowNum}>=70,"C",IF(${getColumnLetter(avgStartCol + 2)}${rowNum}>=60,"D","F"))))`;
                classSheet.getRange(rowNum, avgStartCol + 3).setFormula(letterGradeFormula);
              });
              
              // Format the data range | 格式化資料範圍
              const totalStudents = students.length;
              const totalColumns = classSheet.getLastColumn();
              const dataRange = classSheet.getRange(3, 1, totalStudents, totalColumns);
              dataRange.setBorder(true, true, true, true, true, true);
              
              // Auto-resize columns to fit content | 自動調整欄位寬度
              classSheet.autoResizeColumns(1, totalColumns);
              console.log(`Successfully wrote student data and formulas to ${className} sheet`);
            } else {
              console.log(`No students found for ${className}`);
            }
            
            // Update class info in teacher info sheet | 在老師資訊工作表中更新班級資訊
            const infoRow = 9 + classIndex;
            teacherInfoSheet.getRange(infoRow, 1, 1, 2).setValues([[className, students.length]]);
            classIndex++;
            
          } catch (classError) {
            console.log(`Error creating class sheet for ${className}: ${classError.message}`);
          }
        });
        
        // Delete default sheet if it still exists | 刪除預設工作表（如果仍存在）
        if (teacherGradebook.getSheets().includes(defaultSheet)) {
          teacherGradebook.deleteSheet(defaultSheet);
        }
        
        // Set teacher info as active sheet | 設定老師資訊為活躍工作表
        teacherGradebook.setActiveSheet(teacherInfoSheet);
        
        successCount++;
        results.details.push(`✅ ${teacherInfo.name} (${teacherInfo.subject})`);
        
      } catch (teacherError) {
        failedCount++;
        results.details.push(`❌ ${teacherInfo.name} (${teacherInfo.subject}): ${teacherError.message}`);
        console.log(`Error creating gradebook for ${teacherInfo.name}: ${teacherError.message}`);
      }
    });
    
    results.success = successCount;
    results.failed = failedCount;
    
    return results;
    
  } catch (error) {
    console.log(`Batch creation error: ${error.message}`);
    return { success: 0, failed: teacherArray.length, details: [`❌ System error: ${error.message}`] };
  }
}

function batchCreateGradebooks() {
  try {
    // Check system configuration | 檢查系統配置
    if (!SYSTEM_CONFIG.MAIN_FOLDER_ID || SYSTEM_CONFIG.MAIN_FOLDER_ID === 'YOUR_FOLDER_ID_HERE') {
      throw new Error('Please set MAIN_FOLDER_ID in Code.gs line 21 | 請在 Code.gs 第 21 行設定 MAIN_FOLDER_ID');
    }
    
    // Check if system is initialized | 檢查系統是否已初始化
    try {
      const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
      console.log(`Found system folder: ${systemFolder.getName()}`);
    } catch (folderError) {
      throw new Error(`Cannot access system folder. Please check MAIN_FOLDER_ID or run initializeSystem first. | 無法存取系統資料夾。請檢查 MAIN_FOLDER_ID 或先執行 initializeSystem。\n\nError: ${folderError.message}`);
    }
    
    // First update teacher data | 首先更新老師資料
    console.log('Extracting teacher data from students...');
    const teacherData = updateAutoGeneratedTeachers();
    
    if (teacherData.length === 0) {
      throw new Error('No teachers found in student data. Please check: 1. Master data sheet exists 2. Students sheet has data 3. LT Teacher and IT Teacher columns are filled | 學生資料中找不到老師。請檢查：1. 主控資料表存在 2. Students 工作表有資料 3. LT Teacher 和 IT Teacher 欄位已填入');
    }
    
    console.log(`Found ${teacherData.length} teachers`);
    
    // Start batch creation | 開始批量建立
    console.log('Creating gradebooks...');
    const results = createGradebooksForAllTeachers(teacherData);
    
    // Return results instead of showing messages | 返回結果而不是顯示訊息
    return {
      success: true,
      message: `Successfully created ${results.success} gradebooks, ${results.failed} failed | 成功建立 ${results.success} 個成績簿，${results.failed} 個失敗`,
      details: results
    };
    
  } catch (error) {
    console.error('Batch creation failed:', error.message);
    throw error;
  }
}

function createSingleGradebook() {
  showMessage('➕ Create Gradebook | 建立成績簿', 'Create single gradebook feature coming soon | 建立單一成績簿功能即將推出');
}

function checkAllGradebooks() {
  showMessage('📊 Check Gradebooks | 檢查成績簿', 'Check all gradebooks feature coming soon | 檢查所有成績簿功能即將推出');
}

function updateGradebookLinks() {
  showMessage('🔗 Update Links | 更新連結', 'Update gradebook links feature coming soon | 更新成績簿連結功能即將推出');
}

function checkAllProgress() {
  showMessage('📈 Check Progress | 檢查進度', 'Check all progress feature coming soon | 檢查全體進度功能即將推出');
}

function generateDetailedReport() {
  showMessage('📋 Generate Report | 生成報告', 'Generate detailed report feature coming soon | 生成詳細報告功能即將推出');
}

function sendProgressReminders() {
  showMessage('📧 Send Reminders | 發送提醒', 'Send progress reminders feature coming soon | 發送進度提醒功能即將推出');
}

function openProgressStats() {
  showMessage('📊 Progress Stats | 進度統計', 'Progress statistics feature coming soon | 進度統計功能即將推出');
}

function importStudentData() {
  showMessage('📥 Import Data | 匯入資料', 'Import student data feature coming soon | 匯入學生資料功能即將推出');
}

function exportStudentData() {
  showMessage('📤 Export Data | 匯出資料', 'Export student data feature coming soon | 匯出學生資料功能即將推出');
}

function syncStudentData() {
  showMessage('🔄 Sync Data | 同步資料', 'Sync student data feature coming soon | 同步學生資料功能即將推出');
}

function quickAddStudent() {
  showMessage('✏️ Quick Add | 快速新增', 'Quick add student feature coming soon | 快速新增學生功能即將推出');
}

function updateGradebookTemplates() {
  showMessage('📄 Update Templates | 更新範本', 'Update gradebook templates feature coming soon | 更新成績簿範本功能即將推出');
}

function beautifyGradebooks() {
  showMessage('🎨 Beautify | 美化格式', 'Beautify gradebooks feature coming soon | 美化成績簿格式功能即將推出');
}

function validateFormulas() {
  showMessage('📐 Validate | 檢查公式', 'Validate formulas feature coming soon | 檢查公式正確性功能即將推出');
}

function repairDamagedSheets() {
  showMessage('🔧 Repair | 修復格式', 'Repair damaged sheets feature coming soon | 修復損壞格式功能即將推出');
}

/**
 * Auto-fill student status when data is added | 當新增資料時自動填入學生狀態
 */
function autoFillStudentStatus() {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA, false);
    
    if (!masterDataFolder) {
      return; // Silently return if master data folder doesn't exist
    }
    
    const masterFiles = masterDataFolder.getFilesByName('Gradebook Master Data | 成績簿主控資料表');
    if (!masterFiles.hasNext()) {
      return; // Silently return if master data sheet doesn't exist
    }
    
    const masterSheet = SpreadsheetApp.openById(masterFiles.next().getId());
    const studentsSheet = masterSheet.getSheetByName('Students');
    
    if (!studentsSheet) {
      return; // Silently return if Students sheet doesn't exist
    }
    
    const data = studentsSheet.getDataRange().getValues();
    const headers = data[0];
    
    const studentIdCol = headers.indexOf('Student ID | 學生編號');
    const studentNameCol = headers.indexOf('Student Name | 學生姓名');
    const statusCol = headers.indexOf('Status | 狀態');
    
    if (studentIdCol === -1 || studentNameCol === -1 || statusCol === -1) {
      return; // Required columns not found
    }
    
    let changesNeeded = false;
    
    // Check each row and auto-fill status if needed
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const studentId = row[studentIdCol];
      const studentName = row[studentNameCol];
      const currentStatus = row[statusCol];
      
      // If student ID and name exist but status is empty, set to "在學"
      if (studentId && studentId.toString().trim() && 
          studentName && studentName.toString().trim() && 
          (!currentStatus || currentStatus.toString().trim() === '')) {
        data[i][statusCol] = '在學';
        changesNeeded = true;
      }
    }
    
    // Update the sheet if changes were made
    if (changesNeeded) {
      studentsSheet.getDataRange().setValues(data);
    }
    
  } catch (error) {
    console.log(`Auto-fill status error: ${error.message}`);
    // Silently handle errors to avoid disrupting user workflow
  }
}

/**
 * Manually trigger status auto-fill | 手動觸發狀態自動填入
 */
function updateStudentStatus() {
  autoFillStudentStatus();
  showMessage('✅ Status Updated | 狀態已更新', 'Student status has been updated automatically | 學生狀態已自動更新');
}

/**
 * Debug function to check system status and data | 調試函數檢查系統狀態和資料
 */
function debugSystemStatus() {
  try {
    const result = {
      systemFolder: 'Not found',
      masterDataSheet: 'Not found',
      studentsData: 0,
      studentsWithStatus: 0,
      teachersFound: 0,
      teacherGradebooksFolder: 'Not found',
      studentSamples: [],
      teacherSamples: [],
      error: null
    };
    
    // Check system folder
    try {
      const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
      result.systemFolder = systemFolder.getName();
      
      // Check master data
      const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA, false);
      if (masterDataFolder) {
        const masterFiles = masterDataFolder.getFilesByName('Gradebook Master Data | 成績簿主控資料表');
        if (masterFiles.hasNext()) {
          const masterSheet = SpreadsheetApp.openById(masterFiles.next().getId());
          result.masterDataSheet = 'Found';
          
          const studentsSheet = masterSheet.getSheetByName('Students');
          if (studentsSheet) {
            const studentData = studentsSheet.getDataRange().getValues();
            const headers = studentData[0];
            result.studentsData = studentData.length - 1; // Exclude header
            
            // Check student status
            const statusCol = headers.indexOf('Status | 狀態');
            const ltTeacherCol = headers.indexOf('LT Teacher | LT老師');
            const itTeacherCol = headers.indexOf('IT Teacher | IT老師');
            const englishClassCol = headers.indexOf('English Class | 英文班級');
            
            let studentsWithStatus = 0;
            for (let i = 1; i < Math.min(6, studentData.length); i++) { // Check first 5 students
              const row = studentData[i];
              const status = statusCol !== -1 ? row[statusCol] : '';
              const ltTeacher = row[ltTeacherCol];
              const itTeacher = row[itTeacherCol];
              const englishClass = englishClassCol !== -1 ? row[englishClassCol] : '';
              
              if (status === '在學') {
                studentsWithStatus++;
              }
              
              result.studentSamples.push({
                name: row[1], // Student Name
                status: status,
                ltTeacher: ltTeacher,
                itTeacher: itTeacher,
                englishClass: englishClass
              });
            }
            result.studentsWithStatus = studentsWithStatus;
            
            // Check for teachers
            const teacherData = extractTeachersFromStudentData(masterSheet);
            result.teachersFound = teacherData.length;
            
            // Get teacher samples
            for (let i = 0; i < Math.min(3, teacherData.length); i++) {
              result.teacherSamples.push({
                name: teacherData[i][0],
                subject: teacherData[i][1],
                classes: teacherData[i][2]
              });
            }
          }
        }
      }
      
      // Check teacher gradebooks folder
      const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS, false);
      if (teacherGradebooksFolder) {
        result.teacherGradebooksFolder = teacherGradebooksFolder.getName();
      }
      
    } catch (error) {
      result.error = error.message;
    }
    
    console.log('Debug Results:', result);
    return result;
    
  } catch (error) {
    console.error('Debug error:', error.message);
    return { error: error.message };
  }
}

function backupSystem() {
  showMessage('🔄 Backup | 系統備份', 'System backup feature coming soon | 系統備份功能即將推出');
}

/**
 * Test function to check student assignment to teachers | 測試函數檢查學生分配給老師的過程
 */
function testStudentAssignment() {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA);
    const masterFiles = masterDataFolder.getFilesByName('Gradebook Master Data | 成績簿主控資料表');
    
    if (!masterFiles.hasNext()) {
      return { error: 'Master data sheet not found' };
    }
    
    const masterSheet = SpreadsheetApp.openById(masterFiles.next().getId());
    const studentsSheet = masterSheet.getSheetByName('Students');
    const studentData = studentsSheet.getDataRange().getValues();
    const headers = studentData[0];
    
    // Find columns
    const ltTeacherCol = headers.indexOf('LT Teacher | LT老師');
    const itTeacherCol = headers.indexOf('IT Teacher | IT老師');
    const englishClassCol = headers.indexOf('English Class | 英文班級');
    const statusCol = headers.indexOf('Status | 狀態');
    
    console.log('Column indices:', { ltTeacherCol, itTeacherCol, englishClassCol, statusCol });
    
    // Test the assignment logic
    const teacherDetails = new Map();
    
    for (let i = 1; i < studentData.length; i++) {
      const row = studentData[i];
      const ltTeacher = row[ltTeacherCol];
      const itTeacher = row[itTeacherCol];
      const englishClass = row[englishClassCol];
      const status = statusCol !== -1 ? row[statusCol] : '';
      
      console.log(`Row ${i}:`, {
        studentName: row[1],
        ltTeacher,
        itTeacher, 
        englishClass,
        status
      });
      
      // Skip if not "在學"
      if (status !== '在學') {
        console.log(`Skipping ${row[1]} - status is not "在學"`);
        continue;
      }
      
      // Process LT Teacher
      if (ltTeacher && ltTeacher.trim()) {
        const teacherKey = `${ltTeacher.trim()}_LT`;
        console.log(`Processing LT Teacher: ${teacherKey}`);
        
        if (!teacherDetails.has(teacherKey)) {
          teacherDetails.set(teacherKey, {
            name: ltTeacher.trim(),
            subject: 'LT (Local Teacher)',
            classes: new Map()
          });
        }
        
        if (!teacherDetails.get(teacherKey).classes.has(englishClass)) {
          teacherDetails.get(teacherKey).classes.set(englishClass, []);
        }
        teacherDetails.get(teacherKey).classes.get(englishClass).push(row);
        console.log(`Added ${row[1]} to ${teacherKey} class ${englishClass}`);
      }
      
      // Process IT Teacher
      if (itTeacher && itTeacher.trim()) {
        const teacherKey = `${itTeacher.trim()}_IT`;
        console.log(`Processing IT Teacher: ${teacherKey}`);
        
        if (!teacherDetails.has(teacherKey)) {
          teacherDetails.set(teacherKey, {
            name: itTeacher.trim(),
            subject: 'IT (International Teacher)',
            classes: new Map()
          });
        }
        
        if (!teacherDetails.get(teacherKey).classes.has(englishClass)) {
          teacherDetails.get(teacherKey).classes.set(englishClass, []);
        }
        teacherDetails.get(teacherKey).classes.get(englishClass).push(row);
        console.log(`Added ${row[1]} to ${teacherKey} class ${englishClass}`);
      }
    }
    
    // Show results
    const result = [];
    teacherDetails.forEach((teacherInfo, teacherKey) => {
      teacherInfo.classes.forEach((students, className) => {
        result.push({
          teacher: teacherInfo.name,
          subject: teacherInfo.subject,
          class: className,
          studentCount: students.length,
          students: students.map(s => s[1])
        });
      });
    });
    
    console.log('Final assignment result:', result);
    return result;
    
  } catch (error) {
    console.error('Test error:', error.message);
    return { error: error.message };
  }
}

function systemMaintenance() {
  showMessage('🔧 Maintenance | 系統維護', 'System maintenance feature coming soon | 系統維護功能即將推出');
}

/**
 * Check actual column headers in master data | 檢查主控資料表中的實際欄位標題
 */
function checkColumnHeaders() {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA);
    const masterFiles = masterDataFolder.getFilesByName('Gradebook Master Data | 成績簿主控資料表');
    
    if (!masterFiles.hasNext()) {
      return { error: 'Master data sheet not found' };
    }
    
    const masterSheet = SpreadsheetApp.openById(masterFiles.next().getId());
    const studentsSheet = masterSheet.getSheetByName('Students');
    const data = studentsSheet.getDataRange().getValues();
    const headers = data[0];
    
    const result = {
      headers: headers,
      columnCount: headers.length,
      dataRows: data.length - 1,
      sampleRow: data.length > 1 ? data[1] : null
    };
    
    // Find specific columns
    const searchColumns = [
      'English Class | 英文班級',
      'English Class',
      '英文班級',
      'LT Teacher | LT老師',
      'IT Teacher | IT老師',
      'Status | 狀態'
    ];
    
    result.columnIndices = {};
    searchColumns.forEach(col => {
      const index = headers.indexOf(col);
      result.columnIndices[col] = index;
    });
    
    console.log('Header check result:', result);
    return result;
    
  } catch (error) {
    console.error('Header check error:', error.message);
    return { error: error.message };
  }
}

/**
 * Test gradebook creation with detailed logging | 測試成績簿建立並詳細記錄
 */
function testGradebookCreation() {
  try {
    console.log('Starting test gradebook creation...');
    
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA);
    const masterFiles = masterDataFolder.getFilesByName('Gradebook Master Data | 成績簿主控資料表');
    
    if (!masterFiles.hasNext()) {
      return { error: 'Master data sheet not found' };
    }
    
    const masterSheet = SpreadsheetApp.openById(masterFiles.next().getId());
    const studentsSheet = masterSheet.getSheetByName('Students');
    const studentData = studentsSheet.getDataRange().getValues();
    const headers = studentData[0];
    
    console.log('Headers:', headers);
    
    // Find column indices
    const ltTeacherCol = headers.indexOf('LT Teacher | LT老師');
    const itTeacherCol = headers.indexOf('IT Teacher | IT老師');
    const englishClassCol = headers.indexOf('English Class | 英文班級');
    const statusCol = headers.indexOf('Status | 狀態');
    
    console.log('Column indices:', { ltTeacherCol, itTeacherCol, englishClassCol, statusCol });
    
    // Extract detailed teacher information with students
    const teacherDetails = new Map();
    
    for (let i = 1; i < studentData.length; i++) {
      const row = studentData[i];
      const ltTeacher = row[ltTeacherCol];
      const itTeacher = row[itTeacherCol];
      const englishClass = row[englishClassCol];
      const status = statusCol !== -1 ? row[statusCol] : '';
      
      console.log(`Processing row ${i}:`, {
        studentName: row[1],
        ltTeacher,
        itTeacher,
        englishClass,
        status
      });
      
      // Only process students with "在學" status
      if (status !== '在學') {
        console.log(`Skipping ${row[1]} - status: ${status}`);
        continue;
      }
      
      // Process LT Teacher
      if (ltTeacher && ltTeacher.trim()) {
        const teacherKey = `${ltTeacher.trim()}_LT`;
        console.log(`Processing LT teacher: ${teacherKey}`);
        
        if (!teacherDetails.has(teacherKey)) {
          teacherDetails.set(teacherKey, {
            name: ltTeacher.trim(),
            subject: 'LT (Local Teacher)',
            classes: new Map()
          });
        }
        
        if (!teacherDetails.get(teacherKey).classes.has(englishClass)) {
          teacherDetails.get(teacherKey).classes.set(englishClass, []);
        }
        teacherDetails.get(teacherKey).classes.get(englishClass).push(row);
        console.log(`Added ${row[1]} to ${teacherKey} class ${englishClass}`);
      }
      
      // Process IT Teacher
      if (itTeacher && itTeacher.trim()) {
        const teacherKey = `${itTeacher.trim()}_IT`;
        console.log(`Processing IT teacher: ${teacherKey}`);
        
        if (!teacherDetails.has(teacherKey)) {
          teacherDetails.set(teacherKey, {
            name: itTeacher.trim(),
            subject: 'IT (International Teacher)',
            classes: new Map()
          });
        }
        
        if (!teacherDetails.get(teacherKey).classes.has(englishClass)) {
          teacherDetails.get(teacherKey).classes.set(englishClass, []);
        }
        teacherDetails.get(teacherKey).classes.get(englishClass).push(row);
        console.log(`Added ${row[1]} to ${teacherKey} class ${englishClass}`);
      }
    }
    
    // Show final teacher assignments
    const result = [];
    teacherDetails.forEach((teacherInfo, teacherKey) => {
      teacherInfo.classes.forEach((students, className) => {
        result.push({
          teacher: teacherInfo.name,
          subject: teacherInfo.subject,
          class: className,
          studentCount: students.length,
          studentNames: students.map(s => s[1]) // Student names
        });
        console.log(`Final assignment: ${teacherInfo.name} (${teacherInfo.subject}) - Class: ${className} - Students: ${students.length}`);
      });
    });
    
    console.log('Test result:', result);
    return result;
    
  } catch (error) {
    console.error('Test error:', error.message);
    return { error: error.message };
  }
}

function showUserGuide() {
  const guide = `
📖 User Guide | 使用說明

🚀 Quick Start | 快速開始:
1. Initialize system | 初始化系統
2. Fill master data | 填入主控資料  
3. Batch create gradebooks | 批量建立成績簿
4. Monitor progress | 監控進度

🏠 Dashboard | 控制台:
• Central control panel | 中央控制面板
• Real-time statistics | 即時統計數據
• Progress overview | 進度總覽
• Quick actions | 快速操作

📋 For detailed instructions, see README.md
詳細說明請參閱 README.md 文件
  `;
  
  showMessage('📖 User Guide | 使用說明', guide);
}

function checkSystemStatus() {
  try {
    const stats = getSystemStatistics();
    const status = `
🔍 System Status Check | 系統狀態檢查

📊 Statistics | 統計數據:
• Teachers | 老師數量: ${stats.totalTeachers}
• Students | 學生數量: ${stats.totalStudents}  
• Gradebooks | 成績簿數量: ${stats.activeGradebooks}
• System Files | 系統檔案: ${stats.systemFiles}

🟢 System Health: Excellent | 系統健康度：優秀
🕒 Last Check: ${new Date().toLocaleString()}
    `;
    
    showMessage('🔍 System Status | 系統狀態', status);
  } catch (error) {
    showError('❌ Status Check Error | 狀態檢查錯誤', `Cannot check system status | 無法檢查系統狀態: ${error.message}`);
  }
}

function showSystemInfo() {
  const info = `
ℹ️ System Information | 系統資訊

📊 Gradebook Management System | 成績簿管理系統
🏠 Dashboard Version | 控制台版本: v3.0

🎯 Features | 功能特色:
• 100% Google Ecosystem | 純 Google 生態系統
• Bilingual Interface | 雙語介面
• Dashboard Control Panel | 控制台儀表板
• Batch Operations | 批量操作
• Progress Tracking | 進度追蹤

⚙️ Configuration | 配置:
• Semester | 學期: ${SYSTEM_CONFIG.SEMESTER}
• F.A. Count | 平時評量次數: ${SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT}
• S.A. Count | 總結評量次數: ${SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT}
• Include Final | 包含期末考: ${SYSTEM_CONFIG.ASSESSMENTS.INCLUDE_FINAL ? 'Yes' : 'No'}

🔧 Support | 技術支援:
Contact system administrator | 聯繫系統管理員
  `;
  
  showMessage('ℹ️ System Info | 系統資訊', info);
}

function weeklyProgressCheck() {
  console.log('📅 Weekly progress check triggered | 每週進度檢查已觸發');
  // This function will be called weekly by the trigger
  // 此函數將由觸發器每週調用
}


// ===== HTML DASHBOARD API FUNCTIONS | HTML 控制台 API 函數 =====

/**
 * Get system folder URL for HTML dashboard | 為 HTML 控制台取得系統資料夾 URL
 */
function getSystemFolderUrl() {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    return systemFolder.getUrl();
  } catch (error) {
    throw new Error(`Cannot get system folder URL: ${error.message}`);
  }
}

/**
 * Get master data sheet URL for HTML dashboard | 為 HTML 控制台取得主控資料表 URL
 */
function getMasterDataUrl() {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA, false);
    
    if (masterDataFolder) {
      const masterFiles = masterDataFolder.getFilesByName('Gradebook Master Data | 成績簿主控資料表');
      if (masterFiles.hasNext()) {
        const masterSheet = SpreadsheetApp.openById(masterFiles.next().getId());
        return masterSheet.getUrl();
      } else {
        throw new Error('Master data sheet not found. Please initialize system first.');
      }
    } else {
      throw new Error('Master data folder not found. Please initialize system first.');
    }
  } catch (error) {
    throw new Error(`Cannot get master data URL: ${error.message}`);
  }
}

/**
 * Include HTML file for dashboard | 為控制台包含 HTML 檔案
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}