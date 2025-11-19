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
// Configuration is now loaded from config-loader.gs | 配置現在從 config-loader.gs 載入
// This ensures centralized configuration management | 這確保了集中化的配置管理

/**
 * IMPORTANT NOTE | 重要說明:
 * The SYSTEM_CONFIG is now loaded from config-loader.gs file
 * All configuration changes should be made in config/environment.js
 * 
 * SYSTEM_CONFIG 現在從 config-loader.gs 檔案載入
 * 所有配置變更都應在 config/environment.js 中進行
 */

// ===== WEB APP DEPLOYMENT | 網頁應用程式部署 =====

/**
 * Handle web app GET requests | 處理網頁應用程式 GET 請求
 */
function doGet(e) {
  try {
    // Simple, stable configuration loading
    let config;
    try {
      config = getSystemConfig();
    } catch (configError) {
      // Use minimal fallback if config fails
      config = {
        SYSTEM_NAME: 'Gradebook System',
        SEMESTER: '2526F1'
      };
    }
    
    // Check for page parameter
    const page = e.parameter.page;
    
    if (page === 'ht') {
      // HT Dashboard
      const template = HtmlService.createTemplateFromFile('dashboard_for_HT');
      template.config = config;
      template.timestamp = new Date().toLocaleString();
      
      return template.evaluate()
        .setTitle('HT Dashboard')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
        
    } else {
      // Main Dashboard
      const template = HtmlService.createTemplateFromFile('dashboard');
      template.config = config;
      template.timestamp = new Date().toLocaleString();
      
      return template.evaluate()
        .setTitle('Gradebook System Dashboard')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    }
    
  } catch (error) {
    // Simple error page
    return HtmlService.createHtmlOutput(`
      <h1>System Error</h1>
      <p>Error: " + error.message + "</p>
      <button onclick="window.location.reload()">Reload</button>
    `);
  }
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
      .addItem('👨‍🏫 Create HT Gradebooks | 建立HT成績簿', 'createHTGradebooks')
      .addSeparator()
      .addItem('📊 Check All Gradebooks | 檢查所有成績簿', 'checkAllGradebooks')
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
    
    .addSubMenu(ui.createMenu('🏷️ Assessment Management | 評量管理')
      .addItem('🎯 Simple HT Manager | 簡化HT管理', 'simpleHTAssessmentManager')
      .addSeparator()
      .addItem('➕ Add HT Sheet | 新增HT工作表', 'addHTSheetToExistingMasterData')
      .addSeparator()
      .addItem('👨‍🏫 HT Dashboard | HT控制台', 'openHTDashboard')
      .addItem('🔄 Quick Sync | 快速同步', 'quickSyncAssessmentTitles')
      .addSeparator()
      .addItem('✏️ Edit Assessment Titles | 編輯評量標題', 'manageHTAssessmentTitles')
      .addItem('🔄 Reset to Default | 重設為預設', 'resetHTAssessmentTitles')
      .addItem('💾 Sync All Classes | 同步所有班級', 'syncHTAssessmentTitles'))
    
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
      'Open this URL in your browser | 在瀏覽器中開啟此網址:\n\n' + scriptUrl + '\n\n📱 You can bookmark this URL for quick access | 您可以將此網址加入書籤以便快速存取'
    );
  } catch (error) {
    showError('❌ Dashboard Error | 控制台錯誤', 'Failed to get dashboard URL | 無法取得控制台網址: ' + error.message);
  }
}

/**
 * Extract teachers and their class assignments from Classes sheet | 從班級工作表中提取老師及其班級分配
 */
function extractTeachersFromClassesSheet(masterSheet) {
  try {
    const classesSheet = masterSheet.getSheetByName('Classes | 班級資料');
    if (!classesSheet) {
      throw new Error('Classes sheet not found');
    }
    
    // Get class data | 取得班級資料
    const classData = classesSheet.getDataRange().getValues();
    
    // Skip headers and first 4 rows, data starts at row 5 (index 4)
    const teacherData = new Map();
    
    for (let i = 4; i < classData.length; i++) {
      const row = classData[i];
      const className = row[0]; // Class Name
      const ltTeacher = row[1]; // LT
      const itTeacher = row[2]; // IT
      const level = row[3]; // Level
      const studentCount = row[4]; // 學生人數
      
      // Skip empty rows
      if (!className || !level) continue;
      
      // Process LT Teacher | 處理 LT 老師
      if (ltTeacher && ltTeacher.trim()) {
        const teacherKey = ltTeacher + '_LT';
        if (!teacherData.has(teacherKey)) {
          teacherData.set(teacherKey, {
            name: ltTeacher.trim(),
            subject: 'LT (Local Teacher)',
            classes: new Set(),
            students: [],
            classDetails: []
          });
        }
        
        const teacher = teacherData.get(teacherKey);
        teacher.classes.add(className);
        teacher.classDetails.push({
          className: className,
          level: level,
          expectedStudentCount: parseInt(studentCount) || 0
        });
      }
      
      // Process IT Teacher | 處理 IT 老師
      if (itTeacher && itTeacher.trim()) {
        const teacherKey = itTeacher + '_IT';
        if (!teacherData.has(teacherKey)) {
          teacherData.set(teacherKey, {
            name: itTeacher.trim(),
            subject: 'IT (International Teacher)',
            classes: new Set(),
            students: [],
            classDetails: []
          });
        }
        
        const teacher = teacherData.get(teacherKey);
        teacher.classes.add(className);
        teacher.classDetails.push({
          className: className,
          level: level,
          expectedStudentCount: parseInt(studentCount) || 0
        });
      }
    }
    
    // Now populate students for each teacher based on Students sheet | 現在根據學生工作表為每位老師填入學生資料
    const studentsSheet = masterSheet.getSheetByName('Students');
    if (studentsSheet) {
      populateStudentsForTeachers(teacherData, studentsSheet);
    }
    
    // Convert Map to Array | 將 Map 轉換為陣列
    const teacherArray = Array.from(teacherData.values()).map(teacher => ({
      ...teacher,
      classes: Array.from(teacher.classes)
    }));
    
    return teacherArray;
    
  } catch (error) {
    console.log(`Error extracting teachers from Classes sheet: ${error.message}`);
    throw error;
  }
}

/**
 * Populate students for teachers based on Students sheet assignments | 根據學生工作表分配為老師填入學生
 */
function populateStudentsForTeachers(teacherData, studentsSheet) {
  try {
    const studentData = studentsSheet.getDataRange().getValues();
    const headers = studentData[0];
    
    // Find column indices | 找到欄位索引
    const ltTeacherCol = headers.indexOf('LT Teacher | LT老師');
    const itTeacherCol = headers.indexOf('IT Teacher | IT老師');
    const englishClassCol = headers.indexOf('English Class | 英文班級');
    const statusCol = headers.indexOf('Status | 狀態');
    
    if (ltTeacherCol === -1 || itTeacherCol === -1 || englishClassCol === -1) {
      return;
    }
    
    for (let i = 1; i < studentData.length; i++) {
      const row = studentData[i];
      const ltTeacher = row[ltTeacherCol];
      const itTeacher = row[itTeacherCol];
      const englishClass = row[englishClassCol];
      const status = statusCol !== -1 ? row[statusCol] : '';
      
      // Only process active students | 只處理活躍學生
      const hasBasicInfo = row[0] && row[0].toString().trim() && row[1] && row[1].toString().trim();
      const isActive = status === '在學' || (hasBasicInfo && (!status || status.toString().trim() === ''));
      
      if (!isActive) continue;
      
      const studentInfo = {
        studentId: row[0] || '',
        studentName: row[1] || '',
        englishName: row[2] || '',
        grade: row[3] || '',
        homeroom: row[4] || '',
        englishClass: englishClass || '',
        ltTeacher: ltTeacher || '',
        itTeacher: itTeacher || '',
        email: row[8] || '',
        status: status || ''
      };
      
      // Assign to LT Teacher
      if (ltTeacher && ltTeacher.trim()) {
        const teacherKey = ltTeacher + '_LT';
        const teacher = teacherData.get(teacherKey);
        if (teacher) {
          teacher.students.push(studentInfo);
        }
      }
      
      // Assign to IT Teacher
      if (itTeacher && itTeacher.trim()) {
        const teacherKey = itTeacher + '_IT';
        const teacher = teacherData.get(teacherKey);
        if (teacher) {
          teacher.students.push(studentInfo);
        }
      }
    }
    
  } catch (error) {
    console.log(`Error populating students: ${error.message}`);
  }
}

/**
 * Validate that student class assignments match Classes sheet definitions | 驗證學生班級分配與班級工作表定義一致
 */
function validateStudentClassAssignments() {
  try {
    const config = getSystemConfig();
    const systemFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, config.FOLDERS.MASTER_DATA, false);
    
    if (!masterDataFolder) {
      throw new Error('Master data folder not found');
    }
    
    const masterFiles = masterDataFolder.getFilesByName('Gradebook Master Data | 成績簿主控資料表');
    if (!masterFiles.hasNext()) {
      throw new Error('Master data sheet not found');
    }
    
    const masterSheet = SpreadsheetApp.openById(masterFiles.next().getId());
    
    // Get Classes sheet data
    const allClasses = getAllClassConfigurations();
    const definedClasses = new Set(allClasses.map(c => c.className));
    
    // Get Students sheet data
    const studentsSheet = masterSheet.getSheetByName('Students');
    if (!studentsSheet) {
      throw new Error('Students sheet not found');
    }
    
    const studentData = studentsSheet.getDataRange().getValues();
    const headers = studentData[0];
    const englishClassCol = headers.indexOf('English Class | 英文班級');
    const statusCol = headers.indexOf('Status | 狀態');
    
    const issues = [];
    const undefinedClasses = new Set();
    
    for (let i = 1; i < studentData.length; i++) {
      const row = studentData[i];
      const englishClass = row[englishClassCol];
      const status = statusCol !== -1 ? row[statusCol] : '';
      const studentName = row[1] || '';
      
      // Only check active students
      const hasBasicInfo = row[0] && row[0].toString().trim() && row[1] && row[1].toString().trim();
      const isActive = status === '在學' || (hasBasicInfo && (!status || status.toString().trim() === ''));
      
      if (!isActive) continue;
      
      if (englishClass && !definedClasses.has(englishClass)) {
        undefinedClasses.add(englishClass);
        issues.push(`Student "${studentName}" assigned to undefined class "${englishClass}"`);
      }
    }
    
    return {
      isValid: issues.length === 0,
      issues: issues,
      undefinedClasses: Array.from(undefinedClasses),
      definedClasses: Array.from(definedClasses)
    };
    
  } catch (error) {
    console.log(`Error validating student class assignments: ${error.message}`);
    return {
      isValid: false,
      issues: [`Validation error: ${error.message}`],
      undefinedClasses: [],
      definedClasses: []
    };
  }
}

/**
 * Extract teachers from student data (LEGACY) | 從學生資料提取老師資訊 (舊版)
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
      
      // Only process students with "在學" status OR if Student ID and Name exist | 只處理狀態為"在學"的學生，或者學生編號和姓名都存在
      const hasBasicInfo = row[0] && row[0].toString().trim() && row[1] && row[1].toString().trim();
      const isActive = status === '在學' || (hasBasicInfo && (!status || status.toString().trim() === ''));
      
      if (!isActive) {
        continue;
      }
      
      // Process LT Teacher | 處理 LT 老師
      if (ltTeacher && ltTeacher.trim()) {
        const teacherKey = ltTeacher + '_LT';
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
        const teacherKey = itTeacher + '_IT';
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
    const config = getSystemConfig();
    const systemFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, config.FOLDERS.MASTER_DATA, false);
    
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
    const config = getSystemConfig();
    const systemFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    
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
      const masterDataFolder = getSubFolder(systemFolder, config.FOLDERS.MASTER_DATA, false);
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
      const gradebooksFolder = getSubFolder(systemFolder, config.FOLDERS.TEACHER_SHEETS, false);
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
 * Initialize system for Web App - Returns result object instead of showing dialogs
 * Web App 專用初始化函數 - 回傳結果物件而不顯示對話框
 */
function initializeSystemForWebApp() {
  try {
    console.log('🚀 Starting Web App initialization...');
    
    // Check configuration first
    const config = getSystemConfig();
    if (!config || !config.MAIN_FOLDER_ID) {
      return {
        success: false,
        error: 'System configuration failed to load. Missing MAIN_FOLDER_ID.',
        details: 'Configuration system may need repair.'
      };
    }
    
    console.log('✅ Configuration loaded:', config.SYSTEM_NAME);
    
    // 1. Create system folder structure | 建立系統資料夾結構
    console.log('📁 Creating system folders...');
    const systemFolder = createSystemFolders();
    
    // 2. Create master data sheet | 建立主控資料表
    console.log('📋 Creating master data sheet...');
    const masterDataSheet = createMasterDataSheet(systemFolder);
    
    // 3. Create dashboard | 建立控制台
    console.log('🎛️ Setting up dashboard...');
    const dashboard = getOrCreateDashboard();
    
    // 4. Create system settings sheet | 建立系統設定表
    console.log('⚙️ Creating system settings...');
    const configSheet = createConfigSheet(systemFolder);
    
    // 5. Setup automation triggers | 設定自動化觸發器
    console.log('🤖 Setting up triggers...');
    setupTriggers();
    
    // 6. Create gradebook template | 建立成績簿範本
    console.log('📝 Creating gradebook template...');
    const template = createGradebookTemplate(systemFolder);
    
    console.log('✅ Web App initialization completed successfully');
    
    return {
      success: true,
      message: 'System initialized successfully!',
      details: {
        systemFolder: systemFolder.getUrl(),
        masterDataSheet: masterDataSheet.getUrl(),
        dashboard: dashboard.getUrl(),
        configSheet: configSheet.getUrl()
      }
    };
    
  } catch (error) {
    console.error('❌ Web App initialization failed:', error);
    return {
      success: false,
      error: error.message,
      details: 'Please check Google Drive permissions and try again.'
    };
  }
}

/**
 * Create system folder structure | 建立系統資料夾結構
 */
function createSystemFolders() {
  try {
    // Get configuration safely | 安全地獲取配置
    const config = getSystemConfig();
    if (!config || !config.MAIN_FOLDER_ID) {
      throw new Error('System configuration missing MAIN_FOLDER_ID');
    }
    
    // Use specified folder ID | 使用指定的資料夾 ID
    const mainFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    
    // Check and create subfolders | 檢查並建立子資料夾
    Object.values(config.FOLDERS).slice(1).forEach(folderName => {
      if (!getSubFolder(mainFolder, folderName, false)) {
        mainFolder.createFolder(folderName);
      } else {
      }
    });
    
    return mainFolder;
    
  } catch (error) {
    if (error.message.includes('File not found')) {
      throw new Error(`❌ Cannot find specified folder ID: ${config.MAIN_FOLDER_ID}\nPlease verify the folder ID is correct and accessible | 無法找到指定的資料夾 ID，請確認資料夾 ID 正確且有存取權限`);
    }
    throw error;
  }
}

/**
 * Create master data sheet with bilingual headers | 建立具有雙語標題的主控資料表
 */
function createMasterDataSheet(systemFolder) {
  const config = getSystemConfig();
  const masterDataFolder = getSubFolder(systemFolder, config.FOLDERS.MASTER_DATA);
  
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
    'Level | 等級',
    'LT Teacher | LT老師',
    'IT Teacher | IT老師',
    'Email | 電子郵件',
    'Status | 狀態'
  ];
  
  studentsSheet.getRange(1, 1, 1, studentHeaders.length).setValues([studentHeaders]);
  studentsSheet.getRange(1, 1, 1, studentHeaders.length).setFontWeight('bold').setBackground('#4285F4').setFontColor('white');
  
  // Empty student data array - Users should add their actual student data | 空學生資料陣列 - 用戶需自行添加真實學生資料
  // Format: [Student ID, Full Name, English Name, Grade, Homeroom Number, Homeroom Name, English Class, LT Teacher, IT Teacher, Email, Status]
  // 格式：[學生編號, 全名, 英文名, 年級, 導師班編號, 導師班名稱, 英文班級, LT老師, IT老師, 電子郵件, 狀態]
  const sampleStudents = [
    // Add your real student data here | 在此新增真實學生資料
    // Example format: ['ID001', 'Student Name', 'English Name', 'G1', '101', 'Class Name', 'G1E1', 'LT Teacher Name', 'IT Teacher Name', 'email@school.edu', '在學']
    // 範例格式：['ID001', '學生姓名', 'English Name', 'G1', '101', '班級名稱', 'G1E1', 'LT老師姓名', 'IT老師姓名', 'email@school.edu', '在學']
  ];
  
  // Only add data if sampleStudents array is not empty | 只在學生資料陣列不為空時新增資料
  if (sampleStudents.length > 0) {
    studentsSheet.getRange(2, 1, sampleStudents.length, studentHeaders.length).setValues(sampleStudents);
  }
  
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
  
  // Setup Classes sheet | 設定班級資料工作表
  const classesSheet = masterSheet.insertSheet('Classes | 班級資料');
  
  // Title | 標題
  classesSheet.getRange('A1:E1').merge().setValue('📚 Class Configuration | 班級配置');
  classesSheet.getRange('A1').setFontSize(16).setFontWeight('bold').setHorizontalAlignment('center');
  classesSheet.getRange('A1:E1').setBackground('#FF5722').setFontColor('white');
  
  // Instructions | 說明
  classesSheet.getRange('A2:E2').merge().setValue('Configure class information and assessment titles | 配置班級資訊和評量標題');
  classesSheet.getRange('A2').setFontStyle('italic').setHorizontalAlignment('center');
  classesSheet.getRange('A2:E2').setBackground('#FFEBE9');
  
  // Headers for classes | 班級資料標題
  const classHeaders = [
    'Class Name',
    'LT',
    'IT', 
    'Level',
    '學生人數'
  ];
  
  classesSheet.getRange(4, 1, 1, classHeaders.length).setValues([classHeaders]);
  classesSheet.getRange(4, 1, 1, classHeaders.length).setFontWeight('bold').setBackground('#FF5722').setFontColor('white');
  
  // Empty class data array - Users should add their actual class data | 空班級資料陣列 - 用戶需自行添加真實班級資料
  // Format: [Class Name, LT Teacher, IT Teacher, Level, Student Count]
  // 格式：[班級名稱, LT老師, IT老師, 等級, 學生人數]
  const sampleClasses = [
    // Add your real class data here | 在此新增真實班級資料
    // Example format: ['Class Name', 'LT Teacher Name', 'IT Teacher Name', 'G1E1', '25']
    // 範例格式：['班級名稱', 'LT老師姓名', 'IT老師姓名', 'G1E1', '25']
  ];
  
  // Only add data if sampleClasses array is not empty | 只在班級資料陣列不為空時新增資料
  if (sampleClasses.length > 0) {
    classesSheet.getRange(5, 1, sampleClasses.length, classHeaders.length).setValues(sampleClasses);
  }
  
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
  
  // Setup HT (Head Teachers) sheet with Google account integration | 設定學年主任資料工作表包含Google帳號整合
  const htSheet = masterSheet.insertSheet('HT Teachers | HT老師');
  
  // Title | 標題
  htSheet.getRange('A1:F1').merge().setValue('👨‍🏫 Head Teachers Configuration | 學年主任配置');
  htSheet.getRange('A1').setFontSize(16).setFontWeight('bold').setHorizontalAlignment('center');
  htSheet.getRange('A1:F1').setBackground('#34A853').setFontColor('white');
  
  // Instructions | 說明
  htSheet.getRange('A2:F2').merge().setValue('Configure Head Teachers for each grade level | 配置各年級的學年主任');
  htSheet.getRange('A2').setFontStyle('italic').setHorizontalAlignment('center');
  htSheet.getRange('A2:F2').setBackground('#E8F5E8');
  
  // Headers for HT data including Google accounts | HT資料標題包含Google帳號
  const htHeaders = [
    'Grade | 年級',
    'IT HT Name | IT學年主任',
    'LT HT Name | LT學年主任', 
    'Notes | 備註',
    'IT Google Account | IT Google帳號',
    'LT Google Account | LT Google帳號'
  ];
  
  htSheet.getRange(4, 1, 1, htHeaders.length).setValues([htHeaders]);
  htSheet.getRange(4, 1, 1, htHeaders.length).setFontWeight('bold').setBackground('#34A853').setFontColor('white');
  
  // Add comprehensive HT data with Google accounts | 新增完整HT資料包含Google帳號
  const sampleHTs = [
    // Add your real HT teacher data here | 在此新增真實HT教師資料
  ];
  
  if (sampleHTs.length > 0) {
    htSheet.getRange(5, 1, sampleHTs.length, htHeaders.length).setValues(sampleHTs);
  }
  
  // Set up data validation for Grade column | 設定年級欄位的資料驗證
  const gradeRange = htSheet.getRange('A5:A10'); // Grade column for sample data
  const gradeRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['G1', 'G2', 'G3', 'G4', 'G5', 'G6'])
    .setAllowInvalid(false)
    .setHelpText('Select grade level | 選擇年級')
    .build();
  gradeRange.setDataValidation(gradeRule);
  
  // Add usage instructions | 新增使用說明
  htSheet.getRange('H1').setValue('💡 Usage Instructions | 使用說明');
  htSheet.getRange('H1').setFontWeight('bold').setFontSize(12).setBackground('#FFF3C4');
  htSheet.getRange('H2').setValue('1. Each grade should have exactly 2 HTs (IT and LT)');
  htSheet.getRange('H3').setValue('2. IT HT manages IT teacher assessment titles');
  htSheet.getRange('H4').setValue('3. LT HT manages LT teacher assessment titles');
  htSheet.getRange('H5').setValue('4. Enter Google email for each HT');
  htSheet.getRange('H6').setValue('5. HT can only edit their grade level (E1, E2, E3)');
  htSheet.getRange('H7').setValue('');
  htSheet.getRange('H8').setValue('1. 每個年級都應該有2位HT（IT和LT）');
  htSheet.getRange('H9').setValue('2. IT HT管理IT老師的評量標題');
  htSheet.getRange('H10').setValue('3. LT HT管理LT老師的評量標題');
  htSheet.getRange('H11').setValue('4. 為每位HT輸入Google電子郵件');
  htSheet.getRange('H12').setValue('5. HT只能編輯自己年級的級別（E1, E2, E3）');
  
  // Auto-resize columns | 自動調整欄寬
  htSheet.autoResizeColumns(1, htHeaders.length);

  
  // Auto-generate teachers from sample student data | 從範例學生資料自動生成老師
  try {
    const teacherData = extractTeachersFromStudentData(masterSheet);
    const teachersSheet = masterSheet.getSheetByName('Auto-Generated Teachers | 自動生成老師');
    
    if (teachersSheet && teacherData.length > 0) {
      // Clear existing data (keep headers) | 清除現有資料（保留標題）
      const lastRow = teachersSheet.getLastRow();
      if (lastRow > 4) {
        teachersSheet.getRange(5, 1, lastRow - 4, 6).clear();
      }
      
      // Add new teacher data | 新增老師資料
      teachersSheet.getRange(5, 1, teacherData.length, 6).setValues(teacherData);
      
      // Add summary | 新增摘要
      const summaryRow = 5 + teacherData.length + 1;
      teachersSheet.getRange(summaryRow, 1, 1, 6).merge().setValue(
        `📊 Summary: Found ${teacherData.length} teachers extracted from student data | 摘要：從學生資料中提取了 ${teacherData.length} 位老師`
      );
      teachersSheet.getRange(summaryRow, 1).setBackground('#E8F5E8').setFontWeight('bold');
      
    }
  } catch (error) {
  }
  
  return masterSheet;
}

/**
 * Add HT Teachers sheet to existing Master Data if it doesn't exist | 如果HT老師工作表不存在，則新增到現有的主控資料表
 */
