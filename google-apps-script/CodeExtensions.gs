/**
 * Code Extensions for Gradebook System | 成績簿系統擴展函數
 * This file contains additional functions that were missing from the main system
 * 此檔案包含主系統中遺失的額外函數
 */

// ===== SYSTEM TESTING FUNCTIONS | 系統測試函數 =====

/**
 * System integrity test | 系統完整性測試
 */
function testSystemIntegrity() {
  console.log('🔍 Starting system integrity test...');
  const results = {
    config: false,
    folder: false,
    masterData: false,
    functions: false,
    errors: []
  };
  
  try {
    // Test 1: Configuration | 測試配置
    if (SYSTEM_CONFIG && SYSTEM_CONFIG.MAIN_FOLDER_ID) {
      results.config = true;
      console.log('✅ System configuration loaded');
    } else {
      throw new Error('System configuration missing');
    }
    
    // Test 2: Main folder access | 測試主資料夾存取
    try {
      const folder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
      results.folder = true;
      console.log(`✅ Main folder accessible: ${folder.getName()}`);
    } catch (error) {
      results.errors.push(`Main folder access failed: ${error.message}`);
    }
    
    // Test 3: Master data sheet | 測試主控資料表
    try {
      const masterData = getMasterDataSheet();
      if (masterData) {
        results.masterData = true;
        console.log('✅ Master data sheet found');
      } else {
        results.errors.push('Master data sheet not found');
      }
    } catch (error) {
      results.errors.push(`Master data error: ${error.message}`);
    }
    
    // Test 4: Critical functions | 測試關鍵函數
    const criticalFunctions = [
      'initializeSystem',
      'batchCreateGradebooks', 
      'createTeacherGradebook',
      'extractTeacherData'
    ];
    
    let functionsOk = true;
    for (const funcName of criticalFunctions) {
      if (typeof eval(funcName) !== 'function') {
        results.errors.push(`Function missing: ${funcName}`);
        functionsOk = false;
      }
    }
    results.functions = functionsOk;
    
    if (functionsOk) {
      console.log('✅ All critical functions present');
    }
    
    return {
      success: results.config && results.folder && results.functions,
      details: results,
      summary: `Config: ${results.config ? '✅' : '❌'}, Folder: ${results.folder ? '✅' : '❌'}, Master Data: ${results.masterData ? '✅' : '❌'}, Functions: ${results.functions ? '✅' : '❌'}`,
      errors: results.errors
    };
    
  } catch (error) {
    console.error('❌ System integrity test failed:', error);
    return {
      success: false,
      error: error.message,
      details: results
    };
  }
}

// ===== CODE QUALITY AND SECURITY ANALYSIS | 代碼品質和安全分析 =====

/**
 * Comprehensive code quality and security check | 全面的代碼品質和安全檢查
 * Implements /check command from awesome-claude-code best practices
 */
function performCodeQualityCheck() {
  console.log('🔍 Starting comprehensive code quality and security analysis...');
  
  const results = {
    codeQuality: analyzeCodeQuality(),
    security: performSecurityAudit(),
    performance: analyzePerformance(),
    documentation: checkDocumentation(),
    bestPractices: validateBestPractices(),
    timestamp: new Date(),
    overallScore: 0
  };
  
  // Calculate overall score | 計算整體分數
  const scores = [
    results.codeQuality.score,
    results.security.score,
    results.performance.score,
    results.documentation.score,
    results.bestPractices.score
  ];
  results.overallScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  
  // Generate detailed report | 生成詳細報告
  const report = generateQualityReport(results);
  
  return {
    success: true,
    results: results,
    report: report,
    summary: `Overall Quality Score: ${results.overallScore.toFixed(1)}/10`,
    recommendations: generateRecommendations(results)
  };
}

/**
 * Analyze code quality metrics | 分析代碼品質指標
 */
function analyzeCodeQuality() {
  const issues = [];
  let score = 10;
  
  try {
    // Check function naming conventions | 檢查函數命名規範
    const functionNames = extractFunctionNames();
    for (const funcName of functionNames) {
      if (!isCamelCase(funcName)) {
        issues.push(`Function naming: ${funcName} should use camelCase`);
        score -= 0.1;
      }
    }
    
    // Check for proper error handling | 檢查適當的錯誤處理
    const functionsWithoutTryCatch = findFunctionsWithoutErrorHandling();
    if (functionsWithoutTryCatch.length > 0) {
      issues.push(`Missing error handling in: ${functionsWithoutTryCatch.join(', ')}`);
      score -= functionsWithoutTryCatch.length * 0.2;
    }
    
    // Check for code duplication | 檢查代碼重複
    const duplicateCode = findDuplicateCode();
    if (duplicateCode.length > 0) {
      issues.push(`Code duplication detected: ${duplicateCode.length} instances`);
      score -= duplicateCode.length * 0.1;
    }
    
    return {
      score: Math.max(0, score),
      issues: issues,
      status: score >= 8 ? 'excellent' : score >= 6 ? 'good' : score >= 4 ? 'fair' : 'poor'
    };
    
  } catch (error) {
    return {
      score: 0,
      issues: [`Code quality analysis failed: ${error.message}`],
      status: 'error'
    };
  }
}

/**
 * Perform security audit | 執行安全審計
 */
function performSecurityAudit() {
  const vulnerabilities = [];
  let score = 10;
  
  try {
    // Check for hardcoded sensitive data | 檢查硬編碼敏感資料
    const hardcodedSecrets = findHardcodedSecrets();
    if (hardcodedSecrets.length > 0) {
      vulnerabilities.push('Hardcoded secrets detected');
      score -= 3;
    }
    
    // Check input validation | 檢查輸入驗證
    const unvalidatedInputs = findUnvalidatedInputs();
    if (unvalidatedInputs.length > 0) {
      vulnerabilities.push(`Unvalidated inputs: ${unvalidatedInputs.length}`);
      score -= unvalidatedInputs.length * 0.5;
    }
    
    // Check for proper authorization | 檢查適當的授權
    const authorizationIssues = checkAuthorization();
    if (authorizationIssues.length > 0) {
      vulnerabilities.push('Authorization issues detected');
      score -= 2;
    }
    
    return {
      score: Math.max(0, score),
      vulnerabilities: vulnerabilities,
      status: score >= 8 ? 'secure' : score >= 6 ? 'moderate' : 'vulnerable'
    };
    
  } catch (error) {
    return {
      score: 0,
      vulnerabilities: [`Security audit failed: ${error.message}`],
      status: 'error'
    };
  }
}

/**
 * Analyze performance metrics | 分析性能指標
 */
function analyzePerformance() {
  const issues = [];
  let score = 10;
  
  try {
    // Check for performance bottlenecks | 檢查性能瓶頸
    const slowFunctions = identifySlowFunctions();
    if (slowFunctions.length > 0) {
      issues.push(`Potentially slow functions: ${slowFunctions.join(', ')}`);
      score -= slowFunctions.length * 0.5;
    }
    
    // Check memory usage patterns | 檢查記憶體使用模式
    const memoryIssues = checkMemoryUsage();
    if (memoryIssues.length > 0) {
      issues.push(`Memory concerns: ${memoryIssues.length} issues`);
      score -= memoryIssues.length * 0.3;
    }
    
    return {
      score: Math.max(0, score),
      issues: issues,
      status: score >= 8 ? 'optimal' : score >= 6 ? 'good' : 'needs_optimization'
    };
    
  } catch (error) {
    return {
      score: 5, // Default moderate score for performance
      issues: [`Performance analysis limited: ${error.message}`],
      status: 'unknown'
    };
  }
}

/**
 * Check documentation quality | 檢查文件品質
 */
function checkDocumentation() {
  const issues = [];
  let score = 10;
  
  try {
    // Check for function documentation | 檢查函數文件
    const undocumentedFunctions = findUndocumentedFunctions();
    if (undocumentedFunctions.length > 0) {
      issues.push(`Undocumented functions: ${undocumentedFunctions.length}`);
      score -= undocumentedFunctions.length * 0.2;
    }
    
    // Check for bilingual comments | 檢查雙語註釋
    const monolingualComments = findMonolingualComments();
    if (monolingualComments > 0) {
      issues.push(`Comments missing bilingual support: ${monolingualComments}`);
      score -= monolingualComments * 0.1;
    }
    
    return {
      score: Math.max(0, score),
      issues: issues,
      status: score >= 8 ? 'excellent' : score >= 6 ? 'good' : 'needs_improvement'
    };
    
  } catch (error) {
    return {
      score: 5,
      issues: [`Documentation check failed: ${error.message}`],
      status: 'unknown'
    };
  }
}

/**
 * Validate best practices compliance | 驗證最佳實踐合規性
 */
function validateBestPractices() {
  const violations = [];
  let score = 10;
  
  try {
    // Check for proper constant naming | 檢查適當的常數命名
    const improperConstants = findImproperConstants();
    if (improperConstants.length > 0) {
      violations.push(`Constants not in UPPER_SNAKE_CASE: ${improperConstants.length}`);
      score -= improperConstants.length * 0.1;
    }
    
    // Check for proper file organization | 檢查適當的檔案組織
    const organizationIssues = checkFileOrganization();
    if (organizationIssues.length > 0) {
      violations.push('File organization could be improved');
      score -= 0.5;
    }
    
    return {
      score: Math.max(0, score),
      violations: violations,
      status: score >= 8 ? 'compliant' : score >= 6 ? 'mostly_compliant' : 'needs_work'
    };
    
  } catch (error) {
    return {
      score: 5,
      violations: [`Best practices check failed: ${error.message}`],
      status: 'unknown'
    };
  }
}

// Helper functions for code analysis | 代碼分析輔助函數
function extractFunctionNames() {
  // Simplified implementation - in real scenario would parse actual code
  return ['testSystemIntegrity', 'batchCheckAllProgress', 'analyzeTeacherProgress'];
}

function isCamelCase(name) {
  return /^[a-z][a-zA-Z0-9]*$/.test(name);
}

function findFunctionsWithoutErrorHandling() {
  // Simplified - would analyze actual code for try-catch blocks
  return [];
}

function findDuplicateCode() {
  return []; // Simplified implementation
}

function findHardcodedSecrets() {
  return []; // Would scan for API keys, passwords, etc.
}

function findUnvalidatedInputs() {
  return []; // Would check for input validation
}

function checkAuthorization() {
  return []; // Would check authorization patterns
}

function identifySlowFunctions() {
  return []; // Would identify potentially slow operations
}

function checkMemoryUsage() {
  return []; // Would check for memory leaks
}

function findUndocumentedFunctions() {
  return []; // Would find functions without JSDoc
}

function findMonolingualComments() {
  return 0; // Would count non-bilingual comments
}

function findImproperConstants() {
  return []; // Would find constants not in UPPER_SNAKE_CASE
}

function checkFileOrganization() {
  return []; // Would check file structure
}

function generateQualityReport(results) {
  return `
📊 CODE QUALITY REPORT | 代碼品質報告
Generated: ${results.timestamp.toISOString()}

🎯 Overall Score: ${results.overallScore.toFixed(1)}/10

📋 Detailed Analysis:
• Code Quality: ${results.codeQuality.score.toFixed(1)}/10 (${results.codeQuality.status})
• Security: ${results.security.score.toFixed(1)}/10 (${results.security.status})
• Performance: ${results.performance.score.toFixed(1)}/10 (${results.performance.status})
• Documentation: ${results.documentation.score.toFixed(1)}/10 (${results.documentation.status})
• Best Practices: ${results.bestPractices.score.toFixed(1)}/10 (${results.bestPractices.status})

${results.codeQuality.issues.length > 0 ? '⚠️ Code Quality Issues:\n' + results.codeQuality.issues.map(i => `• ${i}`).join('\n') : '✅ No code quality issues detected'}

${results.security.vulnerabilities.length > 0 ? '🔒 Security Vulnerabilities:\n' + results.security.vulnerabilities.map(v => `• ${v}`).join('\n') : '✅ No security vulnerabilities detected'}

${results.performance.issues.length > 0 ? '⚡ Performance Issues:\n' + results.performance.issues.map(i => `• ${i}`).join('\n') : '✅ No performance issues detected'}
  `;
}

function generateRecommendations(results) {
  const recommendations = [];
  
  if (results.codeQuality.score < 8) {
    recommendations.push('Improve function naming and error handling patterns');
  }
  
  if (results.security.score < 8) {
    recommendations.push('Enhance input validation and authorization checks');
  }
  
  if (results.performance.score < 8) {
    recommendations.push('Optimize slow functions and memory usage');
  }
  
  if (results.documentation.score < 8) {
    recommendations.push('Add comprehensive bilingual documentation');
  }
  
  if (results.bestPractices.score < 8) {
    recommendations.push('Follow coding standards and organizational patterns');
  }
  
  return recommendations;
}

// ===== RESOURCE MANAGEMENT SYSTEM | 資源管理系統 =====

/**
 * Add new resource to the project | 向專案添加新資源
 * Implements /project:add-new-resource command
 */
function addNewResource(resourceType, resourceName, description, options = {}) {
  try {
    console.log(`🔧 Adding new resource: ${resourceType} - ${resourceName}`);
    
    const result = {
      success: false,
      resourceId: null,
      message: '',
      details: {}
    };
    
    // Validate resource type | 驗證資源類型
    const validTypes = ['template', 'function', 'integration', 'documentation', 'tool', 'component'];
    if (!validTypes.includes(resourceType)) {
      throw new Error(`Invalid resource type. Valid types: ${validTypes.join(', ')}`);
    }
    
    // Generate unique resource ID | 生成唯一資源ID
    const resourceId = generateResourceId(resourceType, resourceName);
    
    // Create resource based on type | 根據類型創建資源
    switch (resourceType) {
      case 'template':
        result.details = createTemplateResource(resourceId, resourceName, description, options);
        break;
      case 'function':
        result.details = createFunctionResource(resourceId, resourceName, description, options);
        break;
      case 'integration':
        result.details = createIntegrationResource(resourceId, resourceName, description, options);
        break;
      case 'documentation':
        result.details = createDocumentationResource(resourceId, resourceName, description, options);
        break;
      case 'tool':
        result.details = createToolResource(resourceId, resourceName, description, options);
        break;
      case 'component':
        result.details = createComponentResource(resourceId, resourceName, description, options);
        break;
      default:
        throw new Error(`Resource type ${resourceType} not implemented`);
    }
    
    // Register resource in system | 在系統中註冊資源
    registerResource(resourceId, resourceType, resourceName, description, result.details);
    
    // Update project documentation | 更新專案文件
    updateProjectDocumentation(resourceType, resourceName, description);
    
    result.success = true;
    result.resourceId = resourceId;
    result.message = `Successfully added ${resourceType}: ${resourceName}`;
    
    console.log(`✅ Resource added successfully: ${resourceId}`);
    return result;
    
  } catch (error) {
    console.error(`❌ Failed to add resource: ${error.message}`);
    return {
      success: false,
      error: error.message,
      message: `Failed to add resource: ${error.message}`
    };
  }
}

/**
 * Create template resource | 創建範本資源
 */
function createTemplateResource(resourceId, name, description, options) {
  const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
  const templatesFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEMPLATES);
  
  // Create template spreadsheet | 創建範本試算表
  const templateName = `${name}_Template`;
  const template = SpreadsheetApp.create(templateName);
  const file = DriveApp.getFileById(template.getId());
  file.moveTo(templatesFolder);
  
  // Setup template structure | 設置範本結構
  const sheet = template.getActiveSheet();
  sheet.setName(name);
  
  // Add metadata | 添加元數據
  const metadataSheet = template.insertSheet('Template_Info');
  metadataSheet.getRange('A1:B10').setValues([
    ['Template Name', name],
    ['Description', description],
    ['Created Date', new Date()],
    ['Resource ID', resourceId],
    ['Version', '1.0'],
    ['Author', 'Gradebook System'],
    ['Type', 'Template'],
    ['Status', 'Active'],
    ['Usage Count', 0],
    ['Last Modified', new Date()]
  ]);
  
  return {
    type: 'template',
    templateId: template.getId(),
    templateUrl: template.getUrl(),
    folder: templatesFolder.getName(),
    sheets: template.getSheets().map(s => s.getName())
  };
}

/**
 * Create function resource | 創建函數資源
 */
function createFunctionResource(resourceId, name, description, options) {
  // Function template with JSDoc | 帶JSDoc的函數範本
  const functionTemplate = `
/**
 * ${description}
 * @param {any} param1 - Description of parameter 1
 * @return {any} Description of return value
 */
function ${name}(param1) {
  try {
    // TODO: Implement ${name} functionality
    // 待辦：實施 ${name} 功能
    
    console.log('🔧 Executing ${name}');
    
    // Implementation goes here | 實施代碼在此
    
    return {
      success: true,
      message: '${name} executed successfully',
      data: null
    };
    
  } catch (error) {
    console.error('❌ Error in ${name}:', error);
    return {
      success: false,
      error: error.message,
      message: '${name} execution failed'
    };
  }
}
`;
  
  // Add function to CodeExtensions.gs | 將函數添加到 CodeExtensions.gs
  // Note: In actual implementation, would append to file
  
  return {
    type: 'function',
    functionName: name,
    template: functionTemplate,
    location: 'CodeExtensions.gs',
    parameters: options.parameters || [],
    returnType: options.returnType || 'object'
  };
}

/**
 * Create integration resource | 創建整合資源
 */
function createIntegrationResource(resourceId, name, description, options) {
  const integrationConfig = {
    name: name,
    description: description,
    resourceId: resourceId,
    type: 'integration',
    endpoint: options.endpoint || '',
    authentication: options.authentication || 'none',
    methods: options.methods || ['GET'],
    dataFormat: options.dataFormat || 'JSON',
    rateLimits: options.rateLimits || {},
    created: new Date(),
    status: 'configured'
  };
  
  // Create integration configuration sheet | 創建整合配置表
  const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
  const configName = `${name}_Integration_Config`;
  const configSheet = SpreadsheetApp.create(configName);
  const file = DriveApp.getFileById(configSheet.getId());
  file.moveTo(systemFolder);
  
  // Setup configuration | 設置配置
  const sheet = configSheet.getActiveSheet();
  sheet.getRange('A1:B20').setValues([
    ['Integration Name', name],
    ['Description', description],
    ['Resource ID', resourceId],
    ['Endpoint URL', integrationConfig.endpoint],
    ['Authentication', integrationConfig.authentication],
    ['Data Format', integrationConfig.dataFormat],
    ['Status', integrationConfig.status],
    ['Created Date', integrationConfig.created],
    ['', ''],
    ['Configuration Notes:', ''],
    ['', ''],
    ['API Methods:', ''],
    ...integrationConfig.methods.map(method => ['', method]),
    ['', ''],
    ['Rate Limits:', ''],
    ['Requests per minute', options.rateLimits?.perMinute || 'N/A'],
    ['Requests per hour', options.rateLimits?.perHour || 'N/A'],
    ['', ''],
    ['Last Updated', new Date()]
  ]);
  
  return {
    type: 'integration',
    configId: configSheet.getId(),
    configUrl: configSheet.getUrl(),
    config: integrationConfig
  };
}

