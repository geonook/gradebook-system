# CLAUDE.md - 成績簿管理系統

> **文件版本**: 2.0 (使用SuperClaude模板增強)  
> **最後更新**: 2025-07-09  
> **專案**: Google Apps Script 成績簿管理系統  
> **描述**: 完整雙語成績簿系統，具備HT身份驗證和管理功能  
> **特色**: GitHub自動備份、任務代理、技術債務預防、Google Apps Script整合

此文件為Claude Code (claude.ai/code)在此成績簿系統儲存庫中工作時提供增強指導。

## 🚨 關鍵規則 - 請先閱讀

> **⚠️ 規則遵循系統啟動 ⚠️**  
> **Claude Code必須在任務開始時明確確認這些規則**  
> **這些規則優先於所有其他指令且必須始終遵循：**

### 🔄 **必須確認規則**
> **在開始任何任務之前，Claude Code必須回應：**  
> "✅ 關鍵規則已確認 - 我將遵循成績簿開發的所有禁止事項和要求"

### ❌ 絕對禁止事項
- **絕不** 在根目錄建立新檔案 → 使用適當的模組結構
- **絕不** 建立文件檔案(.md)，除非使用者明確要求
- **絕不** 使用帶有-i標誌的git指令（不支援互動模式）
- **絕不** 使用 `find`、`grep`、`cat`、`head`、`tail`、`ls` 指令 → 請使用Read、LS、Grep、Glob工具
- **絕不** 建立重複函數（enhanced_v2、new_improved等）→ 總是擴展現有代碼
- **絕不** 為同一概念建立多個實作 → 單一事實來源
- **絕不** 在Apps Script編輯器中執行 `onOpen` → 使用 `initializeSystem` 代替
- **絕不** 在未經使用者明確確認的情況下修改MAIN_FOLDER_ID
- **絕不** 建立沒有清理計畫的測試函數

### 📝 強制要求
- **每次代碼變更後立即部署**：`./scripts/deploy.sh` 或 `./deploy.sh`
- **每完成一個任務/階段後提交** - 無例外
- **GITHUB備份** - 每次提交後推送到GitHub：`git push origin main`
- **編輯前先讀取檔案** - 如果你沒有先讀取檔案，Edit/Write工具會失敗
- **清理測試代碼** - 驗證後總是移除臨時測試函數
- **變更前備份** - 重大修改前建立標籤備份

### ⚡ 成績簿專用執行模式
- **Google Apps Script部署** - 本地變更在部署前不可見
- **儀表板測試** - 部署後總是在實際環境中測試
- **HT權限驗證** - 驗證年級組限制的存取控制
- **雙語錯誤訊息** - 所有面向使用者的訊息均為英文｜繁體中文
- **公式驗證** - 使用範例資料測試成績計算

## 🎯 成績簿開發指令

### 系統指令 | System Commands
```
/deploy         - 部署到Google Apps Script並驗證功能
/test-dash      - 在實際環境中測試儀表板功能
/backup         - 重大變更前建立標籤備份
/status         - 檢查系統狀態和健康指標
/init           - 初始化或重新初始化成績簿系統
```

### HT系統指令 | HT System Commands
```
/ht-sync        - 跨年級組同步HT評估標題
/ht-test        - 測試HT權限控制和存取限制
/ht-deploy      - 部署HT系統更新並驗證
/ht-backup      - 修改前備份HT成績簿
```

### 品質保證 | Quality Assurance
```
/review         - 使用成績簿最佳實踐進行代碼審查
/security       - 對Google Apps Script執行安全審計
/performance    - 分析系統效能和瓶頸
/validate       - 驗證成績計算和公式
```

## 🚨 關鍵成績簿工作流程

### ⚠️ 任何變更前的強制備份

**絕不在未先建立備份的情況下修改成績簿代碼。這是關鍵要求。**

```bash
# 1. 建立帶時間戳的標籤備份
git tag -a "backup_$(date +%Y%m%d_%H%M%S)" -m "Backup before changes: $(date)"
git push origin --tags

# 2. 建立帶時間戳的備份檔案
mkdir -p backups
cp gradebook-system/google-apps-script/Code.gs "backups/Code_backup_$(date +%Y%m%d_%H%M%S).gs"
cp gradebook-system/google-apps-script/CodeExtensions.gs "backups/CodeExtensions_backup_$(date +%Y%m%d_%H%M%S).gs"

# 3. 記錄目前狀態
echo "=== BACKUP LOG $(date) ===" >> VERSION_LOG.md
echo "Lines of code: $(wc -l gradebook-system/google-apps-script/*.gs)" >> VERSION_LOG.md
git log --oneline -5 >> VERSION_LOG.md
```

