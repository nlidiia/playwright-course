import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.use({
  storageState: 'playwright/.auth/user.json',
});

const sortingOptions = [
  {
    option: 'name,asc',
    direction: 'ascending',
    multiplier: 1,
  },
  {
    option: 'name,desc',
    direction: 'descending',
    multiplier: -1,
  },
];

sortingOptions.forEach(({ option, direction, multiplier }) => {
  test(`Verify products are sorted by name ${direction}`, async ({ page }) => {
    const homePage = new HomePage(page);

    await page.goto('/');

    await homePage.selectSorting(option);

    await expect
      .poll(async () => {
        const names = await homePage.getProductNames();

        const sortedNames = [...names].sort(
          (first, second) =>
            first.localeCompare(second) * multiplier,
        );

        return names.join('|') === sortedNames.join('|');
      })
      .toBe(true);

    const actualNames = await homePage.getProductNames();

    const expectedNames = [...actualNames].sort(
      (first, second) =>
        first.localeCompare(second) * multiplier,
    );
    expect(actualNames).toEqual(expectedNames);
  });
});