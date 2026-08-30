import { Locator, Page } from "@playwright/test";

export class AccountPage {
    page: Page;
    homeBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.homeBtn = this.page.getByTestId('nav-home');;
    }

    async clickHomeBtn(): Promise<void>{
        await this.homeBtn.click();
    }

}