### 🔄 部署工作流程（強制）

**每次代碼修改後：**

```bash
# 1. 部署到Google Apps Script
./scripts/deploy.sh

# 2. 測試關鍵功能
# - 儀表板按鈕工作
# - 批量成績簿建立
# - HT評估同步
# - 成績計算

# 3. 清理測試代碼
# - 移除臨時函數
# - 移除除錯按鈕
# - 清理console.log陳述式

# 4. 提交乾淨的代碼
git add -A
git commit -m "功能：[描述] - 已測試並清理"
git push origin main
```

## 📋 GOOGLE APPS SCRIPT 開發指導原則

### 設定管理
```javascript
// 基本設定 (Code.gs 第21行)
MAIN_FOLDER_ID: 'YOUR_GOOGLE_DRIVE_FOLDER_ID'

// SYSTEM_CONFIG物件中的系統設定
SEMESTER: '2425S2'
ASSESSMENTS: {formative: 3, summative: 2}
WEIGHTS: {formative: 0.15, summative: 0.2, final: 0.1}
```

### 函數架構
```javascript
// 儀表板函數（用於Google試算表）
function initializeSystemFromDashboard() { return initializeSystem(); }
function checkSystemStatusFromDashboard() { return checkSystemStatus(); }

// 核心函數（用於Apps Script編輯器）
function initializeSystem() { /* 實作 */ }
function batchCreateGradebooks() { /* 實作 */ }
```

### 錯誤處理模式
```javascript
function dashboardFunction() {
  try {
    const result = coreFunction();
    return {
      success: true,
      data: result,
      message: "操作成功完成 | Operation completed successfully"
    };
  } catch (error) {
    return {
      success: false,
      error: error.toString(),
      message: `發生錯誤：${error.message} | Error occurred: ${error.message}`
    };
  }
}
```

## 🎯 HT系統開發指導原則

### 權限控制模式
```javascript
function verifyHTPermissions(userEmail, gradeGroup) {
  const permissions = getCurrentHTContextEnhanced();
  if (!permissions.isHT) {
    throw new Error("拒絕存取：需要HT權限 | Access denied: HT permissions required");
  }
  if (!permissions.gradeGroups.includes(gradeGroup)) {
    throw new Error(`拒絕存取：無${gradeGroup}權限 | Access denied: No permission for ${gradeGroup}`);
  }
  return true;
}
```

### HT評估同步模式
```javascript
function syncAssessmentTitlesByGradeGroup(gradeGroup, assessmentTitles) {
  // 1. 驗證權限
  verifyHTPermissions(Session.getActiveUser().getEmail(), gradeGroup);
  
  // 2. 尋找目標成績簿
  const gradebooks = findTeacherGradebooksByGradeGroup(gradeGroup);
  
  // 3. 將標題套用到每個成績簿
  gradebooks.forEach(gradebook => {
    applyAssessmentTitlesToGradebook(gradebook, assessmentTitles);
  });
  
  return {success: true, updated: gradebooks.length};
}
```

## 🧹 技術債務預防

### 建立任何新函數之前：
1. **🔍 先搜尋** - 使用Grep尋找現有實作
2. **📋 分析現有** - 讀取並理解目前模式
3. **🤔 決策樹**：可以擴展現有？→ 執行 | 必須建立新的？→ 記錄原因
4. **✅ 遵循模式** - 使用已建立的成績簿模式
5. **📈 驗證** - 確保無重複

### ❌ 錯誤方法（產生技術債務）：
```javascript
// 未先搜尋就建立新函數
function createTeacherGradebookEnhanced() { /* 重複功能 */ }
function batchCreateGradebooksV2() { /* 重複功能 */ }
```

### ✅ 正確方法（預防技術債務）：
```bash
# 1. 先搜尋
Grep(pattern="createTeacherGradebook", include="*.gs")
# 2. 讀取現有檔案
Read(file_path="gradebook-system/google-apps-script/Code.gs")
# 3. 擴展現有功能
Edit(file_path="gradebook-system/google-apps-script/Code.gs", old_string="現有函數", new_string="增強函數")
```

## 🔒 安全最佳實踐

