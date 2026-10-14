import { defineConfig, devices } from '@playwright/test';

export const STORAGE_STATE = 'playwright/.auth/user.json';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 60000,
  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    testIdAttribute: 'data-test'
  },

  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    {
      name: 'public-chromium-desktop',
      testMatch: /.*auth\.spec\.ts/,
      use: { 
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'public-firefox-desktop',
      testMatch: /.*auth\.spec\.ts/, 
      use: { 
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'public-webkit-desktop',
      testMatch: /.*auth\.spec\.ts/,
      use: { 
        ...devices['Desktop Safari'],
      },
    },

    {
      name: 'logged-in-chromium-desktop',
      testIgnore: /.*auth\.spec\.ts/,
      use: { 
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE
      },
      dependencies: ['setup'],
    },

    {
      name: 'logged-in-firefox-desktop',
      testIgnore: /.*auth\.spec\.ts/,
      use: { 
        ...devices['Desktop Firefox'],
        storageState: STORAGE_STATE
      },
      dependencies: ['setup'],
    },

    {
      name: 'logged-in-webkit-desktop',
      testIgnore: /.*auth\.spec\.ts/,
      use: { 
        ...devices['Desktop Safari'],
        storageState: STORAGE_STATE
       },
      dependencies: ['setup'],
    },
  ],
});
