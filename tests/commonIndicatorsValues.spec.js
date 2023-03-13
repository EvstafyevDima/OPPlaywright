const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../framework/pageObject/LoginPage.spec');
const { IndicatorsPage } = require('../framework/pageObject/IndicatorsPage.spec');
import { CommonIndicatorsValues } from '../framework/pageObject/CommonIndicatorsValues.spec';
import { generateIndicators } from '../framework/utils/generate-indicators'
const path = require("path");
const {writeExsel} = require("../framework/utils/changeExell");


test.describe('Тесты на добавление значения индикатору', () => {

    let page;
    const value1 = 5
    const indicators  = generateIndicators();
    const lineOfTheGeneralIndicatorWithTheValue = 'text=' + indicators.indicatorFullName + indicators.indicatorName + value1;
  
    test.beforeAll(async ({browser}) => {
      
      page = await browser.newPage();
  
      const loginPage = new LoginPage(page);
      const indicatorsPage = new IndicatorsPage(page);
  
      await indicatorsPage.gotoIndicators()
      await loginPage.validLogin();
      await indicatorsPage.addIndicatorClick();
      await indicatorsPage.addIndicator(indicators.indicatorFullName, indicators.indicatorName, "Общий");
      await page.waitForSelector('text= Показатель создан');
      const preparedValues = [
        [indicators.indicatorName, value1],
  
    ]
    console.log(indicators.indicatorName)
    
     writeExsel(preparedValues, path.resolve("./upLoadItems/commonIndicatorsValues1.xlsx"))
  
  });
  
  test('Добавление значения индикатора через ексель', async ({ }) => {
  
  
    const commonIndicatorsValues = new CommonIndicatorsValues(page);
    const indicator = page.locator(lineOfTheGeneralIndicatorWithTheValue);
  
    await commonIndicatorsValues.gotoCommonIndicatorsValues();
    await commonIndicatorsValues.clickLoadValuesButton();
    await commonIndicatorsValues.selectionFromTheDropdownlist("2036")
    await commonIndicatorsValues.clickLsx(['./commonIndicatorsValues1.xlsx'])
    await commonIndicatorsValues.waitInformation()
    await commonIndicatorsValues.clickOnTheDownloadButton()
  
  
    await expect(indicator).toBeVisible();
  
  
  })
  });