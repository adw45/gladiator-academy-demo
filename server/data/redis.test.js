const redisMock = require('redis-mock'),
    redis = require('../data/redis')(redisMock),
    helper = require('../helper');

describe('redis', () => {
    beforeEach(() => {
        redis.createMatch({matchId: '123'}, helper.initializeRoom());
    });

    afterEach(() => {
        redisMock.createClient().flushall();
    });

    it('redis - get a match', async () => {
        let result = await redis.getMatch({matchId: '123'});
        expect(result).to.deep.equal(helper.initializeRoom());
    });

    it('redis - create new match', async () => {
        let result = await redis.createMatch({matchId: '1234'}, helper.initializeRoom());
        expect(await redis.getMatch({matchId: '1234'})).to.deep.equal(helper.initializeRoom())
    });
});