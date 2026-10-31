import { expect, test } from '@playwright/test';

const roomReady = async (page) => {
  await expect(page.locator('canvas')).toBeVisible();
  await expect(page.getByText('Setting up the room…')).toBeHidden({ timeout: 20_000 });
};

test.describe('room portfolio', () => {
  test('loads the room with no console errors', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/');
    await roomReady(page);
    await expect(page.getByRole('heading', { name: "Benji's room" })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('a room marker opens the laptop and Escape closes it', async ({ page }) => {
    await page.goto('/');
    await roomReady(page);
    await page.getByRole('button', { name: 'Career' }).click();
    await expect(page).toHaveURL(/#career$/);
    const laptop = page.locator('.device--laptop');
    await expect(laptop.getByRole('heading', { name: 'Career', level: 1 })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(laptop).toBeHidden();
    await expect(page).not.toHaveURL(/#career$/);
  });

  test('deep link opens contact on the phone', async ({ page }) => {
    await page.goto('/#contact');
    await roomReady(page);
    const phone = page.locator('.device--phone');
    await expect(phone.getByRole('link', { name: /Email/ })).toBeVisible();
    await expect(phone.getByRole('link', { name: /Resume/ })).toHaveAttribute('href', '#resume');
  });

  test('the resume on the desk zooms in to read, without downloading', async ({ page }) => {
    await page.goto('/');
    await roomReady(page);
    await page.getByRole('button', { name: 'Resume', exact: true }).click();
    await expect(page).toHaveURL(/#resume$/);
    const controls = page.locator('.paper-controls');
    await expect(controls.getByRole('button', { name: 'Close' })).toBeVisible();
    await expect(controls.getByRole('link', { name: 'Download' })).toHaveAttribute('download', /Resume/);
    await page.keyboard.press('Escape');
    await expect(controls).toBeHidden();
  });

  test('every section opens in the room', async ({ page }) => {
    // Eleven camera flights there and back, each waiting for markers to settle; slow machines need the headroom.
    test.setTimeout(200_000);
    await page.goto('/');
    await roomReady(page);
    const sections = [
      ['Career', '.device--laptop'],
      ['Projects', '.vr'],
      ['Watching', '.device--tv'],
      ['Gaming', '.room-card'],
      ['Music', '.room-card'],
      ['Film', '.photo-controls'],
      ['Travel', '.photo-controls'],
      ['Sports', '.room-card'],
      ['Outdoors', '.room-card'],
      ['About me', '.room-card'],
      ['Contact', '.device--phone'],
    ];
    for (const [label, selector] of sections) {
      await page.getByRole('button', { name: label, exact: true }).click();
      await expect(page.locator(selector).getByRole('heading', { name: label, level: 1 })).toBeVisible({ timeout: 15_000 });
      await page.keyboard.press('Escape');
      await expect(page.locator(selector)).toBeHidden();
    }
  });
});