function addHTSheetToExistingMasterData() {
  try {
    
    // Access Master Data using standard pattern
    const config = getSystemConfig();
    const systemFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, config.FOLDERS.MASTER_DATA, false);
    
    const masterFiles = masterDataFolder.getFilesByName('Gradebook Master Data | 成績簿主控資料表');
    if (!masterFiles.hasNext()) {
      throw new Error('Master data sheet not found | 找不到主控資料表');
    }
    
    const masterSheet = SpreadsheetApp.openById(masterFiles.next().getId());
    
    // Check if HT sheet already exists
    let htSheet = masterSheet.getSheetByName('HT Teachers | HT老師');
    if (htSheet) {
      showMessage('Sheet Exists | 工作表已存在', 'HT Teachers sheet already exists in Master Data | HT老師工作表已存在於主控資料表中');
      return htSheet;
    }
    
    // Create new HT sheet
    htSheet = masterSheet.insertSheet('HT Teachers | HT老師');
    
    // Setup the HT sheet with Google account integration
    // Title | 標題
    htSheet.getRange('A1:F1').merge().setValue('👨‍🏫 Head Teachers Configuration | 學年主任配置');
    htSheet.getRange('A1').setFontSize(16).setFontWeight('bold').setHorizontalAlignment('center');
    htSheet.getRange('A1:F1').setBackground('#34A853').setFontColor('white');
    
    // Instructions | 說明
    htSheet.getRange('A2:F2').merge().setValue('Configure Head Teachers for each grade level | 配置各年級的學年主任');
    htSheet.getRange('A2').setFontStyle('italic').setHorizontalAlignment('center');
    htSheet.getRange('A2:F2').setBackground('#E8F5E8');
    
    // Headers for HT data | HT資料標題
    const htHeaders = [
      'Grade | 年級',
      'IT HT Name | IT學年主任',
      'LT HT Name | LT學年主任', 
      'Notes | 備註',
      'IT Google Account | IT Google帳號',
      'LT Google Account | LT Google帳號'
    ];
    
    htSheet.getRange(4, 1, 1, htHeaders.length).setValues([htHeaders]);
    htSheet.getRange(4, 1, 1, htHeaders.length).setFontWeight('bold').setBackground('#34A853').setFontColor('white');
    
    // Add sample HT data for all grades with Google accounts | 新增所有年級的範例HT資料包含Google帳號
    const sampleHTs = [
      ['G1', 'Ms. Sarah Johnson', '李小明', 'Grade 1 Head Teachers', 'sarah.johnson@school.edu', 'ming.lee@school.edu'],
      ['G2', 'Mr. David Brown', '王美華', 'Grade 2 Head Teachers', 'david.brown@school.edu', 'meihua.wang@school.edu'],
      ['G3', 'Ms. Emily Davis', '張志強', 'Grade 3 Head Teachers', 'emily.davis@school.edu', 'zhiqiang.zhang@school.edu'],
      ['G4', 'Mr. Michael Wilson', '陳淑芬', 'Grade 4 Head Teachers', 'michael.wilson@school.edu', 'shufen.chen@school.edu'],
      ['G5', 'Ms. Jessica Taylor', '劉建國', 'Grade 5 Head Teachers', 'jessica.taylor@school.edu', 'jianguo.liu@school.edu'],
      ['G6', 'Mr. Robert Anderson', '黃麗娟', 'Grade 6 Head Teachers', 'robert.anderson@school.edu', 'lijuan.huang@school.edu']
    ];
    
    htSheet.getRange(5, 1, sampleHTs.length, htHeaders.length).setValues(sampleHTs);
    
    // Set up data validation for Grade column | 設定年級欄位的資料驗證
    const gradeRange = htSheet.getRange('A5:A10'); // Grade column for sample data
    const gradeRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['G1', 'G2', 'G3', 'G4', 'G5', 'G6'])
      .setAllowInvalid(false)
      .setHelpText('Select grade level | 選擇年級')
      .build();
    gradeRange.setDataValidation(gradeRule);
    
    // Add usage instructions | 新增使用說明
    htSheet.getRange('H1').setValue('💡 Usage Instructions | 使用說明');
    htSheet.getRange('H1').setFontWeight('bold').setFontSize(12).setBackground('#FFF3C4');
    htSheet.getRange('H2').setValue('1. Each grade should have exactly 2 HTs (IT and LT)');
    htSheet.getRange('H3').setValue('2. IT HT manages IT teacher assessment titles');
    htSheet.getRange('H4').setValue('3. LT HT manages LT teacher assessment titles');
    htSheet.getRange('H5').setValue('4. Enter Google email for each HT');
    htSheet.getRange('H6').setValue('5. HT can only edit their grade level (E1, E2, E3)');
    htSheet.getRange('H7').setValue('');
    htSheet.getRange('H8').setValue('1. 每個年級都應該有2位HT（IT和LT）');
    htSheet.getRange('H9').setValue('2. IT HT管理IT老師的評量標題');
    htSheet.getRange('H10').setValue('3. LT HT管理LT老師的評量標題');
    htSheet.getRange('H11').setValue('4. 為每位HT輸入Google電子郵件');
    htSheet.getRange('H12').setValue('5. HT只能編輯自己年級的級別（E1, E2, E3）');
    
    // Auto-resize columns | 自動調整欄寬
    htSheet.autoResizeColumns(1, htHeaders.length);
    
    showMessage('Success | 成功', 'HT Teachers sheet has been added to Master Data | HT老師工作表已新增到主控資料表');
    
    return htSheet;
    
  } catch (error) {
    console.error('❌ Error adding HT sheet:', error.message);
    showError('Error | 錯誤', `Failed to add HT Teachers sheet: ${error.message} | 無法新增HT老師工作表: ${error.message}`);
    throw error;
  }
}

/**
 * Get HT (Head Teacher) information from Master Data | 從主控資料表取得學年主任資訊
 */
function getHTData() {
  try {
    // Access Master Data
    const config = getSystemConfig();
    const systemFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, config.FOLDERS.MASTER_DATA, false);
    
    const masterFiles = masterDataFolder.getFilesByName('Gradebook Master Data | 成績簿主控資料表');
    if (!masterFiles.hasNext()) {
      throw new Error('Master data sheet not found | 找不到主控資料表');
    }
    
    const masterSheet = SpreadsheetApp.openById(masterFiles.next().getId());
    const htSheet = masterSheet.getSheetByName('HT Teachers | HT老師');
    
    if (!htSheet) {
      throw new Error('HT Teachers sheet not found | 找不到HT老師工作表');
    }
    
    // Get HT data starting from row 5 (after headers)
    const lastRow = htSheet.getLastRow();
    if (lastRow < 5) {
      return {}; // No HT data
    }
    
    // Get more columns to include Google accounts (columns A-F)
    const htData = htSheet.getRange(5, 1, lastRow - 4, 6).getValues();
    const htMap = {};
    
    // Convert to map for easy lookup
    htData.forEach(row => {
      const [grade, itHT, ltHT, notes, itGoogleAccount, ltGoogleAccount] = row;
      if (grade && (itHT || ltHT)) {
        htMap[grade] = {
          itHT: itHT || '',
          ltHT: ltHT || '',
          notes: notes || '',
          itGoogleAccount: itGoogleAccount || '',
          ltGoogleAccount: ltGoogleAccount || ''
        };
      }
    });
    
    return htMap;
    
  } catch (error) {
    console.error('Error getting HT data:', error.message);
    return {};
  }
}

/**
 * Identify current user as HT and determine their permissions | 識別當前用戶為HT並確定其權限
 */
function getCurrentHTContext() {
  try {
    const currentFile = SpreadsheetApp.getActiveSpreadsheet();
    const fileName = currentFile.getName();
    const userEmail = Session.getActiveUser().getEmail();
    
    
    // Get HT data from Master Data
    const htData = getHTData();
    
    // Check if current file is an HT gradebook by filename pattern
    // Support multiple patterns:
    // 1. New format: "G1_IT_HT_Ms_Smith_2526F1_Gradebook"
    // 2. Old format: "G1 IT HT - John Smith - Gradebook" or "G1 LT HT - 李小明 - 成績簿"
    let match = null;
    let grade, teacherType, htName;
    
    // Try new format first
    const newPattern = /^(G[1-6])_(IT|LT)_HT_(.+?)_\d{4}S\d_Gradebook$/i;
    match = fileName.match(newPattern);
    
    if (match) {
      [, grade, teacherType, htName] = match;
      htName = htName.replace(/_/g, ' '); // Convert underscores back to spaces
    } else {
      // Try old format
      const oldPattern = /^(G[1-6])\s+(IT|LT)\s+HT\s+-\s+(.+?)\s+-\s+(Gradebook|成績簿)/i;
      match = fileName.match(oldPattern);
      
      if (match) {
        [, grade, teacherType, htName] = match;
      }
    }
    
    if (!match) {
      return null; // Not an HT gradebook
    }
    const gradeData = htData[grade];
    
    if (!gradeData) {
      return null;
    }
    
    // Verify HT name matches
    const expectedName = teacherType === 'IT' ? gradeData.itHT : gradeData.ltHT;
    
    if (!expectedName || !htName.includes(expectedName.split(' ')[0])) {
      return null;
    }
    
    // Generate allowed levels for this HT
    const allowedLevels = [`${grade}E1`, `${grade}E2`, `${grade}E3`];
    
    return {
      isHT: true,
      grade: grade,
      teacherType: teacherType,
      htName: htName,
      allowedLevels: allowedLevels,
      fileName: fileName
    };
    
  } catch (error) {
    console.error('Error getting HT context:', error.message);
    return null;
  }
}

/**
 * Check if current user has HT permissions for assessment title management | 檢查當前用戶是否有評量標題管理的HT權限
 */
function checkHTPermissions() {
  const htContext = getCurrentHTContext();
  
  if (!htContext) {
    showError(
      'Access Denied | 拒絕存取',
      'This function is only available to Head Teachers in their HT gradebook files. | 此功能僅供學年主任在其HT成績簿檔案中使用。'
    );
    return null;
  }
  
  return htContext;
}

/**
 * HT Login and Management Interface | HT登入管理界面
 */
function htLoginAndManage() {
  try {
    
    // Get HT data from Master Data
    const htData = getHTData();
    if (!htData || Object.keys(htData).length === 0) {
      showError('No HT Data | 無HT資料', 'No HT teachers found in Master Data. Please add HT teachers first. | 在主控資料中找不到HT老師。請先新增HT老師。');
      return;
    }
    
    // Show HT selection interface
    showHTSelectionInterface(htData);
    
  } catch (error) {
    console.error('Error in htLoginAndManage:', error.message);
    showError('Error | 錯誤', `Failed to open HT management: ${error.message} | 無法開啟HT管理: ${error.message}`);
  }
}

/**
 * Show HT selection interface | 顯示HT選擇界面
 */
function showHTSelectionInterface(htData) {
  let html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>👨‍🏫 HT Assessment Management | HT評量管理</h2>
      <p>Please select your identity to access assessment title management. | 請選擇您的身份以存取評量標題管理。</p>
      
      <div style="background-color: #f0f8ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3>📋 Select Your HT Role | 選擇您的HT角色</h3>
        <p>Choose your grade and teacher type to manage assessment titles. | 選擇您的年級和老師類型來管理評量標題。</p>
      </div>
      
      <form id="htSelectionForm">
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #34A853; color: white;">
              <th style="padding: 10px; border: 1px solid #ddd;">Select | 選擇</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Grade | 年級</th>
              <th style="padding: 10px; border: 1px solid #ddd;">IT HT</th>
              <th style="padding: 10px; border: 1px solid #ddd;">LT HT</th>
            </tr>
          </thead>
          <tbody>
  `;
  
  // Add HT selection options
  Object.keys(htData).sort().forEach(grade => {
    const gradeHTs = htData[grade];
    
    html += `
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">
          ${gradeHTs.itHT ? `<input type="radio" name="htSelection" value="${grade}_IT_${gradeHTs.itHT}" id="${grade}_IT">` : ''}
          ${gradeHTs.ltHT ? `<input type="radio" name="htSelection" value="${grade}_LT_${gradeHTs.ltHT}" id="${grade}_LT">` : ''}
        </td>
        <td style="padding: 10px; border: 1px solid #ddd; text-align: center; font-weight: bold;">${grade}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">
          ${gradeHTs.itHT ? `
            <label for="${grade}_IT" style="cursor: pointer; display: block; padding: 5px;">
              📚 ${gradeHTs.itHT} (IT HT)
            </label>
          ` : '<span style="color: #999;">No IT HT assigned</span>'}
        </td>
        <td style="padding: 10px; border: 1px solid #ddd;">
          ${gradeHTs.ltHT ? `
            <label for="${grade}_LT" style="cursor: pointer; display: block; padding: 5px;">
              📝 ${gradeHTs.ltHT} (LT HT)
            </label>
          ` : '<span style="color: #999;">No LT HT assigned</span>'}
        </td>
      </tr>
    `;
  });
  
  html += `
          </tbody>
        </table>
        
        <div style="margin: 20px 0; text-align: center;">
          <button type="button" onclick="proceedWithHTManagement()" style="background-color: #4CAF50; color: white; padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; margin-right: 10px;">
            🚀 Proceed to Management | 進入管理
          </button>
          <button type="button" onclick="google.script.host.close()" style="background-color: #999; color: white; padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">
            ❌ Cancel | 取消
          </button>
        </div>
      </form>
      
      <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h4>💡 Important Notes | 重要說明:</h4>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>Each HT can manage 3 levels: E1, E2, E3 for their grade | 每位HT可管理3個級別：其年級的E1、E2、E3</li>
          <li>IT HT manages IT teacher assessment titles | IT HT管理IT老師的評量標題</li>
          <li>LT HT manages LT teacher assessment titles | LT HT管理LT老師的評量標題</li>
          <li>Changes will sync to all teachers in your grade level | 變更會同步到您年級的所有老師</li>
        </ul>
      </div>
      
      <script>
        function proceedWithHTManagement() {
          const selected = document.querySelector('input[name="htSelection"]:checked');
          if (!selected) {
            alert('Please select your HT role first. | 請先選擇您的HT角色。');
            return;
          }
          
          const [grade, teacherType, htName] = selected.value.split('_');
          
          // Create mock HT context for direct management
          const htContext = {
            htName: htName,
            grade: grade,
            teacherType: teacherType,
            allowedLevels: [grade + 'E1', grade + 'E2', grade + 'E3'],
            isDirectAccess: true
          };
          
          // Call server function to proceed with management
          google.script.run
            .withSuccessHandler(function(result) {
              if (result.success) {
                google.script.host.close();
              } else {
                alert('Error: ' + result.message);
              }
            })
            .withFailureHandler(function(error) {
              alert('Error: ' + error.message);
            })
            .proceedWithHTManagementServer(htContext);
        }
      </script>
    </div>
  `;
  
  // Show the interface
  const htmlOutput = HtmlService.createHtmlOutput(html)
    .setWidth(700)
    .setHeight(500);
  
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'HT Login & Management | HT登入管理');
}

/**
 * Server-side function to proceed with HT management | 伺服器端函數來進行HT管理
 */
function proceedWithHTManagementServer(htContext) {
  try {
    
    // Get current assessment titles for this HT's levels
    const currentTitles = getHTCurrentAssessmentTitles(htContext);
    
    // Show assessment title management interface
    showHTAssessmentTitleInterface(htContext, currentTitles);
    
    return { success: true };
    
  } catch (error) {
    console.error('Error in proceedWithHTManagementServer:', error.message);
    return { success: false, message: error.message };
  }
}

/**
 * HT Assessment Title Management - Main function | HT評量標題管理 - 主要函數
 */
function manageHTAssessmentTitles() {
  // Check HT permissions first
  const htContext = checkHTPermissions();
  if (!htContext) {
    return; // Permission check failed, error already shown
  }
  
  try {
    
    // Get current assessment titles for this HT's levels
    const currentTitles = getHTCurrentAssessmentTitles(htContext);
    
    // Show assessment title management interface
    showHTAssessmentTitleInterface(htContext, currentTitles);
    
  } catch (error) {
    console.error('Error in manageHTAssessmentTitles:', error.message);
    showError('Error | 錯誤', `Failed to manage assessment titles: ${error.message} | 無法管理評量標題: ${error.message}`);
  }
}

/**
 * Get current assessment titles for HT's allowed levels | 取得HT允許級別的當前評量標題
 */
function getHTCurrentAssessmentTitles(htContext) {
  const titles = {};
  
  htContext.allowedLevels.forEach(level => {
    const levelTitles = getAssessmentTitles(null, htContext.teacherType, level);
    titles[level] = levelTitles;
  });
  
  return titles;
}

/**
 * Show HT Assessment Title Management Interface | 顯示HT評量標題管理界面
 */
function showHTAssessmentTitleInterface(htContext, currentTitles) {
  // Create HTML interface
  let html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>🏷️ Assessment Title Management | 評量標題管理</h2>
      <p><strong>HT:</strong> ${htContext.htName} (${htContext.grade} ${htContext.teacherType})</p>
      <p><strong>Allowed Levels | 允許級別:</strong> ${htContext.allowedLevels.join(', ')}</p>
      
      <div style="background-color: #f0f8ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3>📝 Edit Assessment Titles | 編輯評量標題</h3>
        <p>You can edit assessment titles for your grade levels. Changes will apply to all classes in your grade. | 您可以編輯您年級的評量標題。變更將套用到您年級的所有班級。</p>
      </div>
  `;
  
  // Add interface for each allowed level
  htContext.allowedLevels.forEach(level => {
    const levelTitles = currentTitles[level];
    
    html += `
      <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px;">
        <h4>${level} Assessment Titles | ${level} 評量標題</h4>
        
        <div style="margin: 10px 0;">
          <label><strong>Formative Assessments | 平時評量:</strong></label>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 10px 0;">
    `;
    
    // Add formative assessment input fields
    for (let i = 0; i < 8; i++) {
      const currentTitle = levelTitles.formative[i] || `F.A.${i + 1}`;
      html += `<input type="text" id="formative_${level}_${i}" value="${currentTitle}" style="padding: 5px; border: 1px solid #ccc; border-radius: 3px;">`;
    }
    
    html += `
          </div>
        </div>
        
        <div style="margin: 10px 0;">
          <label><strong>Summative Assessments | 總結評量:</strong></label>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 10px 0;">
    `;
    
    // Add summative assessment input fields
    for (let i = 0; i < 4; i++) {
      const currentTitle = levelTitles.summative[i] || `S.A.${i + 1}`;
      html += `<input type="text" id="summative_${level}_${i}" value="${currentTitle}" style="padding: 5px; border: 1px solid #ccc; border-radius: 3px;">`;
    }
    
    html += `
          </div>
        </div>
        
        <div style="margin: 15px 0;">
          <button onclick="updateLevelTitles('${level}')" style="background-color: #4CAF50; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">
            Update ${level} | 更新 ${level}
          </button>
          <button onclick="resetLevelTitles('${level}')" style="background-color: #ff9800; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">
            Reset ${level} | 重設 ${level}
          </button>
        </div>
      </div>
    `;
  });
  
  html += `
      <div style="margin: 20px 0; text-align: center;">
        <button onclick="updateAllLevels()" style="background-color: #2196F3; color: white; padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; margin-right: 10px;">
          💾 Update All Levels | 更新所有級別
        </button>
        <button onclick="google.script.host.close()" style="background-color: #999; color: white; padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">
          ❌ Close | 關閉
        </button>
      </div>
      
      <script>
        function updateLevelTitles(level) {
          // Implementation will be added
        }
        
        function resetLevelTitles(level) {
          // Implementation will be added
        }
        
        function updateAllLevels() {
          // Implementation will be added
        }
      </script>
    </div>
  `;
  
  // Show the interface
  const htmlOutput = HtmlService.createHtmlOutput(html)
    .setWidth(800)
    .setHeight(600);
  
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'HT Assessment Title Management | HT評量標題管理');
}

/**
 * Reset HT Assessment Titles to Default | 重設HT評量標題為預設
 */
function resetHTAssessmentTitles() {
  const htContext = checkHTPermissions();
  if (!htContext) {
    return;
  }
  
  try {
    // Confirm reset action
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert(
      'Confirm Reset | 確認重設',
      `Are you sure you want to reset all assessment titles for ${htContext.grade} ${htContext.teacherType} to default values?\n\n確定要將 ${htContext.grade} ${htContext.teacherType} 的所有評量標題重設為預設值嗎？`,
      ui.ButtonSet.YES_NO
    );
    
    if (response !== ui.Button.YES) {
      return;
    }
    
    // Reset titles for each allowed level
    let updatedCount = 0;
    
    htContext.allowedLevels.forEach(level => {
      const result = resetAssessmentTitlesByLevel(level, htContext.teacherType);
      if (result.success) {
        updatedCount++;
      }
    });
    
    showMessage(
      'Reset Complete | 重設完成',
      `Successfully reset assessment titles for ${updatedCount} levels.\n\n成功重設 ${updatedCount} 個級別的評量標題。`
    );
    
  } catch (error) {
    console.error('Error resetting HT assessment titles:', error.message);
    showError('Error | 錯誤', `Failed to reset assessment titles: ${error.message} | 無法重設評量標題: ${error.message}`);
  }
}

/**
 * Sync HT Assessment Titles to All Classes | 同步HT評量標題到所有班級
 */
function syncHTAssessmentTitles() {
  const htContext = checkHTPermissions();
  if (!htContext) {
    return;
  }
  
  try {
    // Confirm sync action
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert(
      'Confirm Sync | 確認同步',
      `Are you sure you want to sync assessment titles to all ${htContext.grade} ${htContext.teacherType} gradebooks?\n\n確定要將評量標題同步到所有 ${htContext.grade} ${htContext.teacherType} 成績簿嗎？`,
      ui.ButtonSet.YES_NO
    );
    
    if (response !== ui.Button.YES) {
      return;
    }
    
    // Sync titles for each allowed level
    let totalUpdated = 0;
    const results = [];
    
    htContext.allowedLevels.forEach(level => {
      const result = syncAssessmentTitlesToExistingGradebooksByTeacherLevel(htContext.teacherType, level);
      if (result.success) {
        totalUpdated += result.updatedSheets || 0;
        results.push(`${level}: ${result.updatedSheets || 0} sheets updated`);
      }
    });
    
    showMessage(
      'Sync Complete | 同步完成',
      `Successfully updated ${totalUpdated} gradebook sheets.\n\nDetails | 詳細:\n${results.join('\n')}\n\n成功更新 ${totalUpdated} 個成績簿工作表。`
    );
    
  } catch (error) {
    console.error('Error syncing HT assessment titles:', error.message);
    showError('Error | 錯誤', `Failed to sync assessment titles: ${error.message} | 無法同步評量標題: ${error.message}`);
  }
}

/**
 * Create system configuration sheet | 建立系統配置工作表
 */
function createConfigSheet(systemFolder) {
  const config = getSystemConfig();
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
    ['Semester | 學期', config.SEMESTER, 'Current semester code | 目前學期代碼'],
    ['Formative Count | 平時評量次數', config.ASSESSMENTS.FORMATIVE_COUNT, 'Number of F.A. assessments | F.A.評量次數'],
    ['Summative Count | 總結評量次數', config.ASSESSMENTS.SUMMATIVE_COUNT, 'Number of S.A. assessments | S.A.評量次數'],
    ['Include Final | 包含期末考', config.ASSESSMENTS.INCLUDE_FINAL, 'Include final exam in calculations | 計算中包含期末考'],
    ['Formative Weight | 平時評量權重', config.WEIGHTS.FORMATIVE, 'Weight for formative assessments | 平時評量權重'],
    ['Summative Weight | 總結評量權重', config.WEIGHTS.SUMMATIVE, 'Weight for summative assessments | 總結評量權重'],
    ['Final Weight | 期末考權重', config.WEIGHTS.FINAL, 'Weight for final exam | 期末考權重'],
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
  
  return configSheet;
}

/**
 * Create or get dashboard spreadsheet | 建立或取得控制台試算表
 */
function getOrCreateDashboard() {
  try {
    const config = getSystemConfig();
    const systemFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    
    // Check if dashboard already exists | 檢查控制台是否已存在
    const dashboardName = 'System Dashboard | 系統控制台';
    const existingFiles = systemFolder.getFilesByName(dashboardName);
    
    if (existingFiles.hasNext()) {
      return SpreadsheetApp.openById(existingFiles.next().getId());
    }
    
    // Create new dashboard spreadsheet | 建立新的控制台試算表
    const dashboard = SpreadsheetApp.create(dashboardName);
    DriveApp.getFileById(dashboard.getId()).moveTo(systemFolder);
    
    // Remove default sheet | 移除預設工作表
    const sheets = dashboard.getSheets();
    if (sheets.length > 0) {
      const defaultSheet = sheets[0];
      defaultSheet.setName('Dashboard | 控制台');
      
      // Set up basic dashboard structure | 設定基本控制台結構
      const headers = [
        ['System Status | 系統狀態', 'Status | 狀態'],
        ['Total Teachers | 教師總數', '=COUNTA(INDIRECT("Students!B:B"))+COUNTA(INDIRECT("Students!C:C"))'],
        ['Total Students | 學生總數', '=COUNTA(INDIRECT("Students!A:A"))-1'],
        ['Gradebooks Created | 已建立成績簿', '=COUNTIF(INDIRECT("Teachers!D:D"),"已建立")'],
        ['Last Updated | 最後更新', '=NOW()']
      ];
      
      // Apply headers | 套用標題
      const range = defaultSheet.getRange(1, 1, headers.length, 2);
      range.setValues(headers);
      
      // Format headers | 格式化標題
      defaultSheet.getRange(1, 1, headers.length, 1)
        .setBackground('#4285F4')
        .setFontColor('white')
        .setFontWeight('bold');
      
      defaultSheet.getRange(1, 2, headers.length, 1)
        .setBackground('#F8F9FA');
      
      // Auto-resize columns | 自動調整欄寬
      defaultSheet.autoResizeColumns(1, 2);
    }
    
    return dashboard;
    
  } catch (error) {
    console.log(`❌ Error creating dashboard: ${error.message}`);
    throw new Error(`Failed to create dashboard: ${error.message}`);
  }
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
  setupClassSheetHeaders(sampleSheet, 'Sample Class | 範例班級');
  
  // Add teacher info sheet | 新增老師資訊工作表
  const teacherInfoSheet = template.insertSheet('📋 Teacher Info | 老師資訊');
  setupTeacherInfoSheet(teacherInfoSheet);
  
  // Set sample sheet as active | 設定範例工作表為活躍狀態
  template.setActiveSheet(sampleSheet);
  
  return template;
}

// ===== BATCH GRADEBOOK CREATION | 批量成績簿建立 =====

/**
 * Batch create gradebooks for all teachers | 批量建立所有老師的成績簿
 */
