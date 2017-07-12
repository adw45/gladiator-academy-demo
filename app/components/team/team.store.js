const team = {
    state: {
        red: {},
        blue: {}
    },
    mutations: {
        update: (state, data) => {
            state.red = {
                size: data.teams.red.players.length,
                leader: _.find(data.teams.red.players, { leader: true }),
                players: data.teams.red.players
            };
            state.blue = {
                size: data.teams.blue.players.length,
                leader: _.find(data.teams.blue.players, { leader: true }),
                players: data.teams.blue.players
            };
        }
    }
}

module.exports = team;