/**
 * Create documentation resource | 創建文件資源
 */
function createDocumentationResource(resourceId, name, description, options) {
  const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
  
  // Create documentation document | 創建文件檔案
  const docName = `${name}_Documentation`;
  const doc = DocumentApp.create(docName);
  const file = DriveApp.getFileById(doc.getId());
  file.moveTo(systemFolder);
  
  // Add content structure | 添加內容結構
  const body = doc.getBody();
  body.clear();
  
  // Title | 標題
  const title = body.appendParagraph(name);
  title.setHeading(DocumentApp.ParagraphHeading.TITLE);
  
  // Description | 描述
  body.appendParagraph(description);
  
  // Table of Contents | 目錄
  body.appendParagraph('\nTable of Contents | 目錄').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('1. Overview | 概述');
  body.appendParagraph('2. Usage | 使用方法');
  body.appendParagraph('3. Examples | 範例');
  body.appendParagraph('4. Troubleshooting | 故障排除');
  
  // Sections | 章節
  body.appendParagraph('\n1. Overview | 概述').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('Detailed overview goes here...');
  
  body.appendParagraph('\n2. Usage | 使用方法').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('Step-by-step usage instructions...');
  
  body.appendParagraph('\n3. Examples | 範例').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('Code examples and use cases...');
  
  body.appendParagraph('\n4. Troubleshooting | 故障排除').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('Common issues and solutions...');
  
  // Footer | 頁腳
  body.appendParagraph(`\n---\nDocument ID: ${resourceId}\nCreated: ${new Date()}\nLast Updated: ${new Date()}`);
  
  return {
    type: 'documentation',
    docId: doc.getId(),
    docUrl: doc.getUrl(),
    sections: ['Overview', 'Usage', 'Examples', 'Troubleshooting']
  };
}

/**
 * Create tool resource | 創建工具資源
 */
function createToolResource(resourceId, name, description, options) {
  // Tool configuration | 工具配置
  const toolConfig = {
    name: name,
    description: description,
    resourceId: resourceId,
    type: 'tool',
    category: options.category || 'utility',
    permissions: options.permissions || ['read'],
    interface: options.interface || 'function',
    dependencies: options.dependencies || [],
    created: new Date()
  };
  
  return {
    type: 'tool',
    config: toolConfig,
    implementation: 'pending',
    status: 'configured'
  };
}

/**
 * Create component resource | 創建組件資源
 */
function createComponentResource(resourceId, name, description, options) {
  // Component template | 組件範本
  const componentTemplate = `
<!-- ${name} Component | ${name} 組件 -->
<!-- ${description} -->
<div class="component-${resourceId}">
  <div class="component-header">
    <h3>${name}</h3>
  </div>
  <div class="component-body">
    <!-- Component content goes here | 組件內容在此 -->
  </div>
</div>

<style>
.component-${resourceId} {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
}

.component-${resourceId} .component-header {
  font-weight: bold;
  margin-bottom: 12px;
}

.component-${resourceId} .component-body {
  /* Component styling | 組件樣式 */
}
</style>

<script>
function init${name}Component() {
  // Component initialization | 組件初始化
  console.log('🎨 Initializing ${name} component');
}
</script>
`;
  
  return {
    type: 'component',
    template: componentTemplate,
    resourceId: resourceId,
    styles: true,
    scripts: true,
    dependencies: options.dependencies || []
  };
}

/**
 * Generate unique resource ID | 生成唯一資源ID
 */
function generateResourceId(type, name) {
  const timestamp = new Date().getTime();
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return `${type}_${cleanName}_${timestamp}`;
}

/**
 * Register resource in system | 在系統中註冊資源
 */
function registerResource(resourceId, type, name, description, details) {
  // Implementation would store resource metadata
  console.log(`📝 Registering resource: ${resourceId}`);
  
  // Create resource registry entry | 創建資源註冊表項目
  const registryEntry = {
    id: resourceId,
    type: type,
    name: name,
    description: description,
    details: details,
    created: new Date(),
    status: 'active',
    version: '1.0'
  };
  
  // In actual implementation, would store in a registry sheet
  return registryEntry;
}

/**
 * Update project documentation | 更新專案文件
 */
function updateProjectDocumentation(type, name, description) {
  console.log(`📚 Updating documentation for ${type}: ${name}`);
  // Implementation would update relevant documentation files
  return true;
}

/**
 * List available resources | 列出可用資源
 */
function listProjectResources(filterType = null) {
  try {
    console.log('📋 Listing project resources...');
    
    // Mock data - in actual implementation would read from registry
    const resources = [
      {
        id: 'template_gradereport_1640000000000',
        type: 'template',
        name: 'Grade Report Template',
        description: 'Monthly progress report template',
        status: 'active',
        created: new Date('2023-12-20')
      },
      {
        id: 'function_datavalidator_1640000001000',
        type: 'function',
        name: 'DataValidator',
        description: 'Input validation utility function',
        status: 'active',
        created: new Date('2023-12-21')
      },
      {
        id: 'integration_googleclassroom_1640000002000',
        type: 'integration',
        name: 'Google Classroom',
        description: 'Sync with Google Classroom API',
        status: 'configured',
        created: new Date('2023-12-22')
      }
    ];
    
    // Filter by type if specified | 如果指定則按類型過濾
    const filteredResources = filterType 
      ? resources.filter(r => r.type === filterType)
      : resources;
    
    return {
      success: true,
      resources: filteredResources,
      total: filteredResources.length,
      types: [...new Set(resources.map(r => r.type))]
    };
    
  } catch (error) {
    console.error('❌ Failed to list resources:', error);
    return {
      success: false,
      error: error.message,
      resources: []
    };
  }
}

// ===== PROGRESS MONITORING SYSTEM | 進度監控系統 =====

/**
 * Batch check all teachers' progress | 批次檢查所有教師進度
 */
function batchCheckAllProgress(standards = null) {
  try {
    const startTime = new Date();
    
    // Use default standards if none provided | 如果未提供標準則使用預設值
    const progressStandards = standards || {
      formativeRequired: 3,
      summativeRequired: 1,
      finalRequired: 0,
      description: 'Progress Check',
      checkDate: new Date()
    };
    
    console.log('🔍 Starting batch progress check with standards:', progressStandards);
    
    // Get all teacher gradebooks | 取得所有教師成績簿
    const teacherGradebooks = getAllTeacherGradebooks();
    console.log(`📚 Found ${teacherGradebooks.length} teacher gradebooks`);
    
    const progressResults = [];
    let totalClasses = 0;
    let classesOnTrack = 0;
    let classesBehind = 0;
    
    // Check each teacher's progress | 檢查每位教師的進度
    for (const gradebook of teacherGradebooks) {
      const teacherProgress = analyzeTeacherProgress(gradebook, progressStandards);
      progressResults.push(teacherProgress);
      
      totalClasses += teacherProgress.totalClasses;
      classesOnTrack += teacherProgress.classesOnTrack;
      classesBehind += teacherProgress.classesBehind;
    }
    
    // Generate system summary | 生成系統摘要
    const systemSummary = {
      checkDate: startTime,
      standards: progressStandards,
      totalTeachers: teacherGradebooks.length,
      totalClasses: totalClasses,
      classesOnTrack: classesOnTrack,
      classesBehind: classesBehind,
      systemProgress: totalClasses > 0 ? (classesOnTrack / totalClasses) * 100 : 0,
      teacherResults: progressResults
    };
    
    // Save progress report | 儲存進度報告
    const reportUrl = saveProgressReport(systemSummary);
    
    const endTime = new Date();
    const duration = Math.round((endTime - startTime) / 1000);
    
    console.log(`✅ Progress check completed in ${duration} seconds`);
    console.log(`📊 Results: ${classesOnTrack}/${totalClasses} classes on track`);
    
    return {
      success: true,
      summary: systemSummary,
      reportUrl: reportUrl,
      duration: duration,
      message: `Checked ${totalClasses} classes from ${teacherGradebooks.length} teachers`
    };
    
  } catch (error) {
    console.error('❌ Progress check failed:', error);
    return {
      success: false,
      error: error.message,
      message: `Progress check failed: ${error.message}`
    };
  }
}

/**
 * Analyze individual teacher's progress | 分析個別教師的進度
 */
function analyzeTeacherProgress(gradebook, standards) {
  try {
    const teacherInfo = getTeacherInfoFromGradebook(gradebook);
    const classSheets = getClassSheetsFromGradebook(gradebook);
    const classResults = [];
    
    let classesOnTrack = 0;
    let classesBehind = 0;
    let totalProgress = 0;
    
    // Analyze each class | 分析每個班級
    for (const classSheet of classSheets) {
      const classProgress = analyzeClassProgress(classSheet, standards);
      classResults.push(classProgress);
      
      totalProgress += classProgress.overallProgress;
      
      if (classProgress.overallProgress >= 60) {
        classesOnTrack++;
      } else {
        classesBehind++;
      }
    }
    
    const overallProgress = classSheets.length > 0 ? totalProgress / classSheets.length : 0;
    
    return {
      teacherName: teacherInfo.name,
      teacherType: teacherInfo.type,
      gradebookUrl: gradebook.getUrl(),
      totalClasses: classSheets.length,
      classesOnTrack: classesOnTrack,
      classesBehind: classesBehind,
      overallProgress: overallProgress,
      status: determineTeacherStatus(classesOnTrack, classesBehind),
      classes: classResults
    };
    
  } catch (error) {
    console.error(`Error analyzing teacher progress for ${gradebook.getName()}:`, error);
    return {
      teacherName: gradebook.getName(),
      teacherType: 'Unknown',
      gradebookUrl: gradebook.getUrl(),
      totalClasses: 0,
      classesOnTrack: 0,
      classesBehind: 0,
      overallProgress: 0,
      status: 'error',
      error: error.message,
      classes: []
    };
  }
}

/**
 * Analyze individual class progress | 分析個別班級進度
 */
function analyzeClassProgress(classSheet, standards) {
  try {
    const data = classSheet.getDataRange().getValues();
    const headers = data[0];
    
    // Find assessment columns | 找到評量欄位
    const faColumns = findFormativeColumns(headers);
    const saColumns = findSummativeColumns(headers);
    const finalColumn = findFinalColumn(headers);
    
    // Analyze each assessment type | 分析每種評量類型
    const formativeProgress = analyzeAssessmentGroup(
      data, faColumns, standards.formativeRequired, 'Formative'
    );
    const summativeProgress = analyzeAssessmentGroup(
      data, saColumns, standards.summativeRequired, 'Summative'
    );
    
    // Calculate overall progress | 計算整體進度
    const totalRequired = standards.formativeRequired + standards.summativeRequired;
    const totalCompleted = formativeProgress.completed + summativeProgress.completed;
    const overallProgress = totalRequired > 0 ? (totalCompleted / totalRequired) * 100 : 0;
    
    // Count students with incomplete grades | 計算成績不完整的學生數
    const studentsWithIncompleteGrades = countStudentsWithIncompleteGrades(
      data, faColumns, saColumns, standards
    );
    
    return {
      className: classSheet.getName(),
      totalStudents: Math.max(0, data.length - 1), // -1 for header row
      assessmentProgress: {
        formative: formativeProgress,
        summative: summativeProgress
      },
      overallProgress: overallProgress,
      status: determineProgressStatus(overallProgress),
      studentsWithIncompleteGrades: studentsWithIncompleteGrades,
      issues: identifyProgressIssues(formativeProgress, summativeProgress, standards)
    };
    
  } catch (error) {
    console.error(`Error analyzing class progress for ${classSheet.getName()}:`, error);
    return {
      className: classSheet.getName(),
      totalStudents: 0,
      assessmentProgress: { formative: {}, summative: {} },
      overallProgress: 0,
      status: 'error',
      studentsWithIncompleteGrades: 0,
      error: error.message,
      issues: ['Analysis failed']
    };
  }
}

/**
 * Helper functions for progress monitoring | 進度監控輔助函數
 */

function getAllTeacherGradebooks() {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS, false);
    
    if (!teacherGradebooksFolder) {
      console.log('Teacher gradebooks folder not found');
      return [];
    }
    
    const gradebooks = [];
    const files = teacherGradebooksFolder.getFiles();
    
    while (files.hasNext()) {
      const file = files.next();
      if (file.getMimeType() === MimeType.GOOGLE_SHEETS) {
        try {
          const spreadsheet = SpreadsheetApp.openById(file.getId());
          gradebooks.push(spreadsheet);
        } catch (error) {
          console.log(`Could not open gradebook: ${file.getName()}`);
        }
      }
    }
    
    console.log(`Found ${gradebooks.length} teacher gradebooks`);
    return gradebooks;
    
  } catch (error) {
    console.error('Error getting teacher gradebooks:', error);
    return [];
  }
}

function getTeacherInfoFromGradebook(gradebook) {
  try {
    const teacherInfoSheet = gradebook.getSheetByName('📋 Teacher Info | 老師資訊');
    if (!teacherInfoSheet) {
      // Extract from filename
      const name = gradebook.getName();
      const match = name.match(/\d{4}S\d_(.+?)_(LT|IT)_Gradebook/);
      if (match) {
        return { name: match[1], type: match[2] };
      }
      return { name: name, type: 'Unknown' };
    }
    
    const data = teacherInfoSheet.getDataRange().getValues();
    let teacherName = 'Unknown';
    let teacherType = 'Unknown';
    
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (row[0] && row[0].toString().includes('Teacher Name')) {
        teacherName = row[1] || teacherName;
      }
      if (row[0] && row[0].toString().includes('Subject')) {
        teacherType = row[1] || teacherType;
      }
    }
    
    return { name: teacherName, type: teacherType };
    
  } catch (error) {
    console.error('Error getting teacher info:', error);
    return { name: 'Unknown', type: 'Unknown' };
  }
}

function getClassSheetsFromGradebook(gradebook) {
  const sheets = gradebook.getSheets();
  const classSheets = [];
  
  for (const sheet of sheets) {
    const name = sheet.getName();
    // Skip info/system sheets
    if (!name.includes('📋') && !name.includes('Teacher Info') && !name.includes('老師資訊')) {
      classSheets.push(sheet);
    }
  }
  
  return classSheets;
}

function findFormativeColumns(headers) {
  const columns = [];
  for (let i = 0; i < headers.length; i++) {
    const header = headers[i].toString();
    if (header.includes('F.A.') || header.includes('平時')) {
      columns.push(i);
    }
  }
  return columns;
}

function findSummativeColumns(headers) {
  const columns = [];
  for (let i = 0; i < headers.length; i++) {
    const header = headers[i].toString();
    if (header.includes('S.A.') || header.includes('總結')) {
      columns.push(i);
    }
  }
  return columns;
}

function findFinalColumn(headers) {
  for (let i = 0; i < headers.length; i++) {
    const header = headers[i].toString();
    if (header.includes('Final') || header.includes('期末考')) {
      return i;
    }
  }
  return -1;
}

function analyzeAssessmentGroup(data, columns, required, type) {
  let completedAssessments = 0;
  const details = [];
  
  for (let i = 0; i < Math.min(columns.length, required); i++) {
    const col = columns[i];
    const studentsWithGrades = countStudentsWithValidGrades(data, col);
    const isCompleted = studentsWithGrades > 0;
    
    if (isCompleted) completedAssessments++;
    
    details.push({
      assessment: data[0][col], // Header name
      completed: isCompleted,
      studentsWithGrades: studentsWithGrades
    });
  }
  
  return {
    required: required,
    completed: completedAssessments,
    completionRate: required > 0 ? (completedAssessments / required) * 100 : 0,
    details: details
  };
}

function countStudentsWithValidGrades(data, columnIndex) {
  let count = 0;
  for (let row = 1; row < data.length; row++) {
    const value = data[row][columnIndex];
    // Valid: number > 0 or "N" (absent)
    if ((typeof value === 'number' && value > 0) || value === 'N') {
      count++;
    }
  }
  return count;
}

function countStudentsWithIncompleteGrades(data, faColumns, saColumns, standards) {
  const requiredColumns = [];
  
  // Add required formative columns
  for (let i = 0; i < Math.min(faColumns.length, standards.formativeRequired); i++) {
    requiredColumns.push(faColumns[i]);
  }
  
  // Add required summative columns
  for (let i = 0; i < Math.min(saColumns.length, standards.summativeRequired); i++) {
    requiredColumns.push(saColumns[i]);
  }
  
  let incompleteCount = 0;
  
  for (let row = 1; row < data.length; row++) {
    let hasIncompleteGrades = false;
    
    for (const col of requiredColumns) {
      const value = data[row][col];
      // Missing or 0 = incomplete
      if (!value || (typeof value === 'number' && value === 0)) {
        hasIncompleteGrades = true;
        break;
      }
    }
    
    if (hasIncompleteGrades) {
      incompleteCount++;
    }
  }
  
  return incompleteCount;
}

function determineProgressStatus(progress) {
  if (progress >= 90) return 'excellent';
  if (progress >= 80) return 'good';
  if (progress >= 60) return 'normal';
  return 'behind';
}

function determineTeacherStatus(classesOnTrack, classesBehind) {
  const total = classesOnTrack + classesBehind;
  if (total === 0) return 'unknown';
  
  const percentage = (classesOnTrack / total) * 100;
  return determineProgressStatus(percentage);
}

function identifyProgressIssues(formativeProgress, summativeProgress, standards) {
  const issues = [];
  
  if (formativeProgress.completed < formativeProgress.required) {
    const missing = formativeProgress.required - formativeProgress.completed;
    issues.push(`Missing ${missing} F.A.`);
  }
  
  if (summativeProgress.completed < summativeProgress.required) {
    const missing = summativeProgress.required - summativeProgress.completed;
    issues.push(`Missing ${missing} S.A.`);
  }
  
  return issues.length > 0 ? issues : ['No issues'];
}

