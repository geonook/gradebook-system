/**
 * Standalone HT Sync Functions for Individual HT Gradebooks
 * 獨立的 HT 同步函數，適用於個別 HT 成績簿
 * 
 * Instructions 使用說明:
 * 1. Copy this code to your HT gradebook's Apps Script
 * 2. Update MAIN_FOLDER_ID with your system folder ID
 * 3. Run initializeHTSync() once to set up the menu
 * 
 * 1. 將此程式碼複製到您的 HT 成績簿的 Apps Script 中
 * 2. 更新 MAIN_FOLDER_ID 為您的系統資料夾 ID
 * 3. 執行一次 initializeHTSync() 來設定選單
 */

// ===== CONFIGURATION | 配置 =====
const MAIN_FOLDER_ID = '1w_UJnNthBkcP8wgyrF3rz2St0jZTPZzB'; // Update this with your system folder ID
const SYSTEM_CONFIG = {
  FOLDERS: {
    TEACHER_SHEETS: 'Teacher Gradebooks | 老師成績簿',
    MASTER_DATA: 'Master Data | 主控資料'
  }
};

// ===== MENU SETUP | 選單設定 =====
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🔄 HT Sync | HT同步')
    .addItem('🚀 Quick Sync | 快速同步', 'htQuickSync')
    .addItem('📊 HT Dashboard | HT控制台', 'htOpenDashboard')
    .addSeparator()
    .addItem('ℹ️ HT Info | HT資訊', 'showHTInfo')
    .addToUi();
}

function initializeHTSync() {
  onOpen();
  SpreadsheetApp.getUi().alert(
    '✅ HT Sync Initialized | HT同步已初始化',
    'HT同步功能已成功初始化！\n您現在可以使用頂部的 "🔄 HT Sync" 選單。\n\nHT Sync functionality has been initialized!\nYou can now use the "🔄 HT Sync" menu at the top.'
  );
}

// ===== CORE HT FUNCTIONS | 核心HT函數 =====

/**
 * Quick sync for HT | HT快速同步
 */
function htQuickSync() {
  try {
    showMessage('🔄 Starting Quick Sync | 開始快速同步', 'Please wait...');
    
    // Get current HT context
    const htContext = getCurrentHTContext();
    if (!htContext) {
      showError('❌ Permission Error | 權限錯誤', 
        'This function can only be used from HT gradebooks.\n此功能只能在 HT 成績簿中使用。');
      return;
    }
    
    // Perform sync
    const result = performHTSync(htContext);
    
    if (result.success) {
      showMessage('✅ Sync Complete | 同步完成', 
        `Successfully synced ${result.count} teacher gradebooks!\n成功同步了 ${result.count} 個教師成績簿！`);
    } else {
      showError('❌ Sync Failed | 同步失敗', result.error);
    }
    
  } catch (error) {
    showError('❌ Error | 錯誤', error.message);
  }
}

/**
 * Open HT Dashboard | 開啟HT控制台
 */
function htOpenDashboard() {
  showMessage('🚧 Feature Coming Soon | 功能即將推出', 
    'HT Dashboard will be available in the next update.\nHT控制台將在下次更新中提供。');
}

/**
 * Show HT information | 顯示HT資訊
 */
function showHTInfo() {
  const htContext = getCurrentHTContext();
  if (!htContext) {
    showError('❌ Not HT Gradebook | 非HT成績簿', 
      'This file is not recognized as an HT gradebook.\n此檔案未被識別為 HT 成績簿。');
    return;
  }
  
  showMessage('👨‍🏫 HT Information | HT資訊', 
    `Name | 姓名: ${htContext.name}\n` +
    `Grade Group | 年段組: ${htContext.gradeGroup}\n` +
    `Type | 類型: ${htContext.type}\n` +
    `Permissions | 權限: ${htContext.permissions.join(', ')}`);
}

// ===== HELPER FUNCTIONS | 輔助函數 =====

/**
 * Get current HT context | 取得當前HT上下文
 */
function getCurrentHTContext() {
  try {
    const fileName = SpreadsheetApp.getActiveSpreadsheet().getName();
    console.log(`Checking HT context for: ${fileName}`);
    
    // Pattern: "Name - HT G1-G2 IT - Gradebook"
    const htPattern = /^(.+?)\s+-\s+HT\s+(G[1-6]-G[1-6])\s+(IT|LT)\s+-\s+Gradebook$/i;
    const match = fileName.match(htPattern);
    
    if (!match) {
      console.log('File name does not match HT pattern');
      return null;
    }
    
    const [, name, gradeGroup, type] = match;
    const grades = gradeGroup.split('-');
    const permissions = grades.flatMap(grade => [`${grade}E1`, `${grade}E2`, `${grade}E3`]);
    
    return {
      name: name.trim(),
      gradeGroup: gradeGroup,
      type: type,
      grades: grades,
      permissions: permissions,
      fileName: fileName
    };
    
  } catch (error) {
    console.error('Error getting HT context:', error);
    return null;
  }
}

/**
 * Perform HT sync operation | 執行HT同步操作
 */
