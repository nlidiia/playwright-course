import { test, expect } from '../fixtures';

test('Verify user can view product details', async ({ loggedInApp }) => {
    await loggedInApp.page.goto('/account');
    await loggedInApp.accountPage.clickHomeBtn();
    await loggedInApp.homePage.selectProductByName('Combination Pliers');
    await expect(loggedInApp.page).toHaveURL(/\/product\//);
    await expect(loggedInApp.homePage.product).toHaveText('Combination Pliers');
    await expect(loggedInApp.homePage.productPrice).toHaveText('14.15');
    await expect(loggedInApp.homePage.addToCartBtn).toBeVisible();
    await expect(loggedInApp.homePage.addToFavoriteBtn).toBeVisible();
    await loggedInApp.homePage.cartShopping.click();
    await expect(loggedInApp.page).toHaveURL('/checkout');
}
)