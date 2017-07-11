var redis = require('redis'),
    helpers = require('../helper.js'), 
    client;

if (process.env.NODE_ENV === 'production'){
    client = redis.createClient('12387', 'redis-12387.c11.us-east-1-2.ec2.cloud.redislabs.com');
    client.auth('jXniWNrk4sQ2DGo8', function(err) {
        if (err) throw err;
    });    
} 
else {
    client = redis.createClient();
}

var getMatch = function(request) {
    return new Promise(function(resolve, reject){
        client.get(request.matchId, function(err, match){
            resolve(JSON.parse(match));
        });
    })
};

var createMatch = function(request) {
    return new Promise(function(resolve, reject){
        client.set(request.matchId, JSON.stringify(helpers.initializeRoom()));
        resolve(getMatch(request));
    });
};

var updateMatch = function(request, transform) {
    return new Promise(function(resolve, reject) {
        client.get(request.matchId, function(err, match) {
            match = transform(JSON.parse(match));
            client.set(request.matchId, JSON.stringify(match));
            resolve(match);
        });
    });
};

var deleteMatch = function(data) {
    return new Promise(function(resolve, reject){
        client.DEL(data.matchId);
        resolve();
    });
};

module.exports = {
    getMatch,
    createMatch,
    updateMatch,
    deleteMatch
};
