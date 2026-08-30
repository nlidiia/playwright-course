import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from "../pages/account.page"
import { HomePage } from '../pages/home.page';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/auth/login');
    await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
    await expect(page).toHaveURL('/account');
  });

test('Verify user can view product details', async ({ page }) => {
    const accountPage = new AccountPage(page);
    const homePage = new HomePage(page);

    await accountPage.clickHomeBtn();
    await homePage.clickCombinationPliers();
    await expect(page).toHaveURL(/\/product\//);
    await expect(homePage.productName).toHaveText('Combination Pliers');
    await expect(homePage.productPrice).toHaveText('14.15');
    await expect(homePage.addToCartBtn).toBeVisible();
    await expect(homePage.addToFavoriteBtn).toBeVisible();

}
)