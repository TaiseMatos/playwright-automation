import { Page, Locator } from '@playwright/test';

export class ProductPage {

    readonly page: Page;
    readonly searchInput: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly searchButton: Locator;
    readonly addToCartButton: Locator;
    readonly cartQuantity: Locator;
    readonly decreaseQuantityButton: Locator;
    readonly increaseQuantityButton: Locator;
    readonly quantityInput: Locator;
    readonly removeButton: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.searchInput = page.locator('[data-test="search-query"]');
        this.productName = page.locator('[data-test="product-name"]');
        this.productPrice = page.locator('[data-test="unit-price"]');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.cartQuantity = page
    .getByRole('link', { name: /cart/i })
    .locator('span');
       this.increaseQuantityButton = page.getByRole('button', { name: 'Increase quantity' });
       this.decreaseQuantityButton = page.getByRole('button', { name: 'Decrease quantity' });
       this.quantityInput = page.getByRole('spinbutton', { name: 'Quantity' });
       this.removeButton = page.locator('a.btn.btn-danger');
       this.cartLink = page.getByRole('link', { name: /cart/i });
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
async addToCart() {
    await this.addToCartButton.click();
}

async getCartQuantity() {
    return this.cartQuantity.textContent();
}

async increaseQuantity() {
    await this.increaseQuantityButton.click();
}

async decreaseQuantity() {
    await this.decreaseQuantityButton.click();
}

async getQuantity() {
    return this.quantityInput.inputValue();
}

async removeProduct() {
    await this.removeButton.click();
}
async openCart() {
    await this.cartLink.click();
}
async validateProductRemoved(nomeProduto: string) {
    await this.page
        .getByText(nomeProduto, { exact: true })
        .waitFor({ state: 'detached' });
}
} // <-- esta é a chave que fecha a classe ProductPage
