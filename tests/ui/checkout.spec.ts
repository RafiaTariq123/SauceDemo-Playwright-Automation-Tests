import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/inventory.page';
import { CartPage } from '../../pages/cart.page';

test.describe('Inventory Actions', () => {
  let inventoryPage: InventoryPage;
  let cartPage : CartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await inventoryPage.goto();
  });

  test("Should verify 'Sauce Labs Backpack' quantity is 1 in the cart", async ({ page }) => {
    const targetProduct = 'Sauce Labs Backpack';
    await inventoryPage.addItemToCart(targetProduct);
    await inventoryPage.goToCart();

    await expect(page, "User should be redirected to the cart page").toHaveURL(CartPage.URL_PATTERN);

    const quantityLocator = cartPage.getProductQuantityLocator(targetProduct);
    
    await expect(quantityLocator, `The quantity badge for ${targetProduct} should display '1'`)
      .toHaveText('1');
  });

});