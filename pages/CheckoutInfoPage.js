const { BasePage } = require('./BasePage');

class CheckoutInfoPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.cancelButton = page.locator('#cancel');
    this.error = page.locator('[data-test="error"]');
  }

  async fill(first, last, zip) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }
}

module.exports = { CheckoutInfoPage };
