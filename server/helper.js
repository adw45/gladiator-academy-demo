let initializeRoom = () => {
        return {
            type: 'standard',
            bestOf: 3,
            redScore: 0,
            blueScore: 0,
            teams: {
                red: {
                    players: []
                },
                blue: {
                    players: []
                }
            },
            phase: {
                type: 'form-team',
                ready: {
                    red: false,
                    blue: false
                }
            },
            maps: [
                {
                    name: 'nagrand',
                    displayName: 'Nagrand Arena',
                    winner: null,
                    selected: true
                },
                {
                    name: 'blades-edge',
                    displayName: 'Blade\'s Edge Arena',
                    winner: null,
                    selected: false
                },
                {
                    name: 'dalaran',
                    displayName: 'Dalaran Sewers',
                    winner: null,
                    selected: false
                },
                {
                    name: 'tiger-peak',
                    displayName: 'Tigers Peak',
                    winner: null,
                    selected: false
                },
                {
                    name: 'tolvaran',
                    displayName: 'Tol\'varan Arena',
                    winner: null,
                    selected: false
                },
                {
                    name: 'ruins',
                    displayName: 'Ruins of Lordaeron',
                    winner: null,
                    selected: false
                },
                {
                    name: 'ashmanes',
                    displayName: 'Ashmane\'s Fall',
                    winner: null,
                    selected: false
                },
                {
                    name: 'black-rook',
                    displayName: 'Black Rook Hold',
                    winner: null,
                    selected: false
                }
            ]
        }
    },
    bothTeamsReady = (ready) => {
        return ready.red && ready.blue;
    };

module.exports = {
    initializeRoom,
    bothTeamsReady
};
