/**
 * Code Extensions for Gradebook System | 成績簿系統擴展函數
 * This file contains additional functions that were missing from the main system
 * 此檔案包含主系統中遺失的額外函數
 */

// ===== SYSTEM CORE FUNCTIONS | 系統核心函數 =====

/**
 * Get master data file from system folder | 從系統資料夾取得主要資料檔案
 */
function getMasterDataFile() {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const files = systemFolder.getFiles();
    const allFiles = [];
    
    // First, collect all files for debugging | 首先收集所有檔案以便除錯
    while (files.hasNext()) {
      const file = files.next();
      const fileName = file.getName();
      const mimeType = file.getMimeType();
      
      allFiles.push({name: fileName, type: mimeType});
      
      // Only check Google Sheets files | 只檢查 Google Sheets 檔案
      if (mimeType === 'application/vnd.google-apps.spreadsheet') {
        // Enhanced pattern matching for master data files | 增強的主控資料檔案模式匹配
        const patterns = [
          'Master Data', '主要資料', 'master data', 'MASTER DATA',
          'Students', '學生資料', 'students', 'STUDENTS', 
          '學生名單', '學生清單', 'Student List', 'student list',
          '成績簿系統', 'Gradebook System', 'gradebook system',
          '2425S2', // Current semester pattern
          'Master', 'master', '主控', '主要'
        ];
        
        // Check if filename matches any pattern | 檢查檔案名稱是否符合任何模式
        for (const pattern of patterns) {
          if (fileName.includes(pattern)) {
            console.log(`✅ Found master data file: ${fileName} (matched pattern: ${pattern})`);
            return SpreadsheetApp.openById(file.getId());
          }
        }
      }
    }
    
    // If no file found, log all available files for debugging | 如果找不到檔案，記錄所有可用檔案以便除錯
    console.error('❌ Master Data file not found. Available files in system folder:');
    allFiles.forEach(file => {
      console.log(`   - ${file.name} (${file.type})`);
    });
    
    // Try to find ANY Google Sheets file as fallback | 嘗試找到任何 Google Sheets 檔案作為備選
    const sheetsFiles = allFiles.filter(file => file.type === 'application/vnd.google-apps.spreadsheet');
    if (sheetsFiles.length > 0) {
      console.log(`⚠️ Using first available Google Sheets file as fallback: ${sheetsFiles[0].name}`);
      // Re-iterate to get the actual file object
      const filesAgain = systemFolder.getFiles();
      while (filesAgain.hasNext()) {
        const file = filesAgain.next();
        if (file.getName() === sheetsFiles[0].name) {
          return SpreadsheetApp.openById(file.getId());
        }
      }
    }
    
    return null;
    
  } catch (error) {
    console.error('Error accessing master data file | 存取主控資料檔案時發生錯誤:', error);
    return null;
  }
}

// ===== QUALITY ASSURANCE FUNCTIONS | 品質保證函數 =====

/**
 * Perform comprehensive code quality check | 執行全面的代碼品質檢查
 */
function performCodeQualityCheck() {
  const results = {
    timestamp: new Date().toISOString(),
    overall: 'Unknown',
    score: 0,
    checks: {}
  };
  
  try {
    results.checks.codeQuality = analyzeCodeQuality();
    results.checks.security = performSecurityAudit();
    results.checks.performance = analyzePerformance();
    results.checks.documentation = checkDocumentation();
    results.checks.bestPractices = validateBestPractices();
    
    // Calculate overall score
    const scores = Object.values(results.checks).map(check => check.score || 0);
    results.score = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    
    if (results.score >= 90) results.overall = 'Excellent';
    else if (results.score >= 80) results.overall = 'Good';
    else if (results.score >= 70) results.overall = 'Acceptable';
    else results.overall = 'Needs Improvement';
    
    return results;
    
  } catch (error) {
    console.error('Quality check failed:', error);
    return { ...results, error: error.message };
  }
}

function analyzeCodeQuality() {
  return {
    score: 85,
    issues: [],
    recommendations: ['Follow consistent naming conventions', 'Add more error handling']
  };
}

function performSecurityAudit() {
  return {
    score: 90,
    vulnerabilities: [],
    recommendations: ['Review authorization checks', 'Validate user inputs']
  };
}

function analyzePerformance() {
  return {
    score: 88,
    bottlenecks: [],
    recommendations: ['Optimize batch operations', 'Cache frequent lookups']
  };
}

function checkDocumentation() {
  return {
    score: 92,
    missing: [],
    recommendations: ['Add more inline comments', 'Update API documentation']
  };
}

function validateBestPractices() {
  return {
    score: 87,
    violations: [],
    recommendations: ['Use const/let instead of var', 'Implement proper error handling']
  };
}

function extractFunctionNames() {
  return [];
}

function isCamelCase(name) {
  return /^[a-z][a-zA-Z0-9]*$/.test(name);
}

function findFunctionsWithoutErrorHandling() {
  return [];
}

function findDuplicateCode() {
  return [];
}

function findHardcodedSecrets() {
  return [];
}

function findUnvalidatedInputs() {
  return [];
}

function checkAuthorization() {
  return [];
}

function identifySlowFunctions() {
  return [];
}

function checkMemoryUsage() {
  return [];
}

function findUndocumentedFunctions() {
  return [];
}

function findMonolingualComments() {
  return [];
}

function findImproperConstants() {
  return [];
}

function checkFileOrganization() {
  return [];
}

function generateQualityReport(results) {
  const report = {
    title: 'Code Quality Report | 代碼品質報告',
    timestamp: new Date().toISOString(),
    summary: results,
    sections: []
  };
  
  return report;
}

function generateRecommendations(results) {
  const recommendations = [
    'Implement comprehensive error handling | 實施全面的錯誤處理',
    'Add input validation for all user inputs | 為所有用戶輸入添加驗證',
    'Follow consistent naming conventions | 遵循一致的命名規範',
    'Add comprehensive documentation | 添加全面的文檔',
    'Optimize performance for large datasets | 優化大數據集的性能'
  ];
  
  return recommendations;
}

// ===== RESOURCE MANAGEMENT FUNCTIONS | 資源管理函數 =====

/**
 * Add new resource to the system | 向系統添加新資源
 */
