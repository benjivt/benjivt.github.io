import { expect, test } from '@playwright/test';

test('home page loads without console errors', async ({ page }) => {
  const consoleErrors = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  page.on('pageerror', (error) => {
    consoleErrors.push(error.message);
  });

  await page.goto('/');

  await expect(page).toHaveTitle(/Benjamin Adjepong/i);
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('header .nav-links')).toBeVisible();
  await expect(page.locator('#hero')).toBeVisible();

  expect(consoleErrors, `Console errors: ${consoleErrors.join('\n')}`).toEqual([]);
});
