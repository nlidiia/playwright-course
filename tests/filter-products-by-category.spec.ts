import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { PowerTools } from '../enums/categories.enum';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test('Verify user can filter products by category', async ({ page }) => {
  const homePage = new HomePage(page);

  await page.goto('/');

  await homePage.selectCategory(PowerTools.Sander);
  await expect(
  page.getByLabel(PowerTools.Sander, { exact: true }),
).toBeChecked();

  await expect
    .poll(async () => {
      const productNames = await homePage.getProductNames();
      return (
        productNames.length > 0 &&
        productNames.every((name) =>
          name.includes(PowerTools.Sander),
        )
      );
    })
    .toBe(true);

  const productNames = await homePage.getProductNames();

  expect(productNames.length).toBeGreaterThan(0);

  productNames.forEach((name) => {
    expect(name).toContain(PowerTools.Sander);
  });
});