import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loginData } from '../data/loginData';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.acessarPaginaLogin();
});

test('Login com sucesso', async ({ page }) => {
    await loginPage.realizarLogin(
        loginData.usuarioValido.email,
        loginData.usuarioValido.senha
    );

    await expect(page).toHaveURL(/account/);
});

test('Login com senha inválida', async () => {
    await loginPage.realizarLogin(
        loginData.usuarioValido.email,
        'senhaErrada'
    );

    await expect(loginPage.mensagemErro).toBeVisible();
});