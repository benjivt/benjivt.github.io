import { expect, test } from '@playwright/test';

test.describe('contact footer regressions', () => {
  test('all six footer links visible in viewport at 390px (QA-022)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/#contact');
    await expect(page.locator('#contact')).toBeInViewport({ timeout: 10_000 });

    // Home scrolls contact with scrollBlock:end; wait for that alignment before measuring.
    await page.waitForFunction(() => {
      const contact = document.getElementById('contact');
      if (!contact) {
        return false;
      }

      const rect = contact.getBoundingClientRect();
      const bottomGap = window.innerHeight - rect.bottom;
      return Math.abs(bottomGap) <= 24;
    }, { timeout: 10_000 });

    const visibility = await page.evaluate(() => {
      const viewportHeight = window.innerHeight;
      const links = Array.from(document.querySelectorAll('#contact .footer-link-item'));
      return links.map((link) => {
        const rect = link.getBoundingClientRect();
        return rect.top >= -1 && rect.bottom <= viewportHeight + 1;
      });
    });

    expect(visibility).toHaveLength(6);
    expect(visibility.every(Boolean)).toBe(true);
  });
});
