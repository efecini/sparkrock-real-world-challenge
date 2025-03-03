import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { OrdersHistoryPage } from "./OrdersHistoryPage";
import { OrdersReviewPage } from "./OrdersReviewPage";
import { CartPage } from "./CartPage";
import { Page } from "@playwright/test";

// POM Manager Class
export class POManager {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  ordersHistoryPage: OrdersHistoryPage;
  ordersReviewPage: OrdersReviewPage;
  cartPage: CartPage;
  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    this.ordersReviewPage = new OrdersReviewPage(this.page);
    this.cartPage = new CartPage(this.page);
  }

  // Create a login page POM Class
  getLoginPage() {
    return this.loginPage;
  }
  // Create a cart page POM Class
  getCartPage() {
    return this.cartPage;
  }
  // Create a dashboard page POM Class
  getDashboardPage() {
    return this.dashboardPage;
  }
  // Create a order page POM Class
  getOrdersHistoryPage() {
    return this.ordersHistoryPage;
  }

  // Create a orders revire page POM Class
  getOrdersReviewPage() {
    return this.ordersReviewPage;
  }
}
module.exports = { POManager };
