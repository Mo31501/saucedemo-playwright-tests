const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutInfoPage } = require('../pages/CheckoutInfoPage');
const { CheckoutOverviewPage } = require('../pages/CheckoutOverviewPage');

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('checkout with valid details', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const cart = new CartPage(page);
    await cart.checkout();
    const info = new CheckoutInfoPage(page);
    await info.fill('John', 'Doe', '12345');
    await info.continueCheckout();
    await expect(page).toHaveURL(/checkout-step-two/);
  });

  test('missing first name', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const cart = new CartPage(page);
    await cart.checkout();
    const info = new CheckoutInfoPage(page);
    await info.fill('', 'Doe', '12345');
    await info.continueCheckout();
    await expect(info.error).toContainText('First Name is required');
  });

  test('missing last name', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const cart = new CartPage(page);
    await cart.checkout();
    const info = new CheckoutInfoPage(page);
    await info.fill('John', '', '12345');
    await info.continueCheckout();
    await expect(info.error).toContainText('Last Name is required');
  });

  test('missing postal code', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const cart = new CartPage(page);
    await cart.checkout();
    const info = new CheckoutInfoPage(page);
    await info.fill('John', 'Doe', '');
    await info.continueCheckout();
    await expect(info.error).toContainText('Postal Code is required');
  });

  test('checkout overview totals are correct', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const cart = new CartPage(page);
    await cart.checkout();
    const info = new CheckoutInfoPage(page);
    await info.fill('John', 'Doe', '12345');
    await info.continueCheckout();
    const overview = new CheckoutOverviewPage(page);
    const totals = await overview.getTotals();
    const expectedTotal = Math.round((totals.itemTotal + totals.tax) * 100) / 100;
    expect(totals.total).toBe(expectedTotal);
  });

  test('complete full checkout', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const cart = new CartPage(page);
    await cart.checkout();
    const info = new CheckoutInfoPage(page);
    await info.fill('John', 'Doe', '12345');
    await info.continueCheckout();
    const overview = new CheckoutOverviewPage(page);
    await overview.finish();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  test('cancel from checkout info page', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const cart = new CartPage(page);
    await cart.checkout();
    const info = new CheckoutInfoPage(page);
    await info.cancel();
    await expect(page).toHaveURL(/cart.html/);
  });

  test('cancel from checkout overview page', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const cart = new CartPage(page);
    await cart.checkout();
    const info = new CheckoutInfoPage(page);
    await info.fill('John', 'Doe', '12345');
    await info.continueCheckout();
    const overview = new CheckoutOverviewPage(page);
    await overview.cancel();
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('checkout with empty cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.goToCart();
    const cart = new CartPage(page);
    expect(await cart.getItemCount()).toBe(0);
  });
});