function batchCreateGradebooks() {
  try {
    const startTime = new Date();
    
    // Update auto-generated teachers first | 先更新自動生成老師資料
    try {
      updateAutoGeneratedTeachers();
    } catch (error) {
      console.log('⚠️ Warning: Could not update auto-generated teachers:', error.message);
    }
    
    // Get master data
    const masterData = getMasterDataSheet();
    if (!masterData) {
      throw new Error('Master Data sheet not found | 找不到主控資料表');
    }
    
    // Get all teacher data
    const teacherData = extractTeacherData(masterData);
    if (!teacherData || teacherData.length === 0) {
      throw new Error('No teacher data found | 找不到老師資料');
    }
    
    // Get system folders safely
    const config = getSystemConfig();
    if (!config || !config.MAIN_FOLDER_ID) {
      throw new Error('System configuration missing MAIN_FOLDER_ID | 系統配置缺少 MAIN_FOLDER_ID');
    }
    
    const systemFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, config.FOLDERS.TEACHER_SHEETS);
    
    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    
    // Get HT data for checking during creation - group by grade pairs
    const htData = getHTData();
    const htTeachers = [];
    if (htData && Object.keys(htData).length > 0) {
      // Define grade groups and find unique HTs
      const gradeGroups = {
        'G1-G2': ['G1', 'G2'],
        'G3-G4': ['G3', 'G4'], 
        'G5-G6': ['G5', 'G6']
      };
      
      const processedHTs = new Set();
      
      Object.entries(gradeGroups).forEach(([groupName, grades]) => {
        const firstGrade = grades[0];
        const gradeData = htData[firstGrade];
        
        if (gradeData) {
          // IT HT for this grade group
          if (gradeData.itHT && !processedHTs.has(`${gradeData.itHT}-IT`)) {
            htTeachers.push({ 
              name: gradeData.itHT, 
              type: 'IT', 
              gradeGroup: groupName,
              grades: grades,
              responsibilities: grades.map(g => `${g}E1, ${g}E2, ${g}E3`).join(', ')
            });
            processedHTs.add(`${gradeData.itHT}-IT`);
          }
          
          // LT HT for this grade group
          if (gradeData.ltHT && !processedHTs.has(`${gradeData.ltHT}-LT`)) {
            htTeachers.push({ 
              name: gradeData.ltHT, 
              type: 'LT', 
              gradeGroup: groupName,
              grades: grades,
              responsibilities: grades.map(g => `${g}E1, ${g}E2, ${g}E3`).join(', ')
            });
            processedHTs.add(`${gradeData.ltHT}-LT`);
          }
        }
      });
      
    }
    
    let htEnhancedCount = 0;
    
    // Create gradebooks for each teacher (check if HT during creation)
    for (let i = 0; i < teacherData.length; i++) {
      const teacher = teacherData[i];
      try {
        
        // Check if this teacher is an HT
        const htInfo = htTeachers.find(ht => ht.name === teacher.name);
        
        let gradebook;
        
        if (htInfo) {
          // This is an HT teacher - create enhanced gradebook
          
          const gradebookName = `${teacher.name} - HT ${htInfo.gradeGroup} ${htInfo.type} - Gradebook`;
          
          // Enhance teacher record with HT information
          const htEnhancedTeacher = {
            ...teacher,
            isHT: true,
            htGradeGroup: htInfo.gradeGroup,
            htGrades: htInfo.grades,
            htType: htInfo.type,
            htResponsibilities: htInfo.responsibilities,
            htPermissions: htInfo.grades.flatMap(grade => [`${grade}E1`, `${grade}E2`, `${grade}E3`])
          };
          
          gradebook = createTeacherGradebook(htEnhancedTeacher, teacherGradebooksFolder, gradebookName);
          
          // Add HT-specific assessment management sheet
          try {
            addHTAssessmentManagementSheet(gradebook, htInfo);
            htEnhancedCount++;
          } catch (htError) {
            console.error(`⚠️ Failed to add HT sheet for ${teacher.name}:`, htError);
            // Continue anyway, basic gradebook was created
          }
          
        } else {
          // Regular teacher - create standard gradebook
          gradebook = createTeacherGradebook(teacher, teacherGradebooksFolder);
        }
        
        successCount++;
        
      } catch (error) {
        console.error(`❌ Error creating gradebook for ${teacher.name}:`, error);
        errorCount++;
        errors.push(`${teacher.name}: ${error.message}`);
      }
    }
    
    const endTime = new Date();
    const duration = Math.round((endTime - startTime) / 1000);
    
    // Calculate statistics
    const regularTeachersCount = successCount - htEnhancedCount;
    
    const detailedMessage = `
📊 Batch Creation Complete | 批次建立完成

📚 Teacher Gradebooks Created | 教師成績簿已建立:
• Total teachers | 總教師數: ${teacherData.length}
• Successfully created | 成功建立: ${successCount} gradebooks
• Regular teachers | 一般教師: ${regularTeachersCount} gradebooks
• Head Teachers (HT Enhanced) | 學年主任（增強版）: ${htEnhancedCount} gradebooks
• Errors | 錯誤: ${errorCount} gradebooks

⏱️ Total Duration | 總耗時: ${duration} seconds
🎉 All gradebooks created successfully! | 所有成績簿建立成功！

${errors.length > 0 ? `\n❌ Errors encountered | 遇到的錯誤:\n${errors.join('\n')}` : ''}

💡 Note: HT teachers have enhanced gradebooks with Assessment Title Management functionality.
💡 注意：HT教師擁有增強版成績簿，具備評量標題管理功能。
    `;
    
    // Return result object for dashboard compatibility
    return {
      success: errorCount === 0,
      successCount: successCount,
      regularTeachers: regularTeachersCount,
      htEnhanced: htEnhancedCount,
      errorCount: errorCount,
      errors: errors,
      duration: duration,
      totalTeachers: teacherData.length,
      message: detailedMessage
    };
    
  } catch (error) {
    console.error('Batch creation failed:', error);
    return {
      success: false,
      error: error.message,
      message: `Batch creation failed: ${error.message}`
    };
  }
}

/**
 * Extract teacher data from master data sheet | 從主控資料表提取老師資料
 */
function extractTeacherData(masterDataSheet) {
  const sheet = masterDataSheet.getSheetByName('Students');
  if (!sheet) {
    throw new Error('Students sheet not found in Master Data | 在主控資料中找不到Students工作表');
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  // Find teacher columns - try multiple possible column names including bilingual versions
  let ltTeacherCol = headers.indexOf('LT Teacher | LT老師');
  let itTeacherCol = headers.indexOf('IT Teacher | IT老師');
  let gradeCol = headers.indexOf('Grade | 年級');
  let classCol = headers.indexOf('Homeroom | 班級');
  
  // Try alternative column names
  if (ltTeacherCol === -1) {
    ltTeacherCol = headers.indexOf('LT Teacher');
    if (ltTeacherCol === -1) {
      ltTeacherCol = headers.indexOf('LT');
      if (ltTeacherCol === -1) {
        ltTeacherCol = headers.indexOf('Language Teacher');
      }
    }
  }
  
  if (itTeacherCol === -1) {
    itTeacherCol = headers.indexOf('IT Teacher');
    if (itTeacherCol === -1) {
      itTeacherCol = headers.indexOf('IT');
      if (itTeacherCol === -1) {
        itTeacherCol = headers.indexOf('Information Teacher');
      }
    }
  }
  
  if (gradeCol === -1) {
    gradeCol = headers.indexOf('Grade');
    if (gradeCol === -1) {
      gradeCol = headers.indexOf('Year');
    }
  }
  
  let englishClassCol = headers.indexOf('English Class | 英文班級');
  if (englishClassCol === -1) {
    englishClassCol = headers.indexOf('English Class');
    if (englishClassCol === -1) {
      englishClassCol = headers.indexOf('EnglishClass');
    }
  }
  
  if (classCol === -1) {
    classCol = headers.indexOf('Class');
    if (classCol === -1) {
      classCol = headers.indexOf('Level');
      if (classCol === -1) {
        classCol = headers.indexOf('Homeroom');
      }
    }
  }
  
  // Enhanced error message with actual headers found
  if (ltTeacherCol === -1 || itTeacherCol === -1) {
    const availableHeaders = headers.filter(h => h && h.trim() !== '').join(', ');
    throw new Error(`Teacher columns not found | 找不到老師欄位\nAvailable columns | 可用欄位: ${availableHeaders}\nExpected: LT Teacher, IT Teacher or similar`);
  }
  
  if (gradeCol === -1 || classCol === -1) {
    const availableHeaders = headers.filter(h => h && h.trim() !== '').join(', ');
    throw new Error(`Grade/Class columns not found | 找不到年級/班級欄位\nAvailable columns | 可用欄位: ${availableHeaders}\nExpected: Grade, Class or similar`);
  }
  
  const teacherMap = new Map();
  
  // Process each student row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[0]) continue; // Skip empty rows
    
    const grade = row[gradeCol];
    const homeroom = row[classCol];
    const englishClass = englishClassCol !== -1 ? row[englishClassCol] : row[classCol];
    const ltTeacher = row[ltTeacherCol];
    const itTeacher = row[itTeacherCol];
    
    // Debug logging for first few rows
    if (i <= 3) {
    }
    
    // Add LT teacher
    if (ltTeacher) {
      const key = `${ltTeacher}_LT`;
      if (!teacherMap.has(key)) {
        teacherMap.set(key, {
          name: ltTeacher,
          type: 'LT',
          classes: new Set()
        });
      }
      // Use English Class for all teachers
      teacherMap.get(key).classes.add(englishClass || homeroom);
    }
    
    // Add IT teacher
    if (itTeacher) {
      const key = `${itTeacher}_IT`;
      if (!teacherMap.has(key)) {
        teacherMap.set(key, {
          name: itTeacher,
          type: 'IT',
          classes: new Set()
        });
      }
      // Use English Class for all teachers
      teacherMap.get(key).classes.add(englishClass || homeroom);
    }
  }
  
  // Convert to array and add class arrays
  const result = Array.from(teacherMap.values()).map(teacher => ({
    ...teacher,
    classes: Array.from(teacher.classes)
  }));
  
  
  return result;
}

/**
 * Create gradebook for a specific teacher | 為特定老師建立成績簿
 */
function createTeacherGradebook(teacher, parentFolder) {
  const config = getSystemConfig();
  const gradebookName = `${config.SEMESTER}_${teacher.name}_${teacher.type}_Gradebook`;
  
  // Check if gradebook already exists
  const existingFiles = parentFolder.getFilesByName(gradebookName);
  if (existingFiles.hasNext()) {
    return existingFiles.next();
  }
  
  // Create new gradebook
  const gradebook = SpreadsheetApp.create(gradebookName);
  const file = DriveApp.getFileById(gradebook.getId());
  file.moveTo(parentFolder);
  
  // Remove default sheet
  const defaultSheet = gradebook.getActiveSheet();
  
  // Create teacher info sheet
  const teacherInfoSheet = gradebook.insertSheet('📋 Teacher Info | 老師資訊');
  setupTeacherInfoSheet(teacherInfoSheet, teacher);
  
  // Create class sheets with real student data
  
  for (const className of teacher.classes) {
    const classSheet = gradebook.insertSheet(`📚 ${className}`);
    setupClassSheet(classSheet, className, teacher.name, teacher.type);
  }
  
  // Delete default sheet
  gradebook.deleteSheet(defaultSheet);
  
  // Set teacher info as active sheet
  gradebook.setActiveSheet(teacherInfoSheet);
  
  return gradebook;
}

/**
 * Get actual student count for a specific class and teacher
 */
function getStudentCountForClass(className, teacherName, teacherType) {
  try {
    const students = getStudentsForClass(className, teacherName, teacherType);
    return students.length;
  } catch (error) {
    console.error(`Error getting student count for ${className}:`, error.message);
    return 0;
  }
}

/**
 * Get students from Master Data for a specific class and teacher
 */
function getStudentsForClass(className, teacherName, teacherType) {
  try {
    const masterData = getMasterDataSheet();
    if (!masterData) {
      throw new Error('Master Data sheet not found');
    }
    
    const studentsSheet = masterData.getSheetByName('Students');
    if (!studentsSheet) {
      throw new Error('Students sheet not found in Master Data');
    }
    
    const data = studentsSheet.getDataRange().getValues();
    const headers = data[0];
    
    // Find column indices
    const englishClassCol = headers.findIndex(h => h.includes('English Class'));
    const ltTeacherCol = headers.findIndex(h => h.includes('LT Teacher'));
    const itTeacherCol = headers.findIndex(h => h.includes('IT Teacher'));
    const statusCol = headers.findIndex(h => h.includes('Status'));
    
    if (englishClassCol === -1 || ltTeacherCol === -1 || itTeacherCol === -1) {
      throw new Error('Required columns not found in Students sheet');
    }
    
    // Filter students for this class and teacher
    const students = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const englishClass = row[englishClassCol];
      const ltTeacher = row[ltTeacherCol];
      const itTeacher = row[itTeacherCol];
      const status = row[statusCol];
      
      // Only include active students (在學)
      if (status !== '在學') continue;
      
      // Check if this student belongs to the class and teacher
      const matchesClass = englishClass === className;
      const matchesTeacher = (teacherType === 'LT' && ltTeacher === teacherName) || 
                            (teacherType === 'IT' && itTeacher === teacherName);
      
      if (matchesClass && matchesTeacher) {
        students.push({
          studentId: row[0],
          studentName: row[1],
          englishName: row[2],
          grade: row[3],
          homeroom: row[4],
          englishClass: row[5],
          ltTeacher: row[6],
          itTeacher: row[7],
          email: row[8],
          status: row[9]
        });
      }
    }
    
    return students;
    
  } catch (error) {
    console.error('Error getting students for class:', error.message);
    return [];
  }
}

/**
 * Setup class sheet with real student data in the format matching the screenshot
 */
function setupClassSheetWithRealData(sheet, className, teacherName = null, teacherType = null) {
  // Get real student data
  const students = teacherName && teacherType ? 
    getStudentsForClass(className, teacherName, teacherType) : [];
  
  if (students.length === 0) {
    // Fallback to sample data format
    setupClassSheetFallback(sheet, className);
    return;
  }
  
  // Set class name in A1 with orange background like screenshot and emoji
  sheet.getRange('A1').setValue(`📚 ${className}`);
  sheet.getRange('A1').setFontSize(14).setFontWeight('bold')
    .setBackground('#FF9800').setFontColor('white');
  
  // Create header structure matching screenshot
  // Row 1: Group headers (B1-G1 should be empty as requested)
  const row1Headers = ['', '', '', '', '', '', ''];
  
  // Add Formative Assessment group header
  row1Headers.push('Formative Assessments');
  for (let i = 1; i < 8; i++) { // F.A.1 to F.A.8
    row1Headers.push('');
  }
  
  // Add Summative Assessment group header  
  row1Headers.push('Summative Assessments');
  for (let i = 1; i < 4; i++) { // S.A.1 to S.A.4
    row1Headers.push('');
  }
  
  row1Headers.push(''); // T column - Midterm only
  
  // Row 2: Individual column headers
  const row2Headers = ['', 'English Name | 英文姓名', 'Student ID', 'Term Grade', 'Formative Assessment Average', 'Summative Assessment Average', 'Midterm Assessment'];
  
  // Add F.A. columns
  for (let i = 1; i <= 8; i++) {
    row2Headers.push(`F.A.${i}`);
  }
  
  // Add S.A. columns
  for (let i = 1; i <= 4; i++) {
    row2Headers.push(`S.A.${i}`);
  }
  
  row2Headers.push('Midterm');
  
  // Set headers
  sheet.getRange(1, 1, 1, row1Headers.length).setValues([row1Headers]);
  sheet.getRange(2, 1, 1, row2Headers.length).setValues([row2Headers]);
  
  // Format group headers
  sheet.getRange(1, 8, 1, 8).setBackground('#4285F4').setFontColor('white').setFontWeight('bold'); // Formative blue
  sheet.getRange(1, 16, 1, 4).setBackground('#34A853').setFontColor('white').setFontWeight('bold'); // Summative green
  
  // Format column headers
  sheet.getRange(2, 1, 1, row2Headers.length).setFontWeight('bold');
  sheet.getRange(2, 4).setBackground('#9C27B0').setFontColor('white'); // Term Grade purple
  sheet.getRange(2, 5).setBackground('#2196F3').setFontColor('white'); // FA Average blue
  sheet.getRange(2, 6).setBackground('#4CAF50').setFontColor('white'); // SA Average green  
  sheet.getRange(2, 7).setBackground('#FF9800').setFontColor('white'); // Final orange
  
  // Add student data starting from row 3
  let currentRow = 3;
  students.forEach((student, index) => {
    const studentRow = [
      index + 1, // Row number
      student.englishName,
      student.studentId,
      '', // Term Grade - will be calculated
      '', // FA Average - will be calculated  
      '', // SA Average - will be calculated
      '', // Midterm Assessment - to be filled
    ];
    
    // Add empty cells for F.A.1-8
    for (let i = 0; i < 8; i++) {
      studentRow.push('');
    }
    
    // Add empty cells for S.A.1-4
    for (let i = 0; i < 4; i++) {
      studentRow.push('');
    }
    
    // Add empty cell for Midterm
    studentRow.push(''); // Midterm
    
    sheet.getRange(currentRow, 1, 1, studentRow.length).setValues([studentRow]);
    currentRow++;
  });
  
  // Add "Average:" row at the bottom like in screenshot
  const averageRow = currentRow;
  sheet.getRange(averageRow, 2).setValue('Average:');
  sheet.getRange(averageRow, 2).setFontWeight('bold');
  
  // Add average formulas for each assessment column
  const lastStudentRow = currentRow - 1;
  
  // Term Grade average (column D)
  sheet.getRange(averageRow, 4).setFormula(`=IFERROR(ROUND(AVERAGEIF(D3:D${lastStudentRow},">0"),1))`);
  
  // FA Average (column E)  
  sheet.getRange(averageRow, 5).setFormula(`=IFERROR(ROUND(AVERAGEIF(E3:E${lastStudentRow},">0"),1))`);
  
  // SA Average (column F)
  sheet.getRange(averageRow, 6).setFormula(`=IFERROR(ROUND(AVERAGEIF(F3:F${lastStudentRow},">0"),1))`);
  
  // Midterm Assessment average (column G)
  sheet.getRange(averageRow, 7).setFormula(`=IFERROR(ROUND(AVERAGEIF(G3:G${lastStudentRow},">0"),1))`);
  
  // Add average formulas for each F.A. column (H-O)
  for (let col = 8; col <= 15; col++) {
    const colLetter = String.fromCharCode(64 + col);
    sheet.getRange(averageRow, col).setFormula(`=IFERROR(ROUND(AVERAGEIF(${colLetter}3:${colLetter}${lastStudentRow},">0"),1))`);
  }
  
  // Add average formulas for each S.A. column (P-S)
  for (let col = 16; col <= 19; col++) {
    const colLetter = String.fromCharCode(64 + col);
    sheet.getRange(averageRow, col).setFormula(`=IFERROR(ROUND(AVERAGEIF(${colLetter}3:${colLetter}${lastStudentRow},">0"),1))`);
  }
  
  // Midterm column average (T)
  sheet.getRange(averageRow, 20).setFormula(`=IFERROR(ROUND(AVERAGEIF(T3:T${lastStudentRow},">0"),1))`);
  
  // Set individual student formulas
  for (let row = 3; row < averageRow; row++) {
    // Term Grade formula - new correct format
    sheet.getRange(row, 4).setFormula(`=IF(AND(ISNUMBER(E${row}), ISNUMBER(F${row}), ISNUMBER(G${row}), E${row} > 0, F${row} > 0, G${row} > 0), ROUND((E${row} * 0.15 + F${row} * 0.2 + G${row} * 0.1) / 0.45, 1), "")`);
    
    // FA Average formula
    sheet.getRange(row, 5).setFormula(`=IFERROR(ROUND(AVERAGEIF(H${row}:O${row},">0"),1))`);
    
    // SA Average formula
    sheet.getRange(row, 6).setFormula(`=IFERROR(ROUND(AVERAGEIF(P${row}:S${row},">0"),1))`);
    
    // Midterm Assessment formula - G3=T3 (T is now Midterm)
    sheet.getRange(row, 7).setFormula(`=T${row}`);
  }
  
  // Format and freeze
  sheet.setFrozenRows(2);
  sheet.setFrozenColumns(3);
  sheet.autoResizeColumns(1, row2Headers.length);
  
  // Add borders
  const dataRange = sheet.getRange(1, 1, averageRow, row2Headers.length);
  dataRange.setBorder(true, true, true, true, true, true);
}

/**
 * Fallback setup for class sheet when no student data is found
 */
function setupClassSheetFallback(sheet, className) {
  sheet.getRange('A1').setValue(`${className} - No student data found | 找不到學生資料`);
  sheet.getRange('A1').setFontSize(14).setFontWeight('bold')
    .setBackground('#FF5722').setFontColor('white');
  
  sheet.getRange('A3').setValue('Please check:');
  sheet.getRange('A4').setValue('1. Student data exists in Master Data sheet');
  sheet.getRange('A5').setValue('2. English Class names match exactly');
  sheet.getRange('A6').setValue('3. Teacher names match exactly');
  sheet.getRange('A7').setValue('4. Student status is "在學"');
}

/**
 * Setup class sheet headers only (no sample data) | 只設定班級工作表標題（無範例資料）
 */
function setupClassSheetHeaders(sheet, className, teacherType = null) {
  // Clear sheet | 清空工作表
  sheet.clear();
  
  const config = getSystemConfig();
  
  // Use fixed default assessment titles to ensure consistent column identification | 使用固定的預設評量標題以確保欄位識別一致
  
  // Build headers array with new structure | 建立新結構的標題陣列
  const row1Headers = []; // Group titles row
  const row2Headers = []; // Column headers row
  
  // Column structure: 序號, Student Name, Student ID, Term Grade, Formative Avg, Summative Avg, Final Assessment, Custom F.A. titles, Custom S.A. titles, Final
  
  // Basic info columns (A-G) | 基本資訊欄位 (A-G)
  row1Headers.push('', '', '', '', '', '', ''); // A-G empty for row 1
  row2Headers.push('', 'English Name | 英文姓名', 'Student ID', 'Term Grade', 'Formative Assessment Average', 'Summative Assessment Average', 'Midterm Assessment');
  
  // Formative Assessment columns (H-O) | 平時評量欄位 (H-O)
  let formativeStartCol = 8; // Column H
  for (let i = 0; i < config.ASSESSMENTS.FORMATIVE_COUNT; i++) {
    if (i === 0) {
      row1Headers.push('Formative Assessments'); // Only set group title on first column
    } else {
      row1Headers.push(''); // Empty for other columns in group
    }
    // Use fixed default titles for consistent identification | 使用固定預設標題以確保識別一致
    const title = `F.A.${i + 1}`;
    row2Headers.push(title);
  }
  
  // Summative Assessment columns (P-S) | 總結評量欄位 (P-S)  
  let summativeStartCol = formativeStartCol + config.ASSESSMENTS.FORMATIVE_COUNT;
  for (let i = 0; i < config.ASSESSMENTS.SUMMATIVE_COUNT; i++) {
    if (i === 0) {
      row1Headers.push('Summative Assessments'); // Only set group title on first column
    } else {
      row1Headers.push(''); // Empty for other columns in group
    }
    // Use fixed default titles for consistent identification | 使用固定預設標題以確保識別一致
    const title = `S.A.${i + 1}`;
    row2Headers.push(title);
  }
  
  // Final column (if enabled) | 期末考欄位（如果啟用）
  if (config.ASSESSMENTS.INCLUDE_FINAL) {
    row1Headers.push('');
    row2Headers.push('Midterm');
  }
  
  // Set class title in A1 | 在A1設定班級標題
  sheet.getRange('A1').setValue(className);
  sheet.getRange('A1').setFontSize(14).setFontWeight('bold')
    .setBackground('#FF9800').setFontColor('white'); // Orange background like in image
  
  // Set group titles in row 1 | 在第1行設定分組標題
  if (row1Headers.length > 0) {
    sheet.getRange(1, 1, 1, row1Headers.length).setValues([row1Headers]);
    
    // Set group title formatting | 設定分組標題格式
    // Formative Assessments group
    if (config.ASSESSMENTS.FORMATIVE_COUNT > 0) {
      sheet.getRange(1, formativeStartCol, 1, config.ASSESSMENTS.FORMATIVE_COUNT)
        .setBackground('#4285F4').setFontColor('white').setFontWeight('bold'); // Blue background
    }
    
    // Summative Assessments group  
    if (config.ASSESSMENTS.SUMMATIVE_COUNT > 0) {
      sheet.getRange(1, summativeStartCol, 1, config.ASSESSMENTS.SUMMATIVE_COUNT)
        .setBackground('#34A853').setFontColor('white').setFontWeight('bold'); // Green background
    }
  }
  
  // Set column headers in row 2 | 在第2行設定欄位標題
  if (row2Headers.length > 0) {
    sheet.getRange(2, 1, 1, row2Headers.length).setValues([row2Headers]);
    sheet.getRange(2, 1, 1, row2Headers.length).setFontWeight('bold');
    
    // Set individual column colors | 設定個別欄位顏色
    sheet.getRange(2, 4).setBackground('#9C27B0').setFontColor('white'); // Term Grade - Purple
    sheet.getRange(2, 5).setBackground('#2196F3').setFontColor('white'); // Formative Avg - Blue  
    sheet.getRange(2, 6).setBackground('#4CAF50').setFontColor('white'); // Summative Avg - Green
    sheet.getRange(2, 7).setBackground('#FF9800').setFontColor('white'); // Final Assessment - Orange
  }
  
  // Format sheet | 格式化工作表
  sheet.autoResizeColumns(1, row2Headers.length);
  
  // Apply freeze with error handling | 安全套用凍結設定
  try {
    sheet.setFrozenRows(2);
    sheet.setFrozenColumns(3);
  } catch (error) {
    console.log(`Warning: Could not set frozen rows/columns for ${sheet.getName()}: ${error.message}`);
    // Try alternative freeze settings | 嘗試替代凍結設定
    try {
      sheet.setFrozenRows(1);
      sheet.setFrozenColumns(3);
    } catch (altError) {
      console.log(`Alternative freeze also failed for ${sheet.getName()}: ${altError.message}`);
    }
  }
  
  // Add borders | 加入邊框
  const dataRange = sheet.getRange(1, 1, 2, row2Headers.length);
  dataRange.setBorder(true, true, true, true, true, true);
}

/**
 * Setup class sheet with gradebook format | 設定班級工作表成績簿格式
 */
function setupClassSheet(sheet, className, teacherName = null, teacherType = null) {
  // Simply call the main setup function
  setupClassSheetWithRealData(sheet, className, teacherName, teacherType);
}


/**
 * Setup teacher info sheet | 設定老師資訊工作表
 */
