# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: GetByLocators.spec.js >> @smoke Test get by locators
- Location: tests\GetByLocators.spec.js:3:5

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Submit' })
    - locator resolved to <input type="submit" value="Submit" class="btn btn-success"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e5]:
    - link "ProtoCommerce" [ref=e6] [cursor=pointer]:
      - /url: "#"
    - list [ref=e7]:
      - listitem [ref=e8]:
        - link "Home" [ref=e9] [cursor=pointer]:
          - /url: /angularpractice
      - listitem [ref=e10]:
        - link "Shop" [ref=e11] [cursor=pointer]:
          - /url: /angularpractice/shop
  - generic [ref=e12]:
    - generic [ref=e13]:
      - generic [ref=e15]:
        - heading "Protractor Tutorial" [level=1] [ref=e16]
        - heading "by QAClick Academy" [level=4] [ref=e17]
        - heading "This is a demo eCommerce web appplication developed using Angular 5 to help QAClick Academy students learn Protractor framework for testing Angular applications." [level=5] [ref=e18]
        - heading "Be assured that product you ordered in this site will never arrive, Instead we hope your takeaway will be in learning Protractor!" [level=6] [ref=e19]
      - generic [ref=e21]:
        - link "close" [ref=e22] [cursor=pointer]:
          - /url: "#"
          - text: ×
        - strong [ref=e23]: Success!
        - text: The Form has been submitted successfully!.
      - generic [ref=e24]:
        - generic [ref=e25]:
          - generic [ref=e26]: Name
          - textbox [ref=e27]
        - generic [ref=e28]:
          - generic [ref=e29]: Email
          - textbox [ref=e30]
        - generic [ref=e31]:
          - generic [ref=e32]: Password
          - textbox "Password" [ref=e33]: Sandeep647785
        - generic [ref=e34]:
          - checkbox "Check me out if you Love IceCreams!" [checked] [ref=e35]
          - generic [ref=e36]: Check me out if you Love IceCreams!
        - generic [ref=e37]:
          - generic [ref=e38]: Gender
          - combobox "Gender" [ref=e39]:
            - option "Male" [selected]
            - option "Female"
        - generic [ref=e40]:
          - generic [ref=e41]: "Employment Status:"
          - generic [ref=e42]:
            - radio "Student" [ref=e43]
            - generic [ref=e44]: Student
          - generic [ref=e45]:
            - radio "Employed" [checked] [ref=e46]
            - generic [ref=e47]: Employed
          - generic [ref=e48]:
            - radio "Entrepreneur (disabled)" [disabled] [ref=e49]
            - generic [ref=e50]: Entrepreneur (disabled)
        - generic [ref=e51]:
          - generic [ref=e52]: Date of Birth
          - textbox [ref=e53]
        - button "Submit" [active] [ref=e54] [cursor=pointer]
      - heading "Two-way Data Binding example:" [level=4] [ref=e55]:
        - text: "Two-way Data Binding example:"
        - textbox [ref=e56]
    - contentinfo [ref=e57]:
      - paragraph [ref=e59]: Copyright © ProtoCommerce 2018
```

# Test source

```ts
  1  | import {test,expect} from "@playwright/test"
  2  | 
  3  | test('@smoke Test get by locators', async ({page}) =>{
  4  |     await page.goto('https://rahulshettyacademy.com/angularpractice/');
  5  |     await page.getByLabel('Check me out if you Love IceCreams!').click();
  6  |     await page.getByLabel('Employed').click();
  7  |     await page.getByLabel("Gender").selectOption('Male');
  8  |     await page.getByPlaceholder("Password").fill('Sandeep647785');
> 9  |     await page.getByRole('button', {name: "Submit"}).click();
     |                                                      ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  10 |     //expect(await page.getByText("Success! The Form has been submitted successfully!.").isVisible()).toBeTruthy();
  11 |     //default timeout is 5 seonds , To ovreride with custome timeout we need to set {timeout: 10_000}  - step level
  12 |     await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000});
  13 |     await page.getByRole('link',{name: 'Shop'}).click();
  14 |     await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole('button',{name: 'Add '}).click();
  15 | });
  16 | 
  17 | test('Test level time outs', async ({page}) =>{
  18 |     test.setTimeout(60000);// test level timeout overridiing the global timeout
  19 |     
  20 |     const slowexpect = expect.configure({timeout:9000});
  21 |     
  22 |     page.setDefaultTimeout(9000);//Here we have set the test level action time out which overrides the global actionTimeOut
  23 |     
  24 |     await page.goto('https://rahulshettyacademy.com/angularpractice/');
  25 |     await page.getByLabel('Check me out if you Love IceCreams!').click();
  26 |     await page.getByLabel('Employed').click();
  27 |     await page.getByLabel("Gender").selectOption('Male');
  28 |     await page.getByPlaceholder("Password").fill('Sandeep647785');
  29 |     await page.getByRole('button', {name: "Submit"}).click();
  30 |     await slowexpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
  31 |     await page.getByRole('link',{name: 'Shop'}).click({timeout:15000});// it will override the global level actionTimeout value
  32 |     await slowexpect(page.locator("h1:has-text('Shop Name')")).toHaveText(/.*Name/)
  33 |     await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole('button',{name: 'Add '}).click();
  34 | });
```