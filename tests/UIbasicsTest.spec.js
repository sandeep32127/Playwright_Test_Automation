//import {test} from "@playwright/test"
const {test,expect} = require('@playwright/test');

/*test('first playwright test',async ({page}) => {


});*/

// test('first playwright test', async function() {

// });

//test.describe.configure({mode:'parallel'});

//browser here is a fixture
//we need to wrap it in curly { } braces. so that it will be recognised as a playwright fixture,
//  otherwise it will be a normal paramater
test('@smoke playwright test with browser fixture', async ({browser}) => {
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
   //console.log((await page.title()).toString());
   //const pageTitle = await page.title();
   //console.log("The title is "+pageTitle)
   await expect(page).toHaveTitle(/.*Rahul Shetty Academy/);
   await page.locator('#username').fill('Sandeep');
   await page.locator('#password').fill('Sandeep@32127');//Learning@830$3mK2
   await page.locator('#signInBtn').press('Enter');
   //await page.waitForTimeout(3000);
   const incrtMesg = await page.locator("div[style*='block']").textContent();
   console.log(incrtMesg);
   expect(incrtMesg).toBe('Incorrect username/password.');
   await expect(page.locator("div[style*='block']")).toContainText('incorrect');
});

test('Playwright test with page fixture', async ({page})=>{
    await page.goto('https://google.com');
    console.log((await page.title()).toString());
    await expect(page).toHaveTitle('Google');
});

test('Successful login and check', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const password =  page.locator('#password');
    const btnSignIn = page.locator('#signInBtn');
    await userName.clear();
    await userName.fill('rahulshettyacademy');
    await password.clear();
    await password.fill('Learning@830$3mK2');
    await btnSignIn.press('Enter');
    const firstText = await page.locator('.card-body a').first().textContent();
    const secondText = await page.locator('.card-body a').nth(1).textContent();
    console.log(firstText + "  "+ secondText);
    const allTexts = await page.locator('.card-body a').allTextContents();
    console.log('all text contnets  : '+ allTexts)
    const innerTexts = await page.locator('.card-body a').allInnerTexts();
    console.log('all inner text contnets  : '+ innerTexts)
});

test('test select drop downs', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const selectDropDowns =  page.locator('select.form-control');
    const radioBtn = page.locator('.radiotextsty').last();
    const okayBtnPopUp =  page.locator('#okayBtn');
    const checkBox = page.locator('#terms');
    const blinkingLink = page.locator("a[href *= 'documents-request']");
    await selectDropDowns.selectOption('consult');
    await radioBtn.check();
    await okayBtnPopUp.click();
    await expect(radioBtn).toBeChecked();
    expect(await radioBtn.isChecked()).toBeTruthy();
    await checkBox.check();
    await checkBox.uncheck();
    expect(await checkBox.isChecked()).toBeFalsy();
    await expect(blinkingLink).toHaveAttribute("class","blinkingText");
});

test('Test child window', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const blinkingLink = page.locator("a[href *= 'documents-request']");

    const [newpage] = await Promise.all(
        [
            context.waitForEvent('page'),
            blinkingLink.click(),
        ]
    );
    await expect(newpage).toHaveURL(/.*documents-request/);
    const textNewPage = await newpage.locator('.im-para.red').textContent();
    console.log(textNewPage);
    //context.pages();
    const usernameExtracted = textNewPage.split("@")[1].split(" ")[0];
    console.log(usernameExtracted);
    await page.locator('#username').clear();
    await page.locator('#username').fill(usernameExtracted);
    console.log(await page.locator('#username').inputValue());
    //await page.waitForTimeout(5000);
});