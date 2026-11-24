import {test, expect} from '@playwright/test';

//connexion en tant que standard_user avant chaque test
test.beforeEach('Login to SauceDemo', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    //await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
})

test('add and remove product ', async ({page}) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
})

// Ajout de 3 produits au panier et vérification que le nombre de produits dans le panier est correct
test ('add to cart', async ({page}) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('.inventory_item_name')).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Fleece Jacket']);
    //await page.locator('[data-test="checkout"]').click();
})

test('click on product and have product details', async ({page}) => {
    await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');
})