let _ = require('lodash'),
    phaseController = require('../controllers/phase.controller');

const ready = async (redis, request, data, update) => {
    let result = await redis.updateMatch(request, (match) => {
        match.phase = phaseController.teamReady(
            _.cloneDeep(match.phase),
            {team: match.teams[data.team], color: data.team}
        );
        return match;
    });

    return update(request.matchId, result);
}

const unready = async (redis, request, data, update) => {
    let result = await redis.updateMatch(request, (match) => {
        match.phase = phaseController.teamUnready(_.cloneDeep(match.phase), data.team);
        return match;
    });

    return update(request.matchId, result);
};

const winner = async (redis, request, data, update) => {
    let result = await redis.updateMatch(request, (match) => {
        let team;

        if (_.find(match.teams.red.players, {id: request.id})) {
            team = 'red';
        }
        if (_.find(match.teams.blue.players, {id: request.id})) {
            team = 'blue';
        }

        match.phase = phaseController.winner(_.cloneDeep(match.phase), team, data.reportedWinner);
        return match;
    });

    return update(request.matchId, result);
}

module.exports = (redis) => {
    return {
        ready: (request, data, update) => ready(redis, request, data, update),
        unready: (request, data, update) => unready(redis, request, data, update),
        winner: (request, data, update) => winner(redis, request, data, update)
    };
};