import { test, expect } from '@playwright/test';
import { AccountPage } from "../pages/account.page"
import { HomePage } from '../pages/home.page';
import { CartPage } from '../pages/cart.page';

test.use({
  storageState: 'playwright/.auth/user.json',
});


test('Verify user can add product to cart', async ({ page }) => {
    const accountPage = new AccountPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    await page.goto('/account');
    await accountPage.clickHomeBtn();
    await homePage.selectProductByName('Slip Joint Pliers');
    await expect(page).toHaveURL(/\/product\//);
    await expect(homePage.product).toHaveText('Slip Joint Pliers');
    await expect(homePage.productPrice).toHaveText('9.17');
    await homePage.addToCartBtn.click();
    await expect(homePage.alertMessage).toHaveText('Product added to shopping cart.')
    await expect(homePage.alertMessage).toBeHidden({timeout: 8000,});
    await expect(homePage.cartQuantity).toHaveText('1');
    await homePage.cartShopping.click();
    await expect(cartPage.productQuantity).toHaveValue('1');
    await expect(cartPage.productTitle).toHaveText('Slip Joint Pliers');
    await expect(cartPage.proceedToCheckoutBtn).toBeVisible();
}
)