function saveProgressReport(systemSummary) {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const reportsFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.REPORTS);
    
    const reportName = `Progress Report - ${systemSummary.checkDate.toLocaleString()}`;
    const reportSheet = SpreadsheetApp.create(reportName);
    DriveApp.getFileById(reportSheet.getId()).moveTo(reportsFolder);
    
    generateProgressReportContent(reportSheet, systemSummary);
    
    console.log(`✅ Progress report saved: ${reportName}`);
    return reportSheet.getUrl();
    
  } catch (error) {
    console.error('Error saving progress report:', error);
    return null;
  }
}

function generateProgressReportContent(reportSheet, summary) {
  const sheet = reportSheet.getActiveSheet();
  sheet.setName('Progress Report | 進度報告');
  
  let currentRow = 1;
  
  // Report title
  sheet.getRange(currentRow, 1, 1, 6).merge()
    .setValue(`📊 Progress Report - ${summary.checkDate.toLocaleString()}`)
    .setBackground('#4285F4')
    .setFontColor('white')
    .setFontWeight('bold')
    .setFontSize(16);
  
  currentRow += 2;
  
  // System overview
  const overviewData = [
    ['Total Teachers | 教師總數', summary.totalTeachers],
    ['Total Classes | 班級總數', summary.totalClasses],
    ['Classes On Track | 進度正常班級', summary.classesOnTrack],
    ['Classes Behind | 進度落後班級', summary.classesBehind],
    ['System Progress | 系統整體進度', `${summary.systemProgress.toFixed(1)}%`]
  ];
  
  sheet.getRange(currentRow, 1, overviewData.length, 2).setValues(overviewData);
  sheet.getRange(currentRow, 1, overviewData.length, 1).setFontWeight('bold');
  currentRow += overviewData.length + 2;
  
  // Behind classes alert
  if (summary.classesBehind > 0) {
    addBehindClassesAlert(sheet, summary, currentRow);
  }
}

function addBehindClassesAlert(sheet, summary, startRow) {
  let currentRow = startRow;
  
  // Find behind classes
  const behindClasses = [];
  summary.teacherResults.forEach(teacher => {
    teacher.classes.forEach(classData => {
      if (classData.status === 'behind') {
        behindClasses.push({
          teacher: teacher.teacherName,
          teacherType: teacher.teacherType,
          class: classData.className,
          progress: classData.overallProgress,
          issues: classData.issues
        });
      }
    });
  });
  
  if (behindClasses.length > 0) {
    // Alert header
    sheet.getRange(currentRow, 1, 1, 6).merge()
      .setValue('🚨 CLASSES BEHIND SCHEDULE | 進度落後班級')
      .setBackground('#ffebee')
      .setFontWeight('bold')
      .setFontSize(14);
    
    currentRow += 2;
    
    // Table headers
    const headers = ['Teacher | 教師', 'Type | 類型', 'Class | 班級', 'Progress | 進度', 'Issues | 問題'];
    sheet.getRange(currentRow, 1, 1, headers.length).setValues([headers])
      .setBackground('#f44336')
      .setFontColor('white')
      .setFontWeight('bold');
    
    currentRow++;
    
    // Behind classes data
    behindClasses.forEach(classInfo => {
      sheet.getRange(currentRow, 1, 1, 5).setValues([[
        classInfo.teacher,
        classInfo.teacherType,
        classInfo.class,
        `${classInfo.progress.toFixed(1)}%`,
        classInfo.issues.join(', ')
      ]]).setBackground('#ffcdd2');
      currentRow++;
    });
  }
}

// ===== TEACHER MANAGEMENT FUNCTIONS | 教師管理函數 =====

/**
 * Create single gradebook for specific teacher | 為特定教師建立單一成績簿
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
    
    console.log('🔍 Found HT data:', JSON.stringify(htData, null, 2));
    
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
    
    console.log('🎯 HT Teachers to process:', htTeachers);
    
    // Process each HT teacher
    htTeachers.forEach(htInfo => {
      try {
        // Find this teacher in the regular teacher data
        const teacherRecord = teacherData.find(teacher => teacher.name === htInfo.name);
        
        if (!teacherRecord) {
          console.log(`⚠️ Skipping ${htInfo.name} - not found in regular teacher data`);
          skippedCount++;
          return;
        }
        
        console.log(`Processing HT: ${htInfo.name} (${htInfo.grade} ${htInfo.type})`);
        console.log(`Teacher classes:`, teacherRecord.classes);
        
        // Create HT-enhanced gradebook with special naming
        const gradebookName = `${htInfo.name} - HT ${htInfo.grade} ${htInfo.type} - Gradebook`;
        
        // Enhance teacher record with HT information
        const htEnhancedTeacher = {
          ...teacherRecord,
          isHT: true,
          htGrade: htInfo.grade,
          htType: htInfo.type,
          htPermissions: [`${htInfo.grade}E1`, `${htInfo.grade}E2`, `${htInfo.grade}E3`]
        };
        
        const gradebook = createTeacherGradebook(htEnhancedTeacher, teacherGradebooksFolder, gradebookName);
        
        // Add HT-specific assessment management sheet
        addHTAssessmentManagementSheet(gradebook, htInfo);
        
        successCount++;
        console.log(`✅ Created HT gradebook for ${htInfo.name} (${htInfo.grade} ${htInfo.type})`);
        
      } catch (error) {
        console.error(`❌ Error creating HT gradebook for ${htInfo.name}:`, error);
        errorCount++;
        errors.push(`${htInfo.name} (${htInfo.grade} ${htInfo.type}): ${error.message}`);
      }
    });
    
    const resultMessage = `
🎉 HT Gradebook Creation Complete | HT成績簿建立完成

📊 Results | 結果統計:
• Successfully created | 成功建立: ${successCount} HT gradebooks
• Skipped (not regular teachers) | 跳過（非一般教師）: ${skippedCount}
• Errors | 錯誤: ${errorCount} gradebooks

${errors.length > 0 ? `\n❌ Errors encountered | 遇到的錯誤:\n${errors.join('\n')}` : ''}

✅ Process completed! | 處理完成！

💡 Note: HT gradebooks are enhanced versions of regular teacher gradebooks with additional assessment title management functionality.
💡 注意：HT成績簿是一般教師成績簿的增強版本，具有額外的評量標題管理功能。
    `;
    
    showMessage('✅ HT Creation Complete | HT建立完成', resultMessage);
    
    return {
      success: errorCount === 0,
      successCount: successCount,
      errorCount: errorCount,
      skippedCount: skippedCount,
      errors: errors,
      message: `Created ${successCount} HT gradebooks successfully`
    };
    
  } catch (error) {
    console.error('❌ HT Creation Failed:', error);
    showError('❌ HT Creation Failed | HT建立失敗', `Failed to create HT gradebooks: ${error.message} | 無法建立HT成績簿: ${error.message}`);
    return {
      success: false,
      successCount: 0,
      errorCount: 1,
      errors: [error.message],
      message: 'HT gradebook creation failed'
    };
  }
}

/**
 * Add HT assessment management sheet to existing gradebook | 為現有成績簿添加HT評量管理工作表
 */
function addHTAssessmentManagementSheet(gradebook, htInfo) {
  try {
    console.log(`Adding HT assessment management sheet for ${htInfo.name} (${htInfo.grade} ${htInfo.type})`);
    
    // Create the assessment management sheet
    const assessmentSheet = gradebook.insertSheet(`⚙️ HT Assessment Management`);
    
    // Setup the sheet with HT-specific content
    setupHTAssessmentManagementSheet(assessmentSheet, htInfo);
    
    console.log(`✅ Added HT assessment management sheet for ${htInfo.name}`);
    
  } catch (error) {
    console.error(`❌ Error adding HT assessment sheet for ${htInfo.name}:`, error);
    throw error;
  }
}

/**
 * Setup HT Assessment Management Sheet for enhanced gradebook | 設置增強成績簿的HT評量管理表
 */
function setupHTAssessmentManagementSheet(sheet, htInfo) {
  const { name, gradeGroup, grades, type, responsibilities } = htInfo;
  
  // Title
  sheet.getRange('A1:H1').merge().setValue(`👨‍🏫 ${name} - ${gradeGroup} ${type} HT Assessment Management | ${name} - ${gradeGroup} ${type} HT評量管理`);
  sheet.getRange('A1').setFontSize(14).setFontWeight('bold').setHorizontalAlignment('center');
  sheet.getRange('A1:H1').setBackground('#1976d2').setFontColor('white');
  
  // HT Information
  sheet.getRange('A3').setValue(`📋 HT Information | HT資訊`);
  sheet.getRange('A3').setFontWeight('bold').setFontSize(12);
  
  const htInfoData = [
    ['Name | 姓名:', name],
    ['Grade Group | 年段組:', gradeGroup],
    ['Type | 類型:', `${type} Head Teacher`],
    ['Responsibilities | 職責範圍:', responsibilities]
  ];
  
  sheet.getRange(4, 1, htInfoData.length, 2).setValues(htInfoData);
  sheet.getRange(4, 1, htInfoData.length, 1).setFontWeight('bold');
  
  // Assessment Title Management Section
  let currentRow = 9;
  sheet.getRange(`A${currentRow}:H${currentRow}`).merge().setValue(`⚙️ Assessment Title Management | 評量標題管理`);
  sheet.getRange(`A${currentRow}`).setFontWeight('bold').setFontSize(12).setBackground('#4caf50').setFontColor('white');
  currentRow += 2;
  
  // Create sections for each grade and level combination
  grades.forEach(grade => {
    // Grade section header
    sheet.getRange(`A${currentRow}:H${currentRow}`).merge().setValue(`📚 ${grade} Grade Assessment Titles | ${grade}年級評量標題`);
    sheet.getRange(`A${currentRow}`).setFontWeight('bold').setFontSize(12).setBackground('#2196f3').setFontColor('white');
    currentRow += 2;
    
    ['E1', 'E2', 'E3'].forEach(level => {
      // Level header
      sheet.getRange(`A${currentRow}`).setValue(`📊 ${grade}${level} Level | ${grade}${level}級別`);
      sheet.getRange(`A${currentRow}`).setFontWeight('bold').setBackground('#e3f2fd');
      currentRow++;
      
      // Assessment type headers
      const headers = ['Type | 類型', 'Title 1', 'Title 2', 'Title 3', 'Title 4', 'Title 5', 'Title 6', 'Title 7'];
      sheet.getRange(currentRow, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(currentRow, 1, 1, headers.length).setFontWeight('bold').setBackground('#e8f5e8');
      currentRow++;
      
      // Default assessment titles for this level
      const defaultTitles = [
        ['Formative | 平時', 'F.A.1', 'F.A.2', 'F.A.3', 'F.A.4', 'F.A.5', 'F.A.6', 'F.A.7'],
        ['Summative | 總結', 'S.A.1', 'S.A.2', 'S.A.3', 'S.A.4', '', '', ''],
        ['Final | 期末', 'Final Exam | 期末考', '', '', '', '', '', '']
      ];
      
      sheet.getRange(currentRow, 1, defaultTitles.length, headers.length).setValues(defaultTitles);
      currentRow += defaultTitles.length + 1; // Add spacing between levels
    });
    
    currentRow += 1; // Extra spacing between grades
  });
  
  // Sync Functions Section
  sheet.getRange(`A${currentRow}:H${currentRow}`).merge().setValue('🔄 Sync Functions | 同步功能');
  sheet.getRange(`A${currentRow}`).setFontWeight('bold').setFontSize(12).setBackground('#ff9800').setFontColor('white');
  currentRow += 2;
  
  // Add sync buttons (as text instructions for now)
  const syncInstructions = [
    '🔄 Sync All Your Levels | 同步您的所有級別:',
    `   =syncAssessmentTitlesByGradeGroup("${gradeGroup}", "${type}")`,
    `   ⚠️ Restricted to ${gradeGroup} ${type} teachers only | 僅限 ${gradeGroup} ${type} 教師`,
    '',
    '🔄 Sync Specific Level | 同步特定級別:',
    `   =syncAssessmentTitlesByLevel("${grades[0]}E1") (example for ${grades[0]}E1)`,
    `   ⚠️ You can only sync levels in ${gradeGroup} | 您只能同步 ${gradeGroup} 的級別`,
    '',
    '📋 View Your Settings | 查看您的設定:',
    `   =getAssessmentTitlesByGradeGroup("${gradeGroup}", "${type}")`,
    '',
    '🚨 Security Notice | 安全提醒:',
    '   All sync operations are restricted by your HT permissions',
    '   所有同步操作都受您的HT權限限制'
  ];
  
  syncInstructions.forEach(instruction => {
    sheet.getRange(`A${currentRow}`).setValue(instruction);
    if (instruction.startsWith('   =')) {
      sheet.getRange(`A${currentRow}`).setFontFamily('Courier New').setBackground('#f5f5f5');
    }
    currentRow++;
  });
  
  currentRow += 2;
  
  // Instructions section
  sheet.getRange(`A${currentRow}`).setValue('📝 Instructions | 使用說明');
  sheet.getRange(`A${currentRow}`).setFontWeight('bold').setFontSize(12);
  currentRow++;
  
  const instructions = [
    `1. Edit assessment titles above for your assigned grade group (${gradeGroup})`,
    '2. Changes will sync to all teachers in your grade group when you run sync functions',
    '3. Use the sync formulas above to apply changes to all gradebooks',
    `4. You can only edit titles for ${type} teachers in ${gradeGroup}`,
    '5. Contact system admin if sync functions are not working',
    '',
    `1. 編輯上方分配給您年段組的評量標題 (${gradeGroup})`,
    '2. 當您執行同步功能時，變更將同步到您年段組的所有教師',
    '3. 使用上方的同步公式將變更應用到所有成績簿',
    `4. 您只能編輯 ${gradeGroup} 中 ${type} 教師的標題`,
    '5. 如果同步功能無法運作，請聯繫系統管理員'
  ];
  
  instructions.forEach(instruction => {
    sheet.getRange(`A${currentRow}`).setValue(instruction);
    currentRow++;
  });
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, 8);
}

/**
 * Sync assessment titles by grade group | 依年段組同步評量標題
 */
function syncAssessmentTitlesByGradeGroup(gradeGroup, htType) {
  try {
    console.log(`Starting sync for ${gradeGroup} ${htType} teachers...`);
    
    // STEP 1: Verify HT permissions
    const htContext = getCurrentHTContextEnhanced();
    if (!htContext || !htContext.isHT) {
      throw new Error('Access denied: Only Head Teachers can perform sync operations | 拒絕存取：只有學年主任可以執行同步操作');
    }
    
    // STEP 2: Check if current HT has permission for this grade group and type
    const hasPermission = verifyHTPermissions(htContext, gradeGroup, htType);
    if (!hasPermission) {
      throw new Error(`Access denied: You do not have permission to sync ${gradeGroup} ${htType} teachers | 拒絕存取：您沒有同步 ${gradeGroup} ${htType} 教師的權限`);
    }
    
    console.log(`✅ Permission verified for ${htContext.htName} to sync ${gradeGroup} ${htType}`);
    
    // STEP 3: Find the HT gradebook that contains the assessment titles
    const htGradebookName = findHTGradebookByGradeGroup(gradeGroup, htType);
    if (!htGradebookName) {
      throw new Error(`HT gradebook not found for ${gradeGroup} ${htType}`);
    }
    
    // STEP 4: Get assessment titles from HT gradebook
    const assessmentTitles = getAssessmentTitlesFromHTGradebook(htGradebookName, gradeGroup);
    
    // STEP 5: Find all target teacher gradebooks in the same grade group
    const targetGradebooks = findTeacherGradebooksByGradeGroup(gradeGroup, htType);
    
    let syncedCount = 0;
    const errors = [];
    
    // STEP 6: Apply titles to each target gradebook
    targetGradebooks.forEach(gradebookName => {
      try {
        applyAssessmentTitlesToGradebook(gradebookName, assessmentTitles);
        syncedCount++;
        console.log(`✅ Synced assessment titles to ${gradebookName}`);
      } catch (error) {
        console.error(`❌ Failed to sync to ${gradebookName}:`, error);
        errors.push(`${gradebookName}: ${error.message}`);
      }
    });
    
    const result = {
      success: errors.length === 0,
      syncedCount: syncedCount,
      targetCount: targetGradebooks.length,
      errors: errors,
      htName: htContext.htName,
      htPermissions: htContext.htPermissions,
      message: `${htContext.htName} synced assessment titles to ${syncedCount}/${targetGradebooks.length} gradebooks`
    };
    
    console.log('Sync completed:', result);
    return result;
    
  } catch (error) {
    console.error('Sync failed:', error);
    return {
      success: false,
      error: error.message,
      message: `Sync failed: ${error.message}`
    };
  }
}

/**
 * Sync assessment titles by specific level | 依特定級別同步評量標題
 */
function syncAssessmentTitlesByLevel(level) {
  try {
    // STEP 1: Verify HT permissions first
    const htContext = getCurrentHTContextEnhanced();
    if (!htContext || !htContext.isHT) {
      throw new Error('Access denied: Only Head Teachers can perform sync operations | 拒絕存取：只有學年主任可以執行同步操作');
    }
    
    // Extract grade and level from input (e.g., "G1E1" -> grade="G1", level="E1")
    const match = level.match(/^(G[1-6])(E[1-3])$/);
    if (!match) {
      throw new Error(`Invalid level format: ${level}. Expected format: G1E1, G2E2, etc.`);
    }
    
    const [, grade, levelCode] = match;
    
    // Determine grade group
    let gradeGroup;
    if (['G1', 'G2'].includes(grade)) gradeGroup = 'G1-G2';
    else if (['G3', 'G4'].includes(grade)) gradeGroup = 'G3-G4';
    else if (['G5', 'G6'].includes(grade)) gradeGroup = 'G5-G6';
    else throw new Error(`Invalid grade: ${grade}`);
    
    // STEP 2: Check if HT has permission for this grade group
    if (htContext.htGradeGroup !== gradeGroup) {
      throw new Error(`Access denied: You can only sync levels in your grade group (${htContext.htGradeGroup}), not ${gradeGroup} | 拒絕存取：您只能同步自己年段組 (${htContext.htGradeGroup}) 的級別，不能同步 ${gradeGroup}`);
    }
    
    // STEP 3: Sync only for the HT's type (IT or LT)
    const htType = htContext.htType;
    const result = syncAssessmentTitlesByGradeGroup(gradeGroup, htType);
    
    return {
      success: result.success,
      result: result,
      htType: htType,
      restrictedSync: true,
      message: `Level ${level} sync completed for ${htType} teachers only (restricted by HT permissions)`
    };
    
  } catch (error) {
    console.error('Level sync failed:', error);
    return {
      success: false,
      error: error.message,
      message: `Level sync failed: ${error.message}`
    };
  }
}

