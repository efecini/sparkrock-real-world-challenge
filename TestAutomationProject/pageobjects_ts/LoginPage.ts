import { test, expect, Locator, Page } from "@playwright/test";

// POM for the Login Page
export class LoginPage {
  signInbutton: Locator;
  userName: Locator;
  password: Locator;
  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.signInbutton = page.locator("[value='Login']");
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
  }
  // Go to the login page
  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  // Do a valid login
  async validLogin(username: string, password: string) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInbutton.click();
    await this.page.waitForLoadState("networkidle");
  }
}
module.exports = { LoginPage };
