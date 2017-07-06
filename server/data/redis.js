var redis = require('redis'),
    _ = require('lodash'),
    helpers = require('../helper.js'),
    client = redis.createClient('12387', 'redis-12387.c11.us-east-1-2.ec2.cloud.redislabs.com');

client.auth('jXniWNrk4sQ2DGo8', function(err) {
    if (err) throw err;
});

var updateField = function(request, transform) {
    return new Promise(function(resolve, reject) {
        client.get(request.roomname, function(err, match) {
            match = transform(JSON.parse(match));
            client.set(request.roomname, JSON.stringify(match), redis.print);
            resolve(match);
        });
    });
}

var joinRoom = function(request) {
    return new Promise(function(resolve, reject){
        client.get(request.roomname, function(err, match) {
            if(!match) {
                var room = helpers.initializeRoom();
                client.set(request.roomname, JSON.stringify(room), redis.print);
                resolve(room);
            }
            resolve(JSON.parse(match));
        });
    });
}

var leaveRoom = function(request) {
    return new Promise(function(resolve, reject){
        client.get(request.roomname, function(err, match){
            match = JSON.parse(match);
            
            if(match) {
                _.remove(match.teams.red.players, { id: request.id });
                _.remove(match.teams.blue.players, { id: request.id });
            }

            client.set(request.roomname, JSON.stringify(match), redis.print);
            resolve(match);
        });
    });
}

var joinTeam = function(request, data) {
    return new Promise(function(resolve, reject){
        client.get(request.roomname, function(err, match) {
            match = JSON.parse(match);

            if (match.teams[data.team].players.size >= 4) {
                reject('Room full');
            }
            
            _.remove(match.teams.red.players, { id: request.id });
            _.remove(match.teams.blue.players, { id: request.id });

            match.teams[data.team].players.push({
                id: request.id,
                leader: false
            });

            client.set(request.roomname, JSON.stringify(match), redis.print);
            resolve(match);
        });
    });
}

var deleteRoom = function(data) {
    client.DEL(data.roomname, redis.print);
}

module.exports = {
    joinRoom,
    leaveRoom,
    deleteRoom,
    joinTeam,
    updateField
};
