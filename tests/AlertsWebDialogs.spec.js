const {test,expect} = require('@playwright/test');

test('testing alerts and dialogs', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://google.com");
    await page.goBack();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();
    await page.getByRole("button",{name: 'Hide'}).click();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden();
    page.on('dialog', dialog => dialog.accept());// here it's a java/js dialog
    // page.once('dialog', async dialog =>{
    //     console.log(dialog.type());
    //     console.log(dialog.message());
    //     await dialog.accept();
    // });
    await page.getByRole('button',{name:'Confirm'}).click();
    await page.locator('#mousehover').hover();
    await expect(page.locator('.mouse-hover-content')).toBeVisible();
    await page.getByRole('link',{name:'Top'}).click();
    const framesPage = page.frameLocator("iframe-name");
});