let redisMock = require('redis-mock'),
    _ = require('lodash'),
    redis = require('../data/redis')(redisMock),
    phaseService = require('./phase.service')(redis),
    matchService = require('./match.service')(redis),
    teamService = require('./team.service')(redis),
    playerService = require('./player.service')(redis),
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

        let expected = {data: _.merge(matchController.createMatch('123'), {size: 1}), matchId: '123'};
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

        let expected = {data: _.merge(matchController.createMatch('123'), {size: 1}), matchId: '123'};
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

        let expected = {data: _.merge(matchController.createMatch('123'), {size: 1}), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});
        expected.data.teams.red.players.push({id: 'my-id2', leader: false});
        expected.data.teams.red.players.push({id: 'my-id3', leader: false});
        expected.data.teams.red.players.push({id: 'my-id4', leader: false});
        expected.data.phase.ready.red = true;

        expect(response).to.deep.equal(expected);
    });

    it('phase - form-group - both teams ready phase -> blind-pick', async () => {
        let response =  await setupPhaseToBlindPick()

        let expected = {data: _.merge(matchController.createMatch('123'), {size: 1}), matchId: '123'};
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

    it('phase - form-group - unready a team of 3 players', async () => {
        await matchService.join({matchId: '123'}, update);
        await teamService.join({matchId: '123', id: 'my-id1'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id2'}, {team: 'red'}, update);
        await teamService.join({matchId: '123', id: 'my-id3'}, {team: 'red'}, update);

        let readyResponse = await phaseService.ready({matchId: '123', id:'my-id1'}, {team: 'red'}, update);

        let expected = {data: _.merge(matchController.createMatch('123'), {size: 1}), matchId: '123'};
        expected.data.teams.red.players.push({id: 'my-id1', leader: true});
        expected.data.teams.red.players.push({id: 'my-id2', leader: false});
        expected.data.teams.red.players.push({id: 'my-id3', leader: false});
        expected.data.phase.ready.red = true;

        expect(readyResponse).to.deep.equal(expected);

        let unreadyResponse = await phaseService.unready({matchId: '123', id:'my-id1'}, {team: 'red'}, update);

        expected.data.phase.ready.red = false;

        expect(unreadyResponse).to.deep.equal(expected);
    });

    it('phase - blind pick - teams pick characters', async () => {
        await setupPhaseToBlindPick();
        await setupBlindPickPlayers('red', 'horde', 'my');
        let response = await setupBlindPickPlayers('blue', 'alliance', 'your');

        let expected = blindPickExpected();

        expect(response).to.deep.equal(expected);
    });

    it('phase - blind pick - both teams ready -> first round', async () => {
        await setupPhaseToBlindPick();
        await setupBlindPickPlayers('red', 'horde', 'my');
        let response = await setupBlindPickPlayers('blue', 'alliance', 'your');

        let expected = blindPickExpected();

        expect(response).to.deep.equal(expected);
    });
});

const setupPhaseToBlindPick = async () => {
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
    return await phaseService.ready({matchId: '123', id:'your-id1'}, {team: 'blue'}, update);
};

const blindPickExpected = () => {
    let expected = {data: _.merge(matchController.createMatch('123'), {size: 1}), matchId: '123'};
        expected.data.teams.red.players.push({
            id: 'my-id1', leader: true, blizzardId: 'blizzId1', characterName: 'characterName1',
            classSpec: 'class-spec1', faction: 'horde', nickname: 'nickname1'
        });
        expected.data.teams.red.players.push({
            id: 'my-id2', leader: false, blizzardId: 'blizzId2', characterName: 'characterName2',
            classSpec: 'class-spec2', faction: 'horde', nickname: 'nickname2'
        });
        expected.data.teams.red.players.push({
            id: 'my-id3', leader: false, blizzardId: 'blizzId3', characterName: 'characterName3',
            classSpec: 'class-spec3', faction: 'horde', nickname: 'nickname3'
        });
        expected.data.teams.red.players.push({id: 'my-id4', leader: false});

        expected.data.teams.blue.players.push({
            id: 'your-id1', leader: true, blizzardId: 'blizzId1', characterName: 'characterName1',
            classSpec: 'class-spec1', faction: 'alliance', nickname: 'nickname1'
        });
        expected.data.teams.blue.players.push({
            id: 'your-id2', leader: false, blizzardId: 'blizzId2', characterName: 'characterName2',
            classSpec: 'class-spec2', faction: 'alliance', nickname: 'nickname2'
        });
        expected.data.teams.blue.players.push({
            id: 'your-id3', leader: false, blizzardId: 'blizzId3', characterName: 'characterName3',
            classSpec: 'class-spec3', faction: 'alliance', nickname: 'nickname3'
        });
        expected.data.teams.blue.players.push({id: 'your-id4', leader: false});

        expected.data.phase.type = 'blind-pick';

        return expected;
}

const setupBlindPickPlayers = async(team, faction, who) => {
    await setupPlayer({matchId: '123', id: `${who}-id1`}, { team, blizzardId: 'blizzId1',
        characterName: 'characterName1', classSpec: 'class-spec1', faction, nickname: 'nickname1'});
    await setupPlayer({matchId: '123', id: `${who}-id2`}, { team, blizzardId: 'blizzId2',
        characterName: 'characterName2', classSpec: 'class-spec2', faction, nickname: 'nickname2'});
    return await setupPlayer({matchId: '123', id: `${who}-id3`}, { team, blizzardId: 'blizzId3',
        characterName: 'characterName3', classSpec: 'class-spec3', faction, nickname: 'nickname3'});
}

const setupPlayer = async (request, data) => {
    await playerService.blizzardId(request, {team: data.team, blizzardId: data.blizzardId}, update);
    await playerService.characterName(request, {team: data.team, characterName: data.characterName}, update);
    await playerService.classSpec(request, {team: data.team, classSpec: data.classSpec}, update);
    await playerService.faction(request, {team: data.team, faction: data.faction}, update);
    return await playerService.nickname(request, {team: data.team, nickname: data.nickname}, update);
}
