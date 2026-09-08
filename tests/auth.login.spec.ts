import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

const authFile = 'playwright/.auth/user.json';

setup('Login and save authentication state', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/auth/login');

  await loginPage.performLogin(
    'customer3@practicesoftwaretesting.com',
    'pass123',
  );

  await expect(page).toHaveURL('/account');

  await page.context().storageState({
    path: authFile,
  });
});