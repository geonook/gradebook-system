# Comprehensive Test Data Structure | 完整測試資料結構

## 📊 Overview | 概述

**Total Students | 總學生數**: 109 students across 36 classes  
**Teacher Groups | 教師分組**: 3 grade-level groups (G1-G2, G3-G4, G5-G6)  
**HT Structure | HT結構**: Each grade has 1 LT HT and 1 IT HT  
**Class Distribution | 班級分佈**: Each teacher manages exactly 2 classes  

---

## 🎯 Teacher Structure | 教師結構

### Grade 1-2 Teacher Group | G1-G2教師群組

#### **LT Teachers | LT教師**
1. **Ms. Johnson** *(HT)*
   - G1 Achievers (4 students)
   - G1 Builders (3 students)
   - G2 Achievers (3 students) 
   - G2 Builders (3 students)

2. **Ms. Davis**
   - G1 Creators (3 students)
   - G1 Dreamers (3 students)
   - G2 Creators (3 students)
   - G2 Dreamers (3 students)

3. **Ms. Wilson**
   - G1 Explorers (3 students)
   - G1 Pioneers (3 students)
   - G2 Explorers (3 students)
   - G2 Pioneers (3 students)

#### **IT Teachers | IT教師**
1. **Mr. Smith**
   - G1 Achievers, G1 Builders
   - G2 Achievers, G2 Builders

2. **Mr. Brown**
   - G1 Creators, G1 Dreamers
   - G2 Creators, G2 Dreamers

3. **Mr. Garcia** *(HT)*
   - G1 Explorers, G1 Pioneers
   - G2 Explorers, G2 Pioneers

### Grade 3-4 Teacher Group | G3-G4教師群組

#### **LT Teachers | LT教師**
1. **Ms. Taylor** *(HT)*
   - G3 Achievers (3 students)
   - G3 Builders (3 students)
   - G4 Achievers (3 students)
   - G4 Builders (3 students)

2. **Ms. Martinez**
   - G3 Creators (3 students)
   - G3 Dreamers (3 students)
   - G4 Creators (3 students)
   - G4 Dreamers (3 students)

3. **Ms. Robinson**
   - G3 Explorers (3 students)
   - G3 Pioneers (3 students)
   - G4 Explorers (3 students)
   - G4 Pioneers (3 students)

#### **IT Teachers | IT教師**
1. **Mr. Anderson**
   - G3 Achievers, G3 Builders
   - G4 Achievers, G4 Builders

2. **Mr. Thompson**
   - G3 Creators, G3 Dreamers
   - G4 Creators, G4 Dreamers

3. **Mr. Lee** *(HT)*
   - G3 Explorers, G3 Pioneers
   - G4 Explorers, G4 Pioneers

### Grade 5-6 Teacher Group | G5-G6教師群組

#### **LT Teachers | LT教師**
1. **Ms. White** *(HT)*
   - G5 Achievers (3 students)
   - G5 Builders (3 students)
   - G6 Achievers (3 students)
   - G6 Builders (3 students)

2. **Ms. Kumar**
   - G5 Creators (3 students)
   - G5 Dreamers (3 students)
   - G6 Creators (3 students)
   - G6 Dreamers (3 students)

3. **Ms. Rodriguez**
   - G5 Explorers (3 students)
   - G5 Pioneers (3 students)
   - G6 Explorers (3 students)
   - G6 Pioneers (3 students)

#### **IT Teachers | IT教師**
1. **Mr. Clark**
   - G5 Achievers, G5 Builders
   - G6 Achievers, G6 Builders

2. **Mr. Patel**
   - G5 Creators, G5 Dreamers
   - G6 Creators, G6 Dreamers

3. **Mr. Collins** *(HT)*
   - G5 Explorers, G5 Pioneers
   - G6 Explorers, G6 Pioneers

---

## 👨‍🏫 Head Teacher (HT) Structure | 學年主任結構

| Grade | LT HT | IT HT | Teacher Group |
|-------|-------|-------|---------------|
| G1 | Ms. Johnson | Mr. Garcia | G1-G2 Group |
| G2 | Ms. Johnson | Mr. Garcia | G1-G2 Group |
| G3 | Ms. Taylor | Mr. Lee | G3-G4 Group |
| G4 | Ms. Taylor | Mr. Lee | G3-G4 Group |
| G5 | Ms. White | Mr. Collins | G5-G6 Group |
| G6 | Ms. White | Mr. Collins | G5-G6 Group |

---

## 📚 Class Distribution | 班級分佈

### Total Classes by Grade | 各年級班級總數
- **Grade 1**: 6 classes (G1 Achievers, Builders, Creators, Dreamers, Explorers, Pioneers)
- **Grade 2**: 6 classes (G2 Achievers, Builders, Creators, Dreamers, Explorers, Pioneers)
- **Grade 3**: 6 classes (G3 Achievers, Builders, Creators, Dreamers, Explorers, Pioneers)
- **Grade 4**: 6 classes (G4 Achievers, Builders, Creators, Dreamers, Explorers, Pioneers)
- **Grade 5**: 6 classes (G5 Achievers, Builders, Creators, Dreamers, Explorers, Pioneers)
- **Grade 6**: 6 classes (G6 Achievers, Builders, Creators, Dreamers, Explorers, Pioneers)

