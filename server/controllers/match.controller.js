const _ = require('lodash'),
    teamController = require('./team.controller'),
    mapController = require('./map.controller'),
    phaseController = require('./phase.controller');

const createMatch = (id) => {
    return {
        id,
        type: 'standard',
        size: 0,
        bestOf: 3,
        redScore: 0,
        blueScore: 0,
        teams: teamController.createTeam(),
        phase: phaseController.getInitialPhase(),
        maps: mapController.createMapList()
    }
}

const joinExistingMatch = (match) => {
    match.size += 1;
    return match;
}

const leaveMatch = (match, playerId) => {
        if (!match) {
            return;
        }

        match.teams = teamController.removePlayerFromTeams(_.cloneDeep(match.teams), playerId);

        if (match.size > 0) {
            match.size--;
        }

        return match;
}

module.exports = {
    createMatch,
    joinExistingMatch,
    leaveMatch
}