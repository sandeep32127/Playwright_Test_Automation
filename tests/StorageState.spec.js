const {test,expect} = require('@playwright/test');
let webContext;

test.beforeAll('the before all suite for tests', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    const inputUserEmai = page.locator('input#userEmail');
    const inputPassword = page.locator('input#userPassword');
    const btnLogin = page.locator('#login');
    await inputUserEmai.clear();
    await inputUserEmai.pressSequentially('sandeep321260@gmail.com');
    await inputPassword.clear();
    await inputPassword.fill('Sandeep@32127');
    await btnLogin.click();
    const itemTitles = page.locator('.card-body b');   
    await itemTitles.first().waitFor();
    await context.storageState({path:'auth.json'});
    webContext =  await browser.newContext({storageState:'auth.json'});

});

test('First Assignment check', async ()=>{
    const page =await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');   
    const itemTitles = page.locator('.card-body b');   
    await itemTitles.first().waitFor();//Here for list / multiple elements the waitFor() will not work. Hence we need to wait for a single element then multiple elements
    const productTitles = await itemTitles.allTextContents();
    console.log(productTitles);
});

test('Second Assignment check', async ()=>{
    const page =await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');   
    const itemTitles = page.locator('.card-body b');   
    await itemTitles.first().waitFor();//Here for list / multiple elements the waitFor() will not work. Hence we need to wait for a single element then multiple elements
    const productTitles = await itemTitles.allTextContents();
    console.log(productTitles);
});