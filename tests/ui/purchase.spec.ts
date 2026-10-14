import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/inventory.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { CheckoutOverviewPage } from '../../pages/checkout-overview.page';
import { CheckoutCompletePage } from '../../pages/checkout-complete.page';

test.describe('Purchase Flow', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let overviewPage: CheckoutOverviewPage;
  let completePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    overviewPage = new CheckoutOverviewPage(page);
    completePage = new CheckoutCompletePage(page);
    await inventoryPage.goto();
  });

  /**
   * End-to-End: Full Order Lifecycle
   * This test covers from Login to Order Confirmation.
   */
  test('Should complete a successful purchase with accurate summary details', async ({ page }) => {
    const productTarget = 'Sauce Labs Backpack';
    const user = { first: 'Staff', last: 'Engineer', zip: '90210' };

    // 1. Product Selection & Cart Navigation
    await inventoryPage.addItemToCart(productTarget);
    await inventoryPage.goToCart();

    // 2. Shipping Information
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation(user.first, user.last, user.zip);
    await overviewPage.waitForLoad();

    // 3. Order Review (CheckoutOverviewPage)
    const summaryItem = overviewPage.getSummaryItemLocator(productTarget);

    await expect(summaryItem, "Target product should appear in the checkout summary").toBeVisible();

    await expect(overviewPage.getTotalLocator(), "Total price should be displayed to the user")
      .toContainText('Total: $');

    // 4. Finalize and Confirm
    await overviewPage.finishOrder();

    // 5. Complete page verification
    await expect(page, "The user should be on the final completion page")
      .toHaveURL(CheckoutCompletePage.PAGE_DETAILS.URL_PATTERN);

    await expect(completePage.getCompleteHeaderLocator(), "The order success message should be displayed")
      .toHaveText(CheckoutCompletePage.PAGE_DETAILS.HEADER);
  });
  
});