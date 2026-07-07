import { Page, Locator } from '@playwright/test';

export class ProductPage {

    readonly page: Page;
    readonly searchInput: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.searchInput = page.locator('[data-test="search-query"]');
        this.productName = page.locator('[data-test="product-name"]');
        this.productPrice = page.locator('[data-test="unit-price"]');
        this.searchButton = page.getByRole('button', { name: 'Search' });
    }
    async pesquisarProduto(nomeProduto: string) {
       await this.searchInput.fill(nomeProduto);
      await this.searchInput.press('Enter');
    }
    async acessarHome() {
    await this.page.goto('https://practicesoftwaretesting.com');
}

async obterNomeProduto() {
    return this.productName.first().textContent();
}

async openProduct(nomeProduto: string) {
    await this.page
        .locator('[data-test="product-name"]')
        .filter({ hasText: new RegExp(`^\\s*${nomeProduto}\\s*$`) })
        .click();
}
getProductPrice() {
    return this.productPrice.first().textContent();
}

}