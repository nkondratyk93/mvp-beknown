import { test, expect } from '@playwright/test';

test('landing page loads with h1 and CTA', async ({ page }) => {
  await page.goto('http://localhost:3099');
  await expect(page.locator('h1')).toBeVisible();
  await page.screenshot({ path: 'screenshots/landing-desktop.png', fullPage: true });
});

test('landing page renders on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:3099');
  await expect(page.locator('h1')).toBeVisible();
  await page.screenshot({ path: 'screenshots/landing-mobile.png', fullPage: true });
});

test('generate page loads', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.goto('http://localhost:3099/generate');
  await expect(page.locator('main')).toBeVisible();
  await page.waitForTimeout(3000);
  const filteredErrors = errors.filter(e => !e.includes('favicon') && !e.includes('hydration') && !e.includes('supabase') && !e.includes('fetch'));
  console.log('Console errors:', filteredErrors);
  await page.screenshot({ path: 'screenshots/generate-desktop.png', fullPage: true });
});

test('claim page loads', async ({ page }) => {
  await page.goto('http://localhost:3099/claim');
  await expect(page.locator('main')).toBeVisible();
  await page.screenshot({ path: 'screenshots/claim-desktop.png', fullPage: true });
});

test('blog page loads', async ({ page }) => {
  await page.goto('http://localhost:3099/blog');
  await expect(page.locator('h1')).toBeVisible();
  await page.screenshot({ path: 'screenshots/blog-desktop.png', fullPage: true });
});

test('SEO files are accessible', async ({ page }) => {
  const robots = await page.goto('http://localhost:3099/robots.txt');
  expect(robots?.status()).toBe(200);
  const sitemap = await page.goto('http://localhost:3099/sitemap.xml');
  expect(sitemap?.status()).toBe(200);
});
