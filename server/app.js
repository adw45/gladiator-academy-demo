var express = require('express');
var server = require('http');
var io = require('socket.io');
var app = express();
server = server.Server(app);
io = io(server);

module.exports = io;
var routes = require('./router.js');

app.use(express.static('./app'));
app.use('/_api', routes);

var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Example app listening on port', port)
});

var matches = {};

io.on('connection', function (socket) {

  socket.on('disconnect', function () {
    socket.leave(socket.room);
    if (!io.sockets.adapter.rooms[socket.room]) {
      delete matches[socket.room];
    }
  })

  socket.on('joinRoom', function (data) {
    socket.join(data.roomname);

    socket.room = data.roomname;
    socket.username = data.username;

    if (!matches[socket.room]) {
      initializeRoom(socket.room);
    }
    update(socket.room, matches[socket.room]);
  });

  // socket.on('increase', function () {
  //   update(socket.room, {
  //     number: ++matches[socket.room]
  //   });
  // });

  // socket.on('decrease', function () {
  //   update(socket.room, {
  //     number: --matches[socket.room]
  //   });
  // });

  var update = function (room, data) {
    io.in(room).emit('update', data);
  };
});


function initializeRoom(room) {
  matches[room] = {
    type: 'standard',
    bestOf: 3,
    redScore: 0,
    blueScore: 0,
    maps: [
      {
        name: 'Nagrand Arena',
        imageUrl: 'http://media.blizzard.com/wow/media/screenshots/pvp/guide/arenas/nagrand-1-thumbnail.jpg',
        winner: null,
        selected: true
      },
      {
        name: 'Blade\'s Edge Arena',
        winner: null,
        imageUrl: 'http://media.blizzard.com/wow/media/screenshots/pvp/guide/arenas/blades-edge-1-thumbnail.jpg',
        selected: false
      },
      {
        name: 'Dalaran Sewers',
        winner: null,
        imageUrl: 'http://media.blizzard.com/wow/media/screenshots/pvp/guide/arenas/dalaran-sewers-1-thumbnail.jpg',
        selected: false 
      },
      {
        name: 'Tigers Peak',
        winner: null,
        imageUrl: 'http://media.blizzard.com/wow/media/screenshots/pvp/guide/arenas/tigers-peak-1-thumbnail.jpg',
        selected: false 
      },
      {
        name: 'Tol\'varan Arena',
        imageUrl: 'http://media.blizzard.com/wow/media/screenshots/pvp/guide/arenas/tolviron-1-thumbnail.jpg',
        winner: null,
        selected: false
      },
      {
        name: 'Ruins of Lordaeron',
        imageUrl: 'http://media.blizzard.com/wow/media/screenshots/pvp/guide/arenas/ruins-of-lordaeron-1-thumbnail.jpg',
        winner: null,
        selected: false 
      },
      {
        name: 'Ashmane\'s Fall',
        winner: null,
        selected: false 
      },
      {
        name: 'Black Rook Hold',
        winner: null,
        selected: false 
      }
    ]
  }
}
