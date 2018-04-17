const redis = require('redis'),
    _ = require('lodash'),
    config = require('../config');

const getMatches = (req, res, next) => {
    client = redis.createClient(config.redis.port, config.redis.url);
    client.auth(config.redis.key, (err) => { if (err) throw err; });

    let cursor = 0;
    client.scan(cursor, 'MATCH', '*"phase":"form-team"*', (err, keys) => {
        let response = _.map(keys[1], (key) => {
            return JSON.parse(key);
        });
        res.send(response);
    });
}

module.exports = {
    getMatches
}
