import { test, expect } from '../fixtures';
import { PowerTools } from '../enums/categories.enum';

test('Verify user can filter products by category', { tag: '@regression' }, async ({ loggedInApp }) => {
  await test.step('Open homepage', async () => {
    await loggedInApp.page.goto('/');
  });

  await test.step('Select Sander category', async () => {
    await loggedInApp.homePage.selectCategory(PowerTools.Sander);
    await expect(loggedInApp.page.getByLabel(PowerTools.Sander, { exact: true }),).toBeChecked();
  });

  await test.step('Verify the displayed product contains Sender in their names', async () => {
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
});