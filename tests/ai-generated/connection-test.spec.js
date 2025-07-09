// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Simple connection test to verify the gradebook system is accessible
 */

test.describe('Gradebook System Connection Test', () => {
  
  test('Should connect to gradebook system and analyze response', async ({ page }) => {
    console.log('Testing connection to gradebook system...');
    
    // Navigate to the gradebook system
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Get page information
    const pageTitle = await page.title();
    const pageUrl = page.url();
    
    console.log('Page Title:', pageTitle);
    console.log('Page URL:', pageUrl);
    
    // Take screenshot for analysis
    await page.screenshot({ 
      path: 'test-results/mcp-output/screenshots/connection-test.png',
      fullPage: true 
    });
    
    // Check if we get any content
    const bodyContent = await page.locator('body').textContent();
    console.log('Body content length:', bodyContent?.length || 0);
    
    // Check for any h1 elements
    const h1Elements = await page.locator('h1').all();
    console.log('Found h1 elements:', h1Elements.length);
    
    for (let i = 0; i < h1Elements.length; i++) {
      const h1Text = await h1Elements[i].textContent();
      console.log(`H1 ${i + 1}:`, h1Text);
    }
    
    // Check for any specific elements that might indicate the gradebook system
    const dashboardElements = await page.locator('[class*="dashboard"], [class*="gradebook"], [id*="dashboard"]').all();
    console.log('Found dashboard-related elements:', dashboardElements.length);
    
    // Check for any buttons that might be from the gradebook system
    const buttons = await page.locator('button').all();
    console.log('Found buttons:', buttons.length);
    
    for (let i = 0; i < Math.min(buttons.length, 5); i++) {
      const buttonText = await buttons[i].textContent();
      console.log(`Button ${i + 1}:`, buttonText);
    }
    
    // Check for any specific gradebook system indicators
    const gradebookIndicators = await page.locator('text=System Status, text=Quick Statistics, text=Progress Overview').all();
    console.log('Found gradebook indicators:', gradebookIndicators.length);
    
    // Wait a bit to see if there are any dynamic loads
    await page.waitForTimeout(5000);
    
    // Take another screenshot after waiting
    await page.screenshot({ 
      path: 'test-results/mcp-output/screenshots/connection-test-after-wait.png',
      fullPage: true 
    });
    
    // Final content check
    const finalContent = await page.locator('body').textContent();
    console.log('Final content length:', finalContent?.length || 0);
    
    // This test is mainly for analysis, so we'll pass as long as we got some response
    expect(pageTitle).toBeDefined();
    expect(pageUrl).toBeDefined();
  });

  test('Should test direct gradebook URL access', async ({ page }) => {
    console.log('Testing direct gradebook URL access...');
    
    // Test the exact URL with explicit parameters
    const directUrl = 'https://script.google.com/macros/s/AKfycbwQD6FGVvt3R4_L5RGS8BB7yapJlE8S9gd4E8HyJRI/exec';
    
    await page.goto(directUrl, { waitUntil: 'networkidle' });
    
    const pageTitle = await page.title();
    const pageUrl = page.url();
    
    console.log('Direct URL Page Title:', pageTitle);
    console.log('Direct URL Page URL:', pageUrl);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/mcp-output/screenshots/direct-url-test.png',
      fullPage: true 
    });
    
    // Check if we're being redirected somewhere
    if (pageUrl !== directUrl) {
      console.log('URL was redirected from:', directUrl);
      console.log('URL redirected to:', pageUrl);
    }
    
    // Look for any error messages
    const errorMessages = await page.locator('text=error, text=Error, text=ERROR').all();
    console.log('Found error messages:', errorMessages.length);
    
    // Look for any loading indicators
    const loadingIndicators = await page.locator('text=loading, text=Loading, text=LOADING').all();
    console.log('Found loading indicators:', loadingIndicators.length);
    
    // Wait for any potential dynamic content
    await page.waitForTimeout(10000);
    
    // Final screenshot
    await page.screenshot({ 
      path: 'test-results/mcp-output/screenshots/direct-url-test-final.png',
      fullPage: true 
    });
    
    expect(pageTitle).toBeDefined();
  });

  test('Should analyze page structure for gradebook elements', async ({ page }) => {
    console.log('Analyzing page structure...');
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Wait for potential dynamic content
    await page.waitForTimeout(5000);
    
    // Check for common gradebook system elements
    const potentialElements = [
      'h1',
      'h2',
      'h3',
      'button',
      'input',
      'select',
      'form',
      'table',
      'div[class*="card"]',
      'div[class*="dashboard"]',
      'div[class*="system"]',
      'div[class*="gradebook"]',
      'span[class*="status"]',
      'span[class*="indicator"]'
    ];
    
    const elementAnalysis = {};
    
    for (const selector of potentialElements) {
      const elements = await page.locator(selector).all();
      elementAnalysis[selector] = elements.length;
      
      if (elements.length > 0 && elements.length <= 5) {
        console.log(`\n${selector} elements (${elements.length}):`);
        for (let i = 0; i < elements.length; i++) {
          const text = await elements[i].textContent();
          const className = await elements[i].getAttribute('class');
          console.log(`  ${i + 1}. Text: "${text?.substring(0, 50) || 'N/A'}" | Class: "${className || 'N/A'}"`);
        }
      } else if (elements.length > 5) {
        console.log(`\n${selector}: Found ${elements.length} elements (showing first 3):`);
        for (let i = 0; i < 3; i++) {
          const text = await elements[i].textContent();
          console.log(`  ${i + 1}. "${text?.substring(0, 50) || 'N/A'}"`);
        }
      }
    }
    
    // Generate analysis report
    console.log('\n=== ELEMENT ANALYSIS SUMMARY ===');
    for (const [selector, count] of Object.entries(elementAnalysis)) {
      console.log(`${selector}: ${count} elements`);
    }
    
    // Take detailed screenshot
    await page.screenshot({ 
      path: 'test-results/mcp-output/screenshots/structure-analysis.png',
      fullPage: true 
    });
    
    expect(Object.keys(elementAnalysis).length).toBeGreaterThan(0);
  });

});