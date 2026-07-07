import { loginData } from '../data/loginData';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);

    await loginPage.acessarPaginaLogin();

});

test('Login com sucesso', async () => {

    await loginPage.loginComoUsuarioValido();

    await expect(loginPage.page).toHaveURL(/account/);

});