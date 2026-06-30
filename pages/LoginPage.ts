import { Page, Locator } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly mensagemErro: Locator;

    constructor(page: Page) {
        this.page = page;

        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-submit"]');
        this.mensagemErro = page.locator('[data-test="login-error"]');
    }

    async acessarPaginaLogin() {
        await this.page.goto('https://practicesoftwaretesting.com/auth/login');
    }

    async preencherEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async preencherSenha(password: string) {
        await this.passwordInput.fill(password);
    }

    async clicarEntrar() {
        await this.loginButton.click();
    }

    async realizarLogin(email: string, password: string) {
        await this.preencherEmail(email);
        await this.preencherSenha(password);
        await this.clicarEntrar();
    }
}