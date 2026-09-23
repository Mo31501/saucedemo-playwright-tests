const { test, expect } = require('../fixtures/loginShared');
const { InventoryPage } = require('../pages/InventoryPage');

test.describe('Sorting', () => {
  test('sort name A to Z', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.sortBy('az');
    const names = await inventory.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('sort name Z to A', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.sortBy('za');
    const names = await inventory.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('sort price low to high', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.sortBy('lohi');
    const prices = await inventory.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('sort price high to low', async ({ loginShared }) => {
    const inventory = new InventoryPage(loginShared);
    await inventory.sortBy('hilo');
    const prices = await inventory.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});