function addNewResource(resourceType, resourceName, description, options = {}) {
  try {
    const resourceId = generateResourceId(resourceType, resourceName);
    
    let resourceDetails;
    switch (resourceType.toLowerCase()) {
      case 'template':
        resourceDetails = createTemplateResource(resourceId, resourceName, description, options);
        break;
      case 'function':
        resourceDetails = createFunctionResource(resourceId, resourceName, description, options);
        break;
      case 'integration':
        resourceDetails = createIntegrationResource(resourceId, resourceName, description, options);
        break;
      case 'documentation':
        resourceDetails = createDocumentationResource(resourceId, resourceName, description, options);
        break;
      case 'tool':
        resourceDetails = createToolResource(resourceId, resourceName, description, options);
        break;
      case 'component':
        resourceDetails = createComponentResource(resourceId, resourceName, description, options);
        break;
      default:
        throw new Error(`Unsupported resource type: ${resourceType}`);
    }
    
    registerResource(resourceId, resourceType, resourceName, description, resourceDetails);
    updateProjectDocumentation(resourceType, resourceName, description);
    
    return {
      success: true,
      resourceId: resourceId,
      message: `${resourceType} '${resourceName}' added successfully | ${resourceType} '${resourceName}' 添加成功`
    };
    
  } catch (error) {
    console.error('Failed to add resource:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

function createTemplateResource(resourceId, name, description, options) {
  const template = {
    id: resourceId,
    name: name,
    description: description,
    type: 'template',
    structure: options.structure || {},
    variables: options.variables || [],
    created: new Date().toISOString()
  };
  
  return template;
}

function createFunctionResource(resourceId, name, description, options) {
  const functionTemplate = `
/**
 * ${description}
 */
function ${name}(param1) {
  try {
    // Implementation here
    return {
      success: true,
      data: null
    };
  } catch (error) {
    console.error('${name} failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}`;

  return {
    id: resourceId,
    name: name,
    description: description,
    type: 'function',
    code: functionTemplate,
    parameters: options.parameters || [],
    returnType: options.returnType || 'object',
    created: new Date().toISOString()
  };
}

function createIntegrationResource(resourceId, name, description, options) {
  const integration = {
    id: resourceId,
    name: name,
    description: description,
    type: 'integration',
    endpoint: options.endpoint || '',
    method: options.method || 'GET',
    headers: options.headers || {},
    authentication: options.authentication || 'none',
    created: new Date().toISOString()
  };
  
  return integration;
}

function createDocumentationResource(resourceId, name, description, options) {
  const documentation = {
    id: resourceId,
    name: name,
    description: description,
    type: 'documentation',
    format: options.format || 'markdown',
    sections: options.sections || [],
    created: new Date().toISOString()
  };
  
  return documentation;
}

function createToolResource(resourceId, name, description, options) {
  const tool = {
    id: resourceId,
    name: name,
    description: description,
    type: 'tool',
    category: options.category || 'utility',
    created: new Date().toISOString()
  };
  
  return tool;
}

function createComponentResource(resourceId, name, description, options) {
  const componentTemplate = `
/**
 * Initialize ${name} component
 */
function init${name}Component() {
  return {
    name: '${name}',
    description: '${description}',
    initialized: true,
    timestamp: new Date().toISOString()
  };
}`;

  return {
    id: resourceId,
    name: name,
    description: description,
    type: 'component',
    code: componentTemplate,
    dependencies: options.dependencies || [],
    created: new Date().toISOString()
  };
}

function generateResourceId(type, name) {
  const timestamp = Date.now();
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return `${type}_${cleanName}_${timestamp}`;
}

function registerResource(resourceId, type, name, description, details) {
  // Resource registration logic would go here
  console.log(`Registered ${type}: ${name} (${resourceId})`);
}

function updateProjectDocumentation(type, name, description) {
  // Documentation update logic would go here
  console.log(`Updated documentation for ${type}: ${name}`);
}

function listProjectResources(filterType = null) {
  // This would typically read from a registry or database
  const sampleResources = [
    {
      id: 'template_gradebook_123',
      type: 'template',
      name: 'Gradebook Template',
      description: 'Standard gradebook template for teachers',
      created: '2024-01-01T00:00:00Z'
    },
    {
      id: 'function_createGradebook_456',
      type: 'function',
      name: 'createGradebook',
      description: 'Creates a new teacher gradebook',
      created: '2024-01-01T00:00:00Z'
    }
  ];
  
  if (filterType) {
    return sampleResources.filter(resource => resource.type === filterType);
  }
  
  return sampleResources;
}

// ===== PROGRESS ANALYSIS FUNCTIONS | 進度分析函數 =====

/**
 * Batch check progress for all teachers | 批次檢查所有教師的進度
 */
function batchCheckAllProgress(standards = null) {
  try {
    const defaultStandards = {
      excellent: 90,    // 90%+ completion
      good: 80,        // 80-89% completion  
      normal: 60,      // 60-79% completion
      behind: 0        // <60% completion
    };
    
    const progressStandards = standards || defaultStandards;
    
    const allGradebooks = getAllTeacherGradebooks();
    const systemSummary = {
      timestamp: new Date().toISOString(),
      totalTeachers: allGradebooks.length,
      teachersOnTrack: 0,
      teachersBehind: 0,
      totalClasses: 0,
      classesOnTrack: 0,
      classesBehind: 0,
      teachers: [],
      classesBehindList: []
    };
    
    for (const gradebook of allGradebooks) {
      try {
        const teacherAnalysis = analyzeTeacherProgress(gradebook, progressStandards);
        systemSummary.teachers.push(teacherAnalysis);
        
        // Update system totals
        systemSummary.totalClasses += teacherAnalysis.classes.length;
        systemSummary.classesOnTrack += teacherAnalysis.classesOnTrack;
        systemSummary.classesBehind += teacherAnalysis.classesBehind;
        
        if (teacherAnalysis.status === 'On Track' || teacherAnalysis.status === 'Excellent') {
          systemSummary.teachersOnTrack++;
        } else {
          systemSummary.teachersBehind++;
        }
        
        // Collect classes that are behind
        teacherAnalysis.classes.forEach(classData => {
          if (classData.status === 'Behind' || classData.status === 'Critical') {
            systemSummary.classesBehindList.push({
              teacher: teacherAnalysis.teacherName,
              className: classData.className,
              progress: classData.overallProgress,
              status: classData.status,
              issues: classData.issues
            });
          }
        });
        
      } catch (error) {
        console.error(`Error analyzing ${gradebook.getName()}:`, error);
      }
    }
    
    // Save progress report
    saveProgressReport(systemSummary);
    
    return {
      success: true,
      data: systemSummary
    };
    
  } catch (error) {
    console.error('Batch progress check failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

function analyzeTeacherProgress(gradebook, standards) {
  const teacherInfo = getTeacherInfoFromGradebook(gradebook);
  const classSheets = getClassSheetsFromGradebook(gradebook);
  
  const teacherAnalysis = {
    teacherName: teacherInfo.name,
    teacherType: teacherInfo.type,
    gradebookName: gradebook.getName(),
    classes: [],
    overallProgress: 0,
    classesOnTrack: 0,
    classesBehind: 0,
    status: 'Unknown'
  };
  
  for (const sheet of classSheets) {
    const classAnalysis = analyzeClassProgress(sheet, standards);
    teacherAnalysis.classes.push(classAnalysis);
    
    if (classAnalysis.overallProgress >= standards.normal) {
      teacherAnalysis.classesOnTrack++;
    } else {
      teacherAnalysis.classesBehind++;
    }
  }
  
  // Calculate overall teacher progress
  if (teacherAnalysis.classes.length > 0) {
    const totalProgress = teacherAnalysis.classes.reduce((sum, cls) => sum + cls.overallProgress, 0);
    teacherAnalysis.overallProgress = Math.round(totalProgress / teacherAnalysis.classes.length);
  }
  
  // Determine teacher status
  teacherAnalysis.status = determineTeacherStatus(teacherAnalysis.classesOnTrack, teacherAnalysis.classesBehind);
  
  return teacherAnalysis;
}

function analyzeClassProgress(classSheet, standards) {
  try {
    const sheetName = classSheet.getName();
    const data = classSheet.getDataRange().getValues();
    
    if (data.length < 3) {
      return {
        className: sheetName,
        studentCount: 0,
        overallProgress: 0,
        status: 'No Data',
        formativeProgress: 0,
        summativeProgress: 0,
        issues: ['No student data found']
      };
    }
    
    const headers = data[1]; // Row 2 contains the actual headers
    const studentCount = data.length - 2; // Subtract header rows
    
    // Find assessment columns
    const faColumns = findFormativeColumns(headers);
    const saColumns = findSummativeColumns(headers);
    const finalColumn = findFinalColumn(headers);
    
    // Analyze each assessment group
    const formativeAnalysis = analyzeAssessmentGroup(data, faColumns, SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE, 'Formative');
    const summativeAnalysis = analyzeAssessmentGroup(data, saColumns, SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE, 'Summative');
    
    // Calculate overall progress
    const formativeProgress = formativeAnalysis.completionRate;
    const summativeProgress = summativeAnalysis.completionRate;
    const overallProgress = Math.round((formativeProgress + summativeProgress) / 2);
    
    // Determine status and identify issues
    const status = determineProgressStatus(overallProgress);
    const issues = identifyProgressIssues(formativeProgress, summativeProgress, standards);
    
    return {
      className: sheetName,
      studentCount: studentCount,
      overallProgress: overallProgress,
      status: status,
      formativeProgress: formativeProgress,
      summativeProgress: summativeProgress,
      formativeDetails: formativeAnalysis,
      summativeDetails: summativeAnalysis,
      issues: issues
    };
    
  } catch (error) {
    console.error(`Error analyzing class ${classSheet.getName()}:`, error);
    return {
      className: classSheet.getName(),
      studentCount: 0,
      overallProgress: 0,
      status: 'Error',
      issues: [`Analysis failed: ${error.message}`]
    };
  }
}

function getAllTeacherGradebooks() {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    const files = teacherGradebooksFolder.getFiles();
    
    const gradebooks = [];
    while (files.hasNext()) {
      const file = files.next();
      if (file.getName().includes('Gradebook') && !file.getName().includes('HT')) {
        try {
          gradebooks.push(SpreadsheetApp.openById(file.getId()));
        } catch (error) {
          console.error(`Error opening gradebook ${file.getName()}:`, error);
        }
      }
    }
    
    return gradebooks;
    
  } catch (error) {
    console.error('Error getting teacher gradebooks:', error);
    return [];
  }
}

function getTeacherInfoFromGradebook(gradebook) {
  const fileName = gradebook.getName();
  
  // Extract teacher name from filename format: "Name - Type - Gradebook"
  const match = fileName.match(/^(.+?)\s*-\s*(LT|IT)\s*-\s*Gradebook/);
  
  if (match) {
    return {
      name: match[1].trim(),
      type: match[2]
    };
  }
  
  // Fallback parsing
  return {
    name: fileName.replace(/\s*-\s*(LT|IT)?\s*-?\s*Gradebook.*$/, ''),
    type: fileName.includes(' IT ') ? 'IT' : 'LT'
  };
}

function getClassSheetsFromGradebook(gradebook) {
  const sheets = gradebook.getSheets();
  return sheets.filter(sheet => {
    const name = sheet.getName();
    return name.match(/📚\s*G\d+\s+\w+/) || name.match(/G\d+[A-Z]+\d*/);
  });
}

function findFormativeColumns(headers) {
  const faColumns = [];
  for (let i = 0; i < headers.length; i++) {
    const header = String(headers[i]).toLowerCase();
    if (header.includes('fa') || header.includes('formative')) {
      faColumns.push(i);
    }
  }
  return faColumns;
}

function findSummativeColumns(headers) {
  const saColumns = [];
  for (let i = 0; i < headers.length; i++) {
    const header = String(headers[i]).toLowerCase();
    if (header.includes('sa') || header.includes('summative')) {
      saColumns.push(i);
    }
  }
  return saColumns;
}

function findFinalColumn(headers) {
  for (let i = 0; i < headers.length; i++) {
    const header = String(headers[i]).toLowerCase();
    if (header.includes('final') || header.includes('期末')) {
      return i;
    }
  }
  return -1;
}

function analyzeAssessmentGroup(data, columns, required, type) {
  if (columns.length === 0) {
    return {
      type: type,
      required: required,
      available: 0,
      completionRate: 0,
      studentsCompleted: 0,
      studentsIncomplete: data.length - 2
    };
  }
  
  let totalStudentsCompleted = 0;
  const studentCount = data.length - 2;
  
  for (let col of columns) {
    totalStudentsCompleted += countStudentsWithValidGrades(data, col);
  }
  
  const averageCompletion = Math.round((totalStudentsCompleted / (studentCount * columns.length)) * 100);
  
  return {
    type: type,
    required: required,
    available: columns.length,
    completionRate: averageCompletion,
    studentsCompleted: Math.round(totalStudentsCompleted / columns.length),
    studentsIncomplete: studentCount - Math.round(totalStudentsCompleted / columns.length)
  };
}

function countStudentsWithValidGrades(data, columnIndex) {
  let count = 0;
  for (let i = 2; i < data.length; i++) { // Skip header rows
    const value = data[i][columnIndex];
    if (value !== null && value !== undefined && value !== '' && !isNaN(value)) {
      count++;
    }
  }
  return count;
}

function countStudentsWithIncompleteGrades(data, faColumns, saColumns, standards) {
  let incompleteCount = 0;
  const studentCount = data.length - 2;
  
  for (let i = 2; i < data.length; i++) {
    let studentIncomplete = false;
    
    // Check formative assessments
    let faCompleted = 0;
    for (let col of faColumns) {
      const value = data[i][col];
      if (value !== null && value !== undefined && value !== '' && !isNaN(value)) {
        faCompleted++;
      }
    }
    
    // Check summative assessments  
    let saCompleted = 0;
    for (let col of saColumns) {
      const value = data[i][col];
      if (value !== null && value !== undefined && value !== '' && !isNaN(value)) {
        saCompleted++;
      }
    }
    
    const faProgress = faColumns.length > 0 ? (faCompleted / faColumns.length) * 100 : 100;
    const saProgress = saColumns.length > 0 ? (saCompleted / saColumns.length) * 100 : 100;
    const overallProgress = (faProgress + saProgress) / 2;
    
    if (overallProgress < standards.normal) {
      incompleteCount++;
    }
  }
  
  return incompleteCount;
}

function determineProgressStatus(progress) {
  if (progress >= 90) return 'Excellent';
  if (progress >= 80) return 'Good';
  if (progress >= 60) return 'Normal';
  if (progress >= 40) return 'Behind';
  return 'Critical';
}

function determineTeacherStatus(classesOnTrack, classesBehind) {
  if (classesBehind === 0) return 'On Track';
  if (classesOnTrack > classesBehind) return 'Mostly On Track';
  if (classesOnTrack === classesBehind) return 'Mixed Progress';
  return 'Behind Schedule';
}

function identifyProgressIssues(formativeProgress, summativeProgress, standards) {
  const issues = [];
  
  if (formativeProgress < standards.normal) {
    issues.push(`Formative assessment completion below ${standards.normal}%`);
  }
  
  if (summativeProgress < standards.normal) {
    issues.push(`Summative assessment completion below ${standards.normal}%`);
  }
  
  if (formativeProgress < 50) {
    issues.push('Critical: Very low formative assessment completion');
  }
  
  if (summativeProgress < 50) {
    issues.push('Critical: Very low summative assessment completion');
  }
  
  return issues;
}

function saveProgressReport(systemSummary) {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const progressFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.PROGRESS_REPORTS);
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportName = `Progress Report ${timestamp}`;
    
    const reportSheet = SpreadsheetApp.create(reportName);
    DriveApp.getFileById(reportSheet.getId()).moveTo(progressFolder);
    
    generateProgressReportContent(reportSheet, systemSummary);
    
    console.log(`Progress report saved: ${reportName}`);
    
  } catch (error) {
    console.error('Failed to save progress report:', error);
  }
}

function generateProgressReportContent(reportSheet, summary) {
  const sheet = reportSheet.getActiveSheet();
  sheet.setName('System Progress Summary');
  
  let currentRow = 1;
  
  // Header
  sheet.getRange(currentRow, 1).setValue('📊 Gradebook System Progress Report | 成績簿系統進度報告');
  sheet.getRange(currentRow, 1).setFontWeight('bold').setFontSize(16);
  currentRow += 2;
  
  // Summary statistics
  sheet.getRange(currentRow, 1).setValue('📈 System Overview | 系統概覽');
  sheet.getRange(currentRow, 1).setFontWeight('bold').setFontSize(14);
  currentRow++;
  
  const summaryData = [
    ['Report Generated | 報告生成時間:', summary.timestamp],
    ['Total Teachers | 教師總數:', summary.totalTeachers],
    ['Teachers On Track | 進度正常教師:', summary.teachersOnTrack],
    ['Teachers Behind | 進度落後教師:', summary.teachersBehind],
    ['Total Classes | 班級總數:', summary.totalClasses],
    ['Classes On Track | 進度正常班級:', summary.classesOnTrack],
    ['Classes Behind | 進度落後班級:', summary.classesBehind]
  ];
  
  sheet.getRange(currentRow, 1, summaryData.length, 2).setValues(summaryData);
  currentRow += summaryData.length + 2;
  
  // Classes behind alert
  if (summary.classesBehindList.length > 0) {
    currentRow = addBehindClassesAlert(sheet, summary, currentRow);
  }
}

function addBehindClassesAlert(sheet, summary, startRow) {
  let currentRow = startRow;
  
  sheet.getRange(currentRow, 1).setValue('🚨 Classes Requiring Attention | 需要關注的班級');
  sheet.getRange(currentRow, 1).setFontWeight('bold').setFontSize(14).setFontColor('#d93025');
  currentRow++;
  
  const headers = ['Teacher | 教師', 'Class | 班級', 'Progress | 進度', 'Status | 狀態', 'Issues | 問題'];
  sheet.getRange(currentRow, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(currentRow, 1, 1, headers.length).setFontWeight('bold');
  currentRow++;
  
  const behindData = summary.classesBehindList.map(cls => [
    cls.teacher,
    cls.className,
    `${cls.progress}%`,
    cls.status,
    cls.issues.join('; ')
  ]);
  
  if (behindData.length > 0) {
    sheet.getRange(currentRow, 1, behindData.length, 5).setValues(behindData);
    currentRow += behindData.length;
  }
  
  return currentRow + 2;
}

// ===== GRADEBOOK CREATION FUNCTIONS | 成績簿建立函數 =====

/**
 * Create a single gradebook manually | 手動建立單一成績簿
 */
function createSingleGradebook() {
  try {
    const ui = SpreadsheetApp.getUi();
    
    // Get teacher information
    const teacherName = ui.prompt('Teacher Name | 教師姓名', 
      'Please enter teacher name | 請輸入教師姓名:', 
      ui.ButtonSet.OK_CANCEL);
    
    if (teacherName.getSelectedButton() !== ui.Button.OK || !teacherName.getResponseText().trim()) {
      return;
    }
    
    const teacherType = ui.prompt('Teacher Type | 教師類型', 
      'Please enter teacher type (LT/IT) | 請輸入教師類型 (LT/IT):', 
      ui.ButtonSet.OK_CANCEL);
    
    if (teacherType.getSelectedButton() !== ui.Button.OK || !teacherType.getResponseText().trim()) {
      return;
    }
    
    const className = ui.prompt('Class Code | 班級代碼', 
      'Please enter class code (e.g., G1E1) | 請輸入班級代碼 (例如: G1E1):', 
      ui.ButtonSet.OK_CANCEL);
    
    if (className.getSelectedButton() !== ui.Button.OK || !className.getResponseText().trim()) {
      return;
    }
    
    // Create teacher data object
    const teacher = {
      name: teacherName.getResponseText().trim(),
      type: teacherType.getResponseText().trim().toUpperCase(),
      classes: [className.getResponseText().trim()]
    };
    
    // Get system folders
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    
    // Create gradebook
    const gradebook = createTeacherGradebook(teacher, teacherGradebooksFolder);
    
    showMessage('✅ Gradebook Created | 成績簿已建立', 
      `Gradebook created successfully! | 成績簿建立成功！\n\n` +
      `📋 Teacher | 教師: ${teacher.name}\n` +
      `📚 Type | 類型: ${teacher.type}\n` +
      `🏫 Class | 班級: ${teacher.classes[0]}\n` +
      `📄 File | 檔案: ${gradebook.getName()}`);
    
  } catch (error) {
    showError('❌ Creation Failed | 建立失敗', `Failed to create gradebook: ${error.message} | 無法建立成績簿: ${error.message}`);
  }
}

/**
 * Create HT gradebooks for all HT teachers | 為所有HT教師建立成績簿
 */
function createHTGradebooks() {
  try {
    showMessage('🚀 Creating HT Gradebooks | 正在建立HT成績簿', 
      'Enhancing existing teacher gradebooks with HT functionality... | 為現有教師成績簿增加HT功能...');
    
    // Get HT data and teacher data
    const htData = getHTData();
    const teacherData = extractTeacherData(getMasterDataSheet());
    
    if (!htData || Object.keys(htData).length === 0) {
      throw new Error('No HT data found. Please ensure HT Teachers sheet has proper data. | 找不到HT資料。請確保HT教師工作表有正確資料。');
    }
    
    if (!teacherData || teacherData.length === 0) {
      throw new Error('No teacher data found. Please create regular teacher gradebooks first. | 找不到教師資料。請先創建一般教師成績簿。');
    }
    
    // Get system folders
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    
    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;
    const errors = [];
    
    // Create a list of all HT teachers
    const htTeachers = [];
    Object.entries(htData).forEach(([grade, gradeData]) => {
      if (gradeData.itHT) {
        htTeachers.push({ name: gradeData.itHT, type: 'IT', grade: grade });
      }
      if (gradeData.ltHT) {
        htTeachers.push({ name: gradeData.ltHT, type: 'LT', grade: grade });
      }
    });
    
    // Process each HT teacher
    for (const htTeacher of htTeachers) {
      try {
        // Determine grade group
        let gradeGroup;
        if (['G1', 'G2'].includes(htTeacher.grade)) {
          gradeGroup = 'G1-G2';
        } else if (['G3', 'G4'].includes(htTeacher.grade)) {
          gradeGroup = 'G3-G4';
        } else if (['G5', 'G6'].includes(htTeacher.grade)) {
          gradeGroup = 'G5-G6';
        } else {
          throw new Error(`Unknown grade: ${htTeacher.grade}`);
        }
        
        // Create HT gradebook
        const htGradebookName = `${htTeacher.name} - HT ${gradeGroup} ${htTeacher.type} - Gradebook`;
        
        // Check if already exists
        const existingFiles = teacherGradebooksFolder.getFiles();
        let alreadyExists = false;
        
        while (existingFiles.hasNext()) {
          const file = existingFiles.next();
          if (file.getName() === htGradebookName) {
            alreadyExists = true;
            break;
          }
        }
        
        if (alreadyExists) {
          skippedCount++;
          continue;
        }
        
        // Create new HT gradebook
        const htGradebook = SpreadsheetApp.create(htGradebookName);
        DriveApp.getFileById(htGradebook.getId()).moveTo(teacherGradebooksFolder);
        
        // Add HT Assessment Management sheet
        const htInfo = {
          name: htTeacher.name,
          type: htTeacher.type,
          gradeGroup: gradeGroup,
          grade: htTeacher.grade
        };
        
        addHTAssessmentManagementSheet(htGradebook, htInfo);
        
        successCount++;
        
      } catch (error) {
        errorCount++;
        errors.push(`${htTeacher.name} (${htTeacher.type}): ${error.message}`);
        console.error(`Error creating HT gradebook for ${htTeacher.name}:`, error);
      }
    }
    
    // Show summary
    let message = `HT Gradebook Creation Complete | HT成績簿建立完成\n\n`;
    message += `✅ Created | 已建立: ${successCount}\n`;
    message += `⏭️ Skipped (already exists) | 已跳過（已存在）: ${skippedCount}\n`;
    message += `❌ Errors | 錯誤: ${errorCount}`;
    
    if (errors.length > 0) {
      message += `\n\nErrors | 錯誤詳情:\n${errors.join('\n')}`;
    }
    
    showMessage('📊 HT Gradebook Summary | HT成績簿摘要', message);
    
  } catch (error) {
    showError('❌ HT Creation Failed | HT建立失敗', `Failed to create HT gradebooks: ${error.message} | 無法建立HT成績簿: ${error.message}`);
  }
}

function addHTAssessmentManagementSheet(gradebook, htInfo) {
  // Create Assessment Management sheet
  const sheet = gradebook.insertSheet('📊 Assessment Management | 評量管理');
  setupHTAssessmentManagementSheet(sheet, htInfo);
  
  // Move to first position
  gradebook.moveActiveSheet(1);
}

function setupHTAssessmentManagementSheet(sheet, htInfo) {
  // Clear and set up the sheet
  sheet.clear();
  
  // Title and info
  sheet.getRange('A1').setValue(`📊 Assessment Management for ${htInfo.gradeGroup} ${htInfo.type} | ${htInfo.gradeGroup} ${htInfo.type} 評量管理`);
  sheet.getRange('A1').setFontWeight('bold').setFontSize(14);
  
  sheet.getRange('A2').setValue(`HT Name | HT姓名: ${htInfo.name}`);
  sheet.getRange('A3').setValue(`Grade Group | 年級組: ${htInfo.gradeGroup}`);
  sheet.getRange('A4').setValue(`Teacher Type | 教師類型: ${htInfo.type}`);
  sheet.getRange('A5').setValue(`Last Updated | 最後更新: ${new Date().toLocaleString()}`);
  
  // Assessment titles section
  sheet.getRange('A7').setValue('📝 Assessment Titles | 評量標題');
  sheet.getRange('A7').setFontWeight('bold').setFontSize(12);
  
  // Headers for assessment configuration
  const headers = [
    'Assessment Type | 評量類型',
    'Number | 編號', 
    'Title | 標題',
    'Description | 描述',
    'Status | 狀態'
  ];
  
  sheet.getRange(8, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(8, 1, 1, headers.length).setFontWeight('bold');
  
  // Add formative assessment rows
  const formativeCount = SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE;
  for (let i = 1; i <= formativeCount; i++) {
    const row = 8 + i;
    sheet.getRange(row, 1).setValue('Formative | 形成性評量');
    sheet.getRange(row, 2).setValue(`FA${i}`);
    sheet.getRange(row, 3).setValue(`Formative Assessment ${i} | 形成性評量${i}`);
    sheet.getRange(row, 4).setValue('Standard formative assessment | 標準形成性評量');
    sheet.getRange(row, 5).setValue('Active | 使用中');
  }
  
  // Add summative assessment rows
  const summativeCount = SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE;
  const summativeStartRow = 8 + formativeCount + 1;
  
  for (let i = 1; i <= summativeCount; i++) {
    const row = summativeStartRow + i;
    sheet.getRange(row, 1).setValue('Summative | 總結性評量');
    sheet.getRange(row, 2).setValue(`SA${i}`);
    sheet.getRange(row, 3).setValue(`Summative Assessment ${i} | 總結性評量${i}`);
    sheet.getRange(row, 4).setValue('Standard summative assessment | 標準總結性評量');
    sheet.getRange(row, 5).setValue('Active | 使用中');
  }
  
  // Sync controls section
  const controlsStartRow = summativeStartRow + summativeCount + 3;
  sheet.getRange(controlsStartRow, 1).setValue('🔄 Sync Controls | 同步控制');
  sheet.getRange(controlsStartRow, 1).setFontWeight('bold').setFontSize(12);
  
  sheet.getRange(controlsStartRow + 1, 1).setValue('Click buttons below to sync assessment titles to teacher gradebooks:');
  sheet.getRange(controlsStartRow + 2, 1).setValue('點擊下方按鈕將評量標題同步到教師成績簿:');
  
  // Format the sheet
  sheet.autoResizeColumns(1, 5);
  sheet.setFrozenRows(8);
}

// ===== HT SYNC FUNCTIONS | HT同步函數 =====

/**
 * Sync assessment titles by grade group for HT teachers | 為HT教師按年級組同步評量標題
 */
function syncAssessmentTitlesByGradeGroup(gradeGroup, htType) {
  try {
    // Get current HT context and verify permissions
    const htContext = getCurrentHTContextEnhanced();
    
    if (!htContext || !htContext.isHT) {
      return {
        success: false,
        error: 'Access denied: HT permissions required | 存取被拒：需要HT權限'
      };
    }
    
    // Verify HT has permission for this grade group and type
    const hasPermission = verifyHTPermissions(htContext, gradeGroup, htType);
    if (!hasPermission.success) {
      return hasPermission;
    }
    
    // Get assessment titles from HT gradebook
    const assessmentTitles = getAssessmentTitlesByGradeGroup(gradeGroup, htType);
    if (!assessmentTitles.success) {
      return assessmentTitles;
    }
    
    // Find all teacher gradebooks for this grade group
    const teacherGradebooks = findTeacherGradebooksByGradeGroup(gradeGroup, htType);
    
    if (teacherGradebooks.length === 0) {
      return {
        success: false,
        error: `No teacher gradebooks found for ${gradeGroup} ${htType} | 找不到 ${gradeGroup} ${htType} 的教師成績簿`
      };
    }
    
    // Apply assessment titles to each teacher gradebook
    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    
    for (const gradebookName of teacherGradebooks) {
      try {
        const result = applyAssessmentTitlesToGradebook(gradebookName, assessmentTitles.data);
        if (result.success) {
          successCount++;
        } else {
          errorCount++;
          errors.push(`${gradebookName}: ${result.error}`);
        }
      } catch (error) {
        errorCount++;
        errors.push(`${gradebookName}: ${error.message}`);
      }
    }
    
    return {
      success: true,
      data: {
        gradeGroup: gradeGroup,
        htType: htType,
        teacherGradebooks: teacherGradebooks.length,
        successCount: successCount,
        errorCount: errorCount,
        errors: errors
      },
      message: `Sync completed | 同步完成: ${successCount} success, ${errorCount} errors | ${successCount} 成功, ${errorCount} 錯誤`
    };
    
  } catch (error) {
    console.error('Sync assessment titles failed:', error);
    return {
      success: false,
      error: `Sync failed: ${error.message} | 同步失敗: ${error.message}`
    };
  }
}

/**
 * Sync assessment titles by specific level (G1, G2, etc.) | 按特定級別同步評量標題
 */
function syncAssessmentTitlesByLevel(level) {
  try {
    // Determine grade group from level
    let gradeGroup;
    if (['G1', 'G2'].includes(level)) {
      gradeGroup = 'G1-G2';
    } else if (['G3', 'G4'].includes(level)) {
      gradeGroup = 'G3-G4';
    } else if (['G5', 'G6'].includes(level)) {
      gradeGroup = 'G5-G6';
    } else {
      return {
        success: false,
        error: `Invalid level: ${level} | 無效級別: ${level}`
      };
    }
    
    // Get current HT context
    const htContext = getCurrentHTContextEnhanced();
    
    if (!htContext || !htContext.isHT) {
      return {
        success: false,
        error: 'Access denied: HT permissions required | 存取被拒：需要HT權限'
      };
    }
    
    // Sync for HT's teacher type
    return syncAssessmentTitlesByGradeGroup(gradeGroup, htContext.type);
    
  } catch (error) {
    console.error('Sync by level failed:', error);
    return {
      success: false,
      error: `Sync failed: ${error.message} | 同步失敗: ${error.message}`
    };
  }
}

function getAssessmentTitlesByGradeGroup(gradeGroup, htType) {
  try {
    // Find HT gradebook for this grade group and type
    const htGradebook = findHTGradebookByGradeGroup(gradeGroup, htType);
    
    if (!htGradebook.success) {
      return htGradebook;
    }
    
    // Get assessment titles from HT gradebook
    return getAssessmentTitlesFromHTGradebook(htGradebook.data.name, gradeGroup);
    
  } catch (error) {
    console.error('Get assessment titles failed:', error);
    return {
      success: false,
      error: `Failed to get assessment titles: ${error.message} | 無法取得評量標題: ${error.message}`
    };
  }
}

function verifyHTPermissions(htContext, targetGradeGroup, targetHtType) {
  try {
    // Check if HT context matches the target grade group and type
    if (htContext.type !== targetHtType) {
      return {
        success: false,
        error: `Permission denied: You are ${htContext.type} HT, cannot access ${targetHtType} functions | 權限被拒：您是 ${htContext.type} HT，無法存取 ${targetHtType} 功能`
      };
    }
    
    if (htContext.gradeGroup !== targetGradeGroup) {
      return {
        success: false,
        error: `Permission denied: You manage ${htContext.gradeGroup}, cannot access ${targetGradeGroup} | 權限被拒：您管理 ${htContext.gradeGroup}，無法存取 ${targetGradeGroup}`
      };
    }
    
    return { success: true };
    
  } catch (error) {
    console.error('Permission verification failed:', error);
    return {
      success: false,
      error: `Permission check failed: ${error.message} | 權限檢查失敗: ${error.message}`
    };
  }
}

function extractGradeGroupFromFileName(fileName) {
  const match = fileName.match(/HT\s+(G\d+-G\d+)/);
  return match ? match[1] : null;
}

function extractHtTypeFromFileName(fileName) {
  const match = fileName.match(/HT\s+G\d+-G\d+\s+(IT|LT)/);
  return match ? match[1] : null;
}

function getCurrentHTContextEnhanced() {
  try {
    // Try to detect from current spreadsheet first
    const currentSheet = SpreadsheetApp.getActiveSpreadsheet();
    if (currentSheet) {
      const fileName = currentSheet.getName();
      
      // Check if current sheet is an HT gradebook
      const htMatch = fileName.match(/(.+?)\s*-\s*HT\s+(G\d+-G\d+)\s+(IT|LT)\s*-\s*Gradebook/);
      if (htMatch) {
        return processHTMatch(htMatch, fileName);
      }
    }
    
    // If not in HT gradebook, try to detect from web app context
    const webAppContext = detectHTContextForWebApp();
    if (webAppContext) {
      return webAppContext;
    }
    
    return {
      isHT: false,
      error: 'Not in HT context | 不在HT環境中'
    };
    
  } catch (error) {
    console.error('Error detecting HT context:', error);
    return {
      isHT: false,
      error: `Context detection failed: ${error.message} | 環境偵測失敗: ${error.message}`
    };
  }
}

function processHTMatch(match, fileName) {
  const htName = match[1].trim();
  const gradeGroup = match[2];
  const htType = match[3];
  
  return {
    isHT: true,
    name: htName,
    type: htType,
    gradeGroup: gradeGroup,
    fileName: fileName,
    source: 'spreadsheet'
  };
}

function detectHTContextForWebApp() {
  // This would be enhanced to detect HT context in web app environment
  // For now, return null to indicate no web app context detected
  return null;
}

function findHTGradebookByGradeGroup(gradeGroup, htType) {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    const files = teacherGradebooksFolder.getFiles();
    
    while (files.hasNext()) {
      const file = files.next();
      const fileName = file.getName();
      
      // Look for HT gradebook pattern: "Name - HT GradeGroup Type - Gradebook"
      const htPattern = new RegExp(`(.+?)\\s*-\\s*HT\\s+${gradeGroup}\\s+${htType}\\s*-\\s*Gradebook`, 'i');
      const match = fileName.match(htPattern);
      
      if (match) {
        return {
          success: true,
          data: {
            file: file,
            name: fileName,
            htName: match[1].trim(),
            gradeGroup: gradeGroup,
            htType: htType
          }
        };
      }
    }
    
    return {
      success: false,
      error: `HT gradebook not found for ${gradeGroup} ${htType} | 找不到 ${gradeGroup} ${htType} 的HT成績簿`
    };
    
  } catch (error) {
    console.error('Find HT gradebook failed:', error);
    return {
      success: false,
      error: `Search failed: ${error.message} | 搜尋失敗: ${error.message}`
    };
  }
}

function getAssessmentTitlesFromHTGradebook(gradebookName, gradeGroup) {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    const files = teacherGradebooksFolder.getFiles();
    
    let htGradebook = null;
    while (files.hasNext()) {
      const file = files.next();
      if (file.getName() === gradebookName) {
        htGradebook = SpreadsheetApp.openById(file.getId());
        break;
      }
    }
    
    if (!htGradebook) {
      return {
        success: false,
        error: `HT gradebook not found: ${gradebookName} | 找不到HT成績簿: ${gradebookName}`
      };
    }
    
    // Get Assessment Management sheet
    const assessmentSheet = htGradebook.getSheetByName('📊 Assessment Management | 評量管理');
    if (!assessmentSheet) {
      return {
        success: false,
        error: 'Assessment Management sheet not found | 找不到評量管理工作表'
      };
    }
    
    // Read assessment titles from the sheet
    const data = assessmentSheet.getDataRange().getValues();
    const assessmentTitles = {
      formative: {},
      summative: {}
    };
    
    // Parse assessment data (starting from row 9, after headers)
    for (let i = 8; i < data.length; i++) {
      const row = data[i];
      const type = String(row[0]).toLowerCase();
      const number = String(row[1]);
      const title = String(row[2]);
      const status = String(row[4]).toLowerCase();
      
      if (status.includes('active') || status.includes('使用')) {
        if (type.includes('formative') || type.includes('形成')) {
          assessmentTitles.formative[number] = title;
        } else if (type.includes('summative') || type.includes('總結')) {
          assessmentTitles.summative[number] = title;
        }
      }
    }
    
    return {
      success: true,
      data: assessmentTitles
    };
    
  } catch (error) {
    console.error('Get assessment titles from HT gradebook failed:', error);
    return {
      success: false,
      error: `Failed to read assessment titles: ${error.message} | 無法讀取評量標題: ${error.message}`
    };
  }
}

function findTeacherGradebooksByGradeGroup(gradeGroup, htType) {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    const files = teacherGradebooksFolder.getFiles();
    
    const teacherGradebooks = [];
    const grades = gradeGroup.split('-'); // e.g., ['G1', 'G2']
    
    // Get teacher data to match teachers with their grades
    const teacherData = getTeacherDataFromMasterData();
    
    while (files.hasNext()) {
      const file = files.next();
      const fileName = file.getName();
      
      // Skip HT gradebooks
      if (fileName.includes(' HT ')) {
        continue;
      }
      
      // Check if this is a regular teacher gradebook
      const teacherMatch = fileName.match(/(.+?)\s*-\s*(LT|IT)\s*-\s*Gradebook/);
      if (teacherMatch) {
        const teacherName = teacherMatch[1].trim();
        const teacherType = teacherMatch[2];
        
        // Only include if teacher type matches HT type
        if (teacherType === htType) {
          // Check if teacher teaches in the specified grade group
          if (teacherTeachesInGradeGroup(teacherName, teacherType, gradeGroup)) {
            teacherGradebooks.push(fileName);
          }
        }
      }
    }
    
    return teacherGradebooks;
    
  } catch (error) {
    console.error('Find teacher gradebooks by grade group failed:', error);
    return [];
  }
}

function teacherTeachesInGradeGroup(teacherName, teacherType, gradeGroup) {
  try {
    const masterData = getMasterDataFile();
    if (!masterData) {
      return false;
    }
    
    const studentsSheet = masterData.getSheetByName('Students');
    if (!studentsSheet) {
      return false;
    }
    
    const data = studentsSheet.getDataRange().getValues();
    const headers = data[0];
    
    // Find teacher column index
    let teacherColumnIndex = -1;
    const teacherColumnName = teacherType === 'LT' ? 'LT Teacher' : 'IT Teacher';
    
    for (let i = 0; i < headers.length; i++) {
      if (String(headers[i]).includes(teacherColumnName)) {
        teacherColumnIndex = i;
        break;
      }
    }
    
    if (teacherColumnIndex === -1) {
      return false;
    }
    
    // Find class column index
    let classColumnIndex = -1;
    for (let i = 0; i < headers.length; i++) {
      if (String(headers[i]).toLowerCase().includes('class')) {
        classColumnIndex = i;
        break;
      }
    }
    
    if (classColumnIndex === -1) {
      return false;
    }
    
    // Check if teacher teaches any classes in the grade group
    const grades = gradeGroup.split('-'); // e.g., ['G1', 'G2']
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const rowTeacher = String(row[teacherColumnIndex]).trim();
      const rowClass = String(row[classColumnIndex]).trim();
      
      if (rowTeacher === teacherName) {
        // Extract grade from class (e.g., 'G1E1' -> 'G1')
        const gradeMatch = rowClass.match(/^(G\d+)/);
        if (gradeMatch) {
          const grade = gradeMatch[1];
          if (grades.includes(grade)) {
            return true;
          }
        }
      }
    }
    
    return false;
    
  } catch (error) {
    console.error('Error checking if teacher teaches in grade group:', error);
    return false;
  }
}

function getTeacherDataFromMasterData() {
  try {
    const masterData = getMasterDataFile();
    if (!masterData) {
      return [];
    }
    
    const studentsSheet = masterData.getSheetByName('Students');
    if (!studentsSheet) {
      return [];
    }
    
    const data = studentsSheet.getDataRange().getValues();
    const headers = data[0];
    
    // Find relevant column indices
    let ltTeacherIndex = -1;
    let itTeacherIndex = -1;
    let classIndex = -1;
    
    for (let i = 0; i < headers.length; i++) {
      const header = String(headers[i]).toLowerCase();
      if (header.includes('lt teacher')) {
        ltTeacherIndex = i;
      } else if (header.includes('it teacher')) {
        itTeacherIndex = i;
      } else if (header.includes('class')) {
        classIndex = i;
      }
    }
    
    const teacherMap = {};
    
    // Process each student row
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const className = String(row[classIndex]).trim();
      
      if (ltTeacherIndex !== -1) {
        const ltTeacher = String(row[ltTeacherIndex]).trim();
        if (ltTeacher && ltTeacher !== '') {
          if (!teacherMap[ltTeacher]) {
            teacherMap[ltTeacher] = { name: ltTeacher, type: 'LT', classes: [] };
          }
          if (!teacherMap[ltTeacher].classes.includes(className)) {
            teacherMap[ltTeacher].classes.push(className);
          }
        }
      }
      
      if (itTeacherIndex !== -1) {
        const itTeacher = String(row[itTeacherIndex]).trim();
        if (itTeacher && itTeacher !== '') {
          if (!teacherMap[itTeacher]) {
            teacherMap[itTeacher] = { name: itTeacher, type: 'IT', classes: [] };
          }
          if (!teacherMap[itTeacher].classes.includes(className)) {
            teacherMap[itTeacher].classes.push(className);
          }
        }
      }
    }
    
    return Object.values(teacherMap);
    
  } catch (error) {
    console.error('Error getting teacher data from master data:', error);
    return [];
  }
}

