let _ = require('lodash'),
    playerController = require('./player.controller'),
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

const joinTeam = (teams, playerId, data) => {
    if (isTeamFull(teams[data.team])) {
        return teams;
    }

    teams = removePlayerFromTeams(_.cloneDeep(teams), playerId);

    teams[data.team].players.push(
        playerController.createPlayer(playerId, _.isEmpty(teams[data.team].players))
    );

    return teams;
};

const isTeamFull = (team) => {
    if(_.size(team.players) >= MAX_TEAM_SIZE) {
        return true;
    }

    return false;
};

const leaveTeam = (team, id) => {
    return removePlayerFromTeam(_.cloneDeep(team), id)
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

// TODO: Eventually have a 'lock player' functionality that counts this better.
const hasThreeSelectedPlayers = (team) => {
    return _.size(_.map(team.players, 'characterName')) === 3;
}

const isSameFaction = (team) => {
    let factions = _.countBy(_.map(team.players, 'faction'));
    if (factions.horde && factions.alliance) {
        return false;
    }
    return true;
}

module.exports = {
    createTeam,
    joinTeam,
    leaveTeam,
    removePlayerFromTeams,
    hasThreeOrMorePlayers,
    hasThreeSelectedPlayers,
    isSameFaction
}