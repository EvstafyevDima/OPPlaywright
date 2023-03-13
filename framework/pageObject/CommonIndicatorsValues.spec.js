

class CommonIndicatorsValues {
    constructor(page){

        this.page = page
        this.loadValuesButton = page.getByRole('button', { name: 'Загрузить значения' })
        this.addButton = page.getByRole('button', { name: 'Добавить' }) // нажать на кнопку добавления отчета
        this.loadButton = page.getByRole('button', { name: 'Загрузить' }) // Нажать на кнопку загрузить
        this.accountingPeriodDropdown = page.getByTestId('accounting-period-dropdown') // Дропдаун выбора периода
        this.information = page.locator('text=Файл не содержит ошибок') // Текст Файл не содержит ошибок
        this.downloadButton = page.locator('text=Загрузить') // Кнопка загрузить


        //await page.waitForSelector('text=Информация')


    }

    async clickOnTheDownloadButton() {
        await this.downloadButton.click();  // Клик по дропдауну выбора периода


      }

    waitInformation () {
        return this.page.waitForSelector('text=Файл не содержит ошибок')
     }

    async clickLsx(xslx) {  // Загрузка отчета
        const [uploadFiles] = await Promise.all([this.page.waitForEvent('filechooser'), this.page.click('text=Добавить')]);
        await uploadFiles.isMultiple();
        await uploadFiles.setFiles(xslx);
      }


    accountingPeriod (period) {
        return this.page.getByRole('button',  { name: period })
     }

    async selectionFromTheDropdownlist(periodName) {
        await this.accountingPeriodDropdown.click();  // Клик по дропдауну выбора периода
        await this.accountingPeriod(periodName).click();

      }

    async clickLoadValuesButton() {
        await this.loadValuesButton.click();  // Клик на кнопку загрузить значение
      }

    async gotoCommonIndicatorsValues() {
        await this.page.goto(process.env.COMMONINDICATORSVALUES_URL, {waitUntil:"load"});  // Переход на страницу значений индикаторов
      }

    async periodSelection(period) {
        await this.accountingPeriod(period).click;  // Выбор периода для загрузки
    }


}
module.exports = {CommonIndicatorsValues};