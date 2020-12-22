/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const LambdaTester = require('lambda-tester');

const { handler } = require('../quickbooksSyncCron');

describe('QB SYNC TEST', function () {
  const event = {};

  describe('lambda test one', function () {
    it('test one success', async function () {
      await LambdaTester(handler).event(event).timeout(20000).expectResult();
    });
  });
});
