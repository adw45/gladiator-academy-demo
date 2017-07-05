function initializeRoom() {
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
        maps: [
            {
                name: 'Nagrand Arena',
                imageUrl: 'http://media.blizzard.com/wow/media/screenshots/pvp/guide/arenas/nagrand-1-thumbnail.jpg',
                winner: null,
                selected: true
            },
            {
                name: 'Blade\'s Edge Arena',
                winner: null,
                imageUrl: 'http://media.blizzard.com/wow/media/screenshots/pvp/guide/arenas/blades-edge-1-thumbnail.jpg',
                selected: false
            },
            {
                name: 'Dalaran Sewers',
                winner: null,
                imageUrl: 'http://media.blizzard.com/wow/media/screenshots/pvp/guide/arenas/dalaran-sewers-1-thumbnail.jpg',
                selected: false
            },
            {
                name: 'Tigers Peak',
                winner: null,
                imageUrl: 'http://media.blizzard.com/wow/media/screenshots/pvp/guide/arenas/tigers-peak-1-thumbnail.jpg',
                selected: false
            },
            {
                name: 'Tol\'varan Arena',
                imageUrl: 'http://media.blizzard.com/wow/media/screenshots/pvp/guide/arenas/tolviron-1-thumbnail.jpg',
                winner: null,
                selected: false
            },
            {
                name: 'Ruins of Lordaeron',
                imageUrl: 'http://media.blizzard.com/wow/media/screenshots/pvp/guide/arenas/ruins-of-lordaeron-1-thumbnail.jpg',
                winner: null,
                selected: false
            },
            {
                name: 'Ashmane\'s Fall',
                winner: null,
                selected: false
            },
            {
                name: 'Black Rook Hold',
                winner: null,
                selected: false
            }
        ]
    }
}

module.exports = {
    initializeRoom
};
