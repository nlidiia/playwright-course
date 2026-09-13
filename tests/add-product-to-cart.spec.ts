import { test, expect } from '../fixtures';

test('Verify user can add product to cart', async ({ loggedInApp }) => {
    await loggedInApp.page.goto('/account');
    await loggedInApp.accountPage.clickHomeBtn();
    await loggedInApp.homePage.selectProductByName('Slip Joint Pliers');
    await expect(loggedInApp.page).toHaveURL(/\/product\//);
    await expect(loggedInApp.homePage.product).toHaveText('Slip Joint Pliers');
    await expect(loggedInApp.homePage.productPrice).toHaveText('9.17');
    await loggedInApp.homePage.addToCartBtn.click();
    await expect(loggedInApp.homePage.alertMessage).toHaveText('Product added to shopping cart.')
    await expect(loggedInApp.homePage.alertMessage).toBeHidden({timeout: 8000,});
    await expect(loggedInApp.homePage.cartQuantity).toHaveText('1');
    await loggedInApp.homePage.cartShopping.click();
    await expect(loggedInApp.cartPage.productQuantity).toHaveValue('1');
    await expect(loggedInApp.cartPage.productTitle).toHaveText('Slip Joint Pliers');
    await expect(loggedInApp.cartPage.proceedToCheckoutBtn).toBeVisible();
}
)