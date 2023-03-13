const {test, expect, request} = require('@playwright/test');
import { account } from '../framework/services/authorization.spec'
import { indicator} from '../framework/services/Indicator.spec'
import { generateIndicators } from '../framework/utils/generate-indicators'


test('Создание индикатора', async ()=>

{ 
    const indicators = generateIndicators();
    const responseAccount = await account.apiAuthorization()
    const token = responseAccount.access_token
    
    const createIndicator = await indicator.createIndicator(token, indicators.indicatorFullName, indicators.indicatorName)
    console.log('гав', createIndicator)

    const responseJson = await createIndicator.json();
    console.log('мяу', responseJson)

    expect(createIndicator).toBeOK();
    
    expect(createIndicator.ok()).toBeTruthy();

});