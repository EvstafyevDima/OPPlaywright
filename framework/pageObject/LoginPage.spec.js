const {expect, request} = require('@playwright/test');
//const loginPayLoad = process.env.apiLogin;

class LoginPage {

    constructor(page)
    {
        this.page = page;
        this.signInButton = page.locator('[type="submit"]'); //Клик по кнопке войти
        this.userName = page.locator('[name="login"]') // поле ввода логина
        this.password = page.locator('[type="password"]'); //поле ввода пароля

    }

    async goto() {
        await this.page.goto(process.env.BASE_URL, { waitUntil: 'networkidle' });  // Переход на главную страницу админки и ожидание загрузки
      }

    async validLogin() //  Аутентификация в паспорте
    {
        await this.userName.fill(process.env.EMAIL);
        await this.password.fill(process.env.PASSWORD);
        await this.signInButton.click();
    }
}

module.exports = {LoginPage};