import { test, expect } from '@playwright/test';
import { AccountPage } from "../pages/account.page"
import { HomePage } from '../pages/home.page';

test.use({
  storageState: 'playwright/.auth/user.json',
});


test('Verify user can view product details', async ({ page }) => {
    const accountPage = new AccountPage(page);
    const homePage = new HomePage(page);
    await page.goto('/account');
    await accountPage.clickHomeBtn();
    await homePage.selectProductByName('Combination Pliers');
    await expect(page).toHaveURL(/\/product\//);
    await expect(homePage.product).toHaveText('Combination Pliers');
    await expect(homePage.productPrice).toHaveText('14.15');
    await expect(homePage.addToCartBtn).toBeVisible();
    await expect(homePage.addToFavoriteBtn).toBeVisible();
    await homePage.cartShopping.click();
    await expect(page).toHaveURL('/checkout');
}
)