const helper = require('../helper'),
    teamController = require('../controllers/team.controller'),
    phaseService = require('./phase.service'),
    _ = require('lodash');

const join = async (redis, request, data, update) => {
    let result = await redis.updateMatch(request, (match) => {
        match.teams = teamController.joinTeam(_.cloneDeep(match.teams), request, data);
        return match;
    });
    return update(request.matchId, result);
};

const leave = async (redis, request, data, update) => {
    let result = await redis.updateMatch(request, (match) => {
        match.teams = teamController.leaveTeam(_.cloneDeep(match.teams), request.id, data);
        return match;
    });
    return update(request.matchId, result);
};

const ready = (redis, request, data, update) => {
    redis.updateMatch(request, (match) => {
        match.phase.ready[data.team] = true;
        match.phase = matchService(match.phase);
        return match;
    }).then((response) => {
        update(request.matchId, response);
    });
};

const unready = (redis, request, data, update) => {
    redis.updateMatch(request, (match) => {
        match.phase.ready[data.team] = false;
        return match;
    }).then((response) => {
        update(request.matchId, response);
    });
};

module.exports = (redis) => {
    return {
        join: (request, data, update) => join(redis, request, data, update),
        leave: (request, data, update) => leave(redis, request, data, update),
        ready: (request, data, update) => ready(redis, request, data, update),
        unready: (request, data, update) => unready(redis, request, data, update)
    }
};
