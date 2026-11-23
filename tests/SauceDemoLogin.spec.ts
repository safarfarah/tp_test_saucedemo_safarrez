import {test} from '@playwright/test';

//example test to check if we can in fact connect to sauceDemo
test ('login to saucedemo', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.pause();
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    //await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
})