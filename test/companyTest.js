/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const chai = require('chai');

const { expect } = chai;
chai.use(require('chai-as-promised'));
const { getBusinessData } = require('../services/setupDemos/company');
const { oauthService, getApiUrl } = require('../services/auth/oauthService');

describe('comapny tests', async function () {
  const oauthClient = await oauthService();
  const url = await getApiUrl();

  describe('get company data', () => {
    it('shoud return true (boolean)', function () {
      // const result = await getBusinessData(oauthClient, url);
      // result.should.equal(true);
      return expect(getBusinessData(oauthClient, url)).to.eventually.be.a('object');
    });
  });
});