### Class Size Distribution | 班級人數分佈
- **Smallest class**: 3 students (most classes)
- **Largest class**: 4 students (G1 Achievers)
- **Average class size**: 3.03 students
- **Total students**: 109 students

---

## 🔢 Student ID Pattern | 學生編號規律

- **Format**: LE11XXX (where XXX is sequential from 001-109)
- **Range**: LE11001 to LE11109
- **All students status**: 在學 (Active)
- **Email pattern**: [firstname.lastname]@school.edu

---

## 🎯 Testing Scenarios | 測試場景

### 1. **Batch Gradebook Creation | 批次成績簿創建**
- Should create **18 gradebooks** total:
  - 9 LT teacher gradebooks (3 per grade group)
  - 9 IT teacher gradebooks (3 per grade group)

### 2. **Student Data Loading | 學生資料載入**
- Each gradebook should contain **real student data** from Master Data
- Student counts should be **accurate** in teacher info sheets
- All students should have status "在學"

### 3. **Teacher Group Validation | 教師群組驗證**
- **G1-G2 teachers** should have classes from both grades
- **G3-G4 teachers** should have classes from both grades  
- **G5-G6 teachers** should have classes from both grades

### 4. **HT Functionality | HT功能**
- **6 HT gradebooks** should be created (one per grade)
- HTs should have **assessment title management** capabilities
- Level-based title synchronization should work correctly

### 5. **Formula Validation | 公式驗證**
- **Term Grade formula**: Only calculates when FA, SA, Final all have valid data
- **Final Assessment**: Should link to Final column (G=T)
- **Average formulas**: Should use IFERROR(ROUND(AVERAGEIF(...))) format

---

## 📋 Quality Assurance Checklist | 品質保證檢查清單

### Pre-Testing | 測試前
- [ ] Verify Master Data has 109 students
- [ ] Confirm all 36 classes are properly defined
- [ ] Check HT assignments are correct
- [ ] Validate teacher-class relationships

### During Testing | 測試中
- [ ] Monitor gradebook creation process
- [ ] Verify student data loading
- [ ] Check formula implementation
- [ ] Test HT permissions and functions

### Post-Testing | 測試後
- [ ] Confirm 18 teacher gradebooks created
- [ ] Validate student counts in teacher info
- [ ] Test grade calculations with sample data
- [ ] Verify progress monitoring functionality

---

## 🚀 Expected System Behavior | 預期系統行為

### Successful Test Outcomes | 成功測試結果
1. **18 gradebooks created** (9 LT + 9 IT)
2. **All students properly distributed** across correct teachers
3. **Accurate student counts** in all teacher info sheets
4. **Correct formula structure** in all gradebooks
5. **HT permissions** working for assessment title management
6. **Progress monitoring** functional for all teacher groups

### Performance Expectations | 性能預期
- **Batch creation time**: < 5 minutes for all gradebooks
- **Data accuracy**: 100% student-teacher matching
- **Formula correctness**: All calculations working properly
- **System stability**: No errors during creation process

---

## 🎯 HT (Head Teacher) System | 學年主任系統

### HT Management Structure | HT管理結構

**Grade Group Management | 年段組管理:**
- **G1-G2 Group**: Ms. Johnson (LT HT), Mr. Garcia (IT HT)
- **G3-G4 Group**: Ms. Taylor (LT HT), Mr. Lee (IT HT)  
- **G5-G6 Group**: Ms. White (LT HT), Mr. Collins (IT HT)

### HT Gradebook Features | HT成績簿功能

**Enhanced Gradebook Structure | 增強成績簿結構:**
- 📋 Gradebook Info (Teacher information)
- 📚 Class 1-4 (Regular teaching classes)
- ⚙️ **HT Assessment Management** (Dual-grade assessment title management)

**HT Assessment Management Contains | HT評量管理包含:**
- Dual-grade level management (e.g., G1E1-G1E3, G2E1-G2E3)
- Permission-controlled sync functions
- Grade-group restricted operations
- Bilingual interface and instructions

### Permission Control System | 權限控制系統

**Access Restrictions | 存取限制:**
- HT can only sync their assigned grade group
- IT HT manages IT teachers only
- LT HT manages LT teachers only
- Cross-grade-group operations are blocked

**Security Features | 安全功能:**
- File name pattern validation
- Master Data cross-verification
- Detailed permission logging
- Bilingual error messages

### Sync Functions | 同步功能

**Available Operations | 可用操作:**
```javascript
// Sync all levels in grade group
syncAssessmentTitlesByGradeGroup("G1-G2", "LT")

// Sync specific level (restricted by HT permissions)
syncAssessmentTitlesByLevel("G1E1")

// View assessment titles (read-only with permission check)
getAssessmentTitlesByGradeGroup("G1-G2", "LT")
```

---

*Generated: 2025-06-27*  
*Total Test Data: 109 students, 18 teachers (6 HTs), 36 classes*  
*HT System: Complete with permission control and dual-grade management*