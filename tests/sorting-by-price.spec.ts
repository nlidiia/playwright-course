import { test, expect } from '../fixtures';
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
  test(`Verify products are sorted by price ${direction}`, async ({ loggedInApp }) => {
    await loggedInApp.page.goto('/');
    await loggedInApp.homePage.selectSorting(option);
    await expect
      .poll(async () => {
        const prices = await loggedInApp.homePage.getProductPrices();

        const sortedPrices = [...prices].sort(
          (first, second) => (first - second) * multiplier,
        );

        return prices.join('|') === sortedPrices.join('|');
      })
      .toBe(true);
    const actualPrices = await loggedInApp.homePage.getProductPrices();
    expect(actualPrices.length).toBeGreaterThan(0);
    const expectedPrices = [...actualPrices].sort(
      (first, second) => (first - second) * multiplier,
    );
    expect(actualPrices).toEqual(expectedPrices);
  });
});