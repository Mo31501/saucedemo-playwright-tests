class InventoryPage {
  constructor(page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
     this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
   this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames() {
    return this.productNames.allTextContents();
  }

  async getProductPrices() {
    const prices = await this.productPrices.allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }
   async addProductToCart(name) {
    const id = name.toLowerCase().replace(/ /g, '-');
    await this.page.locator(`[data-test="add-to-cart-${id}"]`).click();
  }

  async removeProductFromCart(name) {
    const id = name.toLowerCase().replace(/ /g, '-');
    await this.page.locator(`[data-test="remove-${id}"]`).click();
  }

  async getCartCount() {
    if (await this.cartBadge.count() === 0) return 0;
    return parseInt(await this.cartBadge.textContent());
  }

  async goToCart() {
    await this.cartLink.click();
  }
  async logout() {
  await this.menuButton.click();
  await this.logoutLink.click();
}
}


module.exports = { InventoryPage };