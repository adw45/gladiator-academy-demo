const io = require('socket.io'),
    matchController = require('./controllers/match-controller.js'),
    playerController = require('./controllers/player-controller.js'),
    teamController = require('./controllers/team-controller.js');

let socketio = (server) => {
    io = io(server);
    io.on('connection', (socket) => {
        socket.emit('connected', { id: socket.id })

        socket.on('disconnect', () => {
            matchController.leave({id: socket.id, matchId: socket.matchId}, update)
            socket.leave(socket.matchId);
            if (!io.sockets.adapter.rooms[socket.matchId]) {
                matchController.destroy({matchId: socket.matchId});
            }
        });

        socket.on('join-room', (data) => {
            if (socket.matchId) {
                matchController.leave({id: socket.id, matchId: socket.matchId}, update);
            }
            socket.join(data.roomname);
            socket.matchId = data.roomname;
            matchController.join({matchId: socket.matchId}, data, update);
        });

        socket.on('team-join', (data) => {
            teamController.join({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('team-leave', (data) => {
            teamController.leave({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('team-ready', (data) => {
            teamController.ready({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('team-unready', (data) => {
            teamController.unready({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('player-nickname', (data) => {
            playerController.nickname({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('player-blizzId', (data) => {
            playerController.blizzId({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('player-charName', (data) => {
            playerController.charName({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('player-spec', (data) => {
            playerController.spec({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('player-leader', (data) => {
            playerController.leader({id: socket.id, matchId: socket.matchId}, data, update);
        });

        var update = (matchId, data) => {
            io.in(matchId).emit('update', data);
        };
    });
};

module.exports = socketio;
