const {test, expect, request} = require('@playwright/test');

export const account = {

    
    apiAuthorization: async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.post("https://passport.skbkontur.ru/connect/token", {
        data: process.env.apiLogin ,
        headers: {
            authorization: process.env.authorizationApi,
            "Content-Type": "application/x-www-form-urlencoded" }
      });

      const responseJson = await response.json()
      return responseJson

    },


}
    

