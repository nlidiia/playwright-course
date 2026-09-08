import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.use({
  storageState: 'playwright/.auth/user.json',
});

const sortingOptions = [
  {
    option: 'price,asc',
    direction: 'ascending',
    multiplier: 1,
  },
  {
    option: 'price,desc',
    direction: 'descending',
    multiplier: -1,
  },
];

sortingOptions.forEach(({ option, direction, multiplier }) => {
  test(`Verify products are sorted by price ${direction}`, async ({ page }) => {
    const homePage = new HomePage(page);

    await page.goto('/');

    await homePage.selectSorting(option);

    await expect
      .poll(async () => {
        const prices = await homePage.getProductPrices();

        const sortedPrices = [...prices].sort(
          (first, second) => (first - second) * multiplier,
        );

        return prices.join('|') === sortedPrices.join('|');
      })
      .toBe(true);

    const actualPrices = await homePage.getProductPrices();

    expect(actualPrices.length).toBeGreaterThan(0);

    const expectedPrices = [...actualPrices].sort(
      (first, second) => (first - second) * multiplier,
    );

    expect(actualPrices).toEqual(expectedPrices);
  });
});