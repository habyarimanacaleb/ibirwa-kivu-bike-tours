// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev. */
  use: {
    /* UPDATED: Dynamic switch between production Netlify deployment and local host */
    baseURL: process.env.CI 
      ? 'https://ibirwa-kivu-bike-tours.netlify.app' 
      : 'http://localhost:5173',

    /* Collect trace when retrying the failed test. See https://playwright.dev */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* UPDATED: Only spin up local server if running locally. CI runs against live Netlify deployment */
  webServer: !process.env.CI ? {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  } : undefined,
});
