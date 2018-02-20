const redisMock = require('redis-mock'),
    _ = require('lodash'),
    redis = require('../data/redis')(redisMock),
    matchService = require('./match.service')(redis),
    matchController = require('../controllers/match.controller')
    update = (matchId, data) => {
        return { matchId, data }
    };

describe('match-service', () => {
    beforeEach(() => {
        redisMock.createClient().flushall();
    });

    it('join - an empty match', async () => {
        let response  = await matchService.join({matchId: '123'}, update);
        expect(response).to.deep.equal({
            data: _.merge(matchController.createMatch('123'), {size: 1}),
            matchId: '123'
        });
    });

    it('join - an existing match', async () => {
        await matchService.join({matchId: '123'}, update);
        let response = await matchService.join({matchId: '123'}, update);

        expect(response).to.deep.equal({
            data: _.merge(matchController.createMatch('123'), {size: 2}),
            matchId: '123'
        });
    });

    it('leave - an existing match with other members', async () => {
        await matchService.join({matchId: '123'}, update);
        await matchService.leave({matchId: '123'}, update);

        let response = await redis.getMatch({matchId: '123'})

        expect(response).to.deep.equal(_.merge(matchController.createMatch('123'), {size: 0}));
    });

    it('leave -  an existing match with no one left', async () => {
        await matchService.join({matchId: '123'}, update);
        await matchService.leave({matchId: '123'}, update);
        await matchService.leave({matchId: '123'}, update);

        let response = await redis.getMatch({matchId: '123'})

        expect(response).to.deep.equal(_.merge(matchController.createMatch('123'), {size: 0}));
    });

    it('leave - a match that doesnt exists', async () => {
        let response = await matchService.leave({matchId: '123'}, update);
        expect(response).to.deep.equal({matchId: '123', data: undefined});
    });

    it('destroy - an existing match', async () => {
        let match = await matchService.join({matchId: '123'}, update);
        expect(match).to.deep.equal({
            data: _.merge(matchController.createMatch('123'), {size: 1}),
            matchId: '123'
        });

        await matchService.destroy({matchId: '123'});
        let matchShouldNotExist = redis.getMatch({matchId: '123'});
        expect(_.isEmpty(matchShouldNotExist)).to.equal(true);
    });

    it('destroy - a non-existing match', async () => {
        let response = await matchService.destroy({matchId: '123'});
        expect(response).to.equal(true)
    });
});