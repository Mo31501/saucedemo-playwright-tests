const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login', () => {
  test('valid login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('locked out user', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');
    await expect(login.error).toContainText('locked out');
  });

  test('invalid username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('wrong_user', 'secret_sauce');
    await expect(login.error).toContainText('do not match');
  });

  test('invalid password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'wrong_pass');
    await expect(login.error).toContainText('do not match');
  });

  test('empty username and password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('', '');
    await expect(login.error).toContainText('Username is required');
  });
});