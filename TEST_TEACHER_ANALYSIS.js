// Quick analysis of teacher-class distribution based on current test data

const testData = [
  // G1 Classes
  ['Ms. Johnson', 'G1 Achievers'], ['Ms. Johnson', 'G1 Builders'],
  ['Ms. Davis', 'G1 Creators'], ['Ms. Davis', 'G1 Dreamers'],
  ['Ms. Wilson', 'G1 Explorers'], ['Ms. Wilson', 'G1 Pioneers'],
  
  // G2 Classes (same teachers)
  ['Ms. Johnson', 'G2 Achievers'], ['Ms. Johnson', 'G2 Builders'],
  ['Ms. Davis', 'G2 Creators'], ['Ms. Davis', 'G2 Dreamers'],
  ['Ms. Wilson', 'G2 Explorers'], ['Ms. Wilson', 'G2 Pioneers'],
  
  // G3 Classes
  ['Ms. Taylor', 'G3 Achievers'], ['Ms. Taylor', 'G3 Builders'],
  ['Ms. Martinez', 'G3 Creators'], ['Ms. Martinez', 'G3 Dreamers'],
  ['Ms. Robinson', 'G3 Explorers'], ['Ms. Robinson', 'G3 Pioneers'],
  
  // G4 Classes (same teachers)
  ['Ms. Taylor', 'G4 Achievers'], ['Ms. Taylor', 'G4 Builders'],
  ['Ms. Martinez', 'G4 Creators'], ['Ms. Martinez', 'G4 Dreamers'],
  ['Ms. Robinson', 'G4 Explorers'], ['Ms. Robinson', 'G4 Pioneers'],
  
  // G5 Classes
  ['Ms. White', 'G5 Achievers'], ['Ms. White', 'G5 Builders'],
  ['Ms. Kumar', 'G5 Creators'], ['Ms. Kumar', 'G5 Dreamers'],
  ['Ms. Rodriguez', 'G5 Explorers'], ['Ms. Rodriguez', 'G5 Pioneers'],
  
  // G6 Classes (same teachers)
  ['Ms. White', 'G6 Achievers'], ['Ms. White', 'G6 Builders'],
  ['Ms. Kumar', 'G6 Creators'], ['Ms. Kumar', 'G6 Dreamers'],
  ['Ms. Rodriguez', 'G6 Explorers'], ['Ms. Rodriguez', 'G6 Pioneers']
];

// Count classes per teacher
const teacherClasses = {};
testData.forEach(([teacher, className]) => {
  if (!teacherClasses[teacher]) {
    teacherClasses[teacher] = [];
  }
  teacherClasses[teacher].push(className);
});

console.log('=== LT Teacher Class Distribution ===');
Object.entries(teacherClasses).forEach(([teacher, classes]) => {
  console.log(`${teacher}: ${classes.length} classes`);
  console.log(`  Classes: ${classes.join(', ')}`);
  console.log('');
});

// Expected result: Each teacher should have 4 classes (2 from each grade in their group)