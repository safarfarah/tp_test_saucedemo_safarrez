import {test, expect} from '@playwright/test';


test('The real end to end path', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    //await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('.inventory_item_name'))
            .toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Fleece Jacket']);
    
    await page.locator('[data-test="shopping-cart-link"]').click();

    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="firstName"]').fill('Hatsune');
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill('Miku');
    await page.locator('[data-test="postalCode"]').fill('69000');

    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="subtotal-label"]').click();
    await page.locator('[data-test="tax-label"]').click();
    await page.locator('[data-test="total-label"]').click();
    await page.locator('[data-test="finish"]').click();
    const downloadPromise = page.waitForEvent('download');
    await page.locator('[data-test="generate-pdf-order"]').click();
    const download = await downloadPromise;
    await page.locator('[data-test="back-to-products"]').click();

})