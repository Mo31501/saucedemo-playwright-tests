const { test, expect } = require('../fixtures/loginShared');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test.describe('Logout', () => {
  test('logout via hamburger menu', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.logout();
    await expect(loginShared).toHaveURL('https://www.saucedemo.com/');
  });

  test('session ends after logout', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.logout();
    await loginShared.goto('https://www.saucedemo.com/inventory.html');
    const login = new LoginPage(loginShared);
    await expect(loginShared).toHaveURL(/saucedemo\.com\/?$/);
    await expect(login.error).toContainText('when you are logged in');
  });
});