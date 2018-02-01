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

    it('redis - create -  new match', async () => {
        let result = await redis.createMatch({matchId: '1234'}, helper.initializeRoom());
        expect(await redis.getMatch({matchId: '1234'})).to.deep.equal(helper.initializeRoom())
    });

    it.skip('redis - create - an already existing match', async () => {
        try {
            await redis.createMatch({matchId: '123'}, helper.initializeRoom());
            assert.fail(null, null,'this should throw an error when trying to create an identical room');
        }
        catch(err) {
            expect(err).to.deep.equal('some error')
        }
    });

    it('redis - get - a match', async () => {
        let result = await redis.getMatch({matchId: '123'});
        expect(result).to.deep.equal(helper.initializeRoom());
    });

    it.skip('redis - get - a non-existing match', async () => {
        // consider what is the optimal response here
        try {
            await redis.getMatch({matchId: '1234'});
            fail('this should throw an error when trying to create an identical room');
        }
        catch(err) {
            expect(err).to.deep.equal('some error')
        }
    });

    it('redis - update - a match', async () => {
        let result = await redis.updateMatch({matchId: '123'}, (match) => {
            match.size += 1;
            return match;
        })
        expect(result).to.deep.equal(_.merge(helper.initializeRoom(), {size: 2}))
    });

    it.skip('redis - update - a non-exiting match', async () => {
        let result = await redis.updateMatch({matchId: '1234'}, (match) => {
            match.size += 1;
            return match;
        })
        expect(result).to.deep.equal(_.merge(helper.initializeRoom(), {size: 2}))
    });

    it('redis - delete - a match', async () => {
        let result = await redis.deleteMatch({matchId: '123'});
        expect(await redis.getMatch({matchId: '123'})).to.equal(null);
    });

    it.skip('redis - delete - a non-existant match', async () => {

    })
});