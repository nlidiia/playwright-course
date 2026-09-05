import { Locator, Page } from "@playwright/test";

export class CartPage{
    page: Page;
    productQuantity: Locator;
    productTitle: Locator;
    proceedToCheckoutBtn: Locator;


    constructor(page: Page){
        this.page = page;
        this.productQuantity = page.getByTestId('product-quantity');
        this.productTitle = page.getByTestId('product-title');
        this.proceedToCheckoutBtn = page.getByTestId('proceed-1');
  }
}