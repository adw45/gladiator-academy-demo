const _ = require('lodash'),
    config = require('../config');

let client;

const getMatch = (request) => {
    return new Promise((resolve, reject) => {
        client.get(request.matchId, (err, match) => {
            return resolve(JSON.parse(match));
        });
    })
},
createMatch = (request, data) => {
    return new Promise(async (resolve, reject) => {
        client.set(request.matchId, JSON.stringify(data));
        resolve(await getMatch(request));
    });
},
updateMatch = (request, transform) => {
    return new Promise((resolve, reject) => {
        client.get(request.matchId, (err, match) => {
            if (err) {
                reject(new Error(err));
            }
            match = transform(JSON.parse(match));
            client.set(request.matchId, JSON.stringify(match));
            resolve(match);
        });
    });
},
deleteMatch = (data) => {
    return new Promise((resolve, reject) => {
        client.DEL(data.matchId, (err) => {
            resolve();
        });
    });
};

module.exports = (redis) => {
    client = redis.createClient(config.redis.port, config.redis.url);
    client.auth(config.redis.key, (err) => { if (err) throw err; });

    client.on("error", function (err) {
        console.log("Error " + err);
    });

    return {
        getMatch,
        createMatch,
        updateMatch,
        deleteMatch
    };
};
