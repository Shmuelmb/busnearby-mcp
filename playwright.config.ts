import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "https://api.busnearby.co.il",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "api-tests",
      testDir: "./tests/e2e",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
})
