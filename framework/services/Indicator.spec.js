const {test, expect, request} = require('@playwright/test');
import config from "../config/config";

export const indicator = {

    createIndicator: async (token, name, abbreviation) => {
    const apiContext = await request.newContext();
    const response = await apiContext.post(config.baseURL +"/api/indicators", {
        data: {

            "name": `${name}`,
            "abbreviation": `${abbreviation}`,
            "type": 0,
            "isVisibleToParticipant": false,
            "descriptionForParticipant": null
  
        },
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-Role': 'admin',  
            'Accept': 'application/json',
        }
      });

      return response

    }


}