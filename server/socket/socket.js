var io = require('socket.io'),
    redis = require('../data/redis.js'),
    roomController = require('../controllers/team-controller.js'),
    playerController = require('../controllers/player-controller.js');
    
var socketio = function(server) {
    io = io(server);
    io.on('connection', function(socket) {
        socket.emit('connected', { id: socket.id })

        socket.on('disconnect', function() {
            const room = socket.room;
            redis.leaveRoom({
                roomname: socket.roomname,
                id: socket.id
            }).then((response) => {
                update(socket.room, response);
                socket.leave(room);
            });
            
            if (!io.sockets.adapter.rooms[socket.room]) {
                redis.deleteRoom({
                    roomname: socket.roomname
                });
            }
        })

        socket.on('join-room', function(data) {
            socket.join(data.roomname);
            socket.room = data.roomname;
            
            redis.joinRoom({
                roomname: socket.roomname
            }).then((response) => {
                update(socket.room, response);
            });
        });

        socket.on('join-team', function(data) {
            redis.joinTeam({ 
                id: socket.id,
                roomname: socket.roomname
            }, data).then((response) => {
                update(socket.room, response);
            });
        });

        socket.on('set-nickname', function(data) {
            update(socket.room, playerController.nickname({id: socket.id, roomname: socket.roomname}, data));
        });

        socket.on('set-blizzId', function(data) {
            update(socket.room, playerController.blizzId({id: socket.id, roomname: socket.roomname}, data));
        });

        socket.on('set-charName', function(data) {
            update(socket.room, playerController.charName({id: socket.id, roomname: socket.roomname}, data));
        });

        var update = function(room, data) {
            io.in(room).emit('update', data);
        };
    });
};

module.exports = socketio;
