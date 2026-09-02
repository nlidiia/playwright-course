import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('Verify login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
    // eslint-disable-next-line playwright/no-skipped-test
  test.skip(!!process.env.CI, 'Skip on CI');
  await page.goto('/auth/login');
  await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
  
  await expect(page).toHaveURL('/account');

  await expect(
    page.getByRole('heading', { name: 'My account' })
  ).toBeVisible();

  const userName = page.getByTestId('nav-menu');

  await expect(userName).toHaveText('Jane Doe');
});