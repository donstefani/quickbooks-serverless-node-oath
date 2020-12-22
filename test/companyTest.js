const chai = require('chai');

const { expect } = chai;
chai.use(require('chai-as-promised'));
const { getBusinessData } = require('../services/setupDemos/company');
const { oauthService, getApiUrl } = require('../services/auth/oauthService');

describe('company tests', async function () {
  const oauthClient = await oauthService();
  const url = await getApiUrl();

  describe('get company data', () => {
    it('shoud return true (boolean)', function () {
      return expect(getBusinessData(oauthClient, url)).to.eventually.be.a(
        'object'
      );
    });
  });
});
