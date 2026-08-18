import { test, expect } from '@playwright/test';

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('/auth/login');

  await page.locator('#email').fill('test@qa.qa');
  await page.locator('#password').fill('strong@Test02');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('/account');

  await expect(
    page.getByRole('heading', { name: 'My account' })
  ).toBeVisible();

  const userName = page.locator('[data-test="nav-menu"]');

  await expect(userName).toHaveText('Jane Doe');
});