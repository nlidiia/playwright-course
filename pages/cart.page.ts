import { Locator, Page } from "@playwright/test";

export class CartPage{
    page: Page;
    productQuantity: Locator;
    productTitle: Locator;
    proceedToCheckoutBtn: Locator;
    totalPrice: Locator;
    proceedToCheckout: Locator;
    productPrice: Locator;


    constructor(page: Page){
        this.page = page;
        this.productQuantity = page.getByTestId('product-quantity');
        this.productTitle = page.getByTestId('product-title');
        this.productPrice = page.getByTestId('product-price');
        this.proceedToCheckoutBtn = page.getByTestId('proceed-1');
        this.totalPrice = page.getByTestId('line-price');
        this.proceedToCheckout = page.getByTestId('proceed-1');
  }

  async clickProceedToCheckoutBtn(): Promise<void>{
    await this.proceedToCheckout.click();
  }
}