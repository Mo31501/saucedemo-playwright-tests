const { test, expect } = require('../fixtures/loginShared');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutInfoPage } = require('../pages/CheckoutInfoPage');
const { CheckoutOverviewPage } = require('../pages/CheckoutOverviewPage');

test.describe('Checkout', () => {

  test('checkout with valid details', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const cart = new CartPage(loginShared);
    await cart.checkout();
    const info = new CheckoutInfoPage(loginShared);
    await info.fill('John', 'Doe', '12345');
    await info.continueCheckout();
    await expect(loginShared).toHaveURL(/checkout-step-two/);
  });

  test('missing first name', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const cart = new CartPage(loginShared);
    await cart.checkout();
    const info = new CheckoutInfoPage(loginShared);
    await info.fill('', 'Doe', '12345');
    await info.continueCheckout();
    await expect(info.error).toContainText('First Name is required');
  });

  test('missing last name', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const cart = new CartPage(loginShared);
    await cart.checkout();
    const info = new CheckoutInfoPage(loginShared);
    await info.fill('John', '', '12345');
    await info.continueCheckout();
    await expect(info.error).toContainText('Last Name is required');
  });

  test('missing postal code', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const cart = new CartPage(loginShared);
    await cart.checkout();
    const info = new CheckoutInfoPage(loginShared);
    await info.fill('John', 'Doe', '');
    await info.continueCheckout();
    await expect(info.error).toContainText('Postal Code is required');
  });

  test('checkout overview totals are correct', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const cart = new CartPage(loginShared);
    await cart.checkout();
    const info = new CheckoutInfoPage(loginShared);
    await info.fill('John', 'Doe', '12345');
    await info.continueCheckout();
    const overview = new CheckoutOverviewPage(loginShared);
    const totals = await overview.getTotals();
    const expectedTotal = Math.round((totals.itemTotal + totals.tax) * 100) / 100;
    expect(totals.total).toBe(expectedTotal);
  });

  test('complete full checkout', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const cart = new CartPage(loginShared);
    await cart.checkout();
    const info = new CheckoutInfoPage(loginShared);
    await info.fill('John', 'Doe', '12345');
    await info.continueCheckout();
    const overview = new CheckoutOverviewPage(loginShared);
    await overview.finish();
    await expect(loginShared.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  test('cancel from checkout info page', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const cart = new CartPage(loginShared);
    await cart.checkout();
    const info = new CheckoutInfoPage(loginShared);
    await info.cancel();
    await expect(loginShared).toHaveURL(/cart\.html/);
  });

  test('cancel from checkout overview page', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const cart = new CartPage(loginShared);
    await cart.checkout();
    const info = new CheckoutInfoPage(loginShared);
    await info.fill('John', 'Doe', '12345');
    await info.continueCheckout();
    const overview = new CheckoutOverviewPage(loginShared);
    await overview.cancel();
    await expect(loginShared).toHaveURL(/inventory\.html/);
  });

  test('checkout with empty cart', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.goToCart();
    const cart = new CartPage(loginShared);
    expect(await cart.getItemCount()).toBe(0);
  });

});