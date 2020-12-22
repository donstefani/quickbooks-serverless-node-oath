'use strict';

const AWS = require('aws-sdk');
const { oauthService, getApiUrl } = require('./services/auth/oauthService');
const { getBusinessData } = require('./services/setupDemos/company');

AWS.config.update({ region: process.env.REGION });
AWS.config.logger = console;

exports.handler = async (event, context, callback) => {
  const oauthClient = await oauthService();
  // console.log('CLIENT', oauthClient);
  const url = await getApiUrl();

  // DEMO: get business data
  const companyInfo = await getBusinessData(oauthClient, url);
  console.log('COMPANY INFO', companyInfo);
};
