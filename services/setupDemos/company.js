'use strict';

const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.REGION });
AWS.config.logger = console;

const companyId = process.env.QB_COMPANY_ID;

const getBusinessData = async (oauthClient, url) => {
  try {
    const authResponse = await oauthClient
      .makeApiCall({ url: `${url}v3/company/${companyId}/companyinfo/${companyId}`, });
    const respObj = JSON.parse(JSON.stringify(authResponse));
    const companyInfo = JSON.parse(respObj.body);
    // console.log(companyInfo.CompanyInfo.CompanyName);
    return companyInfo;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = { getBusinessData };
