var io = require('socket.io'),
    redis = require('../data/redis.js'),
    roomController = require('../controllers/team-controller.js'),
    playerController = require('../controllers/player-controller.js');
    
var socketio = function(server) {
    io = io(server);
    io.on('connection', function(socket) {
        socket.emit('connected', { id: socket.id })

        socket.on('disconnect', function() {
            redis.leaveRoom({
                id: socket.id,
                matchId: socket.matchId
            }).then((response) => {
                update(socket.matchId, response);
                socket.leave(socket.matchId);
            
                if (!io.sockets.adapter.rooms[socket.matchId]) {
                    redis.deleteRoom({
                        matchId: socket.matchId
                    });
                }
            });    
        });

        socket.on('join-room', function(data) {
            socket.join(data.roomname);
            socket.matchId = data.roomname;
            
            redis.joinRoom({
                roomname: socket.matchId
            }).then((response) => {
                update(socket.matchId, response);
            });
        });

        socket.on('join-team', function(data) {
            redis.joinTeam({ 
                id: socket.id,
                roomname: socket.matchId
            }, data).then((response) => {
                update(socket.matchId, response);
            });
        });

        socket.on('set-nickname', function(data) {
            playerController.nickname({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('set-blizzId', function(data) {
            playerController.blizzId({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('set-charName', function(data) {
            playerController.charName({id: socket.id, matchId: socket.matchId}, data, update);
        });

        var update = function(matchId, data) {
            io.in(matchId).emit('update', data);
        };
    });
};

module.exports = socketio;