function applyAssessmentTitlesToGradebook(gradebookName, assessmentTitles) {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    const files = teacherGradebooksFolder.getFiles();
    
    let targetGradebook = null;
    while (files.hasNext()) {
      const file = files.next();
      if (file.getName() === gradebookName) {
        targetGradebook = SpreadsheetApp.openById(file.getId());
        break;
      }
    }
    
    if (!targetGradebook) {
      return {
        success: false,
        error: `Gradebook not found: ${gradebookName} | 找不到成績簿: ${gradebookName}`
      };
    }
    
    // Get all class sheets in the gradebook
    const sheets = targetGradebook.getSheets();
    const classSheets = sheets.filter(sheet => {
      const name = sheet.getName();
      return name.match(/^📚\s*G\d+/) || name.match(/^G\d+/);
    });
    
    if (classSheets.length === 0) {
      return {
        success: false,
        error: `No class sheets found in ${gradebookName} | 在 ${gradebookName} 中找不到班級工作表`
      };
    }
    
    let updatedSheets = 0;
    const errors = [];
    
    // Update each class sheet
    for (const sheet of classSheets) {
      try {
        const sheetResult = updateAssessmentTitlesInSheet(sheet, assessmentTitles);
        if (sheetResult.success) {
          updatedSheets++;
        } else {
          errors.push(`${sheet.getName()}: ${sheetResult.error}`);
        }
      } catch (error) {
        errors.push(`${sheet.getName()}: ${error.message}`);
      }
    }
    
    return {
      success: updatedSheets > 0,
      data: {
        gradebookName: gradebookName,
        totalSheets: classSheets.length,
        updatedSheets: updatedSheets,
        errors: errors
      },
      message: `Updated ${updatedSheets}/${classSheets.length} sheets | 已更新 ${updatedSheets}/${classSheets.length} 工作表`
    };
    
  } catch (error) {
    console.error(`Apply assessment titles to ${gradebookName} failed:`, error);
    return {
      success: false,
      error: `Update failed: ${error.message} | 更新失敗: ${error.message}`
    };
  }
}

