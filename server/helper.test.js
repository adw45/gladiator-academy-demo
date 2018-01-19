var helper = require('./helper')

describe('helper', function () {
    it('both teams ready', function () {
        assert.isTrue(helper.bothTeamsReady({red: true, blue: true}));
    });
});