let _ = require('lodash'),
    teamController = require('../controllers/team.controller');

const join = async (redis, request, data, update) => {
    let result = await redis.updateMatch(request, (match) => {
        match.teams = teamController.joinTeam(_.cloneDeep(match.teams), request, data);
        return match;
    });
    return update(request.matchId, result);
};

const leave = async (redis, request, data, update) => {
    let result = await redis.updateMatch(request, (match) => {
        match.teams[data.team] = teamController.leaveTeam(_.cloneDeep(match.teams[data.team]), request.id);
        return match;
    });
    return update(request.matchId, result);
};


module.exports = (redis) => {
    return {
        join: (request, data, update) => join(redis, request, data, update),
        leave: (request, data, update) => leave(redis, request, data, update),
    }
};
