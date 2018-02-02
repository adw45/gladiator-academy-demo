const _  = require('lodash');

const nickname = (redis, request, data, update) => {
    redis.updateMatch(request, (match) => {
        var player = _.find(match.teams[data.team].players, {id: request.id});
        player.nickname = data.nickname;
        return match;
    }).then(function(response){
        update(request.matchId, response);
    });
};

const blizzId = (redis, request, data, update) => {
    redis.updateMatch(request, (match) => {
        var player = _.find(match.teams[data.team].players, {id: request.id});
        player.blizzId = data.blizzId
        return match;
    }).then(function(response){
        update(request.matchId, response);
    });
};

const charName = (redis, request, data, update) => {
    redis.updateMatch(request, (match) => {
        var player = _.find(match.teams[data.team].players, {id: request.id});
        player.charName = data.charName
        return match;
    }).then(function(response){
        update(request.matchId, response);
    });
};

const spec = (redis, request, data, update) => {
    redis.updateMatch(request, (match) => {
        var player = _.find(match.teams[data.team].players, {id: request.id});
        player.spec = data.spec;
        return match;
    }).then(function(response){
        update(request.matchId, response);
    });
};

const leader = (redis, request, data, update) => {
    redis.updateMatch(request, (match) => {
        var player = _.find(match.teams[data.team].players, {id: request.id});
        if(player.leader) {
            player.leader = false;
            var newLeader = _.find(match.teams[data.team].players, {id: data.playerId});
            newLeader.leader = true;
        }
        return match;
    }).then(function(response){
        update(request.matchId, response);
    });
};

module.exports = (redis) =>  {
    return {
        nickname: (request, data, update) => nickname(redis, request, data, update),
        blizzId: (request, data, update) => blizzId(redis, request, data, update),
        charName: (request, data, update) => charName(redis, request, data, update),
        spec: (request, data, update) => spec(redis, request, data, update),
        leader: (request, data, update) => leader(redis, request, data, update)
    }
};
