import { AccountPage } from "./account.page";
import { CartPage } from "./cart.page";
import { HomePage } from "./home.page";
import { LoginPage } from "./login.page";
import { Page } from "@playwright/test";

export class AllPages {
    loginPage: LoginPage;
    homePage: HomePage;
    accountPage: AccountPage;
    cartPage: CartPage;
    constructor (page: Page){
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.accountPage = new AccountPage(page);
        this.cartPage = new CartPage(page);
    }
}