function setupTeacherInfoSheet(sheet, teacher = null) {
  // Clear sheet | 清空工作表
  sheet.clear();
  
  // Title | 標題
  sheet.getRange('A1:D1').merge().setValue('📋 Gradebook Info');
  sheet.getRange('A1').setFontSize(18).setFontWeight('bold').setHorizontalAlignment('center');
  sheet.getRange('A1:D1').setBackground('#FF9800').setFontColor('white');
  
  // Teacher info template | 老師資訊範本
  const teacherInfo = [
    ['Teacher Name | 老師姓名:', teacher ? teacher.name : 'Teacher Name Here | 在此填入老師姓名'],
    ['Subject | 科目:', teacher ? teacher.type : 'LT/IT'],
    ['Semester | 學期:', config.SEMESTER],
    ['Last Updated | 最後更新:', new Date().toLocaleString()],
    ['', ''],
    ['Class Name | 班級名稱', 'Student Count | 學生數量']
  ];
  
  // Add actual classes with real student counts if teacher data is provided
  if (teacher && teacher.classes) {
    teacher.classes.forEach(className => {
      const studentCount = getStudentCountForClass(className, teacher.name, teacher.type);
      teacherInfo.push([className, studentCount.toString()]);
    });
  } else {
    teacherInfo.push(['Example Class | 範例班級', '25']);
  }
  
  sheet.getRange(3, 1, teacherInfo.length, 2).setValues(teacherInfo);
  sheet.getRange(3, 1, 4, 1).setFontWeight('bold');
  
  // Calculate dynamic row positions based on actual data length
  const headerRowIndex = 6; // "Class Name | Student Count" header is now at index 5 (0-based)
  
  // Format the header row - bold but no background color
  sheet.getRange(3 + headerRowIndex, 1, 1, 2).setFontWeight('bold');
  
  // Instructions start after all teacher info data + 2 buffer rows
  const instructionsStartRow = 3 + teacherInfo.length + 2;
  
  // Instructions | 使用說明
  sheet.getRange(instructionsStartRow, 1).setValue('💡 How to use this gradebook | 如何使用此成績簿:');
  sheet.getRange(instructionsStartRow, 1).setFontWeight('bold').setFontSize(12);
  
  const instructions = [
    '1. Each sheet tab represents a different class | 每個分頁代表不同班級',
    '2. Add student data to each class sheet | 在每個班級分頁中新增學生資料',
    '3. Formulas are pre-configured for automatic calculation | 公式已預先設定自動計算',
    '4. Do not modify formula columns | 請勿修改公式欄位',
    '5. Contact system admin for technical support | 技術支援請聯繫系統管理員'
  ];
  
  instructions.forEach((instruction, index) => {
    sheet.getRange(instructionsStartRow + 1 + index, 1).setValue(instruction);
    sheet.getRange(instructionsStartRow + 1 + index, 1).setFontSize(10);
  });
  
  // Format | 格式化
  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 200);
  
  // Dynamic border range based on actual content
  const totalRows = instructionsStartRow + instructions.length + 1;
  sheet.getRange(1, 1, totalRows, 4).setBorder(true, true, true, true, true, true);
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
    
    
  } catch (error) {
    console.log(`Trigger setup warning: ${error.message}`);
  }
}

// ===== ASSESSMENT TITLE MANAGEMENT | 評量標題管理 =====

/**
 * Get all class configurations from Classes sheet | 從Classes工作表取得所有班級配置
 */
function getAllClassConfigurations() {
  try {
    const config = getSystemConfig();
    const systemFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, config.FOLDERS.MASTER_DATA, false);
    
    if (!masterDataFolder) {
      throw new Error('Master data folder not found');
    }
    
    const masterFiles = masterDataFolder.getFilesByName('Gradebook Master Data | 成績簿主控資料表');
    if (!masterFiles.hasNext()) {
      throw new Error('Master data sheet not found');
    }
    
    const masterSheet = SpreadsheetApp.openById(masterFiles.next().getId());
    const classesSheet = masterSheet.getSheetByName('Classes | 班級資料');
    
    if (!classesSheet) {
      throw new Error('Classes sheet not found');
    }
    
    const data = classesSheet.getDataRange().getValues();
    const headers = data[3]; // Headers are in row 4 (index 3)
    const classes = [];
    
    // Skip headers and first 4 rows
    for (let i = 4; i < data.length; i++) {
      const row = data[i];
      if (row[0] && row[3]) { // Must have Class Name and Level
        // Extract grade and level from new format (G1E1, G2E2, etc.) or legacy format (E1, E2, E3)
        const level = row[3] || '';
        let grade = 'G1';
        let classCode = level; // Default to using level as classCode if it's already in correct format
        
        // Check if level is already in new format (G[1-6]E[1-3])
        if (level.match(/^G[1-6]E[1-3]$/)) {
          // Already in correct format (G1E1, G2E2, etc.)
          classCode = level;
          grade = level.substring(0, 2); // Extract G1, G2, etc.
        } else {
          // Legacy format (E1, E2, E3) - convert to new format
          if (level.startsWith('E1')) grade = 'G1';
          else if (level.startsWith('E2')) grade = 'G2';
          else if (level.startsWith('E3')) grade = 'G3';
          
          // Generate class code from class name and level
          classCode = generateClassCodeFromName(row[0], level);
        }
        
        classes.push({
          className: row[0], // Class Name
          ltTeacher: row[1] || '', // LT
          itTeacher: row[2] || '', // IT
          level: level, // Level
          studentCount: row[4] || '', // 學生人數
          
          // For backwards compatibility
          grade: grade,
          classCode: classCode
        });
      }
    }
    
    return classes;
    
  } catch (error) {
    console.log(`Error getting class configurations: ${error.message}`);
    return [];
  }
}

/**
 * Get assessment titles for a specific class | 取得特定班級的評量標題
 */
function getAssessmentTitles(className, teacherType = null) {
  try {
    const config = getSystemConfig();
    // First try to find class code from Classes sheet | 先嘗試從Classes工作表找到班級代碼
    const allClasses = getAllClassConfigurations();
    const classConfig = allClasses.find(c => 
      c.className === className || 
      c.classCode === className ||
      className.includes(c.classCode)
    );
    
    let classCode = null;
    if (classConfig) {
      classCode = classConfig.classCode;
    } else {
      // Extract from class name (e.g., "G3 Achievers" might match "G3E3")
      const gradeMatch = className.match(/^G(\d+)/);
      if (gradeMatch) {
        // Default to E2 (intermediate) if no specific level found
        classCode = `G${gradeMatch[1]}E2`;
      }
    }
    
    
    // Priority order: TeacherType&Level-specific > ClassCode-specific > Default
    // 優先順序：教師類型&級別特定 > 班級代碼特定 > 預設
    let titles = null;
    
    // 1. Check for teacher type and level specific titles (NEW STRUCTURE)
    // 檢查教師類型和級別特定標題（新結構）
    if (teacherType && classCode && 
        SYSTEM_CONFIG.ASSESSMENT_TITLES[teacherType] && 
        SYSTEM_CONFIG.ASSESSMENT_TITLES[teacherType][classCode]) {
      titles = SYSTEM_CONFIG.ASSESSMENT_TITLES[teacherType][classCode];
    }
    // 2. Check for legacy class code specific titles (BACKWARD COMPATIBILITY)
    // 檢查舊版班級代碼特定標題（向後兼容）
    else if (classCode && SYSTEM_CONFIG.ASSESSMENT_TITLES[classCode]) {
      titles = SYSTEM_CONFIG.ASSESSMENT_TITLES[classCode];
    }
    // 3. Try to find appropriate teacher type titles with default level
    // 嘗試使用預設級別查找適當的教師類型標題
    else if (teacherType && classCode && SYSTEM_CONFIG.ASSESSMENT_TITLES[teacherType]) {
      // If specific level not found, try to find any level for this grade
      const gradeMatch = classCode.match(/^G(\d+)/);
      if (gradeMatch) {
        const grade = gradeMatch[1];
        // Try different levels in new format: G1E1, G1E2, G1E3
        for (const level of ['E1', 'E2', 'E3']) {
          const testCode = `G${grade}${level}`;
          if (config.ASSESSMENT_TITLES[teacherType] && config.ASSESSMENT_TITLES[teacherType][testCode]) {
            titles = config.ASSESSMENT_TITLES[teacherType][testCode];
            break;
          }
        }
      }
    }
    // 4. Use default titles | 使用預設標題
    if (!titles) {
      titles = config.ASSESSMENT_TITLES.DEFAULT;
    }
    
    return {
      formative: titles.FORMATIVE.slice(0, config.ASSESSMENTS.FORMATIVE_COUNT),
      summative: titles.SUMMATIVE.slice(0, config.ASSESSMENTS.SUMMATIVE_COUNT),
      classCode: classCode,
      teacherType: teacherType
    };
    
  } catch (error) {
    console.log(`Error getting assessment titles for ${className}, teacherType: ${teacherType}: ${error.message}`);
    // Fallback to default | 回退到預設
    return {
      formative: config.ASSESSMENT_TITLES.DEFAULT.FORMATIVE.slice(0, config.ASSESSMENTS.FORMATIVE_COUNT),
      summative: config.ASSESSMENT_TITLES.DEFAULT.SUMMATIVE.slice(0, config.ASSESSMENTS.SUMMATIVE_COUNT),
      classCode: null,
      teacherType: teacherType
    };
  }
}

/**
 * Update assessment titles for a specific class code | 更新特定班級代碼的評量標題
 */
function updateAssessmentTitlesByClassCode(classCode, formativeTitles, summativeTitles) {
  try {
    const config = getSystemConfig();
    // Validate input | 驗證輸入
    if (!classCode || !formativeTitles || !summativeTitles) {
      throw new Error('Missing required parameters');
    }
    
    if (formativeTitles.length !== config.ASSESSMENTS.FORMATIVE_COUNT) {
      throw new Error(`Formative titles must have exactly ${config.ASSESSMENTS.FORMATIVE_COUNT} items`);
    }
    
    if (summativeTitles.length !== config.ASSESSMENTS.SUMMATIVE_COUNT) {
      throw new Error(`Summative titles must have exactly ${config.ASSESSMENTS.SUMMATIVE_COUNT} items`);
    }
    
    // Update configuration | 更新配置
    SYSTEM_CONFIG.ASSESSMENT_TITLES[classCode] = {
      FORMATIVE: formativeTitles,
      SUMMATIVE: summativeTitles
    };
    
    // Synchronize to existing gradebook sheets | 同步到現有的成績簿工作表
    const syncResult = syncAssessmentTitlesToExistingGradebooks(classCode);
    
    
    // Return result with sync information
    const result = { success: true, message: `Assessment titles updated for ${classCode}` };
    if (syncResult.updatedSheets > 0) {
      result.message += ` and synchronized to ${syncResult.updatedSheets} existing sheets`;
    }
    if (syncResult.errors && syncResult.errors.length > 0) {
      result.warnings = syncResult.errors;
    }
    
    return result;
    
  } catch (error) {
    console.log(`Error updating assessment titles for ${classCode}: ${error.message}`);
    return { success: false, message: error.message };
  }
}

/**
 * Get all available assessment title configurations for dashboard | 為dashboard取得所有可用的評量標題配置
 */
function getAllAssessmentTitlesForDashboard() {
  try {
    const config = getSystemConfig();
    const allClasses = getAllClassConfigurations();
    const result = [];
    
    allClasses.forEach(classConfig => {
      const titles = config.ASSESSMENT_TITLES[classConfig.classCode] || config.ASSESSMENT_TITLES.DEFAULT;
      result.push({
        classCode: classConfig.classCode,
        className: classConfig.className,
        grade: classConfig.grade,
        level: classConfig.level,
        ltTeacher: classConfig.ltTeacher,
        itTeacher: classConfig.itTeacher,
        studentCount: classConfig.studentCount,
        formativeTitles: titles.FORMATIVE.slice(0, config.ASSESSMENTS.FORMATIVE_COUNT),
        summativeTitles: titles.SUMMATIVE.slice(0, config.ASSESSMENTS.SUMMATIVE_COUNT)
      });
    });
    
    return result;
    
  } catch (error) {
    console.log(`Error getting assessment titles for dashboard: ${error.message}`);
    return [];
  }
}

/**
 * Update assessment titles for a specific class or grade | 更新特定班級或年級的評量標題
 */
function updateAssessmentTitles(target, formativeTitles, summativeTitles) {
  try {
    const config = getSystemConfig();
    // Validate input | 驗證輸入
    if (!target || !formativeTitles || !summativeTitles) {
      throw new Error('Missing required parameters');
    }
    
    if (formativeTitles.length !== config.ASSESSMENTS.FORMATIVE_COUNT) {
      throw new Error(`Formative titles must have exactly ${config.ASSESSMENTS.FORMATIVE_COUNT} items`);
    }
    
    if (summativeTitles.length !== config.ASSESSMENTS.SUMMATIVE_COUNT) {
      throw new Error(`Summative titles must have exactly ${config.ASSESSMENTS.SUMMATIVE_COUNT} items`);
    }
    
    // Update configuration | 更新配置
    SYSTEM_CONFIG.ASSESSMENT_TITLES[target] = {
      FORMATIVE: formativeTitles,
      SUMMATIVE: summativeTitles
    };
    
    return true;
    
  } catch (error) {
    console.log(`Error updating assessment titles for ${target}: ${error.message}`);
    return false;
  }
}

/**
 * Get all available assessment title configurations | 取得所有可用的評量標題配置
 */
function getAllAssessmentTitles() {
  return SYSTEM_CONFIG.ASSESSMENT_TITLES;
}

/**
 * Reset assessment titles to default for a target | 重設特定目標的評量標題為預設值
 */
function resetAssessmentTitles(target) {
  try {
    if (target === 'DEFAULT') {
      throw new Error('Cannot reset DEFAULT configuration');
    }
    
    delete SYSTEM_CONFIG.ASSESSMENT_TITLES[target];
    
    // Synchronize to existing gradebook sheets | 同步到現有的成績簿工作表
    const syncResult = syncAssessmentTitlesToExistingGradebooks(target);
    
    
    // Return result with sync information
    const result = { success: true, message: `Assessment titles reset for ${target}` };
    if (syncResult.updatedSheets > 0) {
      result.message += ` and synchronized to ${syncResult.updatedSheets} existing sheets`;
    }
    if (syncResult.errors && syncResult.errors.length > 0) {
      result.warnings = syncResult.errors;
    }
    
    return result;
    
  } catch (error) {
    console.log(`Error resetting assessment titles for ${target}: ${error.message}`);
    return { success: false, message: error.message };
  }
}

/**
 * Synchronize assessment titles to existing gradebook sheets | 同步評量標題到現有的成績簿工作表
 */
function syncAssessmentTitlesToExistingGradebooks(classCode) {
  try {
    
    // Get system folder
    const config = getSystemConfig();
    const mainFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(mainFolder, config.FOLDERS.TEACHER_SHEETS, false);
    
    if (!teacherGradebooksFolder) {
      return { success: false, message: 'Teacher gradebooks folder not found' };
    }
    
    // Find all gradebook files
    const gradebookFiles = teacherGradebooksFolder.getFiles();
    let updatedSheets = 0;
    const errors = [];
    
    while (gradebookFiles.hasNext()) {
      const file = gradebookFiles.next();
      
      try {
        if (file.getName().includes('Gradebook') || file.getName().includes('成績簿')) {
          const spreadsheet = SpreadsheetApp.openById(file.getId());
          const sheets = spreadsheet.getSheets();
          
          // Look for sheets that match the class code
          sheets.forEach(sheet => {
            const sheetName = sheet.getName();
            
            // Check if this sheet corresponds to the updated class code
            if (sheetName.includes(classCode) || isClassNameMatchingCode(sheetName, classCode)) {
              updateExistingSheetHeaders(sheet, classCode);
              updatedSheets++;
            }
          });
        }
      } catch (sheetError) {
        console.log(`Error processing file ${file.getName()}: ${sheetError.message}`);
        errors.push(`${file.getName()}: ${sheetError.message}`);
      }
    }
    
    const result = {
      success: true,
      message: `Updated ${updatedSheets} sheets for class ${classCode}`,
      updatedSheets,
      errors: errors.length > 0 ? errors : null
    };
    
    return result;
    
  } catch (error) {
    console.log(`Sync error: ${error.message}`);
    return { success: false, message: error.message };
  }
}

/**
 * Update headers in an existing sheet with new assessment titles | 用新的評量標題更新現有工作表的標題
 */
function updateExistingSheetHeaders(sheet, classCode) {
  try {
    const config = getSystemConfig();
    // Get the new assessment titles for this class code
    const assessmentTitles = config.ASSESSMENT_TITLES[classCode] || config.ASSESSMENT_TITLES.DEFAULT;
    
    if (!assessmentTitles) {
      throw new Error(`No assessment titles found for class code: ${classCode}`);
    }
    
    // Find where the assessment columns start (after basic info columns)
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Look for the first formative assessment column
    let startColumn = -1;
    for (let i = 0; i < headers.length; i++) {
      if (headers[i] && (
        headers[i].toString().includes('F.A.') || 
        headers[i].toString().includes('Formative') ||
        assessmentTitles.FORMATIVE.some(title => headers[i].toString().includes(title))
      )) {
        startColumn = i + 1; // Convert to 1-based indexing
        break;
      }
    }
    
    if (startColumn === -1) {
      return;
    }
    
    // Update formative assessment headers
    for (let i = 0; i < assessmentTitles.FORMATIVE.length; i++) {
      const column = startColumn + i;
      if (column <= sheet.getLastColumn()) {
        sheet.getRange(1, column).setValue(assessmentTitles.FORMATIVE[i]);
      }
    }
    
    // Update summative assessment headers (after formative)
    const summativeStartColumn = startColumn + assessmentTitles.FORMATIVE.length;
    for (let i = 0; i < assessmentTitles.SUMMATIVE.length; i++) {
      const column = summativeStartColumn + i;
      if (column <= sheet.getLastColumn()) {
        sheet.getRange(1, column).setValue(assessmentTitles.SUMMATIVE[i]);
      }
    }
    
    
  } catch (error) {
    console.log(`Error updating sheet headers: ${error.message}`);
    throw error;
  }
}

/**
 * Generate class code from class name and level | 從班級名稱和等級生成班級代碼
 */
function generateClassCodeFromName(className, level) {
  // If level is already in new format (G1E1, G2E2, etc.), return it directly
  if (level && level.match(/^G[1-6]E[1-3]$/)) {
    return level;
  }
  
  // Extract grade from class name first
  let grade = 'G1';
  const gradeMatch = className.match(/G(\d+)/);
  if (gradeMatch) {
    grade = `G${gradeMatch[1]}`;
  }
  
  // Generate code based on class name pattern and current 14 class names
  // G1 Classes - Trailblazers (E1), Discoverers (E2)
  if (className.includes('G1') || className.includes('Trailblazers')) {
    return className.includes('Trailblazers') ? 'G1E1' : 'G1E2';
  }
  if (className.includes('Discoverers')) return 'G1E2';
  
  // G2 Classes - Adventurers (E1), Innovators (E2)
  if (className.includes('Adventurers')) return 'G2E1';
  if (className.includes('Innovators')) return 'G2E2';
  
  // G3 Classes - Explorers (E1), Navigators (E2)
  if (className.includes('Explorers')) return 'G3E1';
  if (className.includes('Navigators')) return 'G3E2';
  
  // G4 Classes - Inventors (E1), Voyagers (E2)
  if (className.includes('Inventors')) return 'G4E1';
  if (className.includes('Voyagers')) return 'G4E2';
  
  // G5 Classes - Pioneers (E1), Guardians (E2)
  if (className.includes('Pioneers')) return 'G5E1';
  if (className.includes('Guardians')) return 'G5E2';
  
  // G6 Classes - Pathfinders (E1), Seekers (E2), Visionaries (E3), Achievers (E3)
  if (className.includes('Pathfinders')) return 'G6E1';
  if (className.includes('Seekers')) return 'G6E2';
  if (className.includes('Visionaries')) return 'G6E3';
  if (className.includes('Achievers')) return 'G6E3';
  
  // Legacy pattern matching for older class names
  if (className.includes('Basic')) return `${grade}E1`;
  if (className.includes('Creative') || className.includes('Intermediate')) return `${grade}E2`;
  if (className.includes('Advanced') || className.includes('Speaker')) return `${grade}E3`;
  
  // Fallback: handle legacy level format (E1, E2, E3)
  if (level && level.match(/^E[1-3]$/)) {
    return grade + level;
  }
  
  // Final fallback: default to E2 (intermediate level)
  return `${grade}E2`;
}

/**
 * Check if a class name matches a class code | 檢查班級名稱是否匹配班級代碼
 */
function isClassNameMatchingCode(className, classCode) {
  // Simple matching logic - can be enhanced based on naming conventions
  const normalizedClassName = className.toUpperCase().replace(/\s+/g, '');
  const normalizedClassCode = classCode.toUpperCase().replace(/\s+/g, '');
  
  return normalizedClassName.includes(normalizedClassCode) || 
         normalizedClassCode.includes(normalizedClassName);
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

// ===== LT & LEVEL AND IT & LEVEL MANAGEMENT FUNCTIONS | LT&Level 和 IT&Level 管理函數 =====

/**
 * Update assessment titles for a specific teacher type and level unit
 * 更新特定教師類型和級別單位的評量標題
 */
function updateAssessmentTitlesByTeacherLevel(teacherType, classCode, formativeTitles, summativeTitles) {
  try {
    const config = getSystemConfig();
    
    // Validate teacher type
    if (!teacherType || !['LT', 'IT'].includes(teacherType)) {
      throw new Error('Teacher type must be either "LT" or "IT"');
    }
    
    // Validate class code format
    if (!classCode || !classCode.match(/^G[1-6]E[1-3]$/)) {
      throw new Error('Class code must be in format G[1-6]E[1-3] (e.g., G1E1, G3E2)');
    }
    
    // Validate formative titles count
    const expectedFormativeCount = config.ASSESSMENTS.FORMATIVE_COUNT;
    if (!formativeTitles || formativeTitles.length !== expectedFormativeCount) {
      throw new Error(`Formative titles must contain exactly ${expectedFormativeCount} items`);
    }
    
    // Validate summative titles count
    const expectedSummativeCount = config.ASSESSMENTS.SUMMATIVE_COUNT;
    if (!summativeTitles || summativeTitles.length !== expectedSummativeCount) {
      throw new Error(`Summative titles must contain exactly ${expectedSummativeCount} items`);
    }
    
    // Initialize teacher type structure if not exists
    if (!SYSTEM_CONFIG.ASSESSMENT_TITLES[teacherType]) {
      SYSTEM_CONFIG.ASSESSMENT_TITLES[teacherType] = {};
    }
    
    // Update the configuration
    SYSTEM_CONFIG.ASSESSMENT_TITLES[teacherType][classCode] = {
      FORMATIVE: formativeTitles.slice(),
      SUMMATIVE: summativeTitles.slice()
    };
    
    
    // Sync to existing gradebooks
    const syncResult = syncAssessmentTitlesToExistingGradebooksByTeacherLevel(teacherType, classCode);
    
    return {
      success: true,
      message: `Assessment titles updated for ${teacherType} ${classCode}`,
      teacherType: teacherType,
      classCode: classCode,
      syncResult: syncResult
    };
    
  } catch (error) {
    console.log(`Error updating assessment titles for ${teacherType} ${classCode}: ${error.message}`);
    return {
      success: false,
      message: `Failed to update assessment titles for ${teacherType} ${classCode}: ${error.message}`,
      teacherType: teacherType,
      classCode: classCode
    };
  }
}

/**
 * Get teacher type mapping from student data
 * 從學生資料中獲取教師類型對應
 */
function getTeacherTypeMapping() {
  try {
    const config = getSystemConfig();
    const systemFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, config.FOLDERS.MASTER_DATA);
    
    if (!masterDataFolder) {
      throw new Error('Master data folder not found');
    }
    
    // 嘗試多個可能的檔案名稱
    const possibleFileNames = [
      'Master Data | 主控資料',
      'Gradebook Master Data | 成績簿主控資料表'
    ];
    
    let masterDataSpreadsheet = null;
    let foundFileName = null;
    
    for (const fileName of possibleFileNames) {
      const files = masterDataFolder.getFilesByName(fileName);
      if (files.hasNext()) {
        masterDataSpreadsheet = SpreadsheetApp.openById(files.next().getId());
        foundFileName = fileName;
        break;
      }
    }
    
    if (!masterDataSpreadsheet) {
      throw new Error('Master data file not found');
    }
    
    
    // 嘗試多個可能的學生工作表名稱
    const studentSheetVariants = [
      'Students | 學生資料',
      'Students',
      '學生資料', 
      'Student Data'
    ];
    
    let studentsSheet = null;
    let studentsSheetName = null;
    
    for (const variant of studentSheetVariants) {
      const sheet = masterDataSpreadsheet.getSheetByName(variant);
      if (sheet) {
        studentsSheet = sheet;
        studentsSheetName = variant;
        break;
      }
    }
    
    if (!studentsSheet) {
      throw new Error('Students sheet not found');
    }
    
    const data = studentsSheet.getDataRange().getValues();
    const headers = data[0];
    
    // 找到教師欄位的索引
    const ltTeacherIndex = headers.findIndex(header => header.includes('LT Teacher'));
    const itTeacherIndex = headers.findIndex(header => header.includes('IT Teacher'));
    
    if (ltTeacherIndex === -1 || itTeacherIndex === -1) {
      throw new Error('Teacher columns not found in Students sheet');
    }
    
    const teacherTypeMap = new Map();
    
    // 處理資料行（跳過標題行）
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      const ltTeacher = row[ltTeacherIndex];
      const itTeacher = row[itTeacherIndex];
      
      if (ltTeacher && ltTeacher.trim()) {
        teacherTypeMap.set(ltTeacher.trim(), 'LT');
      }
      
      if (itTeacher && itTeacher.trim()) {
        teacherTypeMap.set(itTeacher.trim(), 'IT');
      }
    }
    
    return teacherTypeMap;
    
  } catch (error) {
    console.log(`Error building teacher type mapping: ${error.message}`);
    return new Map();
  }
}

/**
 * Detect teacher type from filename using teacher mapping
 * 使用教師對應表從檔名檢測教師類型
 */
function detectTeacherTypeFromFilename(fileName) {
  const teacherTypeMap = getTeacherTypeMapping();
  
  // 從檔名中提取教師名稱（去掉學期和 Gradebook 部分）
  const nameMatch = fileName.match(/^([^_]+)/);
  if (!nameMatch) return null;
  
  const teacherName = nameMatch[1].trim();
  
  // 檢查是否在教師類型對應表中
  if (teacherTypeMap.has(teacherName)) {
    return teacherTypeMap.get(teacherName);
  }
  
  // 如果找不到，嘗試舊的檔名檢測方法
  const isLTTeacher = fileName.includes('_LT') || fileName.includes('LT (Local Teacher)');
  const isITTeacher = fileName.includes('_IT') || fileName.includes('IT (International Teacher)');
  
  if (isLTTeacher) return 'LT';
  if (isITTeacher) return 'IT';
  
  return null;
}

/**
 * Sync assessment titles to existing gradebooks for a specific teacher type and level
 * 同步評量標題到特定教師類型和級別的現有成績簿
 */
