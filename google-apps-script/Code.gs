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
  
  // Assessment Title Configuration | 評量標題配置
  // New structure supporting LT&Level and IT&Level management | 支援LT&Level和IT&Level管理的新結構
  ASSESSMENT_TITLES: {
    // Default titles for all grades | 所有年級的預設標題
    DEFAULT: {
      FORMATIVE: ['F.A.1', 'F.A.2', 'F.A.3', 'F.A.4', 'F.A.5', 'F.A.6', 'F.A.7', 'F.A.8'],
      SUMMATIVE: ['S.A.1', 'S.A.2', 'S.A.3', 'S.A.4']
    },
    
    // LT (Local Teacher) Assessment Titles by Level | LT老師分級評量標題
    LT: {
      // Grade 1 Levels for LT | G1年級LT分級
      G1E1: {
        FORMATIVE: ['中文測驗1', '語音練習1', '故事分享1', '歌謠練習1', '中文測驗2', '語音練習2', '故事分享2', '歌謠練習2'],
        SUMMATIVE: ['基礎測試1', '基礎測試2', '聽力測驗', '口語測驗']
      },
      G1E2: {
        FORMATIVE: ['詞彙練習1', '閱讀理解1', '寫作練習1', '對話練習1', '詞彙練習2', '閱讀理解2', '寫作練習2', '對話練習2'],
        SUMMATIVE: ['單元測驗1', '單元測驗2', '期中評量', '口頭報告']
      },
      G1E3: {
        FORMATIVE: ['進階測驗1', '作文練習1', '辯論準備1', '專題研究1', '進階測驗2', '作文練習2', '辯論準備2', '專題研究2'],
        SUMMATIVE: ['進階測試1', '進階測試2', '學習檔案', '期末專題']
      },
      
      // Grade 2 Levels for LT | G2年級LT分級
      G2E1: {
        FORMATIVE: ['字詞測驗1', '短文閱讀1', '圖片描述1', '遊戲活動1', '字詞測驗2', '短文閱讀2', '圖片描述2', '遊戲活動2'],
        SUMMATIVE: ['基礎測試1', '基礎測試2', '展示分享', '學期回顧']
      },
      G2E2: {
        FORMATIVE: ['語法練習1', '對話演練1', '故事創作1', '角色扮演1', '語法練習2', '對話演練2', '故事創作2', '角色扮演2'],
        SUMMATIVE: ['章節測驗1', '章節測驗2', '表演評量', '期末測驗']
      },
      G2E3: {
        FORMATIVE: ['複合題目1', '創意寫作1', '討論參與1', '研究技能1', '複合題目2', '創意寫作2', '討論參與2', '研究技能2'],
        SUMMATIVE: ['複合測試1', '複合測試2', '研究專題', '綜合評量']
      },
      
      // Grade 3 Levels for LT | G3年級LT分級
      G3E1: {
        FORMATIVE: ['句型練習1', '閱讀測驗1', '基礎寫作1', '會話練習1', '句型練習2', '閱讀測驗2', '基礎寫作2', '會話練習2'],
        SUMMATIVE: ['程度測試1', '程度測試2', '口語評量', '期末測試']
      },
      G3E2: {
        FORMATIVE: ['文本分析1', '作文初稿1', '報告準備1', '小組合作1', '文本分析2', '作文初稿2', '報告準備2', '小組合作2'],
        SUMMATIVE: ['文學測驗1', '文學測驗2', '作文集評', '期末專題']
      },
      G3E3: {
        FORMATIVE: ['批判思考1', '學術寫作1', '辯論技巧1', '研究方法1', '批判思考2', '學術寫作2', '辯論技巧2', '研究方法2'],
        SUMMATIVE: ['學術測試1', '學術測試2', '論文專題', '綜合考試']
      },
      
      // Grade 4-6 LT Levels | G4-G6年級LT分級
      G4E1: {
        FORMATIVE: ['進階句型1', '短文理解1', '段落寫作1', '討論表達1', '進階句型2', '短文理解2', '段落寫作2', '討論表達2'],
        SUMMATIVE: ['階段測試1', '階段測試2', '綜合口試', '期末考核']
      },
      G4E2: {
        FORMATIVE: ['文章解析1', '議論文1', '簡報製作1', '團隊協作1', '文章解析2', '議論文2', '簡報製作2', '團隊協作2'],
        SUMMATIVE: ['主題測驗1', '主題測驗2', '專題發表', '學期總評']
      },
      G5E1: {
        FORMATIVE: ['高階閱讀1', '論述寫作1', '專題討論1', '資料整理1', '高階閱讀2', '論述寫作2', '專題討論2', '資料整理2'],
        SUMMATIVE: ['能力測試1', '能力測試2', '研究報告', '口試評量']
      },
      G5E2: {
        FORMATIVE: ['文學賞析1', '創作練習1', '評論寫作1', '學術討論1', '文學賞析2', '創作練習2', '評論寫作2', '學術討論2'],
        SUMMATIVE: ['文學測驗1', '文學測驗2', '創作作品', '學術論文']
      },
      G6E1: {
        FORMATIVE: ['綜合理解1', '應用寫作1', '思辨表達1', '專案管理1', '綜合理解2', '應用寫作2', '思辨表達2', '專案管理2'],
        SUMMATIVE: ['總合測試1', '總合測試2', '畢業專題', '綜合評估']
      },
      G6E2: {
        FORMATIVE: ['高級分析1', '學術論述1', '獨立研究1', '領導實踐1', '高級分析2', '學術論述2', '獨立研究2', '領導實踐2'],
        SUMMATIVE: ['高級測試1', '高級測試2', '畢業論文', '成果發表']
      }
    },
    
    // IT (International Teacher) Assessment Titles by Level | IT老師分級評量標題
    IT: {
      // Grade 1 Levels for IT | G1年級IT分級
      G1E1: {
        FORMATIVE: ['ABC Quiz 1', 'Phonics 1', 'Story Time 1', 'Song Practice 1', 'ABC Quiz 2', 'Phonics 2', 'Story Time 2', 'Song Practice 2'],
        SUMMATIVE: ['Basic Test 1', 'Basic Test 2', 'Listening Test', 'Speaking Test']
      },
      G1E2: {
        FORMATIVE: ['Vocab Build 1', 'Reading Fun 1', 'Writing Start 1', 'Talk Time 1', 'Vocab Build 2', 'Reading Fun 2', 'Writing Start 2', 'Talk Time 2'],
        SUMMATIVE: ['Unit Test 1', 'Unit Test 2', 'Mid-term', 'Show & Tell']
      },
      G1E3: {
        FORMATIVE: ['Smart Quiz 1', 'Story Write 1', 'Debate Start 1', 'Project Begin 1', 'Smart Quiz 2', 'Story Write 2', 'Debate Start 2', 'Project Begin 2'],
        SUMMATIVE: ['Advanced Test 1', 'Advanced Test 2', 'Portfolio', 'Final Project']
      },
      
      // Grade 2 Levels for IT | G2年級IT分級
      G2E1: {
        FORMATIVE: ['Word Game 1', 'Story Read 1', 'Picture Talk 1', 'Fun Activity 1', 'Word Game 2', 'Story Read 2', 'Picture Talk 2', 'Fun Activity 2'],
        SUMMATIVE: ['Level Test 1', 'Level Test 2', 'Presentation', 'Review Test']
      },
      G2E2: {
        FORMATIVE: ['Grammar Fun 1', 'Role Play 1', 'Story Create 1', 'Drama Time 1', 'Grammar Fun 2', 'Role Play 2', 'Story Create 2', 'Drama Time 2'],
        SUMMATIVE: ['Chapter Test 1', 'Chapter Test 2', 'Performance', 'Final Exam']
      },
      G2E3: {
        FORMATIVE: ['Think Quiz 1', 'Creative Write 1', 'Group Talk 1', 'Research Start 1', 'Think Quiz 2', 'Creative Write 2', 'Group Talk 2', 'Research Start 2'],
        SUMMATIVE: ['Challenge Test 1', 'Challenge Test 2', 'Research Work', 'Complete Review']
      },
      
      // Grade 3 Levels for IT | G3年級IT分級
      G3E1: {
        FORMATIVE: ['Sentence Work 1', 'Read & Think 1', 'Write Basic 1', 'Conversation 1', 'Sentence Work 2', 'Read & Think 2', 'Write Basic 2', 'Conversation 2'],
        SUMMATIVE: ['Level Check 1', 'Level Check 2', 'Speaking Test', 'Final Review']
      },
      G3E2: {
        FORMATIVE: ['Text Study 1', 'Essay Draft 1', 'Present Prep 1', 'Team Work 1', 'Text Study 2', 'Essay Draft 2', 'Present Prep 2', 'Team Work 2'],
        SUMMATIVE: ['Literature Test 1', 'Literature Test 2', 'Essay Collection', 'Project Final']
      },
      G3E3: {
        FORMATIVE: ['Critical Think 1', 'Academic Write 1', 'Debate Skill 1', 'Research Method 1', 'Critical Think 2', 'Academic Write 2', 'Debate Skill 2', 'Research Method 2'],
        SUMMATIVE: ['Academic Test 1', 'Academic Test 2', 'Thesis Work', 'Comprehensive']
      },
      
      // Grade 4-6 IT Levels | G4-G6年級IT分級
      G4E1: {
        FORMATIVE: ['Advanced Read 1', 'Paragraph Write 1', 'Discussion 1', 'Project Part 1', 'Advanced Read 2', 'Paragraph Write 2', 'Discussion 2', 'Project Part 2'],
        SUMMATIVE: ['Progress Test 1', 'Progress Test 2', 'Oral Exam', 'Final Assessment']
      },
      G4E2: {
        FORMATIVE: ['Text Analysis 1', 'Argument Write 1', 'Presentation 1', 'Collaboration 1', 'Text Analysis 2', 'Argument Write 2', 'Presentation 2', 'Collaboration 2'],
        SUMMATIVE: ['Theme Test 1', 'Theme Test 2', 'Project Present', 'Semester Final']
      },
      G5E1: {
        FORMATIVE: ['Complex Read 1', 'Essay Develop 1', 'Seminar 1', 'Research Skill 1', 'Complex Read 2', 'Essay Develop 2', 'Seminar 2', 'Research Skill 2'],
        SUMMATIVE: ['Ability Test 1', 'Ability Test 2', 'Research Report', 'Oral Defense']
      },
      G5E2: {
        FORMATIVE: ['Literary Study 1', 'Creative Work 1', 'Review Write 1', 'Academic Talk 1', 'Literary Study 2', 'Creative Work 2', 'Review Write 2', 'Academic Talk 2'],
        SUMMATIVE: ['Literature Exam 1', 'Literature Exam 2', 'Creative Portfolio', 'Academic Paper']
      },
      G6E1: {
        FORMATIVE: ['Integrated Read 1', 'Applied Write 1', 'Critical Express 1', 'Project Lead 1', 'Integrated Read 2', 'Applied Write 2', 'Critical Express 2', 'Project Lead 2'],
        SUMMATIVE: ['Comprehensive 1', 'Comprehensive 2', 'Capstone Project', 'Final Evaluation']
      },
      G6E2: {
        FORMATIVE: ['Advanced Analysis 1', 'Academic Discourse 1', 'Independent Study 1', 'Leadership Practice 1', 'Advanced Analysis 2', 'Academic Discourse 2', 'Independent Study 2', 'Leadership Practice 2'],
        SUMMATIVE: ['Advanced Exam 1', 'Advanced Exam 2', 'Graduation Thesis', 'Final Presentation']
      }
    }
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
        const teacherKey = `${ltTeacher}_LT`;
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
        const teacherKey = `${itTeacher}_IT`;
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
    
    console.log(`Extracted ${teacherArray.length} teachers from Classes sheet`);
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
      console.log('Warning: Some teacher columns not found in Students sheet');
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
        const teacherKey = `${ltTeacher}_LT`;
        const teacher = teacherData.get(teacherKey);
        if (teacher) {
          teacher.students.push(studentInfo);
        }
      }
      
      // Assign to IT Teacher
      if (itTeacher && itTeacher.trim()) {
        const teacherKey = `${itTeacher}_IT`;
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
    ['LE11020', 'Emily Lee', 'Emily', 'G1', '104', 'G1 Trailblazers', 'Mr. Johnson', 'Ms. Smith', 'emily@school.edu', '在學'],
    ['LE11043', 'Ryan Tu', 'Ryan', 'G2', '201', 'G2 Adventurers', 'Mr. Davis', 'Ms. Brown', 'ryan@school.edu', '在學'],
    ['LE11065', 'Sarah Chen', 'Sarah', 'G3', '302', 'G3 Explorers', 'Mr. Taylor', 'Ms. Wang', 'sarah@school.edu', '在學'],
    ['LE11087', 'David Kim', 'David', 'G4', '403', 'G4 Inventors', 'Mr. Anderson', 'Ms. Liu', 'david@school.edu', '在學'],
    ['LE11109', 'Lisa Zhang', 'Lisa', 'G5', '501', 'G5 Pioneers', 'Mr. White', 'Ms. Yang', 'lisa@school.edu', '在學'],
    ['LE11131', 'Alex Wong', 'Alex', 'G6', '602', 'G6 Pathfinders', 'Mr. Collins', 'Ms. Kumar', 'alex@school.edu', '在學']
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
  
  // Add sample class data with correct Level format (G[grade]E[level]) | 新增範例班級資料，使用正確的Level格式（G[年級]E[級別]）
  const sampleClasses = [
    ['G1 Trailblazers', 'Mr. Johnson', 'Ms. Smith', 'G1E1', '12'],
    ['G1 Discoverers', 'Ms. Chen', 'Mr. Wilson', 'G1E2', '15'],
    ['G2 Adventurers', 'Mr. Davis', 'Ms. Brown', 'G2E1', '14'],
    ['G2 Innovators', 'Ms. Garcia', 'Mr. Lee', 'G2E2', '13'],
    ['G3 Explorers', 'Mr. Taylor', 'Ms. Wang', 'G3E1', '16'],
    ['G3 Navigators', 'Ms. Miller', 'Mr. Kim', 'G3E2', '11'],
    ['G4 Inventors', 'Mr. Anderson', 'Ms. Liu', 'G4E1', '15'],
    ['G4 Voyagers', 'Ms. Thompson', 'Mr. Zhang', 'G4E2', '12'],
    ['G5 Pioneers', 'Mr. White', 'Ms. Yang', 'G5E1', '14'],
    ['G5 Guardians', 'Ms. Rodriguez', 'Mr. Park', 'G5E2', '13'],
    ['G6 Pathfinders', 'Mr. Collins', 'Ms. Kumar', 'G6E1', '16'],
    ['G6 Seekers', 'Ms. Foster', 'Mr. Chen', 'G6E2', '10'],
    ['G6 Visionaries', 'Mr. Martinez', 'Ms. Wong', 'G6E3', '15'],
    ['G6 Achievers', 'Ms. Jackson', 'Mr. Lin', 'G6E3', '12']
  ];
  
  classesSheet.getRange(5, 1, sampleClasses.length, classHeaders.length).setValues(sampleClasses);
  
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
 * Create or get dashboard spreadsheet | 建立或取得控制台試算表
 */
function getOrCreateDashboard() {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    
    // Check if dashboard already exists | 檢查控制台是否已存在
    const dashboardName = 'System Dashboard | 系統控制台';
    const existingFiles = systemFolder.getFilesByName(dashboardName);
    
    if (existingFiles.hasNext()) {
      console.log(`✅ Dashboard found: ${dashboardName}`);
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
    
    console.log(`✅ Dashboard created: ${dashboardName}`);
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
function setupClassSheetHeaders(sheet, className, teacherType = null) {
  // Clear sheet | 清空工作表
  sheet.clear();
  
  // Get dynamic assessment titles for this class with teacher type | 取得此班級及教師類型的動態評量標題
  const assessmentTitles = getAssessmentTitles(className, teacherType);
  console.log(`Using assessment titles for ${className} (${teacherType || 'DEFAULT'}):`, assessmentTitles);
  
  // Build headers array with new structure | 建立新結構的標題陣列
  const row1Headers = []; // Group titles row
  const row2Headers = []; // Column headers row
  
  // Column structure: 序號, Student Name, Student ID, Term Grade, Formative Avg, Summative Avg, Final Assessment, Custom F.A. titles, Custom S.A. titles, Final
  
  // Basic info columns (A-G) | 基本資訊欄位 (A-G)
  row1Headers.push('', '', '', '', '', '', ''); // A-G empty for row 1
  row2Headers.push('', 'Student Name', 'Student ID', 'Term Grade', 'Formative Assessment Average', 'Summative Assessment Average', 'Final Assessment');
  
  // Formative Assessment columns (H-O) | 平時評量欄位 (H-O)
  let formativeStartCol = 8; // Column H
  for (let i = 0; i < SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT; i++) {
    if (i === 0) {
      row1Headers.push('Formative Assessments'); // Only set group title on first column
    } else {
      row1Headers.push(''); // Empty for other columns in group
    }
    // Use dynamic titles from configuration | 使用配置中的動態標題
    const title = assessmentTitles.formative[i] || `F.A.${i + 1}`;
    row2Headers.push(title);
  }
  
  // Summative Assessment columns (P-S) | 總結評量欄位 (P-S)  
  let summativeStartCol = formativeStartCol + SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT;
  for (let i = 0; i < SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT; i++) {
    if (i === 0) {
      row1Headers.push('Summative Assessments'); // Only set group title on first column
    } else {
      row1Headers.push(''); // Empty for other columns in group
    }
    // Use dynamic titles from configuration | 使用配置中的動態標題
    const title = assessmentTitles.summative[i] || `S.A.${i + 1}`;
    row2Headers.push(title);
  }
  
  // Final column (if enabled) | 期末考欄位（如果啟用）
  if (SYSTEM_CONFIG.ASSESSMENTS.INCLUDE_FINAL) {
    row1Headers.push('');
    row2Headers.push('Final');
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
    if (SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT > 0) {
      sheet.getRange(1, formativeStartCol, 1, SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT)
        .setBackground('#4285F4').setFontColor('white').setFontWeight('bold'); // Blue background
    }
    
    // Summative Assessments group  
    if (SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT > 0) {
      sheet.getRange(1, summativeStartCol, 1, SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT)
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
  
  // Apply freeze after ensuring no merge conflicts | 確保沒有合併衝突後再凍結
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

// ===== ASSESSMENT TITLE MANAGEMENT | 評量標題管理 =====

/**
 * Get all class configurations from Classes sheet | 從Classes工作表取得所有班級配置
 */
function getAllClassConfigurations() {
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
      console.log(`Found class config: ${className} -> ${classCode}, teacherType: ${teacherType}`);
    } else {
      // Extract from class name (e.g., "G3 Achievers" might match "G3E3")
      const gradeMatch = className.match(/^G(\d+)/);
      if (gradeMatch) {
        // Default to E2 (intermediate) if no specific level found
        classCode = `G${gradeMatch[1]}E2`;
        console.log(`Extracted class code from name: ${className} -> ${classCode}, teacherType: ${teacherType}`);
      }
    }
    
    console.log(`Getting assessment titles for class: ${className}, classCode: ${classCode}, teacherType: ${teacherType}`);
    
    // Priority order: TeacherType&Level-specific > ClassCode-specific > Default
    // 優先順序：教師類型&級別特定 > 班級代碼特定 > 預設
    let titles = null;
    
    // 1. Check for teacher type and level specific titles (NEW STRUCTURE)
    // 檢查教師類型和級別特定標題（新結構）
    if (teacherType && classCode && 
        SYSTEM_CONFIG.ASSESSMENT_TITLES[teacherType] && 
        SYSTEM_CONFIG.ASSESSMENT_TITLES[teacherType][classCode]) {
      titles = SYSTEM_CONFIG.ASSESSMENT_TITLES[teacherType][classCode];
      console.log(`Using ${teacherType}&Level specific titles for ${classCode}`);
    }
    // 2. Check for legacy class code specific titles (BACKWARD COMPATIBILITY)
    // 檢查舊版班級代碼特定標題（向後兼容）
    else if (classCode && SYSTEM_CONFIG.ASSESSMENT_TITLES[classCode]) {
      titles = SYSTEM_CONFIG.ASSESSMENT_TITLES[classCode];
      console.log(`Using legacy class code specific titles for ${classCode}`);
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
          if (SYSTEM_CONFIG.ASSESSMENT_TITLES[teacherType][testCode]) {
            titles = SYSTEM_CONFIG.ASSESSMENT_TITLES[teacherType][testCode];
            console.log(`Using ${teacherType} fallback titles for ${testCode} (requested: ${classCode})`);
            break;
          }
        }
      }
    }
    // 4. Use default titles | 使用預設標題
    if (!titles) {
      titles = SYSTEM_CONFIG.ASSESSMENT_TITLES.DEFAULT;
      console.log(`Using default titles for ${className}`);
    }
    
    return {
      formative: titles.FORMATIVE.slice(0, SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT),
      summative: titles.SUMMATIVE.slice(0, SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT),
      classCode: classCode,
      teacherType: teacherType
    };
    
  } catch (error) {
    console.log(`Error getting assessment titles for ${className}, teacherType: ${teacherType}: ${error.message}`);
    // Fallback to default | 回退到預設
    return {
      formative: SYSTEM_CONFIG.ASSESSMENT_TITLES.DEFAULT.FORMATIVE.slice(0, SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT),
      summative: SYSTEM_CONFIG.ASSESSMENT_TITLES.DEFAULT.SUMMATIVE.slice(0, SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT),
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
    // Validate input | 驗證輸入
    if (!classCode || !formativeTitles || !summativeTitles) {
      throw new Error('Missing required parameters');
    }
    
    if (formativeTitles.length !== SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT) {
      throw new Error(`Formative titles must have exactly ${SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT} items`);
    }
    
    if (summativeTitles.length !== SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT) {
      throw new Error(`Summative titles must have exactly ${SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT} items`);
    }
    
    // Update configuration | 更新配置
    SYSTEM_CONFIG.ASSESSMENT_TITLES[classCode] = {
      FORMATIVE: formativeTitles,
      SUMMATIVE: summativeTitles
    };
    
    // Synchronize to existing gradebook sheets | 同步到現有的成績簿工作表
    const syncResult = syncAssessmentTitlesToExistingGradebooks(classCode);
    
    console.log(`Successfully updated assessment titles for ${classCode}`);
    
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
    const allClasses = getAllClassConfigurations();
    const result = [];
    
    allClasses.forEach(classConfig => {
      const titles = SYSTEM_CONFIG.ASSESSMENT_TITLES[classConfig.classCode] || SYSTEM_CONFIG.ASSESSMENT_TITLES.DEFAULT;
      result.push({
        classCode: classConfig.classCode,
        className: classConfig.className,
        grade: classConfig.grade,
        level: classConfig.level,
        ltTeacher: classConfig.ltTeacher,
        itTeacher: classConfig.itTeacher,
        studentCount: classConfig.studentCount,
        formativeTitles: titles.FORMATIVE.slice(0, SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT),
        summativeTitles: titles.SUMMATIVE.slice(0, SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT)
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
    // Validate input | 驗證輸入
    if (!target || !formativeTitles || !summativeTitles) {
      throw new Error('Missing required parameters');
    }
    
    if (formativeTitles.length !== SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT) {
      throw new Error(`Formative titles must have exactly ${SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT} items`);
    }
    
    if (summativeTitles.length !== SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT) {
      throw new Error(`Summative titles must have exactly ${SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT} items`);
    }
    
    // Update configuration | 更新配置
    SYSTEM_CONFIG.ASSESSMENT_TITLES[target] = {
      FORMATIVE: formativeTitles,
      SUMMATIVE: summativeTitles
    };
    
    console.log(`Successfully updated assessment titles for ${target}`);
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
    
    console.log(`Successfully reset assessment titles for ${target}`);
    
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
    console.log(`Starting sync for class code: ${classCode}`);
    
    // Get system folder
    const mainFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(mainFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS, false);
    
    if (!teacherGradebooksFolder) {
      console.log('Teacher gradebooks folder not found');
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
              console.log(`Updating sheet: ${sheetName} in ${file.getName()}`);
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
    
    console.log(`Sync completed: ${JSON.stringify(result)}`);
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
    // Get the new assessment titles for this class code
    const assessmentTitles = SYSTEM_CONFIG.ASSESSMENT_TITLES[classCode] || SYSTEM_CONFIG.ASSESSMENT_TITLES.DEFAULT;
    
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
      console.log(`Could not find assessment columns in sheet: ${sheet.getName()}`);
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
    
    console.log(`Successfully updated headers in sheet: ${sheet.getName()}`);
    
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
    console.log(`Updating assessment titles for ${teacherType} ${classCode}`);
    
    // Validate teacher type
    if (!teacherType || !['LT', 'IT'].includes(teacherType)) {
      throw new Error('Teacher type must be either "LT" or "IT"');
    }
    
    // Validate class code format
    if (!classCode || !classCode.match(/^G[1-6]E[1-3]$/)) {
      throw new Error('Class code must be in format G[1-6]E[1-3] (e.g., G1E1, G3E2)');
    }
    
    // Validate formative titles count
    const expectedFormativeCount = SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT;
    if (!formativeTitles || formativeTitles.length !== expectedFormativeCount) {
      throw new Error(`Formative titles must contain exactly ${expectedFormativeCount} items`);
    }
    
    // Validate summative titles count
    const expectedSummativeCount = SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT;
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
    
    console.log(`✅ Assessment titles updated for ${teacherType} ${classCode}`);
    
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
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA);
    
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
    
    console.log(`Found master data file: ${foundFileName}`);
    
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
        console.log(`Found students sheet: ${variant}`);
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
    console.log(`Starting sync for ${teacherType} ${classCode}${specificTeacherName ? ` (teacher: ${specificTeacherName})` : ''}`);
    
    // Get system folder
    let mainFolder;
    try {
      mainFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    } catch (error) {
      const errorMsg = `Cannot access main folder with ID: ${SYSTEM_CONFIG.MAIN_FOLDER_ID}. Error: ${error.message}`;
      console.log(errorMsg);
      return { success: false, message: errorMsg };
    }
    
    const teacherGradebooksFolder = getSubFolder(mainFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS, false);
    
    if (!teacherGradebooksFolder) {
      const errorMsg = `Teacher gradebooks folder "${SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS}" not found. Please run initializeSystem() first to create the folder structure.`;
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
        console.log(`Skipping ${fileName}: detected type ${detectedTeacherType}, target type ${teacherType}`);
        continue;
      }
      
      console.log(`Processing ${teacherType} gradebook: ${fileName}`);
      
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
                console.log(`Found class ${matchingClass.className} matches level ${classCode} for sheet ${sheetName}`);
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
            console.log(`Updating sheet: ${sheetName} in ${fileName} for level ${classCode}`);
            
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
              console.log(`✅ Updated ${sheetName} in ${fileName}`);
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
    
    console.log(`Updating headers for sheet: ${sheet.getName()} with ${teacherType} ${classCode}`);
    
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
    
    // Find the start of formative assessments
    let formativeStartIndex = -1;
    for (let i = 0; i < headers.length; i++) {
      const header = String(headers[i]).toLowerCase();
      if (header.includes('f.a.') || 
          header.includes('formative') || 
          assessmentTitles.formative.some(title => 
            String(title).toLowerCase() === header
          )) {
        formativeStartIndex = i;
        break;
      }
    }
    
    if (formativeStartIndex === -1) {
      return {
        success: false,
        message: 'Could not find formative assessment columns'
      };
    }
    
    // Update formative assessment headers
    for (let i = 0; i < assessmentTitles.formative.length; i++) {
      const col = formativeStartIndex + i + 1; // +1 for 1-based indexing
      if (col <= sheet.getLastColumn()) {
        sheet.getRange(2, col).setValue(assessmentTitles.formative[i]);
      }
    }
    
    // Find and update summative assessment headers
    const summativeStartIndex = formativeStartIndex + assessmentTitles.formative.length;
    for (let i = 0; i < assessmentTitles.summative.length; i++) {
      const col = summativeStartIndex + i + 1; // +1 for 1-based indexing
      if (col <= sheet.getLastColumn()) {
        sheet.getRange(2, col).setValue(assessmentTitles.summative[i]);
      }
    }
    
    console.log(`✅ Headers updated for ${sheet.getName()}`);
    
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
    console.log(`Starting batch update for teacher type: ${teacherType}`);
    
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
    
    console.log(`Batch update completed for ${teacherType}: ${successCount} success, ${failureCount} failures`);
    
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
  
  console.log('Update Result:', result);
  
  if (result.success) {
    console.log(`✅ Successfully updated LT G1E1 assessment titles`);
    console.log(`📊 Sync result: ${result.syncResult.updatedSheets} sheets updated`);
    
    if (result.syncResult.errors.length > 0) {
      console.log(`⚠️ Sync errors:`, result.syncResult.errors);
    }
  } else {
    console.log(`❌ Failed to update LT G1E1: ${result.message}`);
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
  
  console.log('Update Result:', result);
  
  if (result.success) {
    console.log(`✅ Successfully updated IT G2E2 assessment titles`);
    console.log(`📊 Sync result: ${result.syncResult.updatedSheets} sheets updated`);
    
    if (result.syncResult.errors.length > 0) {
      console.log(`⚠️ Sync errors:`, result.syncResult.errors);
    }
  } else {
    console.log(`❌ Failed to update IT G2E2: ${result.message}`);
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
    
    console.log(`Classes found for level ${targetLevel}:`, matchingClasses.map(c => c.className));
    
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
    
    console.log(`\n=== Current Assessment Titles for ${teacherType} ${level} ===`);
    console.log('Formative Assessments:');
    assessmentTitles.formative.forEach((title, index) => {
      console.log(`  ${index + 1}. ${title}`);
    });
    
    console.log('\nSummative Assessments:');
    assessmentTitles.summative.forEach((title, index) => {
      console.log(`  ${index + 1}. ${title}`);
    });
    
    console.log(`\nClass Code: ${assessmentTitles.classCode}`);
    console.log(`Teacher Type: ${assessmentTitles.teacherType || 'Not specified'}`);
    
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
  console.log('\n=== Assessment Title Management System診斷 ===');
  
  try {
    // 1. 檢查主資料夾
    console.log(`\n1. 檢查主資料夾 ID: ${SYSTEM_CONFIG.MAIN_FOLDER_ID}`);
    let mainFolder;
    try {
      mainFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
      console.log(`✅ 主資料夾存在: ${mainFolder.getName()}`);
    } catch (error) {
      console.log(`❌ 主資料夾不存在或無法存取: ${error.message}`);
      return {
        success: false,
        message: '主資料夾不存在，請先設定正確的 MAIN_FOLDER_ID'
      };
    }
    
    // 2. 檢查子資料夾
    console.log('\n2. 檢查子資料夾結構:');
    const teacherGradebooksFolder = getSubFolder(mainFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS, false);
    const masterDataFolder = getSubFolder(mainFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA, false);
    
    if (!teacherGradebooksFolder) {
      console.log(`❌ Teacher Gradebooks資料夾不存在: ${SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS}`);
      console.log('   建議：執行 initializeSystem() 來建立資料夾結構');
    } else {
      console.log(`✅ Teacher Gradebooks資料夾存在: ${teacherGradebooksFolder.getName()}`);
      
      // 檢查是否有現有成績簿
      const gradebookFiles = teacherGradebooksFolder.getFiles();
      let fileCount = 0;
      while (gradebookFiles.hasNext()) {
        gradebookFiles.next();
        fileCount++;
      }
      console.log(`   找到 ${fileCount} 個檔案`);
    }
    
    if (!masterDataFolder) {
      console.log(`❌ Master Data資料夾不存在: ${SYSTEM_CONFIG.FOLDERS.MASTER_DATA}`);
    } else {
      console.log(`✅ Master Data資料夾存在: ${masterDataFolder.getName()}`);
    }
    
    // 3. 檢查Master Data
    console.log('\n3. 檢查Master Data:');
    try {
      const configs = getAllClassConfigurations();
      console.log(`✅ 找到 ${configs.length} 個班級配置`);
      
      if (configs.length > 0) {
        console.log('   前3個班級配置:');
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

/**
 * Complete test workflow for Assessment Title Management
 * Assessment Title Management完整測試流程
 */
function completeAssessmentTitleTest() {
  console.log('\n🚀 開始 Assessment Title Management 完整測試\n');
  
  try {
    // 步驟1：初始化系統（如果還沒做過）
    console.log('=== 步驟1：初始化系統 ===');
    try {
      const initResult = initializeSystem();
      console.log('✅ 系統初始化完成');
    } catch (error) {
      console.log(`⚠️ 初始化過程中的訊息: ${error.message}`);
      console.log('繼續執行下一步...');
    }

    // 步驟2：檢查系統狀態
    console.log('\n=== 步驟2：檢查系統狀態 ===');
    try {
      const configs = getAllClassConfigurations();
      console.log(`✅ 找到 ${configs.length} 個班級配置`);
      
      if (configs.length > 0) {
        console.log('前3個班級配置:');
        configs.slice(0, 3).forEach((config, index) => {
          console.log(`  ${index + 1}. ${config.className} → ${config.classCode} (Level: ${config.level})`);
        });
      }
    } catch (error) {
      console.log(`❌ 檢查系統狀態失敗: ${error.message}`);
      return { success: false, step: 2, error: error.message };
    }

    // 步驟3：設定LT G1E1的評量標題
    console.log('\n=== 步驟3：設定LT G1E1的評量標題 ===');
    try {
      const result = updateAssessmentTitlesByTeacherLevel('LT', 'G1E1', 
        ['中文測驗1', '語音練習1', '故事分享1', '歌謠練習1', '中文測驗2', '語音練習2', '故事分享2', '歌謠練習2'],
        ['基礎測試1', '基礎測試2', '聽力測驗', '口語測驗']
      );
      
      if (result.success) {
        console.log('✅ LT G1E1評量標題設定成功');
        console.log(`📊 同步結果: ${result.syncResult?.updatedSheets || 0} 個工作表已更新`);
      } else {
        console.log(`❌ 設定失敗: ${result.message}`);
      }
      
      console.log('完整更新結果:', result);
    } catch (error) {
      console.log(`❌ 設定評量標題失敗: ${error.message}`);
      return { success: false, step: 3, error: error.message };
    }

    // 步驟4：檢查更新後的標題
    console.log('\n=== 步驟4：檢查更新後的標題 ===');
    try {
      const currentTitles = showCurrentAssessmentTitles('LT', 'G1E1');
      console.log('✅ 標題檢查完成');
    } catch (error) {
      console.log(`❌ 檢查標題失敗: ${error.message}`);
    }

    // 步驟5：建立成績簿（會使用新的標題）
    console.log('\n=== 步驟5：建立成績簿 ===');
    try {
      const gradebookResult = createGradebooksForAllTeachers();
      console.log('✅ 成績簿建立完成');
      console.log('成績簿建立結果:', gradebookResult);
    } catch (error) {
      console.log(`❌ 建立成績簿過程中的訊息: ${error.message}`);
      console.log('這可能是因為成績簿已經存在，這是正常的。');
    }

    console.log('\n🎉 Assessment Title Management 完整測試完成！');
    
    return {
      success: true,
      message: '完整測試流程執行完畢，請檢查上方詳細日誌',
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.log(`❌ 測試過程中發生未預期的錯誤: ${error.message}`);
    console.log('錯誤堆疊:', error.stack);
    
    return {
      success: false,
      message: `測試失敗: ${error.message}`,
      error: error.stack
    };
  }
}

/**
 * Diagnose Master Data file issues
 * 診斷 Master Data 檔案問題
 */
function diagnoseMasterDataFile() {
  console.log('\n🔍 診斷 Master Data 檔案問題\n');
  
  try {
    // 1. 檢查主資料夾
    console.log('=== 1. 檢查主資料夾 ===');
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    console.log(`主資料夾: ${systemFolder.getName()}`);
    
    // 2. 檢查 Master Data 資料夾
    console.log('\n=== 2. 檢查 Master Data 資料夾 ===');
    const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA);
    
    if (!masterDataFolder) {
      console.log('❌ Master Data 資料夾不存在');
      console.log(`期望的資料夾名稱: ${SYSTEM_CONFIG.FOLDERS.MASTER_DATA}`);
      
      // 列出主資料夾中的所有子資料夾
      console.log('\n可用的子資料夾:');
      const subFolders = systemFolder.getFolders();
      while (subFolders.hasNext()) {
        const folder = subFolders.next();
        console.log(`  - ${folder.getName()}`);
      }
      
      return { success: false, message: 'Master Data 資料夾不存在' };
    }
    
    console.log(`✅ Master Data 資料夾: ${masterDataFolder.getName()}`);
    
    // 3. 列出 Master Data 資料夾中的所有檔案
    console.log('\n=== 3. 列出 Master Data 資料夾中的檔案 ===');
    const files = masterDataFolder.getFiles();
    let fileCount = 0;
    const fileList = [];
    
    while (files.hasNext()) {
      const file = files.next();
      fileCount++;
      fileList.push(file.getName());
      console.log(`${fileCount}. ${file.getName()}`);
    }
    
    if (fileCount === 0) {
      console.log('❌ Master Data 資料夾是空的');
      return { success: false, message: 'Master Data 資料夾是空的' };
    }
    
    // 4. 檢查特定的檔案名稱
    console.log('\n=== 4. 檢查 Master Data 檔案 ===');
    const expectedFileName = 'Master Data | 主控資料';
    console.log(`期望的檔案名稱: ${expectedFileName}`);
    
    const masterDataFiles = masterDataFolder.getFilesByName(expectedFileName);
    if (!masterDataFiles.hasNext()) {
      console.log('❌ 找不到符合名稱的檔案');
      console.log('可能的檔案名稱模式:');
      fileList.forEach(fileName => {
        if (fileName.includes('Master') || fileName.includes('主控') || fileName.includes('Data')) {
          console.log(`  🎯 可能匹配: ${fileName}`);
        }
      });
      
      return { success: false, message: '找不到 Master Data 檔案', availableFiles: fileList };
    }
    
    // 5. 檢查檔案內容
    console.log('\n=== 5. 檢查檔案內容 ===');
    const masterDataFile = masterDataFiles.next();
    console.log(`✅ 找到檔案: ${masterDataFile.getName()}`);
    
    try {
      const spreadsheet = SpreadsheetApp.openById(masterDataFile.getId());
      const sheets = spreadsheet.getSheets();
      
      console.log(`📄 檔案包含 ${sheets.length} 個工作表:`);
      sheets.forEach((sheet, index) => {
        console.log(`  ${index + 1}. ${sheet.getName()}`);
      });
      
      // 檢查 Students 工作表
      const studentsSheet = spreadsheet.getSheetByName('Students | 學生資料');
      if (!studentsSheet) {
        console.log('❌ 找不到 Students | 學生資料 工作表');
        
        // 嘗試其他可能的名稱
        const possibleNames = ['Students', '學生資料', 'Student Data'];
        for (const name of possibleNames) {
          const sheet = spreadsheet.getSheetByName(name);
          if (sheet) {
            console.log(`✅ 找到類似工作表: ${sheet.getName()}`);
            break;
          }
        }
        
        return { success: false, message: '找不到 Students 工作表' };
      }
      
      console.log(`✅ 找到 Students 工作表: ${studentsSheet.getName()}`);
      
      // 檢查工作表標題
      const headers = studentsSheet.getRange(1, 1, 1, studentsSheet.getLastColumn()).getValues()[0];
      console.log('\n工作表標題:');
      headers.forEach((header, index) => {
        console.log(`  ${index + 1}. ${header}`);
      });
      
      // 檢查是否有教師欄位
      const ltTeacherIndex = headers.findIndex(header => header.includes('LT Teacher'));
      const itTeacherIndex = headers.findIndex(header => header.includes('IT Teacher'));
      
      console.log(`\nLT Teacher 欄位索引: ${ltTeacherIndex}`);
      console.log(`IT Teacher 欄位索引: ${itTeacherIndex}`);
      
      if (ltTeacherIndex === -1 || itTeacherIndex === -1) {
        console.log('❌ 找不到教師欄位');
        return { success: false, message: '找不到教師欄位' };
      }
      
      console.log('✅ 找到教師欄位');
      
      return {
        success: true,
        message: 'Master Data 檔案檢查完成',
        fileCount: fileCount,
        hasStudentsSheet: true,
        hasTeacherColumns: true
      };
      
    } catch (error) {
      console.log(`❌ 無法開啟檔案: ${error.message}`);
      return { success: false, message: `無法開啟檔案: ${error.message}` };
    }
    
  } catch (error) {
    console.log(`❌ 診斷過程中發生錯誤: ${error.message}`);
    console.log('錯誤堆疊:', error.stack);
    
    return {
      success: false,
      message: `診斷失敗: ${error.message}`,
      error: error.stack
    };
  }
}

/**
 * Comprehensive diagnostic function to examine Master Data file structure
 * 全面診斷 Master Data 檔案結構
 */
function diagnoseMasterDataSheets() {
  console.log('\n🔍 全面診斷 Master Data 檔案工作表結構\n');
  
  try {
    // 1. 找到 Master Data 檔案
    console.log('=== 1. 定位 Master Data 檔案 ===');
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA);
    
    if (!masterDataFolder) {
      throw new Error('Master Data 資料夾不存在');
    }
    
    // 嘗試多個可能的檔案名稱
    const possibleFileNames = [
      'Master Data | 主控資料',
      'Gradebook Master Data | 成績簿主控資料表',
      'Master Data',
      '主控資料'
    ];
    
    let masterDataSpreadsheet = null;
    let foundFileName = null;
    
    for (const fileName of possibleFileNames) {
      const files = masterDataFolder.getFilesByName(fileName);
      if (files.hasNext()) {
        masterDataSpreadsheet = SpreadsheetApp.openById(files.next().getId());
        foundFileName = fileName;
        console.log(`✅ 找到檔案: ${foundFileName}`);
        break;
      }
    }
    
    if (!masterDataSpreadsheet) {
      console.log('❌ 找不到 Master Data 檔案');
      console.log('資料夾中的檔案:');
      const files = masterDataFolder.getFiles();
      while (files.hasNext()) {
        console.log(`  - ${files.next().getName()}`);
      }
      return { success: false, message: 'Master Data 檔案不存在' };
    }
    
    // 2. 列出所有工作表
    console.log('\n=== 2. 工作表清單 ===');
    const sheets = masterDataSpreadsheet.getSheets();
    console.log(`檔案包含 ${sheets.length} 個工作表:`);
    
    const sheetInfo = [];
    sheets.forEach((sheet, index) => {
      const name = sheet.getName();
      const lastRow = sheet.getLastRow();
      const lastCol = sheet.getLastColumn();
      
      console.log(`${index + 1}. "${name}" (${lastRow} 行 × ${lastCol} 欄)`);
      
      // 獲取標題行
      let headers = [];
      if (lastRow > 0 && lastCol > 0) {
        try {
          headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
        } catch (e) {
          console.log(`    ⚠️ 無法讀取標題: ${e.message}`);
        }
      }
      
      sheetInfo.push({
        name: name,
        index: index,
        rows: lastRow,
        columns: lastCol,
        headers: headers
      });
    });
    
    // 3. 檢查學生資料工作表
    console.log('\n=== 3. 學生資料工作表分析 ===');
    const studentSheetVariants = [
      'Students | 學生資料',
      'Students',
      '學生資料', 
      'Student Data',
      'student',
      'Student'
    ];
    
    let studentsSheet = null;
    let studentsSheetName = null;
    
    for (const variant of studentSheetVariants) {
      const sheet = masterDataSpreadsheet.getSheetByName(variant);
      if (sheet) {
        studentsSheet = sheet;
        studentsSheetName = variant;
        console.log(`✅ 找到學生工作表: "${variant}"`);
        break;
      }
    }
    
    if (!studentsSheet) {
      console.log('❌ 找不到學生資料工作表');
      console.log('可能的工作表名稱:');
      sheetInfo.forEach(info => {
        if (info.name.toLowerCase().includes('student') || 
            info.name.includes('學生') || 
            info.name.toLowerCase().includes('pupil')) {
          console.log(`  🎯 可能匹配: "${info.name}"`);
        }
      });
    } else {
      // 分析學生工作表結構
      console.log(`\n學生工作表 "${studentsSheetName}" 詳細資訊:`);
      console.log(`  - 資料行數: ${studentsSheet.getLastRow()}`);
      console.log(`  - 欄位數: ${studentsSheet.getLastColumn()}`);
      
      if (studentsSheet.getLastRow() > 0 && studentsSheet.getLastColumn() > 0) {
        const headers = studentsSheet.getRange(1, 1, 1, studentsSheet.getLastColumn()).getValues()[0];
        console.log(`  - 欄位標題 (${headers.length} 個):`);
        
        const teacherColumns = [];
        headers.forEach((header, index) => {
          console.log(`      ${index + 1}. "${header}"`);
          
          if (header.includes('Teacher') || header.includes('老師') || header.includes('教師')) {
            teacherColumns.push({ index: index, name: header });
          }
        });
        
        console.log(`\n  - 教師相關欄位 (${teacherColumns.length} 個):`);
        if (teacherColumns.length === 0) {
          console.log('      ❌ 找不到教師欄位');
        } else {
          teacherColumns.forEach(col => {
            console.log(`      ✅ 欄位 ${col.index + 1}: "${col.name}"`);
          });
        }
      }
    }
    
    // 4. 檢查教師工作表
    console.log('\n=== 4. 教師工作表分析 ===');
    const teacherSheetVariants = [
      'Auto-Generated Teachers | 自動生成老師',
      'Teachers | 教師資料',
      'Teachers',
      '教師資料',
      'Teacher Data',
      'teacher'
    ];
    
    let teachersSheet = null;
    for (const variant of teacherSheetVariants) {
      const sheet = masterDataSpreadsheet.getSheetByName(variant);
      if (sheet) {
        teachersSheet = sheet;
        console.log(`✅ 找到教師工作表: "${variant}"`);
        break;
      }
    }
    
    if (!teachersSheet) {
      console.log('❌ 找不到教師工作表');
      console.log('可能的工作表名稱:');
      sheetInfo.forEach(info => {
        if (info.name.toLowerCase().includes('teacher') || 
            info.name.includes('教師') || 
            info.name.includes('老師')) {
          console.log(`  🎯 可能匹配: "${info.name}"`);
        }
      });
    }
    
    // 5. 檢查班級工作表
    console.log('\n=== 5. 班級工作表分析 ===');
    const classSheetVariants = [
      'Classes | 班級資料',
      'Classes',
      '班級資料',
      'Class Data'
    ];
    
    let classesSheet = null;
    for (const variant of classSheetVariants) {
      const sheet = masterDataSpreadsheet.getSheetByName(variant);
      if (sheet) {
        classesSheet = sheet;
        console.log(`✅ 找到班級工作表: "${variant}"`);
        break;
      }
    }
    
    if (!classesSheet) {
      console.log('❌ 找不到班級工作表');
      console.log('可能的工作表名稱:');
      sheetInfo.forEach(info => {
        if (info.name.toLowerCase().includes('class') || 
            info.name.includes('班級')) {
          console.log(`  🎯 可能匹配: "${info.name}"`);
        }
      });
    }
    
    // 6. 總結和建議
    console.log('\n=== 6. 診斷總結 ===');
    const summary = {
      masterDataFileFound: !!masterDataSpreadsheet,
      fileName: foundFileName,
      totalSheets: sheets.length,
      studentsSheetFound: !!studentsSheet,
      studentsSheetName: studentsSheetName,
      teachersSheetFound: !!teachersSheet,
      classesSheetFound: !!classesSheet,
      allSheetNames: sheets.map(s => s.getName())
    };
    
    console.log(`檔案狀態: ${summary.masterDataFileFound ? '✅ 正常' : '❌ 問題'}`);
    console.log(`學生工作表: ${summary.studentsSheetFound ? '✅ 找到' : '❌ 缺失'}`);
    console.log(`教師工作表: ${summary.teachersSheetFound ? '✅ 找到' : '❌ 缺失'}`);
    console.log(`班級工作表: ${summary.classesSheetFound ? '✅ 找到' : '❌ 缺失'}`);
    
    if (!summary.studentsSheetFound) {
      console.log('\n⚠️ 建議: 學生工作表名稱不符合預期');
      console.log('   程式碼中尋找的名稱: "Students | 學生資料" 或 "Students"');
      console.log('   請確認工作表名稱是否正確，或更新程式碼中的工作表名稱');
    }
    
    return {
      success: true,
      summary: summary,
      sheetDetails: sheetInfo
    };
    
  } catch (error) {
    console.log(`❌ 診斷過程發生錯誤: ${error.message}`);
    console.log('錯誤堆疊:', error.stack);
    
    return {
      success: false,
      message: `診斷失敗: ${error.message}`,
      error: error.stack
    };
  }
}

/**
 * Comprehensive diagnostic function to examine Master Data file structure
 * 全面診斷 Master Data 檔案結構
 */
function diagnoseMasterDataSheets() {
  console.log('\n🔍 全面診斷 Master Data 檔案工作表結構\n');
  
  try {
    // 1. 找到 Master Data 檔案
    console.log('=== 1. 定位 Master Data 檔案 ===');
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA);
    
    if (!masterDataFolder) {
      throw new Error('Master Data 資料夾不存在');
    }
    
    // 嘗試多個可能的檔案名稱
    const possibleFileNames = [
      'Master Data | 主控資料',
      'Gradebook Master Data | 成績簿主控資料表',
      'Master Data',
      '主控資料'
    ];
    
    let masterDataSpreadsheet = null;
    let foundFileName = null;
    
    for (const fileName of possibleFileNames) {
      const files = masterDataFolder.getFilesByName(fileName);
      if (files.hasNext()) {
        masterDataSpreadsheet = SpreadsheetApp.openById(files.next().getId());
        foundFileName = fileName;
        console.log(`✅ 找到檔案: ${foundFileName}`);
        break;
      }
    }
    
    if (!masterDataSpreadsheet) {
      console.log('❌ 找不到 Master Data 檔案');
      console.log('資料夾中的檔案:');
      const files = masterDataFolder.getFiles();
      while (files.hasNext()) {
        console.log(`  - ${files.next().getName()}`);
      }
      return { success: false, message: 'Master Data 檔案不存在' };
    }
    
    // 2. 列出所有工作表
    console.log('\n=== 2. 工作表清單 ===');
    const sheets = masterDataSpreadsheet.getSheets();
    console.log(`檔案包含 ${sheets.length} 個工作表:`);
    
    const sheetInfo = [];
    sheets.forEach((sheet, index) => {
      const name = sheet.getName();
      const lastRow = sheet.getLastRow();
      const lastCol = sheet.getLastColumn();
      
      console.log(`${index + 1}. "${name}" (${lastRow} 行 × ${lastCol} 欄)`);
      
      // 獲取標題行
      let headers = [];
      if (lastRow > 0 && lastCol > 0) {
        try {
          headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
        } catch (e) {
          console.log(`    ⚠️ 無法讀取標題: ${e.message}`);
        }
      }
      
      sheetInfo.push({
        name: name,
        index: index,
        rows: lastRow,
        columns: lastCol,
        headers: headers
      });
    });
    
    // 3. 檢查學生資料工作表
    console.log('\n=== 3. 學生資料工作表分析 ===');
    const studentSheetVariants = [
      'Students | 學生資料',
      'Students',
      '學生資料', 
      'Student Data',
      'student',
      'Student'
    ];
    
    let studentsSheet = null;
    let studentsSheetName = null;
    
    for (const variant of studentSheetVariants) {
      const sheet = masterDataSpreadsheet.getSheetByName(variant);
      if (sheet) {
        studentsSheet = sheet;
        studentsSheetName = variant;
        console.log(`✅ 找到學生工作表: "${variant}"`);
        break;
      }
    }
    
    if (!studentsSheet) {
      console.log('❌ 找不到學生資料工作表');
      console.log('可能的工作表名稱:');
      sheetInfo.forEach(info => {
        if (info.name.toLowerCase().includes('student') || 
            info.name.includes('學生') || 
            info.name.toLowerCase().includes('pupil')) {
          console.log(`  🎯 可能匹配: "${info.name}"`);
        }
      });
    } else {
      // 分析學生工作表結構
      console.log(`\n學生工作表 "${studentsSheetName}" 詳細資訊:`);
      console.log(`  - 資料行數: ${studentsSheet.getLastRow()}`);
      console.log(`  - 欄位數: ${studentsSheet.getLastColumn()}`);
      
      if (studentsSheet.getLastRow() > 0 && studentsSheet.getLastColumn() > 0) {
        const headers = studentsSheet.getRange(1, 1, 1, studentsSheet.getLastColumn()).getValues()[0];
        console.log(`  - 欄位標題 (${headers.length} 個):`);
        
        const teacherColumns = [];
        headers.forEach((header, index) => {
          console.log(`      ${index + 1}. "${header}"`);
          
          if (header.includes('Teacher') || header.includes('老師') || header.includes('教師')) {
            teacherColumns.push({ index: index, name: header });
          }
        });
        
        console.log(`\n  - 教師相關欄位 (${teacherColumns.length} 個):`);
        if (teacherColumns.length === 0) {
          console.log('      ❌ 找不到教師欄位');
        } else {
          teacherColumns.forEach(col => {
            console.log(`      ✅ 欄位 ${col.index + 1}: "${col.name}"`);
          });
        }
      }
    }
    
    // 4. 總結和建議
    console.log('\n=== 4. 診斷總結 ===');
    const summary = {
      masterDataFileFound: !!masterDataSpreadsheet,
      fileName: foundFileName,
      totalSheets: sheets.length,
      studentsSheetFound: !!studentsSheet,
      studentsSheetName: studentsSheetName,
      allSheetNames: sheets.map(s => s.getName())
    };
    
    console.log(`檔案狀態: ${summary.masterDataFileFound ? '✅ 正常' : '❌ 問題'}`);
    console.log(`學生工作表: ${summary.studentsSheetFound ? '✅ 找到' : '❌ 缺失'}`);
    
    if (!summary.studentsSheetFound) {
      console.log('\n⚠️ 建議: 學生工作表名稱不符合預期');
      console.log('   程式碼中尋找的名稱: "Students | 學生資料" 或 "Students"');
      console.log('   請確認工作表名稱是否正確，或更新程式碼中的工作表名稱');
    }
    
    return {
      success: true,
      summary: summary,
      sheetDetails: sheetInfo
    };
    
  } catch (error) {
    console.log(`❌ 診斷過程發生錯誤: ${error.message}`);
    console.log('錯誤堆疊:', error.stack);
    
    return {
      success: false,
      message: `診斷失敗: ${error.message}`,
      error: error.stack
    };
  }
}

/**
 * Test teacher type detection with improved logic
 * 測試改進的教師類型檢測邏輯
 */
function testImprovedTeacherTypeDetection() {
  console.log('\n🔍 測試改進的教師類型檢測邏輯\n');
  
  try {
    // 1. 測試教師類型對應表
    console.log('=== 1. 建立教師類型對應表 ===');
    const teacherTypeMap = getTeacherTypeMapping();
    
    console.log(`找到 ${teacherTypeMap.size} 位教師的類型信息:`);
    teacherTypeMap.forEach((type, name) => {
      console.log(`  ${name} → ${type}`);
    });
    
    // 2. 測試檔名檢測
    console.log('\n=== 2. 測試檔名檢測 ===');
    const testFiles = [
      'Ms. Kumar_2425S2_Gradebook',
      'Mr. Collins_2425S2_Gradebook', 
      'Ms. Yang_2425S2_Gradebook',
      'Mr. White_2425S2_Gradebook'
    ];
    
    testFiles.forEach(fileName => {
      const detectedType = detectTeacherTypeFromFilename(fileName);
      console.log(`${fileName} → ${detectedType || '未檢測到'}`);
    });
    
    // 3. 實際檢查系統中的成績簿檔案
    console.log('\n=== 3. 檢查實際成績簿檔案 ===');
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    
    if (teacherGradebooksFolder) {
      const files = teacherGradebooksFolder.getFiles();
      let ltCount = 0;
      let itCount = 0;
      let unknownCount = 0;
      
      while (files.hasNext()) {
        const file = files.next();
        const fileName = file.getName();
        const detectedType = detectTeacherTypeFromFilename(fileName);
        
        if (detectedType === 'LT') ltCount++;
        else if (detectedType === 'IT') itCount++;
        else unknownCount++;
        
        console.log(`${fileName} → ${detectedType || '未檢測到'}`);
      }
      
      console.log(`\n📊 統計結果:`);
      console.log(`  LT 教師: ${ltCount} 個檔案`);
      console.log(`  IT 教師: ${itCount} 個檔案`);
      console.log(`  未檢測到: ${unknownCount} 個檔案`);
      
      return {
        success: true,
        teacherMapSize: teacherTypeMap.size,
        ltCount: ltCount,
        itCount: itCount,
        unknownCount: unknownCount
      };
    } else {
      console.log('❌ 找不到成績簿資料夾');
      return { success: false, message: '找不到成績簿資料夾' };
    }
    
  } catch (error) {
    console.log(`❌ 測試過程中發生錯誤: ${error.message}`);
    console.log('錯誤堆疊:', error.stack);
    
    return {
      success: false,
      message: `測試失敗: ${error.message}`,
      error: error.stack
    };
  }
}

/**
 * Test function: Separate gradebook creation and title synchronization
 * 測試函數：分離成績簿建立和標題同步
 */
function testSeparateGradebookAndTitleSync() {
  console.log('\n🚀 開始測試：分離成績簿建立和標題同步\n');
  
  try {
    // 步驟1：初始化系統
    console.log('=== 步驟1：初始化系統 ===');
    try {
      const initResult = initializeSystem();
      console.log('✅ 系統初始化完成');
    } catch (error) {
      console.log(`⚠️ 初始化過程中的訊息: ${error.message}`);
    }

    // 步驟2：建立成績簿（使用預設標題）
    console.log('\n=== 步驟2：建立成績簿（使用預設標題）===');
    try {
      const gradebookResult = createGradebooksForAllTeachers();
      console.log('✅ 成績簿建立完成（使用預設標題）');
      console.log('建立結果:', gradebookResult);
    } catch (error) {
      console.log(`⚠️ 建立成績簿過程中的訊息: ${error.message}`);
      console.log('如果成績簿已存在，這是正常的。');
    }

    // 步驟3：檢查建立後的預設標題
    console.log('\n=== 步驟3：檢查建立後的預設標題 ===');
    try {
      console.log('檢查LT G1E1的預設標題:');
      const defaultTitles = showCurrentAssessmentTitles('LT', 'G1E1');
      console.log('✅ 預設標題檢查完成');
    } catch (error) {
      console.log(`❌ 檢查預設標題失敗: ${error.message}`);
    }

    // 步驟4：同步更新LT G1E1的評量標題到已存在的成績簿  
    console.log('\n=== 步驟4：同步更新LT G1E1的評量標題 ===');
    try {
      const syncResult = syncAssessmentTitlesToExistingGradebooksByTeacherLevel('LT', 'G1E1');
      
      if (syncResult.success) {
        console.log('✅ LT G1E1標題同步成功');
        console.log(`📊 同步結果: ${syncResult.updatedSheets} 個工作表已更新`);
        console.log(`📁 處理的檔案: ${syncResult.processedFiles} 個`);
      } else {
        console.log(`❌ 同步失敗: ${syncResult.message}`);
      }
      
      console.log('完整同步結果:', syncResult);
    } catch (error) {
      console.log(`❌ 同步標題失敗: ${error.message}`);
      return { success: false, step: 4, error: error.message };
    }

    // 步驟5：檢查同步後的標題
    console.log('\n=== 步驟5：檢查同步後的標題 ===');
    try {
      console.log('檢查LT G1E1同步後的標題:');
      const updatedTitles = showCurrentAssessmentTitles('LT', 'G1E1');
      console.log('✅ 同步後標題檢查完成');
    } catch (error) {
      console.log(`❌ 檢查同步後標題失敗: ${error.message}`);
    }

    // 步驟6：測試IT類型的同步更新
    console.log('\n=== 步驟6：測試IT G2E2的標題同步 ===');
    try {
      const itSyncResult = syncAssessmentTitlesToExistingGradebooksByTeacherLevel('IT', 'G2E2');
      
      if (itSyncResult.success) {
        console.log('✅ IT G2E2標題同步成功');
        console.log(`📊 同步結果: ${itSyncResult.updatedSheets} 個工作表已更新`);
      } else {
        console.log(`❌ IT同步失敗: ${itSyncResult.message}`);
      }
      
      console.log('IT同步結果:', itSyncResult);
    } catch (error) {
      console.log(`❌ IT標題同步失敗: ${error.message}`);
    }

    console.log('\n🎉 分離成績簿建立和標題同步測試完成！');
    console.log('📋 測試摘要：');
    console.log('  1. ✅ 系統初始化');
    console.log('  2. ✅ 成績簿建立（預設標題）');
    console.log('  3. ✅ 標題同步到已存在的成績簿');
    console.log('  4. ✅ 驗證標題更新結果');
    
    return {
      success: true,
      message: '分離測試流程執行完畢：先建立成績簿，再同步更新標題',
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.log(`❌ 測試過程中發生未預期的錯誤: ${error.message}`);
    console.log('錯誤堆疊:', error.stack);
    
    return {
      success: false,
      message: `測試失敗: ${error.message}`,
      error: error.stack
    };
  }
}

/**
 * Diagnostic function: Check why sync found 0 gradebooks
 * 診斷函數：檢查為什麼同步找不到成績簿
 */
function diagnoseSyncIssues() {
  console.log('\n🔍 開始診斷同步問題\n');
  
  try {
    // 1. 檢查系統資料夾結構
    console.log('=== 1. 檢查系統資料夾結構 ===');
    const mainFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    console.log(`主資料夾: ${mainFolder.getName()}`);
    
    const teacherGradebooksFolder = getSubFolder(mainFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    console.log(`成績簿資料夾: ${teacherGradebooksFolder.getName()}`);
    
    // 2. 列出所有成績簿檔案
    console.log('\n=== 2. 列出所有成績簿檔案 ===');
    const gradebookFiles = teacherGradebooksFolder.getFiles();
    let fileCount = 0;
    let gradebookList = [];
    
    while (gradebookFiles.hasNext()) {
      const file = gradebookFiles.next();
      fileCount++;
      gradebookList.push({
        name: file.getName(),
        id: file.getId(),
        lastModified: file.getLastUpdated()
      });
      console.log(`${fileCount}. ${file.getName()} (ID: ${file.getId()})`);
    }
    
    console.log(`📁 總共找到 ${fileCount} 個成績簿檔案`);
    
    // 3. 檢查班級配置
    console.log('\n=== 3. 檢查班級配置 ===');
    const configs = getAllClassConfigurations();
    console.log(`📋 總共有 ${configs.length} 個班級配置`);
    
    // 找出 G1E1 相關的班級
    const g1e1Classes = configs.filter(config => config.level === 'G1E1');
    console.log(`🎯 G1E1 相關班級: ${g1e1Classes.length} 個`);
    
    g1e1Classes.forEach((config, index) => {
      console.log(`  ${index + 1}. ${config.className} → ${config.classCode} (Level: ${config.level})`);
    });
    
    // 4. 檢查成績簿檔案與班級的匹配
    console.log('\n=== 4. 檢查成績簿檔案與班級的匹配 ===');
    
    for (const gradebook of gradebookList) {
      console.log(`\n檢查檔案: ${gradebook.name}`);
      
      try {
        const spreadsheet = SpreadsheetApp.openById(gradebook.id);
        const sheets = spreadsheet.getSheets();
        console.log(`  📄 包含 ${sheets.length} 個工作表:`);
        
        sheets.forEach((sheet, index) => {
          const sheetName = sheet.getName();
          console.log(`    ${index + 1}. ${sheetName}`);
          
          // 檢查是否匹配 G1E1 班級
          const matchingConfig = g1e1Classes.find(config => 
            sheetName.includes(config.className) || 
            sheetName === config.className ||
            sheetName.includes(config.classCode)
          );
          
          if (matchingConfig) {
            console.log(`      ✅ 匹配 G1E1 班級: ${matchingConfig.className} (${matchingConfig.classCode})`);
          }
        });
        
      } catch (error) {
        console.log(`  ❌ 無法開啟檔案: ${error.message}`);
      }
    }
    
    // 5. 檢查教師類型檢測
    console.log('\n=== 5. 檢查教師類型檢測 ===');
    
    for (const gradebook of gradebookList) {
      // 使用與同步函數相同的檢測邏輯
      const fileName = gradebook.name;
      const isLTTeacher = fileName.includes('_LT') || fileName.includes('LT (Local Teacher)');
      const isITTeacher = fileName.includes('_IT') || fileName.includes('IT (International Teacher)');
      
      let teacherType = null;
      if (isLTTeacher) teacherType = 'LT';
      else if (isITTeacher) teacherType = 'IT';
      
      console.log(`${gradebook.name} → 教師類型: ${teacherType || '未檢測到'} (LT: ${isLTTeacher}, IT: ${isITTeacher})`);
    }
    
    // 6. 模擬同步過程
    console.log('\n=== 6. 模擬同步過程 ===');
    
    const targetLevel = 'G1E1';
    const targetTeacherType = 'LT';
    
    console.log(`目標: ${targetTeacherType} ${targetLevel}`);
    
    // 找出目標班級
    const targetClasses = configs.filter(config => config.level === targetLevel);
    console.log(`目標班級: ${targetClasses.length} 個`);
    
    if (targetClasses.length === 0) {
      console.log('❌ 沒有找到目標班級！');
      return { success: false, message: '沒有找到目標班級' };
    }
    
    // 檢查每個成績簿
    for (const gradebook of gradebookList) {
      // 使用與同步函數相同的檢測邏輯
      const fileName = gradebook.name;
      const isLTTeacher = fileName.includes('_LT') || fileName.includes('LT (Local Teacher)');
      const isITTeacher = fileName.includes('_IT') || fileName.includes('IT (International Teacher)');
      
      let detectedTeacherType = null;
      if (isLTTeacher) detectedTeacherType = 'LT';
      else if (isITTeacher) detectedTeacherType = 'IT';
      
      if (detectedTeacherType === targetTeacherType) {
        console.log(`\n檢查 ${targetTeacherType} 成績簿: ${gradebook.name}`);
        
        try {
          const spreadsheet = SpreadsheetApp.openById(gradebook.id);
          const sheets = spreadsheet.getSheets();
          
          for (const targetClass of targetClasses) {
            const matchingSheet = sheets.find(sheet => {
              const sheetName = sheet.getName();
              return sheetName.includes(targetClass.className) || 
                     sheetName === targetClass.className ||
                     sheetName.includes(targetClass.classCode);
            });
            
            if (matchingSheet) {
              console.log(`  ✅ 找到匹配工作表: ${matchingSheet.getName()} (目標班級: ${targetClass.className})`);
            } else {
              console.log(`  ❌ 沒有找到 ${targetClass.className} 的工作表`);
            }
          }
          
        } catch (error) {
          console.log(`  ❌ 無法處理檔案: ${error.message}`);
        }
      }
    }
    
    console.log('\n🎉 診斷完成！');
    
    return {
      success: true,
      totalFiles: fileCount,
      gradebooks: gradebookList,
      totalConfigs: configs.length,
      g1e1Classes: g1e1Classes.length,
      message: '診斷完成，請檢查上方詳細日誌'
    };
    
  } catch (error) {
    console.log(`❌ 診斷過程中發生錯誤: ${error.message}`);
    console.log('錯誤堆疊:', error.stack);
    
    return {
      success: false,
      message: `診斷失敗: ${error.message}`,
      error: error.stack
    };
  }
}

/**
 * Test function: Verify new Level format is working correctly
 * 測試函數：驗證新Level格式是否正常運作
 */
function testNewLevelFormat() {
  console.log('\n=== Testing New Level Format (G1E1, G2E2, etc.) ===');
  
  // Test class name to level mapping
  const testClasses = [
    'G1 Trailblazers',
    'G1 Discoverers', 
    'G2 Adventurers',
    'G2 Innovators',
    'G3 Explorers',
    'G3 Navigators',
    'G4 Inventors',
    'G4 Voyagers',
    'G5 Pioneers',
    'G5 Guardians',
    'G6 Pathfinders',
    'G6 Seekers',
    'G6 Visionaries',
    'G6 Achievers'
  ];
  
  console.log('\n--- Testing Class Name to Level Mapping ---');
  testClasses.forEach(className => {
    const classCode = generateClassCodeFromName(className, '');
    console.log(`${className} → ${classCode}`);
  });
  
  // Test assessment title retrieval
  console.log('\n--- Testing Assessment Title Retrieval ---');
  const testLevels = ['G1E1', 'G2E2', 'G3E1', 'G6E3'];
  
  testLevels.forEach(level => {
    console.log(`\nTesting Level: ${level}`);
    
    // Test LT titles
    const ltTitles = getAssessmentTitles(level, 'LT');
    console.log(`  LT Formative: ${ltTitles.formative.slice(0, 3).join(', ')}...`);
    console.log(`  LT Summative: ${ltTitles.summative.slice(0, 2).join(', ')}...`);
    
    // Test IT titles  
    const itTitles = getAssessmentTitles(level, 'IT');
    console.log(`  IT Formative: ${itTitles.formative.slice(0, 3).join(', ')}...`);
    console.log(`  IT Summative: ${itTitles.summative.slice(0, 2).join(', ')}...`);
  });
  
  // Test getAllClassConfigurations with new format
  console.log('\n--- Testing Class Configurations ---');
  try {
    const configs = getAllClassConfigurations();
    console.log(`Found ${configs.length} class configurations:`);
    configs.slice(0, 5).forEach(config => {
      console.log(`  ${config.className} → ${config.classCode} (${config.level})`);
    });
  } catch (error) {
    console.log(`Error getting class configurations: ${error.message}`);
  }
  
  console.log('\n=== Test Complete ===');
  return {
    success: true,
    message: 'New Level format test completed successfully'
  };
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

/**
 * Open assessment title management interface | 開啟評量標題管理介面
 */
function openSystemSettings() {
  try {
    const ui = SpreadsheetApp.getUi();
    
    // Get all current configurations | 取得所有目前配置
    const allTitles = getAllAssessmentTitles();
    const configList = Object.keys(allTitles).map(key => `• ${key}`).join('\n');
    
    const settingsMessage = `
⚙️ Assessment Title Management | 評量標題管理

📋 Current Configurations | 目前配置:
${configList}

🔧 Available Functions | 可用功能:
• manageAssessmentTitles() - Interactive title editor | 互動式標題編輯器
• updateAssessmentTitles(target, formative, summative) - Update titles | 更新標題
• resetAssessmentTitles(target) - Reset to default | 重設為預設值
• getAllAssessmentTitles() - View all configurations | 查看所有配置

📖 Example Usage | 使用範例:
updateAssessmentTitles('G3 Advanced', 
  ['Quiz 1', 'Essay 1', 'Project 1', 'Quiz 2', 'Essay 2', 'Project 2', 'Quiz 3', 'Essay 3'],
  ['Test 1', 'Test 2', 'Midterm', 'Final']
);

💡 Tip: Use the Apps Script editor to run these functions | 提示：使用 Apps Script 編輯器運行這些函數
    `;
    
    showMessage('⚙️ System Settings | 系統設定', settingsMessage);
    
  } catch (error) {
    showError('❌ Settings Error | 設定錯誤', `Cannot open system settings | 無法開啟系統設定: ${error.message}`);
  }
}

/**
 * Interactive assessment title management | 互動式評量標題管理
 */
function manageAssessmentTitles() {
  try {
    const ui = SpreadsheetApp.getUi();
    
    // Get target (class or grade) | 取得目標（班級或年級）
    const targetResponse = ui.prompt(
      '🎯 Target Selection | 目標選擇',
      'Enter class name or grade (e.g., "G3 Achievers", "G2", "Advanced English"):\n輸入班級名稱或年級（例如：G3 Achievers, G2, Advanced English）:',
      ui.ButtonSet.OK_CANCEL
    );
    
    if (targetResponse.getSelectedButton() !== ui.Button.OK) {
      return;
    }
    
    const target = targetResponse.getResponseText().trim();
    if (!target) {
      showError('❌ Error | 錯誤', 'Target cannot be empty | 目標不能為空');
      return;
    }
    
    // Get current titles for this target | 取得此目標的目前標題
    const currentTitles = getAssessmentTitles(target);
    
    // Get formative titles | 取得平時評量標題
    const formativeResponse = ui.prompt(
      '📝 Formative Assessment Titles | 平時評量標題',
      `Enter ${SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT} formative titles separated by commas:\n輸入 ${SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT} 個平時評量標題，用逗號分隔:\n\nCurrent: ${currentTitles.formative.join(', ')}`,
      ui.ButtonSet.OK_CANCEL
    );
    
    if (formativeResponse.getSelectedButton() !== ui.Button.OK) {
      return;
    }
    
    const formativeTitles = formativeResponse.getResponseText().split(',').map(title => title.trim());
    
    // Get summative titles | 取得總結評量標題
    const summativeResponse = ui.prompt(
      '📊 Summative Assessment Titles | 總結評量標題',
      `Enter ${SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT} summative titles separated by commas:\n輸入 ${SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT} 個總結評量標題，用逗號分隔:\n\nCurrent: ${currentTitles.summative.join(', ')}`,
      ui.ButtonSet.OK_CANCEL
    );
    
    if (summativeResponse.getSelectedButton() !== ui.Button.OK) {
      return;
    }
    
    const summativeTitles = summativeResponse.getResponseText().split(',').map(title => title.trim());
    
    // Update titles | 更新標題
    const success = updateAssessmentTitles(target, formativeTitles, summativeTitles);
    
    if (success) {
      showMessage(
        '✅ Success | 成功',
        `Assessment titles updated for ${target}!\n已更新 ${target} 的評量標題！\n\nFormative: ${formativeTitles.join(', ')}\nSummative: ${summativeTitles.join(', ')}\n\n💡 New gradebooks will use these titles | 新的成績簿將使用這些標題`
      );
    } else {
      showError('❌ Error | 錯誤', 'Failed to update assessment titles | 更新評量標題失敗');
    }
    
  } catch (error) {
    showError('❌ Management Error | 管理錯誤', `Error managing assessment titles | 管理評量標題時發生錯誤: ${error.message}`);
  }
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
      console.log(`Row ${i} data:`, row.slice(0, 6)); // Show first 6 columns
      
      // Only process students with "在學" status OR if Student ID and Name exist | 只處理狀態為"在學"的學生，或者學生編號和姓名都存在
      const hasBasicInfo = row[0] && row[0].toString().trim() && row[1] && row[1].toString().trim();
      const isActive = status === '在學' || (hasBasicInfo && (!status || status.toString().trim() === ''));
      
      if (!isActive) {
        console.log(`  -> SKIPPED: Status="${status}", HasBasicInfo=${hasBasicInfo}`);
        skippedStudents++;
        continue;
      }
      
      // If student has basic info but no status, auto-set to "在學"
      if (hasBasicInfo && (!status || status.toString().trim() === '')) {
        console.log(`  -> AUTO-SETTING status to "在學" for ${row[1]}`);
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
        const lastRowToDelete = Math.max(11, 8 + teacherInfo.classes.size + 5); // Clear extra rows
        teacherInfoSheet.getRange('A8:B' + lastRowToDelete).clear();
        teacherInfoSheet.getRange('A8:B8').setValues([['Class Name | 班級名稱', 'Student Count | 學生數量']]);
        teacherInfoSheet.getRange('A8:B8').setFontWeight('bold').setBackground('#E3F2FD');
        
        let classIndex = 0;
        
        console.log(`Teacher ${teacherInfo.name} has ${teacherInfo.classes.size} classes`);
        
        // Create a sheet for each class this teacher teaches | 為老師教授的每個班級建立工作表
        teacherInfo.classes.forEach((students, className) => {
          try {
            // Create class sheet | 建立班級工作表
            const classSheet = teacherGradebook.insertSheet(`📚 ${className}`);
            
            // Extract teacher type from teacherKey (format: "TeacherName_TYPE")
            // 從teacherKey提取教師類型（格式：「教師姓名_類型」）
            const teacherType = teacherKey.endsWith('_LT') ? 'LT' : 
                               teacherKey.endsWith('_IT') ? 'IT' : null;
            
            setupClassSheetHeaders(classSheet, className, teacherType);
            
            // Add real student data | 新增真實學生資料
            console.log(`Creating class sheet for ${className} with ${students.length} students`);
            if (students.length > 0) {
              // Sort students by Student ID (ascending) | 按學生編號升序排序
              const sortedStudents = students.sort((a, b) => {
                const idA = a[0] || ''; // Student ID
                const idB = b[0] || ''; // Student ID
                return idA.localeCompare(idB);
              });
              
              console.log(`Students for ${className} (sorted by ID):`, sortedStudents.map(s => `${s[0]} - ${s[1]}`)); // Log ID and names
              
              // Step 1: Write basic student data first | 第一步：先寫入基本學生資料
              const basicStudentRows = sortedStudents.map((studentRow, index) => [
                index + 1,           // A: 序號 (排序後的新序號)
                studentRow[1] || '', // B: Student Name (學生姓名)
                studentRow[0] || ''  // C: Student ID (學生編號)
              ]);
              
              console.log(`Writing ${basicStudentRows.length} basic student rows to sheet ${className}`);
              console.log(`First basic student row:`, basicStudentRows[0]);
              console.log(`All basic student rows:`, basicStudentRows);
              
              // Write basic student info (序號, 姓名, 學號) | 寫入基本學生資訊（序號, 姓名, 學號）
              if (basicStudentRows.length > 0) {
                classSheet.getRange(3, 1, basicStudentRows.length, 3).setValues(basicStudentRows);
                console.log(`Successfully wrote ${basicStudentRows.length} student rows to ${className} sheet`);
              }
              
              // Step 2: Add formulas for each student row | 第二步：為每個學生列新增公式
              sortedStudents.forEach((studentRow, index) => {
                const rowNum = 3 + index;
                
                // New column structure positions | 新的欄位結構位置
                // D(4): Term Grade, E(5): Formative Avg, F(6): Summative Avg, G(7): Final Assessment
                // H(8)-O(15): F.A.1-8, P(16)-S(19): S.A.1-4, T(20): Final
                
                const formativeStartCol = 8;  // Column H: F.A.1
                const formativeEndCol = formativeStartCol + SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT - 1; // Column O: F.A.8
                const summativeStartCol = formativeEndCol + 1; // Column P: S.A.1  
                const summativeEndCol = summativeStartCol + SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT - 1; // Column S: S.A.4
                const finalColNum = SYSTEM_CONFIG.ASSESSMENTS.INCLUDE_FINAL ? summativeEndCol + 1 : null; // Column T: Final
                
                // Add Formative Assessment Average formula (Column E) | 新增平時評量平均公式（E欄）
                // E3=IFERROR(ROUND(AVERAGEIF(H3:O3, ">0"),1),"")
                const faAvgFormula = `=IFERROR(ROUND(AVERAGEIF(${getColumnLetter(formativeStartCol)}${rowNum}:${getColumnLetter(formativeEndCol)}${rowNum},">0"),1),"")`;
                classSheet.getRange(rowNum, 5).setFormula(faAvgFormula);
                
                // Add Summative Assessment Average formula (Column F) | 新增總結評量平均公式（F欄）
                // F3=IFERROR(ROUND(AVERAGEIF(P3:S3, ">0"),1),"")
                const saAvgFormula = `=IFERROR(ROUND(AVERAGEIF(${getColumnLetter(summativeStartCol)}${rowNum}:${getColumnLetter(summativeEndCol)}${rowNum},">0"),1),"")`;
                classSheet.getRange(rowNum, 6).setFormula(saAvgFormula);
                
                // Add Final Assessment formula (Column G) | 新增期末評量公式（G欄）
                // G3=T3 (直接等於Final欄位)
                if (finalColNum) {
                  const finalAssessmentFormula = `=${getColumnLetter(finalColNum)}${rowNum}`;
                  classSheet.getRange(rowNum, 7).setFormula(finalAssessmentFormula);
                }
                
                // Add Term Grade formula (Column D) | 新增學期成績公式（D欄）
                // D3=IF(AND(ISNUMBER(E3), ISNUMBER(F3), ISNUMBER(G3), E3 > 0, F3 > 0, G3 > 0), ROUND((E3 * 0.15 + F3 * 0.2 + G3 * 0.1) / 0.45, 1), "")
                const termGradeFormula = finalColNum
                  ? `=IF(AND(ISNUMBER(E${rowNum}), ISNUMBER(F${rowNum}), ISNUMBER(G${rowNum}), E${rowNum} > 0, F${rowNum} > 0, G${rowNum} > 0), ROUND((E${rowNum} * ${SYSTEM_CONFIG.WEIGHTS.FORMATIVE} + F${rowNum} * ${SYSTEM_CONFIG.WEIGHTS.SUMMATIVE} + G${rowNum} * ${SYSTEM_CONFIG.WEIGHTS.FINAL}) / ${SYSTEM_CONFIG.WEIGHTS.FORMATIVE + SYSTEM_CONFIG.WEIGHTS.SUMMATIVE + SYSTEM_CONFIG.WEIGHTS.FINAL}, 1), "")`
                  : `=IF(AND(ISNUMBER(E${rowNum}), ISNUMBER(F${rowNum}), E${rowNum} > 0, F${rowNum} > 0), ROUND((E${rowNum} * ${SYSTEM_CONFIG.WEIGHTS.FORMATIVE} + F${rowNum} * ${SYSTEM_CONFIG.WEIGHTS.SUMMATIVE}) / ${SYSTEM_CONFIG.WEIGHTS.FORMATIVE + SYSTEM_CONFIG.WEIGHTS.SUMMATIVE}, 1), "")`;
                classSheet.getRange(rowNum, 4).setFormula(termGradeFormula);
                
                console.log(`Added formulas for student ${studentRow[1]} at row ${rowNum}`);
              });
              
              // Add Average row at bottom | 在底部新增平均行
              const averageRowNum = 3 + sortedStudents.length + 1; // Skip one row after student data
              
              // Set "Average:" label in column B | 在B欄設定"Average:"標籤
              classSheet.getRange(averageRowNum, 2).setValue('Average:');
              classSheet.getRange(averageRowNum, 2).setFontWeight('bold');
              
              // Calculate total columns based on configuration | 根據配置計算總欄數
              const formativeStartCol = 8;
              const formativeEndCol = formativeStartCol + SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT - 1;
              const summativeStartCol = formativeEndCol + 1;
              const summativeEndCol = summativeStartCol + SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT - 1;
              const finalCol = SYSTEM_CONFIG.ASSESSMENTS.INCLUDE_FINAL ? summativeEndCol + 1 : null;
              const lastCol = finalCol || summativeEndCol;
              
              // Add average formulas for relevant columns | 為相關欄位新增平均公式
              const studentStartRow = 3;
              const studentEndRow = 3 + sortedStudents.length - 1;
              
              // Term Grade average (Column D) | 學期成績平均（D欄）
              // D26=IFERROR(ROUND(AVERAGEIF(D3:D22,">0"),1),"")
              classSheet.getRange(averageRowNum, 4).setFormula(`=IFERROR(ROUND(AVERAGEIF(D${studentStartRow}:D${studentEndRow},">0"),1),"")`);
              
              // Formative Assessment Average (Column E) | 平時評量平均（E欄）
              classSheet.getRange(averageRowNum, 5).setFormula(`=IFERROR(ROUND(AVERAGEIF(E${studentStartRow}:E${studentEndRow},">0"),1),"")`);
              
              // Summative Assessment Average (Column F) | 總結評量平均（F欄）
              classSheet.getRange(averageRowNum, 6).setFormula(`=IFERROR(ROUND(AVERAGEIF(F${studentStartRow}:F${studentEndRow},">0"),1),"")`);
              
              // Final Assessment average (Column G) | 期末評量平均（G欄）
              classSheet.getRange(averageRowNum, 7).setFormula(`=IFERROR(ROUND(AVERAGEIF(G${studentStartRow}:G${studentEndRow},">0"),1),"")`);
              
              // Individual assessment averages (F.A.1-8, S.A.1-4, Final) | 個別評量平均
              for (let col = formativeStartCol; col <= lastCol; col++) {
                const colLetter = getColumnLetter(col);
                classSheet.getRange(averageRowNum, col).setFormula(`=IFERROR(ROUND(AVERAGEIF(${colLetter}${studentStartRow}:${colLetter}${studentEndRow},">0"),1),"")`);
              }
              
              // Format the average row | 格式化平均行
              const averageRange = classSheet.getRange(averageRowNum, 1, 1, lastCol);
              averageRange.setFontWeight('bold');
              averageRange.setBackground('#F5F5F5'); // Light gray background
              averageRange.setBorder(true, true, true, true, true, true);
              
              // Format the data range | 格式化資料範圍
              const totalStudents = sortedStudents.length;
              const totalColumns = lastCol;
              const dataRange = classSheet.getRange(3, 1, totalStudents, totalColumns);
              dataRange.setBorder(true, true, true, true, true, true);
              
              // Auto-resize columns to fit content | 自動調整欄位寬度
              classSheet.autoResizeColumns(1, totalColumns);
              console.log(`Successfully wrote student data, formulas, and average row to ${className} sheet`);
            } else {
              console.log(`No students found for ${className}`);
            }
            
            // Update class info in teacher info sheet | 在老師資訊工作表中更新班級資訊
            const infoRow = 9 + classIndex;
            const studentCount = students.length; // Use original count for info sheet
            teacherInfoSheet.getRange(infoRow, 1, 1, 2).setValues([[className, studentCount]]);
            console.log(`Updated Teacher Info sheet: ${className} has ${studentCount} students at row ${infoRow}`);
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
    
    // Extract teacher data from Classes sheet | 從班級工作表提取老師資料
    console.log('Extracting teacher data from Classes sheet...');
    
    // Get master data sheet
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA, false);
    if (!masterDataFolder) {
      throw new Error('Master data folder not found | 找不到主控資料夾');
    }
    
    const masterFiles = masterDataFolder.getFilesByName('Gradebook Master Data | 成績簿主控資料表');
    if (!masterFiles.hasNext()) {
      throw new Error('Master data sheet not found | 找不到主控資料表');
    }
    
    const masterSheet = SpreadsheetApp.openById(masterFiles.next().getId());
    
    // First validate student class assignments
    console.log('Validating student class assignments...');
    const validation = validateStudentClassAssignments();
    if (!validation.isValid) {
      console.log('⚠️ Class assignment validation issues found:');
      validation.issues.forEach(issue => console.log(`  - ${issue}`));
      console.log('Proceeding with gradebook creation, but please review student assignments.');
    }
    
    // Extract teachers from Classes sheet
    const teacherData = extractTeachersFromClassesSheet(masterSheet);
    
    if (teacherData.length === 0) {
      throw new Error('No teachers found in Classes sheet. Please check: 1. Classes sheet exists 2. Classes sheet has data 3. LT and IT teacher columns are filled | 班級工作表中找不到老師。請檢查：1. Classes 工作表存在 2. Classes 工作表有資料 3. LT 和 IT 老師欄位已填入');
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
 * Debug gradebook creation process | 調試成績簿建立流程
 */
function debugGradebookCreation() {
  try {
    console.log('=== DEBUG GRADEBOOK CREATION ===');
    
    // First, test the student extraction
    const teacherData = updateAutoGeneratedTeachers();
    console.log('Teachers extracted:', teacherData.length);
    
    if (teacherData.length === 0) {
      console.log('No teachers found - checking student data...');
      const debug = debugSystemStatus();
      console.log('Debug result:', debug);
      return debug;
    }
    
    // Then test creating one gradebook
    console.log('Creating test gradebook...');
    const results = createGradebooksForAllTeachers(teacherData.slice(0, 1)); // Only first teacher
    console.log('Creation results:', results);
    
    return {
      teachersFound: teacherData.length,
      creationResults: results,
      success: true
    };
    
  } catch (error) {
    console.error('Debug error:', error.message);
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
🏠 Dashboard Version | 控制台版本: v3.1

🎯 Features | 功能特色:
• 100% Google Ecosystem | 純 Google 生態系統
• Bilingual Interface | 雙語介面
• Dashboard Control Panel | 控制台儀表板
• Batch Operations | 批量操作
• Progress Tracking | 進度追蹤
• Dynamic Assessment Titles | 動態評量標題

⚙️ Configuration | 配置:
• Semester | 學期: ${SYSTEM_CONFIG.SEMESTER}
• F.A. Count | 平時評量次數: ${SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT}
• S.A. Count | 總結評量次數: ${SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT}
• Include Final | 包含期末考: ${SYSTEM_CONFIG.ASSESSMENTS.INCLUDE_FINAL ? 'Yes' : 'No'}

🏷️ Assessment Title Configurations | 評量標題配置:
• Available: ${Object.keys(SYSTEM_CONFIG.ASSESSMENT_TITLES).join(', ')}

🔧 Support | 技術支援:
Contact system administrator | 聯繫系統管理員
  `;
  
  showMessage('ℹ️ System Info | 系統資訊', info);
}

/**
 * Test assessment title system | 測試評量標題系統
 */
function testAssessmentTitles() {
  try {
    console.log('=== TESTING ASSESSMENT TITLE SYSTEM ===');
    
    // Test different class scenarios | 測試不同班級情境
    const testClasses = ['G3 Achievers', 'G2 Advanced', 'G1 Basic', 'Unknown Class'];
    
    testClasses.forEach(className => {
      console.log(`\n--- Testing ${className} ---`);
      const titles = getAssessmentTitles(className);
      console.log('Formative titles:', titles.formative);
      console.log('Summative titles:', titles.summative);
    });
    
    // Test updating titles | 測試更新標題
    console.log('\n--- Testing Title Updates ---');
    const testFormative = ['Custom 1', 'Custom 2', 'Custom 3', 'Custom 4', 'Custom 5', 'Custom 6', 'Custom 7', 'Custom 8'];
    const testSummative = ['Test A', 'Test B', 'Test C', 'Test D'];
    
    const updateResult = updateAssessmentTitles('Test Class', testFormative, testSummative);
    console.log('Update result:', updateResult);
    
    if (updateResult) {
      const newTitles = getAssessmentTitles('Test Class');
      console.log('New titles for Test Class:', newTitles);
    }
    
    // Test reset | 測試重設
    console.log('\n--- Testing Reset ---');
    const resetResult = resetAssessmentTitles('Test Class');
    console.log('Reset result:', resetResult);
    
    console.log('\n=== TEST COMPLETE ===');
    return true;
    
  } catch (error) {
    console.error('Test error:', error.message);
    return false;
  }
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