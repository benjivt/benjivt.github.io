import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = 'http://127.0.0.1:5173';
const OUT = path.resolve('docs/qa/screenshots/baseline');
const FAIL = path.resolve('docs/qa/screenshots/failures');

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
  await page.waitForTimeout(500);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  await mkdir(FAIL, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#hero h1', { timeout: 15000 });
  await page.waitForTimeout(1500);

  // Orbit edge: scroll projects ~40% off top
  await scrollToSection(page, 'projects');
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    const mid = el.offsetTop + el.offsetHeight * 0.35;
    window.scrollTo({ top: mid, behavior: 'instant' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(OUT, 'projects-orbit-edge-1280-pass.png'),
  });

  // Orbit expanded pin
  await scrollToSection(page, 'projects');
  await page.locator('[aria-label*="Expand project details"]').first().click({ force: true });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(OUT, 'projects-orbit-expanded-1280-pass.png'),
  });

  // Experience map popup
  await scrollToSection(page, 'experience');
  await page
    .getByRole('button', {
      name: 'Software for Hardware Engineer (Full-time), Microsoft, 2026 - Present, Redmond, WA',
    })
    .click({ force: true });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(OUT, 'experience-popup-1280-pass.png'),
  });

  // Hobby deck hover fan (desktop)
  await scrollToSection(page, 'interests');
  await page.evaluate(() => {
    document.querySelector('.hobbies-zone, .hobby-deck')?.scrollIntoView({ block: 'center' });
  });
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.hobby-deck-card')];
    cards[3]?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    cards[3]?.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUT, 'interests-hobby-fan-1280-pass.png'),
  });

  // Hobby deck pinned expand
  await page.locator('.hobby-deck-card').nth(3).click({ force: true });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(OUT, 'interests-hobby-expanded-1280-pass.png'),
  });

  // Contact footer scroll-in (mid reveal)
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight - 900, behavior: 'instant' }));
  await page.waitForTimeout(300);
  await page.screenshot({
    path: path.join(OUT, 'contact-scroll-in-1280-pass.png'),
  });
  await scrollToSection(page, 'contact');
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(OUT, 'contact-footer-1280-pass.png'),
  });

  // Mobile regression states
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE}/#experience`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page
    .getByRole('button', {
      name: 'Software for Hardware Engineer (Full-time), Microsoft, 2026 - Present, Redmond, WA',
    })
    .click({ force: true });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUT, 'experience-popup-390-pass.png'),
  });

  await page.goto(`${BASE}/#interests`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.locator('.hobby-deck-card').nth(2).click();
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(OUT, 'interests-hobby-expanded-390-pass.png'),
  });

  await page.goto(`${BASE}/#projects`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    window.scrollTo({ top: el.offsetTop + el.offsetHeight * 0.4, behavior: 'instant' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(OUT, 'projects-orbit-edge-390-pass.png'),
  });

  await browser.close();
  console.log('regression captures done');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
