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
                match = transform(JSON.parse(match));
                client.set(request.matchId, JSON.stringify(match));
                resolve(match);
            });
        });
    },
    deleteMatch = (data) => {
        return new Promise((resolve, reject) => {
            client.DEL(data.matchId);
            resolve();
        });
    };

module.exports = (redis) => {
    if (process.env.NODE_ENV === 'production'){
        client = redis.createClient('12387', 'redis-12387.c11.us-east-1-2.ec2.cloud.redislabs.com');
        client.auth('jXniWNrk4sQ2DGo8', (err) => { if (err) throw err; });
    }
    else {
        client = redis.createClient();
    }

    return {
        getMatch,
        createMatch,
        updateMatch,
        deleteMatch
    };
};
