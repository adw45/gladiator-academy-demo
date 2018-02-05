let _ = require('lodash'),
    MAX_TEAM_SIZE = 4;

const createTeam = () => {
    return {
        red: {
            players: []
        },
        blue: {
            players: []
        }
    };
};

const joinTeam = (teams, request, data) => {
    if (isTeamFull(teams[data.team])) {
        return teams;
    }

    teams = removePlayerFromTeams(_.cloneDeep(teams), request.id);

    teams[data.team].players.push({
        id: request.id,
        leader: _.isEmpty(teams[data.team].players)
    });

    return teams;
};

const isTeamFull = (team) => {
    if(_.size(team.players) >= MAX_TEAM_SIZE) {
        return true;
    }

    return false;
};

const leaveTeam = (teams, id, data) => {
    teams[data.team] = removePlayerFromTeam(_.cloneDeep(teams[data.team]), id)
    return teams;
};

const removePlayerFromTeam = (team, id) => {
    let removed = _.remove(team.players, {id})[0];

    if (removed && removed.leader && !_.isEmpty(team.players)) {
        team.players[0].leader = true;
    }

    return team;
};

const removePlayerFromTeams = (teams, id) => {
    teams.red = removePlayerFromTeam(_.cloneDeep(teams.red), id);
    teams.blue = removePlayerFromTeam(_.cloneDeep(teams.blue), id);
    return teams;
};

const hasThreeOrMorePlayers = (team) => {
    return _.size(team.players) >= 3
}

module.exports = {
    createTeam,
    joinTeam,
    leaveTeam,
    removePlayerFromTeams,
    hasThreeOrMorePlayers,
}