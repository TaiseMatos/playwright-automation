import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

let productPage: ProductPage;

test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.acessarHome();
});

test('Pesquisar e abrir produto com sucesso', async () => {
    await productPage.pesquisarProduto('Pliers');
    await productPage.openProduct('Pliers');

    await productPage.increaseQuantity();
    await productPage.increaseQuantity();

    const nomeProduto = await productPage.obterNomeProduto();
    const precoProduto = await productPage.getProductPrice();
    const quantidadeProduto = await productPage.getQuantity();

    expect(nomeProduto).toContain('Pliers');
    expect(precoProduto).not.toBeNull();
    expect(quantidadeProduto).toBe('3');

    await productPage.addToCart();

    const quantidadeCarrinho = await productPage.getCartQuantity();

    expect(quantidadeCarrinho).toBe('3');
});