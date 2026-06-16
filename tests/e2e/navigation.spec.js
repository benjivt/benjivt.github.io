import { expect, test } from '@playwright/test';

const navbar = (page) => page.locator('header .nav-links');

test.describe('section navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#hero')).toBeVisible({ timeout: 10_000 });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'auto' }));
  });

  test('navbar scrolls to projects and updates hash', async ({ page }) => {
    await navbar(page).getByRole('button', { name: 'Projects', exact: true }).click();

    await expect(page).toHaveURL(/#projects$/, { timeout: 10_000 });
    await expect(page.locator('#projects')).toBeInViewport({ timeout: 10_000 });
  });

  test('navbar scrolls to contact with end block alignment', async ({ page }) => {
    await navbar(page).getByRole('button', { name: 'Contact', exact: true }).click();

    await expect(page).toHaveURL(/#contact$/, { timeout: 10_000 });
    await expect(page.locator('#contact')).toBeInViewport({ timeout: 10_000 });
  });

  test('cold load with hash lands on the requested section', async ({ page }) => {
    await page.goto('/#interests');

    await expect(page).toHaveURL(/#interests$/);
    await expect(page.locator('#interests')).toBeInViewport({ timeout: 10_000 });
  });
});
