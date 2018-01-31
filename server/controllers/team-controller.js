const helper = require('../helper'),
    phaseController = require('./phase-controller'),
    _ = require('lodash');

const join = (redis, request, data, update) => {
    redis.updateMatch(request, (match) => {
        if (match.teams[data.team].players.size >= 4) {
            console.log(request, data, 'Room full');
            return match;
        }

        let removed = _.remove(match.teams[data.team === 'red' ? 'blue' : 'red'].players, {id: request.id})[0];
        if (removed && removed.leader
            && !_.isEmpty(match.teams[data.team === 'red' ? 'blue' : 'red'].players)
        ){
            match.teams[data.team === 'red' ? 'blue' : 'red'].players[0].leader = true
        }

        if (!_.find(match.teams[data.team].players, {id: request.id})) {
            if (removed) {
                match.teams[data.team].players.push({
                    id: request.id,
                    nickname: removed.nickname,
                    blizzId: removed.blizzId,
                    charName: removed.charName,
                    spec: removed.spec,
                    leader: _.isEmpty(match.teams[data.team].players)
                });
            }
            else {
                match.teams[data.team].players.push({
                    id: request.id,
                    leader: _.isEmpty(match.teams[data.team].players)
                });
            }
        }
        return match;
    }).then((response) => {
        update(request.matchId, response);
    });
};

const leave = (redis, request, data, update) => {
    redis.updateMatch(request, (match) => {
        var removed = _.remove(match.teams[data.team].players, {id: request.id})[0];
        if (removed
            && removed.leader
            && !_.isEmpty(match.teams[data.team].players)
        ){
            match.teams[data.team].players[0].leader = true
        }
        return match;
    }).then((response) => {
        update(request.matchId, response);
    });
};

const ready = (redis, request, data, update) => {
    redis.updateMatch(request, (match) => {
        match.phase.ready[data.team] = true;
        match.phase = phaseController(match.phase);
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
