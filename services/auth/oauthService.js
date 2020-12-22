'use strict';

const fs = require('fs');
const path = require('path');
const OAuthClient = require('intuit-oauth');

const dataFile = path.join(__dirname, '../../data/refreshToken.json');

const getBaseClient = async () => {
  const oauthClient = new OAuthClient({
    clientId: process.env.QB_CLIENT_ID,
    clientSecret: process.env.QB_CLIENT_SECRET,
    environment: process.env.QB_ENV,
    redirectUri: process.env.QB_REDIRECT_URL,
  });

  return oauthClient;
};

const getStoredRefreshToken = () => {
  const tokenObj = JSON.parse(fs.readFileSync(dataFile));
  // console.log('STORED REFRESH TOKEN', tokenObj);
  return tokenObj.refresh_token;
};

const writeStoredRefreshToken = async (newRefreshToken, event) => {
  try {
    const jsonData = JSON.stringify({
      refresh_token: newRefreshToken,
      date_time: event,
    });
    fs.writeFileSync(dataFile, jsonData);
    return true;
  } catch (error) {
    console.log('WRITE REF TOKEN ERROR', error);
    return false;
  }
};

/*
const validateToken = () => {
  const oauthClient = getBaseClient();
  if (oauthClient.isAccessTokenValid()) {
    console.log('The access_token is valid');
    return false;
  }

  const previousRefreshToken = getStoredRefreshToken();

  if (!oauthClient.isAccessTokenValid()) {
    oauthClient
      .refreshUsingToken(previousRefreshToken)
      .then((authResponse) => {
        console.log(`Tokens refreshed : ${JSON.stringify(authResponse.json())}`);
      })
      .catch((e) => {
        console.error(`The error message is :${e.originalMessage}`);
        console.error(e.intuit_tid);
      });
  }
};
*/

const oauthService = async () => {
  const oauthClient = await getBaseClient();
  const event = new Date().toString();

  try {
    const previousRefreshToken = getStoredRefreshToken();
    const tokenResp = await oauthClient.refreshUsingToken(previousRefreshToken);
    const newRefreshToken = tokenResp.json.refresh_token;
    const accessToken = tokenResp.json.access_token;
    oauthClient.token.access_token = accessToken;

    if (previousRefreshToken !== newRefreshToken) {
      writeStoredRefreshToken(newRefreshToken, event);
    }
    return oauthClient;
  } catch (error) {
    console.log('REFRESH ERROR', error);
    throw new Error('REFRESH TOKEN ERROR', error);
  }
};

const getApiUrl = async () => {
  const oauthClient = await oauthService();
  const url = oauthClient.environment === 'sandbox'
    ? OAuthClient.environment.sandbox
    : OAuthClient.environment.production;

  return url;
};

module.exports = {
  oauthService, getApiUrl, getStoredRefreshToken, writeStoredRefreshToken
};
