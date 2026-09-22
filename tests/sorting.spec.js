const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test.describe('Sorting', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('sort name A to Z', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('az');
    const names = await inventory.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('sort name Z to A', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('za');
    const names = await inventory.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('sort price low to high', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('lohi');
    const prices = await inventory.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('sort price high to low', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('hilo');
    const prices = await inventory.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});