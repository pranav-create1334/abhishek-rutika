import { existsSync } from 'node:fs';
import { defineConfig } from '@playwright/test';

// Use a locally installed browser when Playwright's own Chromium hasn't been
// downloaded yet. Override with PLAYWRIGHT_CHROMIUM_PATH if needed.
const installedBrowserPath =
  process.env.PLAYWRIGHT_CHROMIUM_PATH ??
  [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ].find((candidate) => existsSync(candidate));

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: { timeout: 6_000 },
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    browserName: 'chromium',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    launchOptions: installedBrowserPath ? { executablePath: installedBrowserPath } : {},
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  projects: [
    {
      name: 'mobile-375',
      use: {
        viewport: { width: 375, height: 812 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'mobile-414',
      use: {
        viewport: { width: 414, height: 896 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'reduced-motion',
      use: {
        viewport: { width: 375, height: 812 },
        reducedMotion: 'reduce',
      },
    },
  ],
});
