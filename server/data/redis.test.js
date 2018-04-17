const redisMock = require('redis-mock'),
    matchController = require('../controllers/match.controller'),
    redis = require('../data/redis')(redisMock);

describe('redis', () => {
    beforeEach(async () => {
        await redis.createMatch({matchId: '123'}, matchController.createMatch('123'));
    });

    afterEach(() => {
        redisMock.createClient().flushall();
    });

    it('create -  new match', async () => {
        let result = await redis.createMatch({matchId: '1234'}, matchController.createMatch('123'));
        expect(await redis.getMatch({matchId: '1234'})).to.deep.equal(matchController.createMatch('123'))
    });

    it.skip('create - an already existing match', async () => {
        try {
            await redis.createMatch({matchId: '123'}, matchController.createMatch('123'));
            assert.fail(null, null,'this should throw an error when trying to create an identical room');
        }
        catch(err) {
            expect(err).to.deep.equal('some error')
        }
    });

    it('get - a match', async () => {
        let result = await redis.getMatch({matchId: '123'});
        expect(result).to.deep.equal(matchController.createMatch('123'));
    });

    it.skip('get - a non-existing match', async () => {
        // consider what is the optimal response here
        try {
            await redis.getMatch({matchId: '1234'});
            fail('this should throw an error when trying to create an identical room');
        }
        catch(err) {
            expect(err).to.deep.equal('some error')
        }
    });

    it('update - a match', async () => {
        let result = await redis.updateMatch({matchId: '123'}, (match) => {
            match.size += 1;
            return match;
        })
        expect(result).to.deep.equal(_.merge(matchController.createMatch('123'), {size: 1}))
    });

    it.skip('update - a non-exiting match', async () => {
        let result = await redis.updateMatch({matchId: '1234'}, (match) => {
            match.size += 1;
            return match;
        })
        expect(result).to.deep.equal(_.merge(matchController.createMatch('1234'), {size: 2}))
    });

    it('redis - delete - a match', async () => {
        let result = await redis.deleteMatch({matchId: '123'});
        expect(await redis.getMatch({matchId: '123'})).to.equal(null);
    });

    it.skip('delete - a non-existant match', async () => {
        let result = await redis.deleteMatch({matchId: '124'});
        expect(true).to.equal(false);
    })
});