import { expect, test } from '@playwright/test';

test.describe('routing regressions', () => {
  test('unknown path redirects to home (QA-005)', async ({ page }) => {
    await page.goto('/xyz');

    await expect(page).toHaveURL(/^http:\/\/127\.0\.0\.1:4173\/$/);
    await expect(page.locator('#hero')).toBeVisible({ timeout: 10_000 });

    const homeNav = page.locator('header .nav-links').getByRole('button', { name: 'Home', exact: true });
    await expect(homeNav).toHaveAttribute('aria-current', 'true');
  });

  test('unknown path preserves hash on redirect (QA-005)', async ({ page }) => {
    await page.goto('/xyz#projects');

    await expect(page.locator('#hero')).toBeVisible({ timeout: 10_000 });
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator('#projects')).toBeInViewport({ timeout: 10_000 });
  });
});
