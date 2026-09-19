import { test, expect } from '../fixtures';
import { createProduct } from '../data/product.factory';

test('Verify 20 mocked products are displayed', async ({ app }) => {
  const products = Array.from(
    { length: 20 },
    (_, index) => createProduct(index + 1),
  );
  const mockedResponse = {
    current_page: 1,
    data: products,
    from: 1,
    last_page: 1,
    per_page: 20,
    to: 20,
    total: 20,
  };
  await app.page.route(/\/products(?:\?.*)?$/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      json: mockedResponse,
    });
  });
  await app.page.goto('/');
  await expect(app.homePage.product).toHaveCount(20);
});