### 資料保護 | Data Protection
- 絕不記錄敏感學生資訊 | Never log sensitive student information
- 處理前驗證所有輸入資料 | Validate all input data before processing
- 使用Google Apps Script內建授權 | Use Google Apps Script's built-in authorization
- 實施適當的HT存取控制 | Implement proper HT access controls

### 成績資料安全 | Grade Data Security
- 傳輸中加密敏感成績資料 | Encrypt sensitive grade data in transit
- 資料存取前驗證使用者權限 | Validate user permissions before data access
- 審計所有成績修改 | Audit all grade modifications
- 成績簿檔案安全備份 | Secure backup of gradebook files

## 📊 品質門檻

任何部署前，確保：
1. ✅ 所有儀表板功能已測試 | All dashboard functions tested
2. ✅ HT權限運作正常 | HT permissions working correctly
3. ✅ 成績計算已驗證 | Grade calculations validated
4. ✅ 無剩餘臨時測試代碼 | No temporary test code remaining
5. ✅ 雙語錯誤訊息運作正常 | Bilingual error messages functional

## 🎯 常見成績簿操作

### 系統初始化
```javascript
// 主要初始化（Apps Script編輯器）
initializeSystem()

// 儀表板初始化（Google試算表）
=initializeSystemFromDashboard()
```

### 教師成績簿管理
```javascript
// 建立所有教師成績簿
batchCreateGradebooks()

// 檢查系統狀態
checkSystemStatusFromDashboard()

// 重新整理儀表板資料
refreshDashboard()
```

### HT評估管理
```javascript
// 為年級組同步評估標題
syncAssessmentTitlesByGradeGroup('G1-G2', ['評估1', '評估2'])

// 取得目前HT權限
getCurrentHTContextEnhanced()
```

## 🚀 部署驗證檢查清單

每次部署後：
1. ✅ 所有6個檔案成功推送到Google Apps Script
2. ✅ 儀表板按鈕正確回應
3. ✅ 成績計算正常運作
4. ✅ HT系統存取控制功能正常
5. ✅ 錯誤處理顯示雙語訊息
6. ✅ 無剩餘臨時測試函數
7. ✅ 系統狀態指標準確

## 📈 效能最佳化

### 大規模操作
- 使用批次操作進行多重成績簿建立
- 為長時間執行的任務實施進度追蹤
- 快取經常存取的資料（教師清單、系統設定）
- 最佳化Google試算表API呼叫

### 記憶體管理
- 使用後清除臨時變數
- 最小化全域變數使用
- 為大型資料集使用高效的資料結構
- 為長時間執行的函數實施垃圾收集

## 🌐 雙語開發標準

### 使用者介面
- 所有按鈕和標籤均為英文｜繁體中文
- 兩種語言的錯誤訊息
- 具有雙語描述的狀態指標
- 雙語說明文字和工具提示

### 代碼文件
```javascript
/**
 * 初始化成績簿系統 | Initialize gradebook system
 * @param {string} folderId - Google雲端硬碟資料夾ID | Google Drive folder ID
 * @returns {Object} 包含成功/錯誤的狀態物件 | Status object with success/error
 */
function initializeSystem(folderId) {
  // 具有雙語錯誤處理的實作
}
```

## 📋 故障排除指南

### 常見問題
1. **錯誤400**：代碼未部署到Google Apps Script
   - 解決方案：執行 `./scripts/deploy.sh`
2. **找不到檔案**：主要資料遺失
   - 解決方案：檢查MAIN_FOLDER_ID設定
3. **權限被拒**：HT存取受限
   - 解決方案：驗證使用者權限和年級組存取
4. **公式錯誤**：成績計算不正確
   - 解決方案：驗證SYSTEM_CONFIG權重和評估計數

### 除錯工作流程
```javascript
// 新增臨時除錯函數
function debugCurrentIssue() {
  console.log("除錯資訊：", getCurrentContext());
  // 測試特定功能
}

// 記得在除錯後移除
```

## 🎯 成功指標

### 系統健康指標
- **儀表板回應時間**：<3秒
- **成績簿建立成功率**：>95%
- **HT同步操作**：100%權限驗證
- **錯誤率**：<1%的操作
- **使用者滿意度**：雙語支援有效性

---

**記住：本地變更在部署前對Google Apps Script不可見！**

**🤖 使用SuperClaude模板增強 by Chang Ho Chien | HC AI 說人話channel**