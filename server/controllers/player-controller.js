var redis = require('../data/redis.js'),
    _  = require('lodash');

var nickname = (request, data) => {
    console.log('nickname\n');
    redis.updateField(request, (match) => {
        _.forEach(match.teams[data.team].players, (player) => {
            if (player.id === request.id) {
                player.nickname = data.nickname
            }
        });
        return match;
    }).then(function(response){
        return response;
    });
}

var blizzId = (request, data) => {
    redis.updateField(request, (match) => {
        _.forEach(match.teams[data.team].players, (player) => {
            if (player.id === request.id) {
                player.blizzId = data.blizzId
            }
        });
        return match;
    }).then(function(response){
        return response;
    });
}

var charName = (request, data) => {
    redis.updateField(request, (match) => {
       _.forEach(match.teams[data.team].players, (player) => {
            if (player.id === request.id) {
                player.charName = data.charName
            }
        });
        return match;
    }).then(function(response){
        return response;
    });
}

var classSpec = (request, data) => {
    redis.updateField(request, (match) => {
        _.forEach(match.teams[data.team].players, (player) => {
            // not implemented
        });
        return match;
    }).then(function(response){
        return response;
    });
}

var leader = (request, data) => {
    redis.updateField(request, (match) => {
        _.forEach(match.teams[data.team].players, (player) => {
            // not implemented
        });
        return match;
    }).then(function(response){
        return response;
    });
}

module.exports = {
    nickname,
    blizzId,
    charName,
    classSpec,
    leader
}
