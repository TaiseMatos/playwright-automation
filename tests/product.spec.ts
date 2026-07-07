import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

let productPage: ProductPage;

test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.acessarHome();
});

test('Pesquisar e abrir produto com sucesso', async ({ page }) => {
    await productPage.pesquisarProduto('Pliers');

    await productPage.openProduct('Pliers');

    await page.pause();

    const nomeProduto = await productPage.obterNomeProduto();
    const precoProduto = await productPage.getProductPrice();

    expect(nomeProduto).toContain('Pliers');
    expect(precoProduto).not.toBeNull();
});