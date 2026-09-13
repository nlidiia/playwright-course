import { test as base, expect } from '@playwright/test';
import { AllPages } from './pages/allPages';

type AppFixtures = {
  app: AllPages;
  loggedInApp: AllPages;
};

export const test = base.extend<AppFixtures>({
  app: async ({ page }, use) => {
    const app = new AllPages(page);

    await use(app);
  },

  loggedInApp: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: './playwright/.auth/user.json',
    });

    const page = await context.newPage();
    const loggedInApp = new AllPages(page);

    await use(loggedInApp);

    await context.close();
  },
});

export { expect };