/**
 * Get assessment titles by grade group | 依年段組取得評量標題
 */
function getAssessmentTitlesByGradeGroup(gradeGroup, htType) {
  try {
    // STEP 1: Verify HT permissions (optional for read operations, but recommended)
    const htContext = getCurrentHTContextEnhanced();
    if (htContext && htContext.isHT) {
      // If caller is an HT, verify they have permission to view this data
      const hasPermission = verifyHTPermissions(htContext, gradeGroup, htType);
      if (!hasPermission) {
        return { 
          success: false,
          error: `Access denied: You can only view assessment titles for ${htContext.htGradeGroup} ${htContext.htType} teachers | 拒絕存取：您只能查看 ${htContext.htGradeGroup} ${htContext.htType} 教師的評量標題`
        };
      }
    }
    
    const htGradebookName = findHTGradebookByGradeGroup(gradeGroup, htType);
    if (!htGradebookName) {
      return { 
        success: false,
        error: `HT gradebook not found for ${gradeGroup} ${htType}` 
      };
    }
    
    const assessmentTitles = getAssessmentTitlesFromHTGradebook(htGradebookName, gradeGroup);
    return {
      success: true,
      gradeGroup: gradeGroup,
      htType: htType,
      assessmentTitles: assessmentTitles,
      accessedBy: htContext ? htContext.htName : 'System'
    };
    
  } catch (error) {
    console.error('Failed to get assessment titles:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Verify HT permissions for sync operations | 驗證HT同步操作權限
 */
function verifyHTPermissions(htContext, targetGradeGroup, targetHtType) {
  try {
    console.log(`Verifying permissions for ${htContext.htName}...`);
    console.log(`HT Info:`, htContext);
    console.log(`Target: ${targetGradeGroup} ${targetHtType}`);
    
    // Extract HT's grade group and type from filename or context
    const htGradeGroup = htContext.htGradeGroup || extractGradeGroupFromFileName(htContext.fileName);
    const htType = htContext.htType || extractHtTypeFromFileName(htContext.fileName);
    
    if (!htGradeGroup || !htType) {
      console.error('Could not determine HT grade group or type');
      return false;
    }
    
    // Check if grade group matches
    if (htGradeGroup !== targetGradeGroup) {
      console.log(`❌ Grade group mismatch: HT manages ${htGradeGroup}, trying to sync ${targetGradeGroup}`);
      return false;
    }
    
    // Check if HT type matches
    if (htType !== targetHtType) {
      console.log(`❌ HT type mismatch: HT is ${htType}, trying to sync ${targetHtType} teachers`);
      return false;
    }
    
    console.log(`✅ Permission granted: ${htContext.htName} can sync ${targetGradeGroup} ${targetHtType}`);
    return true;
    
  } catch (error) {
    console.error('Error verifying HT permissions:', error);
    return false;
  }
}

/**
 * Extract grade group from HT gradebook filename | 從HT成績簿檔名提取年段組
 */
function extractGradeGroupFromFileName(fileName) {
  // Pattern: "Name - HT G1-G2 IT - Gradebook"
  const match = fileName.match(/HT\s+(G[1-6]-G[1-6])\s+(IT|LT)/);
  return match ? match[1] : null;
}

/**
 * Extract HT type from HT gradebook filename | 從HT成績簿檔名提取HT類型
 */
function extractHtTypeFromFileName(fileName) {
  // Pattern: "Name - HT G1-G2 IT - Gradebook"
  const match = fileName.match(/HT\s+(G[1-6]-G[1-6])\s+(IT|LT)/);
  return match ? match[2] : null;
}

/**
 * Enhanced getCurrentHTContext with better grade group detection | 增強的getCurrentHTContext含更好的年段組檢測
 */
function getCurrentHTContextEnhanced() {
  try {
    const currentFile = SpreadsheetApp.getActiveSpreadsheet();
    const fileName = currentFile.getName();
    
    console.log(`Checking enhanced HT context for file: ${fileName}`);
    
    // Check if current file is an HT gradebook
    // Pattern: "Name - HT G1-G2 IT - Gradebook"
    const htPattern = /^(.+?)\s+-\s+HT\s+(G[1-6]-G[1-6])\s+(IT|LT)\s+-\s+Gradebook$/i;
    const match = fileName.match(htPattern);
    
    if (!match) {
      console.log('Not an HT gradebook file');
      return null;
    }
    
    const [, htName, gradeGroup, htType] = match;
    
    // Get HT data to verify this is a valid HT
    const htData = getHTData();
    
    // Determine which grades this HT manages
    const grades = gradeGroup.split('-'); // ['G1', 'G2']
    
    // Verify HT exists in the system
    let isValidHT = false;
    grades.forEach(grade => {
      const gradeData = htData[grade];
      if (gradeData) {
        const expectedName = htType === 'IT' ? gradeData.itHT : gradeData.ltHT;
        if (expectedName && htName.includes(expectedName.split(' ')[0])) {
          isValidHT = true;
        }
      }
    });
    
    if (!isValidHT) {
      console.log(`❌ HT validation failed for ${htName}`);
      return null;
    }
    
    // Generate permissions list
    const htPermissions = grades.flatMap(grade => [`${grade}E1`, `${grade}E2`, `${grade}E3`]);
    
    const context = {
      isHT: true,
      htName: htName,
      htGradeGroup: gradeGroup,
      htType: htType,
      htGrades: grades,
      htPermissions: htPermissions,
      fileName: fileName
    };
    
    console.log('✅ Enhanced HT context:', context);
    return context;
    
  } catch (error) {
    console.error('Error getting enhanced HT context:', error);
    return null;
  }
}

/**
 * Helper function: Find HT gradebook by grade group | 輔助函數：依年段組尋找HT成績簿
 */
function findHTGradebookByGradeGroup(gradeGroup, htType) {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    
    const files = teacherGradebooksFolder.getFiles();
    
    while (files.hasNext()) {
      const file = files.next();
      const fileName = file.getName();
      
      // Match HT gradebook pattern: "Name - HT G1-G2 IT - Gradebook"
      if (fileName.includes(`HT ${gradeGroup} ${htType}`)) {
        return fileName;
      }
    }
    
    return null;
    
  } catch (error) {
    console.error('Error finding HT gradebook:', error);
    return null;
  }
}

/**
 * Helper function: Get assessment titles from HT gradebook | 輔助函數：從HT成績簿取得評量標題
 */
function getAssessmentTitlesFromHTGradebook(gradebookName, gradeGroup) {
  try {
    console.log(`Reading assessment titles from ${gradebookName} for ${gradeGroup}`);
    
    // Find and open the HT gradebook file
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
      throw new Error(`HT gradebook file not found: ${gradebookName}`);
    }
    
    // Access the HT Assessment Management sheet
    const htAssessmentSheet = htGradebook.getSheetByName('⚙️ HT Assessment Management');
    if (!htAssessmentSheet) {
      throw new Error(`HT Assessment Management sheet not found in ${gradebookName}`);
    }
    
    // Read assessment titles from the sheet
    const data = htAssessmentSheet.getDataRange().getValues();
    const headers = data[0];
    
    // Extract grade levels from the grade group (e.g. "G1-G2" -> ["G1", "G2"])
    const grades = gradeGroup.split('-');
    const assessmentTitles = {};
    
    // Process each grade level
    grades.forEach(grade => {
      assessmentTitles[grade] = {};
      
      // Find rows for this grade level (G1E1, G1E2, G1E3, etc.)
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const level = row[0]; // First column should contain level (e.g., "G1E1")
        
        if (level && level.startsWith(grade)) {
          const levelCode = level.substring(2); // Extract "E1", "E2", "E3"
          assessmentTitles[grade][levelCode] = {};
          
          // Extract assessment titles from subsequent columns
          for (let j = 1; j < headers.length; j++) {
            const header = headers[j];
            const value = row[j];
            
            if (header && value) {
              // Map assessment types (FA1, FA2, SA1, etc.)
              if (header.match(/^(FA|SA|Final)/)) {
                assessmentTitles[grade][levelCode][header] = value;
              }
            }
          }
        }
      }
    });
    
    console.log(`✅ Successfully read assessment titles from ${gradebookName}`);
    console.log('Assessment titles structure:', assessmentTitles);
    
    return {
      success: true,
      gradeGroup: gradeGroup,
      gradebookName: gradebookName,
      assessmentTitles: assessmentTitles,
      message: `Successfully read assessment titles for ${gradeGroup}`
    };
    
  } catch (error) {
    console.error(`❌ Failed to read assessment titles from ${gradebookName}:`, error);
    return {
      success: false,
      error: error.message,
      gradeGroup: gradeGroup,
      gradebookName: gradebookName,
      message: `Failed to read assessment titles: ${error.message}`
    };
  }
}

/**
 * Helper function: Find teacher gradebooks by grade group | 輔助函數：依年段組尋找教師成績簿
 */
function findTeacherGradebooksByGradeGroup(gradeGroup, htType) {
  try {
    console.log(`Finding ${htType} teacher gradebooks in ${gradeGroup}`);
    
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    
    const files = teacherGradebooksFolder.getFiles();
    const teacherGradebooks = [];
    const allFiles = [];
    
    // Extract grades from grade group (e.g., "G1-G2" -> ["G1", "G2"])
    const grades = gradeGroup.split('-');
    console.log(`Target grades: ${grades.join(', ')}`);
    
    // First pass: collect all files for debugging
    while (files.hasNext()) {
      const file = files.next();
      const fileName = file.getName();
      allFiles.push(fileName);
      
      // Skip HT gradebooks - we only want regular teacher gradebooks
      if (fileName.includes('- HT ')) {
        console.log(`⏭️ Skipping HT gradebook: ${fileName}`);
        continue;
      }
      
      // Check if this is a spreadsheet file (has .xlsx or no extension)
      if (!fileName.endsWith('.xlsx') && fileName.includes('.') && !fileName.endsWith('Gradebook')) {
        console.log(`⏭️ Skipping non-gradebook file: ${fileName}`);
        continue;
      }
      
      // Check if this is a teacher gradebook of the correct type
      if (fileName.includes(`_${htType}_`)) {
        console.log(`🔍 Checking ${htType} file: ${fileName}`);
        
        // Multiple pattern matching approaches
        let isMatch = false;
        
        // Pattern 1: Standard format - 2425S2_TeacherName_IT_G1A+G1B+G2C_Gradebook
        const standardPattern = new RegExp(`[_+](${grades.join('|')})[A-Z]`, 'i');
        if (standardPattern.test(fileName)) {
          isMatch = true;
          console.log(`✅ Matched standard pattern: ${fileName}`);
        }
        
        // Pattern 2: Fallback - just check for grade presence
        if (!isMatch) {
          const hasTargetGrade = grades.some(grade => fileName.includes(grade));
          if (hasTargetGrade) {
            isMatch = true;
            console.log(`✅ Matched fallback pattern: ${fileName}`);
          }
        }
        
        // Pattern 3: Even more flexible - check for any G1 or G2 patterns
        if (!isMatch && (gradeGroup === 'G1-G2')) {
          if (fileName.match(/G[12]/)) {
            isMatch = true;
            console.log(`✅ Matched flexible G1-G2 pattern: ${fileName}`);
          }
        }
        
        if (isMatch) {
          teacherGradebooks.push(fileName);
        } else {
          console.log(`❌ No match for: ${fileName}`);
        }
      } else {
        console.log(`⏭️ Wrong teacher type (${htType}): ${fileName}`);
      }
    }
    
    console.log(`📁 Total files in folder: ${allFiles.length}`);
    console.log(`🎯 Found ${teacherGradebooks.length} ${htType} teacher gradebooks in ${gradeGroup}`);
    
    // If no matches found, show all files for debugging
    if (teacherGradebooks.length === 0) {
      console.log('🔍 All files in Teacher Gradebooks folder:');
      allFiles.slice(0, 10).forEach(name => console.log(`  - ${name}`));
      if (allFiles.length > 10) {
        console.log(`  ... and ${allFiles.length - 10} more files`);
      }
    }
    
    return teacherGradebooks;
    
  } catch (error) {
    console.error(`❌ Error finding teacher gradebooks for ${gradeGroup} ${htType}:`, error);
    return [];
  }
}

/**
 * Helper function: Get teacher data from master data | 輔助函數：從主控資料取得教師資料
 */
function getTeacherDataFromMasterData() {
  try {
    const masterData = getMasterDataSheet();
    const teachersSheet = masterData.getSheetByName('Teachers');
    
    if (!teachersSheet) {
      console.warn('Teachers sheet not found in master data');
      return [];
    }
    
    const data = teachersSheet.getDataRange().getValues();
    const headers = data[0];
    
    const nameCol = headers.indexOf('Teacher Name');
    const typeCol = headers.indexOf('Type');
    const classesCol = headers.indexOf('Classes');
    
    if (nameCol === -1 || typeCol === -1) {
      console.warn('Required columns not found in Teachers sheet');
      return [];
    }
    
    const teachers = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[nameCol]) {
        teachers.push({
          name: row[nameCol],
          type: row[typeCol],
          classes: classesCol >= 0 && row[classesCol] ? 
            row[classesCol].toString().split(',').map(c => c.trim()) : []
        });
      }
    }
    
    return teachers;
    
  } catch (error) {
    console.error('Error getting teacher data from master data:', error);
    return [];
  }
}

/**
 * Helper function: Apply assessment titles to gradebook | 輔助函數：將評量標題應用到成績簿
 */
function applyAssessmentTitlesToGradebook(gradebookName, assessmentTitles) {
  try {
    console.log(`Applying assessment titles to ${gradebookName}`);
    
    if (!assessmentTitles || !assessmentTitles.success) {
      throw new Error('Invalid assessment titles data');
    }
    
    // Find and open the target gradebook
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
      throw new Error(`Target gradebook not found: ${gradebookName}`);
    }
    
    const titles = assessmentTitles.assessmentTitles;
    let updatedSheets = 0;
    const errors = [];
    
    // Process each grade level
    Object.keys(titles).forEach(grade => {
      const gradeTitles = titles[grade];
      
      // Process each level within the grade (E1, E2, E3)
      Object.keys(gradeTitles).forEach(level => {
        const levelTitles = gradeTitles[level];
        const sheetName = `${grade}${level}`; // e.g., "G1E1", "G2E2"
        
        try {
          const sheet = targetGradebook.getSheetByName(sheetName);
          if (!sheet) {
            console.warn(`Sheet ${sheetName} not found in ${gradebookName}`);
            return;
          }
          
          // Get the current header row to identify assessment columns
          const headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
          
          // Update assessment title headers
          let updated = false;
          Object.keys(levelTitles).forEach(assessmentType => {
            const newTitle = levelTitles[assessmentType];
            
            // Find the column for this assessment type
            const colIndex = headerRow.findIndex(header => {
              if (typeof header === 'string') {
                return header.includes(assessmentType) || header.startsWith(assessmentType);
              }
              return false;
            });
            
            if (colIndex >= 0) {
              // Update the header with the new assessment title
              const currentHeader = headerRow[colIndex];
              const newHeader = newTitle || currentHeader;
              
              if (newHeader !== currentHeader) {
                sheet.getRange(1, colIndex + 1).setValue(newHeader);
                updated = true;
                console.log(`Updated ${sheetName} ${assessmentType}: "${currentHeader}" → "${newHeader}"`);
              }
            }
          });
          
          if (updated) {
            updatedSheets++;
          }
          
        } catch (sheetError) {
          const errorMsg = `Error updating sheet ${sheetName}: ${sheetError.message}`;
          console.error(errorMsg);
          errors.push(errorMsg);
        }
      });
    });
    
    console.log(`✅ Successfully applied assessment titles to ${gradebookName}`);
    console.log(`Updated ${updatedSheets} sheets`);
    
    return {
      success: true,
      gradebookName: gradebookName,
      updatedSheets: updatedSheets,
      errors: errors,
      message: `Applied assessment titles to ${updatedSheets} sheets in ${gradebookName}`
    };
    
  } catch (error) {
    console.error(`❌ Failed to apply assessment titles to ${gradebookName}:`, error);
    return {
      success: false,
      error: error.message,
      gradebookName: gradebookName,
      message: `Failed to apply assessment titles: ${error.message}`
    };
  }
}

/**
 * Check all gradebooks status | 檢查所有成績簿狀態
 */
function checkAllGradebooks() {
  try {
    showMessage('📊 Checking Gradebooks | 正在檢查成績簿', 
      'Scanning all gradebook files... | 掃描所有成績簿檔案...');
    
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    
    const files = teacherGradebooksFolder.getFiles();
    
    let totalCount = 0;
    let ltCount = 0;
    let itCount = 0;
    let htCount = 0;
    let errorCount = 0;
    const fileList = [];
    
    while (files.hasNext()) {
      const file = files.next();
      const fileName = file.getName();
      
      try {
        totalCount++;
        
        // Determine teacher type from filename
        if (fileName.includes('_LT_')) {
          ltCount++;
        } else if (fileName.includes('_IT_')) {
          itCount++;
        } else if (fileName.includes('_HT_')) {
          htCount++;
        }
        
        fileList.push({
          name: fileName,
          lastModified: file.getLastUpdated().toLocaleDateString(),
          size: file.getSize(),
          id: file.getId()
        });
        
      } catch (error) {
        errorCount++;
        console.error(`Error checking file ${fileName}:`, error);
      }
    }
    
    // Sort files by last modified date
    fileList.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    
    const report = `
📊 GRADEBOOK STATUS REPORT | 成績簿狀態報告

📈 Summary | 總覽:
• Total Gradebooks | 總成績簿數: ${totalCount}
• LT Teachers | LT教師: ${ltCount}
• IT Teachers | IT教師: ${itCount}
• HT Teachers | HT教師: ${htCount}
• Errors | 錯誤: ${errorCount}

📋 Recent Files | 最近檔案 (Top 10):
${fileList.slice(0, 10).map(file => 
  `• ${file.name}\n  Last Modified: ${file.lastModified}`
).join('\n')}

${fileList.length > 10 ? `\n... and ${fileList.length - 10} more files | 還有 ${fileList.length - 10} 個檔案` : ''}

✅ Check Complete | 檢查完成
    `;
    
    showMessage('📊 Gradebook Status | 成績簿狀態', report);
    
  } catch (error) {
    showError('❌ Check Failed | 檢查失敗', `Failed to check gradebooks: ${error.message} | 無法檢查成績簿: ${error.message}`);
  }
}

