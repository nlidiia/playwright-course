import { Locator, Page } from "@playwright/test";

export class HomePage{
    page: Page;
    productCombinationPliers: Locator;
    productName: Locator;
    productPrice: Locator;
    addToCartBtn: Locator;
    addToFavoriteBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.productCombinationPliers = page
            .getByTestId('product-name')
            .filter({ hasText: 'Combination Pliers' });
        this.productName = this.page.getByTestId('product-name');
        this.productPrice = this.page.getByTestId('unit-price');
        this.addToCartBtn = this.page.getByTestId('add-to-cart');
        this.addToFavoriteBtn = this.page.getByTestId('add-to-favorites');
  }

  async clickCombinationPliers() {
    await this.productCombinationPliers.click();
  }
}