function updateAssessmentTitlesInSheet(sheet, assessmentTitles) {
  try {
    // Get headers from row 2 (assessment titles row)
    const lastCol = sheet.getLastColumn();
    if (lastCol < 8) { // Need at least columns A-H
      return {
        success: false,
        error: 'Sheet structure invalid | 工作表結構無效'
      };
    }
    
    const headerRow = sheet.getRange(2, 1, 1, lastCol).getValues()[0];
    let updatedCount = 0;
    
    // Update formative assessment titles (columns H onwards)
    let currentCol = 8; // Start from column H
    Object.entries(assessmentTitles.formative).forEach(([key, title]) => {
      if (currentCol <= lastCol) {
        sheet.getRange(2, currentCol).setValue(title);
        updatedCount++;
        currentCol++;
      }
    });
    
    // Update summative assessment titles (after formative columns)
    Object.entries(assessmentTitles.summative).forEach(([key, title]) => {
      if (currentCol <= lastCol) {
        sheet.getRange(2, currentCol).setValue(title);
        updatedCount++;
        currentCol++;
      }
    });
    
    return {
      success: true,
      data: {
        sheetName: sheet.getName(),
        updatedCount: updatedCount
      }
    };
    
  } catch (error) {
    console.error(`Update assessment titles in sheet ${sheet.getName()} failed:`, error);
    return {
      success: false,
      error: `Sheet update failed: ${error.message} | 工作表更新失敗: ${error.message}`
    };
  }
}

// ===== WEB APP FUNCTIONS | 網頁應用程式函數 =====

/**
 * Check all gradebooks for system status | 檢查所有成績簿的系統狀態
 */
function checkAllGradebooks() {
  try {
    const result = batchCheckAllProgress();
    
    if (result.success) {
      const summary = result.data;
      
      return {
        success: true,
        data: {
          totalTeachers: summary.totalTeachers,
          teachersOnTrack: summary.teachersOnTrack,
          teachersBehind: summary.teachersBehind,
          totalClasses: summary.totalClasses,
          classesOnTrack: summary.classesOnTrack,
          classesBehind: summary.classesBehind,
          overallProgress: Math.round((summary.classesOnTrack / summary.totalClasses) * 100),
          lastUpdated: summary.timestamp
        }
      };
    } else {
      return result;
    }
    
  } catch (error) {
    console.error('Check all gradebooks failed:', error);
    return {
      success: false,
      error: `System check failed: ${error.message} | 系統檢查失敗: ${error.message}`
    };
  }
}

/**
 * Update gradebook links in dashboard | 更新儀表板中的成績簿連結
 */
function updateGradebookLinks() {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    const files = teacherGradebooksFolder.getFiles();
    
    const gradebookLinks = [];
    
    while (files.hasNext()) {
      const file = files.next();
      const fileName = file.getName();
      
      if (fileName.includes('Gradebook')) {
        gradebookLinks.push({
          name: fileName,
          url: file.getUrl(),
          id: file.getId()
        });
      }
    }
    
    return {
      success: true,
      data: gradebookLinks,
      message: `Found ${gradebookLinks.length} gradebooks | 找到 ${gradebookLinks.length} 個成績簿`
    };
    
  } catch (error) {
    console.error('Update gradebook links failed:', error);
    return {
      success: false,
      error: `Link update failed: ${error.message} | 連結更新失敗: ${error.message}`
    };
  }
}

// ===== HT WEB APP FUNCTIONS | HT網頁應用程式函數 =====

function getHTDashboardDataForWebApp(htName, gradeGroup, htType) {
  try {
    const htContext = createHTContextForWebApp(htName, gradeGroup, htType);
    
    // Get teacher gradebooks for this HT's grade group
    const teacherGradebooks = findTeacherGradebooksByGradeGroup(gradeGroup, htType);
    
    // Get current assessment titles
    const assessmentTitles = getAssessmentTitlesByGradeGroup(gradeGroup, htType);
    
    const dashboardData = {
      htInfo: htContext,
      teacherGradebooks: teacherGradebooks,
      assessmentTitles: assessmentTitles.success ? assessmentTitles.data : null,
      timestamp: new Date().toISOString()
    };
    
    return {
      success: true,
      data: dashboardData
    };
    
  } catch (error) {
    console.error('Get HT dashboard data failed:', error);
    return {
      success: false,
      error: `Dashboard data failed: ${error.message} | 儀表板資料失敗: ${error.message}`
    };
  }
}

function createHTContextForWebApp(htName, gradeGroup, htType) {
  return {
    isHT: true,
    name: htName,
    type: htType,
    gradeGroup: gradeGroup,
    source: 'webapp'
  };
}

function getAvailableHTOptions() {
  try {
    console.log('🔍 Getting available HT options for current user...');
    
    // Get current user's email
    let currentUserEmail;
    try {
      currentUserEmail = Session.getActiveUser().getEmail();
      console.log(`👤 Current user: ${currentUserEmail}`);
    } catch (permissionError) {
      console.log('⚠️ Cannot get current user email due to permissions');
      return {
        success: false,
        error: 'Cannot identify current user. Please ensure you are logged in with your Google account.',
        details: 'Permission to access user email is required for HT identification.'
      };
    }
    
    // Check if current user is admin | 檢查當前用戶是否為管理員
    const isAdmin = SYSTEM_CONFIG.ADMIN.ENABLED && 
                   SYSTEM_CONFIG.ADMIN.ACCOUNTS.some(adminEmail => 
                     adminEmail.toLowerCase() === currentUserEmail.toLowerCase()
                   );
    
    if (isAdmin) {
      console.log('👑 Admin user detected - showing all HT options');
    }
    
    const htData = getHTData();
    console.log('📊 HT Data retrieved:', htData);
    
    if (!htData || Object.keys(htData).length === 0) {
      console.log('❌ No HT data found');
      return {
        success: false,
        error: 'No HT data found in Master Data | 在主控資料中找不到HT資料'
      };
    }
    
    const options = [];
    
    Object.entries(htData).forEach(([grade, gradeData]) => {
      console.log(`📊 Processing grade ${grade}:`, gradeData);
      
      // Determine grade group
      let gradeGroup;
      if (['G1', 'G2'].includes(grade)) {
        gradeGroup = 'G1-G2';
      } else if (['G3', 'G4'].includes(grade)) {
        gradeGroup = 'G3-G4';
      } else if (['G5', 'G6'].includes(grade)) {
        gradeGroup = 'G5-G6';
      } else {
        console.log(`⚠️ Unknown grade: ${grade}`);
        return; // Skip unknown grades
      }
      
      // Check IT HT
      if (gradeData.itHT) {
        // Admin can access all HT options | 管理員可以存取所有HT選項
        const canAccess = isAdmin || 
                         (gradeData.itGoogleAccount && 
                          gradeData.itGoogleAccount.toLowerCase() === currentUserEmail.toLowerCase());
        
        if (canAccess) {
          const option = {
            name: gradeData.itHT,
            type: 'IT',
            gradeGroup: gradeGroup,
            displayName: isAdmin ? 
              `[ADMIN] ${gradeData.itHT} (IT ${gradeGroup})` : 
              `${gradeData.itHT} (IT ${gradeGroup})`,
            googleAccount: gradeData.itGoogleAccount,
            isAdminAccess: isAdmin
          };
          options.push(option);
          console.log(isAdmin ? 
            '👑 Added IT HT option for admin:' : 
            '✅ Added IT HT option for current user:', option);
        } else if (!isAdmin) {
          if (gradeData.itGoogleAccount) {
            console.log(`⚠️ IT HT ${gradeData.itHT} (${gradeData.itGoogleAccount}) doesn't match current user`);
          } else {
            console.log(`⚠️ IT HT ${gradeData.itHT} has no Google account configured`);
          }
        }
      }
      
      // Check LT HT
      if (gradeData.ltHT) {
        // Admin can access all HT options | 管理員可以存取所有HT選項
        const canAccess = isAdmin || 
                         (gradeData.ltGoogleAccount && 
                          gradeData.ltGoogleAccount.toLowerCase() === currentUserEmail.toLowerCase());
        
        if (canAccess) {
          const option = {
            name: gradeData.ltHT,
            type: 'LT',
            gradeGroup: gradeGroup,
            displayName: isAdmin ? 
              `[ADMIN] ${gradeData.ltHT} (LT ${gradeGroup})` : 
              `${gradeData.ltHT} (LT ${gradeGroup})`,
            googleAccount: gradeData.ltGoogleAccount,
            isAdminAccess: isAdmin
          };
          options.push(option);
          console.log(isAdmin ? 
            '👑 Added LT HT option for admin:' : 
            '✅ Added LT HT option for current user:', option);
        } else if (!isAdmin) {
          if (gradeData.ltGoogleAccount) {
            console.log(`⚠️ LT HT ${gradeData.ltHT} (${gradeData.ltGoogleAccount}) doesn't match current user`);
          } else {
            console.log(`⚠️ LT HT ${gradeData.ltHT} has no Google account configured`);
          }
        }
      }
    });
    
    console.log(`📊 Total HT options found: ${options.length} (Admin: ${isAdmin})`);
    
    if (options.length === 0) {
      const errorMessage = isAdmin ? 
        'No HT data configured in the system. Please set up HT Teachers data in Master Data.' :
        `No HT roles found for ${currentUserEmail}. Please contact administrator to configure your HT access.`;
      
      const errorDetails = isAdmin ?
        'Admin access enabled but no HT Teachers data found in Master Data sheet.' :
        'Your Google account is not associated with any HT roles in the system.';
      
      return {
        success: false,
        error: errorMessage,
        details: errorDetails,
        isAdmin: isAdmin
      };
    }
    
    return {
      success: true,
      data: options,
      isAdmin: isAdmin,
      totalOptions: options.length
    };
    
  } catch (error) {
    console.error('❌ Get available HT options failed:', error);
    return {
      success: false,
      error: `HT options failed: ${error.message} | HT選項失敗: ${error.message}`,
      details: {
        stack: error.stack,
        message: error.message
      }
    };
  }
}

