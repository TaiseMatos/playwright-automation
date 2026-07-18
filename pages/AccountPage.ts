import { Page } from '@playwright/test';

export class AccountPage {

    private userMenu = this.page.locator('[data-test="nav-menu"]');
    private signOutButton = this.page.locator('[data-test="nav-sign-out"]');

    constructor(private page: Page) {}

    async logout() {
        await this.userMenu.click();
        await this.signOutButton.click();
    }
}