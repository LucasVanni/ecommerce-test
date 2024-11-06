import { expect, test } from "@playwright/test";

test("Register Page", async ({ page }) => {
  await page.goto("/register");

  await page.fill('input[type="text"]', "Test User");
  await page.fill('input[type="email"]', "test@example.com");
  await page.fill('input[type="password"]', "password123");

  await page.click("text=Register");

  expect(page.url()).toBe("http://127.0.0.1:3000/register");
});
