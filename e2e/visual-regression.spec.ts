import { test, expect } from '@playwright/test';

test.describe('Visual Regression E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Basic components visual consistency', async ({ page }) => {
    const basicComponents = page.locator('#basic-components');
    await expect(basicComponents).toBeVisible();

    // Take a screenshot for visual comparison
    await expect(basicComponents).toHaveScreenshot('basic-components.png');
  });

  test('Layout scenarios visual consistency', async ({ page }) => {
    const layoutScenarios = page.locator('#layout-scenarios');
    await expect(layoutScenarios).toBeVisible();

    await expect(layoutScenarios).toHaveScreenshot('layout-scenarios.png');
  });

  test('ZStack visual layering', async ({ page }) => {
    const zstackTest = page.locator('#zstack-test');
    await expect(zstackTest).toBeVisible();

    await expect(zstackTest).toHaveScreenshot('zstack-test.png');
  });

  test('Full page visual consistency', async ({ page }) => {
    // Wait for all components to be visible
    await page.waitForSelector('.test-section');
    await expect(page.locator('.test-section')).toHaveCount(4);

    // Take full page screenshot
    await expect(page).toHaveScreenshot('full-page.png', { fullPage: true });
  });

  test('Responsive design visual consistency', async ({ page }) => {
    // Test different viewports
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1200, height: 800, name: 'desktop' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForLoadState('networkidle');

      const container = page.locator('.container');
      await expect(container).toBeVisible();

      await expect(container).toHaveScreenshot(`responsive-${viewport.name}.png`);
    }
  });
});

test.describe('React App Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/react-app.html');
  });

  test('React app visual consistency', async ({ page }) => {
    const appContainer = page.locator('.app-container');
    await expect(appContainer).toBeVisible();

    await expect(appContainer).toHaveScreenshot('react-app.png', { fullPage: true });
  });

  test('Interactive elements visual states', async ({ page }) => {
    // Test button hover states
    const primaryButton = page.locator('button:has-text("Update")').first();
    await primaryButton.hover();
    await expect(primaryButton).toHaveScreenshot('button-primary-hover.png');

    const secondaryButton = page.locator('button:has-text("Reset")');
    await secondaryButton.hover();
    await expect(secondaryButton).toHaveScreenshot('button-secondary-hover.png');
  });

  test('Layout demo sections visual consistency', async ({ page }) => {
    const demoCards = page.locator('.demo-card');
    await expect(demoCards).toHaveCount(5); // 3 item cards + 2 layout demo cards

    // Screenshot each demo card
    for (let i = 0; i < await demoCards.count(); i++) {
      const card = demoCards.nth(i);
      await expect(card).toHaveScreenshot(`demo-card-${i}.png`);
    }
  });

  test('Progress indicators visual states', async ({ page }) => {
    const progressBars = page.locator('[style*="background"]');
    await expect(progressBars).toHaveCount(3);

    // Update progress and capture new state
    const updateButton = page.locator('button:has-text("Update")').first();
    await updateButton.click();

    // Wait for any animations to complete
    await page.waitForTimeout(100);

    await expect(progressBars.first()).toHaveScreenshot('progress-bar-updated.png');
  });
});