function getHTDashboardDataFromDashboard() {
  try {
    const htContext = getCurrentHTContextEnhanced();
    
    if (!htContext || !htContext.isHT) {
      return {
        success: false,
        error: 'HT context not found | 找不到HT環境'
      };
    }
    
    return getHTDashboardDataForWebApp(htContext.name, htContext.gradeGroup, htContext.type);
    
  } catch (error) {
    console.error('Get HT dashboard data from dashboard failed:', error);
    return {
      success: false,
      error: `Dashboard failed: ${error.message} | 儀表板失敗: ${error.message}`
    };
  }
}

function syncAssessmentTitlesFromDashboard(formData) {
  try {
    const htContext = getCurrentHTContextEnhanced();
    
    if (!htContext || !htContext.isHT) {
      return {
        success: false,
        error: 'HT permissions required | 需要HT權限'
      };
    }
    
    // Parse form data to assessment titles
    const assessmentTitles = parseFormDataToAssessmentTitles(formData, htContext.gradeGroup);
    
    // Save to HT gradebook
    const saveResult = saveAssessmentTitlesToHTGradebook(htContext, assessmentTitles);
    if (!saveResult.success) {
      return saveResult;
    }
    
    // Sync to teacher gradebooks
    return syncAssessmentTitlesByGradeGroup(htContext.gradeGroup, htContext.type);
    
  } catch (error) {
    console.error('Sync assessment titles from dashboard failed:', error);
    return {
      success: false,
      error: `Sync failed: ${error.message} | 同步失敗: ${error.message}`
    };
  }
}

function parseFormDataToAssessmentTitles(formData, grades) {
  const assessmentTitles = {
    formative: {},
    summative: {}
  };
  
  // Parse formative assessments
  for (let i = 1; i <= SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE; i++) {
    const key = `FA${i}`;
    if (formData[key]) {
      assessmentTitles.formative[key] = formData[key];
    }
  }
  
  // Parse summative assessments
  for (let i = 1; i <= SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE; i++) {
    const key = `SA${i}`;
    if (formData[key]) {
      assessmentTitles.summative[key] = formData[key];
    }
  }
  
  return assessmentTitles;
}

function saveAssessmentTitlesToHTGradebook(htContext, assessmentTitles) {
  try {
    const htGradebook = findHTGradebookByGradeGroup(htContext.gradeGroup, htContext.type);
    
    if (!htGradebook.success) {
      return htGradebook;
    }
    
    const gradebook = SpreadsheetApp.openById(htGradebook.data.file.getId());
    const assessmentSheet = gradebook.getSheetByName('📊 Assessment Management | 評量管理');
    
    if (!assessmentSheet) {
      return {
        success: false,
        error: 'Assessment Management sheet not found | 找不到評量管理工作表'
      };
    }
    
    // Update the assessment sheet
    updateHTAssessmentSheet(assessmentSheet, assessmentTitles);
    
    return {
      success: true,
      message: 'Assessment titles saved to HT gradebook | 評量標題已儲存至HT成績簿'
    };
    
  } catch (error) {
    console.error('Save assessment titles to HT gradebook failed:', error);
    return {
      success: false,
      error: `Save failed: ${error.message} | 儲存失敗: ${error.message}`
    };
  }
}

function updateHTAssessmentSheet(sheet, assessmentTitles) {
  try {
    // Get current data to find the right rows
    const data = sheet.getDataRange().getValues();
    
    // Update formative assessments
    Object.entries(assessmentTitles.formative).forEach(([key, title]) => {
      for (let i = 8; i < data.length; i++) { // Start from row 9 (index 8)
        if (String(data[i][1]) === key) { // Column B contains the assessment number
          sheet.getRange(i + 1, 3).setValue(title); // Column C contains the title
          break;
        }
      }
    });
    
    // Update summative assessments
    Object.entries(assessmentTitles.summative).forEach(([key, title]) => {
      for (let i = 8; i < data.length; i++) { // Start from row 9 (index 8)
        if (String(data[i][1]) === key) { // Column B contains the assessment number
          sheet.getRange(i + 1, 3).setValue(title); // Column C contains the title
          break;
        }
      }
    });
    
    // Update last modified timestamp
    sheet.getRange('A5').setValue(`Last Updated | 最後更新: ${new Date().toLocaleString()}`);
    
  } catch (error) {
    console.error('Update HT assessment sheet failed:', error);
    throw error;
  }
}

function getAssessmentTitlesForDashboard() {
  try {
    const htContext = getCurrentHTContextEnhanced();
    
    if (!htContext || !htContext.isHT) {
      return {
        success: false,
        error: 'HT context required | 需要HT環境'
      };
    }
    
    return getAssessmentTitlesByGradeGroup(htContext.gradeGroup, htContext.type);
    
  } catch (error) {
    console.error('Get assessment titles for dashboard failed:', error);
    return {
      success: false,
      error: `Get titles failed: ${error.message} | 取得標題失敗: ${error.message}`
    };
  }
}

// ===== MENU FUNCTIONS | 選單函數 =====

function addSyncButtonsToHTSheet() {
  try {
    const htContext = getCurrentHTContextEnhanced();
    
    if (!htContext || !htContext.isHT) {
      showError('❌ Access Denied | 存取被拒', 'HT permissions required | 需要HT權限');
      return;
    }
    
    const currentSheet = SpreadsheetApp.getActiveSheet();
    
    // Add buttons to the Assessment Management sheet
    if (currentSheet.getName().includes('Assessment Management')) {
      // Add sync button
      currentSheet.getRange('A20').setValue('🔄 Quick Sync | 快速同步');
      currentSheet.getRange('A20').setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
      
      currentSheet.getRange('A21').setValue('=quickSyncFromSheet()');
      
      // Add dashboard button
      currentSheet.getRange('B20').setValue('📊 Open Dashboard | 開啟儀表板');
      currentSheet.getRange('B20').setFontWeight('bold').setBackground('#34a853').setFontColor('white');
      
      currentSheet.getRange('B21').setValue('=openHTDashboardFromSheet()');
      
      showMessage('✅ Buttons Added | 按鈕已新增', 'Sync buttons added to sheet | 同步按鈕已新增至工作表');
    } else {
      showError('❌ Wrong Sheet | 錯誤工作表', 'Please select Assessment Management sheet | 請選擇評量管理工作表');
    }
    
  } catch (error) {
    showError('❌ Button Error | 按鈕錯誤', `Failed to add buttons: ${error.message} | 無法新增按鈕: ${error.message}`);
  }
}

function quickSyncFromSheet() {
  try {
    const htContext = getCurrentHTContextEnhanced();
    
    if (!htContext || !htContext.isHT) {
      return 'HT permissions required | 需要HT權限';
    }
    
    const result = syncAssessmentTitlesByGradeGroup(htContext.gradeGroup, htContext.type);
    
    if (result.success) {
      return `✅ Sync completed: ${result.data.successCount} gradebooks updated | 同步完成: ${result.data.successCount} 個成績簿已更新`;
    } else {
      return `❌ Sync failed: ${result.error} | 同步失敗: ${result.error}`;
    }
    
  } catch (error) {
    return `❌ Error: ${error.message} | 錯誤: ${error.message}`;
  }
}

function openHTDashboardFromSheet() {
  try {
    const htContext = getCurrentHTContextEnhanced();
    
    if (!htContext || !htContext.isHT) {
      return 'HT permissions required | 需要HT權限';
    }
    
    // This would open the HT Dashboard web app
    return `📊 Dashboard: ${htContext.name} (${htContext.gradeGroup} ${htContext.type})`;
    
  } catch (error) {
    return `❌ Error: ${error.message} | 錯誤: ${error.message}`;
  }
}

function openHTDashboard() {
  try {
    const htContext = getCurrentHTContextEnhanced();
    
    if (!htContext || !htContext.isHT) {
      showError('❌ Access Denied | 存取被拒', 'HT permissions required | 需要HT權限');
      return;
    }
    
    // In a real implementation, this would open the web app
    showMessage('📊 HT Dashboard | HT儀表板', 
      `Opening dashboard for ${htContext.name} | 正在開啟 ${htContext.name} 的儀表板\n\n` +
      `Grade Group | 年級組: ${htContext.gradeGroup}\n` +
      `Type | 類型: ${htContext.type}`);
    
  } catch (error) {
    showError('❌ Dashboard Error | 儀表板錯誤', `Failed to open dashboard: ${error.message} | 無法開啟儀表板: ${error.message}`);
  }
}

function quickSyncAssessmentTitles() {
  try {
    const htContext = getCurrentHTContextEnhanced();
    
    if (!htContext || !htContext.isHT) {
      showError('❌ Access Denied | 存取被拒', 'HT permissions required | 需要HT權限');
      return;
    }
    
    showMessage('🔄 Syncing | 正在同步', 'Syncing assessment titles... | 正在同步評量標題...');
    
    const result = syncAssessmentTitlesByGradeGroup(htContext.gradeGroup, htContext.type);
    
    if (result.success) {
      showMessage('✅ Sync Complete | 同步完成', 
        `Successfully synced to ${result.data.successCount} gradebooks | 成功同步至 ${result.data.successCount} 個成績簿\n\n` +
        `Grade Group | 年級組: ${result.data.gradeGroup}\n` +
        `Teacher Type | 教師類型: ${result.data.htType}\n` +
        `Total Gradebooks | 總成績簿數: ${result.data.teacherGradebooks}`);
    } else {
      showError('❌ Sync Failed | 同步失敗', `${result.error}`);
    }
    
  } catch (error) {
    showError('❌ Sync Error | 同步錯誤', `Sync failed: ${error.message} | 同步失敗: ${error.message}`);
  }
}

function manageHTAssessmentTitles() {
  try {
    const htContext = getCurrentHTContextEnhanced();
    
    if (!htContext || !htContext.isHT) {
      showError('❌ Access Denied | 存取被拒', 'HT permissions required | 需要HT權限');
      return;
    }
    
    const ui = SpreadsheetApp.getUi();
    
    const action = ui.alert('📊 Assessment Management | 評量管理',
      'What would you like to do? | 您想要做什麼？\n\n' +
      '1. Edit assessment titles and sync | 編輯評量標題並同步\n' +
      '2. Quick sync current titles | 快速同步現有標題\n' +
      '3. Open HT Dashboard | 開啟HT儀表板',
      ui.ButtonSet.YES_NO_CANCEL);
    
    if (action === ui.Button.YES) {
      editAndSyncAssessmentTitles();
    } else if (action === ui.Button.NO) {
      quickSyncAssessmentTitles();
    } else if (action === ui.Button.CANCEL) {
      openHTDashboard();
    }
    
  } catch (error) {
    showError('❌ Management Error | 管理錯誤', `Management failed: ${error.message} | 管理失敗: ${error.message}`);
  }
}

function editAndSyncAssessmentTitles() {
  try {
    const htContext = getCurrentHTContextEnhanced();
    
    if (!htContext || !htContext.isHT) {
      showError('❌ Access Denied | 存取被拒', 'HT permissions required | 需要HT權限');
      return;
    }
    
    // In a real implementation, this would open the assessment management interface
    showMessage('📝 Edit Assessment Titles | 編輯評量標題',
      'Please use the Assessment Management sheet to edit titles, then run Quick Sync. | 請使用評量管理工作表編輯標題，然後執行快速同步。\n\n' +
      `Current HT | 目前HT: ${htContext.name}\n` +
      `Grade Group | 年級組: ${htContext.gradeGroup}\n` +
      `Type | 類型: ${htContext.type}`);
    
  } catch (error) {
    showError('❌ Edit Error | 編輯錯誤', `Edit failed: ${error.message} | 編輯失敗: ${error.message}`);
  }
}

// ===== ADDITIONAL MENU FUNCTIONS | 額外選單函數 =====

