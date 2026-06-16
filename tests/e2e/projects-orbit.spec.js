import { expect, test } from '@playwright/test';

test.describe('project orbit regressions', () => {
  test('front-most card title is readable at 390px (QA-023)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/#projects');
    await expect(page.locator('#projects')).toBeInViewport({ timeout: 10_000 });
    await expect(page.locator('.project-orbit')).toBeVisible();

    const titleReadable = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.project-orbit-card-shell'));
      if (cards.length === 0) {
        return false;
      }

      const frontCard = cards.reduce((best, card) => {
        const z = Number.parseInt(window.getComputedStyle(card.closest('.project-orbit-slot')).zIndex, 10);
        return !best || z > best.z ? { card, z } : best;
      }, null);

      if (!frontCard) {
        return false;
      }

      const title = frontCard.card.querySelector('.project-orbit-card-bottom h3');
      if (!title) {
        return false;
      }

      const titleText = title.textContent?.trim() ?? '';
      if (!titleText || titleText.length < 4) {
        return false;
      }

      const rect = title.getBoundingClientRect();
      const style = window.getComputedStyle(title);
      const lineHeight = Number.parseFloat(style.lineHeight) || 16;
      const clampLines = style.webkitLineClamp === '2' ? 2 : 1;
      const minExpectedHeight = lineHeight * Math.min(clampLines, 2) * 0.85;

      return rect.height >= minExpectedHeight && rect.width > 40;
    });

    expect(titleReadable).toBe(true);
  });
});
