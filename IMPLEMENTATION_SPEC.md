# Progress Monitoring System - Implementation Specification
# 進度監控系統 - 實施規格書

## 📋 Confirmed Requirements | 確認需求

### 🎯 Core Features | 核心功能
1. **Progress Checking Logic | 進度檢查邏輯**
   - 空白格子 = 未完成
   - 0分 = 未完成 (不計算平均)
   - "N" = 缺考 (不計算平均，但視為已處理)
   - 任何數字(>0) = 已完成

2. **Progress Standards Setting | 進度標準設定**
   - 管理者可設定檢查標準
   - 例如：需完成 3次F.A. + 1次S.A.
   - 支援彈性的評量組合要求

3. **Batch Progress Checking | 批次進度檢查**
   - 管理者一鍵檢查所有老師進度
   - 系統自動分析每位老師的所有班級
   - 即時產生進度報告

4. **Comprehensive Reporting | 全面報告**
   - 每位老師的整體進度百分比
   - 每個班級的詳細進度狀況
   - **落後班級必須特別標示**

---

## 🏗️ Implementation Architecture | 實施架構

### 1. Progress Analysis Engine | 進度分析引擎

#### 1.1 Core Data Structure | 核心資料結構
```javascript
// Progress Standards | 進度標準
const progressStandards = {
  formativeRequired: 3,        // 需完成的F.A.數量
  summativeRequired: 1,        // 需完成的S.A.數量
  finalRequired: 0,            // 需完成的期末考數量
  checkDate: new Date(),       // 檢查日期
  description: "Mid-term Progress Check" // 檢查描述
};

// Individual Class Progress | 個別班級進度
const classProgress = {
  className: "G1 Achievers",
  teacherName: "Ms. Smith",
  teacherType: "LT",
  totalStudents: 25,
  assessmentProgress: {
    formative: {
      required: 3,
      completed: 2,
      completionRate: 66.7,     // 2/3 = 66.7%
      details: [
        { assessment: "F.A.1", completed: true, studentsWithGrades: 24 },
        { assessment: "F.A.2", completed: true, studentsWithGrades: 23 },
        { assessment: "F.A.3", completed: false, studentsWithGrades: 0 }
      ]
    },
    summative: {
      required: 1,
      completed: 0,
      completionRate: 0,
      details: [
        { assessment: "S.A.1", completed: false, studentsWithGrades: 0 }
      ]
    }
  },
  overallProgress: 50,          // (2+0)/(3+1) = 50%
  status: "behind",             // behind | normal | good | excellent
  studentsWithIncompleteGrades: 5
};

// Teacher Summary | 教師摘要
const teacherSummary = {
  teacherName: "Ms. Smith",
  teacherType: "LT",
  totalClasses: 3,
  classesOnTrack: 1,
  classesBehind: 2,
  overallProgress: 45.5,
  status: "behind",
  classes: [classProgress, ...]
};
```

#### 1.2 Progress Calculation Logic | 進度計算邏輯
```javascript
function analyzeClassProgress(classSheet, standards) {
  const data = classSheet.getDataRange().getValues();
  const headers = data[0];
  
  // Find assessment columns | 找到評量欄位
  const faColumns = findFormativeColumns(headers);
  const saColumns = findSummativeColumns(headers);
  const finalColumn = findFinalColumn(headers);
  
  // Analyze each assessment type | 分析每種評量類型
  const formativeProgress = analyzeAssessmentGroup(
    data, faColumns, standards.formativeRequired
  );
  const summativeProgress = analyzeAssessmentGroup(
    data, saColumns, standards.summativeRequired
  );
  
  // Calculate overall progress | 計算整體進度
  const totalRequired = standards.formativeRequired + standards.summativeRequired;
  const totalCompleted = formativeProgress.completed + summativeProgress.completed;
  const overallProgress = (totalCompleted / totalRequired) * 100;
  
  return {
    className: classSheet.getName(),
    formativeProgress,
    summativeProgress,
    overallProgress,
    status: determineProgressStatus(overallProgress)
  };
}

function analyzeAssessmentGroup(data, columns, required) {
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
    completionRate: (completedAssessments / required) * 100,
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
```

### 2. Progress Standards Management | 進度標準管理

