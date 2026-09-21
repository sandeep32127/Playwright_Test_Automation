import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../Utils/APIUtils";

const loginPayload = { userEmail: "sandeep321260@gmail.com", userPassword: "Sandeep@32127" };
const orderpayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let response;

test.beforeAll("getting the token for login", async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderpayload);
});


test('checking with css for E2E', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    const btnOrders = page.locator('button[routerlink *= "myorders"]');
    const ordersTable = page.locator("table.table-bordered.table-hover");
    const lstorderIDs = page.locator("table.table-bordered.table-hover tbody tr");
    await btnOrders.click();
    await expect(ordersTable).toBeVisible();
    const orderIDCount = await lstorderIDs.count();

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*', route =>
        route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6aafbb352be7a4bc2b5cc6h6" }),
    );

    for (let i = 0; i < orderIDCount; i++) {
        if (await lstorderIDs.nth(i).locator("th").textContent() === response.orderID) {
            await lstorderIDs.nth(i).locator("button:has-text('View')").click();
            break;
        }
    }

    await expect(page.locator('.blink_me')).toHaveText(/.*authorize/);

});

