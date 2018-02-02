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

    it('join - an empty match', async () => {
        let response  = await matchController.join({matchId: '123'}, update);
        expect(response).to.deep.equal({
            data: helpers.initializeRoom(),
            matchId: '123'
        });
    });

    it('join - an existing match', async () => {
        await matchController.join({matchId: '123'}, update);
        let response = await matchController.join({matchId: '123'}, update);

        expect(response).to.deep.equal({
            data: _.merge(helpers.initializeRoom(), {size: 2}),
            matchId: '123'
        });
    });

    it('leave - an existing match with other members', async () => {
        await matchController.join({matchId: '123'}, update);
        await matchController.leave({matchId: '123'}, update);

        let response = await redis.getMatch({matchId: '123'})

        expect(response).to.deep.equal(_.merge(helpers.initializeRoom(), {size: 0}));
    });

    it('leave -  an existing match with no one left', async () => {
        await matchController.join({matchId: '123'}, update);
        await matchController.leave({matchId: '123'}, update);
        await matchController.leave({matchId: '123'}, update);

        let response = await redis.getMatch({matchId: '123'})

        expect(response).to.deep.equal(_.merge(helpers.initializeRoom(), {size: 0}));
    });

    it('leave - a match that doesnt exists', async () => {
        let response = await matchController.leave({matchId: '123'}, update);
        expect(response).to.deep.equal({matchId: '123', data: undefined});
    });

    it('destroy - an existing match', async () => {
        let match = await matchController.join({matchId: '123'}, update);
        expect(match).to.deep.equal({
            data: helpers.initializeRoom(),
            matchId: '123'
        });

        await matchController.destroy({matchId: '123'});
        let matchShouldNotExist = redis.getMatch({matchId: 123});
        expect(_.isEmpty(matchShouldNotExist)).to.equal(true);
    });

    it('destroy - a non-existing match', async () => {
        let response = await matchController.destroy({matchId: '123'});
        expect(response).to.equal(true)
    });
});