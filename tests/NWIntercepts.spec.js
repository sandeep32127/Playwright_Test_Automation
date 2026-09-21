import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../Utils/APIUtils";

const loginPayload = { userEmail: "sandeep321260@gmail.com", userPassword: "Sandeep@32127" };
const orderpayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let response;
const fakePayload = { data: [], message: "No Orders" };

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

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*', async route => {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayload);
        route.fulfill({
            response,
            body,
        });
    });

    await btnOrders.click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    await expect(page.locator('.mt-4.ng-star-inserted')).toBeVisible();
    console.log(await page.locator('.mt-4.ng-star-inserted').textContent());

});

