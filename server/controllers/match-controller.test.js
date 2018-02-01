const redisMock = require('redis-mock'),
    _ = require('lodash'),
    redis = require('../data/redis')(redisMock),
    matchController = require('./match-controller')(redis),
    helpers = require('../helper.js'),
    update = (matchId, data) => {
        return { matchId, data }
    };

describe('match-controller', () => {
    beforeEach(() => {
        redisMock.createClient().flushall();
    });

    it('match-controller - join an empty channel', async () => {
        let response  = await matchController.join({matchId: '123'}, update);
        expect(response).to.deep.equal({
            data: helpers.initializeRoom(),
            matchId: '123'
        });
    });

    it('match-controller - join an existing channel', async () => {
        await matchController.join({matchId: '123'}, update);
        let response = await matchController.join({matchId: '123'}, update);

        expect(response).to.deep.equal({
            data: _.merge(helpers.initializeRoom(), {size: 2}),
            matchId: '123'
        });
    });
});