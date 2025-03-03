import { test, expect, Locator, Page } from "@playwright/test";

// POM for the Dashboard Page
export class DashboardPage {
  products: Locator;
  productsText: Locator;
  cart: Locator;
  orders: Locator;

  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
  }
  // Search for a product and add to the cart
  async searchProductAddCart(productName: string) {
    const titles = await this.productsText.allTextContents();
    console.log(titles);
    const count = await this.products.count();
    for (let i = 0; i < count; ++i) {
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName
      ) {
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }
  // Navigate to Orders section
  async navigateToOrders() {
    await this.orders.click();
  }

  // Navigate to Carts section
  async navigateToCart() {
    await this.cart.click();
  }
}
module.exports = { DashboardPage };
