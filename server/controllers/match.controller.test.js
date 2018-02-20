const matchController = require('./match.controller'),
    teamController = require('./team.controller'),
    phaseController = require('./phase.controller'),
    mapController = require('./map.controller');

describe('match-controller', () => {
    it('createMatch', () => {
        let response = matchController.createMatch('matchId');

        expect(response).to.deep.equal({
            id: 'matchId',
            type: 'standard',
            size: 0,
            bestOf: 3,
            redScore: 0,
            blueScore: 0,
            teams: teamController.createTeam(),
            phase: phaseController.getInitialPhase(),
            maps: mapController.createMapList()
        });
    });

    it('joinMatch', () => {
        let match = matchController.createMatch('matchId');

        let response = matchController.joinExistingMatch(match)

        expect(response).to.deep.equal({
            id: 'matchId',
            type: 'standard',
            size: 1,
            bestOf: 3,
            redScore: 0,
            blueScore: 0,
            teams: teamController.createTeam(),
            phase: phaseController.getInitialPhase(),
            maps: mapController.createMapList()
        });
    });

    it('leaveMatch - on a team', () => {
        let match = matchController.createMatch('matchId');

        let response = matchController.joinExistingMatch(match)
            response.teams = teamController.joinTeam(match.teams, '123', {team: 'red'});


        expect(response).to.deep.equal({
            id: 'matchId',
            type: 'standard',
            size: 1,
            bestOf: 3,
            redScore: 0,
            blueScore: 0,
            teams: {
                red: {
                    players: [
                        {id: '123', leader: true}
                    ]
                },
                blue: {
                    players: []
                }
            },
            phase: phaseController.getInitialPhase(),
            maps: mapController.createMapList()
        });

        response = matchController.leaveMatch(response, '123');

        expect(response).to.deep.equal({
            id: 'matchId',
            type: 'standard',
            size: 0,
            bestOf: 3,
            redScore: 0,
            blueScore: 0,
            teams: teamController.createTeam(),
            phase: phaseController.getInitialPhase(),
            maps: mapController.createMapList()
        });

    });

});