function syncAssessmentTitlesToExistingGradebooksByTeacherLevel(teacherType, classCode, specificTeacherName = null) {
  try {
    
    // Get system folder
    let mainFolder;
    try {
      const config = getSystemConfig();
      mainFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    } catch (error) {
      const errorMsg = `Cannot access main folder with ID: ${SYSTEM_CONFIG.MAIN_FOLDER_ID}. Error: ${error.message}`;
      console.log(errorMsg);
      return { success: false, message: errorMsg };
    }
    
    const teacherGradebooksFolder = getSubFolder(mainFolder, config.FOLDERS.TEACHER_SHEETS, false);
    
    if (!teacherGradebooksFolder) {
      const errorMsg = `Teacher gradebooks folder "${config.FOLDERS.TEACHER_SHEETS}" not found. Please run initializeSystem() first to create the folder structure.`;
      console.log(errorMsg);
      return { success: false, message: errorMsg };
    }
    
    // Find all gradebook files
    const gradebookFiles = teacherGradebooksFolder.getFiles();
    let updatedSheets = 0;
    const errors = [];
    const updatedGradebooks = [];
    
    while (gradebookFiles.hasNext()) {
      const file = gradebookFiles.next();
      
      // Check if this is a gradebook file
      if (!file.getName().includes('Gradebook') && !file.getName().includes('成績簿')) {
        continue;
      }
      
      // Check if teacher type matches (if this is a teacher-specific update)
      const fileName = file.getName();
      const detectedTeacherType = detectTeacherTypeFromFilename(fileName);
      
      // Skip if teacher type doesn't match
      if (detectedTeacherType !== teacherType) {
        continue;
      }
      
      
      // If specific teacher name provided, check if it matches
      if (specificTeacherName && !fileName.includes(specificTeacherName)) {
        continue;
      }
      
      try {
        const spreadsheet = SpreadsheetApp.openById(file.getId());
        const sheets = spreadsheet.getSheets();
        
        for (const sheet of sheets) {
          const sheetName = sheet.getName();
          
          // Check if this sheet belongs to the same level (classCode)
          // We need to determine if this class sheet should use the specified level's assessment titles
          let shouldUpdate = false;
          
          // Method 1: Direct class code match (e.g. sheet name contains "G1E1")
          if (isClassNameMatchingCode(sheetName, classCode) || sheetName.includes(classCode)) {
            shouldUpdate = true;
          } 
          // Method 2: Check against Classes sheet configuration to find classes with this level
          else {
            try {
              const allClasses = getAllClassConfigurations();
              const matchingClass = allClasses.find(c => {
                // Check if this sheet name matches a class name that has the target classCode
                const cleanSheetName = sheetName.replace(/📚\s*/, ''); // Remove sheet icon
                return (c.className === cleanSheetName || 
                        cleanSheetName.includes(c.className) ||
                        c.className.includes(cleanSheetName)) && 
                       c.classCode === classCode;
              });
              
              if (matchingClass) {
                shouldUpdate = true;
              }
            } catch (error) {
              console.log(`Error checking class configurations for ${sheetName}: ${error.message}`);
              // Fall back to original matching logic
              if (sheetName.includes(classCode)) {
                shouldUpdate = true;
              }
            }
          }
          
          if (shouldUpdate) {
            
            // Update the sheet headers with teacher type and level
            const updateResult = updateExistingSheetHeadersByTeacherLevel(sheet, teacherType, classCode);
            
            if (updateResult.success) {
              updatedSheets++;
              updatedGradebooks.push({
                gradebook: fileName,
                sheet: sheetName,
                teacherType: teacherType,
                classCode: classCode
              });
            } else {
              errors.push(`Failed to update ${sheetName} in ${fileName}: ${updateResult.message}`);
            }
          }
        }
        
      } catch (error) {
        errors.push(`Error processing ${fileName}: ${error.message}`);
        console.log(`Error processing ${fileName}: ${error.message}`);
      }
    }
    
    console.log(`Sync completed: ${updatedSheets} sheets updated, ${errors.length} errors`);
    
    return {
      success: true,
      message: `Sync completed for ${teacherType} ${classCode}`,
      updatedSheets: updatedSheets,
      updatedGradebooks: updatedGradebooks,
      errors: errors,
      teacherType: teacherType,
      classCode: classCode
    };
    
  } catch (error) {
    console.log(`Error syncing for ${teacherType} ${classCode}: ${error.message}`);
    return {
      success: false,
      message: `Sync failed for ${teacherType} ${classCode}: ${error.message}`,
      teacherType: teacherType,
      classCode: classCode
    };
  }
}

/**
 * Update existing sheet headers with teacher type and level specific titles
 * 使用教師類型和級別特定標題更新現有工作表標題
 */
function updateExistingSheetHeadersByTeacherLevel(sheet, teacherType, classCode) {
  try {
    // Add null check for sheet parameter | 檢查sheet參數是否有效
    if (!sheet || typeof sheet.getName !== 'function') {
      return {
        success: false,
        message: 'Invalid sheet object provided - sheet is null or undefined'
      };
    }
    
    
    // Get the new assessment titles for this teacher type and class code (level)
    const assessmentTitles = getAssessmentTitles(classCode, teacherType);
    
    if (!assessmentTitles || !assessmentTitles.formative || !assessmentTitles.summative) {
      return {
        success: false,
        message: `No assessment titles found for ${teacherType} ${classCode}`
      };
    }
    
    // Get the headers from row 2 (row 1 is group headers)
    const headerRange = sheet.getRange(2, 1, 1, sheet.getLastColumn());
    const headers = headerRange.getValues()[0];
    
    // Formative assessments start at column H (index 7, 1-based column 8)
    const formativeStartIndex = 7; // Column H is at index 7 (0-based)
    
    // Verify column H contains F.A.1 or similar formative assessment title
    const columnHHeader = String(headers[7]).toLowerCase();
    if (!columnHHeader.includes('f.a.')) {
      return {
        success: false,
        message: `Expected formative assessment at column H, but found: ${headers[7]}`
      };
    }
    
    // Update formative assessment headers
    for (let i = 0; i < assessmentTitles.formative.length; i++) {
      const col = formativeStartIndex + i + 1; // formativeStartIndex=7 (H), so H=8, I=9, etc.
      if (col <= sheet.getLastColumn()) {
        sheet.getRange(2, col).setValue(assessmentTitles.formative[i]);
      }
    }
    
    // Find and update summative assessment headers
    const summativeStartIndex = formativeStartIndex + assessmentTitles.formative.length;
    for (let i = 0; i < assessmentTitles.summative.length; i++) {
      const col = summativeStartIndex + i + 1; // Continue from after formative columns
      if (col <= sheet.getLastColumn()) {
        sheet.getRange(2, col).setValue(assessmentTitles.summative[i]);
      }
    }
    
    
    return {
      success: true,
      message: `Headers updated for ${sheet.getName()}`,
      formativeCount: assessmentTitles.formative.length,
      summativeCount: assessmentTitles.summative.length
    };
    
  } catch (error) {
    console.log(`Error updating headers: ${error.message}`);
    return {
      success: false,
      message: `Error updating headers: ${error.message}`
    };
  }
}

/**
 * Batch update assessment titles for all levels of a specific teacher type
 * 批量更新特定教師類型所有級別的評量標題
 */
function batchUpdateAssessmentTitlesByTeacherType(teacherType, levelUpdates) {
  try {
    
    // Validate teacher type
    if (!teacherType || !['LT', 'IT'].includes(teacherType)) {
      throw new Error('Teacher type must be either "LT" or "IT"');
    }
    
    // Validate levelUpdates format
    if (!levelUpdates || typeof levelUpdates !== 'object') {
      throw new Error('levelUpdates must be an object with classCode keys');
    }
    
    const results = [];
    const errors = [];
    
    // Process each level update
    for (const [classCode, titles] of Object.entries(levelUpdates)) {
      if (!titles.formative || !titles.summative) {
        errors.push(`Invalid titles format for ${classCode}: missing formative or summative`);
        continue;
      }
      
      try {
        const result = updateAssessmentTitlesByTeacherLevel(
          teacherType,
          classCode,
          titles.formative,
          titles.summative
        );
        
        results.push(result);
        
        if (!result.success) {
          errors.push(`Failed to update ${classCode}: ${result.message}`);
        }
        
      } catch (error) {
        errors.push(`Error updating ${classCode}: ${error.message}`);
      }
    }
    
    const successCount = results.filter(r => r.success).length;
    const failureCount = results.length - successCount;
    
    
    return {
      success: errors.length === 0,
      message: `Batch update for ${teacherType}: ${successCount} success, ${failureCount} failures`,
      teacherType: teacherType,
      results: results,
      errors: errors,
      summary: {
        total: results.length,
        success: successCount,
        failures: failureCount
      }
    };
    
  } catch (error) {
    console.log(`Error in batch update for ${teacherType}: ${error.message}`);
    return {
      success: false,
      message: `Batch update failed for ${teacherType}: ${error.message}`,
      teacherType: teacherType
    };
  }
}

/**
 * Example function: Update LT G1E1 assessment titles and sync to all related gradebooks
 * 示例函數：更新LT G1E1評量標題並同步到所有相關成績簿
 */
function updateLT_G1E1_AssessmentTitles() {
  const formativeTitles = [
    '中文測驗1', '語音練習1', '故事分享1', '歌謠練習1', 
    '中文測驗2', '語音練習2', '故事分享2', '歌謠練習2'
  ];
  
  const summativeTitles = [
    '基礎測試1', '基礎測試2', '聽力測驗', '口語測驗'
  ];
  
  const result = updateAssessmentTitlesByTeacherLevel('LT', 'G1E1', formativeTitles, summativeTitles);
  
  
  if (result.success) {
    
    if (result.syncResult.errors.length > 0) {
      console.log(`⚠️ Sync errors:`, result.syncResult.errors);
    }
  } else {
  }
  
  return result;
}

/**
 * Example function: Update IT G2E2 assessment titles and sync to all related gradebooks
 * 示例函數：更新IT G2E2評量標題並同步到所有相關成績簿
 */
function updateIT_G2E2_AssessmentTitles() {
  const formativeTitles = [
    'Grammar Fun 1', 'Role Play 1', 'Story Create 1', 'Drama Time 1',
    'Grammar Fun 2', 'Role Play 2', 'Story Create 2', 'Drama Time 2'
  ];
  
  const summativeTitles = [
    'Chapter Test 1', 'Chapter Test 2', 'Performance', 'Final Exam'
  ];
  
  const result = updateAssessmentTitlesByTeacherLevel('IT', 'G2E2', formativeTitles, summativeTitles);
  
  
  if (result.success) {
    
    if (result.syncResult.errors.length > 0) {
      console.log(`⚠️ Sync errors:`, result.syncResult.errors);
    }
  } else {
  }
  
  return result;
}

/**
 * Utility function: Get all classes that belong to a specific level
 * 工具函數：取得屬於特定級別的所有班級
 */
function getClassesByLevel(targetLevel) {
  try {
    const allClasses = getAllClassConfigurations();
    const matchingClasses = allClasses.filter(c => c.classCode === targetLevel);
    
    
    return {
      success: true,
      level: targetLevel,
      classes: matchingClasses,
      count: matchingClasses.length
    };
    
  } catch (error) {
    console.log(`Error getting classes for level ${targetLevel}: ${error.message}`);
    return {
      success: false,
      level: targetLevel,
      message: error.message
    };
  }
}

/**
 * Utility function: Show current assessment titles for a specific teacher type and level
 * 工具函數：顯示特定教師類型和級別的當前評量標題
 */
function showCurrentAssessmentTitles(teacherType, level) {
  try {
    const assessmentTitles = getAssessmentTitles(level, teacherType);
    
    assessmentTitles.formative.forEach((title, index) => {
    });
    
    assessmentTitles.summative.forEach((title, index) => {
    });
    
    
    return assessmentTitles;
    
  } catch (error) {
    console.log(`Error showing assessment titles for ${teacherType} ${level}: ${error.message}`);
    return null;
  }
}

/**
 * Diagnostic function: Check system status before using Assessment Title Management
 * 診斷函數：在使用Assessment Title Management前檢查系統狀態
 */
function checkAssessmentTitleSystemStatus() {
  
  try {
    // 1. 檢查主資料夾
    let mainFolder;
    try {
      const config = getSystemConfig();
      mainFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    } catch (error) {
      console.log(`❌ 主資料夾不存在或無法存取: ${error.message}`);
      return {
        success: false,
        message: '主資料夾不存在，請先設定正確的 MAIN_FOLDER_ID'
      };
    }
    
    // 2. 檢查子資料夾
    const teacherGradebooksFolder = getSubFolder(mainFolder, config.FOLDERS.TEACHER_SHEETS, false);
    const masterDataFolder = getSubFolder(mainFolder, config.FOLDERS.MASTER_DATA, false);
    
    if (!teacherGradebooksFolder) {
    } else {
      
      // 檢查是否有現有成績簿
      const gradebookFiles = teacherGradebooksFolder.getFiles();
      let fileCount = 0;
      while (gradebookFiles.hasNext()) {
        gradebookFiles.next();
        fileCount++;
      }
    }
    
    if (!masterDataFolder) {
    } else {
    }
    
    // 3. 檢查Master Data
    try {
      const configs = getAllClassConfigurations();
      
      if (configs.length > 0) {
        configs.slice(0, 3).forEach((config, index) => {
          console.log(`   ${index + 1}. ${config.className} → ${config.classCode} (Level: ${config.level})`);
        });
      }
    } catch (error) {
      console.log(`❌ 無法讀取班級配置: ${error.message}`);
      console.log('   建議：執行 initializeSystem() 來建立Master Data');
    }
    
    // 4. 檢查Assessment Title配置
    console.log('\n4. 檢查Assessment Title配置:');
    try {
      const ltG1E1 = getAssessmentTitles('G1E1', 'LT');
      const itG1E1 = getAssessmentTitles('G1E1', 'IT');
      
      console.log(`✅ LT G1E1標題: ${ltG1E1.formative.slice(0, 2).join(', ')}...`);
      console.log(`✅ IT G1E1標題: ${itG1E1.formative.slice(0, 2).join(', ')}...`);
    } catch (error) {
      console.log(`❌ Assessment Title配置有問題: ${error.message}`);
    }
    
    console.log('\n=== 診斷完成 ===');
    
    return {
      success: true,
      message: '系統診斷完成，請檢查上方日誌'
    };
    
  } catch (error) {
    console.log(`❌ 診斷過程發生錯誤: ${error.message}`);
    return {
      success: false,
      message: `診斷失敗: ${error.message}`
    };
  }
}

// ===== HT DASHBOARD SUPPORT FUNCTIONS | HT控制台支援函數 =====

/**
 * Get all HT gradebooks for a specific grade
 * 取得指定年段的所有HT成績簿
 */
