import { Locator, Page } from '@playwright/test';

/**
 * Page Object representing the Inventory (Product Gallery) screen.
 * Handles product interactions, cart state verification, and sorting logic.
 */
export class InventoryPage {
  readonly page: Page;
  private readonly url: string = '/inventory.html';
  private readonly cartBadge: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly headerTitle: Locator;
  private readonly sortDropdown: Locator;
  private readonly inventoryItemNames: Locator;

  /**
   * Page details
   */
  static readonly PAGE_DETAILS = {
    URL_PATTERN: /.*inventory.html/,
    TITLE: 'Products'
  };

  /**
   * Defines a type for the ordering options
   */
  static readonly SORT_OPTIONS = {
    NAME_AZ: 'az',
    NAME_ZA: 'za',
    PRICE_LOHI: 'lohi',
    PRICE_HILO: 'hilo'
  } as const;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.shoppingCartLink = page.getByTestId('shopping-cart-link');
    this.headerTitle = page.getByTestId('title');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.inventoryItemNames = page.getByTestId('inventory-item-name');
  }

  /**
   * Navigates to the inventory page using the URL.
   * @returns A promise that resolves when the navigation is complete.
   */
  async goto(): Promise<void> {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Adds a specific product to the shopping cart.
   * @param productName - The exact text name of the product to add.
   * @example await inventoryPage.addItemToCart('Sauce Labs Backpack');
   */
  async addItemToCart(productName: string): Promise<void> {
    const productContainer = this.page.getByTestId('inventory-item').filter({ hasText: productName });
    await productContainer.getByRole('button', { name: /add to cart/i }).click();
  }

  /**
   * Removes all items from the cart by clicking 'Remove' buttons sequentially.
   * Implementation Note: Uses a while loop with .first() to handle dynamic DOM updates during removal.
   */
  async removeAllItemsFromCart(): Promise<void> {
    const removeButtons = this.page.getByRole('button', { name: /remove/i });
    
    while (await removeButtons.first().isVisible()) {
      await removeButtons.first().click();
    }
  }

  /**
   * Retrieves the current count displayed on the shopping cart badge.
   * @returns The number of items as a string (e.g., "1"), or "0" if badge is missing.
   */
  async getCartCount(): Promise<string> {
    if (await this.cartBadge.isVisible()) {
      const count = await this.cartBadge.textContent();
      return count ?? '0';
    }
    return '0';
  }

  /**
   * Navigates to the shopping cart page.
   */
  async goToCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  /**
   * Extracts all product names currently visible in the inventory grid.
   * @returns An array of strings containing product titles.
   */
  async getAllProductsNames(): Promise<string[]> {
    return await this.inventoryItemNames.allTextContents();
  }

  /**
   * Sorts the product inventory based on the selected key.
   * @param option - Sorting criteria: 'az' | 'za' | 'lohi' | 'hilo'
   */
  async orderProductsBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  /** @returns Locator for the page header title. */
  getHeaderTitleLocator(): Locator {
    return this.headerTitle;
  }

  /** @returns Locator for the sort dropdown container. */
  getSortDropdownLocator(): Locator {
    return this.sortDropdown;
  }

  /** @returns Locator for the cart icon/link. */
  getShoppingCartLinkLocator(): Locator {
    return this.shoppingCartLink;
  }

  /** @returns Locator for the cart badge (null safe check in tests). */
  getCartBadgeLocator(): Locator {
    return this.cartBadge;
  }
  
}