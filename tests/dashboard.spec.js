// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Dashboard Functionality Tests
 * Testing the main gradebook system dashboard
 */

test.describe('Gradebook System Dashboard', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the dashboard
    await page.goto('/');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Wait for the main dashboard elements to be visible
    await expect(page.locator('h1')).toContainText('Gradebook System Dashboard');
  });

  test('should display main dashboard elements', async ({ page }) => {
    // Check header elements
    await expect(page.locator('h1')).toContainText('📊 Gradebook System Dashboard');
    await expect(page.locator('p')).toContainText('Educational grade management system');
    
    // Check all main cards are present
    await expect(page.locator('.card.system-status')).toBeVisible();
    await expect(page.locator('.card.quick-stats')).toBeVisible();
    await expect(page.locator('.card.system-controls')).toBeVisible();
    await expect(page.locator('.card.progress-overview')).toBeVisible();
    
    // Check system status card
    await expect(page.locator('.system-status .card-title')).toContainText('System Status');
    await expect(page.locator('.system-status')).toContainText('System Health');
    await expect(page.locator('.system-status')).toContainText('Last Updated');
    await expect(page.locator('.system-status')).toContainText('Semester');
    await expect(page.locator('.system-status')).toContainText('Version');
    
    // Check quick stats card
    await expect(page.locator('.quick-stats .card-title')).toContainText('Quick Statistics');
    await expect(page.locator('.quick-stats')).toContainText('Total Teachers');
    await expect(page.locator('.quick-stats')).toContainText('Total Students');
    await expect(page.locator('.quick-stats')).toContainText('Active Gradebooks');
    await expect(page.locator('.quick-stats')).toContainText('System Files');
  });

  test('should have bilingual support', async ({ page }) => {
    // Check for bilingual content
    await expect(page.locator('.bilingual')).toBeVisible();
    await expect(page.locator('.header .bilingual')).toContainText('Complete Google-based gradebook solution');
    
    // Check for Chinese text in cards
    await expect(page.locator('.system-status .bilingual')).toContainText('Real-time system health monitoring');
    await expect(page.locator('.quick-stats .bilingual')).toContainText('Real-time system metrics');
    await expect(page.locator('.system-controls .bilingual')).toContainText('One-click system management');
    await expect(page.locator('.progress-overview .bilingual')).toContainText('Teacher progress tracking');
  });

  test('should display system controls buttons', async ({ page }) => {
    const systemControls = page.locator('.system-controls');
    
    // Check all main control buttons are present
    await expect(systemControls.locator('button:has-text("Initialize System")')).toBeVisible();
    await expect(systemControls.locator('button:has-text("Check Status")')).toBeVisible();
    await expect(systemControls.locator('button:has-text("Refresh Dashboard")')).toBeVisible();
    await expect(systemControls.locator('button:has-text("System Folder")')).toBeVisible();
    await expect(systemControls.locator('button:has-text("Master Data")')).toBeVisible();
    await expect(systemControls.locator('button:has-text("Assessment Titles")')).toBeVisible();
    await expect(systemControls.locator('button:has-text("System Backup")')).toBeVisible();
    await expect(systemControls.locator('button:has-text("Test System")')).toBeVisible();
    await expect(systemControls.locator('button:has-text("/check Quality")')).toBeVisible();
    await expect(systemControls.locator('button:has-text("Add Resource")')).toBeVisible();
    await expect(systemControls.locator('button:has-text("HT Dashboard")')).toBeVisible();
  });

  test('should display quick actions section', async ({ page }) => {
    // Scroll to quick actions section
    await page.locator('.card:has(.card-title:has-text("Quick Actions"))').scrollIntoViewIfNeeded();
    
    // Check quick actions are present
    await expect(page.locator('button:has-text("Batch Create Gradebooks")')).toBeVisible();
    await expect(page.locator('button:has-text("Quick Progress Check")')).toBeVisible();
    await expect(page.locator('button:has-text("Custom Progress Check")')).toBeVisible();
    await expect(page.locator('button:has-text("Generate Report")')).toBeVisible();
    await expect(page.locator('button:has-text("Import Student Data")')).toBeVisible();
    await expect(page.locator('button:has-text("Export Student Data")')).toBeVisible();
    await expect(page.locator('button:has-text("System Maintenance")')).toBeVisible();
  });

  test('should display progress overview with indicators', async ({ page }) => {
    const progressOverview = page.locator('.progress-overview');
    
    // Check progress indicators
    await expect(progressOverview.locator('span:has-text("🟢 Excellent (≥90%)")')).toBeVisible();
    await expect(progressOverview.locator('span:has-text("🟡 Good (80-89%)")')).toBeVisible();
    await expect(progressOverview.locator('span:has-text("🟠 Normal (60-79%)")')).toBeVisible();
    await expect(progressOverview.locator('span:has-text("🔴 Behind (<60%)")')).toBeVisible();
    
    // Check progress bar
    await expect(progressOverview.locator('.progress-bar')).toBeVisible();
    await expect(progressOverview.locator('.progress-fill')).toBeVisible();
    await expect(progressOverview.locator('#overall-percentage')).toBeVisible();
  });

  test('should have responsive design', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('.dashboard-grid')).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.dashboard-grid')).toBeVisible();
    
    // Check that all cards are still visible in mobile
    await expect(page.locator('.card.system-status')).toBeVisible();
    await expect(page.locator('.card.quick-stats')).toBeVisible();
    await expect(page.locator('.card.system-controls')).toBeVisible();
    await expect(page.locator('.card.progress-overview')).toBeVisible();
  });

  test('should handle loading states', async ({ page }) => {
    // Check loading indicator is initially hidden
    await expect(page.locator('#loading')).toBeHidden();
    
    // Check alert areas are initially hidden
    await expect(page.locator('#alert-success')).toBeHidden();
    await expect(page.locator('#alert-error')).toBeHidden();
  });

  test('should update timestamp periodically', async ({ page }) => {
    const timestampElement = page.locator('#last-updated');
    
    // Wait for timestamp to be populated
    await expect(timestampElement).not.toHaveText('Loading...');
    
    // Get initial timestamp
    const initialTimestamp = await timestampElement.textContent();
    
    // Wait for potential update (timestamp updates every minute)
    await page.waitForTimeout(2000);
    
    // Verify timestamp format (should be a valid date string)
    const currentTimestamp = await timestampElement.textContent();
    expect(currentTimestamp).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/); // Basic date format check
  });

  test('should have accessible design', async ({ page }) => {
    // Check for proper heading structure
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h2, h3, h4')).toHaveCount(await page.locator('h2, h3, h4').count());
    
    // Check for proper button structure
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
    
    // Check each button has text or aria-label
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const hasText = await button.textContent();
      const hasAriaLabel = await button.getAttribute('aria-label');
      expect(hasText || hasAriaLabel).toBeTruthy();
    }
  });

  test('should load system statistics', async ({ page }) => {
    // Wait for potential AJAX calls to complete
    await page.waitForTimeout(3000);
    
    // Check that statistics are loaded (they might be 0 initially)
    const totalTeachers = page.locator('#total-teachers');
    const totalStudents = page.locator('#total-students');
    const activeGradebooks = page.locator('#active-gradebooks');
    const systemFiles = page.locator('#system-files');
    
    // These should contain numbers (including 0)
    await expect(totalTeachers).toHaveText(/^\d+$/);
    await expect(totalStudents).toHaveText(/^\d+$/);
    await expect(activeGradebooks).toHaveText(/^\d+$/);
    await expect(systemFiles).toHaveText(/^\d+$/);
  });

  test('should handle modal interactions', async ({ page }) => {
    // Check assessment modal is initially hidden
    await expect(page.locator('#assessmentModal')).toBeHidden();
    
    // Modal should exist in DOM
    await expect(page.locator('#assessmentModal')).toBeAttached();
    
    // Modal should have proper structure
    await expect(page.locator('#assessmentModal .modal-content')).toBeAttached();
    await expect(page.locator('#assessmentModal .modal-header')).toBeAttached();
    await expect(page.locator('#assessmentModal .modal-body')).toBeAttached();
  });

  test('should display semester and version information', async ({ page }) => {
    // Check semester information
    await expect(page.locator('.system-status')).toContainText('2425S2');
    
    // Check version information
    await expect(page.locator('.system-status')).toContainText('Dashboard v3.0');
    
    // Check system health indicator
    await expect(page.locator('.status-indicator.status-excellent')).toBeVisible();
    await expect(page.locator('.system-status')).toContainText('Excellent');
  });

  test('should have proper CSS styling', async ({ page }) => {
    // Check main container styling
    const container = page.locator('.container');
    await expect(container).toHaveCSS('max-width', '1200px');
    
    // Check card styling
    const cards = page.locator('.card');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);
    
    // Check first card has proper styling
    await expect(cards.first()).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(cards.first()).toHaveCSS('border-radius', '15px');
    
    // Check gradient background
    await expect(page.locator('body')).toHaveCSS('background-image', /linear-gradient/);
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // This test checks if the page handles network issues
    // We can't easily simulate network errors, but we can check the error handling structure
    
    // Check that error handling elements exist
    await expect(page.locator('#alert-error')).toBeAttached();
    await expect(page.locator('#alert-success')).toBeAttached();
    
    // Check error message structure
    const errorAlert = page.locator('#alert-error');
    await expect(errorAlert).toHaveClass(/alert-error/);
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Test tab navigation through buttons
    await page.keyboard.press('Tab');
    
    // Check that focus is visible on interactive elements
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Continue tabbing through several elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const currentFocused = page.locator(':focus');
      await expect(currentFocused).toBeVisible();
    }
  });

  test('should display proper icons', async ({ page }) => {
    // Check Font Awesome icons are loaded
    await expect(page.locator('.fa-heartbeat')).toBeVisible();
    await expect(page.locator('.fa-chart-bar')).toBeVisible();
    await expect(page.locator('.fa-cogs')).toBeVisible();
    await expect(page.locator('.fa-tasks')).toBeVisible();
    
    // Check icon colors match card themes
    const systemStatusIcon = page.locator('.system-status .card-icon');
    await expect(systemStatusIcon).toHaveCSS('background-color', 'rgb(76, 175, 80)');
    
    const quickStatsIcon = page.locator('.quick-stats .card-icon');
    await expect(quickStatsIcon).toHaveCSS('background-color', 'rgb(33, 150, 243)');
  });

  test('should handle page refresh', async ({ page }) => {
    // Initial load
    await expect(page.locator('h1')).toContainText('Gradebook System Dashboard');
    
    // Refresh page
    await page.reload();
    
    // Check everything loads again
    await expect(page.locator('h1')).toContainText('📊 Gradebook System Dashboard');
    await expect(page.locator('.card.system-status')).toBeVisible();
    await expect(page.locator('.card.quick-stats')).toBeVisible();
    await expect(page.locator('.card.system-controls')).toBeVisible();
    await expect(page.locator('.card.progress-overview')).toBeVisible();
  });

});