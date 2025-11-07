import { test, expect } from '@playwright/test';

test.describe('React Components E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/react-app.html');
  });

  test('React app loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/React App Test - figma-react-layout/);
    await expect(page.locator('h1')).toContainText('React Layout Test App');
  });

  test('Interactive count functionality works', async ({ page }) => {
    const countButton = page.locator('button:has-text("Count:")');
    await expect(countButton).toBeVisible();

    // Initial count should be 0
    await expect(countButton).toContainText('Count: 0');

    // Click to increment
    await countButton.click();
    await expect(countButton).toContainText('Count: 1');

    // Double button should work
    const doubleButton = page.locator('button:has-text("Double")');
    await doubleButton.click();
    await expect(countButton).toContainText('Count: 2');

    // Reset button should work
    const resetButton = page.locator('button:has-text("Reset")');
    await resetButton.click();
    await expect(countButton).toContainText('Count: 0');
  });

  test('Progress update functionality works', async ({ page }) => {
    const updateButtons = page.locator('button:has-text("Update")');
    await expect(updateButtons).toHaveCount(3);

    // Click first update button
    await updateButtons.first().click();

    // Check that progress indicators are visible
    const progressTexts = page.locator('text=Progress:');
    await expect(progressTexts).toHaveCount(3);
  });

  test('Column layout demo is visible', async ({ page }) => {
    const columnDemo = page.locator('text=Column Layout Demo');
    await expect(columnDemo).toBeVisible();

    // Check for layout items within column demo
    const layoutItems = page.locator('text=Header Item, Content Area, Footer Item');
    await expect(layoutItems).toHaveCount(3);
  });

  test('Row layout demo is visible', async ({ page }) => {
    const rowDemo = page.locator('text=Row Layout Demo');
    await expect(rowDemo).toBeVisible();

    // Check for layout items within row demo
    const rowItems = page.locator('text=Item 1, Item 2, Item 3');
    await expect(rowItems).toHaveCount(3);
  });

  test('Interactive controls section works', async ({ page }) => {
    const controlsSection = page.locator('text=Interactive Controls');
    await expect(controlsSection).toBeVisible();

    // All control buttons should be present
    const countButton = page.locator('button:has-text("Count:")');
    const resetButton = page.locator('button:has-text("Reset")');
    const doubleButton = page.locator('button:has-text("Double")');

    await expect(countButton).toBeVisible();
    await expect(resetButton).toBeVisible();
    await expect(doubleButton).toBeVisible();
  });

  test('App styling and layout is responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.app-container')).toBeVisible();

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.app-container')).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('.app-container')).toBeVisible();
  });

  test('No console errors on React app load', async ({ page }) => {
    const messages = [];
    page.on('console', msg => {
      messages.push({ type: msg.type(), text: msg.text() });
    });

    await page.reload();
    await page.waitForLoad();

    // Check for error messages
    const errorMessages = messages.filter(msg => msg.type === 'error');
    expect(errorMessages).toHaveLength(0);
  });

  test('FigmaReactLayout components are properly integrated', async ({ page }) => {
    // Check if FigmaReactLayout is available globally
    const figmaReactExists = await page.evaluate(() => {
      return typeof window.FigmaReactLayout !== 'undefined';
    });

    expect(figmaReactExists).toBe(true);
  });

  test('Progress visualization updates correctly', async ({ page }) => {
    const progressBars = page.locator('[style*="background"]');
    await expect(progressBars).toHaveCount(3); // One for each card's progress indicator

    // Update progress and check changes
    const updateButtons = page.locator('button:has-text("Update")');
    await updateButtons.first().click();

    // Progress bars should still be visible after update
    await expect(progressBars).toHaveCount(3);
  });
});