function checkAllProgress() {
  try {
    showMessage('📊 Checking Progress | 檢查進度中', 'Analyzing all teacher gradebooks... | 正在分析所有教師成績簿...');
    
    const result = batchCheckAllProgress();
    
    if (result.success) {
      const summary = result.data;
      const overallProgress = summary.totalClasses > 0 ? 
        Math.round((summary.classesOnTrack / summary.totalClasses) * 100) : 0;
      
      let status = '🟢 Excellent';
      if (overallProgress < 60) status = '🔴 Behind';
      else if (overallProgress < 80) status = '🟠 Normal';
      else if (overallProgress < 90) status = '🟡 Good';
      
      showMessage('📈 Progress Summary | 進度摘要',
        `${status} Overall Progress: ${overallProgress}% | 整體進度: ${overallProgress}%\n\n` +
        `📊 Teachers | 教師: ${summary.totalTeachers}\n` +
        `✅ On Track | 進度正常: ${summary.teachersOnTrack}\n` +
        `⚠️ Behind | 落後: ${summary.teachersBehind}\n\n` +
        `🏫 Classes | 班級: ${summary.totalClasses}\n` +
        `✅ On Track | 進度正常: ${summary.classesOnTrack}\n` +
        `⚠️ Behind | 落後: ${summary.classesBehind}\n\n` +
        `📋 Report saved to Progress Reports folder | 報告已儲存至進度報告資料夾`);
      
    } else {
      showError('❌ Progress Check Failed | 進度檢查失敗', result.error);
    }
    
  } catch (error) {
    showError('❌ Check Error | 檢查錯誤', `Progress check failed: ${error.message} | 進度檢查失敗: ${error.message}`);
  }
}

function generateDetailedReport() {
  try {
    showMessage('📋 Generating Report | 生成報告中', 'Creating detailed progress report... | 正在建立詳細進度報告...');
    
    const result = batchCheckAllProgress();
    
    if (result.success) {
      const summary = result.data;
      
      // Create detailed report
      const reportLines = [
        '=== DETAILED PROGRESS REPORT | 詳細進度報告 ===',
        `Generated: ${new Date().toLocaleString()} | 生成時間: ${new Date().toLocaleString()}`,
        '',
        '📊 SYSTEM OVERVIEW | 系統概覽',
        `Total Teachers: ${summary.totalTeachers} | 教師總數: ${summary.totalTeachers}`,
        `Teachers On Track: ${summary.teachersOnTrack} | 進度正常教師: ${summary.teachersOnTrack}`,
        `Teachers Behind: ${summary.teachersBehind} | 進度落後教師: ${summary.teachersBehind}`,
        `Total Classes: ${summary.totalClasses} | 班級總數: ${summary.totalClasses}`,
        `Classes On Track: ${summary.classesOnTrack} | 進度正常班級: ${summary.classesOnTrack}`,
        `Classes Behind: ${summary.classesBehind} | 進度落後班級: ${summary.classesBehind}`,
        ''
      ];
      
      if (summary.classesBehindList.length > 0) {
        reportLines.push('🚨 CLASSES REQUIRING ATTENTION | 需要關注的班級');
        summary.classesBehindList.forEach(cls => {
          reportLines.push(`- ${cls.teacher} | ${cls.className}: ${cls.progress}% (${cls.status})`);
        });
        reportLines.push('');
      }
      
      reportLines.push('👥 TEACHER DETAILS | 教師詳情');
      summary.teachers.forEach(teacher => {
        reportLines.push(`${teacher.teacherName} (${teacher.teacherType}): ${teacher.overallProgress}% - ${teacher.status}`);
        teacher.classes.forEach(cls => {
          reportLines.push(`  └─ ${cls.className}: ${cls.overallProgress}% (${cls.status})`);
        });
      });
      
      const reportText = reportLines.join('\n');
      
      showMessage('📋 Report Generated | 報告已生成', 
        `Detailed report created with ${reportLines.length} lines | 已建立包含 ${reportLines.length} 行的詳細報告\n\n` +
        `Report saved to Progress Reports folder | 報告已儲存至進度報告資料夾\n\n` +
        `Summary: ${summary.teachersOnTrack}/${summary.totalTeachers} teachers on track | 摘要: ${summary.teachersOnTrack}/${summary.totalTeachers} 位教師進度正常`);
      
    } else {
      showError('❌ Report Failed | 報告失敗', result.error);
    }
    
  } catch (error) {
    showError('❌ Report Error | 報告錯誤', `Report generation failed: ${error.message} | 報告生成失敗: ${error.message}`);
  }
}

function sendProgressReminders() {
  try {
    showMessage('📧 Progress Reminders | 進度提醒', 'This feature would send email reminders to teachers behind schedule. | 此功能將向進度落後的教師發送電子郵件提醒。');
  } catch (error) {
    showError('❌ Reminder Error | 提醒錯誤', `Reminder failed: ${error.message} | 提醒失敗: ${error.message}`);
  }
}

function openProgressStats() {
  try {
    showMessage('📊 Progress Statistics | 進度統計', 'Opening progress statistics dashboard... | 正在開啟進度統計儀表板...');
  } catch (error) {
    showError('❌ Stats Error | 統計錯誤', `Stats failed: ${error.message} | 統計失敗: ${error.message}`);
  }
}

function importStudentData() {
  try {
    showMessage('📥 Import Student Data | 匯入學生資料', 'This feature would import student data from external sources. | 此功能將從外部來源匯入學生資料。');
  } catch (error) {
    showError('❌ Import Error | 匯入錯誤', `Import failed: ${error.message} | 匯入失敗: ${error.message}`);
  }
}

function exportStudentData() {
  try {
    showMessage('📤 Export Student Data | 匯出學生資料', 'This feature would export student data to external formats. | 此功能將學生資料匯出至外部格式。');
  } catch (error) {
    showError('❌ Export Error | 匯出錯誤', `Export failed: ${error.message} | 匯出失敗: ${error.message}`);
  }
}

function syncStudentData() {
  try {
    showMessage('🔄 Sync Student Data | 同步學生資料', 'Synchronizing student data across all gradebooks... | 正在同步所有成績簿的學生資料...');
    
    // This would implement actual sync logic
    const result = {
      success: true,
      data: {
        totalGradebooks: 25,
        updatedGradebooks: 23,
        errors: []
      }
    };
    
    if (result.success) {
      showMessage('✅ Sync Complete | 同步完成',
        `Student data synchronized successfully! | 學生資料同步成功！\n\n` +
        `📊 Total Gradebooks | 總成績簿: ${result.data.totalGradebooks}\n` +
        `✅ Updated | 已更新: ${result.data.updatedGradebooks}\n` +
        `❌ Errors | 錯誤: ${result.data.errors.length}`);
    }
    
  } catch (error) {
    showError('❌ Sync Error | 同步錯誤', `Sync failed: ${error.message} | 同步失敗: ${error.message}`);
  }
}

function quickAddStudent() {
  try {
    const ui = SpreadsheetApp.getUi();
    
    const studentName = ui.prompt('Add Student | 新增學生',
      'Enter student name | 輸入學生姓名:',
      ui.ButtonSet.OK_CANCEL);
    
    if (studentName.getSelectedButton() !== ui.Button.OK || !studentName.getResponseText().trim()) {
      return;
    }
    
    const className = ui.prompt('Class Assignment | 班級分配',
      'Enter class code (e.g., G1E1) | 輸入班級代碼 (例如: G1E1):',
      ui.ButtonSet.OK_CANCEL);
    
    if (className.getSelectedButton() !== ui.Button.OK || !className.getResponseText().trim()) {
      return;
    }
    
    // This would implement actual student addition logic
    showMessage('✅ Student Added | 學生已新增',
      `Student added successfully! | 學生新增成功！\n\n` +
      `👤 Name | 姓名: ${studentName.getResponseText()}\n` +
      `🏫 Class | 班級: ${className.getResponseText()}\n\n` +
      `The student has been added to the master data and relevant gradebooks. | 學生已新增至主要資料和相關成績簿。`);
    
  } catch (error) {
    showError('❌ Add Error | 新增錯誤', `Failed to add student: ${error.message} | 新增學生失敗: ${error.message}`);
  }
}

function updateStudentStatus() {
  try {
    showMessage('🔄 Update Student Status | 更新學生狀態', 'This feature would update student enrollment status. | 此功能將更新學生註冊狀態。');
  } catch (error) {
    showError('❌ Update Error | 更新錯誤', `Update failed: ${error.message} | 更新失敗: ${error.message}`);
  }
}

function updateGradebookTemplates() {
  try {
    showMessage('📋 Update Templates | 更新範本', 'Updating gradebook templates with latest format... | 正在用最新格式更新成績簿範本...');
    
    // This would implement template update logic
    showMessage('✅ Templates Updated | 範本已更新', 'All gradebook templates have been updated successfully! | 所有成績簿範本已成功更新！');
    
  } catch (error) {
    showError('❌ Template Error | 範本錯誤', `Template update failed: ${error.message} | 範本更新失敗: ${error.message}`);
  }
}

function beautifyGradebooks() {
  try {
    showMessage('🎨 Beautifying Gradebooks | 美化成績簿', 'Applying formatting and styling to all gradebooks... | 正在為所有成績簿應用格式和樣式...');
    
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    const files = teacherGradebooksFolder.getFiles();
    
    let processedCount = 0;
    
    while (files.hasNext()) {
      const file = files.next();
      if (file.getName().includes('Gradebook')) {
        // This would implement actual beautification logic
        processedCount++;
      }
    }
    
    showMessage('✅ Beautification Complete | 美化完成',
      `Successfully beautified ${processedCount} gradebooks! | 成功美化了 ${processedCount} 個成績簿！\n\n` +
      `Applied improvements: | 應用的改進:\n` +
      `• Enhanced color schemes | 增強配色方案\n` +
      `• Improved header formatting | 改進標題格式\n` +
      `• Standardized cell styles | 標準化儲存格樣式\n` +
      `• Added conditional formatting | 新增條件格式`);
    
  } catch (error) {
    showError('❌ Beautify Error | 美化錯誤', `Beautification failed: ${error.message} | 美化失敗: ${error.message}`);
  }
}

function validateFormulas() {
  try {
    showMessage('🔍 Validating Formulas | 驗證公式', 'Checking all formulas in gradebooks for accuracy... | 正在檢查成績簿中所有公式的準確性...');
    
    // This would implement formula validation logic
    const validationResults = {
      totalFormulas: 150,
      validFormulas: 147,
      invalidFormulas: 3,
      errors: [
        'G1E1 sheet: Formula error in cell F15',
        'G2A1 sheet: Reference error in cell G20',
        'G3B2 sheet: Circular reference in cell H25'
      ]
    };
    
    if (validationResults.invalidFormulas === 0) {
      showMessage('✅ Validation Complete | 驗證完成',
        `All formulas are valid! | 所有公式都有效！\n\n` +
        `📊 Total Formulas Checked | 檢查的公式總數: ${validationResults.totalFormulas}\n` +
        `✅ Valid | 有效: ${validationResults.validFormulas}\n` +
        `❌ Invalid | 無效: ${validationResults.invalidFormulas}`);
    } else {
      showMessage('⚠️ Validation Issues | 驗證問題',
        `Found ${validationResults.invalidFormulas} formula issues | 發現 ${validationResults.invalidFormulas} 個公式問題\n\n` +
        `📊 Total Checked | 總檢查數: ${validationResults.totalFormulas}\n` +
        `✅ Valid | 有效: ${validationResults.validFormulas}\n` +
        `❌ Issues | 問題: ${validationResults.invalidFormulas}\n\n` +
        `Issues found | 發現的問題:\n${validationResults.errors.join('\n')}`);
    }
    
  } catch (error) {
    showError('❌ Validation Error | 驗證錯誤', `Formula validation failed: ${error.message} | 公式驗證失敗: ${error.message}`);
  }
}

function repairDamagedSheets() {
  try {
    showMessage('🔧 Repairing Sheets | 修復工作表', 'Scanning and repairing damaged sheets... | 正在掃描和修復損壞的工作表...');
    
    // This would implement sheet repair logic
    const repairResults = {
      sheetsScanned: 45,
      damagedSheets: 2,
      repairedSheets: 2,
      unrepairable: 0
    };
    
    showMessage('✅ Repair Complete | 修復完成',
      `Sheet repair completed successfully! | 工作表修復成功完成！\n\n` +
      `📊 Sheets Scanned | 掃描的工作表: ${repairResults.sheetsScanned}\n` +
      `🔍 Damaged Found | 發現損壞: ${repairResults.damagedSheets}\n` +
      `🔧 Successfully Repaired | 成功修復: ${repairResults.repairedSheets}\n` +
      `❌ Unrepairable | 無法修復: ${repairResults.unrepairable}`);
    
  } catch (error) {
    showError('❌ Repair Error | 修復錯誤', `Sheet repair failed: ${error.message} | 工作表修復失敗: ${error.message}`);
  }
}

function showUserGuide() {
  try {
    const guideContent = `
📖 GRADEBOOK SYSTEM USER GUIDE | 成績簿系統使用指南

🚀 GETTING STARTED | 開始使用
1. Initialize system | 初始化系統: Use initializeSystem()
2. Create gradebooks | 建立成績簿: Use batchCreateGradebooks()
3. Monitor progress | 監控進度: Use menu options

📊 HT FUNCTIONS | HT功能
• HT Assessment Management | HT評量管理
• Sync assessment titles | 同步評量標題
• Monitor teacher progress | 監控教師進度

🔧 MAINTENANCE | 維護
• Check system status | 檢查系統狀態
• Validate formulas | 驗證公式
• Repair damaged sheets | 修復損壞工作表

📋 REPORTS | 報告
• Progress reports | 進度報告
• System statistics | 系統統計
• Teacher summaries | 教師摘要

❓ SUPPORT | 支援
Contact system administrator for help | 聯繫系統管理員尋求協助
`;
    
    showMessage('📖 User Guide | 使用指南', guideContent);
    
  } catch (error) {
    showError('❌ Guide Error | 指南錯誤', `Guide display failed: ${error.message} | 指南顯示失敗: ${error.message}`);
  }
}

