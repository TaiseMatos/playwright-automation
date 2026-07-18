import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';
import { loginData } from '../data/loginData';

let loginPage: LoginPage;
let accountPage: AccountPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    accountPage = new AccountPage(page);
});
test('Logout com sucesso', async ({ page }) => {
    await loginPage.acessarPaginaLogin();

    await loginPage.realizarLogin(
        loginData.usuarioValido.email,
        loginData.usuarioValido.senha
    );

    await expect(page.locator('[data-test="nav-menu"]')).toBeVisible();

    await accountPage.logout();

    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.locator('[data-test="nav-sign-in"]')).toBeVisible();
});