import { test as base, expect } from '@playwright/test';
import { AllPages } from './pages/allPages';
import { apiData, userData } from './data/user.data';

type Fixtures = {
  app: AllPages;
  loggedInApp: AllPages;
};

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    await use(new AllPages(page));
  },

  loggedInApp: async ({ page, request }, use) => {
    const response = await request.post(
      `${apiData.baseUrl}/users/login`,
      {
        data: {
          email: userData.email,
          password: userData.password,
        },
      },
    );

    expect(response.ok()).toBeTruthy();

    const responseBody = (await response.json()) as {
    access_token: string;
    };

    await page.addInitScript((token) => {
    localStorage.setItem('auth-token', token);
    }, responseBody.access_token);

    await use(new AllPages(page));
    },
});

export { expect };