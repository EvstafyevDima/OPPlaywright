class MainPage {
    constructor(page){

        //this.page = page;
        this.goToIndicator = page.locator('text=Показатели'); //Текст названия раздела показателей
        this.goCommonIndicatorsValues = page.locator('text=Значения общих показателей'); //Текст названия раздела показателей

    }

    //Переход в раздел индикторов по клику на текст
    async indicatorsSection()  
    {
        await this.goToIndicator.click();
    }

    async gotoIndicators() {
        await this.page.goto(process.env.INDICATORS_URL, { waitUntil: 'networkidle' });  // Переход на главную страницу админки и ожидание загрузки
      }

    async commonIndicatorsValues()  
    {
        await this.goCommonIndicatorsValues.click();
    }
    
}

module.exports = {MainPage};