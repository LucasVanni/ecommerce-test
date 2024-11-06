import { test } from "@playwright/test";

test("Recovery Password Page", async ({ page }) => {
  await page.goto("/recovery-password");

  await page.fill('input[type="email"]', "test@example.com");
  await page.click("text=Enviar");
});