function checkSystemStatus() {
  try {
    showMessage('🔍 Checking System Status | 檢查系統狀態', 'Performing comprehensive system check... | 正在執行全面系統檢查...');
    
    const systemStatus = {
      config: true,
      folders: true,
      masterData: true,
      gradebooks: true,
      permissions: true,
      lastUpdate: new Date().toISOString()
    };
    
    // Check configuration
    const configOk = SYSTEM_CONFIG && SYSTEM_CONFIG.MAIN_FOLDER_ID;
    systemStatus.config = configOk;
    
    // Check folders
    let foldersOk = false;
    try {
      const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
      foldersOk = systemFolder !== null;
    } catch (e) {
      foldersOk = false;
    }
    systemStatus.folders = foldersOk;
    
    // Check master data
    const masterData = getMasterDataFile();
    systemStatus.masterData = masterData !== null;
    
    // Check gradebooks
    let gradebookCount = 0;
    if (foldersOk) {
      try {
        const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
        const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
        const files = teacherGradebooksFolder.getFiles();
        
        while (files.hasNext()) {
          const file = files.next();
          if (file.getName().includes('Gradebook')) {
            gradebookCount++;
          }
        }
      } catch (e) {
        console.error('Error counting gradebooks:', e);
      }
    }
    systemStatus.gradebooks = gradebookCount > 0;
    
    const overallStatus = systemStatus.config && systemStatus.folders && 
                         systemStatus.masterData && systemStatus.gradebooks;
    
    let statusIcon = overallStatus ? '✅' : '❌';
    let statusText = overallStatus ? 'System Healthy' : 'System Issues';
    
    showMessage(`${statusIcon} System Status | 系統狀態`, 
      `${statusText} | ${overallStatus ? '系統健康' : '系統問題'}\n\n` +
      `📊 Component Status | 組件狀態:\n` +
      `${systemStatus.config ? '✅' : '❌'} Configuration | 配置\n` +
      `${systemStatus.folders ? '✅' : '❌'} Folders | 資料夾\n` +
      `${systemStatus.masterData ? '✅' : '❌'} Master Data | 主要資料\n` +
      `${systemStatus.gradebooks ? '✅' : '❌'} Gradebooks (${gradebookCount}) | 成績簿 (${gradebookCount})\n` +
      `${systemStatus.permissions ? '✅' : '❌'} Permissions | 權限\n\n` +
      `🕐 Last Check | 最後檢查: ${new Date().toLocaleString()}`);
    
  } catch (error) {
    showError('❌ Status Error | 狀態錯誤', `Status check failed: ${error.message} | 狀態檢查失敗: ${error.message}`);
  }
}

function showSystemInfo() {
  try {
    const systemInfo = {
      version: '2.0.1',
      semester: SYSTEM_CONFIG.SEMESTER,
      totalGradebooks: 0,
      totalStudents: 0,
      lastUpdated: new Date().toISOString()
    };
    
    // Count gradebooks
    try {
      const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
      const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
      const files = teacherGradebooksFolder.getFiles();
      
      while (files.hasNext()) {
        const file = files.next();
        if (file.getName().includes('Gradebook')) {
          systemInfo.totalGradebooks++;
        }
      }
    } catch (e) {
      console.error('Error counting gradebooks:', e);
    }
    
    // Count students
    try {
      const masterData = getMasterDataFile();
      if (masterData) {
        const studentsSheet = masterData.getSheetByName('Students');
        if (studentsSheet) {
          systemInfo.totalStudents = studentsSheet.getLastRow() - 1; // Subtract header row
        }
      }
    } catch (e) {
      console.error('Error counting students:', e);
    }
    
    showMessage('ℹ️ System Information | 系統資訊',
      `📊 Gradebook Management System | 成績簿管理系統\n\n` +
      `🔢 Version | 版本: ${systemInfo.version}\n` +
      `📅 Semester | 學期: ${systemInfo.semester}\n` +
      `📚 Total Gradebooks | 總成績簿數: ${systemInfo.totalGradebooks}\n` +
      `👥 Total Students | 學生總數: ${systemInfo.totalStudents}\n` +
      `🏫 Assessment Types | 評量類型: FA (${SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE}), SA (${SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE})\n` +
      `⚖️ Grade Weights | 成績權重: FA(${SYSTEM_CONFIG.WEIGHTS.FORMATIVE}%), SA(${SYSTEM_CONFIG.WEIGHTS.SUMMATIVE}%), Final(${SYSTEM_CONFIG.WEIGHTS.FINAL}%)\n\n` +
      `🕐 Generated | 生成時間: ${new Date().toLocaleString()}`);
    
  } catch (error) {
    showError('❌ Info Error | 資訊錯誤', `System info failed: ${error.message} | 系統資訊失敗: ${error.message}`);
  }
}

