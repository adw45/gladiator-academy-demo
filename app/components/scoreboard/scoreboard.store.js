const scoreboard = {
    state: {
        redScore: null,
        blueScore: null
    },
    mutations: {
        update: (state, data) => {
            state.redScore = data.redScore;
            state.blueScore = data.blueScore;
        }
    }
}

module.exports = scoreboard;
