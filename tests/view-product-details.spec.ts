import { test, expect } from '../fixtures';

test('Verify user can view product details', { tag: '@smoke' }, async ({ loggedInApp }) => {
    await test.step('Open homepage', async () => {
        await loggedInApp.homePage.open();
    });

    await test.step('Open Combination Pliers product', async () => {
        await loggedInApp.homePage.selectProductByName('Combination Pliers');
    });

    await test.step('Verify product URL', async () => {
        await expect(loggedInApp.page).toHaveURL(/\/product\//);
    });

    await test.step('Verify product name and price', async () => {
        await expect(loggedInApp.homePage.product).toHaveText('Combination Pliers');
        await expect(loggedInApp.homePage.productPrice).toHaveText('14.15');
    });

    await test.step('Verify product action buttons', async () => {
        await expect(loggedInApp.homePage.addToCartBtn).toBeVisible();
        await expect(loggedInApp.homePage.addToFavoriteBtn).toBeVisible();
    });
}
)