const redisMock = require('redis-mock'),
    _ = require('lodash'),
    redis = require('../data/redis')(redisMock),
    matchController = require('../controllers/match.controller')
    matchService = require('./match.service')(redis),
    teamService = require('./team.service')(redis),
    update = (matchId, data) => {
        return { matchId, data }
    };

describe('team-service', () => {
    beforeEach(() => {
        redisMock.createClient().flushall();
    });

    it('join - a new team', async () => {
        await matchService.join({matchId: '123'}, update);
        let response = await teamService.join({matchId: '123', id: 'my-id'}, {team: 'red'}, update);

        let expected = {data: matchController.createMatch(), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id', leader: true});

        expect(response).to.deep.equal(expected);
    });

    it('join - a team as fourth player', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id2'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id3'}, {team: 'red'}, update);
        let response = await teamService.join({matchId: '123', id: 'my-id4'}, {team: 'red'}, update);

        let expected = {data: matchController.createMatch(), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});
        expected.data.teams.red.players.push({id: 'my-id2', leader: false});
        expected.data.teams.red.players.push({id: 'my-id3', leader: false});
        expected.data.teams.red.players.push({id: 'my-id4', leader: false});

        expect(response).to.deep.equal(expected);
    });

    it('join - a full team', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id2'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id3'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id4'}, {team: 'red'}, update);
        let response = await teamService.join({matchId: '123', id: 'my-id-wont-join'}, {team: 'red'}, update);

        let expected = {data: matchController.createMatch(), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});
        expected.data.teams.red.players.push({id: 'my-id2', leader: false});
        expected.data.teams.red.players.push({id: 'my-id3', leader: false});
        expected.data.teams.red.players.push({id: 'my-id4', leader: false});

        expect(response).to.deep.equal(expected);
    });

    it('join - a team, while on the other team', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);
        let response = await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'blue'}, update);

        let expected = {data: matchController.createMatch(), matchId: '123'};
        expected.data.teams.blue.players.push({id: 'my-id1', leader: true});

        expect(response).to.deep.equal(expected);
    });

    it('leave - a team', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);
        let response = await teamService.leave({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);

        let expected = {data: matchController.createMatch(), matchId: '123'};

        expect(response).to.deep.equal(expected);
    });

    it('leave - a team where leader is reassigned', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id2'}, {team: 'red'}, update);
        let response = await teamService.leave({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);

        let expected = {data: matchController.createMatch(), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id2', leader: true});

        expect(response).to.deep.equal(expected);
    });

});
