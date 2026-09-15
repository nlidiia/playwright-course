import { Locator, Page } from "@playwright/test";

type BillingAddress = {
  country: string;
  postalCode: string;
  houseNumber: string;
  state: string
};

type CreditCard = {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardHolderName: string;
};

export class CheckoutPage{
    page: Page;
    billingAddressHeading: Locator;
    loggedInMessage: Locator;
    signInProceedBtn: Locator;
    countryField: Locator;
    postalCodeField: Locator;
    houseNumberField: Locator;
    //streetField: Locator;
    //cityField: Locator;
    stateField: Locator;
    billingProceed3Btn: Locator;
    paymentHeading: Locator;
    paymentMethod: Locator;
    confirmSuccessMesg: Locator;

    //Credit Card
    cardNumberField: Locator;
    expirationDateField: Locator;
    cvvField: Locator;
    cardHolderNameField: Locator;
    confirmBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.billingAddressHeading = page.getByRole('heading', {name: 'Billing Address'});
    this.loggedInMessage = page.getByText(
      /Hello .+, you are already logged in\. You can proceed to checkout\./,
    );

    this.signInProceedBtn = page.getByTestId('proceed-2');
    this.countryField = page.getByTestId('country');
    this.postalCodeField = page.getByTestId('postal_code');
    this.houseNumberField = page.getByTestId('house_number');
    //this.streetField = page.getByTestId('street');
    //this.cityField = page.getByTestId('city');
    this.stateField = page.getByTestId('state');
    this.billingProceed3Btn = page.getByTestId('proceed-3');
    this.paymentHeading = page.getByRole('heading', {name: 'Payment'});
    this.paymentMethod = page.getByTestId('payment-method');
    this.cardNumberField = page.getByTestId('credit_card_number');
    this.expirationDateField = page.getByTestId('expiration_date');
    this.cvvField = page.getByTestId('cvv');
    this.cardHolderNameField = page.getByTestId('card_holder_name');
    this.confirmBtn = page.getByRole('button', {name: 'Confirm'});
    this.confirmSuccessMesg = page.getByTestId('payment-success-message');
  }

  async fillMissingBillingAddress(
    address: BillingAddress,
  ): Promise<void> {
    await this.countryField.selectOption({
      label: address.country,
    });
    await this.postalCodeField.fill(address.postalCode);
    await this.houseNumberField.fill(address.houseNumber);
  }
  async proceedToPayment(): Promise<void> {
    await this.billingProceed3Btn.click();
  }

  async selectPaymentMethod(method: string): Promise<void> {
  await this.paymentMethod.selectOption({
    label: method,
  });
  }
  async fillCreditCardDetails(creditCard: CreditCard,): Promise<void> {
    await this.cardNumberField.fill(creditCard.cardNumber);
    await this.expirationDateField.fill(creditCard.expirationDate);
    await this.cvvField.fill(creditCard.cvv);
    await this.cardHolderNameField.fill(creditCard.cardHolderName);
}
  async confirmPayment(): Promise<void> {
    await this.confirmBtn.click();
}
}

