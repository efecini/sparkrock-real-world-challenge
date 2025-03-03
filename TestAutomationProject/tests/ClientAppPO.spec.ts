import { test, expect } from "@playwright/test";
import { POManager } from "../pageobjects_ts/POManager";

// Get the data set from a data json. Ideal would be get it from a database.
const dataset = JSON.parse(
  JSON.stringify(require("../utils/placeorderTestData.json"))
);

// Tests will occur for each data in the dataset.
for (const data of dataset) {
  test.only(`@Web Client App login for ${data.productName}`, async ({
    page,
  }) => {
    // Create page object model manager object
    const poManager = new POManager(page);

    // Get login page object
    const loginPage = poManager.getLoginPage();

    // Go to login page
    await loginPage.goTo();

    // Login with valid information
    await loginPage.validLogin(data.username, data.password);

    // Get the dashboard page object
    const dashboardPage = poManager.getDashboardPage();

    // Search for product and add to the cart.
    await dashboardPage.searchProductAddCart(data.productName);

    // Navigate to the cart page
    await dashboardPage.navigateToCart();

    // Get the cart page object
    const cartPage = poManager.getCartPage();

    // Verify that product is displayed
    await cartPage.VerifyProductIsDisplayed(data.productName);

    // Do a checkout
    await cartPage.Checkout();

    // Get the orders review object
    const ordersReviewPage = poManager.getOrdersReviewPage();

    // Search country and select
    await ordersReviewPage.searchCountryAndSelect("ind", "India");

    // Submit the order and get the order id
    let orderId: any;
    orderId = await ordersReviewPage.SubmitAndGetOrderId();

    // Go to orders
    await dashboardPage.navigateToOrders();

    // Get order history page
    const ordersHistoryPage = poManager.getOrdersHistoryPage();

    // Search orders and select
    await ordersHistoryPage.searchOrderAndSelect(orderId);

    // Check that order is there
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });
}
