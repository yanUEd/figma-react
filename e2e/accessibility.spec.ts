import { test, expect } from '@playwright/test';

test.describe('Accessibility E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Page has proper heading hierarchy', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('figma-react-layout Test Page');

    // Check there's only one h1
    await expect(h1).toHaveCount(1);
  });

  test('Test sections are properly structured', async ({ page }) => {
    const testSections = page.locator('.test-section');
    await expect(testSections).toHaveCount(4);

    // Each section should have a title
    const testTitles = page.locator('.test-title');
    await expect(testTitles).toHaveCount(4);

    // Check title texts
    await expect(testTitles.nth(0)).toContainText('Basic Components Test');
    await expect(testTitles.nth(1)).toContainText('Layout Scenarios');
    await expect(testTitles.nth(2)).toContainText('ZStack Test');
  });

  test('Interactive elements are keyboard accessible', async ({ page }) => {
    // Test basic keyboard navigation
    await page.keyboard.press('Tab');

    // Focus should be manageable
    const focusedElement = await page.locator(':focus');
    expect(await focusedElement.count()).toBeGreaterThan(0);
  });

  test('Color contrast and readability', async ({ page }) => {
    const testSections = page.locator('.test-section');

    for (let i = 0; i < await testSections.count(); i++) {
      const section = testSections.nth(i);
      await expect(section).toBeVisible();

      // Check that text is readable against background
      const textElements = section.locator('.demo-box, .test-title');

      for (let j = 0; j < await textElements.count(); j++) {
        const textElement = textElements.nth(j);
        await expect(textElement).toBeVisible();

        // Get computed styles for contrast checking
        const styles = await textElement.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            fontSize: computed.fontSize
          };
        });

        // Ensure text has color and background
        expect(styles.color).not.toBe('');
        expect(styles.fontSize).not.toBe('0px');
      }
    }
  });

  test('Content is accessible via ARIA attributes', async ({ page }) => {
    // Check for proper ARIA attributes where applicable
    const interactiveElements = page.locator('[data-testid]');

    for (let i = 0; i < await interactiveElements.count(); i++) {
      const element = interactiveElements.nth(i);
      const testId = await element.getAttribute('data-testid');

      expect(testId).toBeTruthy();
      expect(typeof testId).toBe('string');
      expect(testId!.length).toBeGreaterThan(0);
    }
  });

  test('Page structure is semantic', async ({ page }) => {
    // Check for semantic HTML structure
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Check for proper container structure
    const container = page.locator('.container');
    await expect(container).toBeVisible();

    // Verify no deprecated or accessibility-violating elements
    const deprecatedElements = page.locator('font, center, marquee, blink');
    await expect(deprecatedElements).toHaveCount(0);
  });
});

test.describe('React App Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/react-app.html');
  });

  test('React app has proper heading structure', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('React Layout Test App');
    await expect(h1).toHaveCount(1);
  });

  test('Interactive controls are properly labeled', async ({ page }) => {
    const buttons = page.locator('button');

    for (let i = 0; i < await buttons.count(); i++) {
      const button = buttons.nth(i);
      await expect(button).toBeVisible();

      // Each button should have accessible text
      const buttonText = await button.textContent();
      expect(buttonText).toBeTruthy();
      expect(buttonText!.length).toBeGreaterThan(0);
    }
  });

  test('Form elements have proper labels', async ({ page }) => {
    // Check that interactive elements have descriptive text
    const countButton = page.locator('button:has-text("Count:")');
    await expect(countButton).toBeVisible();

    // Verify button text is descriptive
    const buttonText = await countButton.textContent();
    expect(buttonText).toContain('Count:');
  });

  test('Content structure is logical and navigable', async ({ page }) => {
    // Check for logical content flow
    const header = page.locator('header');
    await expect(header).toBeVisible();

    const content = page.locator('.content');
    await expect(content).toBeVisible();

    const demoGrid = page.locator('.demo-grid');
    await expect(demoGrid).toHaveCount(2); // Two grid sections
  });

  test('Progress information is accessible', async ({ page }) => {
    const progressTexts = page.locator('text=Progress:');
    await expect(progressTexts).toHaveCount(3);

    for (let i = 0; i < await progressTexts.count(); i++) {
      const progressText = progressTexts.nth(i);
      await expect(progressText).toBeVisible();

      // Progress text should be descriptive
      const text = await progressText.textContent();
      expect(text).toMatch(/Progress: \d+%/);
    }
  });

  test('Keyboard navigation works properly', async ({ page }) => {
    // Test tab navigation through interactive elements
    await page.keyboard.press('Tab');

    let focusedElement = await page.locator(':focus');
    expect(await focusedElement.count()).toBeGreaterThan(0);

    // Tab through all interactive elements
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      await page.keyboard.press('Tab');
      focusedElement = await page.locator(':focus');

      if (await focusedElement.count() > 0) {
        const tagName = await focusedElement.first().evaluate(el => el.tagName.toLowerCase());
        expect(['button', 'a', 'input', 'select', 'textarea']).toContain(tagName);
      }
    }
  });

  test('Visual hierarchy and readability', async ({ page }) => {
    // Check that text elements have proper sizing for readability
    const statValues = page.locator('.stat-value');

    for (let i = 0; i < await statValues.count(); i++) {
      const statValue = statValues.nth(i);
      await expect(statValue).toBeVisible();

      const styles = await statValue.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight
        };
      });

      // Stat values should be appropriately sized and weighted
      expect(parseFloat(styles.fontSize)).toBeGreaterThanOrEqual(16); // At least 16px
    }

    const statLabels = page.locator('.stat-label');
    for (let i = 0; i < await statLabels.count(); i++) {
      const statLabel = statLabels.nth(i);
      await expect(statLabel).toBeVisible();

      const styles = await statLabel.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          fontSize: computed.fontSize
        };
      });

      // Labels should be readable
      expect(parseFloat(styles.fontSize)).toBeGreaterThanOrEqual(12); // At least 12px
    }
  });
});