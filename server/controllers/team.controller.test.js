const teamController = require('./team.controller');

describe('team-controller', () => {

    it('createTeam', () => {
        let teams = teamController.createTeam();

        expect(teams).to.deep.equal({
            blue: {
                players: []
            },
            red: {
                players: []
            }
        });
    });

    it('joinTeam - first player joins, assigned leader', () => {
        const team =  { players: [] };

        let response = teamController.joinTeam(
            {
                red: team,
                blue: {players: []}
            },
            123,
            {team: 'red'}
        );

        expect(response).to.deep.equal({
            blue: { players: [] },
            red: {
                players: [
                    {id: 123, leader: true}
                ]
            }
        });
    });

    it('joinTeam - leader already exists', () => {
        const team =  { players: [ {id: 123, leader: true} ] };

        let response = teamController.joinTeam(
            {
                red: team,
                blue: {players: []}
            },
            1234,
            {team: 'red'}
        );

        expect(response).to.deep.equal({
            blue: { players: [] },
            red: {
                players: [
                    {id: 123, leader: true},
                    {id: 1234, leader: false}
                ]
            }
        });
    });

    it('joinTeam - player is currently on opposing team', () => {
        const teams =  {
            red: { players: [ {id: 123, leader: true}, {id: 1234, leader: false}, ] },
            blue: { players: [] }
        };

        let response = teamController.joinTeam(teams, 123, {team: 'blue'});

        expect(response).to.deep.equal({
            blue: {
                players: [
                    {id: 123, leader: true}
                ]
            },
            red: {
                players: [
                    {id: 1234, leader: true}
                ]
            }
        });
    });

    it('leaveTeam - leader leaves', () => {
        const team =  {
            players: [
                {id: 123, characterName: 'player1', leader: true},
                {id: 1234, characterName: 'player2'}
            ]
        };

        let response = teamController.leaveTeam(team, 123);

        expect(response).to.deep.equal({
            players: [
                {id: 1234, characterName: 'player2', leader: true}
            ]
        });
    });

    it('leaveTeam - non-leader leaves', () => {
        const team =  {
            players: [
                {id: 123, characterName: 'player1', leader: true},
                {id: 1234, characterName: 'player2'}
            ]
        };

        let response = teamController.leaveTeam(team, 1234);

        expect(response).to.deep.equal({
            players: [
                {id: 123, characterName: 'player1', leader: true}
            ]
        });
    });

    it('removePlayerFromTeams - replace leader', () => {
        const teams =  {
            red: {
                players: [
                    {id: 123, characterName: 'player1', leader: true},
                    {id: 1234, characterName: 'player2'}
                ]
            },
            blue: {
                players: []
            }
        }

        let response = teamController.removePlayerFromTeams(teams, 123);

        expect(response).to.deep.equal({
            red: {
                players: [
                    {id: 1234, characterName: 'player2', leader: true}
                ]
            },
            blue: {
                players: []
            }
        });
    });

    it('removePlayerFromTeams - keep same leader', () => {
        const teams =  {
            blue: {
                players: [
                    {id: 123, characterName: 'player1', leader: true},
                    {id: 1234, characterName: 'player2'}
                ]
            },
            red: {
                players: []
            }
        }

        let response = teamController.removePlayerFromTeams(teams, 1234);

        expect(response).to.deep.equal({
            blue: {
                players: [
                    {id: 123, characterName: 'player1', leader: true}
                ]
            },
            red: {
                players: []
            }
        });
    });

    it('hasThreeOrMorePlayers - has 3 players', () => {
        const team =  {
            players: [
                {characterName: 'player1'},
                {characterName: 'player2'},
                {characterName: 'player3'}
            ]
        }

        let response = teamController.hasThreeOrMorePlayers(team)

        expect(response).to.be.true;
    });

    it('hasThreeSelectedPlayers - has 2 players', () => {
        const team =  {
            players: [
                {characterName: 'player1', classSpec: 'classSpec1'},
                {characterName: 'player2', classSpec: 'classSpec2'}
            ]
        }

        let response = teamController.hasThreeSelectedPlayers(team)

        expect(response).to.be.false;
    });

    it('hasThreeSelectedPlayers - has 3 players', () => {
        const team =  {
            players: [
                {characterName: 'player1', classSpec: 'classSpec1'},
                {characterName: 'player2', classSpec: 'classSpec2'},
                {characterName: 'player3', classSpec: 'classSpec3'}
            ]
        }

        let response = teamController.hasThreeSelectedPlayers(team)

        expect(response).to.be.true;
    });

    it('hasThreeSelectedPlayers - has 4 players', () => {
        const team =  {
            players: [
                {characterName: 'player1', classSpec: 'classSpec1'},
                {characterName: 'player2', classSpec: 'classSpec2'},
                {characterName: 'player3', classSpec: 'classSpec3'},
                {characterName: 'player4', classSpec: 'classSpec4'}
            ]
        }

        let response = teamController.hasThreeSelectedPlayers(team)

        expect(response).to.be.false;
    });

    it('isSameFaction - all same faction', () => {
        const team =  {
            players: [
                {faction: 'horde'},
                {faction: 'horde'},
                {faction: 'horde'},
                {}
            ]
        }

        let response = teamController.isSameFaction(team)

        expect(response).to.be.true;
    });

    it('isSameFaction - one wrong faction', () => {
        const team =  {
            players: [
                {faction: 'horde'},
                {faction: 'horde'},
                {faction: 'alliance'},
                {}
            ]
        }

        let response = teamController.isSameFaction(team)

        expect(response).to.be.false;
    });

});