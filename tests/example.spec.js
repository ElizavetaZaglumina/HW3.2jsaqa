const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { email, password } = require('../user.js');

test("Succesful authorisation", async ({ page }) => {
    
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.fill('[placeholder="Email"]', email);
    await page.fill('[placeholder="Пароль"]', password);
    await page.getByTestId('login-submit-btn').click();
  
    await expect(page.locator("h2")).toContainText("Моё обучение");
    await page.screenshot({ path: 'screenshotSuccesful.png', fullPage: true  });
});

test("Authorisation failed", async ({ page }) => {

    await page.goto("https://netology.ru/?modal=sign_in");
    await page.fill('[placeholder="Email"]', "zag@gmail.ru");
    await page.getByPlaceholder('Пароль').fill('12345');
    await page.getByTestId('login-submit-btn').click();
    
    const error = await page.locator('[data-testid="login-error-hint"]');
    await expect(error).toHaveText('Вы ввели неправильно логин или пароль.'); 

    await page.screenshot({ path: 'screenshotFailed.png', fullPage: true  });
});

