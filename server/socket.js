let io = require('socket.io');

const socketio = (server, services) => {
    io = io(server);

    let matchService = services.matchService,
        teamService = services.teamService,
        playerService = services.playerService,
        phaseService = services.phaseService,
        update = (matchId, data) => {
            io.in(matchId).emit('update', data);
        };

    io.on('connection', (socket) => {
        socket.emit('connected', { id: socket.id })

        socket.on('disconnect', () => {
            if (socket.matchId) {
                matchService.leave({id: socket.id, matchId: socket.matchId}, update);
            }

            socket.leave(socket.matchId);

            if (socket.matchId && !io.sockets.adapter.rooms[socket.matchId]) {
                matchService.destroy({matchId: socket.matchId});
            }
        });

        socket.on('join-room', (data) => {
            if (socket.matchId) {
                matchService.leave({id: socket.id, matchId: socket.matchId}, update);
            }
            socket.join(data.roomname);
            socket.matchId = data.roomname;
            matchService.join({matchId: socket.matchId}, update);
        });

        socket.on('phase-winner', (data) => {
            phaseService.winner({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('team-join', (data) => {
            teamService.join({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('team-leave', (data) => {
            teamService.leave({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('team-ready', (data) => {
            phaseService.ready({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('team-unready', (data) => {
            phaseService.unready({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('player-nickname', (data) => {
            playerService.nickname({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('player-blizzardId', (data) => {
            playerService.blizzardId({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('player-characterName', (data) => {
            playerService.characterName({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('player-classSpec', (data) => {
            playerService.classSpec({id: socket.id, matchId: socket.matchId}, data, update);
        });

        socket.on('player-leader', (data) => {
            playerService.leader({id: socket.id, matchId: socket.matchId}, data, update);
        });
    });
};

module.exports = socketio;
