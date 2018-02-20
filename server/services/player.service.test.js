let redisMock = require('redis-mock'),
    _ = require('lodash'),
    redis = require('../data/redis')(redisMock),
    matchService = require('./match.service')(redis),
    teamService = require('./team.service')(redis),
    playerService = require('./player.service')(redis),
    matchController = require('../controllers/match.controller'),
    update = (matchId, data) => {
        return { matchId, data }
    };

describe('player-service', () => {
    beforeEach(() => {
        redisMock.createClient().flushall();
    });

    it('player - nickname', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);

        let response = await playerService.nickname({matchId: '123', id:'my-id1'},
            {team: 'red', nickname: 'hello world'}, update)

        let expected = {data: _.merge(matchController.createMatch('123'), {size: 1}), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});
        expected.data.teams.red.players[0].nickname = 'hello world';

        expect(response).to.deep.equal(expected);
    });

    it('player - nickname - player doesnt exist', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);

        let response = await playerService.nickname({matchId: '123', id:'my-id1-xxx'},
            {team: 'red', nickname: 'hello world'}, update)

        let expected = {data: _.merge(matchController.createMatch('123'), {size: 1}), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});

        expect(response).to.deep.equal(expected);
    });

    it('player - blizzardId', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);

        let response = await playerService.blizzardId({matchId: '123', id:'my-id1'},
            {team: 'red', blizzardId: 'hello world'}, update)

        let expected = {data: _.merge(matchController.createMatch('123'), {size: 1}), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});
        expected.data.teams.red.players[0].blizzardId = 'hello world';

        expect(response).to.deep.equal(expected);
    });

    it('player - blizzardId - player doesnt exist', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);

        let response = await playerService.blizzardId({matchId: '123', id:'my-id1-xxx'},
            {team: 'red', blizzardId: 'hello world'}, update)

        let expected = {data: _.merge(matchController.createMatch('123'), {size: 1}), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});

        expect(response).to.deep.equal(expected);
    });

    it('player - characterName', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);

        let response = await playerService.characterName({matchId: '123', id:'my-id1'},
            {team: 'red', characterName: 'hello world'}, update)

        let expected = {data: _.merge(matchController.createMatch('123'), {size: 1}), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});
        expected.data.teams.red.players[0].characterName = 'hello world';

        expect(response).to.deep.equal(expected);
    });

    it('player - characterName - player doesnt exist', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);

        let response = await playerService.characterName({matchId: '123', id:'my-id1-xxx'},
            {team: 'red', characterName: 'hello world'}, update)

        let expected = {data: _.merge(matchController.createMatch('123'), {size: 1}), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});

        expect(response).to.deep.equal(expected);
    });


    it('player - classSpec', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);

        let response = await playerService.classSpec({matchId: '123', id:'my-id1'},
            {team: 'red', classSpec: 'hello world'}, update)

        let expected = {data: _.merge(matchController.createMatch('123'), {size: 1}), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});
        expected.data.teams.red.players[0].classSpec = 'hello world';

        expect(response).to.deep.equal(expected);
    });

    it('player - classSpec - player doesnt exist', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);

        let response = await playerService.classSpec({matchId: '123', id:'my-id1-xxx'},
            {team: 'red', classSpec: 'hello world'}, update)

        let expected = {data: _.merge(matchController.createMatch('123'), {size: 1}), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});

        expect(response).to.deep.equal(expected);
    });

    it('player - leader', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id2'}, {team: 'red'}, update);

        let response = await playerService.leader({matchId: '123', id:'my-id1'},
            {team: 'red', playerId: 'my-id2'}, update)

        let expected = {data: _.merge(matchController.createMatch('123'), {size: 1}), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});
        expected.data.teams.red.players[0].leader = false;

        expected.data.teams.red.players.push({id: 'my-id2', leader: false});
        expected.data.teams.red.players[1].leader = true;

        expect(response).to.deep.equal(expected);
    });

    it('player - leader - player doesnt exist', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);

        let response = await playerService.leader({matchId: '123', id:'my-id1'},
            {team: 'red', playerId: 'my-id2'}, update)

        let expected = {data: _.merge(matchController.createMatch('123'), {size: 1}), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});
        expected.data.teams.red.players[0].leader = true;

        expect(response).to.deep.equal(expected);
    });

    it('player - faction', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);

        let response = await playerService.faction({matchId: '123', id:'my-id1'},
            {team: 'red', faction: 'horde'}, update)

        let expected = {data: _.merge(matchController.createMatch('123'), {size: 1}), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});
        expected.data.teams.red.players[0].faction = 'horde';

        expect(response).to.deep.equal(expected);
    });

    it('player - faction - player doesnt exist', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);

        let response = await playerService.faction({matchId: '123', id:'my-id1-xxx'},
            {team: 'red', classSpec: 'horde'}, update)

        let expected = {data: _.merge(matchController.createMatch('123'), {size: 1}), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});

        expect(response).to.deep.equal(expected);
    });

});