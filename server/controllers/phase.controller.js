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
        // TODO: isSameFaction();
        if (isTeamFormed(team.team) && hasThreeSelectedPlayers(team.team) /*&& isSameFaction(team.team)*/) {
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

const winner = (phase, reportingLeader, winningTeam) => {
    if (_.includes(['round-one', 'round-two', 'round-three'], phase.type)) {
        phase.winner[reportingLeader] = winningTeam;
        if (phase.winner.red === phase.winner.blue) {
            const winningTeam = phase.winner.red,
                losingTeam = winningTeam === 'red' ? 'blue' : 'red';
            return next(phase, {winningTeam, losingTeam});
        }
    }
    return phase;
}

const next = (phase, data) => {
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
            winner: {
                red: null,
                blue: null
            }
        }
    }
    if (phase.type === 'round-one') {
        return {
            type: 'map-pick-one',
            winningTeam: data.winningTeam,
            losingTeam: data.losingTeam
        }
    }
    if (phase.type === 'map-pick-one') {
        return {
            type: 'winner-pick-one',

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
    teamUnready,
    winner
}