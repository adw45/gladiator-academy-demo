var redis = require('../data/redis.js'),
    _ = require('lodash');

const join = (request, data, update) => {
    redis.updateMatch(request, (match) => {
        if (match.teams[data.team].players.size >= 4) {
            reject('Room full');
        }
        _.remove(match.teams.red.players, { id: request.id });
        _.remove(match.teams.blue.players, { id: request.id });

        match.teams[data.team].players.push({
            id: request.id,
            leader: false
        });
        return match;
    }).then((response) => {
        update(request.matchId, response);
    });
};

const leave = (request, data, update) => {
    redis.updateMatch(request, (match) => {
        _.remove(match.teams.red.players, { id: request.id });
        _.remove(match.teams.blue.players, { id: request.id });
        return match;
    }).then((response) => {
        update(request.matchId, response);
    });
};

module.exports = {
    join,
    leave
};
