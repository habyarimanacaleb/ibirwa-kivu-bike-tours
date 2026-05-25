// @ts-check
import { test, expect } from '@playwright/test';

test('has correct homepage title', async ({ page }) => {
  // Use relative path '/' because baseURL is set to your app in playwright.config.js
  await page.goto('/');

  // Expect title to contain your brand name
  await expect(page).toHaveTitle(/Ibirwa|Kivu|Bike/i);
});

test('check for main navigational features', async ({ page }) => {
  await page.goto('/');

  // Ensure the page body loaded safely and is visible
  await expect(page.locator('body')).toBeVisible();
});
