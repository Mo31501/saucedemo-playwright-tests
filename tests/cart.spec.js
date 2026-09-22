const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');

test.describe('Add/Remove products', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('add a single product', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    expect(await inventory.getCartCount()).toBe(1);
  });

  test('add multiple products', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.addProductToCart('Sauce Labs Bike Light');
    await inventory.addProductToCart('Sauce Labs Bolt T-Shirt');
    expect(await inventory.getCartCount()).toBe(3);
  });

  test('add all products', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const names = await inventory.getProductNames();
    for (const name of names) {
      await inventory.addProductToCart(name);
    }
    expect(await inventory.getCartCount()).toBe(names.length);
  });

  test('remove a product after adding', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.removeProductFromCart('Sauce Labs Backpack');
    expect(await inventory.getCartCount()).toBe(0);
  });

  test('remove one of several products', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.addProductToCart('Sauce Labs Bike Light');
    await inventory.addProductToCart('Sauce Labs Bolt T-Shirt');
    await inventory.removeProductFromCart('Sauce Labs Bike Light');
    expect(await inventory.getCartCount()).toBe(2);
  });

  test('view cart with a single product', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const cart = new CartPage(page);
    expect(await cart.getItemNames()).toEqual(['Sauce Labs Backpack']);
  });

  test('view empty cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.goToCart();
    const cart = new CartPage(page);
    expect(await cart.getItemCount()).toBe(0);
  });

    test('view cart with multiple products', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.addProductToCart('Sauce Labs Bike Light');
    await inventory.addProductToCart('Sauce Labs Bolt T-Shirt');
    await inventory.goToCart();
    const cart = new CartPage(page);
    expect(await cart.getItemNames()).toHaveLength(3);
  });

  test('remove a single product from cart page', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.addProductToCart('Sauce Labs Bike Light');
    await inventory.goToCart();
    const cart = new CartPage(page);
    await cart.removeProduct('Sauce Labs Backpack');
    expect(await cart.getItemCount()).toBe(1);
  });

  test('remove all products from cart page', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.addProductToCart('Sauce Labs Bike Light');
    await inventory.goToCart();
    const cart = new CartPage(page);
    await cart.removeProduct('Sauce Labs Backpack');
    await cart.removeProduct('Sauce Labs Bike Light');
    expect(await cart.getItemCount()).toBe(0);
  });
  
});