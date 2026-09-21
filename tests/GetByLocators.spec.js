import {test,expect} from "@playwright/test"

test('@smoke Test get by locators', async ({page}) =>{
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').click();
    await page.getByLabel("Gender").selectOption('Male');
    await page.getByPlaceholder("Password").fill('Sandeep647785');
    await page.getByRole('button', {name: "Submit"}).click();
    //expect(await page.getByText("Success! The Form has been submitted successfully!.").isVisible()).toBeTruthy();
    //default timeout is 5 seonds , To ovreride with custome timeout we need to set {timeout: 10_000}  - step level
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000});
    await page.getByRole('link',{name: 'Shop'}).click();
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole('button',{name: 'Add '}).click();
});

test('Test level time outs', async ({page}) =>{
    test.setTimeout(60000);// test level timeout overridiing the global timeout
    
    const slowexpect = expect.configure({timeout:9000});
    
    page.setDefaultTimeout(9000);//Here we have set the test level action time out which overrides the global actionTimeOut
    
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').click();
    await page.getByLabel("Gender").selectOption('Male');
    await page.getByPlaceholder("Password").fill('Sandeep647785');
    await page.getByRole('button', {name: "Submit"}).click();
    await slowexpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
    await page.getByRole('link',{name: 'Shop'}).click({timeout:15000});// it will override the global level actionTimeout value
    await slowexpect(page.locator("h1:has-text('Shop Name')")).toHaveText(/.*Name/)
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole('button',{name: 'Add '}).click();
});