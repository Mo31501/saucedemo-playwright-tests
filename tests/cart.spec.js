const { test, expect } = require('../fixtures/loginShared');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');

test.describe('Add/Remove products', () => {
  test('add a single product', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.addProductToCart('Sauce Labs Backpack');
    expect(await inventory.getCartCount()).toBe(1);
  });

  test('add multiple products', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.addProductToCart('Sauce Labs Bike Light');
    await inventory.addProductToCart('Sauce Labs Bolt T-Shirt');
    expect(await inventory.getCartCount()).toBe(3);
  });

  test('add all products', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    const names = await inventory.getProductNames();
    for (const name of names) {
      await inventory.addProductToCart(name);
    }
    expect(await inventory.getCartCount()).toBe(names.length);
  });

  test('remove a product after adding', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.removeProductFromCart('Sauce Labs Backpack');
    expect(await inventory.getCartCount()).toBe(0);
  });

  test('remove one of several products', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.addProductToCart('Sauce Labs Bike Light');
    await inventory.addProductToCart('Sauce Labs Bolt T-Shirt');
    await inventory.removeProductFromCart('Sauce Labs Bike Light');
    expect(await inventory.getCartCount()).toBe(2);
  });

  test('view cart with a single product', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const cart = new CartPage(loginShared);
    expect(await cart.getItemNames()).toEqual(['Sauce Labs Backpack']);
  });

  test('view empty cart', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.goToCart();
    const cart = new CartPage(loginShared);
    expect(await cart.getItemCount()).toBe(0);
  });

  test('view cart with multiple products', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.addProductToCart('Sauce Labs Bike Light');
    await inventory.addProductToCart('Sauce Labs Bolt T-Shirt');
    await inventory.goToCart();
    const cart = new CartPage(loginShared);
    expect(await cart.getItemNames()).toHaveLength(3);
  });

  test('remove a single product from cart page', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.addProductToCart('Sauce Labs Bike Light');
    await inventory.goToCart();
    const cart = new CartPage(loginShared);
    await cart.removeProduct('Sauce Labs Backpack');
    expect(await cart.getItemCount()).toBe(1);
  });

  test('remove all products from cart page', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.addProductToCart('Sauce Labs Bike Light');
    await inventory.goToCart();
    const cart = new CartPage(loginShared);
    await cart.removeProduct('Sauce Labs Backpack');
    await cart.removeProduct('Sauce Labs Bike Light');
    expect(await cart.getItemCount()).toBe(0);
  });
});