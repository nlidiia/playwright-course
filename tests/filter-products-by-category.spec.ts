import { test, expect } from '../fixtures';
import { PowerTools } from '../enums/categories.enum';

test('Verify user can filter products by category', async ({ loggedInApp }) => {
  await loggedInApp.page.goto('/');

  await loggedInApp.homePage.selectCategory(PowerTools.Sander);
  await expect(
  loggedInApp.page.getByLabel(PowerTools.Sander, { exact: true }),
).toBeChecked();

  await expect
    .poll(async () => {
      const productNames = await loggedInApp.homePage.getProductNames();
      return (
        productNames.length > 0 &&
        productNames.every((name) =>
          name.includes(PowerTools.Sander),
        )
      );
    })
    .toBe(true);

  const productNames = await loggedInApp.homePage.getProductNames();

  expect(productNames.length).toBeGreaterThan(0);

  productNames.forEach((name) => {
    expect(name).toContain(PowerTools.Sander);
  });
});