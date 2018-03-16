const _ = require('lodash');
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
    if (process.env.NODE_ENV === 'production'){
        client = redis.createClient('10794', 'redis-10794.c15.us-east-1-2.ec2.cloud.redislabs.com');
        client.auth('hsBLMjnoNNRMi8peLcXMMjOEwh7HlBjl', (err) => { if (err) throw err; });
    }
    else {
        client = redis.createClient();
    }

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
