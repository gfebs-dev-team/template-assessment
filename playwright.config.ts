// @ts-check
import { devices } from "@playwright/test";
import "dotenv/config";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default {
  testDir: "./playwright/e2e/tests",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html", { outputFolder: "./playwright/report" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: "check login",
    //   testMatch: /rcc\.setup\.ts/,
    // },
    {
      name: "RCC Min",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1024, height: 768 },
        launchOptions: {
          args: [`--profile-directory=${process.env.PROFILE_DIRECTORY}`],
        },
      },
      // dependencies: ["check login"],
    },

    {
      name: "RCC Default",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 960, height: 600 },
        launchOptions: {
          args: [`--profile-directory=${process.env.PROFILE_DIRECTORY}`],
        },
      },
      // dependencies: ["check login"],
    },

    {
      name: "Laptop - Min",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1521, height: 750 },
        launchOptions: {
          args: [`--profile-directory=${process.env.PROFILE_DIRECTORY}`],
        },
      },
    },

    {
      name: "Desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 934 },
        launchOptions: {
          args: [`--profile-directory=${process.env.PROFILE_DIRECTORY}`],
        },
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
};
