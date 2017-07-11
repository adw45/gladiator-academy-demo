const playerSelect = {
    state: {
        teams: {},
        id: String
    },
    mutations: {
        update: (state, data) => {
            state.teams = data.teams;
        },
        connected: (state, data) => {
            state.id = data.id
        }
    }
}

module.exports = playerSelect;
