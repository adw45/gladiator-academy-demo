let _ = require('lodash'),
    teamController = require('./team.controller');

const getInitialPhase = () => {
    return {
        type: 'form-team',
        ready: {
            red: false,
            blue: false
        }
    }
}

const teamReady = (phase, team) => {
    if (phase.type === 'form-team') {
        if(isTeamFormed(team.team)) {
            phase.ready[team.color] = true
        }
    }

    if (bothTeamsReady(phase)) {
        return next(phase)
    }

    return phase
}

const teamUnready = (phase, team) => {
    phase.ready[team] = false
    return phase;
}

const next = (phase) => {
    if(phase.type === 'form-team') {
        return {
            type: 'blind-pick',
            ready: {
                red: false,
                blue: false
            }
        }
    }
    return 'NOTHING_HERE_YET'
}

const isTeamFormed = (team) => {
    return teamController.hasThreeOrMorePlayers(team);
}

const bothTeamsReady = (phase) => {
    return phase.ready.red && phase.ready.blue;
}

module.exports = {
    getInitialPhase,
    teamReady,
    teamUnready
}