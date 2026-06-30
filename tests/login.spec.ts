import { loginData } from '../data/loginData';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login com sucesso', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.acessarPaginaLogin();

    await loginPage.realizarLogin(
        loginData.usuarioValido.email,
        loginData.usuarioValido.senha
    );

    await expect(page).toHaveURL(/account/);

});