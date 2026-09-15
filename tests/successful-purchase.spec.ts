import { test, expect } from '../fixtures';

function getExpirationDate(): string {
  const expirationDate = new Date();
  expirationDate.setMonth(
    expirationDate.getMonth() + 3,
  );
  const month = String(
    expirationDate.getMonth() + 1,
  ).padStart(2, '0');
  const year = expirationDate.getFullYear();
  return `${month}/${year}`;
}

test('Logged-in user can purchase a product', async ({
  loggedInApp,
}) => {
  await loggedInApp.page.goto('/');
  const firstProduct = loggedInApp.homePage.product.first();
  const productName = await firstProduct.innerText();
  const productPrice =
    await loggedInApp.homePage.productPrices
      .first()
      .innerText();
  await firstProduct.click();
  await loggedInApp.homePage.addToCartBtn.click();
  await expect(loggedInApp.homePage.cartQuantity).toHaveText('1');
  await loggedInApp.homePage.cartShopping.click();
  await expect(loggedInApp.cartPage.productTitle).toHaveText(productName);
  await expect(loggedInApp.cartPage.productPrice).toHaveText(productPrice);
  await expect(loggedInApp.cartPage.totalPrice).toContainText(productPrice);
  await loggedInApp.cartPage.proceedToCheckoutBtn.click();
  await expect(loggedInApp.checkoutPage.loggedInMessage).toHaveText(/Hello .+, you are already logged in\. You can proceed to checkout\./);
  await loggedInApp.checkoutPage.signInProceedBtn.click();
  await expect(loggedInApp.checkoutPage.billingAddressHeading).toBeVisible();
  await loggedInApp.checkoutPage.fillMissingBillingAddress({
    country: 'Ukraine',
    postalCode: '1234',
    houseNumber: '42',
    state: 'Lviv'
  });
  await loggedInApp.checkoutPage.proceedToPayment();
  await expect(loggedInApp.checkoutPage.paymentHeading).toBeVisible();
  await loggedInApp.checkoutPage.selectPaymentMethod('Credit Card');
  await expect(loggedInApp.checkoutPage.cardNumberField).toBeVisible();
  await loggedInApp.checkoutPage.fillCreditCardDetails({
    cardNumber: '1111-1111-1111-1111',
    expirationDate: getExpirationDate(),
    cvv: '111',
    cardHolderName: 'John Doe',
  });
  await loggedInApp.checkoutPage.confirmPayment();
  await expect(loggedInApp.checkoutPage.confirmSuccessMesg).toContainText('Payment was successful');
});