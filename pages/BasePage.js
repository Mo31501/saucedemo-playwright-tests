class BasePage {
  constructor(page) {
    this.page = page;
  }

 async goto(path = '') {
  await this.page.goto(`/${path}`);
}
  // "Sauce Labs Backpack" -> "sauce-labs-backpack"
  toTestId(productName) {
    return productName.toLowerCase().replace(/ /g, '-');
  }
}

module.exports = { BasePage };