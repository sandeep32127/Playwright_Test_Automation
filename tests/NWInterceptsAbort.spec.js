import {test} from "@playwright/test";

test('@smoke Successful login and check', async ({page})=>{
    await page.route('**/*.css',route => route.abort());
    await page.route('**/*.{jpg,png,jpeg}',route => route.abort());
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const password =  page.locator('#password');
    const btnSignIn = page.locator('#signInBtn');
    await userName.clear();
    await userName.fill('rahulshettyacademy');
    await password.clear();
    await password.fill('Learning@830$3mK2');
    await btnSignIn.press('Enter');
    page.on('request',request => console.log(request.url()));
    page.on('response',response => console.log(response.url(), response.status(),response.statusText));
    const firstText = await page.locator('.card-body a').first().textContent();
    const secondText = await page.locator('.card-body a').nth(1).textContent();
    console.log(firstText + "  "+ secondText);
    const allTexts = await page.locator('.card-body a').allTextContents();
    console.log('all text contnets  : '+ allTexts)
    const innerTexts = await page.locator('.card-body a').allInnerTexts();
    console.log('all inner text contnets  : '+ innerTexts)
});