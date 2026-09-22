const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test.describe('Logout', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('logout via hamburger menu', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('session ends after logout', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.logout();
    await page.goBack();
    await expect(page).toHaveURL(/saucedemo.com\/?$/);
  });
});