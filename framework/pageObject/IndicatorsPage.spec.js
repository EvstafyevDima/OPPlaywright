const deleteButton = 'data-testid=remove-table-item-btn'
const archiveButton = 'data-testid=archive-table-item-btn'
const unarchiveButton = 'data-testid=unarchive-table-item-btn'

class IndicatorsPage {
    constructor(page){

        this.page = page
        this.addIndicatorButton = page.getByRole('button', { name: 'Добавить показатель' })
        this.name = page.locator('#name'); // Поле ввода названия индекатора
        this.abbreviation = page.locator('#abbreviation'); // Поле ввода абревиатуры показателя
        this.commonType = page.locator('label').filter({ hasText: 'Общий' }) // чекбокс общего показателя
        this.personalType = page.locator('label').filter({ hasText: 'Персональный' }) // чекбокс общего показателя
        this.addButton = page.getByRole('button', { name: 'Добавить' }) // Кнопка создания показателя
        this.deleteConfirmationButton = page.locator('button:has-text("Удалить")') // Подтверждение удаления
        this.cancelDeleteConfirmationButton = page.locator('button:has-text("Отменить")') // Отмена удаления
        this.editButton = page.locator('text=Сохранить'); // Кнопка сохранения изменения индекатора
        this.archiveConfirmationButton = page.locator('button:has-text("Архивировать")') // Подтверждение архивирования
        this.cancelArchiveConfirmationButton = page.locator('button:has-text("Отменить")') // Подтверждение архивирования
        this.deleteButton = deleteButton
        this.archiveButton = archiveButton
        this.unarchiveButton = unarchiveButton


    }

    async gotoIndicators() {
        await this.page.goto(process.env.INDICATORS_URL);  // Переход на страницу показатели
      }

    async addIndicatorClick() //  Клик по кнопке добавления показателя
    {
        await this.addIndicatorButton.click()
        
    }

    async addIndicator(indicatorFullName, indicatorName, indicatorType) // Создание нового показателя
    {
        await this.name.fill(indicatorFullName)
        await this.abbreviation.fill(indicatorName)
        if(indicatorType === 'Общий'){
            await this.commonType.click()
        }
        else{
            await this.personalType.click()
        }
        
        await this.addButton.click()

    }

    async deleteConfirmation(Confirmation)
    {

        if(Confirmation === 'Удалить'){
            await this.deleteConfirmationButton.click()
        }
        if(Confirmation === 'Отменить'){
            await this.cancelDeleteConfirmationButton.click()
        }
        //await this.deleteConfirmationButton.click()  // Подтверждение удаления
    }

    async editIndicator(indicatorFullName, indicatorName, indicatorType) // Редактирование нового показателя
    {
        await this.name.press('Control+a')
        await this.name.fill('')
        await this.name.fill(indicatorFullName)
        await this.abbreviation.press('Control+a')
        await this.abbreviation.fill('')
        await this.abbreviation.fill(indicatorName)
        if(indicatorType === 'Общий'){
            await this.commonType.click()
        }
        else{
            await this.personalType.click()
        }
        
        await this.editButton.click() 
    }   

    async archiveConfirmation(Confirmation)
    {
        if(Confirmation === 'Архивировать'){
            await this.archiveConfirmationButton.click()
        }
        if(Confirmation === 'Отменить'){
            await this.cancelArchiveConfirmationButton.click()
        }

    }

}
module.exports = {IndicatorsPage};