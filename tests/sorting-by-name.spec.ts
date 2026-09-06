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

for (const { option, direction, multiplier } of sortingOptions) {
  test(`Verify products are sorted by name ${direction}`, async ({ page }) => {
    const homePage = new HomePage(page);

    await page.goto('/');

    await homePage.selectSorting(option);

    // We are waiting for the goods to be sorted.
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

    // Finall list
    const actualNames = await homePage.getProductNames();
    // expected order
    const expectedNames = [...actualNames].sort(
      (first, second) =>
        first.localeCompare(second) * multiplier,
    );
    console.log('Actual:', actualNames);
    console.log('Expected:', expectedNames);
    expect(actualNames).toEqual(expectedNames);
  });
}