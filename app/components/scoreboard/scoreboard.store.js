const scoreboard = {
    state: {
        redScore: null,
        blueScore: null,
        winner: null,
        winningTeam: null,
        losingTeam: null,
    },
    mutations: {
        update: (state, data) => {
            state.redScore = data.redScore;
            state.blueScore = data.blueScore;
            state.winner = data.phase.winner;
            state.winningTeam = data.phase.winningTeam;
            state.losingTeam = data.phase.losingTeam;
        }
    }
}

module.exports = scoreboard;
