import { test, expect } from '../fixtures';

test('Verify user can add product to cart', { tag: '@smoke' }, async ({ loggedInApp }) => {
    await test.step('Open homepage', async () => {
        await loggedInApp.page.goto('/');
    });

    await test.step('Select Slip Joint Pliers', async () => {
        await loggedInApp.homePage.selectProductByName('Slip Joint Pliers');
    });

    await test.step('User redirected to the Product page', async () => {
    await expect(loggedInApp.page).toHaveURL(/\/product\//);
    });

    await test.step('Verify product name and pries', async () => {
        await expect(loggedInApp.homePage.product).toHaveText('Slip Joint Pliers');
        await expect(loggedInApp.homePage.productPrice).toHaveText('9.17');
    });

    await test.step('Add product to cart and verify toast message and cart quantity', async () => {
        await loggedInApp.homePage.addToCartBtn.click();
        await expect(loggedInApp.homePage.alertMessage).toHaveText('Product added to shopping cart.')
        await expect(loggedInApp.homePage.alertMessage).toBeHidden({timeout: 8000,});
        await expect(loggedInApp.homePage.cartQuantity).toHaveText('1');
    });

    await test.step('Verify cart details', async () => {
        await loggedInApp.homePage.cartShopping.click();
        await expect(loggedInApp.cartPage.productQuantity).toHaveValue('1');
        await expect(loggedInApp.cartPage.productTitle).toHaveText('Slip Joint Pliers');
        await expect(loggedInApp.cartPage.proceedToCheckoutBtn).toBeVisible();
    });
}
)