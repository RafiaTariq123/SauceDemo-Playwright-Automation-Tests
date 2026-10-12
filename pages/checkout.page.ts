import { Locator, Page } from '@playwright/test';

/**
 * Page Object representing the multi-step Checkout process.
 * Handles user data entry, order review, and final confirmation.
 */
export class CheckoutPage {
  readonly page: Page;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  
  /**
   * URL pattern
   */
  static readonly URL_PATTERN = /.*checkout-step-two.html/;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
  }

  /**
   * Fills out the 'Checkout: Your Information' form and proceeds.
   * @param firstName - Customer's first name.
   * @param lastName - Customer's last name.
   * @param zipCode - Shipping postal code.
   * @example await checkoutPage.fillInformation('Jane', 'Doe', '90210');
   */
  async fillInformation(firstName: string, lastName: string, zipCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(zipCode);
    await this.continueButton.click();
  }

}