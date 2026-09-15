import { AccountPage } from "./account.page";
import { CartPage } from "./cart.page";
import { CheckoutPage } from "./checkout.page";
import { HomePage } from "./home.page";
import { LoginPage } from "./login.page";
import { Page } from "@playwright/test";

export class AllPages {
    page: Page;
    loginPage: LoginPage;
    homePage: HomePage;
    accountPage: AccountPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    constructor (page: Page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.accountPage = new AccountPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
    }
}