#### 2.1 Standards Configuration Interface | 標準配置介面
```javascript
function createProgressStandardsDialog() {
  const html = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h2>📊 Set Progress Check Standards | 設定進度檢查標準</h2>
      
      <div style="margin: 20px 0;">
        <label>Check Description | 檢查描述:</label><br>
        <input type="text" id="checkDescription" value="Progress Check - Week 8" 
               style="width: 300px; padding: 5px;">
      </div>
      
      <div style="margin: 20px 0;">
        <label>Required Formative Assessments | 需完成平時評量:</label><br>
        <select id="formativeRequired" style="padding: 5px;">
          ${generateOptions(0, 8, 3)}
        </select>
      </div>
      
      <div style="margin: 20px 0;">
        <label>Required Summative Assessments | 需完成總結評量:</label><br>
        <select id="summativeRequired" style="padding: 5px;">
          ${generateOptions(0, 4, 1)}
        </select>
      </div>
      
      <div style="margin: 20px 0;">
        <button onclick="executeProgressCheck()" 
                style="background: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px;">
          🚀 Start Progress Check | 開始進度檢查
        </button>
        <button onclick="google.script.host.close()" 
                style="background: #999; color: white; padding: 10px 20px; border: none; border-radius: 5px; margin-left: 10px;">
          Cancel | 取消
        </button>
      </div>
    </div>
  `;
  
  const htmlOutput = HtmlService.createHtml(html)
    .setWidth(500)
    .setHeight(300);
  
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Progress Check Standards');
}
```

### 3. Batch Progress Checker | 批次進度檢查器

#### 3.1 Main Progress Check Function | 主要進度檢查函數
```javascript
function batchCheckAllProgress(standards) {
  try {
    const startTime = new Date();
    
    // Get all teacher gradebooks | 取得所有教師成績簿
    const teacherGradebooks = getAllTeacherGradebooks();
    const progressResults = [];
    
    let totalClasses = 0;
    let classesOnTrack = 0;
    let classesBehind = 0;
    
    // Check each teacher's progress | 檢查每位教師的進度
    for (const gradebook of teacherGradebooks) {
      const teacherProgress = analyzeTeacherProgress(gradebook, standards);
      progressResults.push(teacherProgress);
      
      totalClasses += teacherProgress.totalClasses;
      classesOnTrack += teacherProgress.classesOnTrack;
      classesBehind += teacherProgress.classesBehind;
    }
    
    // Generate summary report | 生成摘要報告
    const systemSummary = {
      checkDate: startTime,
      standards: standards,
      totalTeachers: teacherGradebooks.length,
      totalClasses: totalClasses,
      classesOnTrack: classesOnTrack,
      classesBehind: classesBehind,
      systemProgress: (classesOnTrack / totalClasses) * 100,
      teacherResults: progressResults
    };
    
    // Save and display report | 儲存並顯示報告
    const reportUrl = saveProgressReport(systemSummary);
    displayProgressResults(systemSummary);
    
    return {
      success: true,
      summary: systemSummary,
      reportUrl: reportUrl,
      duration: Math.round((new Date() - startTime) / 1000)
    };
    
  } catch (error) {
    console.error('Progress check failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

function analyzeTeacherProgress(gradebook, standards) {
  const teacherInfo = getTeacherInfo(gradebook);
  const classSheets = getClassSheets(gradebook);
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
  
  return {
    teacherName: teacherInfo.name,
    teacherType: teacherInfo.type,
    totalClasses: classSheets.length,
    classesOnTrack: classesOnTrack,
    classesBehind: classesBehind,
    overallProgress: totalProgress / classSheets.length,
    status: determineTeacherStatus(classesOnTrack, classesBehind),
    classes: classResults
  };
}
```

### 4. Progress Report System | 進度報告系統

#### 4.1 Report Generation | 報告生成
```javascript
function generateProgressReport(systemSummary) {
  const reportSheet = createProgressReportSheet(systemSummary.checkDate);
  
  // 1. System Overview | 系統概覽
  addSystemOverview(reportSheet, systemSummary);
  
  // 2. Behind Classes Alert | 落後班級警示
  addBehindClassesAlert(reportSheet, systemSummary);
  
  // 3. Teacher Summary | 教師摘要
  addTeacherSummary(reportSheet, systemSummary.teacherResults);
  
  // 4. Detailed Class Results | 詳細班級結果
  addDetailedClassResults(reportSheet, systemSummary.teacherResults);
  
  return reportSheet.getUrl();
}

function addBehindClassesAlert(sheet, summary) {
  let currentRow = 10; // Start after overview
  
  // Find all behind classes | 找出所有落後班級
  const behindClasses = [];
  summary.teacherResults.forEach(teacher => {
    teacher.classes.forEach(classData => {
      if (classData.status === 'behind') {
        behindClasses.push({
          teacher: teacher.teacherName,
          teacherType: teacher.teacherType,
          class: classData.className,
          progress: classData.overallProgress,
          issues: identifyProgressIssues(classData)
        });
      }
    });
  });
  
  if (behindClasses.length > 0) {
    // Alert header | 警示標題
    sheet.getRange(currentRow, 1, 1, 6).merge()
      .setValue('🚨 CLASSES BEHIND SCHEDULE | 進度落後班級')
      .setBackground('#ffebee')
      .setFontWeight('bold')
      .setFontSize(14);
    
    currentRow += 2;
    
    // Table headers | 表格標題
    const headers = ['Teacher | 教師', 'Type | 類型', 'Class | 班級', 'Progress | 進度', 'Issues | 問題'];
    sheet.getRange(currentRow, 1, 1, headers.length).setValues([headers])
      .setBackground('#f44336')
      .setFontColor('white')
      .setFontWeight('bold');
    
    currentRow++;
    
    // Behind classes data | 落後班級資料
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

function identifyProgressIssues(classData) {
  const issues = [];
  
  if (classData.formativeProgress.completed < classData.formativeProgress.required) {
    const missing = classData.formativeProgress.required - classData.formativeProgress.completed;
    issues.push(`Missing ${missing} F.A.`);
  }
  
  if (classData.summativeProgress.completed < classData.summativeProgress.required) {
    const missing = classData.summativeProgress.required - classData.summativeProgress.completed;
    issues.push(`Missing ${missing} S.A.`);
  }
  
  if (classData.studentsWithIncompleteGrades > 0) {
    issues.push(`${classData.studentsWithIncompleteGrades} students incomplete`);
  }
  
  return issues.length > 0 ? issues : ['General delay'];
}
```

### 5. Dashboard Integration | 儀表板整合

#### 5.1 Progress Check Interface | 進度檢查介面
```javascript
// Add to dashboard.html
function addProgressCheckInterface() {
  return `
    <div class="card progress-check">
      <div class="card-header">
        <div class="card-icon">
          <i class="fas fa-chart-line"></i>
        </div>
        <div>
          <div class="card-title">Progress Monitoring | 進度監控</div>
          <div class="bilingual">Batch check all teachers' progress</div>
        </div>
      </div>
      <div class="control-grid">
        <button class="btn btn-primary" onclick="openProgressStandardsDialog()">
          <i class="fas fa-cogs"></i> Set Standards | 設定標準
        </button>
        <button class="btn btn-warning" onclick="quickProgressCheck()">
          <i class="fas fa-tachometer-alt"></i> Quick Check | 快速檢查
        </button>
        <button class="btn btn-info" onclick="viewProgressHistory()">
          <i class="fas fa-history"></i> View History | 查看歷史
        </button>
      </div>
    </div>
  `;
}

function openProgressStandardsDialog() {
  google.script.run
    .withSuccessHandler(function(result) {
      if (result.success) {
        showSuccess('✅ Progress standards dialog opened');
      }
    })
    .withFailureHandler(function(error) {
      showError('❌ Failed to open standards dialog: ' + error.message);
    })
    .createProgressStandardsDialog();
}

function quickProgressCheck() {
  if (!confirm('This will check progress for all teachers with default standards. Continue?')) {
    return;
  }
  
  showLoading();
  google.script.run
    .withSuccessHandler(function(result) {
      hideLoading();
      if (result.success) {
        displayProgressCheckResults(result.summary);
        showSuccess(`✅ Progress check completed in ${result.duration}s`);
      } else {
        showError('❌ Progress check failed: ' + result.error);
      }
    })
    .withFailureHandler(function(error) {
      hideLoading();
      showError('❌ Progress check failed: ' + error.message);
    })
    .batchCheckAllProgress({
      formativeRequired: 3,
      summativeRequired: 1,
      description: 'Quick Progress Check'
    });
}
```

---

## 🚀 Implementation Timeline | 實施時程

### Week 1: Core Engine (5 days)
- **Day 1-2**: Progress analysis engine functions
- **Day 3**: Progress standards management  
- **Day 4**: Batch checking infrastructure
- **Day 5**: Basic testing and debugging

### Week 2: Reporting System (5 days)
- **Day 1-2**: Report generation engine
- **Day 3**: Behind classes alert system
- **Day 4**: Dashboard integration
- **Day 5**: End-to-end testing

### Week 3: Polish & Deploy (3 days)
- **Day 1**: Performance optimization
- **Day 2**: User interface refinement
- **Day 3**: Final testing and deployment

---

## ✅ Acceptance Criteria | 驗收標準

### Functional Tests | 功能測試
- [ ] 管理者可設定進度標準 (3F.A. + 1S.A.)
- [ ] 系統正確識別 0, 空白, "N", >0 的差異  
- [ ] 一鍵檢查所有教師進度 < 30秒
- [ ] 報告顯示每位教師整體進度百分比
- [ ] 報告顯示每個班級詳細進度
- [ ] 落後班級明確標示在報告頂部
- [ ] 系統可處理 50+ 教師, 200+ 班級

### User Experience Tests | 用戶體驗測試  
- [ ] 操作流程直觀 (3步內完成檢查)
- [ ] 報告內容清晰易懂
- [ ] 錯誤處理友善明確
- [ ] 中英雙語介面完整

現在我開始實施第一個功能：**進度分析引擎**。你準備好了嗎？ 🚀