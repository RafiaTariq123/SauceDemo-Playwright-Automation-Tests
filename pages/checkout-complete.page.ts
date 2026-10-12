import { Locator, Page } from '@playwright/test';

/**
 * Page Object representing the final 'Checkout: Complete' screen.
 * This page is reached after a successful purchase journey.
 */
export class CheckoutCompletePage {
  readonly page: Page;
  private readonly completeHeader: Locator;
  private readonly backHomeButton: Locator;

  /**
   * Page details
   */
  static readonly PAGE_DETAILS = {
    URL_PATTERN: /.*checkout-complete.html/,
    HEADER: 'Thank you for your order!'
  };

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.getByTestId('complete-header');
    this.backHomeButton = page.getByTestId('back-to-products');
  }

  /**
   * Returns the Locator for the success header.
   * @returns Locator for the main 'Thank You' text.
   */
  getCompleteHeaderLocator(): Locator {
    return this.completeHeader;
  }

  /**
   * Finalizes the journey by returning the user to the inventory page.
   */
  async returnToProducts(): Promise<void> {
    await this.backHomeButton.click();
  }
  
}