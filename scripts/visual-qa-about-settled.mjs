import { chromium } from '@playwright/test';
import path from 'node:path';

const BASE = 'http://127.0.0.1:5173';
const OUT = path.resolve('docs/qa/screenshots/baseline/about-390-pass-settled.png');

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE}/#about`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: OUT });
  await browser.close();
  console.log('saved', OUT);
}

main();
