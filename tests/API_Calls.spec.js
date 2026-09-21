import {test,expect,request} from "@playwright/test";

const loginPayload = {userEmail:"sandeep321260@gmail.com",userPassword:"Sandeep@32127"};
const orderpayload = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let token;
let orderID;

test.beforeAll("getting the token for login", async ()=>{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: loginPayload,
        }
    );
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponsejson = await loginResponse.json();
    token = loginResponsejson.token;
    console.log(loginResponse.status() + " "+ loginResponse.statusText() + " "+ loginResponse.body());
    console.log(token);

    const orderresponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{
        data: orderpayload,
        headers:{
            "Authorization": token,
            "Content-Type": 'application/json',
        },
    });

    const orderresponseJson = await orderresponse.json();
    console.log(orderresponseJson)
    expect(orderresponse.ok()).toBeTruthy();
    orderID = orderresponseJson.orders[0];
    console.log(orderID);
});


test('checking with css for E2E', async ({page})=>{
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    },token);

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');    
    const btnOrders = page.locator('button[routerlink *= "myorders"]');
    const ordersTable =page.locator("table.table-bordered.table-hover");
    const lstorderIDs = page.locator("table.table-bordered.table-hover tbody tr");
    await btnOrders.click();
    await expect(ordersTable).toBeVisible();
    const orderIDCount = await lstorderIDs.count();
    
    for(let i = 0; i<orderIDCount;i++){
        if(await lstorderIDs.nth(i).locator("th").textContent() === orderID){
            await lstorderIDs.nth(i).locator("button:has-text('View')").click();
            break;
        }
    }
    await expect(page.locator(".email-container")).toBeVisible();
    expect(await page.locator(".col-text").textContent()).toBe(orderID);
});

