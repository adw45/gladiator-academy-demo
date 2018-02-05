let redisMock = require('redis-mock'),
    _ = require('lodash'),
    redis = require('../data/redis')(redisMock),
    phaseService = require('./phase.service')(redis),
    matchService = require('./match.service')(redis),
    teamService = require('./team.service')(redis),
    matchController = require('../controllers/match.controller'),
    update = (matchId, data) => {
        return { matchId, data }
    };


describe('phase-service', () => {
    beforeEach(() => {
        redisMock.createClient().flushall();
    });

    it('phase - form-group - ready a team of 2 players', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id2'}, {team: 'red'}, update);

        let response = await phaseService.ready({matchId: '123', id:'my-id1'}, {team: 'red'}, update)

        let expected = {data: matchController.createMatch(), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});
        expected.data.teams.red.players.push({id: 'my-id2', leader: false});
        expected.data.phase.ready.red = false;

        expect(response).to.deep.equal(expected);
    });

    it('phase - form-group - ready a team of 3 players', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id2'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id3'}, {team: 'red'}, update);

        let response = await phaseService.ready({matchId: '123', id:'my-id1'},{team: 'red'}, update)

        let expected = {data: matchController.createMatch(), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});
        expected.data.teams.red.players.push({id: 'my-id2', leader: false});
        expected.data.teams.red.players.push({id: 'my-id3', leader: false});
        expected.data.phase.ready.red = true;

        expect(response).to.deep.equal(expected);
    });

    it('phase - form-group - ready a team of 4 players', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id2'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id3'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id4'}, {team: 'red'}, update);

        let response = await phaseService.ready({matchId: '123', id:'my-id1'}, {team: 'red'}, update)

        let expected = {data: matchController.createMatch(), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});
        expected.data.teams.red.players.push({id: 'my-id2', leader: false});
        expected.data.teams.red.players.push({id: 'my-id3', leader: false});
        expected.data.teams.red.players.push({id: 'my-id4', leader: false});
        expected.data.phase.ready.red = true;

        expect(response).to.deep.equal(expected);
    });

    it('phase - form-group - both teams ready phase -> blind-pick', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id2'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id3'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id4'}, {team: 'red'}, update);

        await teamService.join({matchId: '123', id: 'your-id1'}, {team: 'blue'}, update);
        await teamService.join({matchId: '123', id: 'your-id2'}, {team: 'blue'}, update);
        await teamService.join({matchId: '123', id: 'your-id3'}, {team: 'blue'}, update);
        await teamService.join({matchId: '123', id: 'your-id4'}, {team: 'blue'}, update);

        await phaseService.ready({matchId: '123', id:'my-id1'}, {team: 'red'}, update);
        let response = await phaseService.ready({matchId: '123', id:'your-id1'}, {team: 'blue'}, update);

        let expected = {data: matchController.createMatch(), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});
        expected.data.teams.red.players.push({id: 'my-id2', leader: false});
        expected.data.teams.red.players.push({id: 'my-id3', leader: false});
        expected.data.teams.red.players.push({id: 'my-id4', leader: false});

        expected.data.teams.blue.players.push({id: 'your-id1', leader: true});
        expected.data.teams.blue.players.push({id: 'your-id2', leader: false});
        expected.data.teams.blue.players.push({id: 'your-id3', leader: false});
        expected.data.teams.blue.players.push({id: 'your-id4', leader: false});

        expected.data.phase.type = 'blind-pick';

        expect(response).to.deep.equal(expected);
    });

    it('phase - unready a team of 3 players', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id2'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id3'}, {team: 'red'}, update);

        let readyResponse = await phaseService.ready({matchId: '123', id:'my-id1'}, {team: 'red'}, update);

        let expected = {data: matchController.createMatch(), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});
        expected.data.teams.red.players.push({id: 'my-id2', leader: false});
        expected.data.teams.red.players.push({id: 'my-id3', leader: false});
        expected.data.phase.ready.red = true;

        expect(readyResponse).to.deep.equal(expected);

        let unreadyResponse = await phaseService.unready({matchId: '123', id:'my-id1'}, {team: 'red'}, update);

        expected.data.phase.ready.red = false;

        expect(unreadyResponse).to.deep.equal(expected);
    });

});