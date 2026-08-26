import { test, expect } from '@playwright/test';

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('/auth/login');

  await page.locator('#email').fill('customer@practicesoftwaretesting.com');
  await page.locator('#password').fill('welcome01');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('/account');

  await expect(
    page.getByRole('heading', { name: 'My account' })
  ).toBeVisible();

  const userName = page.getByTestId('nav-menu');

  await expect(userName).toHaveText('Jane Doe');
});