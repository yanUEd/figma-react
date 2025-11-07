import { test, expect } from '@playwright/test';

test.describe('Basic Components E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('page loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/figma-react-layout Test Page/);
    await expect(page.locator('h1')).toContainText('figma-react-layout Test Page');
  });

  test('basic box component is visible', async ({ page }) => {
    const basicBox = page.getByTestId('basic-box');
    await expect(basicBox).toBeVisible();
    await expect(basicBox).toContainText('Basic Box Component');
  });

  test('basic row component is visible', async ({ page }) => {
    const basicRow = page.getByTestId('basic-row');
    await expect(basicRow).toBeVisible();

    const rowItems = basicRow.locator('.demo-box');
    await expect(rowItems).toHaveCount(3);
    await expect(rowItems.nth(0)).toContainText('Item 1');
    await expect(rowItems.nth(1)).toContainText('Item 2');
    await expect(rowItems.nth(2)).toContainText('Item 3');
  });

  test('basic column component is visible', async ({ page }) => {
    const basicColumn = page.getByTestId('basic-column');
    await expect(basicColumn).toBeVisible();

    const columnItems = basicColumn.locator('.demo-box');
    await expect(columnItems).toHaveCount(3);
    await expect(columnItems.nth(0)).toContainText('Top');
    await expect(columnItems.nth(1)).toContainText('Middle');
    await expect(columnItems.nth(2)).toContainText('Bottom');
  });

  test('layout scenarios are visible', async ({ page }) => {
    const layoutColumn = page.getByTestId('layout-column');
    await expect(layoutColumn).toBeVisible();

    await expect(layoutColumn.locator('text=Header')).toBeVisible();
    await expect(layoutColumn.locator('text=Content Left')).toBeVisible();
    await expect(layoutColumn.locator('text=Content Right')).toBeVisible();
    await expect(layoutColumn.locator('text=Footer')).toBeVisible();
  });

  test('zstack component is visible', async ({ page }) => {
    const zstack = page.getByTestId('zstack');
    await expect(zstack).toBeVisible();

    const zstackItems = zstack.locator('.zstack-item');
    await expect(zstackItems).toHaveCount(3);
    await expect(zstackItems.nth(0)).toContainText('Background');
    await expect(zstackItems.nth(1)).toContainText('Foreground');
    await expect(zstackItems.nth(2)).toContainText('Centered Content');
  });

  test('zstack items are properly layered', async ({ page }) => {
    const zstack = page.getByTestId('zstack');
    const zstackItems = zstack.locator('.zstack-item');

    // Check that items are positioned correctly (using z-index)
    const firstItem = zstackItems.nth(0);
    const secondItem = zstackItems.nth(1);
    const thirdItem = zstackItems.nth(2);

    await expect(firstItem).toHaveCSS('top', '0px');
    await expect(firstItem).toHaveCSS('left', '0px');

    await expect(secondItem).toHaveCSS('top', '20px');
    await expect(secondItem).toHaveCSS('left', '20px');

    await expect(thirdItem).toHaveCSS('top', '40px');
    await expect(thirdItem).toHaveCSS('left', '40px');
  });

  test('test sections are properly styled', async ({ page }) => {
    const testSections = page.locator('.test-section');
    await expect(testSections).toHaveCount(4);

    // Check that each section has proper styling
    for (let i = 0; i < await testSections.count(); i++) {
      const section = testSections.nth(i);
      await expect(section).toHaveCSS('background-color', 'rgb(255, 255, 255)');
      await expect(section).toHaveCSS('border-radius', '8px');
    }
  });

  test('container has proper layout', async ({ page }) => {
    const container = page.locator('.container');
    await expect(container).toBeVisible();
    await expect(container).toHaveCSS('max-width', '1200px');
    await expect(container).toHaveCSS('margin', '0px auto');
  });
});

test.describe('Accessibility E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('page has proper heading structure', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
  });

  test('components have proper text content', async ({ page }) => {
    const basicBox = page.getByTestId('basic-box');
    await expect(basicBox).toHaveText(/Basic Box Component/);

    const basicRow = page.getByTestId('basic-row');
    const rowItems = basicRow.locator('.demo-box');
    await expect(rowItems.nth(0)).toHaveText(/Item 1/);
  });

  test('page is responsive on different viewports', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.container')).toBeVisible();

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.container')).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('.container')).toBeVisible();
  });
});

test.describe('Performance E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('page loads within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.waitForLoad();
    const loadTime = Date.now() - startTime;

    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('no console errors on page load', async ({ page }) => {
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
});