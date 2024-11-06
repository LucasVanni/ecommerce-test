import { expect, test } from "@playwright/test";

test("Login Page", async ({ page }) => {
  await page.goto("/login");

  await page.fill('input[type="email"]', "test@example.com");
  await page.fill('input[type="password"]', "password123");

  await page.click("text=Make Login");

  expect(page.url()).toBe("http://127.0.0.1:3000/login");
});