function performHTSync(htContext) {
  try {
    console.log('Starting sync for:', htContext);
    
    // Get system folder
    const systemFolder = DriveApp.getFolderById(MAIN_FOLDER_ID);
    const teacherFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    
    if (!teacherFolder) {
      throw new Error('Cannot find Teacher Gradebooks folder');
    }
    
    // Find HT gradebook to read assessment titles from
    const htGradebook = findHTGradebook(teacherFolder, htContext);
    if (!htGradebook) {
      throw new Error(`Cannot find HT gradebook for ${htContext.gradeGroup} ${htContext.type}`);
    }
    
    // Get assessment titles from HT Assessment Management sheet
    const assessmentTitles = getAssessmentTitlesFromHT(htGradebook, htContext);
    
    // Find target teacher gradebooks
    const targetTeachers = findTargetTeachers(teacherFolder, htContext);
    console.log(`Found ${targetTeachers.length} target teachers`);
    
    // Apply assessment titles to each teacher gradebook
    let syncCount = 0;
    const errors = [];
    
    targetTeachers.forEach(teacherFile => {
      try {
        applyAssessmentTitles(teacherFile, assessmentTitles);
        syncCount++;
        console.log(`✅ Synced: ${teacherFile.getName()}`);
      } catch (error) {
        console.error(`❌ Failed to sync ${teacherFile.getName()}:`, error);
        errors.push(`${teacherFile.getName()}: ${error.message}`);
      }
    });
    
    return {
      success: errors.length === 0,
      count: syncCount,
      total: targetTeachers.length,
      errors: errors
    };
    
  } catch (error) {
    console.error('Sync operation failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Find HT gradebook file | 找到HT成績簿檔案
 */
function findHTGradebook(folder, htContext) {
  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    if (fileName.includes(`HT ${htContext.gradeGroup} ${htContext.type}`)) {
      return SpreadsheetApp.openById(file.getId());
    }
  }
  return null;
}

/**
 * Get assessment titles from HT gradebook | 從HT成績簿獲取評量標題
 */
function getAssessmentTitlesFromHT(gradebook, htContext) {
  try {
    const sheet = gradebook.getSheetByName('⚙️ HT Assessment Management');
    if (!sheet) {
      throw new Error('HT Assessment Management sheet not found');
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const assessmentTitles = {};
    
    // Process each grade in the grade group
    htContext.grades.forEach(grade => {
      assessmentTitles[grade] = {};
      ['E1', 'E2', 'E3'].forEach(level => {
        assessmentTitles[grade][level] = {};
        
        // Find row for this level
        for (let i = 1; i < data.length; i++) {
          if (data[i][0] === `${grade}${level}`) {
            // Extract assessment titles
            for (let j = 1; j < headers.length; j++) {
              const header = headers[j];
              const value = data[i][j];
              if (header && header.match(/^(FA1|FA2|SA1|Final)/) && value) {
                assessmentTitles[grade][level][header] = value;
              }
            }
            break;
          }
        }
      });
    });
    
    return assessmentTitles;
    
  } catch (error) {
    console.error('Error reading assessment titles:', error);
    return {};
  }
}

/**
 * Find target teacher gradebooks | 找到目標教師成績簿
 */
function findTargetTeachers(folder, htContext) {
  const files = folder.getFiles();
  const targets = [];
  
  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    
    // Skip HT gradebooks
    if (fileName.includes('- HT ')) continue;
    
    // Check if this is the right type and grade group
    if (fileName.includes(`_${htContext.type}_`)) {
      // Check if teacher has classes in the target grade group
      if (htContext.grades.some(grade => fileName.includes(grade))) {
        targets.push(file);
      }
    }
  }
  
  return targets;
}

/**
 * Apply assessment titles to teacher gradebook | 將評量標題應用到教師成績簿
 */
function applyAssessmentTitles(file, assessmentTitles) {
  try {
    const gradebook = SpreadsheetApp.openById(file.getId());
    const sheets = gradebook.getSheets();
    
    Object.keys(assessmentTitles).forEach(grade => {
      const gradeTitles = assessmentTitles[grade];
      
      Object.keys(gradeTitles).forEach(level => {
        const levelTitles = gradeTitles[level];
        const sheetName = `${grade}${level}`;
        
        const sheet = gradebook.getSheetByName(sheetName);
        if (sheet) {
          const headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
          
          Object.keys(levelTitles).forEach(assessmentType => {
            const newTitle = levelTitles[assessmentType];
            const colIndex = headerRow.findIndex(header => 
              header && header.toString().includes(assessmentType)
            );
            
            if (colIndex >= 0 && newTitle) {
              sheet.getRange(1, colIndex + 1).setValue(newTitle);
            }
          });
        }
      });
    });
    
  } catch (error) {
    throw new Error(`Failed to update ${file.getName()}: ${error.message}`);
  }
}

/**
 * Get subfolder by name | 依名稱取得子資料夾
 */
function getSubFolder(parentFolder, name) {
  try {
    const folders = parentFolder.getFolders();
    while (folders.hasNext()) {
      const folder = folders.next();
      if (folder.getName() === name) {
        return folder;
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting subfolder:', error);
    return null;
  }
}

// ===== UI FUNCTIONS | 介面函數 =====

function showMessage(title, message) {
  SpreadsheetApp.getUi().alert(title, message, SpreadsheetApp.getUi().ButtonSet.OK);
}

function showError(title, message) {
  SpreadsheetApp.getUi().alert(title, message, SpreadsheetApp.getUi().ButtonSet.OK);
}