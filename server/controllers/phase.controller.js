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
    if (phase.type === 'blind-pick') {
        if (isTeamFormed(team.team) && hasThreeSelectedPlayers(team.team) && isSameFaction(team.team)) {
            phase.ready[team.color] = true;
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
    if (phase.type === 'blind-pick') {
        return {
            type: 'round-one',
            ready: {
                red: false,
                blue: false
            }
        }
    }
    if (phase.type === 'round-one') {
        return {
            type: 'map-pick-one',
            ready: {
                red: false,
                blue: false
            }
        }
    }
    if (phase.type === 'map-pick-one') {
        return {
            type: 'winner-pick-one',
            ready: {
                red: false,
                blue: false
            }
        }
    }
    if (phase.type === 'winner-pick-one') {
        return {
            type: 'loser-pick-one',
            ready: {
                red: false,
                blue: false
            }
        }
    }
    return phase;
}

const isTeamFormed = (team) => {
    return teamController.hasThreeOrMorePlayers(team);
}

const bothTeamsReady = (phase) => {
    return phase.ready.red && phase.ready.blue;
}

const hasThreeSelectedPlayers = (team) => {
    return teamController.hasThreeSelectedPlayers(team)
}

const isSameFaction = (team) => {
    return teamController.isSameFaction(team);
}

module.exports = {
    getInitialPhase,
    teamReady,
    teamUnready
}