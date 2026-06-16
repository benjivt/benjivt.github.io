import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = 'http://127.0.0.1:5173';
const OUT = path.resolve('docs/qa/screenshots/baseline');

const sections = ['hero', 'about', 'projects', 'experience', 'interests', 'contact'];
const viewports = [
  { name: '1280', width: 1280, height: 800 },
  { name: '390', width: 390, height: 844, mobile: true },
];

async function scrollToSection(page, sectionId) {
  await page.evaluate((id) => {
    const target = document.getElementById(id);
    const headerHeight =
      document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;
    const gap = 20;
    const rect = target.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    const absoluteBottom = rect.bottom + window.scrollY;
    const scrollTop =
      id === 'contact'
        ? Math.max(absoluteBottom - window.innerHeight + gap, 0)
        : Math.max(absoluteTop - headerHeight - gap, 0);
    window.scrollTo({ top: scrollTop, behavior: 'instant' });
  }, sectionId);
  await page.waitForTimeout(400);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    await page.waitForSelector('#hero h1', { timeout: 15000 });
    await page.waitForTimeout(1500);

    for (const section of sections) {
      await scrollToSection(page, section);
      const file = path.join(OUT, `${section}-${vp.name}-pass.png`);
      await page.screenshot({ path: file, fullPage: false });
      console.log('saved', file);
    }
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
