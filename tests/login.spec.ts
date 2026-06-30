import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login com sucesso', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.acessarPaginaLogin();

    await loginPage.realizarLogin(
        "customer@practicesoftwaretesting.com",
        "welcome01"
    );

    await expect(page).toHaveURL(/account/);

});