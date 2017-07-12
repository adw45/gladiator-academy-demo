var redis = require('../data/redis.js')
    _ = require('lodash'),
    teamController = require('./team-controller.js');

var join = (request, data, update) => {
    redis.getMatch(request).then((match) => {
        if (!match) {
            redis.createMatch(request).then((match) => {
                update(request.matchId, match);
            });
        }
        else{
            update(request.matchId, match);
        }
    });
};

var leave = (request, update) => {
    redis.updateMatch(request, (match) => {
        if (!match) {
            return;
        }
        var removed = _.remove(match.teams.red.players, {id: request.id})[0];
        if (removed && removed.leader 
            && !_.isEmpty(match.teams.red.players)
        ) {
            match.teams.red.players[0].leader = true;
        }

        removed = _.remove(match.teams.blue.players, {id: request.id})[0];
        if (removed && removed.leader 
            && !_.isEmpty(match.teams.blue.players)
        ) {
            match.teams.blue.players[0].leader = true;
        }
        return match;
    }).then((response) => {
        update(request.matchId, response);
    });
};

var destroy = (request) => {
    redis.deleteMatch(request).then(function() {
        return true;
    });
};

module.exports = {
    join,
    leave,
    destroy
};