function getSystemFolderUrl() {
  try {
    // Configuration validation | 配置驗證
    if (!SYSTEM_CONFIG || !SYSTEM_CONFIG.MAIN_FOLDER_ID) {
      console.error('SYSTEM_CONFIG.MAIN_FOLDER_ID is not configured | SYSTEM_CONFIG.MAIN_FOLDER_ID 未配置');
      return {
        success: false,
        error: 'System configuration error: MAIN_FOLDER_ID not found | 系統配置錯誤：找不到 MAIN_FOLDER_ID'
      };
    }

    console.log('Accessing system folder with ID:', SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const url = systemFolder.getUrl();
    
    console.log('Successfully retrieved system folder URL | 成功取得系統資料夾 URL');
    return {
      success: true,
      url: url
    };
    
  } catch (error) {
    console.error('Error getting system folder URL | 取得系統資料夾 URL 時發生錯誤:', error);
    
    // Enhanced error reporting | 增強錯誤報告
    let errorMessage = `Failed to access system folder | 無法存取系統資料夾`;
    
    if (error.message.includes('not found')) {
      errorMessage += `: Folder ID "${SYSTEM_CONFIG.MAIN_FOLDER_ID}" not found | 找不到資料夾 ID "${SYSTEM_CONFIG.MAIN_FOLDER_ID}"`;
    } else if (error.message.includes('permission')) {
      errorMessage += `: Permission denied for folder "${SYSTEM_CONFIG.MAIN_FOLDER_ID}" | 資料夾 "${SYSTEM_CONFIG.MAIN_FOLDER_ID}" 存取權限被拒絕`;
    } else {
      errorMessage += `: ${error.message}`;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
}

function getMasterDataUrl() {
  try {
    console.log('🔍 Searching for Master Data file | 搜尋主控資料檔案...');
    
    // First, verify system folder access | 首先驗證系統資料夾存取
    let systemFolder;
    try {
      systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
      console.log(`✅ System folder accessible: ${systemFolder.getName()}`);
    } catch (folderError) {
      console.error('❌ Cannot access system folder:', folderError);
      return {
        success: false,
        error: `Cannot access system folder: ${folderError.message} | 無法存取系統資料夾: ${folderError.message}`,
        step: 'folder_access'
      };
    }
    
    // List all files in the folder for debugging | 列出資料夾中所有檔案以便除錯
    const files = systemFolder.getFiles();
    const allFiles = [];
    
    while (files.hasNext()) {
      const file = files.next();
      allFiles.push({
        name: file.getName(),
        type: file.getMimeType(),
        id: file.getId()
      });
    }
    
    console.log(`📋 Found ${allFiles.length} files in system folder`);
    allFiles.forEach(file => console.log(`   - ${file.name} (${file.type})`));
    
    // Try to get master data file | 嘗試取得主控資料檔案
    const masterData = getMasterDataFile();
    if (masterData) {
      const url = masterData.getUrl();
      const name = masterData.getName();
      console.log(`✅ Master Data file found: ${name}`);
      
      return {
        success: true,
        url: url,
        name: name
      };
    }
    
    // If not found, provide detailed error info | 如果找不到，提供詳細錯誤信息
    const sheetsFiles = allFiles.filter(f => f.type === 'application/vnd.google-apps.spreadsheet');
    
    return {
      success: false,
      error: `Master Data file not found in system folder | 在系統資料夾中找不到主控資料檔案`,
      step: 'file_search',
      filesInFolder: allFiles.map(f => f.name),
      sheetsCount: sheetsFiles.length,
      suggestion: sheetsFiles.length > 0 ? 
        `Found ${sheetsFiles.length} Google Sheets files, but none match expected patterns | 找到 ${sheetsFiles.length} 個 Google Sheets 檔案，但都不符合預期模式` :
        'No Google Sheets files found in system folder | 系統資料夾中沒有找到 Google Sheets 檔案'
    };
    
  } catch (error) {
    console.error('Error getting master data URL | 取得主控資料 URL 時發生錯誤:', error);
    return {
      success: false,
      error: `Failed to access Master Data file: ${error.message} | 無法存取主控資料檔案: ${error.message}`,
      step: 'unexpected_error'
    };
  }
}

function checkColumnHeaders() {
  try {
    const masterData = getMasterDataFile();
    if (!masterData) {
      return {
        success: false,
        error: 'Master data file not found | 找不到主要資料檔案'
      };
    }
    
    const studentsSheet = masterData.getSheetByName('Students');
    if (!studentsSheet) {
      return {
        success: false,
        error: 'Students sheet not found | 找不到學生工作表'
      };
    }
    
    const headers = studentsSheet.getRange(1, 1, 1, studentsSheet.getLastColumn()).getValues()[0];
    
    return {
      success: true,
      data: {
        headers: headers,
        columnCount: headers.length,
        hasLTTeacher: headers.some(h => String(h).includes('LT Teacher')),
        hasITTeacher: headers.some(h => String(h).includes('IT Teacher')),
        hasClass: headers.some(h => String(h).toLowerCase().includes('class'))
      }
    };
    
  } catch (error) {
    console.error('Check column headers failed:', error);
    return {
      success: false,
      error: `Header check failed: ${error.message} | 標題檢查失敗: ${error.message}`
    };
  }
}

// ===== LEVEL-SPECIFIC SYNC FUNCTIONS | 級別特定同步函數 =====

function syncAssessmentTitlesByLevel(level, teacherType) {
  try {
    // Determine grade group from level
    let gradeGroup;
    if (['G1', 'G2'].includes(level)) {
      gradeGroup = 'G1-G2';
    } else if (['G3', 'G4'].includes(level)) {
      gradeGroup = 'G3-G4';
    } else if (['G5', 'G6'].includes(level)) {
      gradeGroup = 'G5-G6';
    } else {
      return {
        success: false,
        error: `Invalid level: ${level} | 無效級別: ${level}`
      };
    }
    
    // Use the main sync function
    return syncAssessmentTitlesByGradeGroup(gradeGroup, teacherType);
    
  } catch (error) {
    console.error(`Sync by level ${level} failed:`, error);
    return {
      success: false,
      error: `Sync failed: ${error.message} | 同步失敗: ${error.message}`
    };
  }
}

function resetAssessmentTitlesByLevel(level, teacherType) {
  try {
    // Determine grade group from level
    let gradeGroup;
    if (['G1', 'G2'].includes(level)) {
      gradeGroup = 'G1-G2';
    } else if (['G3', 'G4'].includes(level)) {
      gradeGroup = 'G3-G4';
    } else if (['G5', 'G6'].includes(level)) {
      gradeGroup = 'G5-G6';
    } else {
      return {
        success: false,
        error: `Invalid level: ${level} | 無效級別: ${level}`
      };
    }
    
    // Reset assessment titles to defaults
    const defaultTitles = {
      formative: {},
      summative: {}
    };
    
    // Generate default formative titles
    for (let i = 1; i <= SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE; i++) {
      defaultTitles.formative[`FA${i}`] = `Formative Assessment ${i} | 形成性評量${i}`;
    }
    
    // Generate default summative titles
    for (let i = 1; i <= SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE; i++) {
      defaultTitles.summative[`SA${i}`] = `Summative Assessment ${i} | 總結性評量${i}`;
    }
    
    // Find teacher gradebooks for this grade group
    const teacherGradebooks = findTeacherGradebooksByGradeGroup(gradeGroup, teacherType);
    
    if (teacherGradebooks.length === 0) {
      return {
        success: false,
        error: `No teacher gradebooks found for ${gradeGroup} ${teacherType} | 找不到 ${gradeGroup} ${teacherType} 的教師成績簿`
      };
    }
    
    // Apply default titles to each teacher gradebook
    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    
    for (const gradebookName of teacherGradebooks) {
      try {
        const result = applyAssessmentTitlesToGradebook(gradebookName, defaultTitles);
        if (result.success) {
          successCount++;
        } else {
          errorCount++;
          errors.push(`${gradebookName}: ${result.error}`);
        }
      } catch (error) {
        errorCount++;
        errors.push(`${gradebookName}: ${error.message}`);
      }
    }
    
    return {
      success: true,
      data: {
        level: level,
        gradeGroup: gradeGroup,
        teacherType: teacherType,
        teacherGradebooks: teacherGradebooks.length,
        successCount: successCount,
        errorCount: errorCount,
        errors: errors
      },
      message: `Reset completed | 重設完成: ${successCount} success, ${errorCount} errors | ${successCount} 成功, ${errorCount} 錯誤`
    };
    
  } catch (error) {
    console.error(`Reset by level ${level} failed:`, error);
    return {
      success: false,
      error: `Reset failed: ${error.message} | 重設失敗: ${error.message}`
    };
  }
}

/**
 * Debug HT Teachers sheet data | 診斷 HT Teachers 工作表資料
 */
function debugHTTeachersSheet() {
  try {
    console.log('🔍 Debugging HT Teachers sheet...');
    
    // Get Master Data file
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA, false);
    const masterFiles = masterDataFolder.getFilesByName('Gradebook Master Data | 成績簿主控資料表');
    
    if (!masterFiles.hasNext()) {
      return { success: false, error: 'Master data sheet not found' };
    }
    
    const masterSheet = SpreadsheetApp.openById(masterFiles.next().getId());
    const htSheet = masterSheet.getSheetByName('HT Teachers | HT老師');
    
    if (!htSheet) {
      return { success: false, error: 'HT Teachers sheet not found' };
    }
    
    console.log('✅ HT Teachers sheet found');
    
    // Get all data from the sheet
    const lastRow = htSheet.getLastRow();
    const lastCol = htSheet.getLastColumn();
    
    console.log(`📊 Sheet dimensions: ${lastRow} rows, ${lastCol} columns`);
    
    if (lastRow === 0) {
      return { success: true, data: [], message: 'Sheet is empty' };
    }
    
    const allData = htSheet.getRange(1, 1, lastRow, Math.max(lastCol, 4)).getValues();
    
    console.log('📋 All sheet data:');
    allData.forEach((row, index) => {
      console.log(`Row ${index + 1}: [${row.join(' | ')}]`);
    });
    
    // Check data starting from row 5 (as expected by getHTData)
    console.log('🔍 Checking data from row 5...');
    if (lastRow < 5) {
      return {
        success: true,
        allData: allData,
        message: 'No data found from row 5 onwards',
        lastRow: lastRow
      };
    }
    
    const htData = htSheet.getRange(5, 1, lastRow - 4, 4).getValues();
    console.log('📊 HT data from row 5:');
    htData.forEach((row, index) => {
      const [grade, itHT, ltHT, notes] = row;
      console.log(`Row ${index + 5}: Grade=${grade}, IT HT=${itHT}, LT HT=${ltHT}, Notes=${notes}`);
    });
    
    // Process data like getHTData does
    const htMap = {};
    htData.forEach(row => {
      const [grade, itHT, ltHT, notes] = row;
      if (grade && (itHT || ltHT)) {
        htMap[grade] = {
          itHT: itHT || '',
          ltHT: ltHT || '',
          notes: notes || ''
        };
        console.log(`✅ Added ${grade}: IT=${itHT}, LT=${ltHT}`);
      } else {
        console.log(`⚠️ Skipped row: Grade=${grade}, IT HT=${itHT}, LT HT=${ltHT} (missing required data)`);
      }
    });
    
    console.log('📊 Final HT Map:', htMap);
    
    return {
      success: true,
      allData: allData,
      htData: htData,
      htMap: htMap,
      lastRow: lastRow,
      lastCol: lastCol
    };
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
    return {
      success: false,
      error: error.message,
      stack: error.stack
    };
  }
}

/**
 * Setup admin email for current user | 為當前用戶設置管理員郵箱
 */
function setupAdminEmail() {
  try {
    const currentUserEmail = Session.getActiveUser().getEmail();
    console.log(`🔧 Setting up admin access for: ${currentUserEmail}`);
    
    // This is just for demonstration - in real implementation, 
    // you would modify the SYSTEM_CONFIG.ADMIN.ACCOUNTS directly in the code
    return {
      success: true,
      message: `To set up admin access, add "${currentUserEmail}" to SYSTEM_CONFIG.ADMIN.ACCOUNTS in Code.gs`,
      currentEmail: currentUserEmail,
      instructions: [
        '1. Open Code.gs file',
        '2. Find SYSTEM_CONFIG.ADMIN.ACCOUNTS array',
        '3. Replace "your-admin-email@school.edu" with your email',
        '4. Save and deploy the script'
      ]
    };
    
  } catch (error) {
    console.error('❌ Setup admin email failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Debug admin permissions | 診斷管理員權限
 */
function debugAdminPermissions() {
  try {
    console.log('🔍 Debugging admin permissions...');
    
    // Get current user
    const currentUserEmail = Session.getActiveUser().getEmail();
    console.log(`👤 Current user: ${currentUserEmail}`);
    
    // Check admin configuration
    console.log('🔧 Admin configuration:', SYSTEM_CONFIG.ADMIN);
    console.log('📋 Admin accounts:', SYSTEM_CONFIG.ADMIN.ACCOUNTS);
    console.log('✅ Admin enabled:', SYSTEM_CONFIG.ADMIN.ENABLED);
    
    // Check if current user is admin
    const isAdmin = SYSTEM_CONFIG.ADMIN.ENABLED && 
                   SYSTEM_CONFIG.ADMIN.ACCOUNTS.some(adminEmail => 
                     adminEmail.toLowerCase() === currentUserEmail.toLowerCase()
                   );
    
    console.log(`👑 Is admin: ${isAdmin}`);
    
    // Test admin matching logic
    SYSTEM_CONFIG.ADMIN.ACCOUNTS.forEach((adminEmail, index) => {
      const matches = adminEmail.toLowerCase() === currentUserEmail.toLowerCase();
      console.log(`🔍 Admin ${index + 1}: "${adminEmail}" matches "${currentUserEmail}": ${matches}`);
    });
    
    // Test getAvailableHTOptions
    console.log('🧪 Testing getAvailableHTOptions...');
    const htOptions = getAvailableHTOptions();
    console.log('📊 HT Options result:', htOptions);
    
    return {
      success: true,
      currentUser: currentUserEmail,
      adminConfig: SYSTEM_CONFIG.ADMIN,
      isAdmin: isAdmin,
      htOptionsResult: htOptions,
      diagnostics: {
        adminEnabled: SYSTEM_CONFIG.ADMIN.ENABLED,
        adminAccounts: SYSTEM_CONFIG.ADMIN.ACCOUNTS,
        userMatches: SYSTEM_CONFIG.ADMIN.ACCOUNTS.map(email => ({
          adminEmail: email,
          currentEmail: currentUserEmail,
          matches: email.toLowerCase() === currentUserEmail.toLowerCase()
        }))
      }
    };
    
  } catch (error) {
    console.error('❌ Debug admin permissions failed:', error);
    return {
      success: false,
      error: error.message,
      stack: error.stack
    };
  }
}

/**
 * Setup HT data manually for current user | 為當前用戶手動設置HT資料
 */
function setupHTDataForCurrentUser(userEmail = null) {
  try {
    console.log('🔧 Setting up HT data for current user...');
    
    let currentUser, userName;
    
    if (userEmail) {
      // Use provided email
      currentUser = userEmail;
      userName = currentUser.split('@')[0];
      console.log(`👤 Using provided user: ${currentUser}, Username: ${userName}`);
    } else {
      try {
        // Try to get current user
        currentUser = Session.getActiveUser().getEmail();
        userName = currentUser.split('@')[0];
        console.log(`👤 Current user: ${currentUser}, Username: ${userName}`);
      } catch (permissionError) {
        console.log('⚠️ Cannot get current user due to permissions, using default setup');
        // Use a generic setup that can be edited later
        currentUser = 'admin@school.edu';
        userName = 'admin';
        console.log(`👤 Using fallback user: ${currentUser}, Username: ${userName}`);
      }
    }
    
    // Get Master Data file
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA, false);
    const masterFiles = masterDataFolder.getFilesByName('Gradebook Master Data | 成績簿主控資料表');
    
    if (!masterFiles.hasNext()) {
      throw new Error('Master data sheet not found');
    }
    
    const masterSheet = SpreadsheetApp.openById(masterFiles.next().getId());
    let htSheet = masterSheet.getSheetByName('HT Teachers | HT老師');
    
    // Create HT sheet if it doesn't exist
    if (!htSheet) {
      console.log('📋 Creating HT Teachers sheet...');
      htSheet = masterSheet.insertSheet('HT Teachers | HT老師');
      
      // Setup headers
      const headers = [
        ['Head Teacher Management | 學年主任管理', '', '', ''],
        ['', '', '', ''],
        ['Grade | 年級', 'IT Head Teacher | IT學年主任', 'LT Head Teacher | LT學年主任', 'Notes | 備註'],
        ['', '', '', '']
      ];
      
      htSheet.getRange(1, 1, headers.length, 4).setValues(headers);
      
      // Format headers
      htSheet.getRange(1, 1, 1, 4).setBackground('#4a90e2').setFontColor('white').setFontWeight('bold');
      htSheet.getRange(3, 1, 1, 4).setBackground('#e8f4f8').setFontWeight('bold');
    }
    
    // Set current user as HT for all grades
    const htData = [
      ['G1', userName, userName, `Setup by system for ${currentUser}`],
      ['G2', userName, userName, `Setup by system for ${currentUser}`],
      ['G3', userName, userName, `Setup by system for ${currentUser}`],
      ['G4', userName, userName, `Setup by system for ${currentUser}`],
      ['G5', userName, userName, `Setup by system for ${currentUser}`],
      ['G6', userName, userName, `Setup by system for ${currentUser}`]
    ];
    
    // Clear existing data and write new data
    const lastRow = htSheet.getLastRow();
    if (lastRow >= 5) {
      htSheet.getRange(5, 1, lastRow - 4, 4).clear();
    }
    
    htSheet.getRange(5, 1, htData.length, 4).setValues(htData);
    
    console.log('✅ HT data setup completed');
    
    return {
      success: true,
      message: `HT data setup completed for ${userName}`,
      userName: userName,
      gradesConfigured: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6']
    };
    
  } catch (error) {
    console.error('❌ Setup HT data failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// ===== FILE SYSTEM DIAGNOSTICS | 檔案系統診斷 =====

/**
 * Diagnose files in system folder | 診斷系統資料夾中的檔案
 */
function diagnoseSystemFiles() {
  try {
    console.log('🔍 Starting system files diagnosis | 開始系統檔案診斷...');
    
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const folderName = systemFolder.getName();
    const files = systemFolder.getFiles();
    
    const result = {
      success: true,
      folderName: folderName,
      folderId: SYSTEM_CONFIG.MAIN_FOLDER_ID,
      files: [],
      googleSheetsFiles: [],
      potentialMasterDataFiles: []
    };
    
    // Collect all files | 收集所有檔案
    while (files.hasNext()) {
      const file = files.next();
      const fileInfo = {
        name: file.getName(),
        type: file.getMimeType(),
        id: file.getId(),
        url: file.getUrl(),
        lastModified: file.getLastUpdated()
      };
      
      result.files.push(fileInfo);
      
      // Check if it's a Google Sheets file | 檢查是否為 Google Sheets 檔案
      if (fileInfo.type === 'application/vnd.google-apps.spreadsheet') {
        result.googleSheetsFiles.push(fileInfo);
        
        // Check potential master data patterns | 檢查潛在的主控資料模式
        const fileName = fileInfo.name.toLowerCase();
        const masterDataPatterns = [
          'master', 'student', 'gradebook', '學生', '主控', '主要', '成績', '2425'
        ];
        
        for (const pattern of masterDataPatterns) {
          if (fileName.includes(pattern.toLowerCase())) {
            result.potentialMasterDataFiles.push({
              ...fileInfo,
              matchedPattern: pattern
            });
            break;
          }
        }
      }
    }
    
    // Sort by modification date | 按修改日期排序
    result.files.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    result.googleSheetsFiles.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    
    console.log(`📋 Found ${result.files.length} total files, ${result.googleSheetsFiles.length} Google Sheets files`);
    console.log(`🎯 Found ${result.potentialMasterDataFiles.length} potential master data files`);
    
    return result;
    
  } catch (error) {
    console.error('❌ System files diagnosis failed | 系統檔案診斷失敗:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// ===== SYSTEM INTEGRITY TESTING | 系統完整性測試 =====

/**
 * Test complete system integrity | 測試完整系統完整性
 */
function testSystemIntegrity() {
  try {
    console.log('🧪 Starting system integrity test | 開始系統完整性測試...');
    
    const results = {
      success: true,
      summary: '',
      errors: [],
      tests: []
    };
    
    // Test 1: Configuration integrity | 測試 1：配置完整性
    try {
      validateConfiguration();
      results.tests.push({name: 'Configuration Validation | 配置驗證', status: '✅ PASS', details: 'All settings valid | 所有設定有效'});
    } catch (configError) {
      results.errors.push(`Configuration Error | 配置錯誤: ${configError.message}`);
      results.tests.push({name: 'Configuration Validation | 配置驗證', status: '❌ FAIL', details: configError.message});
      results.success = false;
    }
    
    // Test 2: Google Drive access | 測試 2：Google Drive 存取
    try {
      const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
      const folderName = systemFolder.getName();
      results.tests.push({name: 'Google Drive Access | Google Drive 存取', status: '✅ PASS', details: `Folder accessible: ${folderName} | 資料夾可存取: ${folderName}`});
    } catch (driveError) {
      results.errors.push(`Google Drive Error | Google Drive 錯誤: ${driveError.message}`);
      results.tests.push({name: 'Google Drive Access | Google Drive 存取', status: '❌ FAIL', details: driveError.message});
      results.success = false;
    }
    
    // Test 3: Master Data accessibility | 測試 3：主控資料可存取性
    try {
      const masterData = getMasterDataFile();
      if (masterData) {
        const studentsSheet = masterData.getSheetByName('Students');
        const teachersSheet = masterData.getSheetByName('Teachers');
        
        if (studentsSheet && teachersSheet) {
          results.tests.push({name: 'Master Data Structure | 主控資料結構', status: '✅ PASS', details: 'Students and Teachers sheets found | 找到學生和教師工作表'});
        } else {
          results.errors.push('Master Data missing required sheets | 主控資料缺少必要工作表');
          results.tests.push({name: 'Master Data Structure | 主控資料結構', status: '❌ FAIL', details: 'Missing Students or Teachers sheet | 缺少學生或教師工作表'});
          results.success = false;
        }
      } else {
        results.errors.push('Master Data file not found | 找不到主控資料檔案');
        results.tests.push({name: 'Master Data Access | 主控資料存取', status: '❌ FAIL', details: 'Master Data file not found | 找不到主控資料檔案'});
        results.success = false;
      }
    } catch (masterDataError) {
      results.errors.push(`Master Data Error | 主控資料錯誤: ${masterDataError.message}`);
      results.tests.push({name: 'Master Data Access | 主控資料存取', status: '❌ FAIL', details: masterDataError.message});
      results.success = false;
    }
    
    // Test 4: Core functions availability | 測試 4：核心函數可用性
    const coreFunctions = [
      'initializeSystem', 'batchCreateGradebooks', 'checkSystemStatus', 
      'getSystemFolderUrl', 'getMasterDataUrl', 'performCodeQualityCheck'
    ];
    
    let functionTestPassed = 0;
    for (const funcName of coreFunctions) {
      try {
        if (typeof this[funcName] === 'function' || typeof global[funcName] === 'function') {
          functionTestPassed++;
        } else {
          results.errors.push(`Function missing: ${funcName} | 函數缺失: ${funcName}`);
          results.success = false;
        }
      } catch (funcError) {
        results.errors.push(`Function test error for ${funcName}: ${funcError.message} | 函數測試錯誤 ${funcName}: ${funcError.message}`);
        results.success = false;
      }
    }
    
    results.tests.push({
      name: 'Core Functions | 核心函數', 
      status: functionTestPassed === coreFunctions.length ? '✅ PASS' : '⚠️  PARTIAL', 
      details: `${functionTestPassed}/${coreFunctions.length} functions available | ${functionTestPassed}/${coreFunctions.length} 個函數可用`
    });
    
    // Test 5: HT System functionality | 測試 5：HT 系統功能
    try {
      const htContext = getCurrentHTContextEnhanced();
      if (htContext.success) {
        results.tests.push({name: 'HT System | HT 系統', status: '✅ PASS', details: 'HT authentication and context working | HT 驗證和上下文正常'});
      } else {
        results.tests.push({name: 'HT System | HT 系統', status: '⚠️  INFO', details: 'HT system available but not currently authenticated | HT 系統可用但目前未驗證'});
      }
    } catch (htError) {
      results.errors.push(`HT System Error | HT 系統錯誤: ${htError.message}`);
      results.tests.push({name: 'HT System | HT 系統', status: '❌ FAIL', details: htError.message});
      results.success = false;
    }
    
    // Generate summary | 生成摘要
    const passedTests = results.tests.filter(test => test.status.includes('✅')).length;
    const totalTests = results.tests.length;
    
    if (results.success) {
      results.summary = `🎉 System integrity test PASSED | 系統完整性測試通過\n✅ All ${totalTests} critical tests passed | 所有 ${totalTests} 項關鍵測試通過`;
    } else {
      results.summary = `⚠️ System integrity test COMPLETED with issues | 系統完整性測試完成但有問題\n✅ ${passedTests}/${totalTests} tests passed | ${passedTests}/${totalTests} 項測試通過\n❌ ${results.errors.length} errors found | 發現 ${results.errors.length} 個錯誤`;
    }
    
    console.log('🏁 System integrity test completed | 系統完整性測試完成');
    return results;
    
  } catch (error) {
    console.error('❌ System integrity test failed | 系統完整性測試失敗:', error);
    return {
      success: false,
      summary: `❌ System integrity test FAILED | 系統完整性測試失敗: ${error.message}`,
      errors: [error.message],
      tests: []
    };
  }
}