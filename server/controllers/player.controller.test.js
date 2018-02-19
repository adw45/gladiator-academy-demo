const playerController = require('./player.controller');

describe('player-controller', () => {
    it('createPlayer', () => {
        let response = playerController.createPlayer(123, false);
        expect(response).to.deep.equal({
            id: 123,
            leader: false
        })
    });

    it('updateNickname', () => {
        const players = [
            {id: 123}
        ];

        let response = playerController.updateNickname(players, 123, {nickname: 'nickname'});

        expect(response).to.deep.equal([{
            id: 123,
            nickname: 'nickname'
        }])
    });

    it('updateBlizzardId', () => {
        const players = [
            {id: 123}
        ];

        let response = playerController.updateBlizzardId(players, 123, {blizzardId: 'blizzId'});

        expect(response).to.deep.equal([{
            id: 123,
            blizzardId: 'blizzId'
        }])
    });

    it('updateCharacterName', () => {
        const players = [
            {id: 123}
        ];

        let response = playerController.updateCharacterName(players, 123, {characterName: 'charName'});

        expect(response).to.deep.equal([{
            id: 123,
            characterName: 'charName'
        }])
    });

    it('updateClassSpec', () => {
        const players = [
            {id: 123}
        ];

        let response = playerController.updateClassSpec(players, 123, {classSpec: 'monk-mistweaver'});

        expect(response).to.deep.equal([{
            id: 123,
            classSpec: 'monk-mistweaver'
        }])
    });

    it('updateFaction', () => {
        const players = [
            {id: 123}
        ];

        let response = playerController.updateFaction(players, 123, {faction: 'horde'});

        expect(response).to.deep.equal([{
            id: 123,
            faction: 'horde'
        }])
    });

    it('updateBlizzardId - happy path', () => {
        const players = [
            {id: 123, leader: true},
            {id: 1234, leader: false}
        ];

        let response = playerController.updateLeader(players, {oldLeader: 123, newLeader: 1234});

        expect(response).to.deep.equal([
            {id: 123, leader: false},
            {id: 1234, leader: true},
        ])
    });

    it('updateBlizzardId - not the leader', () => {
        const players = [
            {id: 123, leader: false},
            {id: 1234, leader: true}
        ];

        let response = playerController.updateLeader(players, {oldLeader: 123, newLeader: 1234});

        expect(response).to.deep.equal([
            {id: 123, leader: false},
            {id: 1234, leader: true},
        ])
    });
});