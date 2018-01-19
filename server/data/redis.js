const redis = require('redis'),
    helpers = require('../helper.js');

let client;

if (process.env.NODE_ENV === 'production'){
    client = redis.createClient('12387', 'redis-12387.c11.us-east-1-2.ec2.cloud.redislabs.com');
    client.auth('jXniWNrk4sQ2DGo8', function(err) {
        if (err) throw err;
    });
}
else {
    client = redis.createClient();
}

let getMatch = (request) => {
        return new Promise(function(resolve, reject){
            client.get(request.matchId, function(err, match){
                resolve(JSON.parse(match));
            });
        })
    },
    createMatch = (request) => {
        return new Promise(function(resolve, reject){
            client.set(request.matchId, JSON.stringify(helpers.initializeRoom()));
            resolve(getMatch(request));
        });
    },
    updateMatch = (request, transform) => {
        return new Promise(function(resolve, reject) {
            client.get(request.matchId, function(err, match) {
                match = transform(JSON.parse(match));
                client.set(request.matchId, JSON.stringify(match));
                resolve(match);
            });
        });
    },
    deleteMatch = (data) => {
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
