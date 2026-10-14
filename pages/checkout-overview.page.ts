import { Locator, Page } from '@playwright/test';

/**
 * Page Object representing the 'Checkout: Overview' screen.
 * This is the final summary before the order is finalized.
 */
export class CheckoutOverviewPage {
  readonly page: Page;
  private readonly finishButton: Locator;
  private readonly cancelButton: Locator;
  private readonly itemTotalLabel: Locator;
  private readonly taxLabel: Locator;
  private readonly totalLabel: Locator;
  private readonly cartItems: Locator;

    /**
   * URL pattern
   */
  static readonly URL_PATTERN = /.*checkout-step-two.html/;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.getByTestId('finish');
    this.cancelButton = page.getByTestId('cancel');
    this.itemTotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
    this.cartItems = page.getByTestId('inventory-item');
  }

  /**
   * Finalizes the purchase.
   * @returns A promise that resolves when the 'Finish' button is clicked.
   */
  /**
   * Waits for the browser to navigate to the overview page.
   * Call this after fillInformation() to ensure the page is ready.
   */
  async waitForLoad(): Promise<void> {
    await this.page.waitForURL(CheckoutOverviewPage.URL_PATTERN);
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Cancels the overview and returns the user to the inventory.
   */
  async cancelOrder(): Promise<void> {
    await this.cancelButton.click();
  }

  /** 
  * @returns Locator for the subtotal (Price of items only). 
  */
  getSubtotalLocator(): Locator {
    return this.itemTotalLabel;
  }

  /** 
   * @returns Locator for the tax amount. 
  */
  getTaxLocator(): Locator {
    return this.taxLabel;
  }

  /** 
   * @returns Locator for the grand total (Items + Tax). 
   */
  getTotalLocator(): Locator {
    return this.totalLabel;
  }

  /** 
   * @param productName - The name of the item to find.
   * @returns a locator for a specific item in the summary list.
   */
  getSummaryItemLocator(productName: string): Locator {
    return this.cartItems.filter({ hasText: productName });
  }
  
}