const teamController = require('./team.controller'),
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

        removePlayerFromTeam(match.teams.red, request.id);
        removePlayerFromTeam(match.teams.blue, request.id);

        if (match.size > 0) {
            match.size--;
        }

        return match;
}

// Should this be moved to team controller? Probably.
function removePlayerFromTeam(team, id) {
    let removed = _.remove(team.players, {id})[0];

    if (removed && removed.leader
        && !_.isEmpty(team.players)
    ) {
        team.players[0].leader = true;
    }
}

module.exports = {
    createMatch,
    joinExistingMatch,
    leaveMatch
}