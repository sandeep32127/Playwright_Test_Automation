const {test,expect} = require('@playwright/test');

test('First Assignment check', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    const inputUserEmai = page.locator('input#userEmail');
    const inputPassword = page.locator('input#userPassword');
    const btnLogin = page.locator('#login');
    const itemTitles = page.locator('.card-body b');
    await inputUserEmai.clear();
    await inputUserEmai.pressSequentially('sandeep321260@gmail.com');
    await inputPassword.clear();
    await inputPassword.fill('Sandeep@32127');
    await btnLogin.click();
    // const firstItemtext = await itemTitles.first().textContent();
    // console.log(firstItemtext);
    //await page.waitForLoadState('networkidle');
    await itemTitles.first().waitFor();//Here for list / multiple elements the waitFor() will not work. Hence we need to wait for a single element then multiple elements
    const productTitles = await itemTitles.allTextContents();
    console.log(productTitles);
});

test('end to end automation', async ({page}) =>{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    const inputUserEmai = page.locator('input#userEmail');
    const inputPassword = page.locator('input#userPassword');
    const btnLogin = page.locator('#login');
    const itemTitles = page.locator('.card-body b');
    const fieldCoupon = page.locator("input[name='coupon']");
    const btnApplyCoupon = page.locator("button[type='submit']");
    const lblcouponAppliedSuccessMessage = page.locator('.field.small p');
    const btnPlaceOrder = page.locator('.actions a');
    const firldSelectCountry = page.locator("input[placeholder='Select Country']");
    const productTitle = 'ZARA COAT 3';
    await inputUserEmai.clear();
    await inputUserEmai.pressSequentially('sandeep321260@gmail.com');
    await inputPassword.clear();
    await inputPassword.fill('Sandeep@32127');
    await btnLogin.click();
    await itemTitles.first().waitFor();
    await page.locator("//b[text()='"+productTitle+"']/ancestor::div[@class = 'card-body']/button[2]").click();
    await page.locator('button[routerlink *= "dashboard/cart"]').click();
    expect(await page.locator('.cartSection h3').textContent()).toBe(productTitle);
    await page.locator('//button[text() = "Checkout"]').click();
    await fieldCoupon.fill('rahulshettyacademy');
    await btnApplyCoupon.click();
    await expect(lblcouponAppliedSuccessMessage).toBeVisible();
    await expect(lblcouponAppliedSuccessMessage).toHaveText("* Coupon Applied");
    await firldSelectCountry.fill('India');
    await page.locator(".fa.fa-search").last().click();
    //await page.waitForTimeout(3000);
    await btnPlaceOrder.click();
    //await page.waitForTimeout(3000);
    await expect(page.locator("label[routerlink *= 'dashboard/myorders']")).toBeVisible();
    console.log(await page.locator('.ng-star-inserted').nth(2).textContent());
});

test('checking with css for E2E', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    const email = "sandeep321260@gmail.com";
    const inputUserEmai = page.locator('input#userEmail');
    const inputPassword = page.locator('input#userPassword');
    const btnLogin = page.locator('#login');
    const Products = page.locator('.card-body');
    const header = page.locator("text=Automation Practice");
    const fieldCoupon = page.locator("input[name='coupon']");
    const btnApplyCoupon = page.locator("button[type='submit']");
    const lblcouponAppliedSuccessMessage = page.locator('.field.small p');
    const btnPlaceOrder = page.locator('.actions a');
    const btnOrders = page.locator('button[routerlink *= "myorders"]');
    const ordersTable =page.locator("table.table-bordered.table-hover");
    const lstorderIDs = page.locator("table.table-bordered.table-hover tbody tr");
    const productTitle = 'ZARA COAT 3';
    await inputUserEmai.clear();
    await inputUserEmai.pressSequentially(email);
    await inputPassword.clear();
    await inputPassword.fill('Sandeep@32127');
    await btnLogin.click();
    await header.waitFor();
    const count = await Products.count();
    console.log(count);

    for(let i = 0;i<count;i++){
        if(await Products.nth(i).locator("b").textContent() === productTitle){
            await Products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator('button[routerlink *= "dashboard/cart"]').click();
    await page.locator('div.cart li').first().waitFor();
    const bool = await page.locator("h3:has-text('"+productTitle+"')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator('//button[text() = "Checkout"]').click();
    await fieldCoupon.fill('rahulshettyacademy');
    await btnApplyCoupon.click();
    await expect(lblcouponAppliedSuccessMessage).toBeVisible();
    await expect(lblcouponAppliedSuccessMessage).toHaveText("* Coupon Applied");
    await page.locator("input[placeholder='Select Country']").pressSequentially('India',{delay:150});
    await expect(page.locator("section .ta-results")).toBeVisible();
    const buttonCount = await page.locator("section .ta-results").locator("button").count();

    for(let i=0;i<buttonCount;i++)
    {
        const text = await page.locator("section .ta-results").locator("button").nth(i).textContent();
        if(text.trim() === "India"){
            await page.locator("section .ta-results").locator("button").nth(i).click();
            break;
        }
    }
    expect(await page.locator(".details__user label[type='text']").textContent()).toBe(email);
    await btnPlaceOrder.click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    let orderID = await page.locator(".em-spacer-1 label").nth(1).textContent();
    orderID = orderID.split("|")[1].trim();
    console.log(orderID);
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
    //await page.waitForTimeout(3000);
});

