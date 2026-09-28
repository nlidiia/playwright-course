import { test, expect } from '../fixtures';

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
  test(`Verify products are sorted by name ${direction}`, { tag: '@regression' }, async ({ loggedInApp }) => {
    await test.step('Open homepage', async () => {
      await loggedInApp.page.goto('/');
    });

    await test.step('Select Name (A-Z)/(Z-A) in the sort dropdown', async () => {
      await loggedInApp.homePage.selectSorting(option);
      await expect
        .poll(async () => {
          const names = await loggedInApp.homePage.getProductNames();

          const sortedNames = [...names].sort(
            (first, second) =>
              first.localeCompare(second) * multiplier,
          );
          return names.join('|') === sortedNames.join('|');
        })
        .toBe(true);
    });

    await test.step('Verify all displayed products sorted by names ascending or descending', async () => {
      const actualNames = await loggedInApp.homePage.getProductNames();
      const expectedNames = [...actualNames].sort(
        (first, second) =>
          first.localeCompare(second) * multiplier,
      );
      expect(actualNames).toEqual(expectedNames);
    });
  });
});