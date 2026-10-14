import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page'; 

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  // Wait for redirect to inventory page before saving session state
  await page.waitForURL(/inventory\.html/, { waitUntil: 'domcontentloaded' });
  await page.context().storageState({ path: authFile });
});