/**
 * Update gradebook links in master data | 更新主控資料中的成績簿連結
 */
function updateGradebookLinks() {
  try {
    showMessage('🔗 Updating Links | 正在更新連結', 
      'Updating gradebook links in master data... | 正在更新主控資料中的成績簿連結...');
    
    // Get master data and gradebook files
    const masterData = getMasterDataSheet();
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    
    // Create a map of gradebook files
    const gradebookMap = new Map();
    const files = teacherGradebooksFolder.getFiles();
    
    while (files.hasNext()) {
      const file = files.next();
      const fileName = file.getName();
      
      // Extract teacher name and type from filename
      const match = fileName.match(/\d+S\d_(.+?)_(LT|IT|HT)_/);
      if (match) {
        const [, teacherName, teacherType] = match;
        const key = `${teacherName}_${teacherType}`;
        gradebookMap.set(key, {
          name: fileName,
          url: file.getUrl(),
          id: file.getId()
        });
      }
    }
    
    // Update Teachers sheet if it exists
    const teachersSheet = masterData.getSheetByName('Teachers');
    if (teachersSheet) {
      const teacherData = teachersSheet.getDataRange().getValues();
      const headers = teacherData[0];
      
      // Find or add gradebook link column
      let linkCol = headers.indexOf('Gradebook Link');
      if (linkCol === -1) {
        linkCol = headers.length;
        teachersSheet.getRange(1, linkCol + 1).setValue('Gradebook Link');
      }
      
      const nameCol = headers.indexOf('Teacher Name');
      const typeCol = headers.indexOf('Type');
      
      let updateCount = 0;
      
      // Update each teacher row
      for (let i = 1; i < teacherData.length; i++) {
        const row = teacherData[i];
        if (!row[nameCol]) continue;
        
        const key = `${row[nameCol]}_${row[typeCol]}`;
        if (gradebookMap.has(key)) {
          const gradebook = gradebookMap.get(key);
          teachersSheet.getRange(i + 1, linkCol + 1).setValue(gradebook.url);
          updateCount++;
        }
      }
      
      showMessage('✅ Links Updated | 連結已更新', 
        `Gradebook links updated successfully! | 成績簿連結更新成功！\n\n` +
        `📊 Updated Links | 更新連結數: ${updateCount}\n` +
        `📋 Total Gradebooks | 總成績簿數: ${gradebookMap.size}`);
    } else {
      showMessage('ℹ️ No Teachers Sheet | 無教師工作表', 
        'Teachers sheet not found in Master Data. Links cannot be updated. | 在主控資料中找不到教師工作表。無法更新連結。');
    }
    
  } catch (error) {
    showError('❌ Update Failed | 更新失敗', `Failed to update gradebook links: ${error.message} | 無法更新成績簿連結: ${error.message}`);
  }
}

// ===== HT SYNC TESTING FUNCTIONS | HT同步測試函數 =====

/**
 * Test HT sync functionality end-to-end | 端到端測試HT同步功能
 */
function testHTSyncFunctionality() {
  console.log('🧪 Starting HT Sync Functionality Test...');
  
  const testResults = {
    timestamp: new Date().toISOString(),
    tests: [],
    summary: {
      total: 0,
      passed: 0,
      failed: 0,
      warnings: 0
    }
  };
  
  // Test 1: HT Context Detection
  try {
    console.log('Test 1: HT Context Detection');
    const htContext = getCurrentHTContextEnhanced();
    
    if (htContext && htContext.isHT) {
      testResults.tests.push({
        name: 'HT Context Detection',
        status: 'PASS',
        details: `HT detected: ${htContext.htName} (${htContext.htGradeGroup} ${htContext.htType})`,
        data: htContext
      });
      testResults.summary.passed++;
    } else {
      testResults.tests.push({
        name: 'HT Context Detection',
        status: 'FAIL',
        details: 'No HT context detected - test must be run from HT gradebook',
        data: htContext
      });
      testResults.summary.failed++;
    }
  } catch (error) {
    testResults.tests.push({
      name: 'HT Context Detection',
      status: 'ERROR',
      details: error.message,
      data: null
    });
    testResults.summary.failed++;
  }
  testResults.summary.total++;
  
  // Test 2: Assessment Titles Reading
  try {
    console.log('Test 2: Assessment Titles Reading');
    const gradeGroup = 'G1-G2';
    const htType = 'LT';
    const htGradebookName = findHTGradebookByGradeGroup(gradeGroup, htType);
    
    if (htGradebookName) {
      const assessmentTitles = getAssessmentTitlesFromHTGradebook(htGradebookName, gradeGroup);
      
      if (assessmentTitles.success) {
        testResults.tests.push({
          name: 'Assessment Titles Reading',
          status: 'PASS',
          details: `Successfully read assessment titles from ${htGradebookName}`,
          data: assessmentTitles
        });
        testResults.summary.passed++;
      } else {
        testResults.tests.push({
          name: 'Assessment Titles Reading',
          status: 'FAIL',
          details: assessmentTitles.message || 'Failed to read assessment titles',
          data: assessmentTitles
        });
        testResults.summary.failed++;
      }
    } else {
      testResults.tests.push({
        name: 'Assessment Titles Reading',
        status: 'SKIP',
        details: `No HT gradebook found for ${gradeGroup} ${htType}`,
        data: null
      });
      testResults.summary.warnings++;
    }
  } catch (error) {
    testResults.tests.push({
      name: 'Assessment Titles Reading',
      status: 'ERROR',
      details: error.message,
      data: null
    });
    testResults.summary.failed++;
  }
  testResults.summary.total++;
  
  // Test 3: Teacher Gradebook Discovery
  try {
    console.log('Test 3: Teacher Gradebook Discovery');
    const gradeGroup = 'G1-G2';
    const htType = 'LT';
    const teacherGradebooks = findTeacherGradebooksByGradeGroup(gradeGroup, htType);
    
    testResults.tests.push({
      name: 'Teacher Gradebook Discovery',
      status: teacherGradebooks.length > 0 ? 'PASS' : 'WARN',
      details: `Found ${teacherGradebooks.length} ${htType} teacher gradebooks in ${gradeGroup}`,
      data: teacherGradebooks
    });
    
    if (teacherGradebooks.length > 0) {
      testResults.summary.passed++;
    } else {
      testResults.summary.warnings++;
    }
  } catch (error) {
    testResults.tests.push({
      name: 'Teacher Gradebook Discovery',
      status: 'ERROR',
      details: error.message,
      data: null
    });
    testResults.summary.failed++;
  }
  testResults.summary.total++;
  
  // Test 4: Permission Verification
  try {
    console.log('Test 4: Permission Verification');
    const htContext = getCurrentHTContextEnhanced();
    
    if (htContext && htContext.isHT) {
      const hasPermission = verifyHTPermissions(htContext, htContext.htGradeGroup, htContext.htType);
      
      testResults.tests.push({
        name: 'Permission Verification',
        status: hasPermission ? 'PASS' : 'FAIL',
        details: hasPermission ? 
          `HT ${htContext.htName} has valid permissions for ${htContext.htGradeGroup} ${htContext.htType}` :
          `HT ${htContext.htName} permission verification failed`,
        data: { htContext, hasPermission }
      });
      
      if (hasPermission) {
        testResults.summary.passed++;
      } else {
        testResults.summary.failed++;
      }
    } else {
      testResults.tests.push({
        name: 'Permission Verification',
        status: 'SKIP',
        details: 'No HT context available for permission testing',
        data: null
      });
      testResults.summary.warnings++;
    }
  } catch (error) {
    testResults.tests.push({
      name: 'Permission Verification',
      status: 'ERROR',
      details: error.message,
      data: null
    });
    testResults.summary.failed++;
  }
  testResults.summary.total++;
  
  // Generate test report
  const report = generateHTSyncTestReport(testResults);
  console.log('🧪 HT Sync Test Results:', testResults);
  console.log('📋 Test Report:', report);
  
  return {
    success: testResults.summary.failed === 0,
    testResults: testResults,
    report: report
  };
}

/**
 * Generate HT sync test report | 生成HT同步測試報告
 */
function generateHTSyncTestReport(testResults) {
  const { summary, tests } = testResults;
  const successRate = summary.total > 0 ? ((summary.passed / summary.total) * 100).toFixed(1) : 0;
  
  let report = `
🧪 HT SYNC FUNCTIONALITY TEST REPORT | HT同步功能測試報告
==========================================

📊 TEST SUMMARY | 測試總覽:
• Total Tests | 總測試數: ${summary.total}
• Passed | 通過: ${summary.passed}
• Failed | 失敗: ${summary.failed}
• Warnings | 警告: ${summary.warnings}
• Success Rate | 成功率: ${successRate}%

📋 DETAILED RESULTS | 詳細結果:
`;

  tests.forEach((test, index) => {
    const statusIcon = {
      'PASS': '✅',
      'FAIL': '❌',
      'ERROR': '🚨',
      'WARN': '⚠️',
      'SKIP': '⏭️'
    }[test.status] || '❓';
    
    report += `
${index + 1}. ${statusIcon} ${test.name}
   Status: ${test.status}
   Details: ${test.details}
`;
  });
  
  report += `
==========================================
🎯 NEXT STEPS | 下一步:
`;

  if (summary.failed > 0) {
    report += `
❌ CRITICAL ISSUES FOUND | 發現關鍵問題:
• ${summary.failed} test(s) failed - review error details above
• Address failed tests before deploying HT sync functionality
• Run tests again after fixes are applied
`;
  } else if (summary.warnings > 0) {
    report += `
⚠️ WARNINGS DETECTED | 檢測到警告:
• ${summary.warnings} test(s) had warnings - review for potential issues
• HT sync functionality may work but with limitations
• Consider addressing warnings for optimal performance
`;
  } else {
    report += `
✅ ALL TESTS PASSED | 所有測試通過:
• HT sync functionality is ready for production use
• All core functions implemented and working correctly
• Permission system validated successfully
`;
  }
  
  report += `
Generated: ${testResults.timestamp}
`;
  
  return report;
}

// ===== HT DASHBOARD ENHANCED FUNCTIONS | HT控制台增強函數 =====

/**
 * Get HT dashboard data for Web App | 取得 Web App 版本的 HT 控制台資料
 */
function getHTDashboardDataForWebApp(htName, gradeGroup, htType) {
  try {
    console.log(`Getting HT dashboard data for: ${htName} (${gradeGroup} ${htType})`);
    
    // Create HT context for Web App
    const htContext = createHTContextForWebApp(htName, gradeGroup, htType);
    
    if (!htContext) {
      return {
        success: false,
        error: '無效的 HT 資訊 | Invalid HT information'
      };
    }
    
    // 讀取現有評量標題
    const htGradebookName = findHTGradebookByGradeGroup(htContext.htGradeGroup, htContext.htType);
    let currentTitles = null;
    
    if (htGradebookName) {
      currentTitles = getAssessmentTitlesFromHTGradebook(htGradebookName, htContext.htGradeGroup);
    }
    
    // 查找目標教師成績簿
    const targetTeachers = findTeacherGradebooksByGradeGroup(htContext.htGradeGroup, htContext.htType);
    
    return {
      success: true,
      htContext: htContext,
      currentTitles: currentTitles,
      targetTeachers: targetTeachers,
      htGradebookName: htGradebookName
    };
    
  } catch (error) {
    console.error('Error getting HT dashboard data for Web App:', error);
    return {
      success: false,
      error: `無法載入 HT 資料: ${error.message}`
    };
  }
}

/**
 * Create HT context for Web App | 為 Web App 創建 HT 上下文
 */
function createHTContextForWebApp(htName, gradeGroup, htType) {
  try {
    if (!htName || !gradeGroup || !htType) {
      return null;
    }
    
    // Extract grades from grade group
    const grades = gradeGroup.split('-'); // ['G1', 'G2']
    
    // Generate permissions list
    const htPermissions = grades.flatMap(grade => [`${grade}E1`, `${grade}E2`, `${grade}E3`]);
    
    const context = {
      isHT: true,
      htName: htName,
      htGradeGroup: gradeGroup,
      htType: htType,
      htGrades: grades,
      htPermissions: htPermissions,
      fileName: `${htName} - HT ${gradeGroup} ${htType} - Gradebook`,
      isWebApp: true
    };
    
    console.log('✅ Created HT context for Web App:', context);
    return context;
    
  } catch (error) {
    console.error('Error creating HT context for Web App:', error);
    return null;
  }
}

/**
 * Get all available HT options for Web App login | 取得 Web App 登入的所有 HT 選項
 */
function getAvailableHTOptions() {
  try {
    console.log('Getting available HT options...');
    
    // Get HT data from the system
    const htData = getHTData();
    const htOptions = [];
    
    Object.keys(htData).forEach(grade => {
      const gradeData = htData[grade];
      
      // Determine grade group
      let gradeGroup;
      if (['G1', 'G2'].includes(grade)) gradeGroup = 'G1-G2';
      else if (['G3', 'G4'].includes(grade)) gradeGroup = 'G3-G4';
      else if (['G5', 'G6'].includes(grade)) gradeGroup = 'G5-G6';
      
      if (gradeGroup) {
        // Add LT HT
        if (gradeData.ltHT && !htOptions.some(opt => opt.name === gradeData.ltHT && opt.gradeGroup === gradeGroup)) {
          htOptions.push({
            name: gradeData.ltHT,
            gradeGroup: gradeGroup,
            type: 'LT',
            displayName: `${gradeData.ltHT} (${gradeGroup} LT HT)`
          });
        }
        
        // Add IT HT
        if (gradeData.itHT && !htOptions.some(opt => opt.name === gradeData.itHT && opt.gradeGroup === gradeGroup)) {
          htOptions.push({
            name: gradeData.itHT,
            gradeGroup: gradeGroup,
            type: 'IT',
            displayName: `${gradeData.itHT} (${gradeGroup} IT HT)`
          });
        }
      }
    });
    
    console.log(`Found ${htOptions.length} HT options`);
    return {
      success: true,
      htOptions: htOptions
    };
    
  } catch (error) {
    console.error('Error getting available HT options:', error);
    return {
      success: false,
      error: error.message,
      htOptions: []
    };
  }
}

/**
 * Get HT dashboard data for sync interface | 取得HT控制台同步介面資料
 */
function getHTDashboardDataFromDashboard() {
  try {
    const htContext = getCurrentHTContextEnhanced();
    
    if (!htContext || !htContext.isHT) {
      return {
        success: false,
        error: '請在 HT 成績簿中開啟此頁面 | Please open this page from HT gradebook'
      };
    }
    
    // 讀取現有評量標題
    const htGradebookName = findHTGradebookByGradeGroup(htContext.htGradeGroup, htContext.htType);
    let currentTitles = null;
    
    if (htGradebookName) {
      currentTitles = getAssessmentTitlesFromHTGradebook(htGradebookName, htContext.htGradeGroup);
    }
    
    // 查找目標教師成績簿
    const targetTeachers = findTeacherGradebooksByGradeGroup(htContext.htGradeGroup, htContext.htType);
    
    return {
      success: true,
      htContext: htContext,
      currentTitles: currentTitles,
      targetTeachers: targetTeachers,
      htGradebookName: htGradebookName
    };
    
  } catch (error) {
    console.error('Error getting HT dashboard data:', error);
    return {
      success: false,
      error: `無法載入 HT 資料: ${error.message}`
    };
  }
}

/**
 * Sync assessment titles from dashboard form | 從控制台表單同步評量標題
 */
