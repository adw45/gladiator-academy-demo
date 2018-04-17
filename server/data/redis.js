const _ = require('lodash'),
    config = require('../config'),
    asyncRedis = require('async-redis');

let client;

const getKeyById = async (id) => {
    return _.get(await client.keys(`*"id":"${id}"*`), 0);
};

const getMatch = async (request) => {
    let key = await getKeyById(request.matchId)
    if (!key) {
        return undefined;
    }
    return JSON.parse(await client.get(key));;
},
createMatch = async (request, data) => {
    await client.set(
        JSON.stringify({id: request.matchId, phase: data.phase.type}),
        JSON.stringify(data)
    );
    return await getMatch(request);
},
updateMatch = async (request, transform) => {
    let match = transform(await getMatch(request));

    await client.DEL(await getKeyById(request.matchId));
    await client.set(
        JSON.stringify({id: request.matchId, phase: match.phase.type}),
        JSON.stringify(match)
    );

    return await getMatch(request);
},
deleteMatch = async (request) => {
    await client.DEL(await getKeyById(request.matchId))
};

module.exports = (redis) => {
    client = redis.createClient(config.redis.port, config.redis.url);
    client = asyncRedis.decorate(client);
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
