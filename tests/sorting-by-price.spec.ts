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
  test(`Verify products are sorted by price ${direction}`, { tag: '@regression' }, async ({ loggedInApp }) => {
    await test.step('Open homepage', async () => {
      await loggedInApp.page.goto('/');
    });

    await test.step('Select Price (High-Low)/(Low-High) in the sort dropdown', async () => {
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
    });

    await test.step('Verify all the displayed products sorted by prices ascending or descending', async () => {
      const actualPrices = await loggedInApp.homePage.getProductPrices();
      expect(actualPrices.length).toBeGreaterThan(0);
      const expectedPrices = [...actualPrices].sort(
        (first, second) => (first - second) * multiplier,
      );
      expect(actualPrices).toEqual(expectedPrices);
    });
});
});