const playerSelect = {
    state: {
        teams: {}
    },
    mutations: {
        update: (state, data) => {
            state.teams = data.teams;
        }
    }
}

module.exports = playerSelect;
