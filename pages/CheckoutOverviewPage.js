const { BasePage } = require('./BasePage');

class CheckoutOverviewPage extends BasePage {
  constructor(page) {
    super(page);
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');
    this.cancelButton = page.locator('#cancel');
  }

  // "Item total: $29.99" -> 29.99
  parseMoney(text) {
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async getTotals() {
    return {
      itemTotal: this.parseMoney(await this.itemTotal.textContent()),
      tax: this.parseMoney(await this.tax.textContent()),
      total: this.parseMoney(await this.total.textContent()),
    };
  }

  async finish() {
    await this.finishButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }
}

module.exports = { CheckoutOverviewPage };