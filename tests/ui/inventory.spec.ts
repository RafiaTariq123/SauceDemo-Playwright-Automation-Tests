import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/inventory.page';

/**
 * @file inventory.spec.ts
 * @description Suite for Inventory page interactions.
 * Validates cart state management, product filtering, and display logic.
 */
test.describe('Inventory Actions', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
  });

  /**
   * Verifies that adding an item correctly updates the UI badge.
   */
  test('Should add a product and verify the badge count updates to 1', async () => {
    const targetProduct = 'Sauce Labs Bolt T-Shirt';

    await inventoryPage.addItemToCart(targetProduct);
    await expect(inventoryPage.getCartBadgeLocator(), "The cart badge should display exactly '1'")
      .toHaveText('1');
  });

  /**
   * Ensures 'Remove' actions correctly modify state and UI indicators.
   */
  test('Should remove all products and ensure the badge is hidden', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');

    const expectedAmountString = '2'

    await expect(inventoryPage.getCartBadgeLocator(), `The cart badge should show ${expectedAmountString}`).toHaveText(expectedAmountString);

    await inventoryPage.removeAllItemsFromCart();

    await expect(inventoryPage.getCartBadgeLocator(), "The cart badge should be hidden when empty")
      .toBeHidden();
  });

  /**
   * Validates that the UI sorting matches the expected data model (Z-A).
   */
  test('Should sort products in descending alphabetical order (Z to A)', async () => {
    await inventoryPage.orderProductsBy(InventoryPage.SORT_OPTIONS.NAME_ZA);
    const actualOrder = await inventoryPage.getAllProductsNames();
    // localeCompare makes the test independent of the language and special symbols.
    const expectedOrder = [...actualOrder].sort((a, b) => b.localeCompare(a));

    expect(actualOrder, "Products should be sorted alphabetically from Z to A")
      .toEqual(expectedOrder);
  });
  
});