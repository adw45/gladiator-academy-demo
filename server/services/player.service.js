const _  = require('lodash'),
    playerController = require('../controllers/player.controller');

const nickname = async (redis, request, data, update) => {
    let result = await redis.updateMatch(request, match => {
        match.teams[data.team].players = playerController.updateNickname(
            _.cloneDeep(match.teams[data.team].players),
            request.id,
            data
        );
        return match;
    });
    return update(request.matchId, result);
};

const blizzardId = async (redis, request, data, update) => {
    let result = await redis.updateMatch(request, match => {
        match.teams[data.team].players = playerController.updateBlizzardId(
            _.cloneDeep(match.teams[data.team].players),
            request.id,
            data
        );
        return match;
    });
    return update(request.matchId, result);
};

const characterName = async (redis, request, data, update) => {
    let result = await redis.updateMatch(request, match => {
        match.teams[data.team].players = playerController.updateCharacterName(
            _.cloneDeep(match.teams[data.team].players),
            request.id,
            data
        );
        return match;
    });
    return update(request.matchId, result);
};

const classSpec = async (redis, request, data, update) => {
    let result = await redis.updateMatch(request, match => {
        match.teams[data.team].players = playerController.updateClassSpec(
            _.cloneDeep(match.teams[data.team].players),
            request.id,
            data
        );
        return match;
    });
    return update(request.matchId, result);
};

const leader = async (redis, request, data, update) => {
    let result = await redis.updateMatch(request, match => {
        match.teams[data.team].players = playerController.updateLeader(
            _.cloneDeep(match.teams[data.team].players),
            {oldLeader: request.id, newLeader: data.playerId}
        );
        return match;
    })
    return update(request.matchId, result);
};

module.exports = (redis) =>  {
    return {
        nickname: (request, data, update) => nickname(redis, request, data, update),
        blizzardId: (request, data, update) => blizzardId(redis, request, data, update),
        characterName: (request, data, update) => characterName(redis, request, data, update),
        classSpec: (request, data, update) => classSpec(redis, request, data, update),
        leader: (request, data, update) => leader(redis, request, data, update)
    }
};
