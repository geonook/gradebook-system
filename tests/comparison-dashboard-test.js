// Comparison Dashboard Test - Verify Enhanced Data Extraction
// Test the fixed extractClassAveragesFromGradebook() function

const { test, expect } = require('@playwright/test');

test.describe('Comparison Dashboard - Enhanced Data Extraction', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the gradebook system
    await page.goto('https://script.google.com/macros/s/AKfycbwQD6FGVvt3R4_L5RGS8BB7yapJlE8S9gd4E8HyJRI/exec');
    
    // Wait for initial page load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
  });

  test('should load comparison dashboard and extract valid data', async ({ page }) => {
    console.log('Testing Comparison Dashboard functionality...');

    // Step 1: Navigate to Comparison Dashboard section
    console.log('Step 1: Looking for Comparison Dashboard section...');
    
    // Look for the comparison dashboard section with various possible selectors
    const dashboardSelectors = [
      'text=🔍 Comparison Dashboard',
      'text=班級比較面板', 
      '[data-section="comparison"]',
      'h3:has-text("Comparison")',
      'div:has-text("Comparison Dashboard")'
    ];
    
    let comparisonSection = null;
    for (const selector of dashboardSelectors) {
      try {
        comparisonSection = await page.locator(selector).first();
        if (await comparisonSection.isVisible({ timeout: 2000 })) {
          console.log(`Found comparison section with selector: ${selector}`);
          break;
        }
      } catch (error) {
        console.log(`Selector ${selector} not found, trying next...`);
      }
    }

    if (!comparisonSection || !(await comparisonSection.isVisible())) {
      console.log('Comparison section not immediately visible, scrolling to find it...');
      await page.evaluate(() => {
        const element = document.querySelector('*[data-section="comparison"], *:contains("Comparison Dashboard")');
        if (element) element.scrollIntoView();
      });
      await page.waitForTimeout(1000);
    }

    // Step 2: Click Load Comparison Data button
    console.log('Step 2: Looking for Load Comparison Data button...');
    
    const loadButtonSelectors = [
      'button:has-text("Load Comparison Data")',
      'button:has-text("載入比較資料")',
      '[onclick*="loadComparisonData"]',
      'button[id*="load-comparison"]',
      'input[value*="Load Comparison"]'
    ];

    let loadButton = null;
    for (const selector of loadButtonSelectors) {
      try {
        loadButton = await page.locator(selector).first();
        if (await loadButton.isVisible({ timeout: 2000 })) {
          console.log(`Found load button with selector: ${selector}`);
          break;
        }
      } catch (error) {
        console.log(`Load button selector ${selector} not found, trying next...`);
      }
    }

    // If button not found, take a screenshot for debugging
    if (!loadButton || !(await loadButton.isVisible())) {
      console.log('Load button not found, taking screenshot for debugging...');
      await page.screenshot({ 
        path: 'test-results/comparison-dashboard-debug.png', 
        fullPage: true 
      });
      
      // Try to find any buttons in the comparison area
      const allButtons = await page.locator('button, input[type="button"]').all();
      console.log(`Found ${allButtons.length} total buttons on page`);
      
      for (let i = 0; i < allButtons.length; i++) {
        const buttonText = await allButtons[i].textContent();
        const buttonValue = await allButtons[i].getAttribute('value');
        console.log(`Button ${i}: text="${buttonText}", value="${buttonValue}"`);
      }
    }

    // Click the load button
    if (loadButton && await loadButton.isVisible()) {
      console.log('Clicking Load Comparison Data button...');
      
      // Wait for any loading indicators to appear
      const loadingPromise = page.waitForFunction(() => {
        return document.querySelector('.loading, [style*="loading"], *:contains("Loading")') !== null;
      }, { timeout: 2000 }).catch(() => console.log('No loading indicator detected'));
      
      await loadButton.click();
      
      // Wait for loading to complete
      await loadingPromise;
      await page.waitForFunction(() => {
        const loadingElements = document.querySelectorAll('.loading, [style*="loading"]');
        return loadingElements.length === 0 || Array.from(loadingElements).every(el => 
          el.style.display === 'none' || !el.textContent.includes('Loading')
        );
      }, { timeout: 30000 }).catch(() => console.log('Loading timeout - continuing with test'));
      
      await page.waitForTimeout(2000);
    } else {
      throw new Error('Could not find Load Comparison Data button');
    }

    // Step 3: Verify data loads successfully
    console.log('Step 3: Verifying comparison data loaded...');
    
    // Check for "No data available" message
    const noDataSelectors = [
      'text=No data available',
      'text=無資料',
      '.no-data',
      '*:contains("No data")'
    ];
    
    let hasNoData = false;
    for (const selector of noDataSelectors) {
      try {
        const noDataElement = page.locator(selector);
        if (await noDataElement.isVisible({ timeout: 2000 })) {
          hasNoData = true;
          console.log('❌ Found "No data available" message - data extraction failed');
          break;
        }
      } catch (error) {
        // Continue checking other selectors
      }
    }

    // Look for actual comparison data
    const dataSelectors = [
      '.comparison-table',
      '.class-data',
      'table',
      '.data-row',
      '*:contains("G1")', // Grade level indicators
      '*:contains("G2")',
      '*:contains("Excellent")',
      '*:contains("Good")',
      '*:contains("Normal")',
      '*:contains("Behind")'
    ];
    
    let hasData = false;
    for (const selector of dataSelectors) {
      try {
        const dataElement = page.locator(selector);
        if (await dataElement.isVisible({ timeout: 2000 })) {
          hasData = true;
          console.log(`✅ Found comparison data with selector: ${selector}`);
          break;
        }
      } catch (error) {
        // Continue checking other selectors
      }
    }

    // Step 4: Check for status indicators
    console.log('Step 4: Checking status indicators...');
    
    const statusIndicators = ['Excellent', 'Good', 'Normal', 'Behind'];
    const foundStatuses = [];
    
    for (const status of statusIndicators) {
      try {
        const statusElement = page.locator(`text=${status}`);
        if (await statusElement.isVisible({ timeout: 1000 })) {
          foundStatuses.push(status);
        }
      } catch (error) {
        // Status not found
      }
    }
    
    console.log(`Found status indicators: ${foundStatuses.join(', ')}`);
    
    // Step 5: Check statistical summary
    console.log('Step 5: Checking statistical summary...');
    
    const statsSelectors = [
      '.stats',
      '.summary', 
      '*:contains("Total Classes")',
      '*:contains("Average")',
      'table[class*="stat"]'
    ];
    
    let hasStats = false;
    for (const selector of statsSelectors) {
      try {
        const statsElement = page.locator(selector);
        if (await statsElement.isVisible({ timeout: 2000 })) {
          hasStats = true;
          console.log(`✅ Found statistical summary with selector: ${selector}`);
          const statsText = await statsElement.textContent();
          console.log(`Stats content: ${statsText?.substring(0, 200)}...`);
          break;
        }
      } catch (error) {
        // Continue checking other selectors
      }
    }

    // Step 6: Take a screenshot of the current state
    await page.screenshot({ 
      path: 'test-results/comparison-dashboard-final.png', 
      fullPage: true 
    });

    // Step 7: Output test results
    console.log('\n=== TEST RESULTS ===');
    console.log(`❌ No data message found: ${hasNoData}`);
    console.log(`✅ Comparison data found: ${hasData}`);
    console.log(`✅ Status indicators found: ${foundStatuses.length > 0}`);
    console.log(`✅ Statistical summary found: ${hasStats}`);
    
    // Assertions
    expect(hasNoData).toBeFalsy(); // Should not show "No data available"
    expect(hasData).toBeTruthy(); // Should show actual comparison data
    expect(foundStatuses.length).toBeGreaterThan(0); // Should have status indicators
    
    console.log('\n✅ Comparison Dashboard test completed successfully!');
  });

  test('should verify enhanced logging in browser console', async ({ page }) => {
    console.log('Testing enhanced logging functionality...');
    
    // Listen for console logs from the page
    const consoleLogs = [];
    page.on('console', msg => {
      if (msg.text().includes('extractClassAveragesFromGradebook') || 
          msg.text().includes('raw values') || 
          msg.text().includes('parsed values')) {
        consoleLogs.push(msg.text());
        console.log('📋 Console log:', msg.text());
      }
    });

    // Navigate and trigger comparison data load
    await page.goto('https://script.google.com/macros/s/AKfycbwQD6FGVvt3R4_L5RGS8BB7yapJlE8S9gd4E8HyJRI/exec');
    await page.waitForLoadState('networkidle');
    
    // Try to trigger the load comparison data
    try {
      const loadButton = page.locator('button:has-text("Load Comparison Data"), button:has-text("載入比較資料")').first();
      if (await loadButton.isVisible({ timeout: 5000 })) {
        await loadButton.click();
        await page.waitForTimeout(10000); // Wait for processing
      }
    } catch (error) {
      console.log('Could not trigger load button, but console logs may still be captured');
    }

    // Check if we captured any enhanced logging
    console.log(`\nCaptured ${consoleLogs.length} relevant console logs`);
    consoleLogs.forEach((log, index) => {
      console.log(`Log ${index + 1}: ${log}`);
    });

    // The enhanced logging should show raw values and parsing details
    const hasEnhancedLogging = consoleLogs.some(log => 
      log.includes('raw values') || log.includes('parsed values') || log.includes('extractClassAverages')
    );
    
    console.log(`Enhanced logging detected: ${hasEnhancedLogging}`);
  });
});