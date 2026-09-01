import { Locator, Page } from "@playwright/test";

export class HomePage{
    page: Page;
    product: Locator;
    productPrice: Locator;
    addToCartBtn: Locator;
    addToFavoriteBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.product = page.getByTestId('product-name');
        this.productPrice = this.page.getByTestId('unit-price');
        this.addToCartBtn = this.page.getByTestId('add-to-cart');
        this.addToFavoriteBtn = this.page.getByTestId('add-to-favorites');
  }

  async selectProductByName (productName: string) {
    await this.product.filter({ hasText: productName }).click();
}
}