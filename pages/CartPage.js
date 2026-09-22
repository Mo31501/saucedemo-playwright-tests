class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.locator('.inventory_item_name');
     this.checkoutButton = page.locator('#checkout');
  }

  async getItemNames() {
    return this.itemNames.allTextContents();
  }

  async getItemCount() {
    return this.cartItems.count();
  }

   async checkout() {
    await this.checkoutButton.click();
  }

   async removeProduct(name) {
    const id = name.toLowerCase().replace(/ /g, '-');
    await this.page.locator(`[data-test="remove-${id}"]`).click();
  }
  
}

module.exports = { CartPage };