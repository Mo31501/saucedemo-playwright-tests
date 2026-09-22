class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');
    this.cancelButton = page.locator('#cancel');
  }

  async getTotals() {
    const parseMoney = (text) => parseFloat(text.replace(/[^0-9.]/g, ''));
    return {
      itemTotal: parseMoney(await this.itemTotal.textContent()),
      tax: parseMoney(await this.tax.textContent()),
      total: parseMoney(await this.total.textContent()),
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