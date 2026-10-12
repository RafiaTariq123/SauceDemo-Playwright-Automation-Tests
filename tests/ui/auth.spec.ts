import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';

/**
 * @file auth.spec.ts
 * @description Validates the primary authentication gateways and security boundary 
 * constraints for the SauceDemo application.
 */
test.describe('Authentication Flow', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    
    await loginPage.goto();
  });

  /**
   * Positive Path: Verifies successful authorization and UI state initialization.
   */
  test('Should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page, "The user should be redirected to the Inventory page after login")
      .toHaveURL(InventoryPage.PAGE_DETAILS.URL_PATTERN);

    await expect(inventoryPage.getHeaderTitleLocator(), "The 'Products' header should be visible")
      .toHaveText(InventoryPage.PAGE_DETAILS.TITLE);

    await expect(inventoryPage.getShoppingCartLinkLocator(), "The shopping cart should be available to the user")
      .toBeVisible();
  });

  /**
   * Negative Path: Validates that locked-out users are prevented from entering 
   * and receive appropriate feedback.
   */
  test('Should show an error message with a locked out user', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    const errorContainer = loginPage.getErrorMessageLocator();
    
    await expect(errorContainer, "A 'locked out' error message should be displayed")
      .toHaveText(LoginPage.ERROR_MESSAGES.LOCKED_OUT);
    
    await expect(errorContainer, "The error container should be visible to the user")
      .toBeVisible();
  });
  
});