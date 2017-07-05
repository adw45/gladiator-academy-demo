var redis = require('redis'),
    flatten = require('flat'),
    unflatten = require('flat').unflatten,
    _ = require('lodash'),
    helpers = require('../helper.js')
    client = redis.createClient();


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
    return new Promise(function (resolve, reject){
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

var setNickname = function(request, data) {
    return new Promise(function(resolve, reject) {
        client.get(request.roomname, function(err, match) {
            match = JSON.parse(match);

            _.forEach(match.teams[data.team].players, (player) => {
                if (player.id === request.id) {
                    player.nickname = data.nickname
                }
            });

            client.set(request.roomname, JSON.stringify(match), redis.print);
            resolve(match);
        });
    });

}

var setBlizzId = function(request, data) {
    return new Promise(function(resolve, reject){
        client.get(request.roomname, function(err, match) {
            match = JSON.parse(match);

             _.forEach(match.teams[data.team].players, (player) => {
                if (player.id === request.id) {
                    player.blizzId = data.blizzId
                }
            })

            client.set(request.roomname, JSON.stringify(match), redis.print);
            resolve(match);
        });
    });
}

var setCharName = function(request, data) {
    return new Promise(function(resolve, reject) {
        client.get(request.roomname, function(err, match) {
            match = JSON.parse(match);

            _.forEach(match.teams[data.team].players, (player) => {
                if (player.id === request.id) {
                    player.charName = data.charName
                }
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
    joinTeam,
    setNickname,
    setBlizzId,
    setCharName,
    leaveRoom,
    deleteRoom
}

