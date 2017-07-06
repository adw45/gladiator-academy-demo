const redis = require('../data/redis.js');

var join = (request, data, update) => {
    redis.getMatch(request).then((response) => {
        if (!response) {
            redis.createMatch(request).then((response) => {
                update(request.matchId, response);
            });
        }
        else{
            update(request.matchId, response);
        }
    });
}

var leave = (request, update) => {
    redis.updateMatch(request, (match) => {
        _.remove(match.teams.red.players, { id: request.id });
        _.remove(match.teams.blue.players, { id: request.id });
        return match;
    }).then(function(response){
        update(request.matchId, response);
    });
}

var destroy = (request) => {
    redis.deleteMatch(request).then(function() {
        return true;
    });
}

module.exports = {
    join,
    leave,
    destroy
}
