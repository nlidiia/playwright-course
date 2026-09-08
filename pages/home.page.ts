import { Locator, Page } from "@playwright/test";

export class HomePage{
    page: Page;
    product: Locator;
    productPrice: Locator;
    addToCartBtn: Locator;
    addToFavoriteBtn: Locator;
    alertMessage: Locator;
    cartQuantity: Locator;
    cartShopping: Locator;
    sortDropdown: Locator;
    productPrices: Locator;

    constructor(page: Page){
        this.page = page;
        this.product = page.getByTestId('product-name');
        this.productPrice = this.page.getByTestId('unit-price');
        this.addToCartBtn = this.page.getByTestId('add-to-cart');
        this.addToFavoriteBtn = this.page.getByTestId('add-to-favorites');
        this.alertMessage = this.page.getByRole('alert');
        this.cartQuantity = this.page.getByTestId('cart-quantity');
        this.cartShopping = this.page.getByTestId('nav-cart');
        this.sortDropdown = page.getByTestId('sort');
        this.productPrices = page.getByTestId('product-price');
  }

  async selectProductByName (productName: string) {
    await this.product.filter({ hasText: productName }).click();
}

  async selectSorting(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames() {
  await this.product.first().waitFor({
    state: 'visible',
  });

  const names = await this.product.allTextContents();

  return names.map((name) => name.trim());
}
async getProductPrices(): Promise<number[]> {
  await this.productPrices.first().waitFor({
    state: 'visible',
  });

  const prices = await this.productPrices.allTextContents();

  return prices.map((price) =>
    Number(price.replace('$', '').trim()),
  );
}
async selectCategory(category: string) {
  await this.page.getByLabel(category, { exact: true }).check();
}

  
}