import { Locator, Page } from "@playwright/test";

export class LoginPage {
    page: Page;
    emailField: Locator;
    passwordField: Locator;
    loginBtn: Locator;
    constructor(page: Page){
        this.page = page;
        this.emailField = this.page.locator('#email');
        this.passwordField = this.page.locator('#password');
        this.loginBtn = this.page.getByRole('button', { name: 'Login' });
    }

    async performLogin(email: string, password: string): Promise<void> {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginBtn.click();

    }
}