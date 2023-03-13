const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../framework/pageObject/LoginPage.spec');
const { IndicatorsPage } = require('../framework/pageObject/IndicatorsPage.spec');
import { generateIndicators } from '../framework/utils/generate-indicators'


  let page;
  const commonType = 'Общий'
  const personalType = "Персональный"

  test.beforeAll(async ({browser}) => {
      
    page = await browser.newPage();
    const loginPage = new LoginPage(page);
    const indicatorsPage = new IndicatorsPage(page);

    await indicatorsPage.gotoIndicators()
    await loginPage.validLogin();
    
  


})

test('Создание общего индикатора', async ({  }) => {

  const indicatorsPage = new IndicatorsPage(page);
  const indicators  = generateIndicators();
  const commonExtForValidOp = 'text=' + indicators.indicatorFullName + indicators.indicatorName + commonType;
  const indicator = page.locator(commonExtForValidOp);

  await indicatorsPage.addIndicatorClick();
  await indicatorsPage.addIndicator(indicators.indicatorFullName, indicators.indicatorName, commonType);
  await page.waitForSelector('text= Показатель создан');


  await expect(indicator).toHaveCount(1);
});


test('Удаление индикатора', async ({  }) => {

  const indicatorsPage = new IndicatorsPage(page);
  const indicators  = generateIndicators();
  const commonExtForValidOp = 'text=' + indicators.indicatorFullName + indicators.indicatorName + commonType;
  const indicator = page.locator(commonExtForValidOp);
  await indicatorsPage.addIndicatorClick();
  await indicatorsPage.addIndicator(indicators.indicatorFullName, indicators.indicatorName, commonType);

  await indicator.hover();
  await page.locator(commonExtForValidOp).locator(indicatorsPage.deleteButton).click();
  await indicatorsPage.deleteConfirmation('Удалить');
  await page.waitForSelector('text= Показатель удален',{ state: 'visible' });
  await page.waitForSelector('text= Показатель удален',{ state: 'hidden' });

  await expect(page.locator(commonExtForValidOp)).toHaveCount(0);


});

test('Редактирование общего неиспользуемого показателя (Название, тип на персональный)', async ({}) => {
  const indicatorsPage = new IndicatorsPage(page);
  const indicators  = generateIndicators();
  const indicators2  = generateIndicators();
  const commonExtForValidOp = 'text=' + indicators.indicatorFullName + indicators.indicatorName + commonType;
  const commonExtForValidOp2 = 'text=' + indicators2.indicatorFullName + indicators2.indicatorName + personalType;
  const indicator = page.locator(commonExtForValidOp);
  const indicator2 = page.locator(commonExtForValidOp2);

  await indicatorsPage.addIndicatorClick();
  await indicatorsPage.addIndicator(indicators.indicatorFullName, indicators.indicatorName, commonType);


  await indicator.click();
  await indicatorsPage.editIndicator(indicators2.indicatorFullName, indicators2.indicatorName, personalType);
  await page.waitForSelector('text= Показатель изменен',{ state: 'visible' });
  await page.waitForSelector('text= Показатель изменен',{ state: 'hidden' });
  await indicator2.hover();

  expect(indicator2).toHaveCount(1);
});

test('Архивирование общего показателя', async ({}) => {
  const indicatorsPage = new IndicatorsPage(page);
  const indicators  = generateIndicators();
  const commonExtForValidOp = 'text=' + indicators.indicatorFullName + indicators.indicatorName + commonType;
  const indicator = page.locator(commonExtForValidOp);
  const archiveIndicator = page.locator(commonExtForValidOp).locator(indicatorsPage.archiveButton);
  const unarchiveIndicator = page.locator(commonExtForValidOp).locator(indicatorsPage.unarchiveButton);

  await indicatorsPage.addIndicatorClick();
  await indicatorsPage.addIndicator(indicators.indicatorFullName, indicators.indicatorName, commonType);

  await indicator.hover();
  await archiveIndicator.click();
  await indicatorsPage.archiveConfirmation('Архивировать');
  await page.waitForSelector('text= Показатель заархивирован',{ state: 'visible' });
  await page.waitForSelector('text= Показатель заархивирован',{ state: 'hidden' });
  await indicator.hover();

  await expect(unarchiveIndicator).toHaveCount(1);
});

test('Разархивирование общего показателя', async ({}) => {
  const indicatorsPage = new IndicatorsPage(page);
  const indicators  = generateIndicators();
  const commonExtForValidOp = 'text=' + indicators.indicatorFullName + indicators.indicatorName + commonType;
  const indicator = page.locator(commonExtForValidOp);
  const archiveIndicator = page.locator(commonExtForValidOp).locator(indicatorsPage.archiveButton);
  const unarchiveIndicator = page.locator(commonExtForValidOp).locator(indicatorsPage.unarchiveButton);

  await indicatorsPage.addIndicatorClick();
  await indicatorsPage.addIndicator(indicators.indicatorFullName, indicators.indicatorName, commonType);

  await indicator.hover();
  await archiveIndicator.click();
  await indicatorsPage.archiveConfirmation('Архивировать');
  await page.waitForSelector('text= Показатель заархивирован',{ state: 'visible' });
  await page.waitForSelector('text= Показатель заархивирован',{ state: 'hidden' });

  await indicator.hover();
  await unarchiveIndicator.click();
  await page.waitForSelector('text= Показатель разархивирован',{ state: 'visible' });
  await page.waitForSelector('text= Показатель разархивирован',{ state: 'hidden' });
  await indicator.hover();

  await expect(archiveIndicator).toHaveCount(1);

});


