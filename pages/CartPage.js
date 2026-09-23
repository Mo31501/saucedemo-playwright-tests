const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
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

  async removeProduct(name) {
    await this.page.locator(`[data-test="remove-${this.toTestId(name)}"]`).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };