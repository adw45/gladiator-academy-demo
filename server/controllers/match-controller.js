const _ = require('lodash'),
    helpers = require('../helper');

const join = (redis, request, update) => {
    return new Promise(async (resolve, reject) => {
        let match = await redis.getMatch(request);
        if (!match) {
            let result = await redis.createMatch(request, helpers.initializeRoom());
            return resolve(update(request.matchId, result));
        }
        else {
            let result = await redis.updateMatch(request, match => {
                match.size += 1
                return match
            });
            return resolve(update(request.matchId, result));
        }
    });
};

const leave = async (redis, request, update) => {
    let match = await redis.updateMatch(request, (match) => {
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
    })
    return update(request.matchId, match);
};

const destroy = async (redis, request) => {
    await redis.deleteMatch(request);
    return true;
};

module.exports = (redis) => {
    return {
        join: (request, update) => join(redis, request, update),
        leave: (request, update) => leave(redis, request, update),
        destroy: (request) => destroy(redis, request)
    }
};
