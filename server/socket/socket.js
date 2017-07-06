var io = require('socket.io'),
    matchController = require('../controllers/match-controller.js'),
    playerController = require('../controllers/player-controller.js'),
    teamController = require('../controllers/team-controller.js');
    
var socketio = function(server) {
    io = io(server);
    io.on('connection', function(socket) {
        socket.emit('connected', { id: socket.id })

        socket.on('disconnect', function() {
            matchController.leave({id: socket.id, matchId: socket.matchId}, update)
            socket.leave(socket.matchId);
            if (!io.sockets.adapter.rooms[socket.matchId]) {
                matchController.destroy({matchId: socket.matchId});
            }   
        });

        socket.on('join-room', function(data) {
            if (socket.matchId) {
                matchController.leave({id: socket.id, matchId: socket.matchId}, update);
            }
            socket.join(data.roomname);
            socket.matchId = data.roomname;
            matchController.join({matchId: socket.matchId}, data, update);
        });

        socket.on('join-team', function(data) {
            teamController.join({id: socket.id, matchId: socket.matchId}, data, update);
        });
        
        socket.on('leave-team', function(data) {
            teamController.leave({id: socket.id, matchId: socket.matchId}, data, update);
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