function getHTGradebooksForGrade(grade) {
  try {
    console.log(`Loading HT gradebooks for grade: ${grade}`);
    
    // Get system folder
    const config = getSystemConfig();
    const mainFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(mainFolder, config.FOLDERS.TEACHER_SHEETS, false);
    
    if (!teacherGradebooksFolder) {
      return {
        success: false,
        error: 'Teacher gradebooks folder not found'
      };
    }
    
    const gradebooks = [];
    const files = teacherGradebooksFolder.getFiles();
    
    // HT gradebook naming pattern: G1_IT_HT_Ms_Smith_2526F1_Gradebook
    const htPattern = new RegExp(`^${grade}_(IT|LT)_HT_(.+?)_\\d{4}S\\d_Gradebook$`, 'i');
    
    while (files.hasNext()) {
      const file = files.next();
      const fileName = file.getName();
      
      const match = fileName.match(htPattern);
      if (match) {
        const [, teacherType, teacherNamePart] = match;
        const teacherName = teacherNamePart.replace(/_/g, ' ');
        
        gradebooks.push({
          id: file.getId(),
          name: fileName,
          teacherName: teacherName,
          teacherType: teacherType,
          grade: grade,
          semester: config.SEMESTER,
          lastModified: file.getLastUpdated().toLocaleDateString(),
          url: `https://docs.google.com/spreadsheets/d/${file.getId()}`
        });
      }
    }
    
    // Also check for regular teacher gradebooks that might be HT-related
    files.forEach = function() {}; // Reset iterator
    const regularFiles = teacherGradebooksFolder.getFiles();
    
    while (regularFiles.hasNext()) {
      const file = regularFiles.next();
      const fileName = file.getName();
      
      // Check if this is a regular teacher gradebook that might be an HT
      // Pattern: TeacherName_SEMESTER_Gradebook
      const regularPattern = /^(.+?)_\d{4}S\d_Gradebook$/i;
      const regularMatch = fileName.match(regularPattern);
      
      if (regularMatch && !fileName.includes('_HT_')) {
        const [, teacherName] = regularMatch;
        
        // Check if this teacher is also an HT for this grade
        try {
          const htData = getHTData();
          const isHT = htData.some(ht => 
            ht.grade === grade && 
            (ht.ltTeacher === teacherName || ht.itTeacher === teacherName)
          );
          
          if (isHT) {
            // Determine teacher type
            const teacherType = getTeacherTypeMapping().get(teacherName) || 
                             (fileName.includes('_IT') ? 'IT' : 'LT');
            
            gradebooks.push({
              id: file.getId(),
              name: fileName,
              teacherName: teacherName,
              teacherType: teacherType,
              grade: grade,
              semester: config.SEMESTER,
              lastModified: file.getLastUpdated().toLocaleDateString(),
              url: `https://docs.google.com/spreadsheets/d/${file.getId()}`,
              isRegularTeacherFile: true
            });
          }
        } catch (error) {
          console.log(`Error checking HT status for ${teacherName}: ${error.message}`);
        }
      }
    }
    
    console.log(`Found ${gradebooks.length} HT gradebooks for grade ${grade}`);
    
    return {
      success: true,
      gradebooks: gradebooks.sort((a, b) => a.teacherName.localeCompare(b.teacherName))
    };
    
  } catch (error) {
    console.error(`Error loading HT gradebooks for grade ${grade}:`, error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Launch HT Assessment Management for specific grade and teacher type
 * 為特定年段和教師類型啟動HT評量管理
 */
function launchHTAssessmentManagement(grade, teacherType) {
  try {
    console.log(`Launching HT Assessment Management for ${grade} ${teacherType}`);
    
    // Create HT context for assessment management
    const htContext = {
      grade: grade,
      teacherType: teacherType,
      levels: ['E1', 'E2', 'E3'], // HT can manage all 3 levels of their grade
      isHT: true
    };
    
    // Launch assessment management interface with HT context
    showAssessmentManagementInterface(htContext);
    
    return {
      success: true,
      message: `Assessment Management launched for HT ${grade} ${teacherType}`
    };
    
  } catch (error) {
    console.error(`Error launching HT Assessment Management:`, error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Enhanced assessment management interface that supports HT context
 * 支援HT上下文的增強評量管理介面
 */
function showAssessmentManagementInterface(context = null) {
  try {
    let htmlContent;
    
    if (context && context.isHT) {
      // HT-specific interface
      htmlContent = createHTAssessmentManagementHTML(context);
    } else {
      // Regular teacher interface - get current context first
      const currentContext = getCurrentTeacherContext();
      if (!currentContext || !currentContext.success) {
        throw new Error('無法識別當前教師身份。請確保您是從教師成績簿中執行此功能。');
      }
      htmlContent = createAssessmentManagementHTML(currentContext);
    }
    
    const htmlOutput = HtmlService.createHtmlOutput(htmlContent)
      .setWidth(800)
      .setHeight(600)
      .setTitle('Assessment Title Management | 評量標題管理');
    
    SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Assessment Title Management | 評量標題管理');
    
  } catch (error) {
    console.error('Error showing assessment management interface:', error);
    SpreadsheetApp.getUi().alert('錯誤', `無法顯示評量管理介面: ${error.message}`, SpreadsheetApp.getUi().ButtonSet.OK);
  }
}

/**
 * Create HT-specific assessment management HTML interface
 * 創建HT專用的評量管理HTML介面
 */
function createHTAssessmentManagementHTML(htContext) {
  // Simple HT Assessment Management interface
  return '<html><body><h1>HT Assessment Management</h1><p>Grade: ' + htContext.grade + ' ' + htContext.teacherType + '</p><p>功能開發中...</p></body></html>';
}

// ===== UTILITY FUNCTIONS | 工具函數 =====

/**
 * Show error dialog with bilingual message | 顯示雙語錯誤對話框
 */
function showError(title, message) {
  try {
    const ui = SpreadsheetApp.getUi();
    ui.alert(title, message, ui.ButtonSet.OK);
  } catch (error) {
    console.error('Error showing error dialog:', error);
    console.error('Original error:', title, message);
  }
}

/**
 * Show success/info message dialog | 顯示成功/資訊對話框
 */
function showMessage(title, message) {
  try {
    const ui = SpreadsheetApp.getUi();
    ui.alert(title, message, ui.ButtonSet.OK);
  } catch (error) {
    // UI not available (e.g. running from editor), just log it
    console.log(`[UI Message] ${title}: ${message}`);
  }
}

/**
 * Debug admin setup | 診斷管理員設置
 */
function checkAdminSetup() {
  try {
    console.log('🔍 Checking admin setup...');
    
    // Get current user
    const currentUserEmail = Session.getActiveUser().getEmail();
    console.log(`👤 Current user: ${currentUserEmail}`);
    
    // Check admin configuration
    console.log('🔧 Admin configuration:');
    console.log('  - Enabled:', SYSTEM_CONFIG.ADMIN.ENABLED);
    console.log('  - Accounts:', SYSTEM_CONFIG.ADMIN.ACCOUNTS);
    
    // Check if current user is admin
    const isAdmin = SYSTEM_CONFIG.ADMIN.ENABLED && 
                   SYSTEM_CONFIG.ADMIN.ACCOUNTS.some(adminEmail => 
                     adminEmail.toLowerCase() === currentUserEmail.toLowerCase()
                   );
    
    console.log(`👑 Current user is admin: ${isAdmin}`);
    
    // Show detailed matching
    SYSTEM_CONFIG.ADMIN.ACCOUNTS.forEach((adminEmail, index) => {
      const matches = adminEmail.toLowerCase() === currentUserEmail.toLowerCase();
      console.log(`🔍 Admin account ${index + 1}: "${adminEmail}" vs "${currentUserEmail}" = ${matches}`);
    });
    
    return {
      success: true,
      currentUser: currentUserEmail,
      isAdmin: isAdmin,
      adminEnabled: SYSTEM_CONFIG.ADMIN.ENABLED,
      adminAccounts: SYSTEM_CONFIG.ADMIN.ACCOUNTS,
      message: `Current user: ${currentUserEmail}, Is Admin: ${isAdmin}`
    };
    
  } catch (error) {
    console.error('❌ Check admin setup failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Get master data sheet from system folder | 從系統資料夾取得主控資料表
 */
function getMasterDataSheet() {
  try {
    const config = getSystemConfig();
    if (!config || !config.MAIN_FOLDER_ID) {
      throw new Error('System configuration missing MAIN_FOLDER_ID | 系統配置缺少 MAIN_FOLDER_ID');
    }
    
    const systemFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, config.FOLDERS.MASTER_DATA, false);
    
    if (!masterDataFolder) {
      throw new Error('Master Data folder not found | 找不到主控資料資料夾');
    }
    
    // Try multiple possible file names
    const possibleFileNames = [
      'Master Data | 主控資料表',
      'Gradebook Master Data | 成績簿主控資料表',
      'Master Data',
      '主控資料表'
    ];
    
    let file = null;
    for (const fileName of possibleFileNames) {
      const files = masterDataFolder.getFilesByName(fileName);
      if (files.hasNext()) {
        file = files.next();
        console.log(`Found master data sheet with name: ${fileName}`);
        break;
      }
    }
    
    if (!file) {
      // List all files in the folder for debugging
      const allFiles = masterDataFolder.getFiles();
      const fileList = [];
      while (allFiles.hasNext()) {
        fileList.push(allFiles.next().getName());
      }
      
      throw new Error(`Master Data sheet not found. Tried names: ${possibleFileNames.join(', ')}. Available files: ${fileList.join(', ')}`);
    }
    
    return SpreadsheetApp.openById(file.getId());
    
  } catch (error) {
    console.error('Error getting master data sheet:', error);
    throw error;
  }
}

// ===== MISSING SYSTEM MANAGEMENT FUNCTIONS | 遺失的系統管理函數 =====

/**
 * Open system folder in Google Drive | 在Google Drive中開啟系統資料夾
 */
function openSystemFolder() {
  try {
    const config = getSystemConfig();
    const systemFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    const url = systemFolder.getUrl();
    
    showMessage('📁 Opening System Folder | 正在開啟系統資料夾', 
      `System folder is opening in a new tab | 系統資料夾將在新分頁中開啟\n\nURL: ${url}`);
    
    // Try to open URL (may not work in all contexts)
    try {
      const htmlOutput = HtmlService.createHtmlOutput(`
        <script>
          window.open('${url}', '_blank');
          google.script.host.close();
        </script>
        <p>Opening system folder... | 正在開啟系統資料夾...</p>
      `).setWidth(400).setHeight(200);
      
      SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Opening System Folder | 開啟系統資料夾');
    } catch (e) {
      console.log('Direct URL opening not available, showing URL instead');
    }
    
  } catch (error) {
    showError('❌ Error | 錯誤', `Failed to open system folder: ${error.message} | 無法開啟系統資料夾: ${error.message}`);
  }
}

/**
 * Open master data sheet | 開啟主控資料表
 */
function openMasterDataSheet() {
  try {
    const masterData = getMasterDataSheet();
    const url = masterData.getUrl();
    
    showMessage('📋 Opening Master Data | 正在開啟主控資料表', 
      `Master Data sheet is opening in a new tab | 主控資料表將在新分頁中開啟\n\nURL: ${url}`);
    
    // Try to open URL
    try {
      const htmlOutput = HtmlService.createHtmlOutput(`
        <script>
          window.open('${url}', '_blank');
          google.script.host.close();
        </script>
        <p>Opening Master Data sheet... | 正在開啟主控資料表...</p>
      `).setWidth(400).setHeight(200);
      
      SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Opening Master Data | 開啟主控資料表');
    } catch (e) {
      console.log('Direct URL opening not available, showing URL instead');
    }
    
  } catch (error) {
    showError('❌ Error | 錯誤', `Failed to open master data sheet: ${error.message} | 無法開啟主控資料表: ${error.message}`);
  }
}

/**
 * Show system settings | 顯示系統設定
 */
function openSystemSettings() {
  try {
    const config = getSystemConfig();
    const settings = `
⚙️ SYSTEM SETTINGS | 系統設定

📊 Basic Configuration | 基本配置:
• Semester | 學期: ${config.SEMESTER}
• System Name | 系統名稱: ${SYSTEM_CONFIG.SYSTEM_NAME}
• Main Folder ID | 主資料夾ID: ${SYSTEM_CONFIG.MAIN_FOLDER_ID}

📝 Assessment Settings | 評量設定:
• Formative Count | 平時評量數量: ${config.ASSESSMENTS.FORMATIVE_COUNT}
• Summative Count | 總結評量數量: ${config.ASSESSMENTS.SUMMATIVE_COUNT}
• Include Final Exam | 包含期末考: ${config.ASSESSMENTS.INCLUDE_FINAL}

⚖️ Grade Weights | 成績權重:
• Formative | 平時評量: ${config.WEIGHTS.FORMATIVE * 100}%
• Summative | 總結評量: ${config.WEIGHTS.SUMMATIVE * 100}%
• Final Exam | 期末考: ${config.WEIGHTS.FINAL * 100}%

📈 Progress Thresholds | 進度閾值:
• Excellent | 優秀: ≥${SYSTEM_CONFIG.PROGRESS.EXCELLENT}%
• Good | 良好: ${SYSTEM_CONFIG.PROGRESS.GOOD}-${SYSTEM_CONFIG.PROGRESS.EXCELLENT-1}%
• Normal | 普通: ${SYSTEM_CONFIG.PROGRESS.NORMAL}-${SYSTEM_CONFIG.PROGRESS.GOOD-1}%
• Behind | 落後: <${SYSTEM_CONFIG.PROGRESS.NORMAL}%

ℹ️ To modify these settings, edit the SYSTEM_CONFIG object in Code.gs
要修改這些設定，請編輯Code.gs中的SYSTEM_CONFIG物件
    `;
    
    showMessage('⚙️ System Settings | 系統設定', settings);
    
  } catch (error) {
    showError('❌ Error | 錯誤', `Failed to show system settings: ${error.message} | 無法顯示系統設定: ${error.message}`);
  }
}

/**
 * Create a cached map of teacher names to their grade information | 建立教師姓名與年級資訊的快取對應
 * This dramatically improves performance by reading Master Data only once
 */
function createTeacherGradeCache() {
  try {
    const masterData = getMasterDataSheet();
    const studentsSheet = masterData.getSheetByName('Students');
    const data = studentsSheet.getDataRange().getValues();
    const headers = data[0];
    
    // Find relevant columns
    const ltTeacherCol = headers.findIndex(h => h && (h.includes('LT Teacher') || h.includes('LT老師')));
    const itTeacherCol = headers.findIndex(h => h && (h.includes('IT Teacher') || h.includes('IT老師')));
    const gradeCol = headers.findIndex(h => h && (h.includes('Grade') || h.includes('年級')));
    const classCol = headers.findIndex(h => h && (h.includes('English Class') || h.includes('英文班級') || h.includes('Homeroom') || h.includes('班級')));
    
    if (ltTeacherCol === -1 || itTeacherCol === -1 || gradeCol === -1) {
      console.warn('⚠️ Some required columns not found in Master Data');
      return {};
    }
    
    const teacherMap = {};
    
    // Process all student records to build teacher-grade relationships
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (!row[0]) continue; // Skip empty rows
      
      const rowGrade = gradeCol >= 0 ? row[gradeCol] : '';
      const rowClass = classCol >= 0 ? row[classCol] : '';
      const ltTeacher = ltTeacherCol >= 0 ? row[ltTeacherCol] : '';
      const itTeacher = itTeacherCol >= 0 ? row[itTeacherCol] : '';
      
      // Normalize grade format
      let normalizedGrade = '';
      if (rowGrade) {
        const grade = rowGrade.toString().trim();
        if (grade.match(/^G?\d+$/)) {
          normalizedGrade = grade.replace(/^G?/, 'G');
        } else if (grade.match(/^Grade\s*\d+/i)) {
          normalizedGrade = 'G' + grade.match(/\d+/)[0];
        }
        
        if (!normalizedGrade.match(/^G[1-6]$/)) {
          normalizedGrade = '';
        }
      }
      
      // Process LT Teacher
      if (ltTeacher && normalizedGrade) {
        const teacherKey = `${ltTeacher}_LT`;
        if (!teacherMap[teacherKey]) {
          teacherMap[teacherKey] = {
            name: ltTeacher,
            type: 'LT',
            grades: new Set(),
            classes: new Set()
          };
        }
        teacherMap[teacherKey].grades.add(normalizedGrade);
        if (rowClass) {
          teacherMap[teacherKey].classes.add(rowClass.toString().trim());
        }
      }
      
      // Process IT Teacher
      if (itTeacher && normalizedGrade) {
        const teacherKey = `${itTeacher}_IT`;
        if (!teacherMap[teacherKey]) {
          teacherMap[teacherKey] = {
            name: itTeacher,
            type: 'IT',
            grades: new Set(),
            classes: new Set()
          };
        }
        teacherMap[teacherKey].grades.add(normalizedGrade);
        if (rowClass) {
          teacherMap[teacherKey].classes.add(rowClass.toString().trim());
        }
      }
    }
    
    // Convert Sets to sorted arrays and determine primary grade
    Object.keys(teacherMap).forEach(key => {
      const teacher = teacherMap[key];
      teacher.grades = Array.from(teacher.grades).sort();
      teacher.classes = Array.from(teacher.classes).sort();
      teacher.primaryGrade = teacher.grades[0] || 'Unknown';
      
      // If no direct grades found, try extracting from class names
      if (teacher.grades.length === 0 && teacher.classes.length > 0) {
        const classGrades = new Set();
        teacher.classes.forEach(className => {
          const classGrade = className.match(/G([1-6])/);
          if (classGrade) {
            classGrades.add(`G${classGrade[1]}`);
          }
        });
        teacher.grades = Array.from(classGrades).sort();
        teacher.primaryGrade = teacher.grades[0] || 'Unknown';
      }
    });
    
    return teacherMap;
    
  } catch (error) {
    console.error('❌ Error creating teacher grade cache:', error.message);
    return {};
  }
}

/**
 * Find teacher grade with fallback matching strategies | 使用後備匹配策略尋找教師年級
 * Attempts various name matching approaches to reduce Unknown teachers
 */
function findTeacherGradeWithFallback(teacherName, teacherType, teacherGradeMap) {
  const originalKey = `${teacherName}_${teacherType}`;
  
  // Try direct match first
  if (teacherGradeMap[originalKey]) {
    return teacherGradeMap[originalKey].primaryGrade;
  }
  
  // Try fuzzy matching strategies
  const allKeys = Object.keys(teacherGradeMap);
  
  // Strategy 1: Case-insensitive exact match
  const caseInsensitiveMatch = allKeys.find(key => 
    key.toLowerCase() === originalKey.toLowerCase()
  );
  if (caseInsensitiveMatch) {
    console.log(`🔍 Found case-insensitive match: ${teacherName} → ${caseInsensitiveMatch}`);
    return teacherGradeMap[caseInsensitiveMatch].primaryGrade;
  }
  
  // Strategy 2: Partial name match (handle middle names, initials)
  const nameOnlyMatches = allKeys.filter(key => {
    const keyTeacher = key.split('_')[0];
    const keyType = key.split('_')[1];
    
    if (keyType !== teacherType) return false;
    
    // Try various partial matching
    const teacherWords = teacherName.toLowerCase().split(/\s+/);
    const keyWords = keyTeacher.toLowerCase().split(/\s+/);
    
    // Check if teacher name is contained in key or vice versa
    const teacherInKey = teacherWords.some(word => keyWords.join(' ').includes(word) && word.length > 2);
    const keyInTeacher = keyWords.some(word => teacherWords.join(' ').includes(word) && word.length > 2);
    
    return teacherInKey || keyInTeacher;
  });
  
  if (nameOnlyMatches.length > 0) {
    const bestMatch = nameOnlyMatches[0];
    console.log(`🔍 Found partial match: ${teacherName} → ${bestMatch}`);
    return teacherGradeMap[bestMatch].primaryGrade;
  }
  
  // Strategy 3: Handle common prefixes (Mr., Ms., Mrs., Dr.)
  const cleanedName = teacherName.replace(/^(Mr\.?|Ms\.?|Mrs\.?|Dr\.?)\s*/i, '').trim();
  if (cleanedName !== teacherName) {
    const cleanedKey = `${cleanedName}_${teacherType}`;
    const cleanedMatch = allKeys.find(key => 
      key.toLowerCase() === cleanedKey.toLowerCase() || 
      key.toLowerCase().includes(cleanedName.toLowerCase())
    );
    if (cleanedMatch) {
      console.log(`🔍 Found cleaned name match: ${teacherName} → ${cleanedMatch}`);
      return teacherGradeMap[cleanedMatch].primaryGrade;
    }
  }
  
  console.log(`⚠️ No grade match found for teacher: ${teacherName} (${teacherType})`);
  return 'Unknown';
}

/**
 * Get all gradebook URLs with teacher names | 獲取所有成績簿網址與教師名稱
 * Returns a list of all gradebooks with their URLs for quick reference
 */
function getAllGradebookURLs() {
  try {
    console.log('📋 Starting to retrieve all gradebook URLs | 開始獲取所有成績簿網址...');
    
    // Get system configuration
    const config = getSystemConfig();
    const systemFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, config.FOLDERS.TEACHER_SHEETS, false);
    
    if (!teacherGradebooksFolder) {
      throw new Error('Teacher Gradebooks folder not found | 找不到教師成績簿資料夾');
    }
    
    // Cache Master Data reading - read once for all teachers
    console.log('📊 Loading Master Data for grade mapping | 載入主控資料以進行年級對應...');
    const teacherGradeMap = createTeacherGradeCache();
    console.log(`✅ Cached grade data for ${Object.keys(teacherGradeMap).length} teachers | 已快取 ${Object.keys(teacherGradeMap).length} 位教師的年級資料`);
    
    const gradebookList = [];
    const files = teacherGradebooksFolder.getFiles();
    let fileCount = 0;
    
    // Process each file in the folder
    while (files.hasNext()) {
      const file = files.next();
      const fileName = file.getName();
      
      // Only process gradebook files
      if (fileName.includes('Gradebook')) {
        fileCount++;
        const fileId = file.getId();
        const fileUrl = `https://docs.google.com/spreadsheets/d/${fileId}`;
        const createdDate = file.getDateCreated();
        const lastModified = file.getLastUpdated();
        
        // Extract teacher information from filename
        let teacherInfo = {
          name: 'Unknown',
          type: 'Unknown',
          isHT: false,
          gradeGroup: '',
          semester: config.SEMESTER
        };
        
        // Check if it's an HT gradebook: "Name - HT GradeGroup Type - Gradebook"
        const htPattern = /^(.+?)\s*-\s*HT\s+(G\d+-G\d+)\s+(IT|LT)\s*-\s*Gradebook$/i;
        const htMatch = fileName.match(htPattern);
        
        if (htMatch) {
          teacherInfo.name = htMatch[1].trim();
          teacherInfo.gradeGroup = htMatch[2];
          teacherInfo.type = htMatch[3];
          teacherInfo.isHT = true;
        } else {
          // Regular gradebook pattern: "SEMESTER_TeacherName_Type_Gradebook"
          const regularPattern = new RegExp(`^${config.SEMESTER}_(.*?)_(IT|LT)_Gradebook$`, 'i');
          const regularMatch = fileName.match(regularPattern);
          
          if (regularMatch) {
            teacherInfo.name = regularMatch[1].trim();
            teacherInfo.type = regularMatch[2];
          } else {
            // Alternative pattern: "TeacherName_SEMESTER_Gradebook"
            const altPattern = /^(.+?)_\d{4}[SF]\d_Gradebook$/i;
            const altMatch = fileName.match(altPattern);
            
            if (altMatch) {
              teacherInfo.name = altMatch[1].trim();
              // Try to determine type from name
              if (fileName.includes('_IT')) {
                teacherInfo.type = 'IT';
              } else if (fileName.includes('_LT')) {
                teacherInfo.type = 'LT';
              }
            }
          }
        }
        
        // Extract grade information using cached data
        let grades = [];
        let primaryGrade = '';
        
        if (teacherInfo.isHT && teacherInfo.gradeGroup) {
          // For HT teachers, extract grades from grade group (e.g., "G1-G2" -> ["G1", "G2"])
          const gradeMatch = teacherInfo.gradeGroup.match(/G(\d+)(?:-G(\d+))?/);
          if (gradeMatch) {
            grades.push(`G${gradeMatch[1]}`);
            if (gradeMatch[2]) {
              grades.push(`G${gradeMatch[2]}`);
            }
            primaryGrade = grades[0]; // Use first grade as primary
          }
        } else {
          // For regular teachers, use cached grade data
          const teacherKey = `${teacherInfo.name}_${teacherInfo.type}`;
          const cachedData = teacherGradeMap[teacherKey];
          
          if (cachedData) {
            grades = cachedData.grades || [];
            primaryGrade = cachedData.primaryGrade || 'Unknown';
          } else {
            // Try alternate matching approaches for better coverage
            primaryGrade = findTeacherGradeWithFallback(teacherInfo.name, teacherInfo.type, teacherGradeMap);
            grades = primaryGrade !== 'Unknown' ? [primaryGrade] : [];
          }
        }
        
        // Add to list with enhanced data
        gradebookList.push({
          teacherName: teacherInfo.name,
          teacherType: teacherInfo.type,
          isHT: teacherInfo.isHT,
          gradeGroup: teacherInfo.gradeGroup,
          grades: grades,
          primaryGrade: primaryGrade,
          fileName: fileName,
          url: fileUrl,
          fileId: fileId,
          createdDate: createdDate.toLocaleDateString(),
          lastModified: lastModified.toLocaleDateString()
        });
      }
    }
    
    // Enhanced sorting: Grade → Teacher Type → Teacher Name
    gradebookList.sort((a, b) => {
      // First, separate HT teachers (put them at the end)
      if (a.isHT && !b.isHT) return 1;
      if (!a.isHT && b.isHT) return -1;
      
      // For both regular or both HT teachers
      if (a.isHT && b.isHT) {
        // Sort HT teachers by grade group, then by teacher type, then by name
        const gradeGroupCompare = (a.gradeGroup || '').localeCompare(b.gradeGroup || '');
        if (gradeGroupCompare !== 0) return gradeGroupCompare;
        
        const typeCompare = a.teacherType.localeCompare(b.teacherType);
        if (typeCompare !== 0) return typeCompare;
        
        return a.teacherName.localeCompare(b.teacherName);
      } else {
        // Sort regular teachers by primary grade, then by teacher type, then by name
        const gradeOrder = ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'Unknown'];
        const aGradeIndex = gradeOrder.indexOf(a.primaryGrade);
        const bGradeIndex = gradeOrder.indexOf(b.primaryGrade);
        
        if (aGradeIndex !== bGradeIndex) {
          return aGradeIndex - bGradeIndex;
        }
        
        // Same grade, sort by teacher type
        const typeCompare = a.teacherType.localeCompare(b.teacherType);
        if (typeCompare !== 0) return typeCompare;
        
        // Same grade and type, sort by teacher name
        return a.teacherName.localeCompare(b.teacherName);
      }
    });
    
    console.log(`✅ Successfully retrieved ${gradebookList.length} gradebook URLs | 成功獲取 ${gradebookList.length} 個成績簿網址`);
    
    // Format output for display with grade-level grouping
    let output = '📊 GRADEBOOK URL LIST | 成績簿網址列表 (按年級排序)\n';
    output += '=' .repeat(80) + '\n\n';
    
    // Group by grade level
    const regularTeachers = gradebookList.filter(g => !g.isHT);
    const htTeachers = gradebookList.filter(g => g.isHT);
    
    // Format regular teachers by grade
    const gradeOrder = ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'Unknown'];
    
    for (const grade of gradeOrder) {
      const gradeTeachers = regularTeachers.filter(g => g.primaryGrade === grade);
      if (gradeTeachers.length > 0) {
        const gradeIcon = grade === 'Unknown' ? '❓' : `🎓`;
        output += `${gradeIcon} ${grade} TEACHERS | ${grade}教師 (${gradeTeachers.length})\n`;
        output += '-' .repeat(50) + '\n';
        
        gradeTeachers.forEach((teacher, index) => {
          const typeIcon = teacher.teacherType === 'LT' ? '📚' : '💻';
          output += `${index + 1}. ${typeIcon} ${teacher.teacherName} (${teacher.teacherType})`;
          if (teacher.grades && teacher.grades.length > 1) {
            output += ` - Grades: ${teacher.grades.join(', ')}`;
          }
          output += '\n';
          output += `   📎 ${teacher.url}\n`;
          output += `   📅 Created: ${teacher.createdDate} | Last Modified: ${teacher.lastModified}\n\n`;
        });
        output += '\n';
      }
    }
    
    // Format HT Teachers
    if (htTeachers.length > 0) {
      output += '👨‍🏫 HEAD TEACHERS (HT) | 學年主任\n';
      output += '-' .repeat(50) + '\n';
      htTeachers.forEach((teacher, index) => {
        const typeIcon = teacher.teacherType === 'LT' ? '📚' : '💻';
        output += `${index + 1}. ${typeIcon} ${teacher.teacherName} (${teacher.gradeGroup} ${teacher.teacherType})\n`;
        output += `   📎 ${teacher.url}\n`;
        output += `   📅 Created: ${teacher.createdDate} | Last Modified: ${teacher.lastModified}\n\n`;
      });
    }
    
    // Summary statistics with grade breakdown
    output += '\n' + '=' .repeat(80) + '\n';
    output += '📈 SUMMARY | 總結\n';
    output += `• Total Gradebooks | 總成績簿數: ${gradebookList.length}\n`;
    output += `• Regular Teachers | 一般教師: ${regularTeachers.length}\n`;
    output += `• HT Teachers | HT教師: ${htTeachers.length}\n\n`;
    
    // Grade breakdown
    output += '📊 GRADE BREAKDOWN | 年級分佈:\n';
    for (const grade of gradeOrder) {
      const gradeTeachers = regularTeachers.filter(g => g.primaryGrade === grade);
      if (gradeTeachers.length > 0) {
        const ltCount = gradeTeachers.filter(g => g.teacherType === 'LT').length;
        const itCount = gradeTeachers.filter(g => g.teacherType === 'IT').length;
        output += `• ${grade}: ${gradeTeachers.length} teachers (${ltCount} LT, ${itCount} IT)\n`;
      }
    }
    
    if (htTeachers.length > 0) {
      output += '\n🎯 HT BREAKDOWN | HT分佈:\n';
      const gradeGroups = [...new Set(htTeachers.map(g => g.gradeGroup))].sort();
      for (const gradeGroup of gradeGroups) {
        const groupTeachers = htTeachers.filter(g => g.gradeGroup === gradeGroup);
        const ltCount = groupTeachers.filter(g => g.teacherType === 'LT').length;
        const itCount = groupTeachers.filter(g => g.teacherType === 'IT').length;
        output += `• ${gradeGroup}: ${groupTeachers.length} HT teachers (${ltCount} LT, ${itCount} IT)\n`;
      }
    }
    
    // Log the output
    console.log(output);
    
    // Calculate counts for return data
    const regularTeachersCount = regularTeachers.length;
    const htTeachersCount = htTeachers.length;
    const ltCount = gradebookList.filter(g => g.teacherType === 'LT' && !g.isHT).length;
    const itCount = gradebookList.filter(g => g.teacherType === 'IT' && !g.isHT).length;
    
    // Return structured data
    return {
      success: true,
      totalCount: gradebookList.length,
      regularCount: regularTeachersCount,
      ltCount: ltCount,
      itCount: itCount,
      htCount: htTeachersCount,
      gradebooks: gradebookList,
      formattedOutput: output
    };
    
  } catch (error) {
    console.error('❌ Error retrieving gradebook URLs:', error);
    return {
      success: false,
      error: error.message,
      gradebooks: []
    };
  }
}

/**
 * Dashboard-compatible function to get all gradebook URLs | 控制台相容函數以獲取所有成績簿網址
 * Can be called from Google Sheets cells
 */
function getAllGradebookURLsFromDashboard() {
  try {
    const result = getAllGradebookURLs();
    
    if (!result.success) {
      return {
        success: false,
        error: result.error
      };
    }
    
    // Format for dashboard display
    return {
      success: true,
      totalGradebooks: result.totalCount,
      ltTeachers: result.ltCount,
      itTeachers: result.itCount,
      htTeachers: result.htCount,
      message: `✅ Found ${result.totalCount} gradebooks | 找到 ${result.totalCount} 個成績簿\n\nCheck the console log for detailed URL list | 請查看控制台日誌以獲取詳細網址列表`,
      data: result.gradebooks
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Export gradebook URLs to a new Google Sheet | 將成績簿網址匯出到新的Google試算表
 * Creates a new sheet with all gradebook information for easy reference
 */
function exportGradebookURLsToSheet() {
  try {
    console.log('📊 Creating gradebook URL reference sheet | 建立成績簿網址參考表...');
    
    // Get all gradebook data
    const result = getAllGradebookURLs();
    
    if (!result.success || result.gradebooks.length === 0) {
      throw new Error('No gradebooks found to export | 沒有找到可匯出的成績簿');
    }
    
    // Create new spreadsheet
    const timestamp = new Date().toISOString().split('T')[0];
    const exportSheet = SpreadsheetApp.create(`Gradebook URLs Reference - ${timestamp}`);
    const sheet = exportSheet.getActiveSheet();
    
    // Set headers with grade information
    const headers = [
      'Grade | 年級',
      'Teacher Name | 教師姓名',
      'Type | 類型', 
      'All Grades | 所有年級',
      'Is HT | 是否為HT',
      'Grade Group | 年級組',
      'Gradebook URL | 成績簿網址',
      'File Name | 檔案名稱',
      'Created Date | 建立日期',
      'Last Modified | 最後修改'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.getRange(1, 1, 1, headers.length).setBackground('#4285F4');
    sheet.getRange(1, 1, 1, headers.length).setFontColor('#FFFFFF');
    
    // Add data with grade information
    const data = result.gradebooks.map(g => [
      g.primaryGrade || 'Unknown',
      g.teacherName,
      g.teacherType,
      g.grades && g.grades.length > 0 ? g.grades.join(', ') : (g.primaryGrade || 'Unknown'),
      g.isHT ? 'Yes' : 'No',
      g.gradeGroup || '-',
      g.url,
      g.fileName,
      g.createdDate,
      g.lastModified
    ]);
    
    if (data.length > 0) {
      sheet.getRange(2, 1, data.length, headers.length).setValues(data);
    }
    
    // Format the sheet
    sheet.autoResizeColumns(1, headers.length);
    sheet.setFrozenRows(1);
    
    // Apply grade-based color coding and formatting
    if (data.length > 0) {
      const dataRange = sheet.getRange(2, 1, data.length, headers.length);
      
      // Grade color scheme
      const gradeColors = {
        'G1': '#E3F2FD', // Light Blue
        'G2': '#E8F5E8', // Light Green
        'G3': '#FFF3E0', // Light Orange
        'G4': '#F3E5F5', // Light Purple
        'G5': '#FFEBEE', // Light Red
        'G6': '#E0F2F1', // Light Teal
        'Unknown': '#F5F5F5' // Light Gray
      };
      
      // Apply colors row by row
      for (let i = 0; i < data.length; i++) {
        const grade = data[i][0]; // Primary grade is in first column
        const rowRange = sheet.getRange(i + 2, 1, 1, headers.length);
        
        if (gradeColors[grade]) {
          rowRange.setBackground(gradeColors[grade]);
        }
        
        // Special formatting for HT teachers
        const isHT = data[i][4] === 'Yes'; // IsHT is in 5th column
        if (isHT) {
          rowRange.setFontWeight('bold');
          rowRange.setBorder(true, true, true, true, false, false, '#4285F4', SpreadsheetApp.BorderStyle.SOLID);
        }
      }
      
      // Add conditional formatting for URL column to make it more prominent
      const urlColumn = 7; // Gradebook URL column
      const urlRange = sheet.getRange(2, urlColumn, data.length, 1);
      urlRange.setFontColor('#1155CC'); // Blue color for URLs
      
      // Make the sheet more readable
      dataRange.setVerticalAlignment('middle');
      dataRange.setHorizontalAlignment('left');
      
      // Special formatting for the grade column
      const gradeColumnRange = sheet.getRange(2, 1, data.length, 1);
      gradeColumnRange.setHorizontalAlignment('center');
      gradeColumnRange.setFontWeight('bold');
    }
    
    // Add a legend for grade colors
    const legendStartRow = data.length + 4;
    sheet.getRange(legendStartRow, 1, 1, 2).setValues([['Grade Color Legend | 年級顏色說明', '']]);
    sheet.getRange(legendStartRow, 1).setFontWeight('bold').setFontSize(12);
    
    const legendData = [
      ['G1', '藍色 Blue'],
      ['G2', '綠色 Green'], 
      ['G3', '橘色 Orange'],
      ['G4', '紫色 Purple'],
      ['G5', '紅色 Red'],
      ['G6', '青色 Teal'],
      ['HT Teachers | HT教師', '粗體藍框 Bold Blue Border']
    ];
    
    const gradeColors = {
      'G1': '#E3F2FD',
      'G2': '#E8F5E8', 
      'G3': '#FFF3E0',
      'G4': '#F3E5F5',
      'G5': '#FFEBEE',
      'G6': '#E0F2F1'
    };
    
    for (let i = 0; i < legendData.length; i++) {
      const legendRow = legendStartRow + i + 1;
      sheet.getRange(legendRow, 1, 1, 2).setValues([legendData[i]]);
      
      if (gradeColors[legendData[i][0]]) {
        sheet.getRange(legendRow, 1, 1, 2).setBackground(gradeColors[legendData[i][0]]);
      } else if (legendData[i][0].includes('HT')) {
        sheet.getRange(legendRow, 1, 1, 2).setFontWeight('bold')
             .setBorder(true, true, true, true, false, false, '#4285F4', SpreadsheetApp.BorderStyle.SOLID);
      }
    }
    
    // Move to system folder
    const config = getSystemConfig();
    const systemFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    const file = DriveApp.getFileById(exportSheet.getId());
    file.moveTo(systemFolder);
    
    const exportUrl = exportSheet.getUrl();
    
    console.log(`✅ Successfully exported gradebook URLs to: ${exportUrl}`);
    
    // Show success message
    showMessage('✅ Export Successful | 匯出成功', 
      `Gradebook URLs have been exported to a new sheet | 成績簿網址已匯出到新試算表\n\n` +
      `📊 Total Gradebooks | 總成績簿數: ${result.totalCount}\n` +
      `📎 Sheet URL | 試算表網址: ${exportUrl}\n\n` +
      `The sheet has been saved to your system folder | 試算表已儲存到系統資料夾`);
    
    return {
      success: true,
      url: exportUrl,
      totalExported: result.totalCount
    };
    
  } catch (error) {
    console.error('❌ Error exporting gradebook URLs:', error);
    showError('❌ Export Failed | 匯出失敗', 
      `Failed to export gradebook URLs: ${error.message} | 無法匯出成績簿網址: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Backup system data | 備份系統資料
 */
function backupSystem() {
  try {
    showMessage('🔄 System Backup | 系統備份', 
      `Starting system backup... | 正在開始系統備份...\n\nThis may take a few minutes | 這可能需要幾分鐘時間`);
    
    const config = getSystemConfig();
    const systemFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    const backupFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.BACKUP);
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupName = `System_Backup_${timestamp}`;
    const dailyBackupFolder = backupFolder.createFolder(backupName);
    
    let backupCount = 0;
    
    // Backup Master Data
    try {
      const masterData = getMasterDataSheet();
      const masterBackup = masterData.copy(`MasterData_Backup_${timestamp}`);
      DriveApp.getFileById(masterBackup.getId()).moveTo(dailyBackupFolder);
      backupCount++;
    } catch (e) {
      console.warn('Master Data backup failed:', e);
    }
    
    // Backup key system files
    const importantFolders = [
      config.FOLDERS.TEACHER_SHEETS,
      SYSTEM_CONFIG.FOLDERS.TEMPLATES,
      SYSTEM_CONFIG.FOLDERS.REPORTS
    ];
    
    for (const folderName of importantFolders) {
      try {
        const folder = getSubFolder(systemFolder, folderName, false);
        if (folder) {
          const folderBackup = dailyBackupFolder.createFolder(`${folderName}_Backup`);
          const files = folder.getFiles();
          while (files.hasNext()) {
            const file = files.next();
            file.makeCopy(`${file.getName()}_backup_${timestamp}`, folderBackup);
            backupCount++;
          }
        }
      } catch (e) {
        console.warn(`Backup failed for folder ${folderName}:`, e);
      }
    }
    
    showMessage('✅ Backup Complete | 備份完成', 
      `System backup completed successfully! | 系統備份成功完成！\n\n` +
      `📁 Backup Location | 備份位置: ${dailyBackupFolder.getName()}\n` +
      `📊 Files Backed Up | 備份檔案數: ${backupCount}\n` +
      `⏰ Backup Time | 備份時間: ${new Date().toLocaleString()}`);
    
  } catch (error) {
    showError('❌ Backup Failed | 備份失敗', `System backup failed: ${error.message} | 系統備份失敗: ${error.message}`);
  }
}

/**
 * System maintenance and cleanup | 系統維護和清理
 */
function systemMaintenance() {
  try {
    showMessage('🔧 System Maintenance | 系統維護', 
      `Starting system maintenance... | 正在開始系統維護...\n\nChecking system health | 檢查系統健康狀態`);
    
    let issues = [];
    let fixes = [];
    
    // Check system folder structure
    try {
      const config = getSystemConfig();
    const systemFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
      for (const folderName of Object.values(SYSTEM_CONFIG.FOLDERS)) {
        const subFolder = getSubFolder(systemFolder, folderName, false);
        if (!subFolder) {
          issues.push(`Missing folder: ${folderName}`);
          // Auto-fix: create missing folder
          systemFolder.createFolder(folderName);
          fixes.push(`Created missing folder: ${folderName}`);
        }
      }
    } catch (e) {
      issues.push(`System folder access error: ${e.message}`);
    }
    
    // Check Master Data
    try {
      const masterData = getMasterDataSheet();
      const studentsSheet = masterData.getSheetByName('Students');
      if (!studentsSheet) {
        issues.push('Students sheet missing in Master Data');
      }
    } catch (e) {
      issues.push(`Master Data access error: ${e.message}`);
    }
    
    // Generate maintenance report
    const report = `
🔧 SYSTEM MAINTENANCE REPORT | 系統維護報告

⏰ Maintenance Time | 維護時間: ${new Date().toLocaleString()}

${issues.length > 0 ? `❌ Issues Found | 發現問題 (${issues.length}):\n${issues.map(issue => `• ${issue}`).join('\n')}\n` : '✅ No Issues Found | 未發現問題\n'}

${fixes.length > 0 ? `🔧 Auto-Fixes Applied | 自動修復 (${fixes.length}):\n${fixes.map(fix => `• ${fix}`).join('\n')}\n` : ''}

💡 Recommendations | 建議:
• Regular backup system data | 定期備份系統資料
• Monitor system performance | 監控系統效能
• Keep Google Drive organized | 保持Google Drive整潔
• Check user permissions regularly | 定期檢查使用者權限

✅ Maintenance Complete | 維護完成
    `;
    
    showMessage('✅ Maintenance Complete | 維護完成', report);
    
  } catch (error) {
    showError('❌ Maintenance Failed | 維護失敗', 'System maintenance failed: ' + error.message + ' | 系統維護失敗: ' + error.message);
  }
}

// ===== WEB APP FUNCTIONS | Web App 函數 =====

/**
 * Simple test function for Web App verification | Web App 驗證測試函數
 */
function testWebApp() {
  try {
    // Test basic configuration access
    const config = getSystemConfig();
    
    return {
      success: true,
      message: 'Web App is working correctly | Web App 運作正常',
      systemName: config.SYSTEM_NAME || 'Gradebook System',
      timestamp: new Date().toLocaleString()
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toLocaleString()
    };
  }
}


/**
 * Get HT Dashboard for Web App | 取得 Web App 版本的 HT 控制台
 */
function getHTDashboardWebApp() {
  try {
    console.log('Loading HT Dashboard Web App...');
    
    const html = HtmlService.createTemplateFromFile('dashboard_for_HT');
    
    // Pass system configuration to the template
    html.isWebApp = true;
    html.systemConfig = {
      mainFolderId: SYSTEM_CONFIG.MAIN_FOLDER_ID,
      folders: SYSTEM_CONFIG.FOLDERS
    };
    
    const htmlOutput = html.evaluate()
      .setTitle('HT Dashboard | 學年主任控制台')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    console.log('✅ HT Dashboard Web App loaded successfully');
    return htmlOutput;
    
  } catch (error) {
    console.error('❌ Failed to load HT Dashboard Web App:', error);
    throw error;
  }
}

/**
 * Get Main Dashboard for Web App | 取得 Web App 版本的主控制台
 */
function getMainDashboardWebApp() {
  try {
    console.log('Loading Main Dashboard Web App...');
    
    const html = HtmlService.createTemplateFromFile('dashboard');
    
    // Pass system configuration to the template
    html.isWebApp = true;
    html.systemConfig = {
      mainFolderId: SYSTEM_CONFIG.MAIN_FOLDER_ID,
      folders: SYSTEM_CONFIG.FOLDERS
    };
    
    const htmlOutput = html.evaluate()
      .setTitle('Gradebook System Dashboard | 成績簿系統控制台')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    console.log('✅ Main Dashboard Web App loaded successfully');
    return htmlOutput;
    
  } catch (error) {
    console.error('❌ Failed to load Main Dashboard Web App:', error);
    throw error;
  }
}

/**
 * Include CSS/JS files for Web App | 為 Web App 包含 CSS/JS 檔案
 */
function include(filename) {
  try {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  } catch (error) {
    console.error(`Failed to include file: ${filename}`, error);
    return `<!-- Failed to include ${filename} -->`;
  }
}

// ===== SIMPLIFIED HT ASSESSMENT MANAGEMENT | 簡化HT評量管理 =====

/**
 * Simple HT Assessment Title Management - Main Interface
 * 簡化的HT評量標題管理 - 主介面
 */
function simpleHTAssessmentManager() {
  try {
    const ui = SpreadsheetApp.getUi();
    
    // Step 1: Select class
    const classResult = ui.prompt(
      'Step 1: Select Class | 步驟1：選擇班級',
      'Please enter class code (e.g., G1E1, G2E2, G3E3...) | 請輸入班級代碼 (例如：G1E1, G2E2, G3E3...)',
      ui.ButtonSet.OK_CANCEL
    );
    
    if (classResult.getSelectedButton() !== ui.Button.OK) return;
    const selectedClass = classResult.getResponseText().trim();
    
    // Step 2: Select subject
    const subjectResult = ui.alert(
      'Step 2: Select Subject | 步驟2：選擇科目',
      `Class: ${selectedClass}\nChoose subject type | 選擇科目類型:\nYES = LT, NO = IT`,
      ui.ButtonSet.YES_NO_CANCEL
    );
    
    if (subjectResult === ui.Button.CANCEL) return;
    const subjectType = (subjectResult === ui.Button.YES) ? 'LT' : 'IT';
    
    // Step 3: Select assessment
    const assessmentResult = ui.prompt(
      'Step 3: Select Assessment | 步驟3：選擇評量',
      `Class: ${selectedClass}, Subject: ${subjectType}\nEnter assessment code | 輸入評量代碼:\nF.A.1~8, S.A.1~4, or Midterm`,
      ui.ButtonSet.OK_CANCEL
    );
    
    if (assessmentResult.getSelectedButton() !== ui.Button.OK) return;
    const assessmentCode = assessmentResult.getResponseText().trim();
    
    // Step 4: Enter new title
    const titleResult = ui.prompt(
      'Step 4: New Title | 步驟4：新標題',
      `Class: ${selectedClass}, Subject: ${subjectType}, Assessment: ${assessmentCode}\nEnter new title | 輸入新標題:`,
      ui.ButtonSet.OK_CANCEL
    );
    
    if (titleResult.getSelectedButton() !== ui.Button.OK) return;
    const newTitle = titleResult.getResponseText().trim();
    
    // Step 5: Execute update
    ui.alert('Processing...', 'Updating assessment titles... | 正在更新評量標題...', ui.ButtonSet.OK);
    
    const result = updateSingleClassAssessment(selectedClass, subjectType, assessmentCode, newTitle);
    
    // Show result
    if (result.success) {
      ui.alert(
        'Success | 成功',
        `${result.message}\n${result.details || ''}`,
        ui.ButtonSet.OK
      );
    } else {
      ui.alert(
        'Error | 錯誤',
        `Failed: ${result.error} | 失敗: ${result.error}`,
        ui.ButtonSet.OK
      );
    }
    
  } catch (error) {
    console.error('Error in simpleHTAssessmentManager:', error);
    SpreadsheetApp.getUi().alert(
      'System Error | 系統錯誤',
      `Unexpected error: ${error.message} | 未預期的錯誤: ${error.message}`,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

/**
 * Find all teachers for a specific class and subject
 * 查找特定班級和科目的所有老師
 */
// ===== CLASS TO LEVEL GROUP MAPPING | 班級到級別組映射 =====
const CLASS_TO_LEVEL_MAPPING = {
  // G1 Classes
  'G1 Achievers': 'G1E1',
  'G1 Discoverers': 'G1E1',
  'G1 Voyagers': 'G1E1',
  'G1 Explorers': 'G1E1',
  'G1 Navigators': 'G1E1',
  'G1 Adventurers': 'G1E2',
  'G1 Guardians': 'G1E2',
  'G1 Pioneers': 'G1E2',
  'G1 Innovators': 'G1E2',
  'G1 Visionaries': 'G1E2',
  'G1 Pathfinders': 'G1E3',
  'G1 Seekers': 'G1E3',
  'G1 Trailblazers': 'G1E3',
  'G1 Inventors': 'G1E3',
  
  // G2 Classes
  'G2 Pioneers': 'G2E1',
  'G2 Explorers': 'G2E1',
  'G2 Inventors': 'G2E1',
  'G2 Achievers': 'G2E1',
  'G2 Voyagers': 'G2E1',
  'G2 Adventurers': 'G2E2',
  'G2 Innovators': 'G2E2',
  'G2 Guardians': 'G2E2',
  'G2 Pathfinders': 'G2E2',
  'G2 Visionaries': 'G2E2',
  'G2 Navigators': 'G2E3',
  'G2 Discoverers': 'G2E3',
  'G2 Seekers': 'G2E3',
  'G2 Trailblazers': 'G2E3',
  
  // G3 Classes
  'G3 Inventors': 'G3E1',
  'G3 Innovators': 'G3E1',
  'G3 Guardians': 'G3E1',
  'G3 Achievers': 'G3E1',
  'G3 Voyagers': 'G3E2',
  'G3 Visionaries': 'G3E2',
  'G3 Trailblazers': 'G3E2',
  'G3 Discoverers': 'G3E2',
  'G3 Explorers': 'G3E2',
  'G3 Navigators': 'G3E2',
  'G3 Adventurers': 'G3E2',
  'G3 Seekers': 'G3E3',
  'G3 Pathfinders': 'G3E3',
  'G3 Pioneers': 'G3E3',
  
  // G4 Classes
  'G4 Seekers': 'G4E1',
  'G4 Voyagers': 'G4E1',
  'G4 Visionaries': 'G4E1',
  'G4 Achievers': 'G4E1',
  'G4 Navigators': 'G4E2',
  'G4 Trailblazers': 'G4E2',
  'G4 Pathfinders': 'G4E2',
  'G4 Explorers': 'G4E2',
  'G4 Adventurers': 'G4E2',
  'G4 Innovators': 'G4E2',
  'G4 Discoverers': 'G4E2',
  'G4 Guardians': 'G4E3',
  'G4 Inventors': 'G4E3',
  'G4 Pioneers': 'G4E3',
  
  // G5 Classes
  'G5 Adventurers': 'G5E1',
  'G5 Navigators': 'G5E1',
  'G5 Pioneers': 'G5E1',
  'G5 Inventors': 'G5E2',
  'G5 Seekers': 'G5E2',
  'G5 Discoverers': 'G5E2',
  'G5 Guardians': 'G5E2',
  'G5 Pathfinders': 'G5E2',
  'G5 Explorers': 'G5E2',
  'G5 Achievers': 'G5E2',
  'G5 Voyagers': 'G5E3',
  'G5 Trailblazers': 'G5E3',
  'G5 Innovators': 'G5E3',
  'G5 Visionaries': 'G5E3',
  
  // G6 Classes
  'G6 Explorers': 'G6E1',
  'G6 Inventors': 'G6E1',
  'G6 Adventurers': 'G6E1',
  'G6 Achievers': 'G6E1',
  'G6 Voyagers': 'G6E2',
  'G6 Discoverers': 'G6E2',
  'G6 Innovators': 'G6E2',
  'G6 Guardians': 'G6E2',
  'G6 Pathfinders': 'G6E2',
  'G6 Seekers': 'G6E2',
  'G6 Visionaries': 'G6E2',
  'G6 Pioneers': 'G6E3',
  'G6 Trailblazers': 'G6E3',
  'G6 Navigators': 'G6E3'
};

/**
 * Get all actual class names that belong to a specific level group
 * 获取属于特定级别组的所有实际班级名称
 */
function getClassesByLevelGroup(levelGroup) {
  const classes = [];
  for (const [className, mappedLevel] of Object.entries(CLASS_TO_LEVEL_MAPPING)) {
    if (mappedLevel === levelGroup) {
      classes.push(className);
    }
  }
  return classes;
}

function findAllTeachersForClassAndSubject(className, subjectType) {
  try {
    const masterData = getMasterDataSheet();
    const studentsSheet = masterData.getSheetByName('Students');
    
    if (!studentsSheet) {
      throw new Error('Students sheet not found in Master Data | Master Data中找不到Students工作表');
    }
    
    // Check if className is a level group (like G1E1) and get actual class names
    let targetClasses = [className];
    const levelGroupClasses = getClassesByLevelGroup(className);
    if (levelGroupClasses.length > 0) {
      targetClasses = levelGroupClasses;
      console.log(`🔍 DEBUG: Level group "${className}" detected. Searching for classes:`, targetClasses);
    } else {
      console.log(`🔍 DEBUG: Direct class search for: "${className}"`);
    }
    
    // Get all student data
    const data = studentsSheet.getDataRange().getValues();
    const headers = data[0];
    
    // DEBUG: Log all headers to see what we actually have
    console.log('🔍 DEBUG: All headers found:', headers);
    console.log('🔍 DEBUG: Looking for these exact headers:', [
      'English Class | 英文班級',
      'LT Teacher | LT老師', 
      'IT Teacher | IT老師'
    ]);
    
    // Find column indices - match complete bilingual headers
    const classColumnIndex = headers.indexOf('English Class | 英文班級');
    const ltTeacherIndex = headers.indexOf('LT Teacher | LT老師');
    const itTeacherIndex = headers.indexOf('IT Teacher | IT老師');
    
    // DEBUG: Log column indices
    console.log('🔍 DEBUG: Column indices found:');
    console.log('  - English Class index:', classColumnIndex);
    console.log('  - LT Teacher index:', ltTeacherIndex); 
    console.log('  - IT Teacher index:', itTeacherIndex);
    
    if (classColumnIndex === -1 || ltTeacherIndex === -1 || itTeacherIndex === -1) {
      console.error('❌ DEBUG: Missing columns. Available headers:', headers.map((h, i) => `${i}: "${h}"`));
      throw new Error('Required columns not found in Students sheet | Students工作表中找不到必要欄位');
    }
    
    // Find all unique teachers for target classes and subject
    const teachers = new Set();
    let debugStudentCount = 0;
    let matchingStudents = [];
    
    console.log(`🔍 DEBUG: Searching for target classes:`, targetClasses);
    console.log(`🔍 DEBUG: Subject type: "${subjectType}"`);
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const studentClass = row[classColumnIndex];
      const teacher = (subjectType === 'LT') ? row[ltTeacherIndex] : row[itTeacherIndex];
      
      debugStudentCount++;
      
      // DEBUG: Log first few students to see data format
      if (i <= 3) {
        console.log(`🔍 DEBUG: Student ${i}:`);
        console.log(`  - Class: "${studentClass}" (type: ${typeof studentClass})`);
        console.log(`  - Teacher: "${teacher}" (type: ${typeof teacher})`);
        console.log(`  - Class match with any target: ${targetClasses.includes(studentClass)}`);
      }
      
      // Check if student's class matches any of our target classes
      if (targetClasses.includes(studentClass) && teacher && teacher.trim() !== '') {
        teachers.add(teacher.trim());
        matchingStudents.push({
          student: row[1] || 'Unknown', // Assuming name is in column 1
          class: studentClass,
          teacher: teacher
        });
      }
    }
    
    const teacherList = Array.from(teachers);
    
    // DEBUG: Comprehensive logging
    console.log(`🔍 DEBUG: Search results:`);
    console.log(`  - Total students processed: ${debugStudentCount}`);
    console.log(`  - Students matching target classes: ${matchingStudents.length}`);
    console.log(`  - Matching students:`, matchingStudents.map(s => `${s.student} (${s.class} - ${s.teacher})`));
    console.log(`  - Unique teachers found: ${teacherList.length}`);
    console.log(`  - Teacher list: ${teacherList.join(', ')}`);
    
    return teacherList;
    
  } catch (error) {
    console.error('Error finding teachers:', error);
    throw error;
  }
}

/**
 * Update assessment title for a specific class across all relevant teacher gradebooks
 * 更新特定班級在所有相關老師成績簿中的評量標題
 */
function updateSingleClassAssessment(className, subjectType, assessmentCode, newTitle) {
  try {
    console.log(`🔄 Starting assessment update for ${className} ${subjectType} ${assessmentCode} -> "${newTitle}"`);
    
    // Find all teachers for this class and subject
    const teachers = findAllTeachersForClassAndSubject(className, subjectType);
    
    if (teachers.length === 0) {
      return {
        success: false,
        error: `No teachers found for ${className} ${subjectType} | 找不到 ${className} ${subjectType} 的老師`
      };
    }
    
    console.log(`📊 Found ${teachers.length} teachers:`, teachers);
    
    // Get actual class names for level groups
    let targetClassNames = [className];
    const levelGroupClasses = getClassesByLevelGroup(className);
    if (levelGroupClasses.length > 0) {
      targetClassNames = levelGroupClasses;
      console.log(`🔍 Level group detected. Target classes:`, targetClassNames);
    }
    
    let successCount = 0;
    const errors = [];
    const updatedTeachers = [];
    const updateDetails = [];
    
    // Update each teacher's gradebook
    teachers.forEach(teacher => {
      console.log(`👨‍🏫 Processing teacher: ${teacher}`);
      try {
        // Find teacher's gradebook
        const gradebook = findTeacherGradebookByName(teacher, subjectType);
        if (!gradebook) {
          const error = `${teacher}: Gradebook not found | 找不到成績簿`;
          errors.push(error);
          console.warn(error);
          return;
        }
        
        console.log(`✅ Found gradebook for ${teacher}: ${gradebook.getName()}`);
        
        // Update assessment titles in all relevant class sheets for this teacher
        targetClassNames.forEach(actualClassName => {
          try {
            // Try different sheet naming patterns
            const possibleSheetNames = [
              `📚 ${actualClassName}`,        // Most likely format based on diagnosis
              actualClassName,                // Fallback to original format
              `📚${actualClassName}`,         // Without space
              actualClassName.replace(/\s+/g, ''),  // Remove all spaces
              `Class ${actualClassName}`,     // Another possible format
            ];
            
            let sheet = null;
            let foundSheetName = null;
            
            // Try each possible name
            for (const sheetName of possibleSheetNames) {
              try {
                sheet = gradebook.getSheetByName(sheetName);
                if (sheet) {
                  foundSheetName = sheetName;
                  break;
                }
              } catch (e) {
                // Continue to next possibility
              }
            }
            
            if (!sheet) {
              // Get actual sheet names for debugging
              const actualSheets = gradebook.getSheets().map(s => s.getName());
              console.warn(`⚠️ ${teacher}: No matching sheet found for ${actualClassName}`);
              console.warn(`   Available sheets: ${actualSheets.join(', ')}`);
              console.warn(`   Tried names: ${possibleSheetNames.join(', ')}`);
              return; // Skip this class, don't count as error since teacher might not teach this class
            }
            
            console.log(`✅ Found sheet for ${teacher}: "${foundSheetName}"`);
            
            // Update the specific assessment column
            const columnIndex = getAssessmentColumnIndex(assessmentCode);
            if (!columnIndex) {
              const error = `${teacher}: Invalid assessment code ${assessmentCode} | 無效的評量代碼`;
              errors.push(error);
              console.error(error);
              return;
            }
            
            // Update the assessment title
            sheet.getRange(2, columnIndex).setValue(newTitle);
            console.log(`✅ Updated ${teacher} - "${foundSheetName}" - ${assessmentCode} -> "${newTitle}"`);
            updateDetails.push(`${teacher} (${foundSheetName})`);
            
          } catch (classError) {
            console.error(`❌ Error updating ${teacher} - ${actualClassName}:`, classError);
          }
        });
        
        successCount++;
        updatedTeachers.push(teacher);
        
      } catch (error) {
        const errorMsg = `${teacher}: ${error.message}`;
        errors.push(errorMsg);
        console.error(errorMsg);
      }
    });
    
    const result = {
      success: successCount > 0,
      message: `Successfully updated ${successCount} teacher(s) | 成功更新 ${successCount} 位老師`,
      details: `Updated sheets: ${updateDetails.join(', ')} | 已更新工作表: ${updateDetails.join(', ')}`,
      errors: errors.length > 0 ? errors : null,
      totalTeachers: teachers.length,
      successCount: successCount,
      targetClasses: targetClassNames,
      updateSummary: {
        levelGroup: className,
        actualClasses: targetClassNames,
        teachers: teachers,
        successfulUpdates: updateDetails.length,
        errors: errors.length
      }
    };
    
    console.log(`📊 Update complete:`, result);
    return result;
    
  } catch (error) {
    console.error('❌ Error updating single class assessment:', error);
    return {
      success: false,
      error: `System error | 系統錯誤: ${error.message || 'Unknown error'}`
    };
  }
}

/**
 * Find teacher's gradebook by name and subject type
 * 根據老師姓名和科目類型查找老師的成績簿
 */
function findTeacherGradebookByName(teacherName, subjectType) {
  try {
    console.log(`🔍 Searching for gradebook: ${teacherName} ${subjectType}`);
    
    const config = getSystemConfig();
    const systemFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
    const teacherFolder = getSubFolder(systemFolder, config.FOLDERS.TEACHER_SHEETS, false);
    
    if (!teacherFolder) {
      throw new Error('Teacher gradebooks folder not found | 找不到老師成績簿資料夾');
    }
    
    console.log(`📁 Searching in folder: ${teacherFolder.getName()}`);
    
    // Search for gradebook files containing the teacher's name and subject type
    const files = teacherFolder.getFiles();
    const allFiles = [];
    const matchingFiles = [];
    
    while (files.hasNext()) {
      const file = files.next();
      const fileName = file.getName();
      allFiles.push(fileName);
      
      // Multiple matching patterns for flexibility
      const patterns = [
        // Exact match with subject type
        `${teacherName} ${subjectType} Gradebook`,
        `${teacherName} - ${subjectType} Gradebook`,
        `${teacherName}_${subjectType}_Gradebook`,
        // More flexible patterns
        `${teacherName}.*${subjectType}.*Gradebook`,
        // Just teacher name and gradebook (if subject type is in file content)
        `${teacherName}.*Gradebook`
      ];
      
      // Check different matching criteria
      const nameMatch = fileName.includes(teacherName);
      const subjectMatch = fileName.includes(subjectType);
      const gradebookMatch = fileName.includes('Gradebook') || fileName.includes('gradebook');
      
      if (nameMatch && subjectMatch && gradebookMatch) {
        matchingFiles.push({file, fileName, match: 'exact'});
      } else if (nameMatch && gradebookMatch) {
        matchingFiles.push({file, fileName, match: 'partial'});
      }
    }
    
    console.log(`📋 Found ${allFiles.length} total files in teacher folder`);
    console.log(`🎯 Found ${matchingFiles.length} potential matching files:`, matchingFiles.map(f => f.fileName));
    
    // Prefer exact matches first
    const exactMatch = matchingFiles.find(f => f.match === 'exact');
    if (exactMatch) {
      console.log(`✅ Found exact match for ${teacherName} ${subjectType}: ${exactMatch.fileName}`);
      return SpreadsheetApp.openById(exactMatch.file.getId());
    }
    
    // Fall back to partial matches
    const partialMatch = matchingFiles.find(f => f.match === 'partial');
    if (partialMatch) {
      console.log(`⚠️ Using partial match for ${teacherName} ${subjectType}: ${partialMatch.fileName}`);
      return SpreadsheetApp.openById(partialMatch.file.getId());
    }
    
    // Enhanced error message with available files
    console.warn(`❌ Gradebook not found for ${teacherName} ${subjectType}`);
    console.warn(`📁 Available files in teacher folder (first 10):`, allFiles.slice(0, 10));
    
    // Look for files with similar teacher names
    const similarFiles = allFiles.filter(name => {
      const nameWords = teacherName.split(' ');
      return nameWords.some(word => name.includes(word)) && name.includes('Gradebook');
    });
    
    if (similarFiles.length > 0) {
      console.warn(`🔍 Files with similar names found:`, similarFiles);
    }
    
    return null;
    
  } catch (error) {
    console.error('❌ Error finding teacher gradebook:', error);
    throw error;
  }
}

/**
 * Get column index for assessment code
 * 取得評量代碼對應的欄位索引
 */
function getAssessmentColumnIndex(assessmentCode) {
  const mapping = {
    'F.A.1': 8,  'F.A.2': 9,   'F.A.3': 10,  'F.A.4': 11,
    'F.A.5': 12, 'F.A.6': 13,  'F.A.7': 14,  'F.A.8': 15,
    'S.A.1': 16, 'S.A.2': 17,  'S.A.3': 18,  'S.A.4': 19,
    'Midterm': 20
  };
  
  return mapping[assessmentCode] || null;
}

/**
 * Debug function to check basic data access and format
 * 調試函數：檢查基本數據訪問和格式
 */
function debugBasicData() {
  try {
    console.log('🔍 開始基本數據調試...');
    
    // 1. 測試 Master Data 訪問
    const masterData = getMasterDataSheet();
    console.log('✅ Master Data 檔案:', masterData.getName());
    
    // 2. 測試 Students 工作表訪問  
    const studentsSheet = masterData.getSheetByName('Students');
    console.log('✅ Students 工作表:', studentsSheet ? '找到' : '找不到');
    
    if (!studentsSheet) {
      console.error('❌ Students 工作表不存在');
      return '❌ Students 工作表不存在';
    }
    
    // 3. 獲取並顯示數據
    const data = studentsSheet.getDataRange().getValues();
    console.log('📊 總數據行數:', data.length);
    
    if (data.length === 0) {
      console.error('❌ Students 工作表沒有數據');
      return '❌ Students 工作表沒有數據';
    }
    
    // 4. 顯示欄位標題
    const headers = data[0];
    console.log('📋 欄位標題 (' + headers.length + ' 個):');
    headers.forEach((header, index) => {
      console.log(`  ${index}: "${header}"`);
    });
    
    // 5. 顯示前3行學生數據  
    console.log('👥 前3行學生數據:');
    for (let i = 1; i <= Math.min(3, data.length - 1); i++) {
      console.log(`  學生 ${i}:`, data[i]);
    }
    
    // 6. 檢查特定欄位索引
    console.log('🔍 關鍵欄位索引檢查:');
    const targetHeaders = [
      'English Class | 英文班級',
      'LT Teacher | LT老師', 
      'IT Teacher | IT老師',
      'English Class',  // 試試簡化版本
      'LT Teacher',
      'IT Teacher'
    ];
    
    targetHeaders.forEach(targetHeader => {
      const index = headers.indexOf(targetHeader);
      console.log(`  "${targetHeader}": ${index}`);
    });
    
    // 7. 搜尋G1E1相關數據
    console.log('🔍 搜尋G1E1相關數據:');
    const classColIndex = headers.indexOf('English Class | 英文班級');
    if (classColIndex !== -1) {
      let g1e1Count = 0;
      for (let i = 1; i < data.length; i++) {
        if (data[i][classColIndex] === 'G1E1') {
          g1e1Count++;
          if (g1e1Count <= 2) {  // 只顯示前2個
            console.log(`  G1E1 學生 ${g1e1Count}:`, data[i]);
          }
        }
      }
      console.log(`  總G1E1學生數: ${g1e1Count}`);
    } else {
      console.log('  找不到 English Class | 英文班級 欄位');
    }
    
    return '✅ 調試完成，請查看執行記錄';
    
  } catch (error) {
    console.error('❌ 調試失敗:', error);
    return `❌ 錯誤: ${error.message}`;
  }
}

/**
 * Test the level group functionality specifically for G1E1
 * 测试G1E1级别组功能
 */
function testG1E1LevelGroup() {
  try {
    console.log('🧪 Testing G1E1 level group functionality...');
    
    // Test the helper function first
    const g1e1Classes = getClassesByLevelGroup('G1E1');
    console.log('✅ G1E1 classes from mapping:', g1e1Classes);
    
    // Test finding teachers for G1E1 LT
    console.log('🔍 Testing findAllTeachersForClassAndSubject for G1E1 LT...');
    const ltTeachers = findAllTeachersForClassAndSubject('G1E1', 'LT');
    
    console.log('📊 LT Teachers found:', ltTeachers);
    
    // Test finding teachers for G1E1 IT
    console.log('🔍 Testing findAllTeachersForClassAndSubject for G1E1 IT...');
    const itTeachers = findAllTeachersForClassAndSubject('G1E1', 'IT');
    
    console.log('📊 IT Teachers found:', itTeachers);
    
    const message = `✅ Level group test complete! Found ${ltTeachers.length} LT teachers and ${itTeachers.length} IT teachers for G1E1 level group (${g1e1Classes.length} classes: ${g1e1Classes.join(', ')})`;
    console.log(message);
    
    return message;
    
  } catch (error) {
    console.error('❌ G1E1 test failed:', error);
    return `❌ 錯誤: ${error.message}`;
  }
}

/**
 * Test the complete Assessment Title Manager workflow
 * 測試完整的評量標題管理工作流程
 */
function testAssessmentTitleUpdate() {
  try {
    console.log('🧪 Testing complete Assessment Title Manager workflow...');
    
    const testClassName = 'G1E1';
    const testSubjectType = 'LT';
    const testAssessmentCode = 'F.A.1';
    const testNewTitle = 'Test Quiz - Unit 1';
    
    console.log(`📋 Test parameters:`);
    console.log(`  - Class: ${testClassName}`);
    console.log(`  - Subject: ${testSubjectType}`);
    console.log(`  - Assessment: ${testAssessmentCode}`);
    console.log(`  - New Title: "${testNewTitle}"`);
    
    // Run the actual update function
    const result = updateSingleClassAssessment(testClassName, testSubjectType, testAssessmentCode, testNewTitle);
    
    console.log('📊 Update result:', result);
    
    if (result.success) {
      return `✅ Assessment Title Manager test PASSED! 
      
Successfully updated ${result.successCount}/${result.totalTeachers} teachers:
- Level Group: ${result.updateSummary.levelGroup}
- Target Classes: ${result.updateSummary.actualClasses.join(', ')}
- Updated Sheets: ${result.updateSummary.successfulUpdates}
- Teachers: ${result.updateSummary.teachers.join(', ')}

${result.details}`;
    } else {
      return `❌ Assessment Title Manager test FAILED: ${result.error}
      
Error details: ${result.errors ? result.errors.join(', ') : 'No specific errors'}`;
    }
    
  } catch (error) {
    console.error('❌ Assessment Title Manager test failed:', error);
    return `❌ Test Error: ${error.message}`;
  }
}

/**
 * Diagnose actual sheet names in teacher gradebooks
 * 診斷老師成績簿中的實際工作表名稱
 */
function diagnoseGradebookSheetNames() {
  try {
    console.log('🔍 Diagnosing actual sheet names in teacher gradebooks...');
    
    const teachers = ['Ms. Wendy', 'Ms. Liza', 'Ms. Kassie'];
    const subjectType = 'LT';
    
    const results = [];
    
    teachers.forEach(teacher => {
      try {
        console.log(`👨‍🏫 Checking ${teacher} gradebook...`);
        
        const gradebook = findTeacherGradebookByName(teacher, subjectType);
        if (!gradebook) {
          results.push(`❌ ${teacher}: Gradebook not found`);
          return;
        }
        
        console.log(`✅ Found gradebook: ${gradebook.getName()}`);
        
        // Get all sheet names
        const sheets = gradebook.getSheets();
        const sheetNames = sheets.map(sheet => sheet.getName());
        
        console.log(`📋 ${teacher} sheet names (${sheetNames.length} total):`, sheetNames);
        
        // Look for G1-related sheets
        const g1Sheets = sheetNames.filter(name => name.includes('G1'));
        console.log(`🎯 ${teacher} G1-related sheets:`, g1Sheets);
        
        results.push({
          teacher: teacher,
          gradebook: gradebook.getName(),
          totalSheets: sheetNames.length,
          allSheets: sheetNames,
          g1Sheets: g1Sheets
        });
        
      } catch (error) {
        console.error(`❌ Error checking ${teacher}:`, error);
        results.push(`❌ ${teacher}: ${error.message}`);
      }
    });
    
    console.log('📊 Complete diagnosis results:', results);
    
    // Generate summary report
    let report = `🔍 GRADEBOOK SHEET NAME DIAGNOSIS REPORT\n\n`;
    
    results.forEach(result => {
      if (typeof result === 'string') {
        report += `${result}\n\n`;
      } else {
        report += `👨‍🏫 ${result.teacher} (${result.gradebook}):\n`;
        report += `  📊 Total sheets: ${result.totalSheets}\n`;
        report += `  🎯 G1-related sheets: ${result.g1Sheets.length > 0 ? result.g1Sheets.join(', ') : 'None found'}\n`;
        report += `  📋 All sheets: ${result.allSheets.join(', ')}\n\n`;
      }
    });
    
    report += `\n💡 ANALYSIS:\n`;
    const allG1Sheets = results.flatMap(r => r.g1Sheets || []);
    if (allG1Sheets.length > 0) {
      report += `✅ Found ${allG1Sheets.length} G1-related sheets across all teachers\n`;
      report += `🔍 Unique G1 sheet patterns: ${[...new Set(allG1Sheets)].join(', ')}\n`;
    } else {
      report += `❌ No G1-related sheets found - this explains why updates failed!\n`;
      report += `🤔 Sheet names may use different naming convention\n`;
    }
    
    console.log(report);
    return report;
    
  } catch (error) {
    console.error('❌ Diagnosis failed:', error);
    return `❌ Diagnosis Error: ${error.message}`;
  }
}

// ===== PROGRESS AUDIT SYSTEM | 進度稽核系統 =====

/**
 * Main function for performing progress audit
 * 執行進度稽核的主要函數
 * @param {Object} checkpointConfig - Configuration for the checkpoint
 */
function performProgressAudit(checkpointConfig) {
  try {
    console.log('🚀 Starting progress audit:', checkpointConfig.name);
    
    // Initialize progress tracker
    const progressTracker = new ProgressTracker(1, '進度稽核');
    progressTracker.update(0, '正在初始化稽核系統...');
    
    // Validate checkpoint configuration
    if (!checkpointConfig || !checkpointConfig.name || !checkpointConfig.requirements) {
      throw new Error('Invalid checkpoint configuration | 無效的檢查點配置');
    }
    
    // Get all teachers and their gradebooks
    const teacherResults = [];
    const levelGroupBreakdown = {};
    let totalTeachers = 0;
    let totalCompletionSum = 0;
    
    // Get master data for teacher-class mappings
    console.log('🔍 Step 1: Getting Master Data Sheet...');
    const masterDataSheet = getMasterDataSheet();
    console.log(`✅ Master Data Sheet found: ${masterDataSheet.getName()}`);
    
    console.log('🔍 Step 2: Extracting teacher-class mappings...');
    const teacherClassMap = getTeacherClassMapping(masterDataSheet);
    
    console.log(`📊 Found ${Object.keys(teacherClassMap).length} teachers to analyze`);
    console.log('📋 Teacher list:', Object.keys(teacherClassMap));
    
    // Detailed teacher data logging
    Object.entries(teacherClassMap).forEach(([name, data]) => {
      console.log(`👤 ${name} (${data.type}): Classes [${data.classes.join(', ')}]`);
    });
    
    // Analyze each teacher
    for (const [teacherName, teacherData] of Object.entries(teacherClassMap)) {
      try {
        const teacherAnalysis = analyzeTeacherProgress(teacherName, teacherData, checkpointConfig);
        if (teacherAnalysis) {
          teacherResults.push(teacherAnalysis);
          totalTeachers++;
          totalCompletionSum += teacherAnalysis.overallCompletion;
          
          // Update level group breakdown
          teacherAnalysis.levelGroups.forEach(levelGroup => {
            if (!levelGroupBreakdown[levelGroup]) {
              levelGroupBreakdown[levelGroup] = {
                completion: 0,
                teacherCount: 0,
                completionSum: 0
              };
            }
            levelGroupBreakdown[levelGroup].teacherCount++;
            levelGroupBreakdown[levelGroup].completionSum += teacherAnalysis.overallCompletion;
            levelGroupBreakdown[levelGroup].completion = Math.round(
              levelGroupBreakdown[levelGroup].completionSum / levelGroupBreakdown[levelGroup].teacherCount
            );
          });
        }
      } catch (teacherError) {
        console.error(`❌ Error analyzing teacher ${teacherName}:`, teacherError);
        // Continue with other teachers
      }
    }
    
    // Calculate overall completion
    const overallCompletion = totalTeachers > 0 ? Math.round(totalCompletionSum / totalTeachers) : 0;
    
    console.log(`✅ Progress audit completed: ${totalTeachers} teachers analyzed`);
    
    progressTracker.addSuccess('進度稽核', '稽核已完成');
    progressTracker.complete();
    
    return {
      success: true,
      checkpointName: checkpointConfig.name,
      timestamp: checkpointConfig.timestamp,
      teacherCount: totalTeachers,
      overallCompletion: overallCompletion,
      teacherResults: teacherResults.sort((a, b) => b.overallCompletion - a.overallCompletion),
      levelGroupBreakdown: levelGroupBreakdown,
      message: `Progress audit completed successfully. Analyzed ${totalTeachers} teachers with ${overallCompletion}% overall completion.`
    };
    
  } catch (error) {
    console.error('❌ Progress audit failed:', error);
    return {
      success: false,
      message: `Progress audit failed: ${error.message}`,
      error: error.message
    };
  }
}

/**
 * Analyze individual teacher progress
 * 分析個別教師進度
 */
function analyzeTeacherProgress(teacherName, teacherData, checkpointConfig) {
  try {
    console.log(`🔍 Analyzing teacher: ${teacherName}, Type: ${teacherData.type}, Classes: ${teacherData.classes.join(', ')}`);
    
    // Find teacher gradebook
    const gradebook = findTeacherGradebookByName(teacherName, teacherData.type);
    if (!gradebook) {
      console.log(`⚠️ No gradebook found for teacher: ${teacherName} (${teacherData.type})`);
      return null;
    }
    
    // Determine which level groups this teacher teaches
    const teacherLevelGroups = getTeacherLevelGroups(teacherData.classes);
    
    // Calculate progress for each relevant level group
    let formativeTotal = 0;
    let formativeCompleted = 0;
    let summativeTotal = 0;
    let summativeCompleted = 0;
    
    teacherLevelGroups.forEach(levelGroup => {
      if (checkpointConfig.requirements[levelGroup]) {
        const requirements = checkpointConfig.requirements[levelGroup];
        
        // Check formative assessments
        if (requirements.formative.length > 0) {
          formativeTotal += requirements.formative.length;
          formativeCompleted += checkAssessmentCompletion(gradebook, levelGroup, requirements.formative, 'formative');
        }
        
        // Check summative assessments
        if (requirements.summative.length > 0) {
          summativeTotal += requirements.summative.length;
          summativeCompleted += checkAssessmentCompletion(gradebook, levelGroup, requirements.summative, 'summative');
        }
      }
    });
    
    // Calculate completion percentages
    const formativeCompletion = formativeTotal > 0 ? Math.round((formativeCompleted / formativeTotal) * 100) : 0;
    const summativeCompletion = summativeTotal > 0 ? Math.round((summativeCompleted / summativeTotal) * 100) : 0;
    const overallCompletion = Math.round(((formativeCompleted + summativeCompleted) / (formativeTotal + summativeTotal)) * 100);
    
    return {
      name: teacherName,
      levelGroups: teacherLevelGroups,
      formativeCompletion: formativeCompletion,
      summativeCompletion: summativeCompletion,
      overallCompletion: isNaN(overallCompletion) ? 0 : overallCompletion,
      gradebookId: gradebook.getId(),
      gradebookUrl: gradebook.getUrl()
    };
    
  } catch (error) {
    console.error(`❌ Error analyzing teacher ${teacherName}:`, error);
    return null;
  }
}

/**
 * Get teacher-class mapping from master data
 * 從主控資料取得教師-班級映射
 */
function getTeacherClassMapping(masterDataSheet) {
  try {
    console.log('🔍 Getting Students sheet from Master Data...');
    const studentsSheet = masterDataSheet.getSheetByName('Students');
    if (!studentsSheet) {
      throw new Error('Students sheet not found in master data');
    }
    
    const data = studentsSheet.getDataRange().getValues();
    const headers = data[0];
    console.log('📋 Headers found:', headers);
    console.log(`📊 Data rows found: ${data.length - 1} (excluding header)`);
    
    // Find teacher columns
    const ltTeacherCol = headers.findIndex(h => h.toString().includes('LT Teacher'));
    const itTeacherCol = headers.findIndex(h => h.toString().includes('IT Teacher'));
    const classCol = headers.findIndex(h => h.toString().includes('Class'));
    
    console.log(`📍 Column indexes - LT Teacher: ${ltTeacherCol}, IT Teacher: ${itTeacherCol}, Class: ${classCol}`);
    
    if (ltTeacherCol === -1 || itTeacherCol === -1 || classCol === -1) {
      throw new Error('Required columns not found in Students sheet');
    }
    
    const teacherClassMap = {};
    
    // Process data rows (skip header)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const className = row[classCol];
      const ltTeacher = row[ltTeacherCol];
      const itTeacher = row[itTeacherCol];
      
      if (className) {
        // Add LT Teacher
        if (ltTeacher) {
          if (!teacherClassMap[ltTeacher]) {
            teacherClassMap[ltTeacher] = { classes: [], type: 'LT' };
          }
          if (!teacherClassMap[ltTeacher].classes.includes(className)) {
            teacherClassMap[ltTeacher].classes.push(className);
          }
        }
        
        // Add IT Teacher
        if (itTeacher) {
          if (!teacherClassMap[itTeacher]) {
            teacherClassMap[itTeacher] = { classes: [], type: 'IT' };
          }
          if (!teacherClassMap[itTeacher].classes.includes(className)) {
            teacherClassMap[itTeacher].classes.push(className);
          }
        }
      }
    }
    
    console.log(`📊 Teacher mapping completed. Found ${Object.keys(teacherClassMap).length} teachers:`);
    Object.entries(teacherClassMap).forEach(([name, data]) => {
      console.log(`  - ${name} (${data.type}): ${data.classes.length} classes`);
    });
    
    return teacherClassMap;
    
  } catch (error) {
    console.error('❌ Error getting teacher-class mapping:', error);
    throw error;
  }
}

/**
 * Comprehensive diagnosis of Progress Audit system
 * Progress Audit 系統全面診斷
 */
function diagnoseProgressAuditSystem() {
  try {
    console.log('🔍 Starting comprehensive Progress Audit system diagnosis...');
    const report = {
      timestamp: new Date().toISOString(),
      masterData: {},
      teachers: {},
      gradebooks: {},
      classMapping: {},
      issues: []
    };
    
    // 1. Check Master Data accessibility
    console.log('📊 Step 1: Checking Master Data accessibility...');
    try {
      const masterDataSheet = getMasterDataSheet();
      report.masterData.found = true;
      report.masterData.name = masterDataSheet.getName();
      
      const studentsSheet = masterDataSheet.getSheetByName('Students');
      if (!studentsSheet) {
        report.issues.push('Students sheet not found in Master Data');
        report.masterData.studentsSheet = false;
      } else {
        report.masterData.studentsSheet = true;
        const data = studentsSheet.getDataRange().getValues();
        report.masterData.totalRows = data.length;
        report.masterData.headers = data[0];
      }
    } catch (error) {
      report.masterData.found = false;
      report.masterData.error = error.message;
      report.issues.push('Master Data access failed: ' + error.message);
    }
    
    // 2. Check teacher extraction
    console.log('👥 Step 2: Checking teacher extraction...');
    try {
      const masterDataSheet = getMasterDataSheet();
      const teacherClassMap = getTeacherClassMapping(masterDataSheet);
      report.teachers.count = Object.keys(teacherClassMap).length;
      report.teachers.list = Object.keys(teacherClassMap);
      report.teachers.details = teacherClassMap;
    } catch (error) {
      report.teachers.error = error.message;
      report.issues.push('Teacher extraction failed: ' + error.message);
    }
    
    // 3. Check gradebook files accessibility
    console.log('📚 Step 3: Checking gradebook files...');
    try {
      const config = getSystemConfig();
    const systemFolder = DriveApp.getFolderById(config.MAIN_FOLDER_ID);
      const teacherFolder = getSubFolder(systemFolder, config.FOLDERS.TEACHER_SHEETS, false);
      
      if (teacherFolder) {
        const files = teacherFolder.getFiles();
        const gradebookFiles = [];
        while (files.hasNext()) {
          const file = files.next();
          gradebookFiles.push(file.getName());
        }
        report.gradebooks.folderFound = true;
        report.gradebooks.fileCount = gradebookFiles.length;
        report.gradebooks.files = gradebookFiles;
      } else {
        report.gradebooks.folderFound = false;
        report.issues.push('Teacher gradebooks folder not found');
      }
    } catch (error) {
      report.gradebooks.error = error.message;
      report.issues.push('Gradebook access failed: ' + error.message);
    }
    
    // 4. Check class-level mapping
    console.log('🔗 Step 4: Checking class-level mapping...');
    report.classMapping.totalMappings = Object.keys(CLASS_TO_LEVEL_MAPPING).length;
    report.classMapping.levelGroups = [...new Set(Object.values(CLASS_TO_LEVEL_MAPPING))];
    
    console.log('✅ Diagnosis completed');
    console.log('📋 Diagnosis Report:', JSON.stringify(report, null, 2));
    
    return report;
    
  } catch (error) {
    console.error('❌ Diagnosis failed:', error);
    return { error: error.message, timestamp: new Date().toISOString() };
  }
}

/**
 * Get level groups that a teacher teaches based on their classes
 * 根據教師的班級取得所教的分級組
 */
function getTeacherLevelGroups(classes) {
  const levelGroups = new Set();
  
  classes.forEach(className => {
    // Use existing CLASS_TO_LEVEL_MAPPING
    Object.entries(CLASS_TO_LEVEL_MAPPING).forEach(([levelGroup, mappedClasses]) => {
      if (mappedClasses.includes(className)) {
        levelGroups.add(levelGroup);
      }
    });
  });
  
  return Array.from(levelGroups);
}

/**
 * Check assessment completion for specific requirements
 * 檢查特定要求的評量完成情況
 */
function checkAssessmentCompletion(gradebook, levelGroup, requiredAssessments, assessmentType) {
  try {
    let completedCount = 0;
    
    // Get classes for this level group
    const classes = CLASS_TO_LEVEL_MAPPING[levelGroup] || [];
    
    classes.forEach(className => {
      // Find the sheet for this class (with possible emoji prefix)
      const sheet = findSheetByClassName(gradebook, className);
      if (!sheet) {
        console.log(`⚠️ Sheet not found for class: ${className}`);
        return;
      }
      
      // Get header row to find assessment columns
      const headers = sheet.getRange(1, 1, 2, sheet.getLastColumn()).getValues();
      const row1Headers = headers[0];
      const row2Headers = headers[1];
      
      // Check each required assessment
      requiredAssessments.forEach(assessmentCode => {
        const columnIndex = findAssessmentColumn(row1Headers, row2Headers, assessmentCode, assessmentType);
        if (columnIndex !== -1) {
          // Check if there's any data in this column (excluding headers)
          const columnData = sheet.getRange(3, columnIndex + 1, sheet.getLastRow() - 2, 1).getValues();
          const hasData = columnData.some(cell => cell[0] !== '' && cell[0] !== null && cell[0] !== undefined);
          if (hasData) {
            completedCount++;
          }
        }
      });
    });
    
    return completedCount;
    
  } catch (error) {
    console.error(`❌ Error checking assessment completion for ${levelGroup}:`, error);
    return 0;
  }
}

/**
 * Find assessment column by code and type
 * 根據代碼和類型尋找評量欄位
 */
function findAssessmentColumn(row1Headers, row2Headers, assessmentCode, assessmentType) {
  for (let i = 0; i < row1Headers.length; i++) {
    const header1 = row1Headers[i].toString();
    const header2 = row2Headers[i].toString();
    
    // Check if this matches the assessment code
    if (header2.includes(assessmentCode)) {
      return i;
    }
    
    // Alternative matching logic for different naming patterns
    if (assessmentType === 'formative' && header1.includes('Formative') && header2.includes(assessmentCode.replace('F.A.', ''))) {
      return i;
    }
    if (assessmentType === 'summative' && header1.includes('Summative') && header2.includes(assessmentCode.replace('S.A.', ''))) {
      return i;
    }
  }
  
  return -1; // Not found
}

/**
 * Find sheet by class name with flexible matching
 * 根據班級名稱尋找工作表（靈活匹配）
 */
function findSheetByClassName(gradebook, className) {
  const sheets = gradebook.getSheets();
  
  // Try exact match first
  let sheet = sheets.find(s => s.getName() === className);
  if (sheet) return sheet;
  
  // Try with emoji prefix
  sheet = sheets.find(s => s.getName() === `📚 ${className}`);
  if (sheet) return sheet;
  
  // Try partial match (contains class name)
  sheet = sheets.find(s => s.getName().includes(className));
  if (sheet) return sheet;
  
  return null;
}
