import { test, expect, Locator, Page } from "@playwright/test";

// POM for the Orders Review Page
export class OrdersReviewPage {
  country: Locator;
  dropdown: Locator;
  emailId: Locator;
  page: Page;
  submit: Locator;
  orderConfirmationText: Locator;
  orderId: Locator;
  constructor(page: Page) {
    this.page = page;
    this.country = page.locator("[placeholder*='Country']");
    this.dropdown = page.locator(".ta-results");
    this.emailId = page.locator(".user__name [type='text']").first();
    this.submit = page.locator(".action__submit");
    this.orderConfirmationText = page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  // Search for a country and select
  async searchCountryAndSelect(countryCode: string, countryName: string) {
    await this.country.pressSequentially("ind");
    await this.dropdown.waitFor();
    const optionsCount = await this.dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
      let text: any;
      text = await this.dropdown.locator("button").nth(i).textContent();
      if (text.trim() === countryName) {
        await this.dropdown.locator("button").nth(i).click();
        break;
      }
    }
  }

  // Verify E-mail
  async VerifyEmailId(username: string) {
    await expect(this.emailId).toHaveText(username);
  }

  // Submit and get order's id
  async SubmitAndGetOrderId() {
    await this.submit.click();
    await expect(this.orderConfirmationText).toHaveText(
      " Thankyou for the order. "
    );
    return await this.orderId.textContent();
  }
}
module.exports = { OrdersReviewPage };
