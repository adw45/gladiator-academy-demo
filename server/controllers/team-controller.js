var redis = require('../data/redis.js'),
    _ = require('lodash');

var join = (request, data, update) => {
    redis.updateMatch(request, (match) => {
        if (match.teams[data.team].players.size >= 4) {
            console.log(request, data, 'Room full');
            return match;
        }
    
        var removed = _.remove(match.teams[data.team === 'red' ? 'blue' : 'red'].players, {id: request.id})[0];
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


var leave = (request, data, update) => {
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

module.exports = {
    join,
    leave
};
