import {Locator, test, expect} from '@playwright/test';

test('login with locked_out_user', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.pause();
    await page.locator('#user-name').fill('locked_out_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')); //vérification qu'il y a bien l'erreur
    //.toHaveText('Epic sadface: Sorry, this user has been locked out.')
})

test('wrong login', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.pause();
    await page.locator('#user-name').fill('not_a_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')); //vérification qu'il y a bien l'erreur
})

test('wrong password', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.pause();
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('wrong_password');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')); //vérification qu'il y a bien l'erreur
})
