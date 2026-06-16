import { expect, test } from '@playwright/test';

test.describe('experience map regressions', () => {
  test('bottom map node visible at 1280px without dragging (QA-024)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/#experience');
    await expect(page.locator('#experience')).toBeInViewport({ timeout: 10_000 });
    await expect(page.locator('.experience-map-viewport')).toBeVisible();

    // Allow intro pan / default pan to settle.
    await page.waitForTimeout(2500);

    const bottomNodeVisible = await page.evaluate(() => {
      const viewport = document.querySelector('.experience-map-viewport');
      const nodes = Array.from(document.querySelectorAll('.experience-map-node:not(.is-origin)'));
      if (!viewport || nodes.length === 0) {
        return false;
      }

      const viewportRect = viewport.getBoundingClientRect();
      const bottomNode = nodes.reduce((lowest, node) => {
        const rect = node.getBoundingClientRect();
        return !lowest || rect.bottom > lowest.rect.bottom ? { node, rect } : lowest;
      }, null);

      if (!bottomNode) {
        return false;
      }

      const label = bottomNode.node.querySelector('.experience-map-node-label');
      const labelRect = label?.getBoundingClientRect();
      const nodeBottom = Math.max(bottomNode.rect.bottom, labelRect?.bottom ?? bottomNode.rect.bottom);

      return (
        bottomNode.rect.top >= viewportRect.top &&
        nodeBottom <= viewportRect.bottom &&
        bottomNode.rect.left >= viewportRect.left &&
        bottomNode.rect.right <= viewportRect.right
      );
    });

    expect(bottomNodeVisible).toBe(true);
  });
});