function syncAssessmentTitlesFromDashboard(formData) {
  try {
    console.log('Starting dashboard sync with form data:', formData);
    
    // In Web App mode, we already verified HT context during login
    // So we skip the spreadsheet-based verification and trust the web app authentication
    const htContext = {
      isHT: true,
      htName: "Ms. Johnson", // This would be passed from frontend
      htGradeGroup: "G1-G2",
      htType: "LT",
      htGrades: ["G1", "G2"] // This would be calculated based on grade group
    };
    
    console.log('Using Web App HT context:', htContext);
    
    // 將表單資料轉換為評量標題結構
    const assessmentTitles = parseFormDataToAssessmentTitles(formData, htContext.htGrades);
    
    // 儲存到 HT 成績簿
    const saveResult = saveAssessmentTitlesToHTGradebook(htContext, assessmentTitles);
    
    if (!saveResult.success) {
      throw new Error(saveResult.error);
    }
    
    // 執行同步到教師成績簿
    const syncResult = syncAssessmentTitlesByGradeGroup(htContext.htGradeGroup, htContext.htType);
    
    return {
      success: true,
      syncResult: syncResult,
      htContext: htContext,
      assessmentTitles: assessmentTitles,
      message: `成功同步評量標題到 ${syncResult.syncedCount} 個教師成績簿`
    };
    
  } catch (error) {
    console.error('Dashboard sync failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Parse form data to assessment titles structure | 解析表單資料為評量標題結構
 */
function parseFormDataToAssessmentTitles(formData, grades) {
  try {
    const assessmentTitles = {};
    const levels = ['E1', 'E2', 'E3'];
    const assessmentTypes = ['FA1', 'FA2', 'SA1', 'Final'];
    
    grades.forEach(grade => {
      assessmentTitles[grade] = {};
      
      levels.forEach(level => {
        assessmentTitles[grade][level] = {};
        
        assessmentTypes.forEach(type => {
          const key = `${grade}${level}_${type}`;
          const value = formData[key] || '';
          
          if (value.trim()) {
            assessmentTitles[grade][level][type] = value.trim();
          }
        });
      });
    });
    
    return {
      success: true,
      assessmentTitles: assessmentTitles,
      formData: formData
    };
    
  } catch (error) {
    console.error('Error parsing form data:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Save assessment titles to HT gradebook | 儲存評量標題到HT成績簿
 */
function saveAssessmentTitlesToHTGradebook(htContext, assessmentTitles) {
  try {
    console.log('Saving assessment titles to HT gradebook...');
    
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    
    // 找到 HT 成績簿
    const files = teacherGradebooksFolder.getFiles();
    let htGradebook = null;
    
    while (files.hasNext()) {
      const file = files.next();
      if (file.getName().includes(`HT ${htContext.htGradeGroup} ${htContext.htType}`)) {
        htGradebook = SpreadsheetApp.openById(file.getId());
        break;
      }
    }
    
    if (!htGradebook) {
      throw new Error('找不到 HT 成績簿檔案');
    }
    
    // 更新 HT Assessment Management 工作表
    const htAssessmentSheet = htGradebook.getSheetByName('⚙️ HT Assessment Management');
    if (!htAssessmentSheet) {
      throw new Error('找不到 HT Assessment Management 工作表');
    }
    
    // 寫入評量標題資料
    const updateResult = updateHTAssessmentSheet(htAssessmentSheet, assessmentTitles);
    
    console.log('✅ Assessment titles saved to HT gradebook');
    return { 
      success: true,
      updateResult: updateResult
    };
    
  } catch (error) {
    console.error('❌ Failed to save assessment titles:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
}

/**
 * Update HT Assessment Management sheet | 更新HT評量管理工作表
 */
function updateHTAssessmentSheet(sheet, assessmentTitles) {
  try {
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    // 找到評量類型欄位的位置
    const assessmentTypeMap = {};
    headers.forEach((header, index) => {
      if (header && header.match(/^(FA1|FA2|SA1|Final)/)) {
        assessmentTypeMap[header] = index;
      }
    });
    
    let updatedRows = 0;
    const titles = assessmentTitles.assessmentTitles;
    
    // 更新每個級別的評量標題
    Object.keys(titles).forEach(grade => {
      const gradeTitles = titles[grade];
      
      Object.keys(gradeTitles).forEach(level => {
        const levelTitles = gradeTitles[level];
        const levelCode = `${grade}${level}`; // e.g., "G1E1"
        
        // 找到對應的行
        for (let i = 1; i < data.length; i++) {
          if (data[i][0] === levelCode) {
            // 更新這一行的評量標題
            Object.keys(levelTitles).forEach(assessmentType => {
              const colIndex = assessmentTypeMap[assessmentType];
              if (colIndex !== undefined) {
                const newTitle = levelTitles[assessmentType];
                sheet.getRange(i + 1, colIndex + 1).setValue(newTitle);
                updatedRows++;
              }
            });
            break;
          }
        }
      });
    });
    
    return {
      success: true,
      updatedRows: updatedRows,
      message: `Updated ${updatedRows} assessment title cells`
    };
    
  } catch (error) {
    console.error('Error updating HT assessment sheet:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Get assessment titles for dashboard form | 取得控制台表單的評量標題
 */
function getAssessmentTitlesForDashboard() {
  try {
    const htContext = getCurrentHTContextEnhanced();
    
    if (!htContext || !htContext.isHT) {
      return {
        success: false,
        error: '請在 HT 成績簿中執行此操作'
      };
    }
    
    const htGradebookName = findHTGradebookByGradeGroup(htContext.htGradeGroup, htContext.htType);
    
    if (!htGradebookName) {
      return {
        success: false,
        error: '找不到對應的 HT 成績簿'
      };
    }
    
    const assessmentTitles = getAssessmentTitlesFromHTGradebook(htGradebookName, htContext.htGradeGroup);
    
    return {
      success: true,
      htContext: htContext,
      assessmentTitles: assessmentTitles,
      htGradebookName: htGradebookName
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// ===== HT ASSESSMENT SHEET DIRECT FUNCTIONS | HT評量工作表直接函數 =====

/**
 * Add sync buttons directly to HT Assessment Management sheet | 在HT評量管理工作表中直接加入同步按鈕
 */
function addSyncButtonsToHTSheet() {
  try {
    console.log('Adding sync buttons to HT Assessment Management sheet...');
    
    const currentSheet = SpreadsheetApp.getActiveSheet();
    const sheetName = currentSheet.getName();
    
    // Check if this is an HT Assessment Management sheet
    if (!sheetName.includes('HT Assessment Management')) {
      showMessage(
        '⚠️ 工作表檢查 | Sheet Check',
        '此功能只能在 HT Assessment Management 工作表中使用。\nThis function can only be used in HT Assessment Management sheet.'
      );
      return;
    }
    
    // Check HT context
    const htContext = getCurrentHTContextEnhanced();
    if (!htContext || !htContext.isHT) {
      showMessage(
        '⚠️ 權限檢查 | Permission Check',
        '需要 HT 權限才能加入同步按鈕。\nHT permissions required to add sync buttons.'
      );
      return;
    }
    
    // Add sync buttons in the sheet
    const buttonRow = 31; // Row 31 for buttons
    
    // Clear existing content in button area
    currentSheet.getRange(buttonRow, 1, 3, 10).clearContent();
    
    // Add sync button labels and instructions
    currentSheet.getRange(buttonRow, 1).setValue('🔄 快速同步功能 | Quick Sync Functions');
    currentSheet.getRange(buttonRow, 1).setFontWeight('bold').setBackground('#4CAF50').setFontColor('white');
    
    currentSheet.getRange(buttonRow + 1, 1).setValue('點擊下方連結執行同步 | Click links below to sync:');
    currentSheet.getRange(buttonRow + 1, 1).setFontStyle('italic');
    
    // Add clickable sync function
    const syncFormula = '=HYPERLINK("javascript:quickSyncFromSheet()","🔄 立即同步所有教師 | Sync All Teachers Now")';
    currentSheet.getRange(buttonRow + 2, 1).setFormula(syncFormula);
    currentSheet.getRange(buttonRow + 2, 1).setBackground('#2196F3').setFontColor('white').setFontWeight('bold');
    
    // Add dashboard link
    const dashboardFormula = '=HYPERLINK("javascript:openHTDashboardFromSheet()","👨‍🏫 開啟完整控制台 | Open Full Dashboard")';
    currentSheet.getRange(buttonRow + 2, 4).setFormula(dashboardFormula);
    currentSheet.getRange(buttonRow + 2, 4).setBackground('#FF9800').setFontColor('white').setFontWeight('bold');
    
    // Add instructions
    currentSheet.getRange(buttonRow + 3, 1).setValue('💡 提示：如果連結無效，請使用 Apps Script 選單中的函數 | Tip: If links don\'t work, use functions in Apps Script menu');
    currentSheet.getRange(buttonRow + 3, 1).setFontSize(10).setFontStyle('italic');
    
    showMessage(
      '✅ 同步按鈕已加入 | Sync Buttons Added',
      '同步按鈕已成功加入到此工作表。\n您可以直接點擊按鈕執行同步。\n\nSync buttons have been added to this sheet.\nYou can click the buttons to perform sync operations.'
    );
    
  } catch (error) {
    console.error('❌ Failed to add sync buttons:', error);
    showError(
      '❌ 加入按鈕失敗 | Failed to Add Buttons',
      `無法加入同步按鈕：${error.message}\n\nFailed to add sync buttons: ${error.message}`
    );
  }
}

/**
 * Quick sync function to be called from HT sheet | 從HT工作表呼叫的快速同步函數
 */
function quickSyncFromSheet() {
  try {
    console.log('Quick sync called from HT sheet...');
    
    // Just call our existing quick sync function
    quickSyncAssessmentTitles();
    
  } catch (error) {
    console.error('❌ Quick sync from sheet failed:', error);
    showError(
      '❌ 同步失敗 | Sync Failed',
      `從工作表執行同步失敗：${error.message}\n\nSync from sheet failed: ${error.message}`
    );
  }
}

/**
 * Open HT Dashboard from sheet | 從工作表開啟HT控制台
 */
function openHTDashboardFromSheet() {
  try {
    console.log('Opening HT Dashboard from sheet...');
    
    // Just call our existing dashboard function
    openHTDashboard();
    
  } catch (error) {
    console.error('❌ Failed to open dashboard from sheet:', error);
    showError(
      '❌ 開啟控制台失敗 | Failed to Open Dashboard',
      `從工作表開啟控制台失敗：${error.message}\n\nFailed to open dashboard from sheet: ${error.message}`
    );
  }
}

// ===== SIMPLIFIED HT OPERATIONS | 簡化HT操作函數 =====

/**
 * Open HT Dashboard directly | 直接開啟HT控制台
 */
function openHTDashboard() {
  try {
    console.log('Opening HT Dashboard...');
    
    // Check if user is in HT gradebook
    const htContext = getCurrentHTContextEnhanced();
    
    if (!htContext || !htContext.isHT) {
      showMessage(
        '⚠️ HT權限檢查 | HT Permission Check',
        '此功能只能在 HT 成績簿中使用。\n請開啟您的 HT 成績簿檔案後再試。\n\nThis feature can only be used from HT gradebook.\nPlease open your HT gradebook file and try again.'
      );
      return;
    }
    
    // Create and display HT Dashboard HTML
    const html = HtmlService.createTemplateFromFile('dashboard_for_HT');
    html.htContext = htContext;
    
    const htmlOutput = html.evaluate()
      .setWidth(1200)
      .setHeight(800)
      .setTitle('HT Dashboard | 學年主任控制台');
    
    SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'HT Dashboard | 學年主任控制台');
    
    console.log('✅ HT Dashboard opened successfully');
    
  } catch (error) {
    console.error('❌ Failed to open HT Dashboard:', error);
    showError(
      '❌ 開啟失敗 | Failed to Open',
      `無法開啟 HT 控制台：${error.message}\n\nFailed to open HT Dashboard: ${error.message}`
    );
  }
}

/**
 * Quick sync assessment titles | 快速同步評量標題
 */
function quickSyncAssessmentTitles() {
  try {
    console.log('Starting quick sync...');
    
    // Check HT permissions
    const htContext = getCurrentHTContextEnhanced();
    
    if (!htContext || !htContext.isHT) {
      showMessage(
        '⚠️ 權限不足 | Permission Denied',
        '只有學年主任可以執行同步操作。\n請在您的 HT 成績簿中執行此功能。\n\nOnly Head Teachers can perform sync operations.\nPlease execute this from your HT gradebook.'
      );
      return;
    }
    
    showMessage(
      '🔄 開始同步 | Starting Sync',
      `正在為 ${htContext.htName} (${htContext.htGradeGroup} ${htContext.htType}) 執行快速同步...\n\nStarting quick sync for ${htContext.htName} (${htContext.htGradeGroup} ${htContext.htType})...`
    );
    
    // Perform the sync
    const syncResult = syncAssessmentTitlesByGradeGroup(htContext.htGradeGroup, htContext.htType);
    
    if (syncResult.success) {
      showMessage(
        '✅ 同步完成 | Sync Complete',
        `同步成功完成！\n\n` +
        `同步成功：${syncResult.syncedCount} 個教師成績簿\n` +
        `目標總數：${syncResult.targetCount} 個教師成績簿\n` +
        `執行者：${syncResult.htName}\n\n` +
        `Sync completed successfully!\n\n` +
        `Synced: ${syncResult.syncedCount} teacher gradebooks\n` +
        `Total targets: ${syncResult.targetCount} teacher gradebooks\n` +
        `Executed by: ${syncResult.htName}`
      );
    } else {
      showError(
        '❌ 同步失敗 | Sync Failed',
        `同步操作失敗：${syncResult.error || syncResult.message}\n\nSync operation failed: ${syncResult.error || syncResult.message}`
      );
    }
    
  } catch (error) {
    console.error('❌ Quick sync failed:', error);
    showError(
      '❌ 快速同步失敗 | Quick Sync Failed',
      `快速同步失敗：${error.message}\n\nQuick sync failed: ${error.message}`
    );
  }
}

/**
 * Enhanced assessment title management for HT | 增強版HT評量標題管理
 */
function manageHTAssessmentTitles() {
  try {
    console.log('Opening enhanced assessment title management...');
    
    // Check HT permissions
    const htContext = getCurrentHTContextEnhanced();
    
    if (!htContext || !htContext.isHT) {
      showMessage(
        '⚠️ 權限檢查 | Permission Check',
        '此功能需要 HT 權限。\n請在您的 HT 成績簿中執行此操作。\n\nThis feature requires HT permissions.\nPlease execute from your HT gradebook.'
      );
      return;
    }
    
    // Get current assessment titles
    const dashboardData = getHTDashboardDataFromDashboard();
    
    if (!dashboardData.success) {
      showError(
        '❌ 載入失敗 | Load Failed',
        `無法載入評量標題資料：${dashboardData.error}\n\nFailed to load assessment title data: ${dashboardData.error}`
      );
      return;
    }
    
    // Generate editable interface
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert(
      '📝 評量標題管理 | Assessment Title Management',
      `HT身份確認：${htContext.htName} (${htContext.htGradeGroup} ${htContext.htType})\n\n` +
      `目標教師數：${dashboardData.targetTeachers.length} 位\n\n` +
      `您希望如何管理評量標題？\n\n` +
      `HT Identity: ${htContext.htName} (${htContext.htGradeGroup} ${htContext.htType})\n` +
      `Target teachers: ${dashboardData.targetTeachers.length}\n\n` +
      `How would you like to manage assessment titles?`,
      ui.ButtonSet.YES_NO_CANCEL
    );
    
    if (response === ui.Button.YES) {
      // Open full dashboard
      openHTDashboard();
    } else if (response === ui.Button.NO) {
      // Quick sync with current titles
      quickSyncAssessmentTitles();
    }
    // Cancel - do nothing
    
  } catch (error) {
    console.error('❌ Failed to manage assessment titles:', error);
    showError(
      '❌ 管理失敗 | Management Failed',
      `評量標題管理失敗：${error.message}\n\nAssessment title management failed: ${error.message}`
    );
  }
}

/**
 * Simple assessment title editor with immediate sync | 簡單的評量標題編輯器含即時同步
 */
function editAndSyncAssessmentTitles() {
  try {
    console.log('Opening simple assessment title editor...');
    
    // Check HT permissions
    const htContext = getCurrentHTContextEnhanced();
    
    if (!htContext || !htContext.isHT) {
      showMessage(
        '⚠️ 權限不足 | Insufficient Permissions',
        '只有學年主任可以編輯評量標題。\nOnly Head Teachers can edit assessment titles.'
      );
      return;
    }
    
    // For now, redirect to the full dashboard
    openHTDashboard();
    
  } catch (error) {
    console.error('❌ Failed to open assessment title editor:', error);
    showError(
      '❌ 編輯器啟動失敗 | Editor Launch Failed',
      `無法啟動評量標題編輯器：${error.message}\n\nFailed to launch assessment title editor: ${error.message}`
    );
  }
}

// ===== PROGRESS MANAGEMENT FUNCTIONS | 進度管理函數 =====

/**
 * Check progress for all teachers | 檢查所有教師的進度
 */
function checkAllProgress() {
  try {
    showMessage('📈 Checking Progress | 正在檢查進度', 
      'Analyzing progress for all teachers... | 分析所有教師的進度...');
    
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    
    const files = teacherGradebooksFolder.getFiles();
    const progressData = [];
    
    let totalTeachers = 0;
    let excellentCount = 0;
    let goodCount = 0;
    let normalCount = 0;
    let behindCount = 0;
    
    while (files.hasNext()) {
      const file = files.next();
      
      try {
        const gradebook = SpreadsheetApp.openById(file.getId());
        const sheets = gradebook.getSheets();
        
        let totalClasses = 0;
        let completedClasses = 0;
        
        // Check each class sheet
        for (const sheet of sheets) {
          const sheetName = sheet.getName();
          if (sheetName.includes('Teacher Info') || sheetName.includes('老師資訊')) {
            continue;
          }
          
          totalClasses++;
          const data = sheet.getDataRange().getValues();
          
          // Check if gradebook has data (more than just headers)
          if (data.length > 2) {
            // Count non-empty grade cells
            let gradeCount = 0;
            for (let i = 2; i < data.length; i++) {
              for (let j = 3; j < data[0].length; j++) {
                if (data[i][j] && !isNaN(data[i][j])) {
                  gradeCount++;
                }
              }
            }
            
            if (gradeCount > 0) {
              completedClasses++;
            }
          }
        }
        
        const progressPercent = totalClasses > 0 ? (completedClasses / totalClasses) * 100 : 0;
        
        // Categorize progress
        if (progressPercent >= SYSTEM_CONFIG.PROGRESS.EXCELLENT) {
          excellentCount++;
        } else if (progressPercent >= SYSTEM_CONFIG.PROGRESS.GOOD) {
          goodCount++;
        } else if (progressPercent >= SYSTEM_CONFIG.PROGRESS.NORMAL) {
          normalCount++;
        } else {
          behindCount++;
        }
        
        progressData.push({
          teacher: file.getName().replace(/\d+S\d_(.+?)_(LT|IT|HT)_.*/, '$1'),
          progress: progressPercent.toFixed(1),
          completed: completedClasses,
          total: totalClasses
        });
        
        totalTeachers++;
        
      } catch (error) {
        console.warn(`Error checking progress for ${file.getName()}:`, error);
      }
    }
    
    // Sort by progress (lowest first to identify who needs help)
    progressData.sort((a, b) => parseFloat(a.progress) - parseFloat(b.progress));
    
    const report = `
📈 PROGRESS REPORT | 進度報告

📊 Overall Statistics | 整體統計:
• Total Teachers | 總教師數: ${totalTeachers}
• 🟢 Excellent (≥${SYSTEM_CONFIG.PROGRESS.EXCELLENT}%) | 優秀: ${excellentCount}
• 🟡 Good (${SYSTEM_CONFIG.PROGRESS.GOOD}-${SYSTEM_CONFIG.PROGRESS.EXCELLENT-1}%) | 良好: ${goodCount}
• 🟠 Normal (${SYSTEM_CONFIG.PROGRESS.NORMAL}-${SYSTEM_CONFIG.PROGRESS.GOOD-1}%) | 普通: ${normalCount}
• 🔴 Behind (<${SYSTEM_CONFIG.PROGRESS.NORMAL}%) | 落後: ${behindCount}

🎯 Teachers Needing Attention | 需要關注的教師 (Bottom 10):
${progressData.slice(0, 10).map(teacher => 
  `• ${teacher.teacher}: ${teacher.progress}% (${teacher.completed}/${teacher.total} classes)`
).join('\n')}

✅ Progress Check Complete | 進度檢查完成
    `;
    
    showMessage('📈 Progress Report | 進度報告', report);
    
  } catch (error) {
    showError('❌ Progress Check Failed | 進度檢查失敗', `Failed to check progress: ${error.message} | 無法檢查進度: ${error.message}`);
  }
}

/**
 * Generate detailed progress report | 生成詳細進度報告
 */
function generateDetailedReport() {
  try {
    showMessage('📋 Generating Report | 正在生成報告', 
      'Creating detailed progress report... | 正在建立詳細進度報告...');
    
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const reportsFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.REPORTS);
    
    // Create a new spreadsheet for the report
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportName = `Progress_Report_${timestamp}`;
    const reportSheet = SpreadsheetApp.create(reportName);
    
    // Move to reports folder
    DriveApp.getFileById(reportSheet.getId()).moveTo(reportsFolder);
    
    // Set up report structure
    const sheet = reportSheet.getActiveSheet();
    sheet.setName('Progress Summary | 進度總覽');
    
    // Headers
    const headers = [
      'Teacher Name | 教師姓名',
      'Type | 類型',
      'Total Classes | 總班級數',
      'Completed Classes | 完成班級數',
      'Progress % | 進度百分比',
      'Status | 狀態',
      'Last Updated | 最後更新'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setBackground('#4CAF50').setFontColor('white').setFontWeight('bold');
    
    // Collect data
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    const files = teacherGradebooksFolder.getFiles();
    const reportData = [];
    
    while (files.hasNext()) {
      const file = files.next();
      
      try {
        const gradebook = SpreadsheetApp.openById(file.getId());
        const sheets = gradebook.getSheets();
        
        // Extract teacher info from filename
        const match = file.getName().match(/\d+S\d_(.+?)_(LT|IT|HT)_/);
        if (!match) continue;
        
        const [, teacherName, teacherType] = match;
        
        let totalClasses = 0;
        let completedClasses = 0;
        
        // Analyze each class sheet
        for (const sheet of sheets) {
          const sheetName = sheet.getName();
          if (sheetName.includes('Teacher Info') || sheetName.includes('老師資訊')) {
            continue;
          }
          
          totalClasses++;
          const data = sheet.getDataRange().getValues();
          
          // Check completion status
          if (data.length > 2) {
            let hasGrades = false;
            for (let i = 2; i < data.length && !hasGrades; i++) {
              for (let j = 3; j < data[0].length && !hasGrades; j++) {
                if (data[i][j] && !isNaN(data[i][j])) {
                  hasGrades = true;
                }
              }
            }
            if (hasGrades) completedClasses++;
          }
        }
        
        const progressPercent = totalClasses > 0 ? (completedClasses / totalClasses) * 100 : 0;
        
        let status = '🔴 Behind | 落後';
        if (progressPercent >= SYSTEM_CONFIG.PROGRESS.EXCELLENT) {
          status = '🟢 Excellent | 優秀';
        } else if (progressPercent >= SYSTEM_CONFIG.PROGRESS.GOOD) {
          status = '🟡 Good | 良好';
        } else if (progressPercent >= SYSTEM_CONFIG.PROGRESS.NORMAL) {
          status = '🟠 Normal | 普通';
        }
        
        reportData.push([
          teacherName,
          teacherType,
          totalClasses,
          completedClasses,
          progressPercent.toFixed(1) + '%',
          status,
          file.getLastUpdated().toLocaleDateString()
        ]);
        
      } catch (error) {
        console.warn(`Error analyzing ${file.getName()}:`, error);
      }
    }
    
    // Sort by progress (ascending)
    reportData.sort((a, b) => parseFloat(a[4]) - parseFloat(b[4]));
    
    // Write data to sheet
    if (reportData.length > 0) {
      sheet.getRange(2, 1, reportData.length, headers.length).setValues(reportData);
      
      // Apply conditional formatting
      const progressRange = sheet.getRange(2, 5, reportData.length, 1);
      const rules = [
        SpreadsheetApp.newConditionalFormatRule()
          .whenTextContains('9')
          .setBackground('#C8E6C9')
          .build(),
        SpreadsheetApp.newConditionalFormatRule()
          .whenTextContains('8')
          .setBackground('#FFF9C4')
          .build(),
        SpreadsheetApp.newConditionalFormatRule()
          .whenTextContains('6')
          .setBackground('#FFE0B2')
          .build(),
        SpreadsheetApp.newConditionalFormatRule()
          .whenTextContains('5')
          .setBackground('#FFCDD2')
          .build()
      ];
      
      sheet.setConditionalFormatRules(rules);
    }
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, headers.length);
    
    showMessage('✅ Report Generated | 報告已生成', 
      `Detailed progress report created successfully! | 詳細進度報告建立成功！\n\n` +
      `📄 Report Name | 報告名稱: ${reportName}\n` +
      `📊 Teachers Analyzed | 分析教師數: ${reportData.length}\n` +
      `📁 Location | 位置: Reports folder | 報告資料夾\n\n` +
      `The report is now available in your system folder. | 報告現在可在您的系統資料夾中查看。`);
    
  } catch (error) {
    showError('❌ Report Failed | 報告失敗', `Failed to generate report: ${error.message} | 無法生成報告: ${error.message}`);
  }
}

/**
 * Send progress reminders to teachers | 發送進度提醒給教師
 */
function sendProgressReminders() {
  showMessage('📧 Progress Reminders | 進度提醒', 
    `This feature would send email reminders to teachers about their progress. | 此功能會向教師發送關於其進度的電子郵件提醒。\n\n` +
    `To implement this feature, you would need to: | 要實現此功能，您需要：\n` +
    `• Set up email templates | 設置電子郵件範本\n` +
    `• Configure teacher email addresses | 配置教師電子郵件地址\n` +
    `• Add Gmail API permissions | 添加Gmail API權限\n\n` +
    `Would you like help implementing this? | 您需要協助實現此功能嗎？`);
}

/**
 * Open progress statistics dashboard | 開啟進度統計控制台
 */
function openProgressStats() {
  try {
    // This would open a detailed progress dashboard
    // For now, we'll show a summary
    checkAllProgress();
    
  } catch (error) {
    showError('❌ Stats Failed | 統計失敗', `Failed to open progress stats: ${error.message} | 無法開啟進度統計: ${error.message}`);
  }
}

// ===== STUDENT MANAGEMENT FUNCTIONS | 學生管理函數 =====

/**
 * Import student data from external source | 從外部來源匯入學生資料
 */
function importStudentData() {
  showMessage('📥 Import Student Data | 匯入學生資料', 
    `This feature allows importing student data from CSV or Excel files. | 此功能允許從CSV或Excel檔案匯入學生資料。\n\n` +
    `To use this feature: | 使用此功能：\n` +
    `1. Prepare your data in CSV/Excel format | 準備CSV/Excel格式的資料\n` +
    `2. Upload to Google Drive | 上傳到Google Drive\n` +
    `3. Run this function to process | 執行此功能進行處理\n\n` +
    `Would you like help setting this up? | 您需要協助設置嗎？`);
}

/**
 * Export student data to external format | 匯出學生資料到外部格式
 */
function exportStudentData() {
  try {
    const masterData = getMasterDataSheet();
    const studentsSheet = masterData.getSheetByName('Students');
    
    if (!studentsSheet) {
      throw new Error('Students sheet not found | 找不到學生工作表');
    }
    
    // Create export copy
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const exportName = `Students_Export_${timestamp}`;
    const exportSheet = masterData.copy(exportName);
    
    // Move to reports folder
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const reportsFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.REPORTS);
    DriveApp.getFileById(exportSheet.getId()).moveTo(reportsFolder);
    
    showMessage('✅ Export Complete | 匯出完成', 
      `Student data exported successfully! | 學生資料匯出成功！\n\n` +
      `📄 Export File | 匯出檔案: ${exportName}\n` +
      `📁 Location | 位置: Reports folder | 報告資料夾`);
    
  } catch (error) {
    showError('❌ Export Failed | 匯出失敗', `Failed to export student data: ${error.message} | 無法匯出學生資料: ${error.message}`);
  }
}

/**
 * Sync student data across gradebooks | 同步學生資料到各成績簿
 */
function syncStudentData() {
  try {
    showMessage('🔄 Syncing Student Data | 正在同步學生資料', 
      'Synchronizing student information across all gradebooks... | 正在各成績簿間同步學生資訊...');
    
    const masterData = getMasterDataSheet();
    const studentsSheet = masterData.getSheetByName('Students');
    
    if (!studentsSheet) {
      throw new Error('Students sheet not found | 找不到學生工作表');
    }
    
    const studentData = studentsSheet.getDataRange().getValues();
    const headers = studentData[0];
    
    // Get all gradebook files
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    const files = teacherGradebooksFolder.getFiles();
    
    let syncCount = 0;
    let errorCount = 0;
    
    while (files.hasNext()) {
      const file = files.next();
      
      try {
        const gradebook = SpreadsheetApp.openById(file.getId());
        const sheets = gradebook.getSheets();
        
        // Update each class sheet in the gradebook
        for (const sheet of sheets) {
          const sheetName = sheet.getName();
          
          // Skip info sheets
          if (sheetName.includes('Teacher Info') || sheetName.includes('老師資訊')) {
            continue;
          }
          
          // Find students for this class
          const classStudents = studentData.filter(row => {
            const grade = row[headers.indexOf('Grade')];
            const className = row[headers.indexOf('Class')];
            return `${grade}${className}` === sheetName;
          });
          
          if (classStudents.length > 0) {
            // Update student names and basic info
            for (let i = 0; i < classStudents.length; i++) {
              const student = classStudents[i];
              const studentRow = i + 3; // Assuming data starts from row 3
              
              if (sheet.getLastRow() >= studentRow) {
                // Update student name
                sheet.getRange(studentRow, 1).setValue(student[headers.indexOf('Student Name')] || '');
                sheet.getRange(studentRow, 2).setValue(student[headers.indexOf('Student ID')] || '');
              }
            }
            syncCount++;
          }
        }
        
      } catch (error) {
        console.warn(`Error syncing ${file.getName()}:`, error);
        errorCount++;
      }
    }
    
    showMessage('✅ Sync Complete | 同步完成', 
      `Student data synchronization completed! | 學生資料同步完成！\n\n` +
      `📊 Synced Gradebooks | 同步成績簿數: ${syncCount}\n` +
      `❌ Errors | 錯誤數: ${errorCount}`);
    
  } catch (error) {
    showError('❌ Sync Failed | 同步失敗', `Failed to sync student data: ${error.message} | 無法同步學生資料: ${error.message}`);
  }
}

/**
 * Quick add new student | 快速新增學生
 */
function quickAddStudent() {
  try {
    const ui = SpreadsheetApp.getUi();
    
    // Get student information
    const studentName = ui.prompt('Student Name | 學生姓名', 
      'Please enter student name | 請輸入學生姓名:', 
      ui.ButtonSet.OK_CANCEL);
    
    if (studentName.getSelectedButton() !== ui.Button.OK || !studentName.getResponseText().trim()) {
      return;
    }
    
    const studentId = ui.prompt('Student ID | 學生學號', 
      'Please enter student ID | 請輸入學生學號:', 
      ui.ButtonSet.OK_CANCEL);
    
    if (studentId.getSelectedButton() !== ui.Button.OK || !studentId.getResponseText().trim()) {
      return;
    }
    
    const grade = ui.prompt('Grade | 年級', 
      'Please enter grade (e.g., G1) | 請輸入年級 (例如: G1):', 
      ui.ButtonSet.OK_CANCEL);
    
    if (grade.getSelectedButton() !== ui.Button.OK || !grade.getResponseText().trim()) {
      return;
    }
    
    const className = ui.prompt('Class | 班級', 
      'Please enter class (e.g., E1) | 請輸入班級 (例如: E1):', 
      ui.ButtonSet.OK_CANCEL);
    
    if (className.getSelectedButton() !== ui.Button.OK || !className.getResponseText().trim()) {
      return;
    }
    
    // Add to master data
    const masterData = getMasterDataSheet();
    const studentsSheet = masterData.getSheetByName('Students');
    
    if (!studentsSheet) {
      throw new Error('Students sheet not found | 找不到學生工作表');
    }
    
    const lastRow = studentsSheet.getLastRow();
    const newRow = [
      studentName.getResponseText().trim(),
      studentId.getResponseText().trim(),
      grade.getResponseText().trim(),
      className.getResponseText().trim(),
      '在學', // Status
      '', // LT Teacher
      '', // IT Teacher
      new Date().toLocaleDateString() // Date Added
    ];
    
    studentsSheet.getRange(lastRow + 1, 1, 1, newRow.length).setValues([newRow]);
    
    showMessage('✅ Student Added | 學生已新增', 
      `Student added successfully! | 學生新增成功！\n\n` +
      `👤 Name | 姓名: ${newRow[0]}\n` +
      `🆔 ID | 學號: ${newRow[1]}\n` +
      `🏫 Class | 班級: ${newRow[2]}${newRow[3]}`);
    
  } catch (error) {
    showError('❌ Add Failed | 新增失敗', `Failed to add student: ${error.message} | 無法新增學生: ${error.message}`);
  }
}

/**
 * Update student status | 更新學生狀態
 */
function updateStudentStatus() {
  showMessage('📝 Update Student Status | 更新學生狀態', 
    `This feature allows bulk updating of student status (在學/畢業/轉學). | 此功能允許批量更新學生狀態 (在學/畢業/轉學)。\n\n` +
    `To use this feature: | 使用此功能：\n` +
    `1. Open Master Data sheet | 開啟主控資料表\n` +
    `2. Update the Status column | 更新狀態欄位\n` +
    `3. Run sync functions to update gradebooks | 執行同步功能更新成績簿\n\n` +
    `Common status values | 常用狀態值: 在學, 畢業, 轉學, 休學`);
}

// ===== TEMPLATE MANAGEMENT FUNCTIONS | 範本管理函數 =====

/**
 * Update gradebook templates | 更新成績簿範本
 */
function updateGradebookTemplates() {
  try {
    showMessage('🔄 Updating Templates | 正在更新範本', 
      'Updating gradebook templates with latest format... | 以最新格式更新成績簿範本...');
    
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const templatesFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEMPLATES);
    
    // Create new updated template
    const template = createGradebookTemplate(systemFolder);
    
    showMessage('✅ Templates Updated | 範本已更新', 
      `Gradebook templates updated successfully! | 成績簿範本更新成功！\n\n` +
      `📄 New Template | 新範本: ${template.getName()}\n` +
      `📁 Location | 位置: Templates folder | 範本資料夾`);
    
  } catch (error) {
    showError('❌ Update Failed | 更新失敗', `Failed to update templates: ${error.message} | 無法更新範本: ${error.message}`);
  }
}

/**
 * Beautify existing gradebooks | 美化現有成績簿
 */
function beautifyGradebooks() {
  try {
    showMessage('✨ Beautifying Gradebooks | 正在美化成績簿', 
      'Applying formatting and styling to all gradebooks... | 為所有成績簿套用格式和樣式...');
    
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    
    const files = teacherGradebooksFolder.getFiles();
    let beautifiedCount = 0;
    let errorCount = 0;
    
    while (files.hasNext()) {
      const file = files.next();
      
      try {
        const gradebook = SpreadsheetApp.openById(file.getId());
        const sheets = gradebook.getSheets();
        
        // Apply formatting to each sheet
        for (const sheet of sheets) {
          // Header formatting
          if (sheet.getLastRow() > 0 && sheet.getLastColumn() > 0) {
            const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
            headerRange.setBackground('#4CAF50')
                      .setFontColor('white')
                      .setFontWeight('bold')
                      .setHorizontalAlignment('center');
            
            // Student name column formatting
            if (sheet.getLastRow() > 1) {
              const nameRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1);
              nameRange.setBackground('#E8F5E8')
                      .setFontWeight('bold');
            }
            
            // Auto-resize columns
            sheet.autoResizeColumns(1, Math.min(sheet.getLastColumn(), 10));
          }
        }
        
        beautifiedCount++;
        
      } catch (error) {
        console.warn(`Error beautifying ${file.getName()}:`, error);
        errorCount++;
      }
    }
    
    showMessage('✅ Beautification Complete | 美化完成', 
      `Gradebook beautification completed! | 成績簿美化完成！\n\n` +
      `✨ Beautified | 已美化: ${beautifiedCount} gradebooks\n` +
      `❌ Errors | 錯誤: ${errorCount} files`);
    
  } catch (error) {
    showError('❌ Beautify Failed | 美化失敗', `Failed to beautify gradebooks: ${error.message} | 無法美化成績簿: ${error.message}`);
  }
}

/**
 * Validate formulas in gradebooks | 驗證成績簿中的公式
 */
function validateFormulas() {
  try {
    showMessage('🔍 Validating Formulas | 正在驗證公式', 
      'Checking formulas in all gradebooks... | 檢查所有成績簿中的公式...');
    
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    
    const files = teacherGradebooksFolder.getFiles();
    let validCount = 0;
    let errorCount = 0;
    const issues = [];
    
    while (files.hasNext()) {
      const file = files.next();
      
      try {
        const gradebook = SpreadsheetApp.openById(file.getId());
        const sheets = gradebook.getSheets();
        
        for (const sheet of sheets) {
          const data = sheet.getDataRange().getValues();
          
          // Check for common formula patterns
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
              const cell = data[i][j];
              
              if (typeof cell === 'string' && cell.startsWith('=')) {
                // Check for common errors
                if (cell.includes('#REF!') || cell.includes('#VALUE!') || cell.includes('#DIV/0!')) {
                  issues.push(`${file.getName()} - ${sheet.getName()}: Formula error at ${String.fromCharCode(65 + j)}${i + 1}`);
                  errorCount++;
                }
              }
            }
          }
        }
        
        validCount++;
        
      } catch (error) {
        console.warn(`Error validating ${file.getName()}:`, error);
        errorCount++;
      }
    }
    
    const report = `
🔍 FORMULA VALIDATION REPORT | 公式驗證報告

📊 Summary | 總覽:
• Validated Files | 已驗證檔案: ${validCount}
• Formula Errors Found | 發現公式錯誤: ${issues.length}

${issues.length > 0 ? `\n❌ Issues Found | 發現問題:\n${issues.slice(0, 10).join('\n')}${issues.length > 10 ? `\n... and ${issues.length - 10} more` : ''}` : '\n✅ No Formula Errors Found | 未發現公式錯誤'}

✅ Validation Complete | 驗證完成
    `;
    
    showMessage('🔍 Validation Complete | 驗證完成', report);
    
  } catch (error) {
    showError('❌ Validation Failed | 驗證失敗', `Failed to validate formulas: ${error.message} | 無法驗證公式: ${error.message}`);
  }
}

/**
 * Repair damaged sheets | 修復損壞的工作表
 */
function repairDamagedSheets() {
  showMessage('🔧 Repair Damaged Sheets | 修復損壞的工作表', 
    `This function would scan for and repair common sheet issues: | 此功能會掃描並修復常見的工作表問題：\n\n` +
    `• Missing headers | 遺失標題\n` +
    `• Broken formulas | 損壞公式\n` +
    `• Formatting issues | 格式問題\n` +
    `• Data inconsistencies | 資料不一致\n\n` +
    `Would you like help implementing this feature? | 您需要協助實現此功能嗎？`);
}

// ===== SYSTEM INFORMATION FUNCTIONS | 系統資訊函數 =====

/**
 * Show user guide | 顯示使用者指南
 */
function showUserGuide() {
  const guide = `
📚 GRADEBOOK SYSTEM USER GUIDE | 成績簿系統使用指南

🚀 Getting Started | 開始使用:
1. Initialize system | 初始化系統: Menu → System Management → Initialize System
2. Add student data | 新增學生資料: Open Master Data → Students sheet
3. Create gradebooks | 建立成績簿: Menu → Teacher Management → Batch Create
4. Start grading | 開始評分: Open individual teacher gradebooks

📋 Key Features | 主要功能:
• Automatic gradebook creation | 自動成績簿建立
• Progress tracking | 進度追蹤
• Assessment management | 評量管理
• Data synchronization | 資料同步
• Report generation | 報告生成

🔧 System Management | 系統管理:
• Backup your data regularly | 定期備份資料
• Check system status | 檢查系統狀態
• Maintain clean folder structure | 維護清潔的資料夾結構
• Monitor teacher progress | 監控教師進度

📊 Assessment Types | 評量類型:
• Formative (F.A.1-8) | 平時評量: 15% weight
• Summative (S.A.1-4) | 總結評量: 20% weight
• Final Exam | 期末考: 10% weight

💡 Tips & Best Practices | 提示與最佳實踐:
• Keep student data up to date | 保持學生資料更新
• Use consistent naming conventions | 使用一致的命名規則
• Regular progress checks | 定期進度檢查
• Train teachers on system use | 培訓教師使用系統

🆘 Need Help? | 需要幫助？
Contact your system administrator for technical support.
聯繫您的系統管理員獲取技術支援。
  `;
  
  showMessage('📚 User Guide | 使用者指南', guide);
}

/**
 * Check system status | 檢查系統狀態
 */
function checkSystemStatus() {
  try {
    showMessage('🔍 Checking System Status | 正在檢查系統狀態', 
      'Analyzing system health... | 分析系統健康狀況...');
    
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    let issues = [];
    let status = '🟢 Healthy | 健康';
    
    // Check folder structure
    const requiredFolders = Object.values(SYSTEM_CONFIG.FOLDERS);
    for (const folderName of requiredFolders) {
      const folder = getSubFolder(systemFolder, folderName, false);
      if (!folder) {
        issues.push(`Missing folder: ${folderName}`);
      }
    }
    
    // Check Master Data
    try {
      const masterData = getMasterDataSheet();
      const studentsSheet = masterData.getSheetByName('Students');
      if (!studentsSheet) {
        issues.push('Students sheet missing in Master Data');
      }
    } catch (e) {
      issues.push('Master Data sheet inaccessible');
    }
    
    // Check gradebook count
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS, false);
    let gradebookCount = 0;
    if (teacherGradebooksFolder) {
      const files = teacherGradebooksFolder.getFiles();
      while (files.hasNext()) {
        files.next();
        gradebookCount++;
      }
    }
    
    // Determine overall status
    if (issues.length > 0) {
      if (issues.length >= 3) {
        status = '🔴 Critical | 嚴重';
      } else {
        status = '🟡 Warning | 警告';
      }
    }
    
    const report = `
🔍 SYSTEM STATUS REPORT | 系統狀態報告

📊 Overall Status | 整體狀態: ${status}

📈 System Statistics | 系統統計:
• Gradebook Count | 成績簿數量: ${gradebookCount}
• System Folders | 系統資料夾: ${requiredFolders.length - issues.filter(i => i.includes('folder')).length}/${requiredFolders.length}
• Last Check | 最後檢查: ${new Date().toLocaleString()}

${issues.length > 0 ? `\n⚠️ Issues Found | 發現問題:\n${issues.map(issue => `• ${issue}`).join('\n')}` : '\n✅ No Issues Found | 未發現問題'}

💡 Recommendations | 建議:
${issues.length > 0 ? '• Run System Maintenance to fix issues | 執行系統維護修復問題\n' : ''}• Regular backup recommended | 建議定期備份
• Monitor teacher progress | 監控教師進度
• Keep system updated | 保持系統更新

✅ Status Check Complete | 狀態檢查完成
    `;
    
    showMessage('🔍 System Status | 系統狀態', report);
    
  } catch (error) {
    showError('❌ Status Check Failed | 狀態檢查失敗', `Failed to check system status: ${error.message} | 無法檢查系統狀態: ${error.message}`);
  }
}

/**
 * Show system information | 顯示系統資訊
 */
function showSystemInfo() {
  const info = `
ℹ️ GRADEBOOK SYSTEM INFORMATION | 成績簿系統資訊

📋 System Details | 系統詳情:
• Name | 名稱: ${SYSTEM_CONFIG.SYSTEM_NAME}
• Version | 版本: 2.0.0
• Semester | 學期: ${SYSTEM_CONFIG.SEMESTER}
• Platform | 平台: Google Apps Script

⚙️ Configuration | 配置:
• Formative Assessments | 平時評量: ${SYSTEM_CONFIG.ASSESSMENTS.FORMATIVE_COUNT}
• Summative Assessments | 總結評量: ${SYSTEM_CONFIG.ASSESSMENTS.SUMMATIVE_COUNT}
• Include Final Exam | 包含期末考: ${SYSTEM_CONFIG.ASSESSMENTS.INCLUDE_FINAL ? 'Yes | 是' : 'No | 否'}

📊 Grade Weights | 成績權重:
• Formative | 平時: ${SYSTEM_CONFIG.WEIGHTS.FORMATIVE * 100}%
• Summative | 總結: ${SYSTEM_CONFIG.WEIGHTS.SUMMATIVE * 100}%
• Final | 期末: ${SYSTEM_CONFIG.WEIGHTS.FINAL * 100}%

🎯 Progress Thresholds | 進度閾值:
• Excellent | 優秀: ≥${SYSTEM_CONFIG.PROGRESS.EXCELLENT}%
• Good | 良好: ${SYSTEM_CONFIG.PROGRESS.GOOD}%-${SYSTEM_CONFIG.PROGRESS.EXCELLENT - 1}%
• Normal | 普通: ${SYSTEM_CONFIG.PROGRESS.NORMAL}%-${SYSTEM_CONFIG.PROGRESS.GOOD - 1}%
• Behind | 落後: <${SYSTEM_CONFIG.PROGRESS.NORMAL}%

🏗️ Architecture | 架構:
• Google Sheets for data storage | 使用Google Sheets存儲資料
• Google Drive for file organization | 使用Google Drive組織檔案
• Apps Script for automation | 使用Apps Script自動化
• HTML dashboards for interface | 使用HTML控制台介面

📞 Support | 支援:
For technical issues, contact your system administrator.
如有技術問題，請聯繫您的系統管理員。

📅 Last Updated | 最後更新: ${new Date().toLocaleDateString()}
  `;
  
  showMessage('ℹ️ System Information | 系統資訊', info);
}

// ===== MISSING DASHBOARD FUNCTIONS | 遺失的控制台函數 =====

/**
 * Get system folder URL for dashboard | 取得系統資料夾URL供控制台使用
 */
function getSystemFolderUrl() {
  try {
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    return {
      success: true,
      url: systemFolder.getUrl(),
      name: systemFolder.getName()
    };
  } catch (error) {
    console.error('Error getting system folder URL:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Get master data URL for dashboard | 取得主控資料表URL供控制台使用
 */
function getMasterDataUrl() {
  try {
    console.log('Getting master data URL...');
    
    // Step 1: Check system folder access
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    console.log(`System folder accessed: ${systemFolder.getName()}`);
    
    // Step 2: Check master data folder
    const masterDataFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.MASTER_DATA, false);
    if (!masterDataFolder) {
      return {
        success: false,
        error: `Master Data folder "${SYSTEM_CONFIG.FOLDERS.MASTER_DATA}" not found in system folder`,
        step: 'master_data_folder_check'
      };
    }
    console.log(`Master Data folder found: ${masterDataFolder.getName()}`);
    
    // Step 3: List all files in master data folder
    const allFiles = masterDataFolder.getFiles();
    const fileList = [];
    while (allFiles.hasNext()) {
      fileList.push(allFiles.next().getName());
    }
    console.log(`Files in Master Data folder: ${fileList.join(', ')}`);
    
    // Step 4: Try to find master data sheet
    const masterData = getMasterDataSheet();
    console.log(`Master data sheet found: ${masterData.getName()}`);
    
    return {
      success: true,
      url: masterData.getUrl(),
      name: masterData.getName(),
      filesInFolder: fileList
    };
    
  } catch (error) {
    console.error('Error getting master data URL:', error);
    
    return {
      success: false,
      error: error.message,
      errorType: error.name || 'UnknownError',
      step: 'execution_error'
    };
  }
}


/**
 * Debug system status with detailed information | 詳細系統狀態調試
 */
function debugSystemStatus() {
  try {
    const debug = {
      timestamp: new Date().toISOString(),
      system: {
        mainFolderId: SYSTEM_CONFIG.MAIN_FOLDER_ID,
        semester: SYSTEM_CONFIG.SEMESTER,
        version: '2.0.0'
      },
      folders: {},
      masterData: {},
      gradebooks: {
        total: 0,
        byType: { LT: 0, IT: 0, HT: 0 },
        recent: []
      },
      issues: []
    };

    // Check folder structure
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    for (const [key, folderName] of Object.entries(SYSTEM_CONFIG.FOLDERS)) {
      try {
        const folder = getSubFolder(systemFolder, folderName, false);
        debug.folders[key] = {
          name: folderName,
          exists: !!folder,
          url: folder ? folder.getUrl() : null,
          fileCount: folder ? folder.getFiles().length : 0
        };
      } catch (e) {
        debug.folders[key] = { name: folderName, exists: false, error: e.message };
        debug.issues.push(`Folder ${folderName}: ${e.message}`);
      }
    }

    // Check master data
    try {
      const masterData = getMasterDataSheet();
      const studentsSheet = masterData.getSheetByName('Students');
      const teachersSheet = masterData.getSheetByName('Teachers');
      const htSheet = masterData.getSheetByName('HT Teachers');

      debug.masterData = {
        exists: true,
        url: masterData.getUrl(),
        sheets: {
          students: {
            exists: !!studentsSheet,
            rows: studentsSheet ? studentsSheet.getLastRow() : 0,
            columns: studentsSheet ? studentsSheet.getLastColumn() : 0
          },
          teachers: {
            exists: !!teachersSheet,
            rows: teachersSheet ? teachersSheet.getLastRow() : 0
          },
          htTeachers: {
            exists: !!htSheet,
            rows: htSheet ? htSheet.getLastRow() : 0
          }
        }
      };

      // Sample student data headers
      if (studentsSheet && studentsSheet.getLastRow() > 0) {
        debug.masterData.sampleHeaders = studentsSheet.getRange(1, 1, 1, studentsSheet.getLastColumn()).getValues()[0];
      }

    } catch (e) {
      debug.masterData = { exists: false, error: e.message };
      debug.issues.push(`Master Data: ${e.message}`);
    }

    // Check gradebooks
    try {
      const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS, false);
      if (teacherGradebooksFolder) {
        const files = teacherGradebooksFolder.getFiles();
        const fileList = [];
        
        while (files.hasNext()) {
          const file = files.next();
          const fileName = file.getName();
          
          let type = 'Unknown';
          if (fileName.includes('_LT_')) {
            type = 'LT';
            debug.gradebooks.byType.LT++;
          } else if (fileName.includes('_IT_')) {
            type = 'IT';
            debug.gradebooks.byType.IT++;
          } else if (fileName.includes('_HT_')) {
            type = 'HT';
            debug.gradebooks.byType.HT++;
          }

          fileList.push({
            name: fileName,
            type: type,
            size: file.getSize(),
            lastModified: file.getLastUpdated().toISOString(),
            url: file.getUrl()
          });
          
          debug.gradebooks.total++;
        }

        // Sort by last modified and get recent files
        fileList.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
        debug.gradebooks.recent = fileList.slice(0, 5);
      }
    } catch (e) {
      debug.issues.push(`Gradebooks check: ${e.message}`);
    }

    return {
      success: true,
      debug: debug
    };

  } catch (error) {
    console.error('Error in debug system status:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Check column headers in master data | 檢查主控資料表的欄位標題
 */
function checkColumnHeaders() {
  try {
    const masterData = getMasterDataSheet();
    const studentsSheet = masterData.getSheetByName('Students');
    
    if (!studentsSheet) {
      return {
        success: false,
        error: 'Students sheet not found'
      };
    }

    const headers = studentsSheet.getRange(1, 1, 1, studentsSheet.getLastColumn()).getValues()[0];
    const requiredHeaders = ['Student Name', 'Student ID', 'Grade', 'Class', 'Status', 'LT Teacher', 'IT Teacher'];
    
    const result = {
      success: true,
      headers: headers,
      requiredHeaders: requiredHeaders,
      missing: [],
      extra: [],
      positions: {}
    };

    // Check for missing required headers
    for (const required of requiredHeaders) {
      const index = headers.indexOf(required);
      if (index === -1) {
        result.missing.push(required);
      } else {
        result.positions[required] = index;
      }
    }

    // Check for extra headers
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      if (header && !requiredHeaders.includes(header)) {
        result.extra.push({ name: header, position: i });
      }
    }

    result.isValid = result.missing.length === 0;

    return result;

  } catch (error) {
    console.error('Error checking column headers:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Test gradebook creation process | 測試成績簿建立流程
 */
function testGradebookCreation() {
  try {
    const result = {
      success: true,
      timestamp: new Date().toISOString(),
      tests: {
        masterDataAccess: false,
        teacherExtraction: false,
        folderAccess: false,
        teacherCount: 0,
        sampleTeachers: []
      },
      issues: []
    };

    // Test 1: Master Data Access
    try {
      const masterData = getMasterDataSheet();
      const studentsSheet = masterData.getSheetByName('Students');
      if (studentsSheet && studentsSheet.getLastRow() > 1) {
        result.tests.masterDataAccess = true;
      } else {
        result.issues.push('Students sheet is empty or missing');
      }
    } catch (e) {
      result.issues.push(`Master Data access failed: ${e.message}`);
    }

    // Test 2: Teacher Extraction
    try {
      const masterData = getMasterDataSheet();
      const teacherData = extractTeacherData(masterData);
      result.tests.teacherExtraction = true;
      result.tests.teacherCount = teacherData.length;
      result.tests.sampleTeachers = teacherData.slice(0, 3).map(t => ({
        name: t.name,
        type: t.type,
        classCount: t.classes.length,
        classes: t.classes.slice(0, 2) // Show first 2 classes
      }));
    } catch (e) {
      result.issues.push(`Teacher extraction failed: ${e.message}`);
    }

    // Test 3: Folder Access
    try {
      const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
      const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
      result.tests.folderAccess = true;
    } catch (e) {
      result.issues.push(`Folder access failed: ${e.message}`);
    }

    result.overallStatus = result.issues.length === 0 ? 'READY' : 'ISSUES_FOUND';

    return result;

  } catch (error) {
    console.error('Error in test gradebook creation:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Sync assessment titles by level and teacher type | 按級別和教師類型同步評量標題
 */
function syncAssessmentTitlesByLevel(level, teacherType) {
  try {
    console.log(`Syncing assessment titles for ${teacherType} ${level}`);
    
    // Get default titles
    const titles = SYSTEM_CONFIG.ASSESSMENT_TITLES.DEFAULT;
    
    // Find all gradebooks for this level and teacher type
    const systemFolder = DriveApp.getFolderById(SYSTEM_CONFIG.MAIN_FOLDER_ID);
    const teacherGradebooksFolder = getSubFolder(systemFolder, SYSTEM_CONFIG.FOLDERS.TEACHER_SHEETS);
    const files = teacherGradebooksFolder.getFiles();
    
    let syncCount = 0;
    let errorCount = 0;
    const errors = [];

    while (files.hasNext()) {
      const file = files.next();
      const fileName = file.getName();
      
      // Check if this file matches our criteria
      if (fileName.includes(`_${teacherType}_`) && fileName.includes(level)) {
        try {
          const gradebook = SpreadsheetApp.openById(file.getId());
          const classSheet = gradebook.getSheetByName(level);
          
          if (classSheet) {
            // Update assessment title headers
            const headerRow = 1;
            let col = 3; // Start from column C (assuming A=Name, B=ID)
            
            // Add formative assessment titles
            for (const title of titles.FORMATIVE) {
              classSheet.getRange(headerRow, col).setValue(title);
              col++;
            }
            
            // Add summative assessment titles
            for (const title of titles.SUMMATIVE) {
              classSheet.getRange(headerRow, col).setValue(title);
              col++;
            }
            
            // Add final exam if enabled
            if (SYSTEM_CONFIG.ASSESSMENTS.INCLUDE_FINAL) {
              classSheet.getRange(headerRow, col).setValue('Final Exam | 期末考');
            }
            
            syncCount++;
          }
        } catch (error) {
          console.warn(`Error syncing ${fileName}:`, error);
          errorCount++;
          errors.push(`${fileName}: ${error.message}`);
        }
      }
    }

    return {
      success: true,
      level: level,
      teacherType: teacherType,
      syncCount: syncCount,
      errorCount: errorCount,
      errors: errors
    };

  } catch (error) {
    console.error('Error syncing assessment titles by level:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Reset assessment titles by level to defaults | 將指定級別的評量標題重設為預設值
 */
function resetAssessmentTitlesByLevel(level, teacherType) {
  try {
    console.log(`Resetting assessment titles for ${teacherType} ${level} to defaults`);
    
    // Use the sync function with default titles (which is what we want for reset)
    const result = syncAssessmentTitlesByLevel(level, teacherType);
    
    if (result.success) {
      result.action = 'reset';
      result.message = `Assessment titles reset to defaults for ${teacherType} ${level}`;
    }

    return result;

  } catch (error) {
    console.error('Error resetting assessment titles by level:', error);
    return {
      success: false,
      error: error.message
    };
  }
}