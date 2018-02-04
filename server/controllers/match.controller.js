const _ = require('lodash'),
    teamController = require('./team.controller'),
    mapController = require('./map.controller'),
    phaseController = require('./phase.controller');

const createMatch = () => {
    return {
        type: 'standard',
        size: 1,
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

const leaveMatch = (match, request) => {
        if (!match) {
            return;
        }

        match.teams = teamController.removePlayerFromTeams(_.cloneDeep(match.teams), request.id);

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