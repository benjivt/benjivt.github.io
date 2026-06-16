import { expect, test } from '@playwright/test';

test.describe('accessibility regressions', () => {
  test('skip link focuses and jumps to main landmark (QA-006)', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#hero')).toBeVisible({ timeout: 10_000 });

    const skipLink = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skipLink).toBeAttached();

    await skipLink.focus();
    await expect(skipLink).toBeFocused();

    // Skip link is off-screen until :focus; activate without visibility-gated click.
    await skipLink.click({ force: true });

    await expect(page).toHaveURL(/#main$/);
    await expect(page.locator('#main')).toBeInViewport();
    await expect(page.locator('#main')).toHaveAttribute('id', 'main');
  });

  test('footer links meet 44px min-height on mobile (QA-018)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/#contact');
    await expect(page.locator('#contact')).toBeInViewport({ timeout: 10_000 });

    const minHeights = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('#contact .footer-link-item'));
      return links.map((link) => link.getBoundingClientRect().height);
    });

    expect(minHeights.length).toBeGreaterThan(0);
    for (const height of minHeights) {
      expect(Math.ceil(height)).toBeGreaterThanOrEqual(44);
    }
  });
});
