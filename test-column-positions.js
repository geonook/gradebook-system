// Temporary test script to execute debugColumnPositions function
// This will be run via clasp and then deleted

function testColumnPositions() {
  try {
    console.log('Starting column position analysis...');
    
    // Call the debugColumnPositions function
    const result = debugColumnPositions();
    
    console.log('Column position analysis completed.');
    console.log('Result:', JSON.stringify(result, null, 2));
    
    return result;
  } catch (error) {
    console.error('Error in column position analysis:', error);
    return { success: false, error: error.toString() };
  }
}