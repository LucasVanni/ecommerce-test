import { expect, test } from "@playwright/test";

test("Not Found Page", async ({ page }) => {
  await page.goto("/non-existent-page");

  const title = await page.locator("h1").textContent();
  expect(title).toBe("404");

  const message = await page.locator("p").textContent();
  expect(message).toBe("Página não encontrada");

  const link = await page.locator("text=Voltar para a página inicial");
  await link.click();
  expect(page.url()).toBe("http://127.0.0.1:3000/non-existent-page");
});
