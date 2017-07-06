var redis = require('../data/redis.js'),
    _  = require('lodash');

var nickname = (request, data, update) => {
    redis.updateMatch(request, (match) => {
        _.forEach(match.teams[data.team].players, (player) => {
            if (player.id === request.id) {
                player.nickname = data.nickname
            }
        });
        return match;
    }).then(function(response){
        update(request.matchId, response);
    });
}

var blizzId = (request, data, update) => {
    redis.updateMatch(request, (match) => {
        _.forEach(match.teams[data.team].players, (player) => {
            if (player.id === request.id) {
                player.blizzId = data.blizzId
            }
        });
        return match;
    }).then(function(response){
        update(request.matchId, response);
    });
}

var charName = (request, data, update) => {
    redis.updateMatch(request, (match) => {
       _.forEach(match.teams[data.team].players, (player) => {
            if (player.id === request.id) {
                player.charName = data.charName
            }
        });
        return match;
    }).then(function(response){
        update(request.matchId, response);
    });
}

var classSpec = (request, data, update) => {
    redis.updateMatch(request, (match) => {
        _.forEach(match.teams[data.team].players, (player) => {
            // not implemented
        });
        return match;
    }).then(function(response){
        update(request.matchId, response);
    });
}

var leader = (request, data, update) => {
    redis.updateMatch(request, (match) => {
        _.forEach(match.teams[data.team].players, (player) => {
            // not implemented
        });
        return match;
    }).then(function(response){
        update(request.matchId, response);
    });
}

module.exports = {
    nickname,
    blizzId,
    charName,
    classSpec,
    leader
}
