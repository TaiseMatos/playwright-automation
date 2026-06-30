import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loginData } from '../data/loginData';

test('Login inválido', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.acessarPaginaLogin();

    await loginPage.realizarLogin(
        loginData.usuarioInvalido.email,
        loginData.usuarioInvalido.senha
    );

    await expect(loginPage.mensagemErro).toBeVisible();

    await expect(loginPage.mensagemErro)
        .toContainText('Invalid email or password');

});