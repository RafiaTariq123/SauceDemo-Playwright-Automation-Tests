import { Locator, Page } from '@playwright/test';

/**
 * Page Object representing the Shopping Cart screen.
 * Handles item verification, quantity tracking, and transition to checkout.
 */
export class CartPage {
  readonly page: Page;
  private readonly checkoutButton: Locator;
  private readonly cartItemNames: Locator;
  private readonly cartItems: Locator;

  /**
   * Url pattern
   */
  static readonly URL_PATTERN = /.*cart.html/;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByTestId('checkout');
    this.cartItemNames = page.getByTestId('inventory-item-name');
    this.cartItems = page.getByTestId('inventory-item');
  }

  /**
   * Retrieves all product names currently listed in the cart.
   * Useful for verifying that the correct items were added during the session.
   * @returns A promise resolving to an array of product names.
   */
  async getAllProductsNamesInCart(): Promise<string[]> {
    return await this.cartItemNames.allTextContents();
  }

  /**
   * Returns a Locator for the quantity field of a specific product.
   * @param productName - The exact string name of the product to find.
   * @returns The Locator for the specific product's quantity label.
   */
  getProductQuantityLocator(productName: string): Locator {
    return this.cartItems
      .filter({ hasText: productName })
      .getByTestId('item-quantity');
  }

  /**
   * Initiates the checkout process by clicking the checkout button.
   */
  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /**
   * Returns the checkout button locator for visibility or state assertions.
   */
  getCheckoutButtonLocator(): Locator {
    return this.checkoutButton;
  }
  
}