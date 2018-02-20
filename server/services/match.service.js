const _ = require('lodash'),
    matchController = require('../controllers/match.controller');

const join = async (redis, request, update) => {
    let match = await redis.getMatch(request),
        result;

    if (!match) {
        await redis.createMatch(request, matchController.createMatch(request.matchId));
    }

    result = await redis.updateMatch(request, (match) => matchController.joinExistingMatch(_.cloneDeep(match)));

    return update(request.matchId, result);
};

const leave = async (redis, request, update) => {
    let match = await redis.updateMatch(request, (match) => matchController.leaveMatch(_.cloneDeep(match), request.id));
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
