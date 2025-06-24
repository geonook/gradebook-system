# Project Todo List | 專案待辦清單

## Current Tasks | 目前任務

### Completed | 已完成
- [x] Update class test data with new 14 class names | 更新班級測試資料，使用新的14個班名
- [x] Update student test data to match new class names | 更新學生測試資料，對應新的班名  
- [x] Ensure G1-G6 grades have corresponding class assignments | 確保G1-G6年級都有對應的班級分配
- [x] Analyze existing Assessment Title Management structure | 分析現有Assessment Title Management結構
- [x] Redesign ASSESSMENT_TITLES structure for LT&Level and IT&Level | 重新設計ASSESSMENT_TITLES結構以支援LT&Level和IT&Level
- [x] Update getAssessmentTitles function to support new structure | 更新getAssessmentTitles函數以支援新結構
- [x] Update setupClassSheetHeaders function to pass teacherType parameter | 更新setupClassSheetHeaders函數以傳遞teacherType參數
- [x] Implement synchronous update to existing gradebooks functionality | 實作同步更新已建立gradebook功能
- [x] Fix Level definition: treat G1E1 etc. as complete Level (including grade) | 修正Level定義：將G1E1等視為完整Level（包含年段）
- [x] Fix sync update logic: one Level setting updates all classes of that Level | 修正同步更新邏輯：一次設定Level就更新所有該Level的班級
- [x] Update class to Level correspondence logic | 更新班級與Level的對應關係邏輯

### In Progress | 進行中
- [ ] Update todo.md file to record latest progress | 更新todo.md文件記錄最新進度

### Pending | 待辦
- [ ] Additional system testing for new LT&Level management | 新LT&Level管理系統的額外測試
- [ ] Performance optimization | 效能最佳化
- [ ] User documentation for new assessment title management | 新評量標題管理的使用者文件

## Recent Major Updates | 最新重大更新

### Assessment Title Management System Redesign | 評量標題管理系統重新設計

#### New Features | 新功能
1. **LT&Level and IT&Level Management Units | LT&Level和IT&Level管理單位**
   - LT (Local Teacher) with levels G1E1-G6E2 | LT（本地教師）含G1E1-G6E2級別
   - IT (International Teacher) with levels G1E1-G6E2 | IT（國際教師）含G1E1-G6E2級別
   - Separate assessment titles for each teacher type and level | 每個教師類型和級別的獨立評量標題

2. **Synchronous Updates to Existing Gradebooks | 同步更新已建立的成績簿**
   - `updateAssessmentTitlesByTeacherLevel(teacherType, classCode, formativeTitles, summativeTitles)` | 更新特定教師類型和級別的評量標題
   - `syncAssessmentTitlesToExistingGradebooksByTeacherLevel(teacherType, classCode)` | 同步評量標題到現有成績簿
   - `batchUpdateAssessmentTitlesByTeacherType(teacherType, levelUpdates)` | 批量更新特定教師類型的所有級別

3. **Enhanced Class-Level Mapping | 增強的班級-級別對應**
   - Improved logic to find all classes belonging to a specific level | 改良的邏輯以找到屬於特定級別的所有班級
   - Automatic detection of teacher type from gradebook filenames | 從成績簿檔名自動檢測教師類型
   - Smart matching between sheet names and class configurations | 工作表名稱與班級配置的智能匹配

#### Example Usage | 使用範例
```javascript
// Update LT G1E1 assessment titles for all G1E1 classes
updateAssessmentTitlesByTeacherLevel('LT', 'G1E1', 
  ['中文測驗1', '語音練習1', '故事分享1', '歌謠練習1', '中文測驗2', '語音練習2', '故事分享2', '歌謠練習2'],
  ['基礎測試1', '基礎測試2', '聽力測驗', '口語測驗']
);

// Update IT G2E2 assessment titles for all G2E2 classes  
updateAssessmentTitlesByTeacherLevel('IT', 'G2E2',
  ['Grammar Fun 1', 'Role Play 1', 'Story Create 1', 'Drama Time 1', 'Grammar Fun 2', 'Role Play 2', 'Story Create 2', 'Drama Time 2'],
  ['Chapter Test 1', 'Chapter Test 2', 'Performance', 'Final Exam']
);
```

## Notes | 備註

### Class Names | 班名
The system now uses 14 standardized class names distributed across G1-G6:
系統現在使用14個標準化班名，分佈在G1-G6年級：

- Trailblazers, Discoverers (G1)
- Adventurers, Innovators (G2)  
- Explorers, Navigators (G3)
- Inventors, Voyagers (G4)
- Pioneers, Guardians (G5)
- Pathfinders, Seekers, Visionaries, Achievers (G6)

### Level Management | 級別管理
- **Level Definition**: G1E1, G1E2, G2E1, G2E2, etc. (including grade and proficiency) | Level定義：G1E1、G1E2、G2E1、G2E2等（包含年級和程度）
- **Teacher Types**: LT (Local Teacher) and IT (International Teacher) | 教師類型：LT（本地教師）和IT（國際教師）
- **One-Time Setting**: Setting assessment titles for a level updates ALL classes of that level | 一次設定：為某個級別設定評量標題會更新該級別的所有班級

### Data Matching Logic | 資料匹配邏輯
The system only creates gradebooks for classes that have complete matches between Students and Classes sheets. This prevents excessive test data creation during development.
系統只為在學生表和班級表之間有完全匹配的班級創建成績簿。這避免了開發期間創建過多測試資料。