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
}); // ← FECHA O PRIMEIRO TESTE AQUI

test('Login com e-mail inválido', async () => {
    await loginPage.realizarLogin(
        loginData.emailInvalido.email,
        loginData.emailInvalido.senha
    );

    await expect(loginPage.mensagemErro).toBeVisible();
});
test('Login com e-mail vazio', async ({ page }) => {
    await loginPage.realizarLogin(
        '',
        loginData.usuarioValido.senha
    );

    await expect(page.getByText('Email is required')).toBeVisible();
});
test('Login com senha vazia', async ({ page }) => {
    await loginPage.realizarLogin(
        loginData.usuarioValido.email,
        ''
    );

    await expect(page.getByText('Password is required')).toBeVisible();
});